const express = require("express");
const router = express.Router();
const favoriteController = require("../controller/favoriteController");
const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/roles");

// /api/favorites
router.get("/", auth, allowRoles("student", "tutor"), favoriteController.getFavorites);

// /api/favorites/courses/:courseId
router.post("/courses/:courseId", auth, allowRoles("student", "tutor"), favoriteController.addFavoriteCourse);

// /api/favorites/courses/:courseId
router.delete("/courses/:courseId", auth, allowRoles("student", "tutor"), favoriteController.removeFavoriteCourse);

// /api/favorites/tutors/:studentId
router.post("/tutors/:studentId", auth, allowRoles("student", "tutor"), favoriteController.addFavoriteTutor);

// /api/favorites/tutors/:studentId
router.delete("/tutors/:studentId", auth, allowRoles("student", "tutor"), favoriteController.removeFavoriteTutor);

module.exports = router;
