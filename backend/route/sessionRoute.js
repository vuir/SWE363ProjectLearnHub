const express = require("express");
const router = express.Router();
const session= require("../controller/sessionController");

router.post("/admin-edit-session", session.updateSession);
router.post("/admin-delete-session", session.deleteSession);

router.post("/totur-edit-session", session.updateSession);
router.post("/totur-delete-session", session.deleteSession);
router.post("/totur-create-session", session.createSession);

router.post("/read-session", session.readSession);

module.exports = router;