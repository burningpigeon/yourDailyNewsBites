const pool = require('../../db_access');

const getUsers = (req, res) => {
    pool.query("SELECT * FROM users", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
};

module.exports = {
    getUsers,
}