require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../model/User");
const Session = require("../model/Sessions");
const Booking = require("../model/Booking");

async function seed() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");

		// Clear existing bookings
		await Booking.deleteMany({});

		// Get students and sessions
		const students = await User.find({ role: "student" });
		const sessions = await Session.find({});

		if (students.length === 0 || sessions.length === 0) {
			console.log("No students or sessions found. Please seed users and sessions first.");
			return;
		}

		const bookings = [];

		// Book some sessions for students
		sessions.forEach((session, index) => {
			if (index < students.length * 2) { // Book first few sessions
				const student = students[index % students.length];
				bookings.push({
					sessionId: session._id,
					studentId: student._id,
					status: "confirmed",
				});
			}
		});

		await Booking.insertMany(bookings);
		console.log(`Seeded ${bookings.length} bookings`);
	} catch (err) {
		console.error("Seeding error:", err);
	} finally {
		await mongoose.connection.close();
	}
}

seed();

