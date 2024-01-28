"use client";
import { useEffect } from "react";
import TodosList from "../Components/TodosList";
import isLogged from "../Components/isLogged";

export default async function Home() {
  useEffect(() => {
    // Call isLogged when the component mounts
    isLogged();
  }, []);

  const inputStyles =
    "input outline-none border-b-2 bg-transparent shadow-lg text-black placeholder:text-black placeholder:opacity-[.5] placeholder:text-center";

  return (
    <div>
      <h1 className="text-center text-3xl mt-3">Todos Lists</h1>
      <TodosList></TodosList>
      <div className="container flex items-center justify-center bg-gray-300 mx-auto mt-2 p-3">
        <div className="delete bg-red-400 rounded-md flex flex-col justify-center items-center w-[90%] mx-auto shadow-md p-3 max-w-[500px] mt-2">
          <h1 className="text-2xl">Delete Todo</h1>
          <br />
          <form className="flex flex-col gap-3">
            <div id="todo-remove-id">
              <label htmlFor="todoID_remove">Todo ID: {""}</label>
              <input
                type="number"
                max={20}
                min={1}
                placeholder="Ex: 1"
                className={inputStyles + " border-red-500"}
                name="todoID_remove"
                id="todoID_remove"
              />
            </div>
            <input type="submit" value="Remove Todo Task" />
          </form>
        </div>
        <div className="create"></div>
        <div className="update"></div>
      </div>
    </div>
  );
}

// TODO: DO the fooking divs for update, create, and delete.
