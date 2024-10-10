import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/utils/action";

export default async function Home() {
  const products = await getProducts();
  return (
    <div>
      <h3 className="font-semibold text-2xl my-2">Our Latest products</h3>
      <div className="flex gap-5 flex-wrap xl:justify-start justify-center">
        {products?.map((data: any, index: number) => (
          <ProductCard key={index} data={data} />
        ))}
      </div>
    </div>
  );
}
