"use client";
import { login, signup } from "@/utils/action";
import React, { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
interface AuthProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Auth: React.FC<AuthProps> = ({  setOpen }) => {
  const [option, setOption] = useState("login");
  
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response;
    if (option == "login") {
      response = await login(data);
    } else {
      response = await signup(data);
    }
    if (response?.error) {
      return toast.error(response?.error);
    }
    const token = response?.token;
    if (token) {
      toast.success(`${option} successfull!!`);
      Cookies.set("token", token);
      setOpen(false);
    } else {
      return toast.error("Invalid Token!");
    }
  };

  return (
    <div className="w-full">
      <div className="flex py-2 gap-5">
        <button
          className={`border-b-2 py-1 ${
            option === "login" ? "border-[#00FFAF]" : "border-transparent"
          }`}
          onClick={() => {
            setOption("login");
          }}
        >
          Login
        </button>
        <button
          className={`border-b-2 py-1 ${
            option === "signup" ? "border-[#00FFAF]" : "border-transparent"
          }`}
          onClick={() => {
            setOption("signup");
          }}
        >
          Signup
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4 w-full">
        {option === "signup" && (
          <>
            <label className="text-lg">Name:</label>
            <input
              name="name"
              onChange={handleChange}
              value={data.name}
              className="bg-transparent text-md outline-none border-[1px] border-gray-400 rounded-xl px-4 py-2"
              placeholder="Enter Name"
            />
          </>
        )}

        <label className="text-lg">Email:</label>
        <input
          name="email"
          onChange={handleChange}
          value={data.email}
          className="bg-transparent text-md outline-none border-[1px] border-gray-400 rounded-xl px-4 py-2"
          placeholder="Enter Email"
        />

        <label className="text-xl">Password:</label>
        <input
          name="password"
          onChange={handleChange}
          value={data.password}
          className="bg-transparent text-md outline-none border-[1px] border-gray-400 rounded-xl px-4 py-2"
          placeholder="Enter Password"
        />
        <button
          type="submit"
          className="text-black px-3 py-1 mt-4 text-xl border-[1px] border-black rounded-lg bg-[#00FFAF] w-fit mx-auto"
        >
          <span>{option === "login" ? "Login" : "Sign up"}</span>
        </button>
      </form>
    </div>
  );
};

export default Auth;
