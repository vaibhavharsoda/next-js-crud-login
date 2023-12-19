"use client";

import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { redirect } from 'next/navigation';

export function ProductCard({ product }) {
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
      redirect('/products')
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link
        href={`/products/${product.id}`}
        className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-3"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {product.name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-200">
          {product.description}
        </p>
        <p className="font-bold text-gray-800 dark:text-gray-100 text-2xl">
          {product.price} $
        </p>
      </Link>
      <div className="flex justify-between">

      <Link
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-5 py-2.5 text-center me-2 rounded-lg mb-4 ml-3"
        href={`/products/edit/"${product.id}`}
      >
        Edit
      </Link>
      
      <button
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-4 mr-3"
        onClick={() => handleDelete(product.id)}
      >
        Delete
      </button>

      </div>
    </div>
  );
}
