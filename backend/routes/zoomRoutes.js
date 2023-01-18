const express = require('express');

const {
    getMsdkSignature,
    CreateAppointment,
    ListMeeting,
    getMeetingById,
    UpdateMeeting,
    DeleteMeeting,
  } = require("../controllers/zoomControllers.js");

const router = express.Router();

router.route('/').post();

// Get MSDK Signature Route
router.route("/msig").post(getMsdkSignature);

// Create routes. Test with Postman
router.route("/create").post(CreateAppointment);

// Create routes. Test with Postman
router.route("/listmeetings").get(ListMeeting);

router
  .route("/:id")
  .get(getMeetingById)
  .put(UpdateMeeting)
  .delete(DeleteMeeting)
  



module.exports = router; // Export the router so it can be used in server.js