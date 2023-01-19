import React, { useState , useEffect} from "react";
import axios from "axios";

export const withEditableMeeting = (Component , meetingID)=> {

    return props => {
        const  [originalMeetingID , setOriginalmeetingID] = useState(null);
        const  [meeting , setMeeting] = useState(null);

        useEffect(() => {
            (async () => {
                const response = await axios.get(`api/zoom/${meetingID}`);
                // console.log("REsonse Data:",response.data.meeting);
                setMeeting(response.data.meeting);
            })();
    },[]);

    const onChangeMeeting = (changes) => {
        setMeeting({...meeting, ...changes});
    };

    const onSaveMeeting = async () => {
        console.log("Meeting:",meeting);
        const response = await axios.put(`api/zoom/${meetingID}`, {meeting});
        console.log("Save Resp:",response);
        setOriginalmeetingID(response.data.meeting);
        setMeeting(response.data.meeting);
    };

    const onResetMeeting = () => {
        console.log("Meeting:",meeting);
        console.log("Original Meeting ID:",originalMeetingID);
        setMeeting(originalMeetingID); 
    };


    return <Component 
    {...props} 
    meeting={meeting} 
    onChangeMeeting={onChangeMeeting}
    onMeetingSave={onSaveMeeting}
    onResetMeeting={onResetMeeting}
    />;
}
}