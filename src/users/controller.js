const pool = require('./db_access');
const { generateValidationCode } = require('./utils');


const getUsers = (req, res) => {
    pool.query("SELECT * FROM users", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
};

const addUser = async(req, res) => {
    console.log("BODY:", req.body);
    const { email, passwordHash} = req.body
    if (!email || !passwordHash){
        return res.status(400).json({error: 'Missing required fields: email, password'})
    }

    try{
        let verificationCode = generateValidationCode();
        await pool.query('CALL add_user($1, $2, $3)', [email, passwordHash, verificationCode]);
        return res.status(201).json({message: 'User succesfully created. Verification pending'});
    }
    catch (err){
        if (err.message.includes('Email already in use')){
            return res.status(400).json({error: 'Email already in use'});
        }

        console.error('Internal server error', err);
        return res.status(500).json({error: 'Internal server error'});
    }
};

module.exports = {
    getUsers,
    addUser,
}