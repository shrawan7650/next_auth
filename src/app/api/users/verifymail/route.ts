import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    // console.log("this is token" + token);
   
    const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}
    });
    // console.log("this is user",user)

if(!user){
  
  return NextResponse.json({
    message:"Invalid User",staus:401
  })
  
}
user.isVerfied=true;

user.verifyToken=undefined;
user.verifyTokenExpiry = undefined;
 await user.save();
return NextResponse.json(
  {message:"Email Verified Successfully!",
  user,
  succsse:true
})

  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: error,
    });
  }
}
