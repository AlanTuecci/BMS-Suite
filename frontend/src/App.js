import React, { useContext } from "react";
import { BrowserRouter, Navigate, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Invite from "./pages/Invite";
import TimeManagement from "./pages/TimeManagement";
import EmployeePermissions from "./pages/EmployeePermissions";
import InventorySummary from "./pages/InventorySummary";
import ProductCount from "./pages/ProductCount";
import ClockIn from "./pages/ClockIn";
import MyInfo from "./pages/MyInfo";
import EmployeeShifts from "./pages/EmployeeShifts";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import SafeCounts from "./pages/SafeCounts";
import RegisterDeposits from "./pages/RegisterDeposits";

const RestrictedRoutes = () => {
  const { authState } = useContext(AuthContext);
  return !authState.isAuth ? <Outlet /> : <Navigate to="/dashboard" />;
};

const TimeAdminRoutes = () => {
  const { authState } = useContext(AuthContext);

  return authState.isAuth && authState.userType === "time_admin" ? (
    <Outlet />
  ) : authState.isAuth ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/home" replace />
  );
};

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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory-summary" element={<InventorySummary />} />
            <Route path="/invite" element={<Invite />} />
            <Route path="/time-management" element={<TimeManagement />} />
            <Route path="/employee-permissions" element={<EmployeePermissions />} />
            <Route path="/product-count" element={<ProductCount />} />
            <Route path="/my-info" element={<MyInfo />} />
            <Route path="/employee-shifts" element={<EmployeeShifts />} />
            <Route path="/cash-control" element={<SafeCounts />} />
            <Route path="/register-deposit" element={<RegisterDeposits />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
