// src/hooks/usePermission.js
import { useAuth } from "../contexts/AuthContext";

export default function usePermission() {
  const { user } = useAuth();

  return (resource, action) => {
    if (!user) return false;

    // Nếu là admin thì cho phép tất cả
    if (user.isAdmin === true) return true;

    // Nếu không phải admin thì kiểm tra theo quyền trong role
    if (!Array.isArray(user.role)) return false;

    const role = user.role.find((r) => r.resource === resource);
    return role?.permission?.includes(action) || false;
  };
}
