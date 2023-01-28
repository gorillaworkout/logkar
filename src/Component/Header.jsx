import React from "react";
import '../Style/Header.scss'
import gorillaImg from '../Asset/newbggw.png'
export default function Header() {
  return (
    <>
     <div className="header-card">
        <img src={gorillaImg} alt="" />
     </div>
    </>
  );
}
