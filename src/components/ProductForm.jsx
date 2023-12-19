"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";

export function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const router = useRouter();
  const params = useParams();


  useEffect(() => {
    const fetchProduct = async (id) => {
      try {
        const { data } = await axios.get("/api/products/" + id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (params?.id) {
      fetchProduct(params.id);
    }
  }, [params.id]);

  const handleChange = ({ target: { name, value } }) =>
    setProduct({ ...product, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params?.id) {
        await axios.put("/api/products/" + params.id, {
          name: product.name,
          description: product.description,
          price: product.price,
        });

        toast.success("Task Updated", {
          position: "bottom-center",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        await axios.post("/api/products", product);

        toast.success("Task Saved", {
          position: "bottom-center",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }

      router.refresh();
      router.push("/products");
    } catch (error) {
      toast.error(error.response.data.message,{
        position: "bottom-center",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <form
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="text-sm font-medium text-gray-600"
            htmlFor="name"
          >
            Product Name
          </label>
          <input
            className="mt-1 p-2 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            placeholder="name"
            id="name"
            name="name"
            onChange={handleChange}
            value={product.name}
            autoComplete="off"
            autoFocus
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="text-sm font-medium text-gray-600"
          >
            Product Price:
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            name="price"
            placeholder="10.00"
            onChange={handleChange}
            value={product.price}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-600"
          >
            Write a Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="3"
            placeholder="Product description"
            className="mt-1 p-2 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            onChange={handleChange}
            value={product.description}
          ></textarea>
        </div>

        <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-2 rounded-md hover:opacity-90 focus:outline-none focus:ring focus:border-indigo-500">
          {params?.id ? "Update Product" : "Save Product"}
        </button>
      </form>
    </div>
  );
}
