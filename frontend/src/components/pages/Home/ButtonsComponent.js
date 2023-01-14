import React, { useState } from "react";

import NewMeetingButton from "../ScheduleDialog/NewMeetingButton";

import SchedulePopModal from "../ScheduleDialog/SchedulePopModal";
import JoinPopModal from "../ScheduleDialog/JoinPopModal";

import styles from "./Button.module.css";
import "../ScheduleDialog/styles.css";


//  To Be REMOVED


const ButtonsComponent = (props) => {
  // fetch data from backend
  const [meetingDetails, setMeetingDetails] = useState([]);
  // const [vaild, setValid] = useState(false);

  const handleSubmit = (e) => {
    // prevent page refresh
    e.preventDefault();
    //Example of how to pass data to parant component
    props.onSubmit(meetingDetails);
  };

  const handleListMeeting = async () => {
    const getTableData = async () => {
      const response = await fetch("/api/zoom/listmeetings");
      const newData = await response.json();
      console.log("New Data: ", newData.meetings);
      props.onSubmit(newData.meetings);
      setMeetingDetails(newData.meetings);
    };
    getTableData();
  };

  return (
    <>
      <div className={styles.buttonContainer}>
        <div>
          <NewMeetingButton />
          <p> New Meeting</p>
        </div>

        <div  >
          <JoinPopModal />
          <p> Join</p>
        </div>

        <br />

        <div>
          <SchedulePopModal />
      
          <p> Schedule</p>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            {/* disabled="true" */}
            <button
              className={`${styles.buttonBlue} ${styles.bn37}`}
              onClick={handleListMeeting}
            >
              <i class="material-icons md40px"> videocam</i>
            </button>
            <p> List Meetings</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ButtonsComponent;
