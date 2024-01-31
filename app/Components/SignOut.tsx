import React from "react";

export default function SignOut() {
  const signOut = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/signOut", {
        method: "GET",
      });

      window.location.href = "/login";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <button
        onClick={signOut}
        className="p-2 bg-red-500 rounded-md shadow-md text-white hover:translate-y-[-2px] duration-300"
      >
        Sign Out
      </button>
    </div>
  );
}
