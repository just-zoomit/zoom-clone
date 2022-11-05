import React from 'react'

import "./Button.css";

function ButtonsComponent() {
  return (
    <>
    <div>
        <button className=" bn37">
          <i class="material-icons large icon-blue">videocam</i>
        </button>
        <p> New Meeting</p>
        </div>

        <div>
        <button className="button-2 bn37">
          <i class="material-icons large icon-blue" >
            {" "}
            add_box
          </i>
        </button>
        <p> Join</p>
        </div>
       
        <br />
        <div>
        <button className="button-2 bn37">
          <i class="material-icons large icon-blue"  >calendar_month</i>
        </button>
        <p> Schedule</p>

        </div>
      <div>
        <button className="button-2 bn37">
          <i class="material-icons large icon-blue">present_to_all</i>
        </button>
        <p> Share</p>
        </div>
        </>
  )
}

export default ButtonsComponent


