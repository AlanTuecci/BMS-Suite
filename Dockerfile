###################################################
# Stage: base
# 
# This base stage ensures all other stages are using the same base image
# and provides common configuration for all stages, such as the working dir.
###################################################
FROM node:25-alpine AS base
WORKDIR /usr/local/app

###################################################
################# Frontend STAGES #################
###################################################

###################################################
# Stage: frontend-base
#
# This stage is used as the base for the frontend-dev and frontend-build stages,
# since there are common steps needed for each.
###################################################
FROM base AS frontend-base
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/tailwind.config.js ./
COPY frontend/public ./public
COPY frontend/src ./src

# --- STRATEGY PART 1: FRONTEND ENV ---
# Since these are public URLs required for the build process,
# we copy them in before the build happens.
COPY frontend/.env ./ 
# -------------------------------------

###################################################
# Stage: frontend-dev
# 
# This stage is used for development of the frontend application. It sets 
# the default command to start the Create-React-App development server.
###################################################
FROM frontend-base AS frontend-dev
CMD ["npm", "start"]

###################################################
# Stage: frontend-build
#
# This stage builds the frontend application, producing static HTML, CSS, and
# JS files that can be served by the backend.
###################################################
FROM frontend-base AS frontend-build
RUN npm run build

###################################################
################  BACKEND STAGES  #################
###################################################

###################################################
# Stage: backend-base
#
# This stage is used as the base for the backend-dev and test stages, since
# there are common steps needed for each.
###################################################
FROM base AS backend-dev
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/database.sql backend/server.js ./
COPY backend/tests ./tests
COPY backend/src ./src
CMD ["npm", "run", "dev"]

###################################################
# Stage: test
#
# This stage runs the tests on the backend. This is split into a separate
# stage to allow the final image to not have the test dependencies or test
# cases.
###################################################
FROM backend-dev AS test
RUN npm run test

###################################################
# Stage: final
#
# This stage is intended to be the final "production" image. It sets up the
# backend and copies the built frontend application from the frontend-build stage.
#
###################################################
FROM base AS final
ENV NODE_ENV=production
COPY --from=backend-dev /usr/local/app/package.json /usr/local/app/package-lock.json ./
RUN npm ci --production && \
    npm cache clean --force
COPY backend/database.sql backend/server.js ./
COPY backend/src ./src
COPY --from=frontend-build /usr/local/app/build ./src/static
EXPOSE 80
CMD ["node", "server.js"]