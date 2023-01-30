import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, updateQty } from "../Redux/Actions/ProductActions";
import ImgNew from "../Asset/IMG_3101.jpg";
export default function Store() {
  const dispatch = useDispatch();
  const Product = useSelector((state) => state.Product);

  const onAddToCart = (value, id) => {
    // dispatch({ type: "ADDPRODUCTTOCART", product: value });
    let data = {
      name: value,
      qty: 1,
    };
    dispatch(addProductToCart(Product.cart, data));
  };
  const renderStoreCard = () => {
    return Product?.allProduct?.results?.map((val, index) => {
      return (
        <>
          <div className="card-item" key={index + 2}>
            <img src={ImgNew} alt="" />
            <p>{val.name}</p>
            <div
              className="btn-add"
              onClick={() => onAddToCart(val.name, index)}
            >
              add
            </div>
          </div>
        </>
      );
    });
  };

  return (
    <>
      <div className="store-card">
        {Product.isDataLengkap ? (
          <>{renderStoreCard()}</>
        ) : (
          <>
            <div className="store-not-ready">
              <p>
                Anda harus melengkapi data diri di halaman Home sebelum dapat
                melihat barang yang tersedia
              </p>
              <div
                className="btn-home"
                onClick={() =>
                  dispatch({ type: "ACTIVESTATUS", status: "Home" })
                }
              >
                Kembali ke Home
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
