import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";

function AppRouter() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Products />} />

        <Route path="/products" element={<Products />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/orders" element={<Orders />} />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRouter;