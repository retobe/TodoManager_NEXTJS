import { NextResponse } from "next/server";
import prismadb from "../../../../../lib/prismadb";
import { cookies } from "next/headers";

export async function GET() {
  const accessToken = cookies().get("access-token")?.value || false;

  if (!accessToken || typeof accessToken != "string") {
    return;
  }

  const userProfile = await prismadb.user.findFirst({
    where: {
      loginToken: accessToken,
    },
    include: {
      Todos: true,
    },
  });

  if (!userProfile || userProfile.Todos.length == 0) {
    return NextResponse.json({
      error: `You don't have any more todos to delete.`,
    });
  }

  const removedTodos = await prismadb.todos.deleteMany({
    where: {
      authorId: userProfile.id,
    },
  });

  return NextResponse.json({
    success: true,
    message: `${removedTodos.count} Todos were removed from ${userProfile.username}`,
    removedTodos,
  });
}
