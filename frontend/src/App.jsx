import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import AboutPage from "./components/AboutPage";
import AuthPage from "./components/AuthPage";
import "./App.css";
import MainLayout from "./layouts/MainLayout";

function App() {
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [theme, setTheme] = useState("light");
  const [lastVisit, setLastVisit] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/ping")
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((error) => console.error(error));

    axios.get("http://localhost:1337/api/product").then((res) => {
      setProducts(res.data);
    });

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
    axios.post("http://localhost:1337/api/product/add", product).then((res) => {
      setProducts(res.data);
    });
  }

  async function onDeleteProduct(index) {
    axios
      .post(`http://localhost:1337/api/product/delete/${index}`)
      .then((res) => {
        setProducts(res.data);
      });
  }

  async function onUpdateProduct(index, newValue) {
    axios
      .post(`http://localhost:1337/api/product/update/${index}`, newValue)
      .then((res) => {
        setProducts(res.data);
      });
  }

  function saveTheme(theme) {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route
            element={
              <MainLayout
                theme={theme}
                onChangeTheme={saveTheme}
                lastVisit={lastVisit}
              />
            }
          >
            <Route path="/" element={<AboutPage message={message} />} />
            <Route path="/about" element={<AboutPage message={message} />} />
            <Route
              path="/add"
              element={
                <ProductForm
                  setProducts={setProducts}
                  onAddProduct={onAddProduct}
                />
              }
            />
            <Route
              path="/products"
              element={
                <ProductList
                  products={products}
                  onDeleteProduct={onDeleteProduct}
                  onUpdateProduct={onUpdateProduct}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
