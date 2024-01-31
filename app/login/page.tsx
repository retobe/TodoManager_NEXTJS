"use client";

import React from "react";
import LoginForm from "../Components/Login/LoginForm";
import isLogged from "../Components/isLogged";

const page = () => {
  React.useEffect(() => {
    isLogged();
  }, []);

  return (
    <div className="absolute w-full h-full bg-gradient-to-t from-teal-400 to-teal-600">
      <div>
        <h1 className="text-3xl animate-slideDown text-center mt-2 text-white z-50">
          Sign In Page
        </h1>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
};

export default page;
