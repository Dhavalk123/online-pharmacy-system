const pool = require("../config/db");

const addUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const result = await pool.query(
            "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING *",
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

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM users WHERE user_id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            user: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Something went wrong"
        });
    }
};

const updateUser = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, email } = req.body;

        const result = await pool.query(
            "UPDATE users SET name = $1, email = $2 WHERE user_id = $3 RETURNING *",
            [name, email, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Something went wrong"
        });
    }
};

const deleteUser = async (req, res) => {
    try {

        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM users WHERE user_id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Something went wrong"
        });
    }
};

module.exports = {
    addUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
    