import { BrowserRouter, Navigate, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/home";
import Placeholder from "./pages/placeholder";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Invite from "./pages/invite";
import PrdMgmt from './pages/prodmgmt';
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const authState = useSelector((state) => state.auth);

  if (!authState.isAuth) {
    return <Navigate to="/" />;
  }
  return <Outlet />; 
}

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
          <Route path="/placeholder" element={<Placeholder />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/prdmgmt" element={<PrdMgmt />}></Route>
          <Route path="/invite" element={<Invite />}></Route>
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
