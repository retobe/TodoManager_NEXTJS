import React from "react";
import moment from "moment";

interface Todo {
  id: number;
  name: String;
  date: Date;
}

export default function TodoCard({ id, name, date }: Todo) {
  return (
    <div className="card shadow-lg p-2 max-w-max rounded-lg">
      <h1 className="text-lg">{name}</h1>
      <footer className="opacity-[.6] mt-2">
        {moment(date).format("LLLL")}
      </footer>
    </div>
  );
}
