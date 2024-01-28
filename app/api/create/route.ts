import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb"
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

export async function GET() {
   return NextResponse.json({
      token: `${randomUUID()}`
   })
}

export async function POST(request: Request) {
   try {   
      const data = await request.json();
      const {name} = data.requestData


      const existingTodo = await prismadb.todos.findFirst({
         where: {
            name: name
         }
      });

      if (existingTodo) {
         return NextResponse.json({error: `Todo already exists.`});
      }

      const todosLength = (await prismadb.todos.findMany()).length;

      const todoProfile = await prismadb.todos.create({ data: {
          todoId: todosLength + 1, 
          name,
          timestamp: new Date()

      }});

      return NextResponse.json({ message: "Todo created successfully", todoProfile });
   } catch (error) {
      console.error("Error: ", error);
      return NextResponse.json({
         error: `${error}`,
      }, { status: 400 });
   }
}