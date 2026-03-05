import { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {

      const res = await API.get("/cart");

      setCart(res.data.cart);

    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (cart_id) => {
    try {

      await API.delete(`/cart/${cart_id}`);

      fetchCart();

    } catch (error) {
      console.error(error);
    }
  };

  const placeOrder = async () => {
    try {

      const res = await API.post("/orders");

      alert("Order placed successfully!");

      fetchCart();

    } catch (error) {
      console.error(error);
    }
  };

      const totalPrice = cart.reduce((sum, item) => {
      return sum + Number(item.total);
      }, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">

          {cart.map((item) => (
            <div
              key={item.cart_id}
              className="flex justify-between items-center border p-4 rounded shadow"
            >

              <div>
                <h2 className="font-semibold">
                  {item.product_name}
                </h2>

                <p className="text-gray-500">
                  Qty: {item.quantity}
                </p>

                <p className="text-blue-600 font-bold">
                  ₹{item.total}
                </p>
              </div>

              <button
                onClick={() => removeItem(item.cart_id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>

            </div>
          ))}

          <div className="mt-6 text-xl font-bold">
            Total: ₹{totalPrice}
          </div>

          <button
            onClick={placeOrder}
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded"
          >
            Place Order
          </button>

        </div>
      )}

    </div>
  );
}

export default Cart;