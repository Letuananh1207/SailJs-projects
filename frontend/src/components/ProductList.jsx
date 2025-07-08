import { useState, useMemo } from "react";
import Input from "./common/Input";
import Pagination from "./common/Pagination";

const PAGE_SIZE = 5;

function ProductList({ products, onDeleteProduct, onUpdateProduct }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState({ name: "", price: 0 });

    // Lọc danh sách theo từ khoá
    const filteredProducts = useMemo(() => {
        return products
            .map((product, index) => ({ ...product, originalIndex: index }))
            .filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [products, searchTerm]);

    // Tổng số trang
    const totalPages = useMemo(() => {
        return Math.ceil(filteredProducts.length / PAGE_SIZE);
    }, [filteredProducts]);

    // Sản phẩm của trang hiện tại
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return filteredProducts.slice(start, start + PAGE_SIZE);
    }, [filteredProducts, currentPage]);

    function handleEdit(index) {
        setEditIndex(index);
        setEditValue({ ...products[index] });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setEditValue(prev => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value
        }));
    }

    function handleSave(index) {
        onUpdateProduct(index, editValue);
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
                        {editIndex !== product.originalIndex ? (
                            <>
                                {product.name} - {product.price} VND
                                <button onClick={() => onDeleteProduct(product._id)}>x</button>
                                <button onClick={() => handleEdit(product.originalIndex)}>Edit</button>
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
                                <button onClick={() => handleSave(product.originalIndex)}>Lưu</button>
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
