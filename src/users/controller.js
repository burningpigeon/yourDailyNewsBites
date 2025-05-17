const pool = require('./db_access');
const bcrypt = require('bcrypt');
const { generateValidationCode } = require('./utils');


const getUsers = (req, res) => {
    pool.query("SELECT * FROM users", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
};

const addUser = async(req, res) => {
    const { email, password, passwordVerify} = req.body
    if (!email || !password){
        return res.status(400).json({error: 'Missing required fields: email, password'});
    }

    if (password.length <6 ){
        return res.status(400).json({error: 'Password length must be greater than 6'});
    }

    if ( password != passwordVerify){
        return res.status(400).json({error: 'Passwords have to match'});
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

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

const removeUser = async (req, res) =>{
    const { email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields: email and password' });
    }

    try{
        const result = await pool.query('SELECT * FROM get_user_by_email($1)', [email]);
        if (result.rows.length === 0){
            return res.status(400).json({error: 'User not found'});
        }
        
        const user = result.rows[0];
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched){
            return res.status(401).json({error: 'Incorrect password'});
        }

        await pool.query('DELETE FROM users WHERE email =$1', [email]);
        return res.status(200).json({message: 'User successfully removed'});
    }
    catch(err){
        return res.status(500).json({error: 'Internal server error'});
    }
};

const getUser = async(req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Missing required query parameter: email' });
    }

    try {
        const result = await pool.query('SELECT * FROM get_user_by_email($1)', [email]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ user: result.rows[0] });
    } 
    catch (err) {
        console.error('Internal server error', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const changeEmail = async(req, res) => {
    const { currentEmail, newEmail, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields: email and password' });
    }

    try{
        const result = await pool.query('SELECT * FROM get_user_by_email($1)', [currentEmail]);
        if (result.rows.length === 0){
            return res.status(404).json({error: 'User not found'});
        }
        
        const user = result.rows[0];
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched){
            return res.status(401).json({error: 'Incorrect password'});
        }

        await pool.query('CALL change_email($1, $2, $3)', [ currentEmail, newEmail, password ]);
        return res.status(201).json({message: 'Email successfully changed!'});
    }
    catch (err) {
        if (err.message.includes('Email is already connected to an account')){
            return res.status(400).json({error: 'Email is already connected to an account'});
        }

        return res.status(500).json({ error: 'Internal server error' });
    }
};

const changePassword = async(req, res) =>{
    const { email, currentPassword, newPassword} = req.body;

    if (!email || !currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Missing required fields: email, old password and new password' });
    }
    try{
        const result = await pool.query('SELECT * FROM get_user_by_email($1)', [currentEmail]);
        if (result.rows.length === 0){
            return res.status(404).json({error: 'User not found'});
        }
        
        const user = result.rows[0];
        const isMatched = await bcrypt.compare(currentPassword, user.password);
        if (!isMatched){
            return res.status(401).json({error: 'Incorrect password'});
        }

        const salt = await bcrypt.genSalt();
        const newPasswordHashed = await bcrypt.hash(password, salt);

        await pool.query('CALL change_email($1, $2, $3)', [ email, currentPassword, newPasswordHashed ]);
        return res.status(201).json({message: 'Password successfully changed!'});
    }
    catch (err){
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getUsers,
    addUser,
    getUser,
    removeUser,
    changeEmail,
    changePassword,
}