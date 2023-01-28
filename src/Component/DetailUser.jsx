import React from "react";

export default function DetailUser() {

    
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
            <Button onClick={onOrderData}>Save</Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}
