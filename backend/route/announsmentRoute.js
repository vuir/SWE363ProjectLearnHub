const express = require("express");
const router = express.Router();
const Announcement= require("../controller/announsmentController");
const responseHandler = require("../middleware/responseHandler");

router.post("/admin/make-announcement",responseHandler(Announcement.createAnnouncement));

router.post("/view-announcement", responseHandler(Announcement.readAnnouncement));

module.exports = router;