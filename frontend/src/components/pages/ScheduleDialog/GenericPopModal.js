import React, { useState } from "react";
import styled from "styled-components";
import { ScheduleModal } from "./ScheduleModal";
import { JoinModal } from "./JoinModal";

import { DangerBlueButton, BigSuccessButton } from "../Home/buttonComposition";
import styles from "../Home/Button.module.css";

const DivContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  grid-gap: 80px;
  padding: 1;
  width:50%; 
  height:200px;
  flex-direction: row | row-reverse | column | column-reverse;
`;

const joinIcon = (
  <i class="material-icons large icon-blue md40px"> add_box</i>
);
const scheduleIcon = (
  <i class="material-icons large icon-blue md40px">calendar_month</i>
);
const listMeetingIcon = (
  <i class="material-icons large icon-blue md40px">list</i>
);
const newMeetingIcon = (
  <i class="material-icons large icon-blue md40px">videocam</i>
);

export default function GenericPopModal() {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  
  const openModal = () => {
    setShowModal(true);
  };
  const openModal2 = () => {
    setShowModal2(true);
  };
  
  return (
    <>
    <div >
      <DivContainer>
        <DangerBlueButton  text={newMeetingIcon} props={styles.bn37} />
        <BigSuccessButton text={joinIcon} onClick={openModal2} />
        {showModal2 ? <JoinModal setShowModal={setShowModal2} /> : null}
       
        
      </DivContainer>

      <DivContainer>
       
       <BigSuccessButton text={scheduleIcon} onClick={openModal} />
       
        <BigSuccessButton text={listMeetingIcon}  />
        {showModal ? <ScheduleModal setShowModal={setShowModal} /> : null}
      </DivContainer>

      </div>
    </>
  );
}
