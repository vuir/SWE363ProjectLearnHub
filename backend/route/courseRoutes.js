const express = require("express");
const router = express.Router();
const courseController = require("../controller/courseController");
const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/roles");

// GET /api/courses 
router.get("/", courseController.getAllCourses);

// GET /api/courses/courseId/:courseId
router.get("/courseId/:courseId", auth, allowRoles("student", "tutor", "admin"), courseController.getCourseByCourseId);

// POST /api/courses
router.post("/", auth, allowRoles("admin"), courseController.createCourse);

// PUT /api/courses/:id
router.put("/:id", auth, allowRoles("admin"), courseController.updateCourse);

// DELETE /api/courses/:id
router.delete("/:id", auth, allowRoles("admin"), courseController.deleteCourse);

// GET /api/courses/department/:department
router.get("/department/:department", courseController.getCoursesByDepartment);

module.exports = router;

