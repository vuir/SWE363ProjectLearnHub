require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../model/User");

async function seed() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");

		// Clear existing users
		await User.deleteMany({});

		const users = [
			{
				name: "Khadijah Al-Safwan",
				email: "Student_affairs@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("admin123", 10),
				role: "admin",
				employeeId: "202000001",
				department: "Student affairs",
				manager: "Abdulrahman Al-Otaibi",
			},

			{
				name: "Ahmed Al-Saud",
				email: "ahmed.tutor@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("tutor123", 10),
				role: "tutor",
				studentId: "202100001", 
				college: "Computing & Mathematics",
				major: "Software Engineering",
				degree: "Bachelor of Science",
				program: "BS in Software Engineering",
				year: "Senior",
			},
			{
				name: "Fatima Al-Rashid",
				email: "fatima.tutor@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("tutor123", 10),
				role: "tutor",
				studentId: "202200001", 
				college: "Computing & Mathematics",
				major: "Computer Science",
				degree: "Bachelor of Science",
				program: "BS in Computer Science",
				year: "Junior",
			},
			{
				name: "Mohammed Al-Zahrani",
				email: "mohammed.tutor@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("tutor123", 10),
				role: "tutor",
				studentId: "202300001",
				college: "Engineering",
				major: "Electrical Engineering",
				degree: "Bachelor of Science",
				program: "BS in Electrical Engineering",
				year: "Sophomore",
			},
			{
				name: "Sara Al-Mutairi",
				email: "sara.tutor@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("tutor123", 10),
				role: "tutor",
				studentId: "202400001",
				college: "Computing & Mathematics",
				major: "Mathematics",
				degree: "Bachelor of Science",
				program: "BS in Mathematics",
				year: "Freshman",
			},

			{
				name: "Hayat Al-Ghamdi",
				email: "hayat.student@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("student123", 10),
				role: "student",
				studentId: "202200002",
				college: "Computing & Mathematics",
				major: "Computer Science",
				degree: "Bachelor of Science",
				program: "BS in Computer Science",
				year: "Junior",
			},
			{
				name: "Aleen Al-Qarni",
				email: "aleen.student@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("student123", 10),
				role: "student",
				studentId: "202200003",
				college: "Computing & Mathematics",
				major: "Software Engineering",
				degree: "Bachelor of Science",
				program: "BS in Software Engineering",
				year: "Junior",
			},
			{
				name: "Ghada Al-Ghamdi",
				email: "ghada.student@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("student123", 10),
				role: "student",
				studentId: "202200004",
				college: "Computing & Mathematics",
				major: "Computer Science",
				degree: "Bachelor of Science",
				program: "BS in Computer Science",
				year: "Junior",
			},
			{
				name: "Fatima Labban",
				email: "fatima.student@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("student123", 10),
				role: "student",
				studentId: "202200005",
				college: "Computing & Mathematics",
				major: "Software Engineering",
				degree: "Bachelor of Science",
				program: "BS in Software Engineering",
				year: "Junior",
			},
		];

		await User.insertMany(users);
		console.log("Seeded default users");
	} catch (err) {
		console.error("Seeding error:", err);
	}
}

seed();