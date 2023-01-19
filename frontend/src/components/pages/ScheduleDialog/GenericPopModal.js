import React, { useState } from "react";
import styled from "styled-components";
import { ScheduleModal } from "./ScheduleModal";
import { JoinModal } from "./JoinModal";

import { BigSuccessButton } from "../Home/buttonComposition";

import { useResource } from "../Home/useResource";

import { useNavigate } from "react-router-dom";
import { InstantMeeting } from "./InstantMeeting";

import { ControlledModal } from "./ControlledModal";
import { ControlledForm } from "./ControlledForm";

// Adpoted Component Composition pattern

const DivContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  grid-gap: 80px;
  padding: 1;
  width: 50%;
  height: 200px;
  flex-direction: row | row-reverse | column | column-reverse;
`;

const joinIcon = <i class="material-icons large icon-blue md40px"> add_box</i>;
const scheduleIcon = (
  <i class="material-icons large icon-blue md40px">calendar_month</i>
);
const listMeetingIcon = (
  <i class="material-icons large icon-blue md40px">list</i>
);



export default function GenericPopModal(props) {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const navigate = useNavigate();

  const openJoinModal = () => {
    setShowModal(true);
  };
  const openScheduleModal = () => {
    setShowModal2(true);
  };

  const [, setData] = useState(null);

  const startInstantMeeting = (data) => {
    const { id, password } = data;
    navigate(`/msdk/?mn=${id}&pw=${password}`);
  };

  const handleDataReceived = (data) => {
    setData(data);
    startInstantMeeting(data);
  };

  const listmeetings = useResource("api/zoom/listmeetings");
  const [, setTableData] = useState(null);  

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      //Test remove later
      setTableData(listmeetings.meetings);

      props.onDataReceived(listmeetings.meetings);
      // setDisplay(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearData = () => {
    props.onClearData();
  }
  // Switch to show modal
  const [shouldShowModal, setShouldShowModal] = useState(false);

  return (
    <>
      <div>
        <DivContainer>
          <InstantMeeting onDataReceived={handleDataReceived} />

          <BigSuccessButton
            text={joinIcon}
            label="Join"
            onClick={openScheduleModal}
          />
          {showModal2 ? <JoinModal setShowModal={setShowModal2} /> : null}
         
          {/* Ex. Controlled Modal and Form */}
          <ControlledModal
          shouldShow={shouldShowModal}
          onRequestClose={() => { 
          alert("Modal closed")
          setShouldShowModal(false)}}
        >
        <ControlledForm />

        </ControlledModal>
        <button onClick={() => setShouldShowModal(!shouldShowModal)}>
        {shouldShowModal ? "Hide Modal": "Show Modal"} 
        </button>

        </DivContainer>

        <DivContainer>
          <BigSuccessButton
            text={scheduleIcon}
            label="Schedule"
            onClick={openJoinModal}
          />
          {showModal ? <ScheduleModal setShowModal={setShowModal} /> : null}

          <BigSuccessButton
            text={listMeetingIcon}
            onClick={handleClick}
            label="List"
          />
          {/* Ex. clear Table data switch */}
          <button onClick={handleClearData}>Clear Data</button>
        </DivContainer>
      </div>
    </>
  );
}
