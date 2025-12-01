require("dotenv").config();
const mongoose = require("mongoose");
const Session = require("../model/Sessions");
const Booking = require("../model/Booking");
const Review = require("../model/Review");

async function seed() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");

		// Clear existing reviews
		await Review.deleteMany({});

		// Get completed sessions and bookings
		const completedSessions = await Session.find({ status: "completed" });
		const bookings = await Booking.find({});

		if (completedSessions.length === 0 || bookings.length === 0) {
			console.log("No completed sessions or bookings found. Please seed sessions and bookings first.");
			return;
		}

		const reviews = [];

		// Create reviews for completed sessions
		completedSessions.forEach((session, index) => {
			const booking = bookings.find(b => b.sessionId.toString() === session._id.toString());
			if (booking) {
				reviews.push({
					sessionId: session._id,
					tutorId: session.tutorId,
					studentId: booking.studentId,
					rating: 4 + (index % 2), // Alternating between 4 and 5
					comment: index % 2 === 0 
						? "Great session! The tutor explained everything clearly and was very helpful."
						: "Excellent tutor! Very knowledgeable and patient. Highly recommend.",
				});
			}
		});

		await Review.insertMany(reviews);
		console.log(`Seeded ${reviews.length} reviews`);
	} catch (err) {
		console.error("Seeding error:", err);
	} finally {
		await mongoose.connection.close();
	}
}

seed();

