import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Filter from "../../assets/setting.png";

export default function Home() {
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [checkedValues, setCheckedValues] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(3000);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortPriceOrder, setSortPriceOrder] = useState("lowToHigh");

  // FETCH THE PRODUCT //
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
    if (products?.result) {
      let filtered = products.result.slice();

      // BRAND FILTERING //
      if (checkedValues.length > 0) {
        filtered = filtered.filter((product) =>
          checkedValues.includes(product.brand)
        );
      }
      // CATEGORY FILTERING //
      if (selectedCategory) {
        filtered = filtered.filter(
          (product) => product.category === selectedCategory
        );
      }
      // PRICE RANGE FILTERING //
      if (priceRange !== 3000) {
        filtered = filtered.filter((product) => product.price <= priceRange);
      }

      //SORTING //
      if (sortPriceOrder === "lowToHigh") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortPriceOrder === "highToLow") {
        filtered.sort((a, b) => b.price - a.price);
      }

      // ONLY UPDATE FILTERDpRODUCT WHEN THE FILTERED ARRAY IS DIFFERENT //
      if (JSON.stringify(filtered) !== JSON.stringify(filteredProducts)) {
        setFilteredProducts(filtered);
      }
    }
  }, [
    products?.result,
    checkedValues,
    selectedCategory,
    priceRange,
    sortPriceOrder,
  ]);

  // SEARCH INPUT CHANGE
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // SEARCH EXECUTION //
  const handleSearch = () => {
    setSearchName(inputValue);
    setPage(1);
  };
  // SEARCH KEY PRESS //
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // BRAND FILTERING FUNCTION //
  const handleBrandFilter = (event) => {
    const { value, checked } = event.target;
    setCheckedValues((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
  };

  // CATEGORY FILTER FUNCTIONALITY //
  const handleCategoryFilter = (event) => {
    setSelectedCategory(event.target.value);
  };

  // PRICE RANGE FUNCTIONALITY //
  const handlePriceRange = (event) => {
    setPriceRange(Number(event.target.value));
  };

  // SORTING PRICE ORDER //
  const handleSortChange = (order) => {
    setSortPriceOrder(order);
    const sortedProducts = filteredProducts
      .slice()
      .sort((a, b) =>
        order === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    setFilteredProducts(sortedProducts);
  };

  // PAGINATION //
  const handlePrev = () => {
    setPage((p) => (p > 1 ? p - 1 : p));
  };

  const handleNext = () => {
    setPage((p) => (p < products?.pagination?.pageCount ? p + 1 : p));
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
          <div className="flex gap-5">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="w-[130px] flex h-[45px] items-center justify-between p-3 rounded-lg m-1 border border-teal-500 bg-white text-black text-sm"
              >
                Sort by Price
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <button
                    onClick={() => handleSortChange("lowToHigh")}
                    className={"block px-4 py-2 "}
                  >
                    Price Low to High
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSortChange("highToLow")}
                    className={"block px-4 py-2"}
                  >
                    Price High to Low
                  </button>
                </li>
              </ul>
            </div>
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
                      {checkboxData.map((name) => (
                        <div className="flex items-center" key={name}>
                          <input
                            className="checkbox checkbox-xs"
                            type="checkbox"
                            value={name}
                            checked={checkedValues.includes(name)}
                            onChange={handleBrandFilter}
                          />
                          <label className="ml-2">{name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="collapse collapse-plus">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-lg font-medium">
                    Category Name
                  </div>
                  <div className="collapse-content ">
                    <div>
                      {categoryData.map((category) => (
                        <div className="flex items-center" key={category}>
                          <input
                            className="radio radio-xs"
                            type="radio"
                            name="category"
                            value={category}
                            onChange={handleCategoryFilter}
                          />
                          <label className="ml-2">{category}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="collapse collapse-plus">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-lg font-medium">
                    Price Range
                  </div>
                  <div className="collapse-content">
                    <input
                      type="range"
                      min="3000"
                      max="100000"
                      value={priceRange}
                      onChange={handlePriceRange}
                      className="range"
                    />
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4">
          {filteredProducts?.map((product) => (
            <div
              className="bg-gray-100 p-4 rounded-lg shadow-md h-[350px]"
              key={product._id}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-4"
              />
              <h3 className="text-lg font-bold mb-2">{product.name}</h3>
              <p className="text-gray-600">Brand: {product.brand}</p>
              <p className="text-gray-600">Category: {product.category}</p>
              <p className="text-teal-500 font-bold mt-2">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 my-8">
        <button
          className="btn btn-sm"
          onClick={handlePrev}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {products?.pagination?.pageCount}
        </span>
        <button
          className="btn btn-sm"
          onClick={handleNext}
          disabled={page === products?.pagination?.pageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
}
