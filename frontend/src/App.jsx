import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
    fetch('http://localhost:1337/api/ping')
    .then((res)=> res.json())
    .then((data)=> {
      setMessage(data.message);
    })
    .catch((error) => console.log(error))
  },[]);

  function onAddProduct(product){
    setProducts(prev => [...prev, product] )
  };

  function onDeleteProduct(index){
    setProducts(prev => products.filter((_, i) => i !== index));
  }

  function onUpdateProduct(index, newValue){
    setProducts(prev =>
      prev.map((item, i)=> {
        return i == index ? newValue : item
      })
    );
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
