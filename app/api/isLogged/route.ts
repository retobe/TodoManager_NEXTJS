import { NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";
import { cookies } from "next/headers";

export async function GET() {
  const accessToken = cookies().get("access-token")?.value || false;

  if (!accessToken || typeof accessToken != "string") {
    return NextResponse.json({
      redirect: "register",
      token: accessToken,
      isLogged: false,
    });
  }

  const userProfile = await prismadb.user.findFirst({
    where: {
      loginToken: `${accessToken}`,
    },
  });

  if (!userProfile) {
    return NextResponse.json({
      redirect: "register",
      isLogged: false,
    });
  }

  if (userProfile) {
    return NextResponse.json({
      redirect: "/",
      isLogged: true,
    });
  }
}
