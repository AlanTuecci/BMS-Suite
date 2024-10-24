import { BrowserRouter, Navigate, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/home";
import Placeholder from "./pages/placeholder";
import Register from "./pages/register";
import Login from "./pages/login";
import { useSelector } from "react-redux";
import Dashboard from './pages/dashboard';

const PrivateRoutes = () => {
  const authState = useSelector((state) => state.auth);
  return <>{authState.isAuth ? <Outlet /> : <Navigate to="/" />}</>;
};

const RestrictedRoutes = () => {
  const authState = useSelector((state) => state.auth);
  return <>{!authState.isAuth ? <Outlet /> : <Navigate to="/placeholder" />}</>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path = "/dashboard" element={<Dashboard/>} ></Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/placeholder" element={<Placeholder />}></Route>
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
