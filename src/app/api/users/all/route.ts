"use server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

// Establish MongoDB connection
connect();

export async function GET(request: NextRequest) {
  try {
    // Parse request body as JSON
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    // console.log(id);
    // Check if ID is provided
    if (!id) {
      throw new Error("ID parameter is missing");
    }

    // Query the database for the user with the specified ID
    const user = await User.findById(id).select("-password");

    // Check if user exists
    if (!user) {
      return NextResponse.json({
        status: "error",
        message: "User not found",
      });
    }

    // Return user data
    return NextResponse.json({
      status: "success",
      user,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      error: error.message,
    });
  }
}
