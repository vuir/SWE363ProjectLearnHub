const Session = require("../model/Sessions");
const Booking = require("../model/Booking");
const User = require("../model/User");
const Review = require("../model/Review");

/**
 * Get analytics data for admin dashboard
 * @param {Request} req 
 * @param {Response} res 
 * @returns
 */
async function getAnalytics(req, res) {
  try {

    const totalSessions = await Session.countDocuments();
    const totalEnrollments = await Booking.countDocuments();
    const tutors = await User.find({ role: "tutor" });
    const activeTutors = tutors.length;

    let averageRating = 0;
    if (tutors.length > 0) {
      const allReviews = await Review.find({});
      if (allReviews.length > 0) {
        const sumRatings = allReviews.reduce((sum, review) => sum + review.rating, 0);
        averageRating = sumRatings / allReviews.length;
        averageRating = Math.round(averageRating * 10) / 10;
      }
    }

    return [200, {
      totalSessions,
      totalEnrollments,
      averageRating,
      activeTutors
    }, null];
  } catch (err) {
    console.log("Error fetching analytics:", err);
    return [500, { "message": "Internal server error." }, null];
  }
}

module.exports = {
  getAnalytics
};

