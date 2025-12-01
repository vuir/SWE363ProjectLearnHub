const Course = require("../model/Course");



exports.getAllCourses = async (req, res) => {
  try {
    const { department, search } = req.query;
    const query = {};

    // Helper function to escape regex special characters
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Filter by department (case-insensitive)
    let departmentFilter = null;
    if (department) {
      // Decode URL-encoded spaces and make case-insensitive
      const decodedDepartment = decodeURIComponent(department).trim();
      const escapedDepartment = escapeRegex(decodedDepartment);
      departmentFilter = { department: { $regex: new RegExp(`^${escapedDepartment}$`, 'i') } };
    }

    // Search in title, description, and courseId (case-insensitive)
    let searchFilter = null;
    if (search) {
      const decodedSearch = decodeURIComponent(search).trim();
      const escapedSearch = escapeRegex(decodedSearch);
      searchFilter = {
        $or: [
          { title: { $regex: escapedSearch, $options: "i" } },
          { description: { $regex: escapedSearch, $options: "i" } },
          { courseId: { $regex: escapedSearch, $options: "i" } },
        ]
      };
    }

    // Combine filters with AND logic when both are provided
    if (departmentFilter && searchFilter) {
      query.$and = [departmentFilter, searchFilter];
    } else if (departmentFilter) {
      Object.assign(query, departmentFilter);
    } else if (searchFilter) {
      Object.assign(query, searchFilter);
    }

    const courses = await Course.find(query).sort({ courseId: 1 });
    return res.json(courses);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getCourseByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findOne({ courseId });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.json(course);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { courseId, title, description, department } = req.body;

    if (!courseId || !title || !department) {
      return res
        .status(400)
        .json({ message: "courseId, title, and department are required" });
    }

    // Check if course with same courseId already exists
    const existingCourse = await Course.findOne({ courseId });
    if (existingCourse) {
      return res
        .status(400)
        .json({ message: "Course with this courseId already exists" });
    }

    const course = new Course({
      courseId,
      title,
      description: description || "",
      department,
    });

    await course.save();
    return res.status(201).json(course);
  } catch (err) {
		console.error("createCourse error:", err);
		res.status(500).json({ message: "Server error" });
	}
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseId, title, description, department } = req.body;

    const course = await Course.findOne({ courseId: id });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Update
    if (courseId !== undefined) {
      if (courseId !== course.courseId) {
        const existingCourse = await Course.findOne({ courseId });
        if (existingCourse) {
          return res
            .status(400)
            .json({ message: "Course with this courseId already exists" });
        }
      }
      course.courseId = courseId;
    }
    if (title !== undefined) course.title = title;
    if (description !== undefined) course.description = description;
    if (department !== undefined) course.department = department;

    await course.save();
    return res.json(course);
  } catch (err) {
		console.error("updateCourse error:", err);
		res.status(500).json({ message: "Server error" });
	}
};


exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findOneAndDelete({ courseId: id });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


exports.getCoursesByDepartment = async (req, res) => {
  try {
    const { department } = req.params;
    const courses = await Course.find({ department }).sort({ courseId: 1 });

    return res.json(courses);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

