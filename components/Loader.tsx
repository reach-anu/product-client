import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ loading }: any) => {
  if (!loading) return null;
  return (
    <div className="h-screen w-screen bg-[#32303052] flex item-center justify-center fixed top-0 left-0 z-[200]">
      <ClipLoader
        color="00FFAF"
        loading={loading}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="m-auto"
      />
    </div>
  );
};

export default Loader;
