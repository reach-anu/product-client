"use client";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import Modal from "./Modal";
import { getCookie } from "@/utils/utils";
import Auth from "./Auth";
import AddProduct from "./AddProduct";
import { FaShoppingBag } from "react-icons/fa";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState<any>();
  const [modalContent, setModalContent] = useState<any>();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getCookie();
      if (token) {
        setAuth(true);
      }
    };
    checkAuth();
  }, [open]);

  return (
    <div className="px-4 flex justify-between items-center">
      {/* logo */}
      <Link
        href="/"
        className="text-2xl text-[#00FFAF] flex gap-1 items-center"
      >
        <FaShoppingBag />
        <span className="text-black font-semibold text-[1rem] italic md:block hidden">
          Shop
        </span>
      </Link>
      {/* searchBar */}
      <div className="shadow-inner rounded-2xl px-4 py-3 w-[70%] md:w-[45%] flex gap-5 items-center border-[1px] border-gray-200">
        <IoMdSearch className="text-2xl text-gray-500" />
        <input placeholder="Search product" className="outline-none w-full" />
      </div>
      {/* conditionally render profile or add product button */}
      {auth ? (
        <button
          onClick={() => {
            setModalContent(<AddProduct open={open} setOpen={setOpen} />);
            setOpen(true);
          }}
          className=" bg-[#00FFAF] md:px-4 px-2 py-2 rounded-md md:rounded-xl hover:scale-105 transition-all flex gap-2 items-center"
        >
          <BiPlus /> <span className="md:block hidden">Add Product</span>
        </button>
      ) : (
        <button
          onClick={() => {
            setModalContent(<Auth open={open} setOpen={setOpen} />);
            setOpen(true);
          }}
        >
          <CgProfile className="text-3xl text-gray-500" />
        </button>
      )}

      {/* modal Container */}
      <Modal open={open} setOpen={setOpen}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default Navbar;
