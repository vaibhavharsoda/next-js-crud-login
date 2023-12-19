import axios from "axios";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";

async function loadProduct() {
  const { data } = await axios.get("http://localhost:3000/api/products");
  return data;
}

async function ProductsPage() {
  const products = await loadProduct();

  if (products.length === 0) return <h1>No Products</h1>;

  return (
    <>
    <Link href="/new"
    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-5 py-2.5 text-center me-2 rounded-lg mb-4 ml-3 ">
      Add new
    </Link>

    <div className="grid gap-4 grid-cols-1 md:grid-cols-4 pt-7">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    </>
  );
}

export default ProductsPage;
