import React from 'react'

import "./Button.css";

import ScheduleDialog from '../ScheduleDialog/ScheduleDialog'
import JoinDialog from '../ScheduleDialog/JoinDialog';

function ButtonsComponent() {
  const [open, setOpen] = React.useState(false);

  const handleNewMeeting = () => {
    
    console.log("New Meeting");
  };

  const handleListMeeting = () => {

    console.log("List Meeting");
    
  };


  return (
    <>
    <div>
        <button className=" bn37" onClick={handleNewMeeting}>
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
        <button className="button-2 bn37" onClick={handleListMeeting}>
          <i class="material-icons large icon-blue">present_to_all</i>
        </button>
        <p> List Meetings</p>
        </div>
        </>
  )
}

export default ButtonsComponent


