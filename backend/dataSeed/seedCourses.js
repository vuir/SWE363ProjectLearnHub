require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("../model/Course");

async function seed() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");

		// Clear existing courses
		await Course.deleteMany({});

		const courses = [
			{
				courseId: "SWE363",
				title: "Software Engineering",
				description: "Introduction to software engineering principles, methodologies, and practices.",
				department: "Software Engineering",
			},
			{
				courseId: "ICS201",
				title: "Programming Fundamentals",
				description: "Fundamental programming concepts using modern programming languages.",
				department: "Computer Science",
			},
			{
				courseId: "ICS253",
				title: "Discrete Structures",
				description: "Mathematical foundations for computer science including logic, sets, and graphs.",
				department: "Computer Science",
			},
			{
				courseId: "MATH201",
				title: "Calculus I",
				description: "Differential and integral calculus of functions of one variable.",
				department: "Mathematics",
			},
			{
				courseId: "MATH202",
				title: "Calculus II",
				description: "Continuation of Calculus I, including techniques of integration and series.",
				department: "Mathematics",
			},
			{
				courseId: "EE201",
				title: "Circuit Analysis",
				description: "Analysis of electrical circuits using fundamental laws and theorems.",
				department: "Electrical Engineering",
			},
			{
				courseId: "SWE316",
				title: "Database Systems",
				description: "Design and implementation of database systems and SQL.",
				department: "Software Engineering",
			},
			{
				courseId: "ICS343",
				title: "Fundamentals of Computer Networks",
				description: "Introduction to computer networks, protocols, and network architecture.",
				department: "Computer Science",
			},
		];

		await Course.insertMany(courses);
		console.log(`Seeded ${courses.length} courses`);
	} catch (err) {
		console.error("Seeding error:", err);
	} finally {
		await mongoose.connection.close();
	}
}

seed();

