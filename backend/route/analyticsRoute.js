const express = require("express");
const router = express.Router();
const analyticsController = require("../controller/analyticsController");
const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/roles");
const convertingResponse = require("../middleware/convertingResponse");

// Get analytics data for admin
router.get("/", auth, allowRoles("admin"), convertingResponse(analyticsController.getAnalytics));

module.exports = router;

