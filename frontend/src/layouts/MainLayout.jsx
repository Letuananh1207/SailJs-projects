// src/layouts/MainLayout.jsx
import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout({ theme, onChangeTheme, lastVisit }) {
  return (
    <>
      <div className="app-layout">
        <Header theme={theme} onChangeTheme={onChangeTheme} />
        <div className="container">
          <div className="side-bar grow">
            <nav>
              <ul>
                <li>
                  <a href="/about">Giới thiệu</a>
                </li>
                <li>
                  <a href="/products">Danh sách sản phẩm</a>
                </li>
                <li>
                  <a href="/add">Thêm sản phẩm</a>
                </li>
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
