const connection = require('../utils/database');

class Rating {
    static getOD(id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM OD_table WHERE teacher_id = ${id}`, async function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0]);
            });
        })
    }

    static getOP(id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM OP_table WHERE teacher_id = ${id}`, async function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0]);
            });
        })
    }

    static getND(id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM ND_table WHERE teacher_id = ${id}`, async function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0]);
            });
        })
    }

    static getNP(id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM NP_table WHERE teacher_id = ${id}`, async function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0]);
            });
        })
    }

    static getR(id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM R_table WHERE teacher_id = ${id}`, async function (error, results, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0]);
            });
        })
    }
}

module.exports = Rating;