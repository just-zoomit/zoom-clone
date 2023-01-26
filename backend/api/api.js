require("dotenv").config();
const axios = require("axios");
const btoa = require("btoa");
const asyncHandler = require("express-async-handler");

const getAccessToken = async () => {
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
};

/**
 *  Create Zoom Meeting Via REST API
 * @param      {Object}  input_config
 * @param      {String}  topic     The topic of the meeting
 * @param      {String}  start_time  The start time of the meeting
 * @param      {String}  first_name  The first name of the user
 * @returns    {String}  The meeting id and password
 * @access     Public
 */
const createZoomMeeting = async (topic, start_time) => {
  try {
    console.log("Start Time in Create Meeting: ", start_time);

    const data = JSON.stringify({
      topic: topic,
      start_time: start_time,
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
};

/**
 * @description List Single Meeting Record
 * @route GET /api/zoom/ListMeetings
 * @access Private
 */

const listZoomMeetings = async () => {
  try {
    const resp = await axios({
      method: "get",
      url: "https://api.zoom.us/v2/users/donte.zoomie@gmail.com/meetings",
      headers: {
        Authorization: "Bearer " + `${await getAccessToken()} `,
        "Content-Type": "application/json",
      },
    });
    const meetings = resp.data.meetings;

    const newArray = meetings.map((obj) =>
      ["id", "topic"].reduce((newObj, key) => {
        newObj[key] = obj[key];
        return newObj;
      }, {})
    );

    return newArray;
  } catch (err) {
    if (err.status == undefined) {
      console.log("Error : ", err);
    }
  }
};

/**
 * @description Fetch Single Meeting from Zoom Server
 * @route GET /api/meetings/:id
 * @access Private
 */

const getZoomMeetingById = asyncHandler(async (meetingId) => {
  try {
    const access_token = await getAccessToken();
    const resp = await axios({
      method: "GET",
      url: "https://api.zoom.us/v2/meetings/" + meetingId,
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    return resp.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
});

/**
 * @description Update Single Meeting from Zoom Server
 * @route PUT /api/meetings/:id
 * @access Private
 */

const updateZoomMeeting = asyncHandler(async (meetingId, topic, start_time, first_name ) => {
  try {
    const access_token = await getAccessToken();
    console.log("Start Time in Update Meeting: ", start_time);
    const data = JSON.stringify({
      topic: topic,
      start_time: start_time,
      join_before_host: true,
      password: generateOTP(),
    });
    const resp = await axios({
      method: "PATCH",
      url: "https://api.zoom.us/v2/meetings/" + meetingId,
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
      data: data,
    });
    return resp.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
});
/**
 * @description Delete Single Meeting from Zoom Server
 * @route DELETE /api/meetings/:id
 * @access Private
 */

const deleteZoomMeeting = asyncHandler(async (meetingId) => {
  try {
    console.log("Backend Meeting ID: ", meetingId);
    const access_token = await getAccessToken();
    const resp = await axios({
      method: "DELETE",
      url: "https://api.zoom.us/v2/meetings/" + meetingId + "/?",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    return resp.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
});

function generateOTP() {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

module.exports = {
  getAccessToken,
  listZoomMeetings,
  updateZoomMeeting,
  createZoomMeeting,
  getZoomMeetingById,
  updateZoomMeeting,
  deleteZoomMeeting,
};
