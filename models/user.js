const connection = require('../utils/database');

class User {
  static async getAllInformation(id) {
    try {
      const [rows] = await connection.execute('SELECT * FROM Teachers WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      return 0;
    }
  }

  static async getDescription(id) {
    try {
      const [rows] = await connection.execute(`
      SELECT
        last_name,
        first_name,
        patronymic,
        (SELECT position_title FROM Positions WHERE position_id = position) AS position,
        (SELECT degree_title FROM Degrees WHERE degree_id = academic_degree) AS academic_degree,
        (SELECT title_title FROM Titles WHERE title_id = academic_title) AS academic_title,
        (SELECT department_title FROM Departments WHERE department_id = department) AS department,
        coefficient,
        status,
        avatar
      FROM Teachers
      WHERE id = ?
      `, [id]);
      return rows[0];
    } catch (error) {
      return 0;
    }
  }

  static async getPosition(id) {
    try {
      const [rows] = await connection.execute(
        'SELECT position_title FROM Positions WHERE position_id = ?',
        [id],
      );
      return rows[0].position_title;
    } catch (error) {
      return 0;
    }
  }

  static async getTitle(id) {
    try {
      const [rows] = await connection.execute(
        'SELECT title_title FROM Titles WHERE title_id = ?',
        [id],
      );
      return rows[0].title_title;
    } catch (error) {
      return 0;
    }
  }

  static async getDegree(id) {
    try {
      const [rows] = await connection.execute(
        'SELECT degree_title FROM Degrees WHERE degree_id = ?',
        [id],
      );
      return rows[0].degree_title;
    } catch (error) {
      return 0;
    }
  }

  static async getDepartment(id) {
    try {
      const [rows] = await connection.execute(
        'SELECT department_title FROM Departments WHERE department_id = ?',
        [id],
      );
      return rows[0].department_title;
    } catch (error) {
      return 0;
    }
  }

  static async getCoefficient(id) {
    try {
      const [rows] = await connection.execute(
        'SELECT coefficient FROM Teachers WHERE id = ?',
        [id],
      );
      return rows[0].coefficient;
    } catch (error) {
      return 0;
    }
  }

  static async getEmail(id) {
    try {
      const [rows] = await connection.execute(
        'SELECT email FROM Auth WHERE teacher_id = ?',
        [id],
      );
      return rows[0].email;
    } catch (error) {
      return 0;
    }
  }

  static async saveUserData(userData) {
    try {
      const sql = 'UPDATE Teachers, Auth '
        + 'SET last_name = ?, '
        + 'first_name = ?, '
        + 'patronymic = ?, '
        + 'position = ?, '
        + 'academic_degree = ?, '
        + 'academic_title = ?, '
        + 'coefficient = ?, '
        + 'department = ?, '
        + 'email = ? '
        + 'WHERE Teachers.id = ? AND Auth.teacher_id = ?';
      const values = [
        userData.last_name,
        userData.first_name,
        userData.patronymic,
        Number(userData.position),
        Number(userData.academic_degree),
        Number(userData.academic_title),
        Number(userData.coefficient),
        Number(userData.department),
        userData.email,
        userData.id,
        userData.id,
      ];
      await connection.execute(sql, values);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async setPassword(userData) {
    try {
      await connection.execute(
        'UPDATE Auth SET password = ? WHERE teacher_id = ?',
        [userData.password, userData.id],
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  static async getUserByEmail(email) {
    try {
      const [rows] = await connection.execute(
        'SELECT teacher_id, password FROM Auth WHERE email = ?',
        [email],
      );
      return rows[0];
    } catch (error) {
      return 0;
    }
  }

  static async createUser(newUser) {
    try {
      const user = newUser;

      await connection.execute(
        `INSERT INTO Teachers(
          last_name,
          first_name,
          patronymic,
          position,
          academic_degree,
          academic_title,
          department)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          user.last_name,
          user.first_name,
          user.patronymic,
          user.position,
          user.academic_degree,
          user.academic_title,
          user.department,
        ],
      );

      await connection.execute(
        `INSERT INTO Auth
         VALUES (?, ?, ?)`,
        [
          user.teacher_id,
          user.email,
          user.password,
        ],
      );

      await connection.execute(
        `INSERT INTO Rating(teacher_id)
         VALUES (?)`,
        [user.teacher_id],
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  static async updatePhoto(id, filename) {
    try {
      await connection.execute(
        'UPDATE Teachers SET avatar = ? WHERE id = ?',
        [filename, id],
      );
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = User;
