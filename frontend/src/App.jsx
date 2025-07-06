import { useState, useEffect } from 'react'
import axios from 'axios';
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import './App.css'

function App() {
  const [message, setMessage] = useState(""); 
  const [products, setProducts] = useState(
    [
    { name: "Áo thun", price: 150000 },
    { name: "Quần jeans", price: 350000 },
    { name: "Giày sneaker", price: 800000 }
  ]
  );
  useEffect(() => {
    axios.get('http://localhost:1337/api/ping')
      .then((res) => {
        setMessage(res.data.message);  
      })
      .catch((error) => console.error(error));

    axios.get('http://localhost:1337/api/product')
      .then((res)=> {
        setProducts(res.data)
      })
  }, []);


  async function onAddProduct(product) {
    axios.post('http://localhost:1337/api/product/add', product)
    .then((res)=> {
      setProducts(res.data)
    })
  };

  async function onDeleteProduct(index){
    axios.post(`http://localhost:1337/api/product/delete/${index}`)
    .then((res)=> {
      setProducts(res.data)
    })
  }

  async function onUpdateProduct(index, newValue){
    axios.post(`http://localhost:1337/api/product/update/${index}`, newValue)
    .then((res)=> {
      setProducts(res.data);
    })
  }

  return (
    <>
    <header>
      <h1>Header</h1>
    </header>
    <div className='container'>
      <div className='side-bar grow'>
        <nav>
          <ul>
            <li><a href="#gioithieu">Giới thiệu</a></li>
            <li><a href="#sanpham">Danh sách sản phẩm</a></li>
            <li><a href="#form">Thêm sản phẩm</a></li>
          </ul>
        </nav>
      </div>
      <main className='content'>
        <section id='gioithieu'>
          <h2>Welcome to My CMS</h2>
          <p>{message}</p>
        </section>
        <ProductList products={products} onDeleteProduct={onDeleteProduct} onUpdateProduct= {onUpdateProduct}/>
        <ProductForm setProducts={setProducts} onAddProduct={onAddProduct}/>
      </main>
      <div className='grow'></div>
    </div>
    </>
  )
}

export default App

