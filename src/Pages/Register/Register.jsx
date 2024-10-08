import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

export default function Register() {
  const { createUser, updateImageAndName, setReload } = useAuth();
  const [regError, setRegError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, password, image } = data;
    setRegError("");

    createUser(email, password)
      .then(() => {
        updateImageAndName(name, image).then(() => {
          setReload(true);
        });
        navigate("/");
        reset();
      })

      .catch((error) => {
        setRegError(error.message);
        if (regError) {
          alert("Register Failed!!!");
        }
      });
  };

  return (
    <div className="flex w-full gap-5 items-center justify-center my-10 md:px-7 ">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-slate-300 text-gray-100">
        <h1 className="text-2xl font-bold text-teal-600 text-center">
          Register Now!
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-6"
        >
          <div className="space-y-1 text-sm">
            <label
              htmlFor="name"
              className="block dark:text-teal-600 font-semibold "
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-black   focus:border-violet-400 focus:dark:border-violet-600"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <label
              htmlFor="email"
              className="block  dark:text-teal-600 font-semibold  "
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-teal-700   focus:border-violet-400 focus:dark:border-violet-600"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <label
              htmlFor="imageurl"
              className="block  dark:text-teal-600 font-semibold  "
            >
              Image
            </label>
            <input
              type="imageurl"
              name="imageurl"
              id="imageurl"
              placeholder="Enter a Image URL"
              className="w-full px-4 py-3 rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-black  focus:border-violet-400 focus:dark:border-violet-600"
              {...register("image", { required: true })}
            />
          </div>
          <div className="space-y-1 text-sm">
            <label
              htmlFor="password"
              className="block  dark:text-teal-600 font-semibold  "
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md text-black border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50  focus:border-violet-400 focus:dark:border-violet-600"
              {...register("password", { required: true })}
            />
          </div>
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}
          <button className="block  w-full p-3 text-center rounded-sm text-gray-900 dark:text-gray-50 bvioletg--400 dark:bg-teal-600">
            Register
          </button>
        </form>

        <p className="text-xs text-center sm:px-6 text-gray-400 dark:text-gray-600 pt-5">
          Have an account?
          <Link
            to="/login"
            rel="noopener noreferrer"
            href="#"
            className="underline  text-black dark:text-teal-600 "
          >
            Login up
          </Link>
        </p>
      </div>
    </div>
  );
}
