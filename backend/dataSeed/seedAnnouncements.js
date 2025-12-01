require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../model/User");
const Course = require("../model/Course");
const Announcement = require("../model/Announcement");

async function seed() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");

		// Clear existing announcements
		await Announcement.deleteMany({});

		// Get admin user and courses
		const adminUser = await User.findOne({ role: "admin" });
		const courses = await Course.find({});

		if (!adminUser) {
			console.log("No admin user found. Please seed users first.");
			return;
		}

		const announcements = [
			{
				adminId: adminUser._id,
				title: "Tutors Needed for SWE363",
				content: "We are looking for qualified tutors to teach SWE363 (Software Engineering). If you have excelled in this course and are interested in helping fellow students, please apply to become a tutor.",
				targetLevel: "Junior",
				courseId: courses.find(c => c.courseId === "SWE363")?._id,
			},
			{
				adminId: adminUser._id,
				title: "Tutors Needed for ICS201",
				content: "We are seeking tutors for ICS201 (Programming Fundamentals). Students who have achieved high grades in this course are encouraged to apply and help other students succeed.",
				targetLevel: "Sophomore",
				courseId: courses.find(c => c.courseId === "ICS201")?._id,
			},
			{
				adminId: adminUser._id,
				title: "Tutors Needed for MATH201",
				content: "We need tutors for MATH201 (Calculus I). If you have a strong understanding of calculus and want to help other students, please consider applying to be a tutor.",
				targetLevel: "all",
				courseId: courses.find(c => c.courseId === "MATH201")?._id,
			},
			{
				adminId: adminUser._id,
				title: "Tutors Needed for All Courses",
				content: "We are actively recruiting tutors for various courses. If you have excelled in any course and are interested in teaching, please apply to become a tutor and help your fellow students succeed.",
				targetLevel: "all",
			},
		];

		await Announcement.insertMany(announcements);
		console.log(`Seeded ${announcements.length} announcements`);
	} catch (err) {
		console.error("Seeding error:", err);
	} finally {
		await mongoose.connection.close();
	}
}

seed();

