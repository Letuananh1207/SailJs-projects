import { useState, useMemo } from "react";
import Input from "./common/Input";
import Pagination from "./common/Pagination";

const PAGE_SIZE = 5;

function ProductList({ products, onDeleteProduct, onUpdateProduct }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editIndex, setEditIndex] = useState(null); // để xác định vị trí item đang sửa
  const [editValue, setEditValue] = useState({ name: "", price: 0 });

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
      <h2>Danh sách sản phẩm</h2>

      <Input
        type="text"
        placeholder="Tìm sản phẩm..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      <ul>
        {paginatedProducts.map((product) => (
          <li key={product._id}>
            {product.originalIndex !== editIndex ? (
              <>
                {product.name} - {product.price} VND
                <button onClick={() => onDeleteProduct(product.id)}>Xoá</button>
                <button onClick={() => handleEdit(product.originalIndex)}>
                  Sửa
                </button>
              </>
            ) : (
              <>
                <Input
                  type="text"
                  value={editValue.name}
                  onChange={handleChange}
                  name="name"
                />
                <Input
                  type="number"
                  value={editValue.price}
                  onChange={handleChange}
                  name="price"
                />
                <button onClick={() => handleSave(product.id)}>Lưu</button>
                <button onClick={() => setEditIndex(null)}>Hủy</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
}

export default ProductList;
