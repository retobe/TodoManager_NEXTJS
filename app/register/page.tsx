"use client";
import React from "react";
import RegisterForm from "../Components/Register/RegisterForm";
import isLogged from "../Components/isLogged";

const page = () => {
  React.useEffect(() => {
    isLogged();
  }, []);

  return (
    <div>
      <RegisterForm></RegisterForm>
    </div>
  );
};

export default page;
