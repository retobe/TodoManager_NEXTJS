"use client";

const isLogged = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/isLogged`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const profilePages = ["register", "login"];

    if (
      data.isLogged === true && // if user is logged in
      profilePages.some((x) => `${window.location.href}`.includes(x)) // if the user is in register or login page
    ) {
      return (window.location.href = "/profile");
    }

    if (
      profilePages.some((x) => `${data.redirect}`.includes(x)) && // If the data.redirect equals to "register" | "login"
      !profilePages.some((x) => `${window.location.href}`.includes(x)) // if the page is not register or login
    ) {
      return (window.location.href = data.redirect);
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export default isLogged;
