import React, { useState } from "react";
import "./styles.css";
import { ScheduleModal } from "./ScheduleModal";
// import classes from './Styles.module.css';

export default function SchedulePopModal() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    // document.getElementById("css-dwuj3p-MuiTableCell-root").style.position = "none";
  
    setShowModal(true);
    
  };
  
  return (
    <div className="PopModal" >
      {/* <h1>  Schedule Popup Modal</h1> */}
      
      <button onClick={openModal}>
      <i class="material-icons large icon-blue">calendar_month</i>
      </button>
      {showModal ? <ScheduleModal setShowModal={setShowModal} /> : null}
    </div>
  );
}