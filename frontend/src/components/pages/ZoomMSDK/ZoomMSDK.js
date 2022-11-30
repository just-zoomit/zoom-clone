import React, {useEffect} from "react";

declare var ZoomMtg;

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.6.0/lib", "/av");

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();


function ZoomMSDK() {
// Get Zoom MSDK KEY, Signature endpoint, and leave URL environment variables
const {
  REACT_APP_ZOOM_MSDK_KEY = "",
  REACT_APP_MSDK_SIGNATURE_ENDPOINT = "",
  LEAVE_URL = "http://localhost:3000/",
 } = process.env;

 // Get the meeting number and password from the URL parameters
 const queryParams = new URLSearchParams(window.location.search);
 const mn = queryParams.get("mn");
 const pw = queryParams.get("pw");

// Assign meeting role based on user type
const role = "1"; // 1 for host, 0 for attendee


/**
 * Get meeting signature from backend
 * @see https://marketplace.zoom.us/docs/sdk/native-sdks/web/getting-started/auth-jwt
 * @see https://marketplace.zoom.us/docs/sdk/native-sdks/web/getting-started/join-meeting
 * @see https://marketplace.zoom.us/docs/sdk/native-sdks/web/getting-started/zoom-meeting
 * @see https://marketplace.zoom.us/docs/sdk/native-sdks/web/getting-started/zoom-webinar
 * @see https://marketplace.zoom.us/docs/sdk/native-sdks/web/getting-started/zoom-webinar
 * @see https://marketplace.zoom.us/docs/sdk/native-sdks/web/getting-started/zoom-instant-meeting
  * 
 */
  const getSignature = (e) => {
    if (e) e.preventDefault();
   
  
    
    const SIGNATURE_OPTIONS = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        meetingNumber: mn,
        role:  parseInt(role, 10),
      }),
    };
  
    fetch(REACT_APP_MSDK_SIGNATURE_ENDPOINT, SIGNATURE_OPTIONS)
      .then((data) => data.json())
      .then(({ signature }) => !!signature && startMeeting(signature));
  };

/**
 * Start the meeting with the signature and meeting number
 * @param {String} signature
 * @param {String} meetingNumber
 * @param {String} role
 * @param {String} leaveUrl
 * @param {String} userName
 * @param {String} userEmail
 * @param {String} passWord
 * @param {String} lang
 * @param {String} signature
 * @param {String} apiKey
  * 
 */

const startMeeting = (signature) => {
  document.getElementById("zmmtg-root").style.display = "block";
  
  ZoomMtg.init({
      leaveUrl: LEAVE_URL,
      success: (success) => {
        console.log(success)
  
        ZoomMtg.join({
          signature,
          meetingNumber: mn,
          sdkKey: REACT_APP_ZOOM_MSDK_KEY,
          userName: "donte.zoomie@gmail.com",
          passWord: pw,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

/**
 * Get meeting number and password from query params, and
 * call the signature endpoint to initialize the meeting
 * @param {String} meetingNumber
 * @param {String} password
  * 
 */
useEffect(() => {
  const mn = queryParams.get("mn");
  const pw = queryParams.get("pw");
  console.log(mn, pw)
  
  
  if (mn && pw) getSignature();
  
 }, []);


  return (
    <div>zoomMSDK</div>
  )
}

export default ZoomMSDK