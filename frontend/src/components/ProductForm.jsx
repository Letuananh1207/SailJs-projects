import { useState } from "react";

function ProductForm({ setProducts, onAddProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
  });

  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  }

  function handleSubmit() {
    onAddProduct(formData);
    setSuccessMessage("Thêm sản phẩm thành công!");
    setFormData({ name: "", price: 0 });

    // Ẩn thông báo sau 3 giây
    setTimeout(() => setSuccessMessage(""), 3000);
  }

  return (
    <section className="product-form">
      <h2>Thêm sản phẩm</h2>

      <table className="form-content">
        <tbody>
          <tr>
            <td>
              <label htmlFor="product-name">Tên sản phẩm</label>
            </td>
            <td>
              <input
                type="text"
                id="product-name"
                placeholder="....."
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="product-price">Giá</label>
            </td>
            <td>
              <input
                type="number"
                id="product-price"
                placeholder="0"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <button onClick={handleSubmit}>Thêm</button>

      {/* Hiển thị thông báo nếu có */}
      {successMessage && (
        <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>
      )}
    </section>
  );
}

export default ProductForm;
