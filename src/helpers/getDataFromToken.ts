import { NextRequest, NextResponse } from "next/server";
import  jwt from 'jsonwebtoken';


export const getDataFromToken = (request:NextRequest)=>{
  try{
    const token =request.cookies.get("token")?.value||"";

   const decodeToken:any =  jwt.verify(token,process.env.TOKEN_SECRET!)
  //  console.log(decodeToken)
   return decodeToken.id
  }catch(err:any){
throw new Error(err.message)
  }
}