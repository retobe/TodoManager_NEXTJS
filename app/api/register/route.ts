import prismadb from "../../../lib/prismadb";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import {
  removeWhitespace,
  isLoginTokenUnique,
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/app/helpers/Utils";

export async function GET() {
  return NextResponse.json({
    token: `${randomUUID()}`,
  });
}

export async function POST(request: Request) {
  try {
    cookies().delete("access-token");

    const data = await request.json();

    let { username, email, password, avatar } = data.requestData;

    console.log(data.requestData);

    username = removeWhitespace(username.toLowerCase());
    email = removeWhitespace(email);
    password = removeWhitespace(password);

    if (!username || !email || !password) {
      return NextResponse.json({
        error: `No credentials were provided.`,
      });
    }

    const existingUser = await prismadb.user.findFirst({
      where: {
        OR: [
          {
            email: email,
          },
          {
            username: username,
          },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json({
        error: `Already existing username and/or email.`,
      });
    }

    /**
     * Server side credentials check
     */

    var loginToken = `${randomUUID()}`;

    let isTokenUnique = await isLoginTokenUnique(loginToken);

    while (!isTokenUnique) {
      loginToken = `${randomUUID()}`;
      isTokenUnique = await isLoginTokenUnique(loginToken);
    }

    let errorMessages = [];

    if (!validateUsername(username)) {
      errorMessages.push(
        "Username must be over 3 and less than or equal to 20 characters."
      );
    }

    if (!validatePassword(password)) {
      errorMessages.push(
        "Password must be over 8 and less than 40 characters, and include at least 1 symbol, 1 capital letter, and 1 lowercase letter."
      );
    }

    if (!validateEmail(email)) {
      errorMessages.push("Email must be a valid email address.");
    }

    if (errorMessages.length > 0) {
      return NextResponse.json({
        error: errorMessages.join("\n"),
      });
    }

    /**
     * Everything is valid and succesfully
     */

    const userProfile = await prismadb.user.create({
      data: {
        username,
        email,
        password,
        avatar: `${avatar}`,
        loginToken: loginToken,
      },
    });

    cookies().set("access-token", loginToken); // set the sessiontoken to the user's cookies
    return NextResponse.json({
      message: "User created successfully",
      userProfile,
    });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      {
        error: `${error}`,
      },
      { status: 400 }
    );
  }
}
