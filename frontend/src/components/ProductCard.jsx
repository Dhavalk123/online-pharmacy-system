import { FaShoppingCart, FaStar } from "react-icons/fa";

function ProductCard({ product }) {

  const addToCart = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          product_id: product.product_id,
          quantity: 1
        })
      });

      if (res.ok) {
        alert("Product added to cart");
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">

      {/* Product Image */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
        alt="medicine"
        className="w-full h-32 object-contain mb-3"
      />

      {/* Name */}
      <h2 className="text-lg font-semibold">
        {product.product_name}
      </h2>

      {/* Category */}
      <p className="text-gray-500 text-sm">
        {product.category}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-1 text-yellow-500 mt-1">
        <FaStar />
        <span className="text-sm text-gray-700">4.5</span>
      </div>

      {/* Price */}
      <p className="text-xl font-bold mt-2 text-blue-600">
        ₹{product.price}
      </p>

      {/* Add to Cart */}
      <button
        onClick={addToCart}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700"
      >
        <FaShoppingCart />
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;