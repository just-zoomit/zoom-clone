import { withEditableMeeting } from "./withEditableMeeting";


// REFERENCE:
export const MeetingInfoForm = withEditableMeeting(({ meeting, onChangeMeeting, onSaveMeeting, onResetMeeting }) => {
    const getTopic = meeting || {};

    const convertDate = (dateString) => {
      const date = new Date(dateString);
      date.setFullYear(2021);
      date.setMonth(7); // month is 0-indexed, so 7 corresponds to August
      date.setDate(1);
      date.setUTCHours(10);
      date.setUTCMinutes(0);
      date.setUTCSeconds(0);

      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();

      const newDate = date.toISOString().slice(0, 10);
      const newTime = hours + ":" + minutes.toString().padStart(2, "0");

      return newDate + " " + newTime;
    };

    const newDate = convertDate(getTopic.start_time).split(" ");


    return meeting ? (
      <div>
       <p>Schedule</p>
        <label>
          Topic:
          <input
            value={getTopic.topic}
            onChange={(e) => onChangeMeeting({ topic: e.target.value })}
          />
        </label>
        &nbsp; &nbsp;
        <br />
        <label htmlFor="date">Date & Time </label>
        <input
          type="date"
          id="datetime-local"
          value={newDate[0]}
          required={true}
          onChange={(e) => onChangeMeeting({ start_time: e.target.value })}
        />
        &nbsp; &nbsp;
        <input
                type="time"
                id="time"
                value={newDate[1]}
                required={true}
                onChange={(e) => onChangeMeeting({ start_time: e.target.value })}
                
              />
        <div>
          <button onClick={onResetMeeting}>Reset</button>
          &nbsp; &nbsp;
          <button onClick={onSaveMeeting}>Update</button>
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    );
  },
  "94527937966"
);
