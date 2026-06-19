import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Add_Products from './Pages/Add_Products'
import View_Products from './Pages/View_Products'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Header from './components/Header'
import Dashboard from './Pages/Dashboard'
import { toast, ToastContainer } from 'react-toastify'

const App = () => {

  const [product, setProduct] = useState({});
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validation()) return;

    if (editId !== null) {

      const updatedList = list.map((item) =>
        item.id === editId
          ? { ...product, id: editId }
          : item
      );

      setList(updatedList);
      localStorage.setItem(
        "product",
        JSON.stringify(updatedList)
      );

      toast.success("Product Updated");

      setProduct({});
      setEditId(null);

      navigate("/view-products");

    } else {

      const newList = [
        ...list,
        {
          ...product,
          id: Date.now()
        }
      ];

      setList(newList);

      localStorage.setItem(
        "product",
        JSON.stringify(newList)
      );

      toast.success("Product Added");

      setProduct({});

      navigate("/view-products");
    }
  };

  const handleDelete = (id) => {

    const newList = list.filter(
      (item) => item.id !== id
    );

    setList(newList);

    localStorage.setItem(
      "product",
      JSON.stringify(newList)
    );

    toast.warning("Product Deleted");
  };

  const handleEdit = (id) => {

    const data = list.find(
      (item) => item.id === id
    );

    setProduct(data);
    setEditId(id);

    navigate("/add-products");
  };

  const validation = () => {

    let error = {};

    if (!product.image)
      error.image = "Image URL is Required";

    if (!product.productName)
      error.productName = "Product Name is Required";

    if (!product.category)
      error.category = "Category is Required";

    if (!product.price)
      error.price = "Price is Required";

    if (!product.description)
      error.description = "Description is Required";

    setError(error);

    return Object.keys(error).length === 0;
  };

  useEffect(() => {

    const oldData = JSON.parse(
      localStorage.getItem("product")
    );

    if (oldData) {
      setList(oldData);
    }

  }, []);

  return (
    <>
      <Header />

      <Routes>

        <Route
          path="/add-products"
          element={
            <Add_Products
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              product={product}
              error={error}
            />
          }
        />

        <Route
          path="/view-products"
          element={
            <View_Products
              list={list}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          }
        />

        <Route
          path="/dashboard"
          element={<Dashboard list={list} />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>

      <ToastContainer />
    </>
  )
}

export default App