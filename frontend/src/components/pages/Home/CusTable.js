import DataTable from "react-data-table-component"
import { useState, useEffect } from "react"

import ButtonsComponent from "./ButtonsComponent";
import styles from './Button.module.css';



//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
    rows: {
        style: {
            minHeight: '35px', // override the row height
            
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
           
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '30px',
        
          
        },
    },
};

export default function CusTable() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [perPage, setPerPage] = useState(6)
     // fetch data from backend
    const [meetingDetails, setMeetingDetails] = useState([]);
  
    const columns = [
     
      {
     
        selector: (row) => row.topic,
      },
      {
       
        selector: (row) => (row.id ?   
            <div>
            <button className={`${styles.buttonDanger} `}  value={[row.id]} >
            <i class="material-icons large icon-blue md-48">edit</i>
             
            </button>
            <button className={`${styles.buttonDanger} `}  >
            <i class="material-icons large icon-blue md-48"> delete_forever</i>
            </button>
          </div> : "No"),
        right: true
      },
    ]
   
    const timeOptions = { hour: "2-digit", minute: "2-digit" };
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const element = (
        <div className={`${styles.tableHeader} `} >
        <div >        
          <h1>{new Date().toLocaleTimeString([], timeOptions)}</h1>
          <h2>{new Date().toLocaleDateString("en-us", dateOptions)}</h2>
        </div>
        </div>  
      );

      const getData = (data) => {
        console.log("Coming From ButtonsCompoonet:", data);
        setMeetingDetails(data);
      };
   
   
  
    useEffect(() => {
      fetchTableData()
    }, [])
  
    async function fetchTableData() {
      setLoading(true)
      const URL = "https://jsonplaceholder.typicode.com/todos"
      const response = await fetch(URL)
  
      const users = await response.json()
      setData(users)
      setLoading(false)
    }


    return (
        <>

        <div className="button-container">
        {" "}
        <ButtonsComponent onSubmit={getData} />{" "}
      </div>

        <div  className={`${styles.box} `} > 
        
        <div style={{ margin: "10px" }}>
     

          <DataTable
            title={element}
            columns={columns}
            data={meetingDetails}
            progressPending={loading}
            customStyles={customStyles}
            pagination
          />
        </div>


        </div>
        </>
      )
}
