import DataTable from "react-data-table-component";
import { useState } from "react";

import { EditPopModal } from "../ScheduleDialog/EditPopModal";

import styles from "./Button.module.css";
import { element } from "./dateTime";

//controling the icon font size, need to fix
import ButtonsComponent from "./ButtonsComponent";

import { ControlledModal } from "../ScheduleDialog/ControlledModal";
import { MeetingInfoForm } from "../ScheduleDialog/MeetingInfoForm";

import { useResource } from "../Home/useResource";


//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
  rows: {
    style: {
      minHeight: "35px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "30px",
    },
  },
};

export default function Table({data}) {
  const [loading, ] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rowvalue, setRowvalue] = useState("");

  const deletHandler = (id) => {
    console.log("deleteHandler", id);
    if (window.confirm("Are you sure you want to delete this item?")) {
      // deleteHandler(id);
    }
  };

  const [, setDataFetched] = useState(false);
 
   // Set state for modal
  const [state, setState] = useState(null);

  // use rowvalue to get the id of the row
  const id = "94431876430"
  console.log("id: ", id);
  const getMeeting = useResource(`/api/zoom/${id}`);

  const openModal = async (event) => {
    event.preventDefault();

    try {
     
      console.log("getMeeting: ", getMeeting);
      console.log("M Set: ", event.currentTarget.value);
      setRowvalue(event.currentTarget.value);
      setState(getMeeting);
      setDataFetched(true);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };


  const columns = [
    {
      selector: (row) => row.topic,
    },
    {
      selector: (row) =>
        row.id ? (
          <div>
            <button 
            className={`${styles.buttonDanger} `} 
            value={[row.id]} 
            onClick={openModal }
            >
              <i class="material-icons large icon-blue md-48"> edit</i>
            </button>
            
            {showModal ? <EditPopModal setShowModal={setShowModal} data={state} /> : null}

            {/* {showModal ? <ControlledModal
		            shouldShow={showModal}
		          onRequestClose={() => 
			      setShowModal(false) }
		              >
			<MeetingInfoForm />
		</ControlledModal>
		
		 : null} */}
            
            <button className={`${styles.buttonDanger} `} onClick ={ () => deletHandler(row.id)}>
              <i class="material-icons large icon-blue md-48">
                {" "}
                delete_forever
              </i>
            </button>
          </div>
        ) : (
          "No"
        ),
      right: true,
    },
  ];



  const openModal_viod = () => {
    setShowModal(true);
  };


  return (
    <>

    {/* Moved BottomComponent.js and replaced with buttomComposition pattern */}

      <div className={`${styles.box} `}>
        <div style={{ margin: "10px" }}>

          <DataTable
            title={element}
            columns={columns}
            data={data}
            progressPending={loading}
            customStyles={customStyles}
            pagination
          />

        </div>
      </div>
    </>
  );
}
