const asyncHandler = require("express-async-handler");
const axios = require("axios");
const btoa = require("btoa");

require("dotenv").config();
const KJUR = require("jsrsasign");

const {
  createZoomMeeting,
  listZoomMeetings,
  getZoomMeetingById,
  updateZoomMeeting,
  deleteZoomMeeting,
} = require("../api/api.js");

/**
 * @description Get Meeting SDK Auth Token
 * @param {String} meetingNumber
 * @param {String} role
 * @returns {String} sdk auth token
 * @see https://marketplace.zoom.us/docs/sdk/native-sdks/web/getting-started/auth-jwt
 * @see https://marketplace.zoom.us/docs/sdk/native-sdks/web/getting-started/join-meeting
 * @access            Public
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
 * @description Create A Zoom Meeting Appointments
 * @route POST /api/zoom/create
 * @access Public
 * @param {string} topic
 * @param {string} start_time
 * @param {string} first_name
 * @param {string} email
 * @returns {object} 200 - An array of user info
 * @access           Public
 */

const CreateAppointment = asyncHandler(async (req, res) => {
  const { topic, start_time, role } = req.body;
  console.log("Test  topic: ", topic);
  console.log("Test Start Time: ", start_time);
  console.log("Test Role: ", role);

  console.log("Test Request Body: ", req.body);
  console.log("Start Time Conversion : ", converttoISOString(start_time));
  // console.log("End Time Conversion : ", converttoISOString(end_time));

  if (!topic || !start_time || !role) {
    res.status(400);
    console.log("Test  topic: ", topic);
    console.log("Test Start Time: ", start_time);
    console.log("Test Role: ", role);
    throw new Error("Please Fill all the fields");
  } else {
    const { id, password } = await createZoomMeeting(topic, converttoISOString(start_time), role);

    res.status(201).json({ id, password });
  }
});

/**
 * @description List Zoom Meeting Appointments
 * @route GET /api/zoom/ListMeetings
 * @access Public
 */

const ListMeeting = asyncHandler(async (req, res) => {
  const meetings = await listZoomMeetings();
  if (meetings === undefined) {
    res.status(400);
    throw new Error("No meeting found");
  } else {
    res.status(201).json({ meetings });
  }
});

/**
 * @description Fetch Single Meeting Record
 * @route GET /api/zoom/ListMeetings
 * @access Public
 */

const getMeetingById = asyncHandler(async (req, res) => {
  const meeting = await getZoomMeetingById(req.params.id);
  if (meeting === undefined) {
    res.status(400);
    throw new Error("No meeting found");
  } else {
    res.status(201).json({ meeting });
  }
});

/**
 * @description Update Single Meeting Record
 * @route PUT /api/zoom/ListMeetings
 * @access Public
 */
const UpdateMeeting = asyncHandler(async (req, res) => {
  //Should meetingID be req.params.id or req.body.meetingId?
  const meetingID = req.params.id;
  const { topic, start_time } = req.body.data || req.body;
  console.log("Request Body ", req.body);
  console.log("Backend ID ", meetingID);
  console.log("Topic ", topic);
  console.log("Start ", start_time );
  console.log("Converted ", convertDateFormat(start_time) );
  const meetings = await updateZoomMeeting(meetingID, topic, convertDateFormat(start_time));
  if (meetings === undefined) {
    res.status(400);
    throw new Error("No meeting found");
  } else {
    res.status(201).json({ meetings });
  }
});

/**
 * @description     Delete Single Meeting Record
 * @route           DELETE /api/meetings/:id
 * @access          Public
 */

const DeleteMeeting = asyncHandler(async (req, res) => {
  const meetings = await deleteZoomMeeting(req.params.id);

  if (meetings === undefined) {
    res.status(400);
    throw new Error("No meeting found");
  } else {
    res.status(201).json({ meetings });
  }
});

/**
 * @description Zoom API supports the ISO 8601 date and time format.
 * @param      {Date}  date    The date
 * @returns    {String}  The ISO 8601 date and time format
 * @access               Private
 * @see https://marketplace.zoom.us/docs/api-reference/using-zoom-apis/#time-in-zoom-api
 */

function converttoISOString(date) {
  // const date = "05 October 2011 14:48 UTC";

  const event = new Date(date);
  // expected output: 2011-10-05T14:48:00.000Z
  return event.toISOString();
}

function convertDateFormat(date) {
  return new Date(date).toISOString();
}
function convertDateFormatV(date) {
  return date.replace(" ","T")+":00Z";
}

/**
 * @description Declare a digits variable which stores all digits from 0 to 9
 * @returns   {String}  One time password
 * @access Private
 */

module.exports = {
  getMsdkSignature,
  CreateAppointment,
  ListMeeting,
  getMeetingById,
  UpdateMeeting,
  DeleteMeeting,
};
