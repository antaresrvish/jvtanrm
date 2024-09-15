const {db} = require('../config/db');

class User {
  static async findByEmail(email) {
    try {
      const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    } catch (error) {
      console.error('ex:', error);
    }
  }
}

module.exports = User;