const pool = require("../config/db");

const addUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const result = await pool.query(
            "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email, password, role]
        );

        res.status(201).json({
            message: "User added successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const getUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");

        res.status(200).json({
            message: "Users fetched successfully",
            users: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = {
    addUser,
    getUsers
};