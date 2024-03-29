import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";

interface TodosArray {
  id: string;
  todoId: number;
  name: string;
  user: object[];
  timestamp: Date;
}

export default function TodosList() {
  const [todos, setTodos] = useState<TodosArray[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/todos", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.isLogged === false) {
          return (window.location.href = data.redirect);
        }

        if (data.todos) {
          setTodos(data.todos);
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    getTodos();
  }, []);

  return (
    <div className="shadow-lg bg-gradient-to-b from-slate-400 to-slate-200 mx-auto w-[90%] max-w-[500px] p-3 rounded-md">
      <h1 className="text-2xl text-center">Todos List</h1>
      <ol className="list-decimal px-5 flex flex-col gap-2">
        {todos.length != 0 ? (
          todos.map((todo) => (
            <TodoCard
              key={todo.todoId}
              id={todo.todoId}
              name={todo.name}
              date={new Date(todo.timestamp)}
            />
          ))
        ) : (
          <h1 className="text-black text-center text-xl">No Todos were found.</h1>
        )}
      </ol>
      <br />
      <footer className="opacity-[.50] text-black font-bold">
        Total Tasks: {todos.length}
      </footer>
    </div>
  );
}
