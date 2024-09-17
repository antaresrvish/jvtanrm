const {db} = require('../config/db');

class User {
  static async findByEmail(email) {
    try {
      const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    } catch (ex) {
      console.error('ex:', ex);
    }
  }
  static async findById(id) {
    try {
      const [rows] = await db.promise().query('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0];
    } catch (ex) {
      console.error('ex:', ex);
    }
  }
}

module.exports = User;