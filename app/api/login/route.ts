import { NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb"
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        cookies().delete("access-token");

       const data = await request.json();
 
       const { email, password} = data.requestData

       const newToken = `${randomUUID()}`;
 
 
       const existingUser = await prismadb.user.findFirst({
          where: {
             email: email,
             password: password
          }
       });

       
       if (!existingUser) {
           return NextResponse.json({error: `Invalid Email/Password`});
        }

        const updatedUser = await prismadb.user.update({
            where: {
                id: existingUser.id 
            },
            data: {
              loginToken: newToken
            }
          });
          
          if (updatedUser) {
            cookies().set("access-token", newToken);
            return NextResponse.json({ success: "User logged in successfully" });
          } else {
            return NextResponse.json({ error: "Failed to update loginToken" });
          }
    } catch (error) {
       console.error("Error: ", error);
       return NextResponse.json({
          error: `${error}`,
       }, { status: 400 });
    }
 }