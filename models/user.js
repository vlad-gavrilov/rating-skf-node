const connection = require('../utils/database');

class User {
    static getAllInformation(id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM Teachers WHERE id = ${id}`, async function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0]);
            });
        })
    }

    static getPosition(id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT position_title FROM Positions WHERE position_id = ${id}`, function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0].position_title);
            });
        })
    }

    static getTitle(id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT title_title FROM Titles WHERE title_id = ${id}`, function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0].title_title);
            });
        })
    }

    static getDegree(id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT degree_title FROM Degrees WHERE degree_id = ${id}`, function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0].degree_title);
            });
        })
    }

    static getDepartment(id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT department_title FROM Departments WHERE department_id = ${id}`, function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0].department_title);
            });
        })
    }

    static getCoefficient(id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT coefficient FROM Teachers WHERE id = ${id}`, function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0].coefficient);
            });
        })
    }

    static getEmail(id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT email FROM Auth WHERE teacher_id = ${id}`, function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0].email);
            });
        })
    }

    static saveUserData(userData) {
        return new Promise((resolve, reject) => {
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
                userData.id
            ];

            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        })
    }

    static setPassword(userData) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE Auth SET password = ? WHERE teacher_id = ?';
            const values = [userData.password, userData.id];
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        })
    }

    static getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT teacher_id, password FROM Auth WHERE email = ?';
            const values = [email];
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0]);
            });
        })
    }

    static async createUser(newUser) {
        newUser.teacher_id = await (new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Teachers(last_name, first_name, patronymic, position, academic_degree, academic_title, department) ' +
                'VALUES (?, ?, ?, ?, ?, ?, ?)';

            const values = [newUser.last_name, newUser.first_name, newUser.patronymic, newUser.position, newUser.academic_degree, newUser.academic_title, newUser.department];
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results.insertId);
            });
        }));

        await (new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Auth ' +
                'VALUES (?, ?, ?)';

            const values = [newUser.teacher_id, newUser.email, newUser.password];
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        }));

        await (new Promise((resolve, reject) => {
            const sql = 'INSERT INTO ND_table(teacher_id) ' +
                'VALUES (?)';

            const values = [newUser.teacher_id];
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        }));

        await (new Promise((resolve, reject) => {
            const sql = 'INSERT INTO NP_table(teacher_id) ' +
                'VALUES (?)';

            const values = [newUser.teacher_id];
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        }));

        await (new Promise((resolve, reject) => {
            const sql = 'INSERT INTO OD_table(teacher_id) ' +
                'VALUES (?)';

            const values = [newUser.teacher_id];
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        }));

        await (new Promise((resolve, reject) => {
            const sql = 'INSERT INTO OP_table(teacher_id) ' +
                'VALUES (?)';

            const values = [newUser.teacher_id];
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        }));

        await (new Promise((resolve, reject) => {
            const sql = 'INSERT INTO R_table(teacher_id) ' +
                'VALUES (?)';

            const values = [newUser.teacher_id];
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        }));

    }

    static updatePhoto(id, filename) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE Teachers SET avatar = ? WHERE id = ?';
            const values = [filename, id];
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0]);
            });
        })
    }
}

module.exports = User;