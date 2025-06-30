import { useState } from "react";

function ProductForm({setProducts, onAddProduct}){
    const [formData, setFormData] = useState({
        name : "",
        price : 0,
    });

    function handleChange(e){
        const {name , value} = e.target;
        setFormData(prev => (
            {...prev, [name] : value}
        ))
    };

    return(
        <section className="product-form">
            <h2>Thêm sản phẩm</h2>
            <table className="form-content">
                    <tr>
                        <td><label htmlFor="product-name">Tên sản phẩm</label></td>
                        <td><input type="text" id="product-name" placeholder="Áo phao" name="name" onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="product-price">Giá</label></td>
                        <td><input type="number" id="product-price" placeholder="0" name="price" onChange={handleChange}/></td>
                    </tr>
            </table>
            <button onClick={()=> onAddProduct(formData)}>Lưu danh sách</button>
        </section>
    );
}

export default ProductForm;