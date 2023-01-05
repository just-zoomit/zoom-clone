import React, { useState } from "react";
import { JoinModal } from "./JoinModal";

import "./styles.css";
import styles from '../Home/Button.module.css';
// import classes from './Styles.module.css';

export default function PopModal() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
  
  
    setShowModal(true);
    
  };
  
  return (
    <div  >
      {/* <h1>  Join Popup Modal</h1> */}
      
      <button className={`${styles.buttonBlue} ${styles.bn37}`}  onClick={openModal} >
      <i class="material-icons large icon-blue"> add_box</i>
      </button>
      {showModal ? <JoinModal setShowModal={setShowModal} /> : null}
    </div>
  );
}