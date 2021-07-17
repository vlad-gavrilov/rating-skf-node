const connection = require('../utils/database');

class Rating {
  static async getRating(id) {
    try {
      const [rows] = await connection.execute(
        'SELECT teacher_rating FROM Rating WHERE teacher_id = ?',
        [id],
      );
      return rows[0].teacher_rating;
    } catch (error) {
      return 0;
    }
  }

  static async setRating(userData) {
    try {
      await connection.execute(
        'UPDATE Rating SET teacher_rating = ? WHERE teacher_id = ?',
        [userData.rating, userData.id],
      );
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = Rating;
