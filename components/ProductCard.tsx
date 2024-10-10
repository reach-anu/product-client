import Image from "next/image";
import Link from "next/link";
import React from "react";
import Options from "./Options";
import { getCookie } from "@/utils/utils";

const ProductCard = async ({ data }: any) => {
  const token = await getCookie();
  return (
    <div className="relative">
      <Link href={`/product/${data._id}`}>
        <div className="shadow-lg w-fit p-4 rounded-md relative flex gap-3 flex-col">
          <Image
            src={`/download${Math.floor(Math.random() * 3) + 1 || "3"}.jpeg`}
            alt={data?.description || "No Description"}
            height={200}
            width={400}
            className="rounded-tr-md rounded-tl-md"
          />
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <p className="font-semibold">{data?.name}</p>
              <p className="text-sm text-gray-500">
                {data?.description || "No Description"}
              </p>
              <p className="font-semibold">
                $ <span>{data?.price}</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
      {token && (
        <div className="absolute bottom-2 right-2">
          <Options data={data} />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
