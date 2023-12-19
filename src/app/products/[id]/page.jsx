"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

async function loadProduct(productId) {
  const { data } = await axios.get(
    "http://localhost:3000/api/products/" + productId
  );
  return data;
}

async function ProductPage({ params }) {
  const router = useRouter();
  const product = await loadProduct(params.id);

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/products/" + id);
      toast.success("Task deleted",{
        position: "bottom-center",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          }
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h5>
        <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">{product.description}</p>
        <p className="mb-2 text-gray-500 dark:text-gray-400">$ {product.price}</p>
        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
          <div className="mt-7 flex justify-center">
            <button
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-4 mr-3"
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </button>
            <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-5 py-2.5 text-center me-2 rounded-lg mb-4 ml-3"
            onClick={() => router.push("/products/edit/" + product.id)}
          >
            Edit
          </button>
        </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
