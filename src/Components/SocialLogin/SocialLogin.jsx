import React from "react";
import useAuth from "../../Hooks/useAuth";

export default function SocialLogin() {
  const { googleLogin } = useAuth();
  console.log(googleLogin);
  return (
    <>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => googleLogin()}
          aria-label="Log in with Google"
          className="p-3 rounded-sm"
        >
          <img
            className="w-8 h-8 object-contain rounded-full"
            src="https://i.ibb.co/7RTmkKr/download-19.jpg"
            alt=""
          />
        </button>
      </div>
    </>
  );
}
