
const asyncHandler = require("express-async-handler");

require("dotenv").config();
const axios = require("axios");
const btoa = require("btoa");
const KJUR = require("jsrsasign");

//Generate Zoom JWT SDK Token
const getMsdkSignature = asyncHandler(async (req, res) => {
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;
  
    const oHeader = { alg: "HS256", typ: "JWT" };
    console.log(req.body);
  
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
  


  // Get Zoom Access Token 
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

  const CreateAppointment = asyncHandler(async (req, res) => {
    const { title, content, category, time, date, email, name } = req.body;
    const start_time = format_StartTime(date, time);
  
    if (!title || !content || !category) {
      res.status(400);
      throw new Error("Please Fill all the fields");
    } else {
  
      const { id: meetingid, password: passcode } = await createZoomMeeting(title, start_time, name, email);
  
      
     
  
      const meeting = new Meeting({
        user: req.user._id,
        title,
        meetingid,
        passcode,
        content,
        category,
        name,
        email,
        time,
        date,
      });
      const createMeeting = await meeting.save();
  
      res.status(201).json(createMeeting);
    }
  });

  // Create Zoom Meeting Via REST API
  async function createZoomMeeting(topic, start_time, first_name, email) {
    try {
      const data = JSON.stringify({
        topic: topic,
        start_time: start_time,
        first_name: first_name,
        email: email,
        join_before_host: true,
      });
  
      const resp = await axios({
        method: "post",
        url: "https://api.zoom.us/v2/users/me/meetings",
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
  
  module.exports = {
    getMsdkSignature, 
    CreateAppointment,
  };