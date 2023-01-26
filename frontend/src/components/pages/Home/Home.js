import React, { useState } from "react";
import GenericPopModal from "../Buttons/GenericPopModal";
import { AuthUserForm } from "../ZoomAuth/AuthUserForm";
import useToken  from "../ZoomAuth/useToken";
import  Table2  from "../Tables/Table";


function Home() {

  const [data, setData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);


  const { token, setToken } = useToken();

  if(!token) {
    return <AuthUserForm  setToken={setToken} />
  }

  const handleDataReceived = (newData) => {
    console.log("Data received in Home.js", newData);
    setData(newData);
    setDataFetched(true);
  };


  const handleClearData = () => {
    setData([]);
    setDataFetched(false);
  }

  return (
    <>
    <div style={{display: "flex", margin: "auto"}}>
    <div style={{ margin: "auto"}}>
      <GenericPopModal onDataReceived={handleDataReceived} onClearData={handleClearData} />
    </div>
    &nbsp; &nbsp;
    <div >
      {dataFetched ? <Table2  /> : null}
    </div>
</div>
    </>
  );
}

export default Home;
