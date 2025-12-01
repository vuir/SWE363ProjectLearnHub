require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../model/User");
const Course = require("../model/Course");
const Favorite = require("../model/Favorite");

async function seed() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");

		// Clear existing favorites
		await Favorite.deleteMany({});

		// Get students, tutors, and courses
		const students = await User.find({ role: "student" });
		const tutors = await User.find({ role: "tutor" });
		const courses = await Course.find({});

		if (students.length === 0) {
			console.log("No students found. Please seed users first.");
			return;
		}

		const favorites = [];

		students.forEach((student) => {
			// Each student has some favorite tutors and courses
			const favoriteTutors = tutors.slice(0, 2).map(t => t._id); // First 2 tutors
			const favoriteCourses = courses.slice(0, 2).map(c => c._id); // First 2 courses

			favorites.push({
				studentId: student._id,
				favoriteTutors: favoriteTutors,
				favoriteCourses: favoriteCourses,
			});
		});

		await Favorite.insertMany(favorites);
		console.log(`Seeded ${favorites.length} favorites`);
	} catch (err) {
		console.error("Seeding error:", err);
	} finally {
		await mongoose.connection.close();
	}
}

seed();

