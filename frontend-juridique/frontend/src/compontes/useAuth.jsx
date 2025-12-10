import React, { createContext, useState, useContext } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export function RequireAuth({ children }) {
  const { user } = useAuth();

  return user.userType === 'Admin' ? children : <Navigate to="/" replace />;
}
export function RequireAuthAV({ children }) {
  const { user } = useAuth();
  if (user.userType === 'Admin' || user.userType === 'Avocate') {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
}
export function RequireAuthFinance({ children }) {
  const { user } = useAuth();
  if (user.userType === 'Admin' || user.userType === 'Avocate' || user.userType === "Ministère-finances") {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
}
