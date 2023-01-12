import React, { useState } from "react";
import { ScheduleModal } from "./ScheduleModal";

import styles from '../Home/Button.module.css';

export default function SchedulePopModal() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
    
  };
  
  return (
    <div className="PopModal" >

      <button className={`${styles.buttoner} ${styles.bn37}`} onClick={openModal}>
      <i class="material-icons large icon-blue md40px">calendar_month</i>
      </button>
      {showModal ? <ScheduleModal setShowModal={setShowModal} /> : null}
    </div>
  );
}