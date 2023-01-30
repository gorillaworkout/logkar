import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImgNew from "../Asset/IMG_3101.jpg";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { addProductToCart, updateQty } from "../Redux/Actions/ProductActions";
import { BsFillPatchCheckFill } from "react-icons/bs";
export default function Cart() {
  const dispatch = useDispatch();
  const Product = useSelector((state) => state.Product);
  const [reviewModal, setReviewModal] = useState(false);
  const toggleReview = () => setReviewModal(!reviewModal);

  const onOrderData = () => {
    dispatch({ type: "DELETECART" });
    dispatch({ type: "ISSUCCESS", status: true });
    setTimeout(() => {
      dispatch({ type: "ISSUCCESS", status: true });
      dispatch({ type: "ACTIVESTATUS", status: "Store" });
    }, 3000);
  };

  const onReview = () => {
    setReviewModal(true);
  };

  const onMinusQty = (value, id) => {
    value.qty--;
    dispatch(updateQty(Product.cart, value));
  };
  const onPlusQty = (value, id) => {
    value.qty++;
    dispatch(updateQty(Product.cart, value));
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
  return (
    <>
      <div className="cart-card">
        {Product?.cart?.length ? (
          <>
            <div className="detail-cart">{renderCart()}</div>
            <div className="review-card">
              <div className="btn-review" onClick={onReview}>
                Review
              </div>
            </div>
            <Modal isOpen={reviewModal} centered toggle={toggleReview}>
              <ModalHeader toggle={toggleReview}>Purchasing List</ModalHeader>
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
        ) : Product.isSuccess ? (
          <>
            <div className="success-card">
              <BsFillPatchCheckFill className="icon-success rotate" />

              <h1>Pembelian Berhasil</h1>
              <div
                className="btn-home"
                onClick={() =>
                  dispatch({ type: "ACTIVESTATUS", status: "Store" })
                }
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
                onClick={() =>
                  dispatch({ type: "ACTIVESTATUS", status: "Store" })
                }
              >
                Kembali ke Store
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
