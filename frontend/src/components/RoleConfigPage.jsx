import React, { useEffect, useState } from "react";
import axios from "axios";

const permissionsList = ["create", "read", "update", "delete"];
const resourceList = ["user", "product", "order"];

export default function RoleConfigPage() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState({});
  const [showAddForm, setShowAddForm] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:1337/api/users");
    setUsers(res.data);
  };

  const updateUserRole = async (userId, updatedRole) => {
    await axios.put(`http://localhost:1337/api/users/${userId}/permissions`, {
      role: updatedRole,
    });
    fetchUsers();
  };

  const handleSave = async (userId) => {
    const user = users.find((u) => u.id === userId);
    const userRole = [...(user.role || [])];
    const { resource, permissions } = editing[userId];

    if (!resource || permissions.length === 0) return;

    const index = userRole.findIndex((r) => r.resource === resource);
    if (index !== -1) {
      userRole[index].permission = permissions;
    } else {
      userRole.push({ resource, permission: permissions });
    }

    await updateUserRole(userId, userRole);
    setEditing((prev) => ({ ...prev, [userId]: null }));
    setShowAddForm((prev) => ({ ...prev, [userId]: false }));
  };

  const handleRemove = async (userId, resourceToRemove) => {
    const user = users.find((u) => u.id === userId);
    const filtered = (user.role || []).filter(
      (r) => r.resource !== resourceToRemove
    );
    await updateUserRole(userId, filtered);
  };

  const togglePermission = (userId, perm) => {
    setEditing((prev) => {
      const current = prev[userId] || { resource: "", permissions: [] };
      const currentPermissions = current.permissions || [];

      const updatedPermissions = currentPermissions.includes(perm)
        ? currentPermissions.filter((p) => p !== perm)
        : [...currentPermissions, perm];

      return {
        ...prev,
        [userId]: {
          ...current,
          permissions: updatedPermissions,
        },
      };
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🔐 Quản lý phân quyền người dùng</h1>
      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          tableLayout: "fixed",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={{ width: "30%", background: "#f0f0f0" }}>📧 Email</th>
            <th style={{ width: "70%", background: "#f0f0f0" }}>🛡️ Quyền</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const editingResource = editing[u.id]?.resource;
            const isEditingExisting = u.role?.some(
              (r) => r.resource === editingResource
            );

            return (
              <tr key={u.id}>
                <td style={{ verticalAlign: "top" }}>{u.email}</td>
                <td>
                  {(u.role || []).map((r, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "#f9f9f9",
                        marginBottom: "6px",
                        padding: "6px 8px",
                        borderRadius: "4px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "0.85rem",
                      }}
                    >
                      <div>
                        <strong style={{ textTransform: "uppercase" }}>
                          {r.resource}
                        </strong>
                        :{" "}
                        {r.permission.map((p, i) => (
                          <span
                            key={i}
                            style={{
                              background: "#ddd",
                              marginRight: "5px",
                              padding: "2px 6px",
                              borderRadius: "3px",
                              fontSize: "0.75rem",
                              display: "inline-block",
                            }}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                      <div>
                        <button
                          onClick={() =>
                            setEditing((prev) => ({
                              ...prev,
                              [u.id]: {
                                resource: r.resource,
                                permissions: r.permission,
                              },
                            }))
                          }
                          style={{
                            marginRight: "6px",
                            background: "#f1c40f",
                            color: "black",
                            border: "none",
                            padding: "2px 6px",
                            fontSize: "0.75rem",
                            borderRadius: "3px",
                            cursor: "pointer",
                          }}
                        >
                          ✏ Sửa
                        </button>
                        <button
                          onClick={() => handleRemove(u.id, r.resource)}
                          style={{
                            background: "#e74c3c",
                            color: "white",
                            border: "none",
                            padding: "2px 6px",
                            fontSize: "0.75rem",
                            borderRadius: "3px",
                            cursor: "pointer",
                          }}
                        >
                          ✖
                        </button>
                      </div>
                    </div>
                  ))}

                  {!showAddForm[u.id] && !editing[u.id] && (
                    <button
                      onClick={() =>
                        setShowAddForm((prev) => ({ ...prev, [u.id]: true }))
                      }
                      style={{
                        marginTop: "6px",
                        fontSize: "0.8rem",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        background: "#3498db",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      ➕ Thêm quyền
                    </button>
                  )}

                  {(showAddForm[u.id] || editing[u.id]) && (
                    <div
                      style={{
                        marginTop: "8px",
                        background: "#fefefe",
                        padding: "10px",
                        border: "1px dashed #ccc",
                        borderRadius: "5px",
                        fontSize: "0.85rem",
                      }}
                    >
                      <div style={{ marginBottom: "5px" }}>
                        <strong>
                          {isEditingExisting ? "✏ Sửa quyền" : "➕ Thêm quyền"}
                        </strong>
                      </div>
                      {!isEditingExisting && (
                        <div style={{ marginBottom: "6px" }}>
                          <select
                            value={editing[u.id]?.resource || ""}
                            onChange={(e) =>
                              setEditing((prev) => ({
                                ...prev,
                                [u.id]: {
                                  ...prev[u.id],
                                  resource: e.target.value,
                                },
                              }))
                            }
                          >
                            <option value="">-- Chọn resource --</option>
                            {resourceList.map((res) => (
                              <option key={res} value={res}>
                                {res}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div>
                        {permissionsList.map((perm) => (
                          <label
                            key={perm}
                            style={{
                              marginRight: "1rem",
                              display: "inline-block",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={
                                editing[u.id]?.permissions?.includes(perm) ||
                                false
                              }
                              onChange={() => togglePermission(u.id, perm)}
                            />
                            {perm.toUpperCase()}
                          </label>
                        ))}
                      </div>
                      <div style={{ marginTop: "6px" }}>
                        <button
                          onClick={() => handleSave(u.id)}
                          style={{
                            background: "#2ecc71",
                            color: "white",
                            border: "none",
                            padding: "4px 10px",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          disabled={
                            !editing[u.id]?.resource ||
                            (editing[u.id]?.permissions?.length || 0) === 0
                          }
                        >
                          💾 Lưu
                        </button>
                        <button
                          onClick={() => {
                            setEditing((prev) => ({ ...prev, [u.id]: null }));
                            setShowAddForm((prev) => ({
                              ...prev,
                              [u.id]: false,
                            }));
                          }}
                          style={{
                            marginLeft: "6px",
                            background: "#aaa",
                            color: "white",
                            border: "none",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          ✖ Hủy
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
