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
  return !authState.isAuth ? <Outlet /> : <Navigate to="/bms-suite/dashboard" />;
};

const TimeAdminRoutes = () => {
  const { authState } = useContext(AuthContext);

  return authState.isAuth && authState.userType === "time_admin" ? (
    <Outlet />
  ) : authState.isAuth ? (
    <Navigate to="/bms-suite/dashboard" replace />
  ) : (
    <Navigate to="/bms-suite" replace />
  );
};

const PrivateRoutes = () => {
  const { authState } = useContext(AuthContext);
  const { isAuth, userType } = authState;

  if (isAuth && userType === "time_admin") {
    return <Navigate to="/bms-suite/clock-in" replace />;
  }

  return isAuth ? <Outlet /> : <Navigate to="/bms-suite" />;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RestrictedRoutes />}>
            <Route path="/bms-suite" element={<Home />} />
            <Route path="/bms-suite/home" element={<Home />} />
            <Route path="/bms-suite/register" element={<Register />} />
            <Route path="/bms-suite/login" element={<Login />} />
          </Route>

          <Route element={<TimeAdminRoutes />}>
            <Route path="/bms-suite/clock-in" element={<ClockIn />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path="/bms-suite/dashboard" element={<Dashboard />} />
            <Route path="/bms-suite/inventory-summary" element={<InventorySummary />} />
            <Route path="/bms-suite/invite" element={<Invite />} />
            <Route path="/bms-suite/time-management" element={<TimeManagement />} />
            <Route path="/bms-suite/employee-permissions" element={<EmployeePermissions />} />
            <Route path="/bms-suite/product-count" element={<ProductCount />} />
            <Route path="/bms-suite/my-info" element={<MyInfo />} />
            <Route path="/bms-suite/employee-shifts" element={<EmployeeShifts />} />
            <Route path="/bms-suite/cash-control" element={<SafeCounts />} />
            <Route path="/bms-suite/register-deposit" element={<RegisterDeposits />} />
          </Route>

          <Route path="*" element={<Navigate to="/bms-suite/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
