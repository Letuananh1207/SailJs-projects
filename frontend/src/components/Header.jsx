import { Link } from "react-router-dom";

function Header({ theme, onChangeTheme }) {
  return (
    <header>
      <div className="theme-bar">
        <select value={theme} onChange={(e) => onChangeTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div className="header-content">Header</div>
      <div className="auth-bar">
        <Link to="/auth" className="auth-btn">
          Đăng nhập
        </Link>
        <Link to="/auth" className="auth-btn">
          Đăng ký
        </Link>
      </div>
    </header>
  );
}

export default Header;
