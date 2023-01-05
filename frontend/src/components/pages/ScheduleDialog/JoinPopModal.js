import React, { useState } from "react";
import { JoinModal } from "./JoinModal";

import styles from "../Home/Button.module.css";

export default function PopModal() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div>

      <button
        className={`${styles.buttonBlue} ${styles.bn37}`}
        onClick={openModal}
      >
        <i class="material-icons large icon-blue md40px"> add_box</i>
      </button>
      {showModal ? <JoinModal setShowModal={setShowModal} /> : null}
    </div>
  );
}
