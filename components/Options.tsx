"use client";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "./Modal";
import { deleteProduct } from "@/utils/action";
import toast from "react-hot-toast";
import AddProduct from "./AddProduct";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

const Options = ({ data }: any) => {
  const [showMenu, setShowMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setShowMenu(false);
    setLoading(true);
    const response = await deleteProduct(data._id);
    setLoading(false);
    if (response?.error) {
      return toast.error(response?.error);
    }
    toast.success("Product deleted successfully");
    router.push("/");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div
      onClick={() => {
        setShowMenu(!showMenu);
      }}
      className="relative"
    >
      <button className="relative">
        <BsThreeDotsVertical />
      </button>
      {showMenu && (
        <div
          ref={menuRef}
          className="flex shadow-md text-sm rounded-md flex-col absolute bg-white border-[1px] z-[10] first:border-b-[1px] group right-[50%]"
        >
          <button
            onClick={() => {
              setShowMenu(false);
              setOpen(true);
            }}
            className="px-4 py-2 hover:bg-[#dfdfdf] rounded-md transition-all"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 hover:bg-[#dfdfdf] rounded-md transition-all"
          >
            Delete
          </button>
        </div>
      )}
      <Modal open={open} setOpen={setOpen}>
        <AddProduct open={open} setOpen={setOpen} initialData={data} />
      </Modal>
      <Loader loading={loading} />
    </div>
  );
};

export default Options;
