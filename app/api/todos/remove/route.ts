import { NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { todoId } = data.requestData;
    const accessToken = cookies().get("access-token")?.value || false;

    if (!todoId || isNaN(todoId)) {
      return NextResponse.json({
        error: `Invalid Todo ID given.`,
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
        error: `You don't have any more todos to delete.`,
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

    const todoToRemove = userProfile.Todos[correctIndex];

    if (!todoToRemove || !todoToRemove.id) {
      return NextResponse.json({
        error: `Invalid todo ID given.`,
      });
    }

    const removedTodo = await prismadb.todos.delete({
      where: {
        id: todoToRemove.id,
        authorId: userProfile.id,
      },
    });

    if (!removedTodo) {
      return NextResponse.json({
        error: `No todo was found with the ID given.`,
      });
    }

    return NextResponse.json({
      removedTodo,
      message: `A todo has been removed.`,
      userProfile,
    });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      {
        error: `Error 505: Todo was not removed. Please try again later.`,
      },
      { status: 400 }
    );
  }
}
