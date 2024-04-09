import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function GET(request: NextRequest,response:NextResponse){
  try{


    const response = NextResponse.json({
      message:"Logout succssfully",
      success:true
    })
   
  

    response.cookies.delete("token");

    return response
  }catch(error:any){
    return NextResponse.json({
      error:error.message
    })
  }
}