const pool = require("../config/db");

const addToCart = async (req, res) => {
    try {

        const { user_id, product_id, quantity } = req.body;

        const result = await pool.query(
            "INSERT INTO cart (user_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *",
            [user_id, product_id, quantity]
        );

        res.status(201).json({
            message: "Product added to cart",
            cart: result.rows[0]
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Something went wrong" });

    }
};

const getCart = async (req, res) => {
    try {

        const user_id = req.user.user_id;

        const result = await pool.query(
            `SELECT 
                cart.cart_id,
                products.product_name,
                products.price,
                cart.quantity,
                (products.price * cart.quantity) AS total
            FROM cart
            JOIN products 
            ON cart.product_id = products.product_id
            WHERE cart.user_id = $1`,
            [user_id]
        );

        res.json({
            cart: result.rows
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Something went wrong" });

    }
};


// NEW FUNCTION
const updateCartItem = async (req, res) => {
    try {

        const { cart_id } = req.params;
        const { quantity } = req.body;

        const result = await pool.query(
            "UPDATE cart SET quantity = $1 WHERE cart_id = $2 RETURNING *",
            [quantity, cart_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        res.json({
            message: "Cart updated successfully",
            cart: result.rows[0]
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Something went wrong" });

    }
};


const removeFromCart = async (req, res) => {
    try {

        const { cart_id } = req.params;

        const result = await pool.query(
            "DELETE FROM cart WHERE cart_id = $1 RETURNING *",
            [cart_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        res.json({
            message: "Item removed from cart",
            item: result.rows[0]
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Something went wrong" });

    }
};

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart
};