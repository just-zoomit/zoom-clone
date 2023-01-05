import React, { useState } from "react";
import "./styles.css";
import { ScheduleModal } from "./ScheduleModal";

import styles from '../Home/Button.module.css';


export default function SchedulePopModal() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
    
  };
  
  return (
    <div className="PopModal" >
      {/* <h1>  Schedule Popup Modal</h1> */}
      
      <button className={`${styles.buttoner} ${styles.bn37}`} onClick={openModal}>
      <i class="material-icons large icon-blue">calendar_month</i>
      </button>
      {showModal ? <ScheduleModal setShowModal={setShowModal} /> : null}
    </div>
  );
}