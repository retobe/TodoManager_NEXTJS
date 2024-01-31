"use client";
import React from "react";
import ProfileDiv from "../Components/Profile/ProfileDiv";
import isLogged from "../Components/isLogged";
import SignOut from "../Components/SignOut";
const page = () => {
  React.useEffect(() => {
    // Call isLogged when the component mounts
    isLogged();
  }, []);
  return (
    <div className="bg-slate-300 absolute w-full h-full">
      <h1 className="text-3xl text-center mt-2">Profile PAGE!</h1>
      <ProfileDiv />
      <div className="w-full flex mx-auto items-center justify-center mt-2">
        <SignOut></SignOut>
      </div>
    </div>
  );
};

export default page;
