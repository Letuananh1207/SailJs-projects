import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Select, Button, Typography, Space } from "antd";

const { Header: AntdHeader } = Layout;
const { Text } = Typography;

function Header({ theme, onChangeTheme }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/auth/profile", {
        withCredentials: true,
      })
      .then((res) => setUser(res.data.user))
      .catch((err) => console.error("Lỗi lấy profile:", err));
  }, []);

  return (
    <AntdHeader
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme === "dark" ? "#002140" : "#f0f2f5",
        color: theme === "dark" ? "#ffffff" : "#333333",
        borderBottom: `1px solid ${theme === "dark" ? "#cccccc" : "#aaaaaa"}`,
        boxShadow:
          theme === "dark"
            ? "0 2px 10px rgba(255, 255, 255, 0.2)"
            : "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Text
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginRight: "16px", // Khoảng cách với nút điều chỉnh theme
          color: theme === "dark" ? "#ffffff" : "#333333",
        }}
      >
        CMS System
      </Text>

      <div className="theme-bar" style={{ marginRight: "16px" }}>
        <Select
          value={theme}
          onChange={onChangeTheme}
          style={{ width: 100 }}
          options={[
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
          ]}
        />
      </div>

      <div className="auth-bar" style={{ marginLeft: "auto" }}>
        {user ? (
          <Space>
            <Text style={{ color: theme === "dark" ? "#ffffff" : "#333333" }}>
              👤 Xin chào, {user.username || user.email}
            </Text>
            <Button
              type="link"
              style={{ color: theme === "dark" ? "#ffffff" : "#333333" }}
              onClick={async () => {
                try {
                  await axios.post(
                    "http://localhost:1337/api/auth/logout",
                    {},
                    { withCredentials: true }
                  );
                  window.location.href = "/"; // chuyển về trang chủ
                  setTimeout(() => {
                    window.location.reload(); // sau khi chuyển thì refresh lại
                  }, 100);
                } catch (err) {
                  console.error("Lỗi khi logout:", err);
                }
              }}
            >
              Đăng xuất
            </Button>
          </Space>
        ) : (
          <Space>
            <Link to="/auth?mode=login">
              <Button
                type="link"
                style={{ color: theme === "dark" ? "#ffffff" : "#333333" }}
              >
                Đăng nhập
              </Button>
            </Link>
            <Link to="/auth?mode=register">
              <Button
                type="link"
                style={{ color: theme === "dark" ? "#ffffff" : "#333333" }}
              >
                Đăng ký
              </Button>
            </Link>
          </Space>
        )}
      </div>
    </AntdHeader>
  );
}

export default Header;
