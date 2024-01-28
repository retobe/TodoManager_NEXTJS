"use client";
import React from "react";

let username = "@username";
let email = "example@gmail.com";
let userProfile: userProfile = {};

var headers = new Headers();
headers.append("Accept", "application/json");

interface userProfile {
  username?: string;
  email?: string;
  password?: string;
  loginToken?: string;
}

const handleUserInformation = async (dynamicUsername: string) => {
  if (dynamicUsername === "No username provided") {
    alert("Error trying to obtain the provided username.\nTry again");
    window.location.href = "/profile";
  }

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL + "/api/profile/" + dynamicUsername;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: headers,
    });

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
        errorMsg.textContent = `${data.error}`;
      }
    } else if (data) {
      userProfile = data;
      username = `${userProfile.username}`;
      email = `${userProfile.email}`;
      setUserInformation();
    }
  } catch (error) {
    console.error(`Error:`, error);
  }
};

const setUserInformation = () => {
  const usernameElement = document.querySelector("#username") as HTMLElement;
  const titleElement = document.querySelector("#title") as HTMLElement;
  const emailElement = document.querySelector("#email") as HTMLElement;

  if (usernameElement && emailElement) {
    titleElement.innerHTML = `${username}'s Profile`;
    titleElement.parentElement?.classList.remove("hidden");
    usernameElement.innerHTML = "Username: " + username;
    emailElement.innerHTML = "Email: " + email;
  } else {
    alert("Elements have been deleted");
    window.location.reload();
  }
};

interface dynamicInfo {
  dynamicUsername: string;
}

const DynamicProfile = ({ dynamicUsername }: dynamicInfo) => {
  handleUserInformation(dynamicUsername);
  return (
    <div>
      <div className="bg-slate-500 hidden text-white p-3 mx-auto max-w-[30rem] mt-3 w-[90%] rounded-lg shadow-md">
        <h1 id="title" className="text-xl text-center">
          Profile
        </h1>
        <div className="info w-full flex flex-col gap-3 p-4">
          <h1
            id="username"
            className="opacity-[.5] flex items-center justify-start gap-3"
          >
            Username:
          </h1>
          <h1
            id="email"
            className="opacity-[.5] flex items-center justify-start gap-3"
          >
            Email:
          </h1>
        </div>
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

export default DynamicProfile;
