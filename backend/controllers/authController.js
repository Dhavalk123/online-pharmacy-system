const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register user
const register = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        // check if email already exists
        const userExists = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING *",
            [name, email, hashedPassword, role]
        );

        res.status(201).json({
            message: "User registered successfully",
            user: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Something went wrong"
        });

    }
};


// Login user
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { user_id: user.user_id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Something went wrong"
        });

    }

};

module.exports = {
    register,
    login
};