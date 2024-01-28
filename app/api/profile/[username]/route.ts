import { NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function GET(request: Request, context: any) {
  try {
    const { params } = context;

    const userProfile = await prismadb.user.findFirst({
      where: {
        username: params.username,
      },
    });

    if (!userProfile) {
      return NextResponse.json({
        error: `No profile has been found with this username <${params.username}>`,
      });
    }

    return NextResponse.json({
      username: userProfile.username,
      email: userProfile.email,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
