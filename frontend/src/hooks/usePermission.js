// src/hooks/usePermission.js
import { useAuth } from "../contexts/AuthContext";

export default function usePermission() {
  const { user } = useAuth();
  console.log("🔍 user from context:", user); // 👈 in ra thử

  return (resource, action) => {
    if (!user || !Array.isArray(user.role)) return false;
    const role = user.role.find((r) => r.resource === resource);
    return role?.permission.includes(action);
  };
}
