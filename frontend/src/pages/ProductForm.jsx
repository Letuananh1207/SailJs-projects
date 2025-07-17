import { useState } from "react";
import { Form, Input, Button, message, Typography } from "antd";

const { Title } = Typography;

function ProductForm({ setProducts, onAddProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  }

  function handleSubmit() {
    onAddProduct(formData);
    message.success("Thêm sản phẩm thành công!"); // Hiển thị thông báo thành công
    setFormData({ name: "", price: 0 });
  }

  return (
    <section className="product-form">
      <Title level={2}>Thêm sản phẩm</Title>

      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Tên sản phẩm" required>
          <Input
            placeholder="Nhập tên sản phẩm"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="off" // Hủy gợi ý
          />
        </Form.Item>

        <Form.Item label="Giá" required>
          <Input
            type="number"
            placeholder="0"
            name="price"
            value={formData.price}
            onChange={handleChange}
            autoComplete="off" // Hủy gợi ý
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}

export default ProductForm;
