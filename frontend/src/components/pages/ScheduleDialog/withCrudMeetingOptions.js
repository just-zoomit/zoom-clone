import React, { useState , useEffect} from "react";
import axios from "axios";

export const withCrudMeetingOptions = (Component, meetingID)=> {


    return props => {
        const  [originalMeetingID , setOriginalmeetingID] = useState(null);
        const  [meeting, setMeeting] = useState(null);
        const [dataFetched, setDataFetched] = useState(false);
      
        useEffect(() => {
            if (!dataFetched && meetingID) {
                (async () => {
                    console.log("meetingID:",meetingID);
                    const response = await axios.get(`api/zoom/${meetingID}`);
                    console.log("response.data.meeting:",response.data.meeting);
                    setOriginalmeetingID(response.data.meeting);
                    setMeeting(response.data.meeting);
                    setDataFetched(true);
                })();
            }
        }, [ dataFetched]);

    const onChangeMeeting = (changes) => {
        setMeeting({...meeting, ...changes});
    };

    const onSaveMeeting = async () => {
        console.log("Meeting:",meeting);
        const response = await axios.put(`api/zoom/${meetingID}`, {meeting});
        
        setOriginalmeetingID(response.data.meeting);
        setMeeting(response.data.meeting);
    };

    const onDeleteMeeting = async (id) => {
        console.log("Clicked:", id);
        const response = await axios.delete(`api/zoom/${meetingID}`, {meeting});
    };

    const onResetMeeting = () => {
       
        setMeeting(originalMeetingID); 
    };

    return <Component {...props} 
    meeting={meeting} 
    onChangeMeeting={onChangeMeeting}
    onSaveMeeting={onSaveMeeting}
    onResetMeeting={onResetMeeting}
    onDeleteMeeting={onDeleteMeeting}
    />;
}
}