import React, { useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";

interface SignupProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: any;
}

const Modal: React.FC<SignupProps> = ({ open, setOpen, children }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      className="z-[100] h-screen w-full fixed inset-0 top-auto left-auto flex items-center justify-center bg-[#00000098] overflow-y-hidden "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative shadow-lg w-[90%] mx-auto md:w-[70%] lg:w-[45%] bg-[#fff] flex flex-col gap-4 items-start  px-4 md:px-[3rem] animateopen py-[2rem] rounded-2xl min-h-fit h-[75vh]"
      >
        <button
          className="absolute right-2 top-2 p-2 rounded-full text-2xl"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <RxCrossCircled />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
