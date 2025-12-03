require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../model/User");
const Course = require("../model/Course");
const TutorProfile = require("../model/TutorProfile");
const Session = require("../model/Sessions");

async function seed() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");

		// Clear existing sessions
		await Session.deleteMany({});

		// Get tutors, courses, and tutor profiles
		const tutors = await User.find({ role: "tutor" });
		const courses = await Course.find({});
		const tutorProfiles = await TutorProfile.find({}).populate("coursesTaught");

		if (tutors.length === 0 || courses.length === 0) {
			console.log("No tutors or courses found. Please seed users and courses first.");
			return;
		}

		const sessions = [];
		const now = new Date();

		// Create sessions for each tutor
		tutorProfiles.forEach((tutorProfile, tutorIndex) => {
			const tutor = tutors.find(t => t._id.toString() === tutorProfile.userId.toString());
			if (tutor && tutorProfile.coursesTaught.length > 0) {
				tutorProfile.coursesTaught.forEach((course, courseIndex) => {
					// Create 2-3 sessions per tutor per course
					for (let i = 0; i < 2; i++) {
						const sessionDate = new Date(now);
						sessionDate.setDate(sessionDate.getDate() + (tutorIndex * 7) + (courseIndex * 3) + i + 1);
						sessionDate.setHours(10 + (i * 2), 0, 0, 0);

						sessions.push({
							courseId: course._id,
							tutorId: tutor._id,
							tutorName: tutor.name,
							title: `${course.title} - Session ${i + 1}`,
							description: `Join this tutoring session to get help with ${course.title}. We'll cover key concepts and answer your questions.`,
							dateTime: sessionDate,
							teamsLink: `https://teams.microsoft.com/l/meetup-join/19:meeting_${tutor._id}_${course._id}_${i}@thread.tacv2`,
							status: i === 0 && tutorIndex === 0 ? "completed" : "scheduled",
						});
					}
				});
			}
		});

		await Session.insertMany(sessions);
		console.log(`Seeded ${sessions.length} sessions`);
	} catch (err) {
		console.error("Seeding error:", err);
	} finally {
		await mongoose.connection.close();
	}
}

seed();

