import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Form, Input, Button, Typography, message, Card } from "antd";

const { Title, Paragraph } = Typography;

function AuthPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // "login" hoặc "register"

  const [isLogin, setIsLogin] = useState(mode !== "register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setIsLogin(mode !== "register");
  }, [mode]);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (values) => {
    const endpoint = isLogin ? "/auth/login" : "/auth/register";
    const payload = isLogin
      ? { email, password }
      : { email, password, username };

    try {
      const res = await axios.post(
        `http://localhost:1337/api${endpoint}`,
        payload,
        { withCredentials: true }
      );

      console.log("✅ Thành công:", res.data);

      if (isLogin) {
        message.success("Đăng nhập thành công!");
        window.location.href = "/";
      } else {
        message.success("Đăng ký thành công! Mời bạn đăng nhập.");
        setEmail("");
        setPassword("");
        setUsername("");
        setIsLogin(true);
      }
    } catch (err) {
      console.error("❌ Lỗi:", err.response || err.message);
      const msg =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Đã có lỗi xảy ra";
      setError(msg);
      message.error(msg);
      setSuccess("");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          flex: 1,
          padding: "40px 20px",
          background: "#f0f4ff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRight: "1px solid #e5e7eb",
        }}
      >
        <Title level={1} style={{ textAlign: "center", color: "#1e40af" }}>
          Welcome to CMS*
        </Title>
        <Paragraph
          style={{ textAlign: "center", maxWidth: 280, color: "#4b5563" }}
        >
          Hệ thống quản lý nội dung thông minh.
        </Paragraph>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "flex-start",
          }}
        >
          <Title level={4} style={{ marginBottom: 0, color: "black" }}>
            Tài khoản thử nghiệm
          </Title>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div
              style={{
                background: "#fff",
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #e0e0e0",
                color: "#1f2937",
              }}
            >
              <strong style={{ color: "#374151" }}># Admin:</strong>{" "}
              admin@example.com / 123456
            </div>
            <div
              style={{
                background: "#fff",
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #e0e0e0",
                color: "#1f2937",
              }}
            >
              <strong style={{ color: "#374151" }}># User:</strong>{" "}
              user@example.com / 123456
            </div>
          </div>
        </div>
      </div>

      {/* Form content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            width: 420,
            padding: "32px",
            borderRadius: "16px",
            background: "#fefefe",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          <Title
            level={2}
            style={{
              textAlign: "center",
              color: "#1e40af",
              marginBottom: 24,
            }}
          >
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </Title>

          <Form
            name="auth"
            onFinish={handleSubmit}
            layout="vertical"
            autoComplete="off"
            initialValues={{ email, password, username }}
          >
            {!isLogin && (
              <Form.Item
                label="Tên hiển thị"
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tên hiển thị!" },
                ]}
              >
                <Input
                  placeholder="Tên hiển thị"
                  size="large"
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="off"
                  style={{ background: "#f9fafb", borderRadius: 8 }}
                />
              </Form.Item>
            )}

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input
                type="email"
                placeholder="Nhập email"
                autoComplete="off"
                size="large"
                onChange={(e) => setEmail(e.target.value)}
                style={{ background: "#f9fafb", borderRadius: 8 }}
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                placeholder="Nhập mật khẩu"
                size="large"
                onChange={(e) => setPassword(e.target.value)}
                style={{ background: "#f9fafb", borderRadius: 8 }}
              />
            </Form.Item>

            {error && (
              <Paragraph style={{ color: "#dc2626", marginBottom: 0 }}>
                {error}
              </Paragraph>
            )}
            {success && (
              <Paragraph style={{ color: "#16a34a", marginBottom: 0 }}>
                {success}
              </Paragraph>
            )}

            <Form.Item style={{ marginTop: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{
                  width: "100%",
                  borderRadius: 8,
                  background: "#2563eb",
                  borderColor: "#2563eb",
                  fontWeight: 600,
                }}
              >
                {isLogin ? "Đăng nhập" : "Đăng ký"}
              </Button>
            </Form.Item>
          </Form>

          <Paragraph
            style={{ textAlign: "center", marginTop: 24, color: "#4b5563" }}
          >
            {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
            <span
              onClick={handleToggle}
              style={{
                cursor: "pointer",
                color: "#2563eb",
                fontWeight: 500,
                textDecoration: "underline",
              }}
            >
              {isLogin ? "Đăng ký" : "Đăng nhập"}
            </span>
          </Paragraph>
        </Card>
      </div>
    </div>
  );
}

export default AuthPage;
