import React, { useContext } from "react";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Invite from "./pages/Invite";
import TimeManagement from "./pages/TimeManagement";
import EmployeePermissions from "./pages/EmployeePermissions";
import ProductManagement from './pages/ProductManagement';
import { useSelector } from "react-redux";


const PrivateRoutes = () => {
  const { authState } = useContext(AuthContext);
  const { isAuth, userType } = authState;

  if (isAuth && userType === "time_admin") {
    return <Navigate to="/clock-in" replace />;
  }

  return isAuth ? <Outlet /> : <Navigate to="/home" />;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RestrictedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<TimeAdminRoutes />}>
            <Route path="/clock-in" element={<ClockIn />} />
          </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/product-management" element={<ProductManagement />}></Route>
          <Route path="/invite" element={<Invite />}></Route>
          <Route path="/time-management" element={<TimeManagement />}></Route>
          <Route
            path="/employee-permissions"
            element={<EmployeePermissions />}
          ></Route>
        </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;