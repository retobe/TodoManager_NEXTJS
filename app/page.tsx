"use client";
import { useEffect } from "react";
import TodosList from "./Components/TodosList";
import isLogged from "./Components/isLogged";

export default async function Home() {
  useEffect(() => {
    isLogged();
  }, []);

  return (
    <div>
      <h1 className="text-center text-3xl mt-3">Todos Lists</h1>
      <TodosList></TodosList>
    </div>
  );
}
