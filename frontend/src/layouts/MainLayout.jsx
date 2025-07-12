// src/layouts/MainLayout.jsx
import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import usePermission from "../hooks/usePermission";

function MainLayout({ theme, onChangeTheme, lastVisit }) {
  const can = usePermission(); // 👈 gọi hook kiểm tra quyền

  return (
    <>
      <div className="app-layout">
        <Header theme={theme} onChangeTheme={onChangeTheme} />
        <div className="container">
          <div className="side-bar grow">
            <nav>
              <ul>
                <li>
                  <Link to="/about">Giới thiệu</Link>
                </li>

                {can("product", "read") && (
                  <li>
                    <Link to="/products">Danh sách sản phẩm</Link>
                  </li>
                )}

                {can("product", "create") && (
                  <li>
                    <Link to="/add">Thêm sản phẩm</Link>
                  </li>
                )}

                {can("user", "read") && (
                  <li>
                    <Link to="/config">Config Role</Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>

          <div className="content">
            <Outlet />
          </div>
        </div>
        <Footer lastVisit={lastVisit} />
      </div>
    </>
  );
}

export default MainLayout;
