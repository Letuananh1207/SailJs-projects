import { useState, useMemo } from "react";
import {
  Input,
  Button,
  Card,
  Row,
  Col,
  Pagination,
  Typography,
  Space,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import usePermission from "../hooks/usePermission";

const { Title } = Typography;
const PAGE_SIZE = 5;

function ProductList({ products, onDeleteProduct, onUpdateProduct }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState({ name: "", price: 0 });

  const can = usePermission();

  const filteredProducts = useMemo(() => {
    return products
      .map((product, index) => ({ ...product, originalIndex: index }))
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [products, searchTerm]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / PAGE_SIZE);
  }, [filteredProducts]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  function handleEdit(productIndexInOriginal) {
    setEditIndex(productIndexInOriginal);
    setEditValue({ ...products[productIndexInOriginal] });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEditValue((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  }

  function handleSave(productId) {
    onUpdateProduct(productId, editValue);
    setEditIndex(null);
  }

  return (
    <section className="product-list">
      <Title level={2}>Danh sách sản phẩm</Title>

      <Row justify="end" style={{ marginBottom: 16 }}>
        <Col span={6} style={{ display: "flex" }}>
          <Input
            placeholder="Tìm sản phẩm..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{ borderRadius: "4px 0 0 4px", flex: 1 }}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            style={{ borderRadius: "0 4px 4px 0" }}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        {paginatedProducts.map((product) => (
          <Col span={8} key={product._id} style={{ marginBottom: 24 }}>
            <Card
              title={
                product.originalIndex !== editIndex
                  ? product.name
                  : "Sửa sản phẩm"
              }
              extra={
                product.originalIndex !== editIndex ? (
                  <Space>
                    {can("product", "delete") && (
                      <Button
                        type="link"
                        onClick={() => onDeleteProduct(product.id)}
                      >
                        Xoá
                      </Button>
                    )}
                    {can("product", "update") && (
                      <Button
                        type="link"
                        onClick={() => handleEdit(product.originalIndex)}
                      >
                        Sửa
                      </Button>
                    )}
                  </Space>
                ) : (
                  <Space>
                    {can("product", "update") && (
                      <>
                        <Button
                          type="primary"
                          onClick={() => handleSave(product.id)}
                        >
                          Lưu
                        </Button>
                        <Button onClick={() => setEditIndex(null)}>Hủy</Button>
                      </>
                    )}
                  </Space>
                )
              }
              style={{
                backgroundColor: "#f5f5f5",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              }}
            >
              {product.originalIndex !== editIndex ? (
                <span>{product.price} VND</span>
              ) : (
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Input
                    type="text"
                    value={editValue.name}
                    onChange={handleChange}
                    name="name"
                    placeholder="Tên sản phẩm"
                  />
                  <Input
                    type="number"
                    value={editValue.price}
                    onChange={handleChange}
                    name="price"
                    placeholder="Giá sản phẩm"
                  />
                </Space>
              )}
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination
        current={currentPage}
        total={totalPages * PAGE_SIZE}
        pageSize={PAGE_SIZE}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: 16, textAlign: "right" }}
        itemRender={(current, type, originalElement) => {
          const buttonStyle = { lineHeight: "32px", padding: "0 8px" };
          if (type === "prev") {
            return <Button style={buttonStyle}>{"<"}</Button>;
          }
          if (type === "next") {
            return <Button style={buttonStyle}>{">"}</Button>;
          }
          return originalElement;
        }}
      />
    </section>
  );
}

export default ProductList;
