const pool = require("../config/db");

// Add product
const addProduct = async (req, res) => {
    try {
        const { vendor_id, product_name, category, price, stock_quantity } = req.body;

        const result = await pool.query(
            "INSERT INTO products (vendor_id, product_name, category, price, stock_quantity) VALUES ($1,$2,$3,$4,$5) RETURNING *",
            [vendor_id, product_name, category, price, stock_quantity]
        );

        res.status(201).json({
            message: "Product added successfully",
            product: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {

        const result = await pool.query("SELECT * FROM products");

        res.status(200).json({
            products: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Get product by id
const getProductById = async (req, res) => {
    try {

        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM products WHERE product_id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            product: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {

        const { id } = req.params;
        const { product_name, category, price, stock_quantity } = req.body;

        const result = await pool.query(
            "UPDATE products SET product_name=$1, category=$2, price=$3, stock_quantity=$4 WHERE product_id=$5 RETURNING *",
            [product_name, category, price, stock_quantity, id]
        );

        res.status(200).json({
            message: "Product updated successfully",
            product: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {

        const { id } = req.params;

        await pool.query(
            "DELETE FROM products WHERE product_id=$1",
            [id]
        );

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};