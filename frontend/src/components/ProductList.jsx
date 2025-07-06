import { useState } from "react";

function ProductList({products, onDeleteProduct, onUpdateProduct}){
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState({
        name : "",
        price : 0
    });
    function handleEdit(index){
        setEditIndex(index);
        setEditValue({...products[index]});
    }

    function handleChange(e){
        const { name, value } = e.target;
        setEditValue(prev => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value
        }));
    };

    function handleSave(index, value){
        onUpdateProduct(index, editValue);
        setEditIndex(null);
    };

    return(
        <section className="product-list">
            <h2>Danh sách sản phẩm</h2>
            <ul>
                {products.map((product, index) => {
                    return <>
                    <li key={index}>
                        {index !== editIndex ? (
                            <>
                                {product.name} - {product.price} VND
                                <button onClick={() => {onDeleteProduct(product.id)}}>
                                    x
                                </button>
                                <button onClick={()=> handleEdit(index)}>
                                    Edit
                                </button>
                            </>
                        ) : (
                            <>
                                <input type="text" value={editValue.name} onChange={handleChange} name="name"/>
                                <input type="number" value={editValue.price} onChange={handleChange} name="price"/>
                                <button onClick={()=> handleSave(product.id, editValue)}>Lưu</button>
                                <button onClick={()=> setEditIndex(null)}>Hủy</button>
                            </>
                        )
                        }
                    </li>
                    </>
                })}
            </ul>
        </section>
    );
}

export default ProductList;