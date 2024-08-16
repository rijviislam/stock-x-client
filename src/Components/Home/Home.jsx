import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Filter from "../../assets/setting.png";

export default function Home() {
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [checkedValues, setCheckedValues] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(3000);
  const [maxPrice, setMaxPrice] = useState(30000);

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

    if (products?.result) {
      setFilteredProducts(products.result);
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

  const handleBrandFilter = (event) => {
    const { value, checked } = event.target;
    let updatedCheckedValues;

    if (checked) {
      updatedCheckedValues = [...checkedValues, value];
    } else {
      updatedCheckedValues = checkedValues.filter((val) => val !== value);
    }
    setCheckedValues(updatedCheckedValues);

    applyFilters(updatedCheckedValues, minPrice, maxPrice);
  };

  const handleCategoryFilter = (event) => {
    const { value } = event.target;
    const filtered = products?.result?.filter((product) => {
      return product.category === value;
    });
    setFilteredProducts(filtered);
  };

  const handlePriceRangeChange = (event) => {
    const { name, value } = event.target;
    if (name === "minPrice") {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }

    applyFilters(
      checkedValues,
      value === "minPrice" ? value : minPrice,
      value === "maxPrice" ? value : maxPrice
    );
  };

  const applyFilters = (brands, min, max) => {
    let filtered = products?.result;

    if (brands.length) {
      filtered = filtered.filter((product) => brands.includes(product.brand));
    }

    if (min !== undefined && max !== undefined) {
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    setFilteredProducts(filtered);
  };

  const checkboxData = [
    "Nike",
    "Adidas",
    "Asics",
    "Levi's",
    "H&M",
    "Converse",
    "Vans",
    "Champion",
    "Gucci",
    "Fossil",
  ];

  const categoryData = ["Sneakers", "Accessories", "Shoes", "Apparel"];

  if (isLoading)
    return <span className="loading loading-bars loading-lg"></span>;
  if (isError) return <p>Error...</p>;
  return (
    <div className="my-5">
      <h2 className="text-3xl font-bold mb-4 lg:ml-8 ml-2">Stock x Products</h2>

      <div className="flex justify-between px-10">
        <div className="flex mx-4 my-5">
          <label className="input w-[400px] border-teal-500 flex items-center gap-2 bg-white text-black">
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
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="w-[100px] flex h-[45px] items-center justify-between p-3 rounded-lg m-1 border border-teal-500 bg-white text-black"
            >
              {" "}
              Filter <img className="w-5 h-5" src={Filter} alt="" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <div className="collapse collapse-plus ">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-lg font-medium">
                  Brand Name
                </div>
                <div className="collapse-content ">
                  <div>
                    {checkboxData.map((value) => (
                      <div
                        key={value}
                        className="font-semibold flex justify-between"
                      >
                        <input
                          type="checkbox"
                          value={value}
                          checked={checkedValues.includes(value)}
                          onChange={handleBrandFilter}
                        />
                        <label htmlFor={value}>{value}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="collapse collapse-plus ">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-lg font-medium">
                  Category Name
                </div>
                <div className="collapse-content">
                  {categoryData.map((value) => (
                    <div
                      key={value}
                      className="font-semibold flex justify-between"
                    >
                      <option
                        value={value}
                        className="cursor-pointer my-1 font-medium"
                        onClick={handleCategoryFilter}
                      >
                        {value}
                      </option>
                    </div>
                  ))}
                </div>
              </div>
              <div className="collapse collapse-plus ">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-lg font-medium">
                  Price Range
                </div>
                <div className="collapse-content">
                  <div className="flex flex-col">
                    <label>Min Price: ${minPrice}</label>
                    <input
                      type="range"
                      name="minPrice"
                      min={3000}
                      max={maxPrice}
                      value={minPrice}
                      className="range range-xs"
                      onChange={handlePriceRangeChange}
                    />
                    <label>Max Price: ${maxPrice}</label>
                    <input
                      type="range"
                      name="maxPrice"
                      min={minPrice}
                      max={30000}
                      value={maxPrice}
                      className="range range-xs"
                      onChange={handlePriceRangeChange}
                    />
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 lg:gap-5 md:gap-3 gap-2 mt-10 place-items-center my-5">
        {filteredProducts?.map((product) => (
          <div
            key={product._id}
            className="card lg:w-[300px] md:w-[280px] w-[260px] bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={product.image}
                alt={product.name}
                className="w-[250px] h-[250px]"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>Price: ${product.price}</p>
              <div className="card-actions justify-end">
                <button className="btn bg-teal-500 hover:bg-teal-600">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-5 my-8">
        <button
          onClick={handlePrev}
          className={`btn bg-teal-500 ${page <= 1 ? "cursor-not-allowed" : ""}`}
          disabled={page <= 1}
        >
          Previous
        </button>
        <p className="flex items-center text-xl font-bold text-teal-500">
          Page {page} of {pageCount}
        </p>
        <button
          onClick={handleNext}
          className={`btn bg-teal-500 ${
            page >= pageCount ? "cursor-not-allowed" : ""
          }`}
          disabled={page >= pageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
}
