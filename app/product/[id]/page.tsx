import Options from "@/components/Options";
import { getProduct } from "@/utils/action";
import { getCookie } from "@/utils/utils";
import Image from "next/image";
import React from "react";

const page = async ({ params }: any) => {
  const token = await getCookie();
  const product = await getProduct(params.id);
  return (
    <div className="relative my-5">
      <div className="shadow-lg p-4 rounded-md relative flex gap-10 flex-wrap">
        <Image
          src="/download.jpeg"
          alt="car"
          height={700}
          width={500}
          className="rounded-tr-md rounded-tl-md"
        />
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-2xl">{product?.name}</p>
            <p className="text-md text-gray-500">
              {product?.description || "No Description"}
            </p>
            <p className="font-semibold text-2xl">
              $ <span>{product?.price}</span>
            </p>
          </div>
        </div>
      </div>
      {token && (
        <div className="absolute top-2 right-2 text-2xl">
          <Options data={product} />
        </div>
      )}
    </div>
  );
};

export default page;
