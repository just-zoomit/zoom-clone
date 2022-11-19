const express = require('express');

const {
    CreateAppointment,
    getMsdkSignature, 
    ListMeeting,
  } = require("../controllers/zoomControllers.js");

const router = express.Router();

router.route('/').post();

// Get MSDK Signature Route

router.route("/msig").post(getMsdkSignature);

// Create routes. Test with Postman
router.route("/create").post(CreateAppointment);

// Create routes. Test with Postman
router.route("/listmeetings").get(ListMeeting);

module.exports = router; // Export the router so it can be used in server.js