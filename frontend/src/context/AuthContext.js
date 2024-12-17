import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { onLogin, onRegistration, onTimeLogin, onLogout } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuth: false,
    userType: null,
    inventoryAccessLevel: -1,
    laborAccessLevel: -1,
    cashAccessLevel: -1,
  });

  const [loading, setLoading] = useState(true);

  const logoutUser = async (navigate) => {
    try {
      await onLogout();
    } catch (error) {
      console.error("Error during logout:", error);
    }

    setAuthState({
      isAuth: false,
      userType: null,
      inventoryAccessLevel: -1,
      laborAccessLevel: -1,
      cashAccessLevel: -1,
    });

    navigate("/home");
  };

  useEffect(() => {
    const fetchUserAuth = async () => {
      setLoading(true);
      try {
        const response = await axios.post("/api/auth", {}, { withCredentials: true });
        const { user_type, inventory_access_level, labor_access_level, cash_access_level } = response.data;

        setAuthState({
          isAuth: true,
          userType: user_type,
          inventoryAccessLevel: inventory_access_level,
          laborAccessLevel: labor_access_level,
          cashAccessLevel: cash_access_level,
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.warn("Authentication expired or invalid.");
        } else {
          console.error("Error fetching user auth:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserAuth();
  }, []);

  const loginUser = async (loginData, userType) => {
    try {
      const { data } = await onLogin(loginData, userType);
      const newState = {
        isAuth: true,
        userType,
        inventoryAccessLevel: data.inventory_access_level || 0,
        laborAccessLevel: data.labor_access_level || 0,
        cashAccessLevel: data.cash_access_level || 0,
      };
      setAuthState(newState);
      return { success: true, message: data.message };
    } catch (error) {
      const errorMessages = error.response?.data?.errors || [];
      return { success: false, errors: errorMessages };
    }
  };

  const timeLoginUser = async (loginData) => {
    try {
      const { data } = await onTimeLogin(loginData);
      const newState = {
        isAuth: true,
        userType: data.user_type,
        inventoryAccessLevel: data.inventory_access_level,
        laborAccessLevel: data.labor_access_level,
        cashAccessLevel: data.cash_access_level,
      };
      setAuthState(newState);
      return { success: true, message: data.message };
    } catch (error) {
      const errorMessages = error.response?.data?.errors || [];
      return { success: false, errors: errorMessages };
    }
  };

  const registerUser = async (registrationData, userType) => {
    try {
      const { data } = await onRegistration(registrationData, userType);
      return { success: true, message: data.message };
    } catch (error) {
      const errorMessages = error.response?.data?.errors || [];
      return { success: false, errors: errorMessages };
    }
  };

  return (
    <AuthContext.Provider
      value={{ authState, loginUser, timeLoginUser, logoutUser, registerUser, loading }}
    >
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="text-gray-600 text-xl">Loading...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};