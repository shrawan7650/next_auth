import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import  jwt from 'jsonwebtoken';
import bcryptjs from "bcryptjs";
connect()
export async function POST(request: NextRequest){
  try{
   const reqBody = await request.json();
    const{email, password} =reqBody;
    console.log(reqBody);
 const user =  await  User.findOne({ email });
 

  
  const validPassword = bcryptjs.compare(password, user?.password)
  if(!validPassword){
    return NextResponse.json({
      message:"password does not match"
    })

  }
 

  const tokenData = {
    id : user?._id,
    username:user.username,
    email:user.email
  }

  const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})

const response = NextResponse.json({
message:"loggnd in succsfully",
succss:true
})

response.cookies.set("token",token,{
  httpOnly:true
})

return response;

  }catch(error:any){
    return NextResponse.json({
      error:error.message
    })
  }
}