import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [pageCount, setPageCount] = useState(0);

  const {
    data: products = { result: [], pagination: { pageCount: 0 } },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", page, searchName],
    queryFn: async ({ queryKey }) => {
      const [_key, page, searchName] = queryKey;
      const res = await axios.get(
        `http://localhost:5001/products?page=${page}&name=${searchName}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    if (products?.pagination) {
      setPageCount(products.pagination.pageCount);
    }
  }, [products]);

  const handlePrev = () => {
    setPage((p) => (p > 1 ? p - 1 : p));
  };

  const handleNext = () => {
    setPage((p) => (p < pageCount ? p + 1 : p));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    setSearchName(inputValue);
    setPage(1);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  console.log(products);
  if (isLoading)
    return <span className="loading loading-bars loading-lg"></span>;
  if (isError) return <p>Error...</p>;

  return (
    <div className="my-5">
      <h2 className="text-3xl font-bold mb-4 lg:ml-8 ml-2">Stock x Products</h2>

      <div className="flex justify-between px-10">
        <div className="flex mx-4 my-5">
          <label className="input w-[400px] border-teal-500 flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search by name"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70 text-teal-500"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 lg:gap-5 md:gap-3 gap-2 mt-10 place-items-center my-5">
        {products?.result?.map((product) => (
          <div
            key={product._id}
            className="card card-compact lg:w-[350px] bg-base-100 shadow-xl border-y-2 border-teal-600 h-[400px]"
          >
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
      <div className="flex justify-center items-center mt-5 gap-2">
        <button
          disabled={page === 1}
          className="btn btn-sm bg-teal-800"
          onClick={handlePrev}
        >
          Prev
        </button>
        <span className="text-teal-600 font-semibold">
          Page {page} of {pageCount}
        </span>
        <button
          disabled={page === pageCount}
          className="btn btn-sm bg-teal-800"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
