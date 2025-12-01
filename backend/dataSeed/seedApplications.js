require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../model/User");
const Course = require("../model/Course");
const TutorProfile = require("../model/TutorProfile");
const Application = require("../model/Applications");

async function seed() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");

		// Clear existing applications
		await Application.deleteMany({});

		// Get tutors, courses, and tutor profiles
		const tutors = await User.find({ role: "tutor" });
		const courses = await Course.find({});
		const tutorProfiles = await TutorProfile.find({}).populate("coursesTaught");

		if (tutors.length === 0 || courses.length === 0) {
			console.log("No tutors or courses found. Please seed users and courses first.");
			return;
		}

		const applications = [];

		// Some tutors apply to teach additional courses
		tutors.forEach((tutor, index) => {
			if (index < 2) { // First 2 tutors apply for additional courses
				const tutorProfile = tutorProfiles.find(tp => tp.userId.toString() === tutor._id.toString());
				const tutorCourseIds = tutorProfile ? tutorProfile.coursesTaught.map(c => c._id.toString()) : [];
				const availableCourses = courses.filter(c => !tutorCourseIds.includes(c._id.toString()));
				
				if (availableCourses.length > 0) {
					applications.push({
						userId: tutor._id,
						courseId: availableCourses[0]._id,
						grade: "A+",
						status: index === 0 ? "approved" : "pending",
					});
				}
			}
		});

		await Application.insertMany(applications);
		console.log(`Seeded ${applications.length} applications`);
	} catch (err) {
		console.error("Seeding error:", err);
	} finally {
		await mongoose.connection.close();
	}
}

seed();

