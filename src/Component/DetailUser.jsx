import React, { useState, useEffect } from "react";
import AuthDataService from "../Services/auth.services";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
export default function DetailUser() {
  toast.configure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Product = useSelector((state) => state.Product);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [dataCustomer, setDataCustomer] = useState({
    name: "",
    email: "",
    telepon: "",
    alamat: "",
  });

  // FETCHING USER FROM FIRESTORE
  const fetching = async () => {
    const Auth = await AuthDataService.getAuth(Product?.idActive);
    setDataCustomer(Auth.data());

    if (
      Auth.data().name !== "" &&
      Auth.data().email !== "" &&
      Auth.data().telepon !== "" &&
      Auth.data().alamat !== ""
    ) {
      dispatch({ type: "DATALENGKAP", result: true });
    } else {
      dispatch({ type: "DATALENGKAP", result: false });
    }
  };
  useEffect(() => {
    if (Product?.idActive !== "") {
      fetching();
    } else {
      navigate("/");
    }
  }, []);

  // FETCHING USER FROM FIRESTORE

  const onChangeName = (value) => {
    setDataCustomer({
      ...dataCustomer,
      name: value,
    });
  };
  const onChangeEmail = (value) => {
    setDataCustomer({
      ...dataCustomer,
      email: value,
    });
  };
  const onChangeTelepon = (value) => {
    setDataCustomer({
      ...dataCustomer,
      telepon: value,
    });
  };
  const onChangeAlamat = (value) => {
    setDataCustomer.alamat = value;
    setDataCustomer({
      ...dataCustomer,
      alamat: value,
    });
  };

  const onCheckData = () => {
    if (
      dataCustomer.name !== "" &&
      dataCustomer.email !== "" &&
      dataCustomer.telepon !== "" &&
      dataCustomer.alamat !== ""
    ) {
      dispatch({ type: "DATALENGKAP", result: true });
      return true;
    } else {
      dispatch({ type: "DATALENGKAP", result: false });
      return false;
    }
  };

  const onSaveData = async () => {
    let checkData = onCheckData();
    if (checkData) {
      await AuthDataService.updateAuth(Product?.idActive, dataCustomer);
      setModal(false);
    } else {
      toast.error(`Ada data kosong`, {
        position: "top-center",
        autoClose: 1400,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setModal(true);
    }
  };
  return (
    <>
      <div className="home-card">
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
        {Product.isDataLengkap ? (
          <></>
        ) : (
          <div className="button-lengkapi">
            <div className="btn-lengkapi" onClick={toggle}>
              Lengkapi Data Diri
            </div>
          </div>
        )}
        <Modal isOpen={modal} centered toggle={toggle}>
          <ModalHeader toggle={toggle}>Lengkapi Data Diri</ModalHeader>
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
              type="text"
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
      </div>
    </>
  );
}
