import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import axios from 'axios';
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import Header from './components/Header';
import Footer from './components/Footer'
import AboutPage from './components/AboutPage'

import './App.css'

function App() {
  const [message, setMessage] = useState(""); 
  const [products, setProducts] = useState(
    []
  );
  const [theme, setTheme] = useState("light");
  const [lastVisit, setLastVisit] = useState("");

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

    // Thời gian ghé thăm
    const now = new Date().toLocaleString();

    const last = localStorage.getItem("lastVisit");
    if (last) {
      setLastVisit(last);
    } else {
      setLastVisit("Đây là lần truy cập đầu tiên.");
    }

    localStorage.setItem("lastVisit", now);
    setTheme(localStorage.getItem("theme"));
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
  
  function saveTheme(theme){
    setTheme(theme);
    localStorage.setItem("theme", theme);
  }

  return (
    <>
    <BrowserRouter>
      <div className="app-layout">
        <Header theme = {theme} onChangeTheme = {saveTheme}/>
        <div className='container'>
          <div className='side-bar grow'>
            <nav>
              <ul>
                <li><a href="/about">Giới thiệu</a></li>
                <li><a href="/products">Danh sách sản phẩm</a></li>
                <li><a href="/add">Thêm sản phẩm</a></li>
              </ul>
            </nav>
          </div>
          <div className='content'>
            <Routes>
                <Route path= "/about" element = {<AboutPage message={message}/>}/>
                <Route path= "/add" element = {<ProductForm setProducts={setProducts} onAddProduct={onAddProduct}/>}/>
                <Route path= "/products" element = {<ProductList products={products} onDeleteProduct={onDeleteProduct} onUpdateProduct= {onUpdateProduct}/>}/>
            </Routes>
          </div>
        </div>
        <Footer lastVisit={lastVisit}/>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App

