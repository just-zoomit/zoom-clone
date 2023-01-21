import React, { useEffect, useState } from "react";

import { emailRegex } from "../../shared";

import { DangerBlueButton } from "../Home/buttonComposition";


// Adpoted Component Composition pattern and pass data from child to parent pattern

export function InstantMeeting(props) {
  const [, setOpen] = React.useState(false);
  const [state] = useState({
    topic: "Personal Meeting Room",
    name: "Donte",
    email: "donte.Zoomie@gmail.com",
    role: 1,
  });
  const { topic, name, email, role } = state;

  const [, setValid] = useState(false);
  const prevDateTimeValue = React.useRef("");

  const [, setData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const POST_OPTIONS = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic,
          first_name: name,
          email: email,
          start_time: prevDateTimeValue.current,
        }),
      };

      const response = await fetch("/api/zoom/create", POST_OPTIONS);

      const json = await response.json();
      console.log("ID & PW", json);
      setData(json);
      props.onDataReceived(json);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setValid(email && emailRegex.test(email));

    prevDateTimeValue.current = new Date().toLocaleDateString();
  }, [prevDateTimeValue, email]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <DangerBlueButton
          type="submit"
          text="videocam"
          label="New Meeting"
        />
      </form>
    </div>
  );
}
