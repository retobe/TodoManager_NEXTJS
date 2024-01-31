import { NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";
import { cookies } from "next/headers";
import { removeWhitespace } from "@/app/helpers/Utils";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { todoName } = data.requestData;

    if (
      !todoName ||
      typeof todoName != "string" ||
      removeWhitespace(todoName).length < 4
    ) {
      return NextResponse.json({
        error: `Todo must be a string & have a length greater than 4 characters.`,
      });
    }

    const accessToken = cookies().get("access-token")?.value || false;

    if (!accessToken || typeof accessToken != "string") {
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

    const nextTodoId: number =
      userProfile.Todos.length == 0
        ? 1
        : userProfile.Todos[userProfile.Todos.length - 1].todoId + 1;

    if (userProfile.Todos.length + 1 > 8) {
      return NextResponse.json({
        error: `Max todos reached. Please remove a todo.`,
      });
    }

    const newTodo = await prismadb.todos.create({
      data: {
        todoId: nextTodoId,
        name: todoName,
        timestamp: new Date(),
        author: { connect: { id: userProfile.id } },
      },
    });

    return NextResponse.json({
      newTodo,
      message: `New todo has been created!`,
      userProfile,
    });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      {
        error: `Error 505: Todo was not created. Please try again later.`,
      },
      { status: 400 }
    );
  }
}
