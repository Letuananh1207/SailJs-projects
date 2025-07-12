import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <header>
      <div className="theme-bar">
        <select value={theme} onChange={(e) => onChangeTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="header-content">CMS System</div>

      <div className="auth-bar">
        {user ? (
          <>
            <span>👤 Xin chào, {user.username || user.email}</span>
            <button
              onClick={async () => {
                try {
                  await axios.post(
                    "http://localhost:1337/api/auth/logout",
                    {},
                    { withCredentials: true }
                  );
                  window.location.reload(); // refresh trang sau logout
                } catch (err) {
                  console.error("Lỗi khi logout:", err);
                }
              }}
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link to="/auth" className="auth-btn">
              Đăng nhập
            </Link>
            <Link to="/auth" className="auth-btn">
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
