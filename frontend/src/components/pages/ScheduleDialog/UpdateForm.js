import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { ButtonDanger } from "../theme/globalStyles";
import { StyledTextbox } from "../Tables/TableComponents";
import moment from 'moment';

const display = {
  display: "inline-block",
};

export const UpdateForm = (mnID) => {

  
  const [id, setId] = useState("");
  
  const {
    data,
    error,
    loading,
    updateData,
    deleteData,
    resetData,
    changeData,
  } = useAxios(`api/zoom`,mnID.mnID);

  console.log("data", data);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data) {
      console.log("Form data Set");
      console.log("Here",data);
      setFormData(data);
    }
  }, [data]);

  console.log("data", data);

  formData.start_time = moment(formData.start_time).format('YYYY-MM-DD HH:mm')
  
  console.log("formData ", formData);
  console.log("meetingID", id);
  console.log("formData StartTime: ", formData.start_time);
  return (
    <>
      <div>
                  <h3>Schedule</h3>
                  <form>
                    <StyledTextbox>
                      <input
                        type="text"
                        id="topic"
                        placeholder="Topic"
                        value={formData.topic}
                        onChange={(e) => changeData({ topic: e.target.value })}
    
                      />
                    <label htmlFor="topic">Topic:</label>
                    </StyledTextbox>
                    <h3>Date & Time</h3>
                    <hr class="solid"></hr>
                   
                    <input
                      type="datetime-local"
                      value={formData.start_time}
                      required={true}
                      onChange={(e) =>
                        changeData({ start_time: e.target.value })
                      }
                      style={{display: "inline-block"}}
                    />
                    <br />

                    <div style={{ display: "block" }}>
                      <button
                        style={{ color: "black" }}
                        onClick={updateData}
                      >
                        Update Data
                      </button>
                      &nbsp;
                      <button style={{ color: "black" }} onClick={resetData}>
                        {" "}
                        Reset Data
                      </button>
                      &nbsp;
                      <button style={{ color: "black" }} onClick={deleteData}>
                        {" "}
                        Delete Data
                      </button>
                    </div>
                    &nbsp;
                  </form>
                </div>
              
    </>
  )
}
