"use client";
import React, { FormEvent } from "react";
import Link from "next/link";
const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);

  const requestData = {
    email: formData.get("email")?.toString().replace(/\s/g, ""),
    password: formData.get("password")?.toString().replace(/\s/g, ""),
  };

  try {
    const response = await fetch("api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ requestData }),
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = "/profile";
    } else if (data.error) {
      const errorMsg = document.querySelector(
        "#errorMsg"
      ) as HTMLHeadingElement;
      const errorDiv = document.querySelector(
        "#errorElement"
      ) as HTMLDivElement;
      if (errorDiv) {
        errorDiv.classList.remove("hidden");
        errorDiv.classList.add("flex");
        errorMsg.textContent = `${data.error}`;
      }
    }

    console.log(data);
  } catch (error) {
    console.error(`Error: ${error}`);
    alert(`Failed to submit form`);
    debugger;
    window.location.reload();
  }
};

const LoginForm = () => {
  return (
    <div>
      <div className="mt-3 w-[90%] max-w-[25rem] mx-auto">
        <form
          onSubmit={handleSubmitForm}
          className="p-3 bg-gradient-to-t from-teal-400 to-teal-500 rounded-lg shadow-md flex flex-col items-center justify-start"
        >
          <div className="inputs flex flex-col gap-3 w-full p-3 mx-auto">
            <div className="email flex items-center justify-between gap-3 w-full">
              <label
                htmlFor="email"
                className="max-w-[10rem] text-white text-xl"
              >
                Email:{" "}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="px-3 py-1 outline-none rounded-lg shadow-md focus:placeholder:text-transparent overflow-auto sm:max-w-[15rem] max-w-[10rem]"
              />
            </div>
            <div className="password flex items-center justify-between gap-3 w-full">
              <label
                htmlFor="password"
                className="max-w-[10rem] text-white text-xl"
              >
                Password:{" "}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="px-3 py-1 outline-none rounded-lg shadow-md focus:placeholder:text-transparent overflow-auto sm:max-w-[15rem] max-w-[10rem]"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <input
              type="submit"
              value="Submit Form"
              className="px-3 mt-3 py-1 shadow rounded-lg text-white bg-teal-700 cursor-pointer hover:translate-y-[-2px] duration-300"
            />
            <Link
              className="px-3 mt-3 py-1 shadow rounded-lg text-white bg-teal-500 cursor-pointer hover:translate-y-[-2px] duration-300"
              href="/register"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
      <div
        id="errorElement"
        className="error animate-slideDown hidden text-center mx-auto flex-col gap-2 p-3 bg-gradient-to-r from-red-400 to-red-600 w-1/2 text-white rounded-lg shadow mt-5"
      >
        <h1 id="errorMsg" className="text-xl text-center"></h1>
        <h1>Please try again!</h1>
      </div>
    </div>
  );
};

export default LoginForm;
