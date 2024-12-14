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
import Deposit from "./pages/Deposit";
import Dashboard from "./pages/Dashboard";
import Count from "./pages/Count";


const PrivateRoutes = () => {
  const authState = useSelector((state) => state.auth);

  if (!authState.isAuth) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

const RestrictedRoutes = () => {
  const authState = useSelector((state) => state.auth);
  return <>{!authState.isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/product-management" element={<ProductManagement />}></Route>
          <Route path="/invite" element={<Invite />}></Route>
          <Route path="/time-management" element={<TimeManagement />}></Route>
          <Route
            path="/employee-permissions"
            element={<EmployeePermissions />}
          ></Route>
         <Route path = "/deposit" element= {<Deposit/>}></Route>
         <Route path="/count" element = {<Count/>}></Route>
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
