require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../model/User");
const Course = require("../model/Course");
const Session = require("../model/Sessions");
const Booking = require("../model/Booking");
const Notification = require("../model/Notification");

async function seed() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");

		// Clear existing notifications
		await Notification.deleteMany({});

		// Get users, courses, sessions, and bookings
		const students = await User.find({ role: "student" });
		const courses = await Course.find({});
		const sessions = await Session.find({});
		const bookings = await Booking.find({});

		if (students.length === 0) {
			console.log("No students found. Please seed users first.");
			return;
		}

		const notifications = [];

		// Notifications for students about bookings
		bookings.forEach((booking, index) => {
			const session = sessions.find(s => s._id.toString() === booking.sessionId.toString());
			if (session) {
				const course = courses.find(c => c._id.toString() === session.courseId.toString());
				notifications.push({
					userId: booking.studentId,
					title: "Session Booked Successfully",
					message: `You have successfully booked a session for ${course?.title || "a course"} on ${new Date(session.dateTime).toLocaleDateString()}.`,
					type: "booking",
					isRead: index % 2 === 0, // Some read, some unread
				});
			}
		});

		// Notifications for tutors about new bookings
		bookings.forEach((booking) => {
			const session = sessions.find(s => s._id.toString() === booking.sessionId.toString());
			if (session) {
				const course = courses.find(c => c._id.toString() === session.courseId.toString());
				notifications.push({
					userId: session.tutorId,
					title: "New Booking",
					message: `A student has booked your session for ${course?.title || "a course"}.`,
					type: "booking",
					isRead: false,
				});
			}
		});

		// General notifications
		students.forEach((student) => {
			notifications.push({
				userId: student._id,
				title: "Welcome!",
				message: "Welcome to LearnHub! Explore courses and find tutors to help you succeed.",
				type: "general",
				isRead: false,
			});
		});

		await Notification.insertMany(notifications);
		console.log(`Seeded ${notifications.length} notifications`);
	} catch (err) {
		console.error("Seeding error:", err);
	} finally {
		await mongoose.connection.close();
	}
}

seed();

