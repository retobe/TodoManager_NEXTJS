"use client";
import React, { useEffect, useState } from "react";

let username = "@username";
let email = "example@gmail.com";
let password = "**********";
let userProfile: userProfile = {};
let showPassword = false;

interface userProfile {
  username?: string;
  email?: string;
  password?: string;
  loginToken?: string;
}

const handleUserInformation = async () => {
  try {
    const response = await fetch("api/profile", {
      method: "GET",
    });

    const data = await response.json();

    if (data.redirect) {
      return (window.location.href = data.redirect);
    } else if (data) {
      userProfile = data.userProfile;
      username = `${userProfile.username}`;
      email = `${userProfile.email}`;
      password = `${userProfile.password}`;
      setUserInformation();
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

const setUserInformation = () => {
  const usernameElement = document.querySelector("#username") as HTMLElement;
  const titleElement = document.querySelector("#title") as HTMLElement;
  const emailElement = document.querySelector("#email") as HTMLElement;
  const passwordElement = document.querySelector("#password") as HTMLElement;

  if (usernameElement && emailElement && passwordElement) {
    titleElement.innerHTML = `${username}'s Profile`;
    usernameElement.innerHTML = "Username: " + username;
    emailElement.innerHTML = "Email: " + email;
    passwordElement.innerHTML = showPassword ? password : "**********";
  } else {
    alert("Elements have been deleted");
    window.location.reload();
  }
};

handleUserInformation();

const ProfileDiv = () => {
  const handlePasswordChange = () => {
    const checkBox = document.querySelector(
      "#passwordShow"
    ) as HTMLInputElement;
    if (!checkBox) return;

    const passwordSpan = document.querySelector("#password");

    if (passwordSpan) {
      if (checkBox.checked) {
        passwordSpan.innerHTML = `${password}`;
      } else {
        passwordSpan.innerHTML = `**********`;
      }
    }
  };

  return (
    <div className="bg-slate-500 text-white p-3 mx-auto max-w-[30rem] mt-3 w-[90%] rounded-lg shadow-md">
      <h1 id="title" className="text-xl text-center">
        {username != "@username" ? username : "<Username>'s"} Profile
      </h1>
      <div className="info w-full flex flex-col gap-3 p-4">
        <h1
          id="username"
          className="opacity-[.5] flex items-center justify-start gap-3"
        >
          Username: {username}
        </h1>
        <h1
          id="email"
          className="opacity-[.5] flex items-center justify-start gap-3"
        >
          Email: {email}
        </h1>
        <div>
          <h1
            id="passwordDiv"
            className="opacity-[.5] flex items-center justify-start gap-3"
          >
            Password: <span id="password">{password}</span>
          </h1>
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
      </div>
    </div>
  );
};

export default ProfileDiv;
