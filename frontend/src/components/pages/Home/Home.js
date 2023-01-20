import React, { useState } from "react";
import Table from "./Table";
import GenericPopModal from "../ScheduleDialog/GenericPopModal";

function Home() {
  //Create react module for the buttons

  /*
  Pattern for passing data from child to parent:
  1. Create a state variable in the parent component (Home) to store the data
  2. Create a function in the parent component (Home) to handle the data received from the child component (Buttom Component )
  3. Pass the function as a prop to the child component (Buttom Component )
  4. Call the function in the child component (Buttom Component ) to pass the data to the parent component
  5. Use the state variable in the parent component (Home) to access the data 
  6. Use the state variable in the parent component (Home) to determine whether to render the child component

 */

  const [data, setData] = useState([]);
  const [, setDataFetched] = useState(false);

  const handleDataReceived = (newData) => {
    setData(newData);
    setDataFetched(true);
  };

  const handleClearData = () => {
    setData([]);
  }

  return (
    <>
    <div style={{display: "flex", margin: "auto"}}>
    <div style={{ margin: "auto"}}>
      <GenericPopModal onDataReceived={handleDataReceived} onClearData={handleClearData} />
    </div>
    <div >
      {/* <CusTable data={data} /> */}
      {data.length > 0 ? <Table data={data} /> : null}
    </div>
</div>
    </>
  );
}

export default Home;
