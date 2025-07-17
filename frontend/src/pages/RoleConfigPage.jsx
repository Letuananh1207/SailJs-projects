import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  message,
  Select,
  Checkbox,
  Typography,
  Modal,
} from "antd";

const { Option } = Select;
const { Title } = Typography;
const permissionsList = ["create", "read", "update", "delete"];
const resourceList = ["user", "product", "dynamic"];

export default function RoleConfigPage() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedResource, setSelectedResource] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);

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

  const handleSave = async () => {
    const user = users.find((u) => u.id === currentUserId);
    const userRole = [...(user.role || [])];

    if (!selectedResource || selectedPermissions.length === 0) return;

    const index = userRole.findIndex((r) => r.resource === selectedResource);
    if (index !== -1) {
      userRole[index].permission = selectedPermissions;
    } else {
      userRole.push({
        resource: selectedResource,
        permission: selectedPermissions,
      });
    }

    await updateUserRole(currentUserId, userRole);
    message.success("Cập nhật quyền thành công!");
    setShowAddForm(false);
    setSelectedResource("");
    setSelectedPermissions([]);
  };

  const handleRemove = async (userId, resourceToRemove) => {
    const user = users.find((u) => u.id === userId);
    const filtered = (user.role || []).filter(
      (r) => r.resource !== resourceToRemove
    );
    await updateUserRole(userId, filtered);
  };

  const togglePermission = (perm) => {
    setSelectedPermissions((prev) => {
      return prev.includes(perm)
        ? prev.filter((p) => p !== perm)
        : [...prev, perm];
    });
  };

  const columns = [
    {
      title: "📧 Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
    },
    {
      title: "🛡️ Quyền",
      key: "role",
      render: (text, record) => (
        <div>
          {(record.role || []).map((r, idx) => (
            <div key={idx} style={{ marginBottom: "6px" }}>
              <strong style={{ textTransform: "uppercase" }}>
                {r.resource}
              </strong>
              :
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
              <Button
                onClick={() => handleRemove(record.id, r.resource)}
                style={{
                  marginLeft: "6px",
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  fontSize: "0.75rem",
                }}
              >
                Xóa
              </Button>
            </div>
          ))}

          <div style={{ textAlign: "right", marginTop: "6px" }}>
            <Button
              onClick={() => {
                setCurrentUserId(record.id);
                setShowAddForm(true);
              }}
              style={{
                fontSize: "0.8rem",
                background: "#3498db",
                color: "white",
                border: "none",
              }}
            >
              ➕ Thêm quyền
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Quản lý phân quyền người dùng</Title>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={false}
        bordered
        size="middle" // Đặt kích thước bảng
        style={{ fontSize: "0.85rem", padding: "2rem" }} // Điều chỉnh kích thước chữ
      />

      <Modal
        title="Thêm quyền"
        visible={showAddForm}
        onOk={handleSave}
        onCancel={() => setShowAddForm(false)}
        okButtonProps={{
          disabled: !selectedResource || selectedPermissions.length === 0,
        }}
      >
        <Select
          style={{ width: "100%", marginBottom: "6px" }}
          value={selectedResource}
          onChange={(value) => {
            setSelectedResource(value);
            setSelectedPermissions([]); // Reset permissions when resource changes
          }}
        >
          <Option value="">-- Chọn resource --</Option>
          {resourceList.map((res) => (
            <Option key={res} value={res}>
              {res}
            </Option>
          ))}
        </Select>
        <div>
          {permissionsList.map((perm) => (
            <Checkbox
              key={perm}
              checked={selectedPermissions.includes(perm)}
              onChange={() => togglePermission(perm)}
              style={{ marginRight: "1rem" }}
            >
              {perm.toUpperCase()}
            </Checkbox>
          ))}
        </div>
      </Modal>
    </div>
  );
}
