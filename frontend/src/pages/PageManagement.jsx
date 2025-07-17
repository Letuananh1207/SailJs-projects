import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Layout,
  Table,
  Button,
  Modal,
  Typography,
  Space,
  Popconfirm,
} from "antd";
import CreatePageForm from "../components/common/CreatePageForm";
import EditPageForm from "../components/common/EditPageForm";

const { Title } = Typography;
const { Content } = Layout;

function PageManagement() {
  const [pages, setPages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);

  const loadPages = async () => {
    try {
      const res = await axios.get("http://localhost:1337/api/page-config/all");
      setPages(res.data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách trang:", err);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const openCreateModal = () => {
    setIsEditMode(false);
    setSelectedPage(null);
    setModalOpen(true);
  };

  const openEditModal = (page) => {
    setIsEditMode(true);
    setSelectedPage(page);
    setModalOpen(true);
  };

  const handleCreateSubmit = async (data) => {
    try {
      await axios.post("http://localhost:1337/api/page-config", data);
      setModalOpen(false);
      loadPages();
    } catch (err) {
      console.error("Lỗi khi tạo trang:", err);
    }
  };

  const handleEditSubmit = async (data) => {
    try {
      await axios.put(
        `http://localhost:1337/api/page-config/${selectedPage.id}`,
        data
      );
      setModalOpen(false);
      loadPages();
    } catch (err) {
      console.error("Lỗi khi cập nhật trang:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1337/api/page-config/${id}`);
      loadPages();
    } catch (err) {
      console.error("Lỗi khi xóa trang:", err);
    }
  };

  const columns = [
    {
      title: "Tên trang",
      dataIndex: "pageName",
      key: "pageName",
    },
    {
      title: "API",
      key: "api",
      render: (_, record) => {
        const api =
          record.form?.submitApi || record.table?.api || "Không có API";
        return <code style={{ fontSize: 12 }}>{api}</code>;
      },
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      render: (text, record) => (
        <pre
          style={{
            fontSize: 12,
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
          }}
        >
          {record
            ? JSON.stringify(record, null, 2).slice(0, 100)
            : "Nội dung không có"}
        </pre>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => openEditModal(record)}>
            ✏️ Chỉnh sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              🗑️ Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ backgroundColor: "white", padding: 24 }}>
      <Title level={2}>Quản lý trang động</Title>

      <Content>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 16,
          }}
        >
          <Button type="primary" onClick={openCreateModal}>
            ➕ Tạo mới
          </Button>
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={pages}
          pagination={false}
        />

        <Modal
          title={isEditMode ? "Chỉnh sửa trang" : "Tạo mới trang"}
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
        >
          {isEditMode ? (
            <EditPageForm
              page={selectedPage}
              onSubmit={handleEditSubmit}
              onCancel={() => setModalOpen(false)}
            />
          ) : (
            <CreatePageForm
              onSubmit={handleCreateSubmit}
              onCancel={() => setModalOpen(false)}
            />
          )}
        </Modal>
      </Content>
    </Layout>
  );
}

export default PageManagement;
