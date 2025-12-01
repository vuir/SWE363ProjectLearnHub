require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../model/User");
const Course = require("../model/Course");
const TutorProfile = require("../model/TutorProfile");

async function seed() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");

		// Clear existing tutor profiles
		await TutorProfile.deleteMany({});

		// Get tutors and courses
		const tutors = await User.find({ role: "tutor" });
		const courses = await Course.find({});

		if (tutors.length === 0) {
			console.log("No tutors found. Please seed users first.");
			return;
		}

		if (courses.length === 0) {
			console.log("No courses found. Please seed courses first.");
			return;
		}

		const tutorProfiles = tutors.map((tutor, index) => {
			// Assign courses to tutors - tutors can teach any course, not just their major
			// Assign 2-3 courses per tutor from the available courses
			const courseIndices = [];
			const numCourses = 2 + (index % 2); // 2 or 3 courses per tutor
			
			for (let i = 0; i < numCourses && i < courses.length; i++) {
				const courseIndex = (index * 2 + i) % courses.length;
				if (!courseIndices.includes(courseIndex)) {
					courseIndices.push(courseIndex);
				}
			}
			
			const assignedCourses = courseIndices.map(idx => courses[idx]).filter(Boolean);

			return {
				userId: tutor._id,
				coursesTaught: assignedCourses.map(c => c._id),
				rating: 1 + (index % 5), // Ratings from 1 to 5
			};
		});

		await TutorProfile.insertMany(tutorProfiles);
		console.log(`Seeded ${tutorProfiles.length} tutor profiles`);
	} catch (err) {
		console.error("Seeding error:", err);
	} finally {
		await mongoose.connection.close();
	}
}

seed();

