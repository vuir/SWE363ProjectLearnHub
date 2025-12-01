require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../model/User");
const Support = require("../model/Support");

async function seed() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");

		// Clear existing support tickets
		await Support.deleteMany({});

		// Get users
		const adminUser = await User.findOne({ role: "admin" });
		const students = await User.find({ role: "student" });
		const tutors = await User.find({ role: "tutor" });

		if (!adminUser || students.length === 0 || tutors.length === 0) {
			console.log("No users found. Please seed users first.");
			return;
		}

		const supportTickets = [
			{
				userId: students[0]._id,
				issue: "I'm having trouble booking a session. The system says the session is full but I can see available spots.",
				status: "pending",
			},
			{
				userId: students[1]._id,
				issue: "How do I cancel a booking?",
				status: "resolved",
				response: "You can cancel a booking from your profile page under the 'My Bookings' section. Please note that cancellations should be made at least 24 hours before the session.",
				respondedBy: adminUser._id,
			},
			{
				userId: tutors[0]._id,
				issue: "I want to add more courses to my profile. How can I do that?",
				status: "in-progress",
			},
			{
				userId: students[2] ? students[2]._id : students[0]._id,
				issue: "The Teams link for my session is not working. Can you help?",
				status: "resolved",
				response: "I've updated the Teams link for your session. Please try again and let me know if you still have issues.",
				respondedBy: adminUser._id,
			},
		];

		await Support.insertMany(supportTickets);
		console.log(`Seeded ${supportTickets.length} support tickets`);
	} catch (err) {
		console.error("Seeding error:", err);
	} finally {
		await mongoose.connection.close();
	}
}

seed();

