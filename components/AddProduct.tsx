"use client";
import { addProduct, updateProduct } from "@/utils/action";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
interface AuthProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialData?: {
    _id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
  };
}
const AddProduct: React.FC<AuthProps> = ({ setOpen, initialData }) => {
  const [data, setData] = useState<any>({
    name: "",
    price: null,
    description: "",
    stock: null,
  });

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response;
    if (initialData) {
      response = await updateProduct(initialData._id, data);
    } else {
      response = await addProduct(data);
    }

    if (response?.error) {
      return toast.error(response?.error);
    }

    toast.success(
      initialData
        ? "Product updated successfully"
        : "Product added successfully"
    );
    setOpen(false);
    setData({
      name: "",
      price: 0,
      description: "",
      stock: 0,
    });
  };

  return (
    <div className="w-full z-[50]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4 w-full">
        <label className="text-lg">Name:</label>
        <input
          name="name"
          onChange={handleChange}
          value={data.name}
          className="bg-transparent text-md outline-none border-[1px] border-gray-400 rounded-xl px-4 py-2"
          placeholder="Enter name"
        />

        <label className="text-xl">Description:</label>
        <input
          name="description"
          onChange={handleChange}
          value={data.description}
          className="bg-transparent text-md outline-none border-[1px] border-gray-400 rounded-xl px-4 py-2"
          placeholder="Enter description"
        />
        <label className="text-xl">Price:</label>
        <input
          name="price"
          onChange={handleChange}
          value={data.price}
          className="bg-transparent text-md outline-none border-[1px] border-gray-400 rounded-xl px-4 py-2"
          placeholder="Enter price"
        />
        <label className="text-xl">Stock:</label>
        <input
          name="stock"
          onChange={handleChange}
          value={data.stock}
          className="bg-transparent text-md outline-none border-[1px] border-gray-400 rounded-xl px-4 py-2"
          placeholder="Enter stock"
        />
        <button
          type="submit"
          className="text-black px-3 py-1 mt-4 text-xl border-[1px] border-black rounded-lg bg-[#00FFAF] w-fit mx-auto"
        >
          {initialData ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
