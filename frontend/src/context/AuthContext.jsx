import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../services/authService";

const AuthContext = createContext();

const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      const payload = parseJwt(storedToken);
      return {
        token: storedToken,
        usuario: payload.usuario,
        rol: payload.roles[0],
        id: payload.id,
      };
    }
    return null;
  });

  const login = async (credentials) => {
    const { token } = await loginUser(credentials);
    const payload = parseJwt(token);
    const authData = {
      token,
      usuario: payload.usuario,
      rol: payload.roles[0],
      id: payload.id,
    };
    setAuth(authData);
    sessionStorage.setItem("token", token);
  };

  const register = async (form) => {
    await registerUser(form);
  };

  const logout = () => {
    setAuth(null);
    sessionStorage.removeItem("token");
  };

  const isAuthenticated = () => !!auth?.token;
  const hasRole = (rol) => auth?.rol === rol;

  return (
    <AuthContext.Provider value={{ auth, login, logout, register, isAuthenticated, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
