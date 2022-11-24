import React, { useState } from "react";

import "./Button.css";

import ScheduleDialog from "../ScheduleDialog/ScheduleDialog";
import JoinDialog from "../ScheduleDialog/JoinDialog";

const ButtonsComponent = (props) => {
  const handleNewMeeting = () => {
    console.log("New Meeting");
  };

  // fetch data from backend
  const [meetingDetails, setMeetingDetails] = useState([]);

  //Example of how to set entered event value
  const handleChange = async (e) => {
    const getTableData = async (e) => {
      const response = await fetch("/api/zoom/listmeetings");
      const newData = await response.json();
      console.log("New Data: ", newData.meetings);

      setMeetingDetails(newData.meetings);

      //
    };
    getTableData();
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

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <button className=" bn37" onClick={handleListMeeting}>
            <i class="material-icons large icon-blue">videocam</i>
          </button>
          <p> New Meeting</p>
        </form>
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
          <button className=" bn37" onClick={handleListMeeting}>
            <i class="material-icons large icon-blue">videocam</i>
          </button>
          <p> List Meetings</p>
        </form>
      </div>
    </>
  );
};

export default ButtonsComponent;
