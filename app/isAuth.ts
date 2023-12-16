/**
 * Checks if the user is authenticated and returns
 * a success or unauthorized response.
 *
 * Checks for an active session using getServerSession()
 * and returns a 401 unauthorized response if no session exists.
 *
 * Otherwise, returns a 200 success response.
 */
"use server";

import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: Request, res: Response) {
  const session = await getServerSession();
  if (!session) {
    NextResponse.json({ message: "You must be logged in." }, { status: 401 });
    return;
  }
  return NextResponse.json({ message: "Success" }, { status: 200 });
}
