import { Outlet, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import Header from "../pages/Header";
import Footer from "../pages/Footer";
import usePermission from "../hooks/usePermission";
import { useAuth } from "../contexts/AuthContext"; // THÊM DÒNG NÀY

const { Content, Sider } = Layout;

function MainLayout({ theme, onChangeTheme, lastVisit }) {
  const can = usePermission();
  const { user } = useAuth(); // THÊM DÒNG NÀY

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header theme={theme} onChangeTheme={onChangeTheme} />
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {/* Nếu là admin, chỉ hiện 2 mục sau */}
            {user?.isAdmin ? (
              <>
                <Menu.Item key="role-config">
                  <Link to="/role-config">Config Role</Link>
                </Menu.Item>
                <Menu.Item key="dynamic-config">
                  <Link to="/dynamic-config">Config Page</Link>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="about">
                  <Link to="/about">Giới thiệu</Link>
                </Menu.Item>

                <Menu.Item key="products">
                  <Link to="/products">Danh sách sản phẩm</Link>
                </Menu.Item>

                {can("product", "create") && (
                  <Menu.Item key="add">
                    <Link to="/add">Thêm sản phẩm</Link>
                  </Menu.Item>
                )}

                {can("dynamic", "read") && (
                  <Menu.Item key="dynamicPages">
                    <Link to="/dynamic-pages">Trang động</Link>
                  </Menu.Item>
                )}

                {can("user", "read") && (
                  <Menu.Item key="role-config">
                    <Link to="/role-config">Config Role</Link>
                  </Menu.Item>
                )}

                {can("page", "read") && (
                  <Menu.Item key="dynamic-config">
                    <Link to="/dynamic-config">Config Page</Link>
                  </Menu.Item>
                )}
              </>
            )}
          </Menu>
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#fff",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Footer lastVisit={lastVisit} />
    </Layout>
  );
}

export default MainLayout;
