import React, { useEffect, useState } from "react";

import "./Button.css";

import ScheduleDialog from "../ScheduleDialog/ScheduleDialog";
import JoinDialog from "../ScheduleDialog/JoinDialog";

const ButtonsComponent = (props) => {
  // fetch data from backend
  const [meetingDetails, setMeetingDetails] = useState([]);
  const [vaild, setValid] = useState(false);

  const handleNewMeeting = () => {
    console.log("New Meeting");
  };
 

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

  // useEffect (() => {
  //   // setValid(startTime && endTime < 24 && endTime > startTime);
  // }, []);

  return (
    <>
      <div>
        
          <button className=" bn37" >
            <i class="material-icons large icon-blue">videocam</i>
          </button>
          <p> New Meeting</p>
      
      </div>

      <div>
        <JoinDialog />
        <p> Join</p>
      </div>

      <br />

      <div>
        <ScheduleDialog />
        <p> Schedule</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <button className="bn37"  onClick={handleListMeeting} disabled="true">
            <i class="material-icons large icon-blue">videocam</i>
          </button>
          <p> List Meetings</p>
        </form>
      </div>
    </>
  );
};

export default ButtonsComponent;
