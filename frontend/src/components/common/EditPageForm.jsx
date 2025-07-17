import React, { useEffect, useState } from "react";
import { Form, Input, Button, Space, Divider, Select, message } from "antd";

const { Item } = Form;
const { Option } = Select;

const EditPageForm = ({ page, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const [columns, setColumns] = useState([]);
  const [fields, setFields] = useState([]);
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    if (page) {
      form.setFieldsValue({ pageName: page.pageName });

      setColumns(page.table?.columns || []);
      setFields(page.form?.fields || []);
      setButtons(page.buttons || []);

      form.setFieldsValue({
        tableApi: page.table?.api || "",
        formApi: page.form?.submitApi || "",
        method: page.form?.method || "POST",
      });
    }
  }, [page, form]);

  const handleSubmit = async () => {
    try {
      const values = form.getFieldsValue();

      const data = {
        pageName: values.pageName,
        table: {
          api: values.tableApi,
          columns,
        },
        form: {
          submitApi: values.formApi,
          method: values.method,
          fields,
        },
        buttons,
      };

      await onSubmit(data);
      message.success("Cập nhật thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      message.error("Cập nhật thất bại!");
    }
  };

  const handleAddColumn = () =>
    setColumns([...columns, { field: "", label: "" }]);
  const handleAddField = () =>
    setFields([...fields, { name: "", label: "", type: "text" }]);
  const handleAddButton = () =>
    setButtons([...buttons, { label: "", action: "openForm" }]);

  return (
    <div style={{ position: "relative", height: "500px" }}>
      {/* Nội dung cuộn */}
      <div style={{ overflowY: "auto", maxHeight: "420px", paddingRight: 12 }}>
        <Form form={form} layout="vertical">
          <Item label="Tên trang" name="pageName" rules={[{ required: true }]}>
            <Input />
          </Item>

          <Divider orientation="left">Cấu hình bảng</Divider>
          <Item label="API lấy dữ liệu bảng" name="tableApi">
            <Input />
          </Item>

          {columns.map((col, index) => (
            <Space
              key={index}
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <Input
                placeholder="field"
                value={col.field}
                onChange={(e) => {
                  const newCols = [...columns];
                  newCols[index].field = e.target.value;
                  setColumns(newCols);
                }}
              />
              <Input
                placeholder="label"
                value={col.label}
                onChange={(e) => {
                  const newCols = [...columns];
                  newCols[index].label = e.target.value;
                  setColumns(newCols);
                }}
              />
              <Button
                onClick={() =>
                  setColumns(columns.filter((_, i) => i !== index))
                }
              >
                Xoá
              </Button>
            </Space>
          ))}
          <Button type="dashed" onClick={handleAddColumn}>
            ➕ Thêm cột
          </Button>

          <Divider orientation="left">Cấu hình Form</Divider>
          <Item label="API submit form" name="formApi">
            <Input />
          </Item>
          <Item label="Method" name="method">
            <Select>
              <Option value="POST">POST</Option>
              <Option value="PUT">PUT</Option>
            </Select>
          </Item>

          {fields.map((field, index) => (
            <Space
              key={index}
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <Input
                placeholder="name"
                value={field.name}
                onChange={(e) => {
                  const newFields = [...fields];
                  newFields[index].name = e.target.value;
                  setFields(newFields);
                }}
              />
              <Input
                placeholder="label"
                value={field.label}
                onChange={(e) => {
                  const newFields = [...fields];
                  newFields[index].label = e.target.value;
                  setFields(newFields);
                }}
              />
              <Select
                value={field.type}
                onChange={(value) => {
                  const newFields = [...fields];
                  newFields[index].type = value;
                  setFields(newFields);
                }}
                style={{ width: 100 }}
              >
                <Option value="text">Text</Option>
                <Option value="number">Number</Option>
              </Select>
              <Button
                onClick={() => setFields(fields.filter((_, i) => i !== index))}
              >
                Xoá
              </Button>
            </Space>
          ))}
          <Button type="dashed" onClick={handleAddField}>
            ➕ Thêm trường
          </Button>

          <Divider orientation="left">Buttons</Divider>
          {buttons.map((btn, index) => (
            <Space
              key={index}
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <Input
                placeholder="label"
                value={btn.label}
                onChange={(e) => {
                  const newBtns = [...buttons];
                  newBtns[index].label = e.target.value;
                  setButtons(newBtns);
                }}
              />
              <Input
                placeholder="action"
                value={btn.action}
                onChange={(e) => {
                  const newBtns = [...buttons];
                  newBtns[index].action = e.target.value;
                  setButtons(newBtns);
                }}
              />
              <Button
                onClick={() =>
                  setButtons(buttons.filter((_, i) => i !== index))
                }
              >
                Xoá
              </Button>
            </Space>
          ))}
          <Button type="dashed" onClick={handleAddButton}>
            ➕ Thêm nút
          </Button>
        </Form>
      </div>

      {/* Vùng nút hành động cố định */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "#fff",
          borderTop: "1px solid #f0f0f0",
          textAlign: "right",
        }}
      >
        <Space>
          <Button onClick={onCancel}>Huỷ</Button>
          <Button type="primary" onClick={handleSubmit}>
            Cập nhật
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default EditPageForm;
