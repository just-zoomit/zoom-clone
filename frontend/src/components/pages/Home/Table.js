import DataTable from "react-data-table-component";
import { useState , useCallback, useEffect} from "react";

import { EditPopModal } from "../ScheduleDialog/EditPopModal";

import styles from "./Button.module.css";
import { element } from "./dateTime";

//controling the icon font size, need to fix
import "../ScheduleDialog/styles.css";

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

  const [mn, setMn] = useState(null);

  const deletHandler = (id) => {
    console.log("deleteHandler", id);
    if (window.confirm("Are you sure you want to delete this item?")) {
      // deleteHandler(id);
    }
  };


  const [rowData, setRowData] = useState({});

  const openModal = useCallback(
      function (e,row) {
        if (!showModal) {
          console.log("openModal");
          e.stopPropagation();
        }
        setShowModal(true);
        setMn(e.currentTarget.value);
        setRowData(row);
      },
      [showModal, setShowModal ]
    );


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
            onClick={openModal}
            >
              <i class="material-icons large icon-blue md-48"> edit</i>
            </button>
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
  
  // outside of the columns array
 

  useEffect(() => {

    //return document.removeEventListener("click", eventHandler);
  }, [showModal]);

  return (
    <>
    {/* Moved BottomComponent.js and replaced with buttomComposition pattern */}
    {showModal ? <EditPopModal setShowModal={setShowModal} row={rowData} dataa={mn}/> : null}

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
