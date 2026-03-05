import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {

      const res = await API.get("/products");
      console.log(res.data);

      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else if (res.data.products) {
        setProducts(res.data.products);
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
  <div className="max-w-6xl mx-auto p-6">

    <h1 className="text-3xl font-bold mb-6">
      Medicines
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

      {products.map((product) => (
        <ProductCard
          key={product.product_id}
          product={product}
        />
      ))}

     </div>

     </div>
    );
}

export default Products;