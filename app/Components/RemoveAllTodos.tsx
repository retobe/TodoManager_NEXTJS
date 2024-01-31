"use client";
import React from "react";

interface idek {
  classes?: string;
}

const RemoveAllTodos = ({ classes }: idek) => {
  const removeTodos = async () => {
    try {
      const res = await fetch("/api/todos/remove/all", {
        method: "GET",
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
      }

      if (data.success) {
        alert(data.message);
      }

      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={classes} onClick={removeTodos}>
      Remove All Todos
    </div>
  );
};

export default RemoveAllTodos;
