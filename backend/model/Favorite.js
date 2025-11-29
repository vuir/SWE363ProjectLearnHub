const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
});

// Ensure either tutorId or courseId is provided
favoriteSchema.pre('validate', function(next) {
  if (!this.tutorId && !this.courseId) {
    next(new Error('Either tutorId or courseId must be provided'));
  } else {
    next();
  }
});

module.exports = mongoose.model('Favorite', favoriteSchema);

