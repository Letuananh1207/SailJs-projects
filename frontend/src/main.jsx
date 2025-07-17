import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/reset.css"; // ✅ đúng với Ant Design v5
import "./index.css";

import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
