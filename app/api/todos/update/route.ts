import { NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";
import { cookies } from "next/headers";
import { removeWhitespace } from "@/app/helpers/Utils";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { todoId, todoName } = data.requestData;
    const accessToken = cookies().get("access-token")?.value || false;

    if (!todoId || isNaN(todoId)) {
      return NextResponse.json({
        error: `Invalid Todo ID given.`,
      });
    }

    if (!todoName || removeWhitespace(todoName).length < 4) {
      return NextResponse.json({
        error: `Invalid new Todo Name given.\nEither too short or non existing.`,
      });
    }

    if (!accessToken || typeof accessToken !== "string") {
      return NextResponse.json({
        redirect: "register",
        isLogged: false,
      });
    }

    const userProfile = await prismadb.user.findFirst({
      where: {
        loginToken: `${accessToken}`,
      },
      include: {
        Todos: true,
      },
    });

    if (!userProfile) {
      return NextResponse.json({
        error: `No user was found.`,
      });
    }

    const todosLength: number = userProfile.Todos.length;

    if (todosLength <= 0) {
      return NextResponse.json({
        error: `You don't have any todos to update.`,
      });
    }

    let correctIndex: number = -1;

    for (let i = 0; i < userProfile.Todos.length; i++) {
      if (userProfile.Todos[i].todoId == todoId) {
        correctIndex = i;
        break;
      }
    }

    if (correctIndex === -1) {
      return NextResponse.json({
        error: `Invalid todo ID given.`,
      });
    }

    const todoToUpdate = userProfile.Todos[correctIndex];

    if (!todoToUpdate || !todoToUpdate.id) {
      return NextResponse.json({
        error: `Invalid todo ID given.`,
      });
    }

    const updatedTodo = await prismadb.todos.update({
      where: {
        id: todoToUpdate.id,
        authorId: userProfile.id,
      },
      data: {
        name: todoName,
      },
    });

    if (!updatedTodo) {
      return NextResponse.json({
        error: `No todo was found with the ID given.`,
      });
    }

    return NextResponse.json({
      updatedTodo,
      message: `Todo has been updated successfully. Refreshing for results.`,
      userProfile,
    });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      {
        error: `Error 505: Todo was not updated. Please try again later.`,
      },
      { status: 400 }
    );
  }
}
