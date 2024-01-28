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

    if (data.token) {
      return (window.location.href = data.redirect);
    }

    const profilePages = ["register", "login"];

    if (
      profilePages.some((x) => `${data.redirect}`.includes(x)) &&
      !profilePages.some((x) => `${window.location.href}`.includes(x))
    ) {
      return (window.location.href = data.redirect);
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export default isLogged;
