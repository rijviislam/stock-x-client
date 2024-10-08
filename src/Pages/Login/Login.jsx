import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import useAuth from "../../Hooks/useAuth";

export default function Login() {
  const { loginUser, user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    loginUser(email, password)
      .then((res) => {
        reset();
        return res.user;
      })
      .catch(() => {
        console.log("error");
      });
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="flex w-full gap-5 items-center justify-center my-10 md:px-7 ">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-slate-300 text-gray-100">
        <h1 className="text-2xl font-bold text-center text-teal-600">
          Login Now!
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-6"
        >
          <div className="space-y-1 text-sm">
            <label
              htmlFor="email"
              className="block dark:text-teal-600 font-semibold"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50  text-black dark:text-gray-800 focus:border-violet-400 focus:dark:border-violet-600"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="space-y-1 text-sm">
            <label
              htmlFor="password"
              className="block dark:text-teal-600 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50  text-black dark:text-gray-800 focus:border-violet-400 focus:dark:border-violet-600"
              {...register("password", { required: true })}
            />
          </div>
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}
          <button className="block w-full p-3 text-center rounded-sm text-gray-900 dark:text-gray-50 bg-violet-400 dark:bg-teal-600">
            Login
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-700 dark:bg-gray-300"></div>
          <SocialLogin />
          <div className="flex-1 h-px sm:w-16 bg-gray-700 dark:bg-gray-300"></div>
        </div>
        <p className="text-xs text-center sm:px-6 text-gray-400 dark:text-gray-600">
          Don't have an account?
          <Link
            to="/register"
            rel="noopener noreferrer"
            href="#"
            className="underline  text-black dark:text-teal-600"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
