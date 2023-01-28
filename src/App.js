import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./Pages/Home/Home";
import Login from './Pages/Login/Login'
import { GetAllProduct } from "./Redux/Actions/ProductActions";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchingAllProduct();
  }, []);
  const fetchingAllProduct = () => {
    dispatch(GetAllProduct());
  };

  return (
    <Routes className="routing-container">
      <Route exact path="/" element={<Login new_params={"testing"} />} />
      <Route exact path="/home" element={<Home new_params={"testing"} />} />
    </Routes>
  );
}

export default App;
