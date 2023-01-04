import React, { useState } from 'react';

export default function ExampleModal() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the name and date values here
    setShowModal(false);
  };

  return (
    <div>
      <button type="button" onClick={() => setShowModal(true)}>
        Show Modal
      </button>
      {showModal && (
  <div>
    <p>Please enter your name and date:</p>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={handleNameChange} />
      <br />
      <label htmlFor="date">Date:</label>
      <input type="date" id="date" value={date} onChange={handleDateChange} />
      <br />
      <button type="submit">Submit</button>
      <button type="button" onClick={() => setShowModal(false)}>
        Cancel
      </button>
    </form>
  </div>
)}
    </div>
  );
}
