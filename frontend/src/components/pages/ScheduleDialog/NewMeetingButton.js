import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { emailRegex } from "../../shared";

import styles from '../Home/Button.module.css';

// To Be REMOVED

export default function NewMeetingButton() {
  const [, setOpen] = React.useState(false);
  const [state, ] = useState({ topic: 'Personal Meeting Room', 
                                      name :'Donte',
                                      email: 'donte.Zoomie@gmail.com', 
                                      role: 1 });
  const { topic, name, email, role } = state;

  const [, setValid] = useState(false);
  const prevDateTimeValue = React.useRef("");

  const navigate = useNavigate();
  

  const handleSubmit = () => {
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

    fetch("/api/zoom/create", POST_OPTIONS)
      .then((data) => data.json())
      .then(({ id, password }) => {
        navigate(`/msdk/?mn=${id}&pw=${password}`);
      });

    setOpen(false);
  };


  useEffect(() => {
    setValid(email && emailRegex.test(email));
  
    prevDateTimeValue.current = new Date().toLocaleDateString()
  }, [prevDateTimeValue,email]);

  return (
    <>
      <button  className={`${styles.buttoner} ${styles.bn37}`}  onClick={handleSubmit}>
      <i class="material-icons large icon-blue md40px">videocam</i>
      </button>
    </>
  );
}
