import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">

      <div className="flex justify-between items-center max-w-6xl mx-auto">

        {/* Logo */}
        <h1 className="text-2xl font-bold">
          Online Pharmacy
        </h1>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">

          <Link to="/products" className="hover:underline">
            Products
          </Link>

          <Link to="/cart" className="flex items-center gap-2 hover:underline">
            <FaShoppingCart />
            Cart
          </Link>

          <Link to="/orders" className="hover:underline">
            Orders
          </Link>

          <Link to="/login" className="bg-white text-blue-600 px-3 py-1 rounded">
            Login
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;