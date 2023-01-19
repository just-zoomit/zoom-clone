import  React from 'react'
import {Route ,Routes } from 'react-router-dom';


import Home from './components/pages/Home/Home';
import ZoomMSDK from './components/pages/ZoomMSDK/ZoomMSDK';
// import ExampleModal from './components/pages/ScheduleDialog/ExampleModal';
import GenericPopModal from './components/pages/ScheduleDialog/GenericPopModal';
import { MeetingInfoForm } from './components/pages/ScheduleDialog/MeetingInfoForm';
import "./App.css";





function App() {

  
  return (
    <>
    <div className="App">
  
      <Routes>
          <Route exact path="/msdk" element={<ZoomMSDK/>}/> 
          <Route  path="/genericmodal" element={<MeetingInfoForm/>}/> 
          {/* <Route exact path="/modal" element={<PopModal/>}/>  */}
          <Route path="/" element={<Home/>} />
        </Routes>
     
    </div>
    </>
  );
}

export default App;
