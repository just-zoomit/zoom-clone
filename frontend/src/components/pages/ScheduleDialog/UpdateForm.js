import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { TableContainer, StyledTextbox } from "../Tables/TableComponents";

const display = {
  display: "inline-block",
};

export const UpdateForm = (topic, mnID) => {
  
  const [id, setId] = useState(null);
  const [dataa, setDataa] = useState(null);
  const {
    data,
    error,
    loading,
    updateData,
    deleteData,
    resetData,
    changeData,
  } = useAxios(`api/zoom`, id);

  const setForm = (e) => {
    console.log("setForm", mnID);
    setDataa(mnID);
    };


  console.log("data", data);

  return !!data && (
    <>
      <div>
        <StyledTextbox>
          <input type="text" id="topic" placeholder="Topic" value={topic} />
          <label htmlFor="topic">Topic:</label>
        </StyledTextbox>
        <label>
          Name:
          <input
            value={topic}
            onChange={(e) => changeData({ name: e.target.value })}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={"0"}
            onChange={(e) => changeData({ age: Number(e.target.value) })}
          />
        </label>
    
      
        <h3>Date & Time</h3>
        <hr class="solid"></hr>
        <input
          type="date"
          id="datetime-local"
          value={"2021-08-01"}
          required={true}
          onChange={(e) => changeData({ age: Number(e.target.value) })}
          style={display}
        />
        &nbsp; &nbsp;
        <input
          type="time"
          id="time"
          value={"10:00"}
          required={true}
          // onChange={(e) => setTime(e.target.value)}
          style={display}
        />

        <button style={{ color: "black" }} onClick={resetData}>Reset</button>
        <button style={{ color: "black" }} onClick={updateData}>Save Changes</button>
        <button style={{ color: "black" }} onClick={deleteData}> Delete Data </button>Ï
      </div>
    </>
  )
}
