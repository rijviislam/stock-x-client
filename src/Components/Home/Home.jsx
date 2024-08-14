import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function Home() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5001/products`);
      return res.data;
    },
  });
  console.log(products);
  if (isLoading) return <h2 className="text3xl">Loading...</h2>;
  return (
    <div className="flex items-center flex-col justify-center">
      <h2 className="text-4xl">Stock x Products</h2>
      <div className="flex justify-between w-full px-16 ">
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>

        <div>
          <label htmlFor="my_modal_6" className="btn">
            Filter
          </label>

          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                  Brand Name
                </div>
                <div className="collapse-content">
                  <p>hello</p>
                </div>
              </div>
              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                  Category Name
                </div>
                <div className="collapse-content">
                  <p>hello</p>
                </div>
              </div>
              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                  Price Range
                </div>
                <div className="collapse-content">
                  <input
                    type="range"
                    min={0}
                    max="100"
                    value="40"
                    className="range range-xs"
                  />
                </div>
              </div>
              <div className="modal-action">
                <label htmlFor="my_modal_6" className="btn">
                  Close!
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 my-10">
        {products.slice(0, 10).map((product, idx) => (
          <div key={idx} className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title flex justify-between">
                {product.name}
                <div className="flex gap-2">
                  <div className="badge badge-secondary">{product.brand}</div>
                  <div className="badge badge-secondary">
                    {product.category}
                  </div>
                </div>
              </h2>
              <p>Sales: {product.sales}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">
                  Stocks: {product.stock}
                </div>
                <div className="badge badge-outline">
                  Price: {product.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
