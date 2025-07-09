import { useState } from "react";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // true = login, false = register

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-side-bar">
        <h2>Welcome to CMS</h2>
        <p>Hệ thống quản lý nội dung thông minh.</p>
      </div>

      <div className="auth-content">
        <div className="auth-card">
          <h2>{isLogin ? "Đăng nhập" : "Đăng ký"}</h2>

          <form>
            {!isLogin && (
              <div>
                <label>Họ tên:</label>
                <input type="text" placeholder="Họ và tên" required />
              </div>
            )}
            <div>
              <label>Email:</label>
              <input type="email" placeholder="Nhập email" required />
            </div>
            <div>
              <label>Mật khẩu:</label>
              <input type="password" placeholder="Nhập mật khẩu" required />
            </div>

            <button type="submit">{isLogin ? "Đăng nhập" : "Đăng ký"}</button>
          </form>

          <p className="switch-auth">
            {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
            <span onClick={handleToggle}>
              {isLogin ? "Đăng ký" : "Đăng nhập"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
