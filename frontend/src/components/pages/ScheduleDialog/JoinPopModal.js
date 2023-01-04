import React, { useState } from "react";
import "./styles.css";
import { JoinModal } from "./JoinModal";
// import classes from './Styles.module.css';

export default function PopModal() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    // document.getElementById("css-dwuj3p-MuiTableCell-root").style.position = "none";
  
    setShowModal(true);
    
  };
  
  return (
    <div className="PopModal" >
      {/* <h1>  Schedule Popup Modal</h1> */}
      
      <button onClick={openModal}>
      <i class="material-icons large icon-blue"> add_box</i>
      </button>
      {showModal ? <JoinModal setShowModal={setShowModal} /> : null}
    </div>
  );
}