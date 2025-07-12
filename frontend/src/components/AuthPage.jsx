import { useState } from "react";
import axios from "axios";

function AuthPage() {
  // ---------------------- State ----------------------
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ---------------------- Toggle login/register ----------------------
  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
  };

  // ---------------------- Handle Submit ----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

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
        setSuccess("Đăng nhập thành công!");
        setError("");
        window.location.href = "/";
      } else {
        setSuccess("Đăng ký thành công! Mời bạn đăng nhập.");
        setEmail("");
        setPassword("");
        setUsername("");
        setIsLogin(true);
        setError("");
      }
    } catch (err) {
      console.error("❌ Lỗi:", err.response || err.message);
      const msg =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Đã có lỗi xảy ra";
      setError(msg);
      setSuccess("");
    }
  };

  // ---------------------- JSX ----------------------
  return (
    <div className="auth-wrapper">
      {/* Sidebar */}
      <div className="auth-side-bar">
        <h2>Welcome to CMS</h2>
        <p>Hệ thống quản lý nội dung thông minh.</p>
      </div>

      {/* Form content */}
      <div className="auth-content">
        <div className="auth-card">
          <h2>{isLogin ? "Đăng nhập" : "Đăng ký"}</h2>

          <form onSubmit={handleSubmit} noValidate>
            {/* Username */}
            {!isLogin && (
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Tên hiển thị"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label>Mật khẩu:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            {/* Error / Success messages */}
            {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
            {success && (
              <p style={{ color: "green", marginTop: 8 }}>{success}</p>
            )}

            {/* Submit */}
            <button type="submit" style={{ marginTop: 12 }}>
              {isLogin ? "Đăng nhập" : "Đăng ký"}
            </button>
          </form>

          {/* Toggle login/register */}
          <p className="switch-auth">
            {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
            <span
              onClick={handleToggle}
              style={{ cursor: "pointer", color: "blue" }}
            >
              {isLogin ? "Đăng ký" : "Đăng nhập"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
