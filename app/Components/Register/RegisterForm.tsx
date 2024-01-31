"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";

var headers = new Headers();
headers.append("Accept", "application/json");

const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const requestData = {
    username: formData.get("username")?.toString().replace(/\s/g, ""),
    email: formData.get("email")?.toString().replace(/\s/g, ""),
    password: formData.get("password")?.toString().replace(/\s/g, ""),
  };

  try {
    const response = await fetch(`/api/register`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ requestData }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.error) {
        const errorMsg = document.querySelector(
          "#errorMsg"
        ) as HTMLHeadingElement;
        const errorDiv = document.querySelector(
          "#errorElement"
        ) as HTMLDivElement;
        if (errorDiv) {
          errorDiv.classList.remove("hidden");
          errorDiv.classList.add("flex");
          errorMsg.innerHTML = `${data.error}`;
        }
      } else {
        window.location.href = "/profile";
      }
    } else {
      console.error("Error submitting form:", response.statusText);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

const RegisterForm = () => {
  const handlePasswordChange = () => {
    const passwordInput = document.querySelector(
      "#password"
    ) as HTMLInputElement | null;
    const checkboxElement = document.querySelector(
      "#passwordShow"
    ) as HTMLInputElement | null;
    if (passwordInput && checkboxElement) {
      if (checkboxElement.checked === true) {
        setPasswordType("text");
      } else {
        setPasswordType("password");
      }
    }
  };

  const [passwordType, setPasswordType] = useState("password");

  return (
    <div className="absolute bg-slate-300 w-full h-full">
      <form
        onSubmit={handleSubmitForm}
        className="form flex flex-col gap-4 mx-auto w-[90%] items-center mt-3 max-w-[25rem] bg-slate-600 p-4 rounded-lg shadow-md"
      >
        <h1 id="header" className="text-3xl text-white">
          User Registeration
        </h1>
        <div className="inputs flex flex-col gap-3 w-full p-3 mx-auto">
          <div className="username flex items-center justify-between gap-3 w-full">
            <label
              htmlFor="username"
              className="max-w-[10rem] text-white text-xl"
            >
              Username:{" "}
            </label>
            <input
              type="text"
              name="username"
              id="username"
              minLength={4}
              maxLength={15}
              placeholder="Username"
              className="px-3 py-1 outline-none rounded-lg shadow-md focus:placeholder:text-transparent overflow-auto sm:max-w-[15rem] max-w-[10rem]"
            />
          </div>
          <div className="email flex items-center justify-between gap-3 w-full">
            <label htmlFor="email" className="max-w-[10rem] text-white text-xl">
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
              type={passwordType}
              name="password"
              minLength={8}
              maxLength={30}
              id="password"
              placeholder="Password"
              className="px-3 py-1 outline-none rounded-lg shadow-md focus:placeholder:text-transparent overflow-auto sm:max-w-[15rem] max-w-[10rem]"
            />
          </div>
          <div className="opacity-[.7] text-sm flex gap-3 items-center justify-end">
            <label htmlFor="passwordShow">Show Password: </label>
            <input
              onChange={handlePasswordChange}
              type="checkbox"
              name="passwordShow"
              id="passwordShow"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <input
            type="submit"
            value="Submit Form"
            className="px-3 mt-3 py-1 shadow rounded-lg text-white bg-slate-700 cursor-pointer hover:translate-y-[-2px] duration-300"
          />
          <Link
            className="px-3 mt-3 py-1 shadow rounded-lg text-white bg-slate-500 cursor-pointer hover:translate-y-[-2px] duration-300"
            href="/login"
          >
            Sign In
          </Link>
        </div>
      </form>
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

export default RegisterForm;
