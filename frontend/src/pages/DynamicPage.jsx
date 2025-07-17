import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Select,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Col,
} from "antd";
import axios from "axios";
import usePermission from "../hooks/usePermission";

const { Option } = Select;

export default function DynamicPage() {
  const [pageList, setPageList] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [config, setConfig] = useState(null);
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const can = usePermission();

  useEffect(() => {
    fetchPageList();
  }, []);

  useEffect(() => {
    if (selectedPageId) fetchPageConfig(selectedPageId);
  }, [selectedPageId]);

  const fetchPageList = async () => {
    try {
      const res = await axios.get("http://localhost:1337/api/page-config");
      setPageList(res.data);
    } catch (err) {
      console.error(err);
      message.error("Không lấy được danh sách page");
    }
  };

  const fetchPageConfig = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:1337/api/page-config/${id}`
      );
      setConfig(res.data);

      if (res.data?.table?.api) {
        const dataRes = await axios.get(res.data.table.api);
        const dataArr = Array.isArray(dataRes.data) ? dataRes.data : [];
        setData(dataArr);
      }
    } catch (err) {
      console.error(err);
      message.error("Không tải được cấu hình trang");
    }
  };

  const handleSubmit = async (values) => {
    try {
      await axios.post(config.form.submitApi, values);
      message.success("Tạo mới thành công");
      setOpenModal(false);
      fetchPageConfig(selectedPageId);
      form.resetFields();
    } catch (err) {
      console.error(err);
      message.error("Tạo mới thất bại");
    }
  };

  const columns =
    config?.table?.columns?.map((col) => ({
      title: col.label,
      dataIndex: col.field,
      key: col.field,
    })) || [];

  return (
    <div style={{ padding: 24 }}>
      <Row justify="end" style={{ marginBottom: 16 }}>
        <Col>
          <Select
            style={{ width: 300 }}
            placeholder="Chọn một trang"
            onChange={(val) => setSelectedPageId(val)}
            value={selectedPageId}
          >
            {pageList.map((page) => (
              <Option key={page.id} value={page.id}>
                {page.pageName}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      {/* Hiển thị trang được chọn */}
      {config && (
        <Card
          title={
            <>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                {config.pageName}
              </span>
              <div style={{ fontSize: "12px", color: "#888" }}>
                API GET: {config?.table?.api}
              </div>
            </>
          }
          extra={
            config?.form?.submitApi &&
            can("dynamic", "create") && (
              <Button
                type="primary"
                size="small"
                onClick={() => setOpenModal(true)}
              >
                + {config.buttons?.[0]?.label || "Tạo mới"}
              </Button>
            )
          }
        >
          <Table
            dataSource={Array.isArray(data) ? data : []}
            columns={columns}
            rowKey={(record) => record.id || record._id}
            scroll={{ x: "max-content" }}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      )}

      {/* Modal tạo mới */}
      <Modal
        title="Tạo mới"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          {config?.form?.fields?.map((field, index) => (
            <Form.Item
              key={index}
              name={field.name}
              label={field.label}
              rules={[
                { required: true, message: `Vui lòng nhập ${field.label}` },
              ]}
            >
              {field.type === "text" && <Input />}
              {field.type === "number" && (
                <InputNumber style={{ width: "100%" }} />
              )}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
}
