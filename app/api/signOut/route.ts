import { NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";
import { cookies } from "next/headers";

export async function GET() {
  const accessToken = cookies().get("access-token")?.value || false;

  if (!accessToken || typeof accessToken != "string") {
    return;
  }

  cookies().delete("access-token");
  return NextResponse.json({
    success: true,
  });
}
