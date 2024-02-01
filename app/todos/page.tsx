"use client";
import { FormEvent, useState, useEffect, ChangeEvent } from "react";
import TodosList from "../Components/TodosList";
import isLogged from "../Components/isLogged";
import RemoveAllTodos from "../Components/RemoveAllTodos";
import EnableAlerts from "../Components/EnableAlerts";

export default async function Home() {
  const createTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const createBtn = document.querySelector(
      "#createBtn"
    ) as HTMLInputElement | null;
    if (createBtn) {
      createBtn.disabled = true;
    }

    const formData = new FormData(event.target as HTMLFormElement);
    const requestData = {
      todoName: formData.get("todoName_create"),
    };

    try {
      const res = await fetch("api/todos/create", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({ requestData }),
      });

      const data = await res.json();

      if (data.error) {
        alert(`${data.error}`);
        return;
      }

      if (
        localStorage.getItem("alerts") === "true" ||
        localStorage.getItem("alerts") == null
      ) {
        alert("Success! Refreshing for results.");
      }
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const requestData = {
      todoId: formData.get("todoID_remove"),
    };

    try {
      const res = await fetch("api/todos/remove", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({ requestData }),
      });

      const data = await res.json();

      if (data.error) {
        alert(`${data.error}`);
        return;
      }

      if (
        localStorage.getItem("alerts") === "true" ||
        localStorage.getItem("alerts") == null
      ) {
        alert("Success! I have removed Todo ID: " + requestData.todoId + ".");
      }
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const updateTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const requestData = {
      todoId: formData.get("todoID_update"),
      todoName: formData.get("todoName_update"),
    };

    try {
      const res = await fetch("api/todos/update", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({ requestData }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
      }

      if (
        localStorage.getItem("alerts") === "true" ||
        localStorage.getItem("alerts") == null
      ) {
        if (data.message) {
          alert(data.message);
        }
      }
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    isLogged();
  }, []);

  const inputStyles =
    "input outline-none border-b-2 bg-transparent shadow-lg text-black placeholder:text-black placeholder:opacity-[.5] placeholder:text-center ";

  const buttonStyles =
    "cursor-pointer p-2 rounded-md shadow-md text-white hover:translate-y-[-2px] duration-300 ";

  const subContainerStyles =
    "rounded-md flex flex-col justify-center items-center w-[90%] mx-auto shadow-md p-3 max-w-[500px] mt-2 ";

  return (
    <div className="absolute w-full h-[110%] min-h-full text-white">
      <div className="settings text-black p-2">
        <EnableAlerts></EnableAlerts>
      </div>
      <div className="mt-2"></div>
      <TodosList></TodosList>
      <div className="container flex flex-wrap gap-4 items-center justify-center mx-auto mt-2 p-3">
        <div className={subContainerStyles + "create bg-green-400"}>
          <h1 className="text-2xl">Create Todo</h1>
          <br />
          <form onSubmit={createTodo} className="flex flex-col gap-3">
            <div id="todo-create-name">
              <input
                type="text"
                placeholder="Todo Name"
                className={inputStyles + "border-green-600"}
                name="todoName_create"
                id="todoName_create"
              />
            </div>

            <input
              type="submit"
              id="createBtn"
              value="Create Todo Task"
              className={buttonStyles + "bg-green-600"}
            />
          </form>
        </div>
        <div className={subContainerStyles + "delete bg-red-400"}>
          <h1 className="text-2xl">Delete Todo</h1>
          <br />
          <form onSubmit={deleteTodo} className="flex flex-col gap-3">
            <div id="todo-remove-id" className="mx-auto">
              <label htmlFor="todoID_remove">Todo ID: {""}</label>
              <input
                type="number"
                min={1}
                placeholder="Ex: 1"
                className={inputStyles + "border-red-500"}
                name="todoID_remove"
                id="todoID_remove"
              />
            </div>
            <div className="buttons flex gap-3">
              <input
                type="submit"
                value="Remove Todo Task"
                className={buttonStyles + "bg-red-600"}
              />
              <RemoveAllTodos
                classes={buttonStyles + "bg-red-600"}
              ></RemoveAllTodos>
            </div>
          </form>
        </div>
        <div className={subContainerStyles + "update bg-blue-400"}>
          <h1 className="text-2xl">Update Todo</h1>
          <br />
          <form onSubmit={updateTodo} className="flex flex-col gap-3">
            <div id="todo-update-id">
              <input
                type="number"
                placeholder="Todo ID To Change"
                min={1}
                className={inputStyles + "border-blue-600"}
                name="todoID_update"
                id="todoID_update"
              />
            </div>
            <input
              type="text"
              maxLength={50}
              minLength={4}
              placeholder="New Todo Name"
              className={inputStyles + "border-blue-600"}
              name="todoName_update"
              id="todoName_update"
            />
            <input
              type="submit"
              value="Update Todo Task"
              className={buttonStyles + "bg-blue-600"}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
