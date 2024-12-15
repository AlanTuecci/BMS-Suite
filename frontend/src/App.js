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
import Dashboard from "./pages/Dashboard";
import Invite from "./pages/Invite";
import TimeManagement from "./pages/TimeManagement";
import EmployeePermissions from "./pages/EmployeePermissions";
import InventorySummary from "./pages/InventorySummary";
import ProductCount from "./pages/ProductCount";
import { AuthProvider, AuthContext } from "./context/AuthContext";

const PrivateRoutes = () => {
  const { authState } = useContext(AuthContext);

  return authState.isAuth ? <Outlet /> : <Navigate to="/login" />;
};

const RestrictedRoutes = () => {
  const { authState } = useContext(AuthContext);

  return !authState.isAuth ? <Outlet /> : <Navigate to="/dashboard" />;
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

          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory-summary" element={<InventorySummary />} />
            <Route path="/invite" element={<Invite />} />
            <Route path="/time-management" element={<TimeManagement />} />
            <Route path="/employee-permissions" element={<EmployeePermissions />} />
            <Route path="/product-count" element={<ProductCount />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;