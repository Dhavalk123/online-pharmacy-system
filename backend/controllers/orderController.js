const pool = require("../config/db");

const createOrder = async (req, res) => {
    try {

        const user_id = req.user.user_id;

        // Get cart items
        const cartItems = await pool.query(
            "SELECT * FROM cart WHERE user_id = $1",
            [user_id]
        );

        if (cartItems.rows.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        let total = 0;

        // Calculate total price
        for (let item of cartItems.rows) {

            const product = await pool.query(
                "SELECT price FROM products WHERE product_id = $1",
                [item.product_id]
            );

            total += product.rows[0].price * item.quantity;
        }

        // Create order
        const order = await pool.query(
            "INSERT INTO orders (user_id, total_amount) VALUES ($1,$2) RETURNING *",
            [user_id, total]
        );

        const order_id = order.rows[0].order_id;

        // Insert order items
        for (let item of cartItems.rows) {

            const product = await pool.query(
                "SELECT price FROM products WHERE product_id = $1",
                [item.product_id]
            );

            await pool.query(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1,$2,$3,$4)",
                [order_id, item.product_id, item.quantity, product.rows[0].price]
            );
        }

        // Clear cart
        await pool.query(
            "DELETE FROM cart WHERE user_id = $1",
            [user_id]
        );

        res.json({
            message: "Order placed successfully",
            order: order.rows[0]
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({
            error: "Something went wrong"
        });

    }
};

// NEW FUNCTION (Order History API)
const getOrders = async (req, res) => {
    try {

        const user_id = req.user.user_id;

        const orders = await pool.query(
            "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
            [user_id]
        );

        res.json({
            orders: orders.rows
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({
            error: "Something went wrong"
        });

    }
};

module.exports = {
    createOrder,
    getOrders
};