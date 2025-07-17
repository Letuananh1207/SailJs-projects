import React, { useState } from "react";
import { Form, Input, Button, Space, Card, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreatePageForm = ({ onSubmit, onCancel }) => {
  const [pageName, setPageName] = useState("");
  const [tableColumns, setTableColumns] = useState([{ field: "", label: "" }]);
  const [formFields, setFormFields] = useState([
    { name: "", label: "", type: "text" },
  ]);
  const [buttons, setButtons] = useState([{ label: "", action: "openForm" }]);

  const handleSubmit = () => {
    const data = {
      pageName,
      table: {
        api: `/api/${pageName.toLowerCase().replace(/\s/g, "-")}`,
        columns: tableColumns,
      },
      form: {
        method: "POST",
        submitApi: `/api/${pageName.toLowerCase().replace(/\s/g, "-")}`,
        fields: formFields,
      },
      buttons,
    };
    onSubmit(data);

    setPageName("");
    setTableColumns([{ field: "", label: "" }]);
    setFormFields([{ name: "", label: "", type: "text" }]);
    setButtons([{ label: "", action: "openForm" }]);
  };

  return (
    <div
      style={{ maxHeight: "500px", overflowY: "auto", paddingBottom: "80px" }}
    >
      <Form layout="vertical">
        <Form.Item label="Tên trang" required>
          <Input
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
          />
        </Form.Item>

        <Card title="Cột bảng dữ liệu">
          {tableColumns.map((col, index) => (
            <Space
              key={index}
              align="baseline"
              style={{ display: "flex", marginBottom: 8 }}
            >
              <Input
                placeholder="Field"
                value={col.field}
                onChange={(e) => {
                  const newCols = [...tableColumns];
                  newCols[index].field = e.target.value;
                  setTableColumns(newCols);
                }}
              />
              <Input
                placeholder="Label"
                value={col.label}
                onChange={(e) => {
                  const newCols = [...tableColumns];
                  newCols[index].label = e.target.value;
                  setTableColumns(newCols);
                }}
              />
              {index > 0 && (
                <MinusCircleOutlined
                  onClick={() =>
                    setTableColumns(tableColumns.filter((_, i) => i !== index))
                  }
                />
              )}
            </Space>
          ))}
          <Button
            type="dashed"
            onClick={() =>
              setTableColumns([...tableColumns, { field: "", label: "" }])
            }
            block
          >
            <PlusOutlined /> Thêm cột
          </Button>
        </Card>

        <Card title="Trường trong Form" style={{ marginTop: 16 }}>
          {formFields.map((field, index) => (
            <Space
              key={index}
              align="baseline"
              style={{ display: "flex", marginBottom: 8 }}
            >
              <Input
                placeholder="Tên (name)"
                value={field.name}
                onChange={(e) => {
                  const newFields = [...formFields];
                  newFields[index].name = e.target.value;
                  setFormFields(newFields);
                }}
              />
              <Input
                placeholder="Nhãn (label)"
                value={field.label}
                onChange={(e) => {
                  const newFields = [...formFields];
                  newFields[index].label = e.target.value;
                  setFormFields(newFields);
                }}
              />
              <Select
                value={field.type}
                onChange={(value) => {
                  const newFields = [...formFields];
                  newFields[index].type = value;
                  setFormFields(newFields);
                }}
                style={{ width: 120 }}
              >
                <Option value="text">Text</Option>
                <Option value="number">Number</Option>
                <Option value="email">Email</Option>
              </Select>
              {index > 0 && (
                <MinusCircleOutlined
                  onClick={() =>
                    setFormFields(formFields.filter((_, i) => i !== index))
                  }
                />
              )}
            </Space>
          ))}
          <Button
            type="dashed"
            onClick={() =>
              setFormFields([
                ...formFields,
                { name: "", label: "", type: "text" },
              ])
            }
            block
          >
            <PlusOutlined /> Thêm trường
          </Button>
        </Card>

        <Card title="Buttons" style={{ marginTop: 16 }}>
          {buttons.map((btn, index) => (
            <Space
              key={index}
              align="baseline"
              style={{ display: "flex", marginBottom: 8 }}
            >
              <Input
                placeholder="Nhãn"
                value={btn.label}
                onChange={(e) => {
                  const newBtns = [...buttons];
                  newBtns[index].label = e.target.value;
                  setButtons(newBtns);
                }}
              />
              <Select
                value={btn.action}
                onChange={(value) => {
                  const newBtns = [...buttons];
                  newBtns[index].action = value;
                  setButtons(newBtns);
                }}
                style={{ width: 150 }}
              >
                <Option value="openForm">Mở Form</Option>
                <Option value="custom">Custom Action</Option>
              </Select>
              {index > 0 && (
                <MinusCircleOutlined
                  onClick={() =>
                    setButtons(buttons.filter((_, i) => i !== index))
                  }
                />
              )}
            </Space>
          ))}
          <Button
            type="dashed"
            onClick={() =>
              setButtons([...buttons, { label: "", action: "openForm" }])
            }
            block
          >
            <PlusOutlined /> Thêm nút
          </Button>
        </Card>
      </Form>

      <Space style={{ position: "absolute", bottom: "10px", right: "10px" }}>
        <Button onClick={onCancel}>Hủy</Button>
        <Button type="primary" onClick={handleSubmit}>
          Tạo mới
        </Button>
      </Space>
    </div>
  );
};

export default CreatePageForm;
