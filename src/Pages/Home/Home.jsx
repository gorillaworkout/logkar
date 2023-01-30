import React, { useEffect, useState } from "react";
import Header from "../../Component/Header";
import "../../Style/Home.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ImgNew from "../../Asset/IMG_3101.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  updateQty,
} from "../../Redux/Actions/ProductActions";
import AuthDataService from "../../Services/auth.services";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import DetailUser from "../../Component/DetailUser";
export default function Home() {
  toast.configure()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [reviewModal, setReviewModal] = useState(false);
  const toggleReview = () => setReviewModal(!reviewModal);
  const Product = useSelector((state) => state.Product);
  // console.log(Product,'product')
  const [activeStatus, setActiveStatus] = useState("Home");
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [listHeader, setListHeader] = useState([
    "Home",
    "Store",
    "Shopping Cart",
  ]);




  // HOME EDIT DETAIL


  const onOrderData = () => {
    setIsSuccess(true);
    dispatch({ type: "DELETECART" });
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };


  // HOME EDIT DETAIL

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
    setActiveStatus(value);
  };

  const onLogout = () => {
    navigate("/");
  };
  const onReview = () => {
    setReviewModal(true);
  };


  const onAddToCart = (value, id) => {
    // dispatch({ type: "ADDPRODUCTTOCART", product: value });
    let data = {
      name: value,
      qty: 1,
    };
    dispatch(addProductToCart(Product.cart, data));
  };

  const onMinusQty = (value, id) => {
    value.qty--;
    dispatch(updateQty(Product.cart, value));
  };
  const onPlusQty = (value, id) => {
    value.qty++;
    dispatch(updateQty(Product.cart, value));
  };

  const renderHeader = () => {
    return listHeader.map((val, index) => {
      return (
        <>
          <div
            className={`card-header ${activeStatus === val ? "active" : ""}`}
            onClick={() => onChangeStatusHeader(val)}
            key={index + 1}
          >
            <p>{val}</p>
          </div>
        </>
      );
    });
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

  const renderCart = () => {
    return Product?.cart?.map((val, index) => {
      return (
        <>
          <div className="cart-item">
            <div className="card-left">
              <img src={ImgNew} alt="" />
              <p>{val.name}</p>
            </div>
            <div className="option-qty">
              {val.qty === 1 ? (
                <div className="btn-option disabled">-</div>
              ) : (
                <div
                  className="btn-option"
                  onClick={() => onMinusQty(val, index)}
                >
                  -
                </div>
              )}
              <p>{val.qty}</p>
              <div className="btn-option" onClick={() => onPlusQty(val, index)}>
                +
              </div>
            </div>
          </div>
        </>
      );
    });
  };

  const renderPurchasing = () => {
    return Product?.cart?.map((val, index) => {
      return (
        <>
          <tr>
            <td>{val.name}</td>
            <td>{val.qty}</td>
          </tr>
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
              {activeStatus === "Home" ? (
                <>
                  {/* <DetailUser/> */}
                  {/* HOME */}
                  <DetailUser/>
                  {/* <div className="home-card">
                    <div className="detail-input">
                      <div className="input-detail">
                        <p>Name:</p>
                        <p>{dataCustomer.name}</p>
                      </div>
                      <div className="input-detail">
                        <p>Email:</p>
                        <p>{dataCustomer.email}</p>
                      </div>
                      <div className="input-detail">
                        <p>Telepon:</p>
                        <p>{dataCustomer.telepon}</p>
                      </div>
                      <div className="input-detail">
                        <p>Alamat:</p>
                        <p>{dataCustomer.alamat}</p>
                      </div>
                    </div>
                    {isDataLengkap ? (
                      <></>
                    ) : (
                      <div className="button-lengkapi">
                        <div className="btn-lengkapi" onClick={toggle}>
                          Lengkapi Data Diri
                        </div>
                      </div>
                    )}
                    <Modal isOpen={modal} centered toggle={toggle}>
                      <ModalHeader toggle={toggle}>
                        Lengkapi Data Diri
                      </ModalHeader>
                      <ModalBody>
                        <input
                          type="text"
                          placeholder="Masukan Nama Anda"
                          className="input-data"
                          onChange={(e) => onChangeName(e.target.value)}
                          value={dataCustomer.name}
                        />
                        <input
                          type="text"
                          placeholder="Masukan Email Anda"
                          className="input-data"
                          onChange={(e) => onChangeEmail(e.target.value)}
                          value={dataCustomer.email}
                        />
                        <input
                          type="number"
                          placeholder="Masukan Telepon Anda"
                          className="input-data"
                          onChange={(e) => onChangeTelepon(e.target.value)}
                          value={dataCustomer.telepon}
                        />
                        <input
                          type="text"
                          placeholder="Masukan Alamat Anda"
                          className="input-data"
                          onChange={(e) => onChangeAlamat(e.target.value)}
                          value={dataCustomer.alamat}
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={onSaveData}>Save</Button>
                      </ModalFooter>
                    </Modal>
                  </div> */}
                  {/* HOME */}
                </>
              ) : activeStatus === "Store" ? (
                <>
                  {/* STORE */}
                  <div className="store-card">
                    {Product.isDataLengkap ? (
                      <>{renderStoreCard()}</>
                    ) : (
                      <>
                        <div className="store-not-ready">
                          <p>
                            Anda harus melengkapi data diri di halaman Home
                            sebelum dapat melihat barang yang tersedia
                          </p>
                          <div
                            className="btn-home"
                            onClick={() => setActiveStatus("Home")}
                          >
                            Kembali ke Home
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {/* STORE */}
                </>
              ) : (
                <>
                  {/* Cart */}
                  <div className="cart-card">
                    {Product?.cart?.length ? (
                      <>
                        <div className="detail-cart">{renderCart()}</div>
                        <div className="review-card">
                          <div className="btn-review" onClick={onReview}>
                            Review
                          </div>
                        </div>
                        <Modal
                          isOpen={reviewModal}
                          centered
                          toggle={toggleReview}
                        >
                          <ModalHeader toggle={toggleReview}>
                            Purchasing List
                          </ModalHeader>
                          <ModalBody>
                            <div className="purchase-list">
                              <table>
                                {/* <thead> */}
                                {/* </thead> */}
                                <tbody>
                                  <tr>
                                    <th>Name</th>
                                    <th>Qty</th>
                                  </tr>
                                  {renderPurchasing()}
                                </tbody>
                              </table>
                            </div>
                          </ModalBody>
                          <ModalFooter>
                            <Button onClick={onOrderData}>Order</Button>
                          </ModalFooter>
                        </Modal>
                      </>
                    ) : isSuccess ? (
                      <>
                        <div className="success-card">
                          <BsFillPatchCheckFill className="icon-success rotate" />

                          <h1>Pembelian Berhasil</h1>
                          <div
                            className="btn-home"
                            onClick={() => setActiveStatus("Store")}
                          >
                            Kembali ke Store
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="store-not-ready">
                          <p>Cart Kosong</p>
                          <div
                            className="btn-home"
                            onClick={() => setActiveStatus("Store")}
                          >
                            Kembali ke Store
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {/* Cart */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
