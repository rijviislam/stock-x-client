import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import useAuth from "../../Hooks/useAuth";

export default function Navbar() {
  const { user, logOutUser } = useAuth();
  console.log(user);
  const navbar = (
    <>
      <li className="text-sm font-semibold">
        <Link to="/">Home</Link>
      </li>
      <li className="text-sm font-semibold">
        <Link to="/about">About</Link>
      </li>
      <li className="text-sm font-semibold">
        <Link to="/contact">Contact</Link>
      </li>
      <li className="text-sm font-semibold">
        <Link to="/help">Help</Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 my-3">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navbar}
          </ul>
        </div>
        <Link to="/">
          <img className="w-10 h-10 rounded-full mr-3" alt="" src={Logo} />
        </Link>
        <a className="font-bold text-sm lg:text-xl ml-1">Stock-X</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navbar}</ul>
      </div>

      <div className="navbar-end">
        {!user ? (
          <div className="flex gap-1 lg:gap-3">
            <Link to="/login">
              <button className="btn btn-sm text-white  btn-primary">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="btn btn-sm text-white  btn-primary">
                Register
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-1 lg:gap-5 items-center justify-center">
            <div className="w-10 h-10  overflow-hidden rounded-full">
              <img
                className="w-full h-full object-cover"
                src={user?.photoURL || "https://i.ibb.co/HGCGmV3/OIP.jpg"}
              />
            </div>
            <button
              onClick={logOutUser}
              className="btn btn-sm text-white bg-red-500 border border-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
