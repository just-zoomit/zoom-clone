
const asyncHandler = require("express-async-handler");

require("dotenv").config();
const axios = require("axios");
const btoa = require("btoa");
const KJUR = require("jsrsasign");

  /**
  * Get Meeting SDK Auth Token
  * @param {String} meetingNumber
  * @param {String} role
  * @returns {String} sdk auth token
  * @see https://marketplace.zoom.us/docs/sdk/native-sdks/web/getting-started/auth-jwt
  * @see https://marketplace.zoom.us/docs/sdk/native-sdks/web/getting-started/join-meeting
  * 
 */
const getMsdkSignature = asyncHandler(async (req, res) => {
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;
  
    const oHeader = { alg: "HS256", typ: "JWT" };
    
  
    const oPayload = {
      sdkKey: process.env.REACT_APP_ZOOM_MSDK_KEY,
      mn: req.body.meetingNumber,
      role: req.body.role,
      iat: iat,
      exp: exp,
      tokenExp: iat + 60 * 60 * 2,
    };
  
    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const signature = KJUR.jws.JWS.sign(
      "HS256",
      sHeader,
      sPayload,
      process.env.ZOOM_MSDK_SECRET
    );
  
    res.json({
      signature: signature,
    });
  });
  


  /**
 * Call Zoom Oauth API for Server-to-Server access token.
 *
 * @param      {Object}  input_config
 * @param      {String}  input_config.ZOOM_ACCOUNT_ID     The zoom account id
 * @param      {String}  input_config.ZOOM_CLIENT_ID      The zoom client id
 * @param      {String}  input_config.ZOOM_CLIENT_SECRET  The zoom client secret
 * @returns    {String}  zoom access_token
 */
async function getAccessToken() {
    try {
      base_64 = btoa(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET);
  
      const resp = await axios({
        method: "POST",
        url:
          "https://zoom.us/oauth/token?grant_type=account_credentials&account_id=" +
          `${process.env.ACCOUNT_ID}`,
        headers: {
          Authorization: "Basic " + `${base_64} `,
        },
      });
      
     
      return resp.data.access_token;
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }
  
  /**
 *  Create A Zoom Meeting Appointments
 * @route POST /api/zoom/create
 * @access Public
 * @param {string} topic
 * @param {string} start_time
 * @param {string} first_name
 * @param {string} email
 * @returns {object} 200 - An array of user info
 */

  const CreateAppointment = asyncHandler(async (req, res) => {
    const { topic, start_time, end_time, first_name ,email } = req.body;


    console.log("Test Request Body: ",req.body);
    console.log("Start Time Conversion : ", converttoISOString(start_time));
    // console.log("End Time Conversion : ", converttoISOString(end_time));

    if (!email || !start_time || !first_name) {
      res.status(400);
      throw new Error("Please Fill all the fields");
    } else {
  
    const { id, password} = await createZoomMeeting(topic, converttoISOString(start_time), first_name, email);
  
      res.status(201).json({id , password});
    }
  });

  const ListMeeting = asyncHandler(async (req, res) => {
    const meetings = await listZoomMeeting();
    if ( meetings === undefined) {
      res.status(400);
      throw new Error("No meeting found");
    } else {  
      res.status(201).json({meetings});
      
    }
  });


  /**
 *  Create Zoom Meeting Via REST API
 * @param      {Object}  input_config
 * @param      {String}  topic     The topic of the meeting
 * @param      {String}  start_time  The start time of the meeting
 * @param      {String}  first_name  The first name of the user
 * @returns    {String}  The meeting id and password
 */
    
 
  async function createZoomMeeting(topic, start_time, first_name, email) {
    try {

      console.log("Start Time in Create Meeting: ", start_time);


      const data = JSON.stringify({
        topic: topic,
        start_time: start_time,
        first_name: first_name,
        email: email,
        join_before_host: true,
        password: generateOTP(),
      });
  
      const resp = await axios({
        method: "post",
        url: "https://api.zoom.us/v2/users/donte.zoomie@gmail.com/meetings",
        headers: {
          Authorization: "Bearer " + `${await getAccessToken()} `,
          "Content-Type": "application/json",
        },
        data: data,
      });

      const { id, password } = resp.data;
  
      return { id, password };
    } catch (err) {
      if (err.status == undefined) {
        console.log("Error : ", err);
      }
    }
  }

  async function listZoomMeeting() {
    try {

      const resp = await axios({
        method: "get",
        url: "https://api.zoom.us/v2/users/donte.zoomie@gmail.com/meetings",
        headers: {
          Authorization: "Bearer " + `${await getAccessToken()} `,
          "Content-Type": "application/json",
        }
      });
      const  meetings = resp.data.meetings;
      

      // meetings.forEach(meeting => {
      //   for (let key in meeting) {
      //     console.log(`${key}: ${meeting[key]}`)
      //   }
      // })


      const newArray = meetings.map(obj => ['id', 'topic', ].reduce((newObj, key) => { 
        newObj[key] = obj[key]
        return newObj
      }, {}))
      
  
      return newArray;
    } catch (err) {
      if (err.status == undefined) {
        console.log("Error : ", err);
      }
    }
  }

// 

/**
 * Zoom API supports the ISO 8601 date and time format.
 * @param      {Date}  date    The date
 * @returns    {String}  The ISO 8601 date and time format
 * @see https://marketplace.zoom.us/docs/api-reference/using-zoom-apis/#time-in-zoom-api
 */

  function converttoISOString(date) {
    // const date = "05 October 2011 14:48 UTC";
    
    const event = new Date(date);
// expected output: 2011-10-05T14:48:00.000Z
    return event.toISOString();
  }


/**
 * Declare a digits variable which stores all digits from 0 to 9
 * @returns   {String}  One time password
 */
  
  function generateOTP() {

    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
  
  module.exports = {
    getMsdkSignature, 
    CreateAppointment,
    ListMeeting,
  };