import React, { useEffect, useState } from "react";
import Header from "../../Component/Header";
import "../../Style/Home.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import DetailUser from "../../Component/DetailUser";
import Store from "../../Component/Store";
import Cart from '../../Component/Cart'
export default function Home() {
  toast.configure()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Product = useSelector((state) => state.Product);
  const [listHeader, setListHeader] = useState([
    "Home",
    "Store",
    "Shopping Cart",
  ]);

  const onChangeStatusHeader = (value) => {
    // if (isDataLengkap) {
    //   if(Product?.cart.length && value === 'Shopping Cart'){
    //     setActiveStatus(value);
    //   }else {
    //     setActiveStatus('Store');
    //   }
    //   if(value === 'Home') {
    //     setActiveStatus(value);
    //   }
    // }
    dispatch({ type: "ACTIVESTATUS",status:value})
  };

  const onLogout = () => {
    navigate("/");
  };




  const renderHeader = () => {
    return listHeader.map((val, index) => {
      return (
        <>
          <div
            className={`card-header ${Product?.activeStatus === val ? "active" : ""}`}
            onClick={() => onChangeStatusHeader(val)}
            key={index + 1}
          >
            <p>{val}</p>
          </div>
        </>
      );
    });
  };



  return (
    <>
      <div className="wrapper-container">
        <div className="auth-wrapper">
          <Header />
          <div className="home-container">
            <div className="header-home">
              <div className="home-left">{renderHeader()}</div>
              <div className="home-right" onClick={onLogout}>
                <p>Logout</p>
              </div>
            </div>
            <div className="body-home">
              {Product.activeStatus === "Home" ? (
                  <DetailUser/>
              ) : Product.activeStatus === "Store" ? (
                  <Store/>
              ) : (
                  <Cart/>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
