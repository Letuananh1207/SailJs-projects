// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/auth/profile", { withCredentials: true })
      .then((res) => {
        console.log("🌟 Lấy user thành công:", res.data.user);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error("❌ Không lấy được user:", err);
        setUser(null);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
