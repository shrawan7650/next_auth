import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request:NextRequest) {
 const userId = await getDataFromToken(request)
//  console.log("User ID : ",userId);
  try {
    const user = await User.findOne({_id:userId}).select("-password");

    return NextResponse.json({
      status: "success",
      user,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
