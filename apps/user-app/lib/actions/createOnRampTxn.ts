"use server"
import {db} from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";


export async function createOnRampTransaction(provider:string,amount:number) {
const token=Math.random().toString();
  const session =await getServerSession(authOptions);
  const userId=session?.user?.id;
  if(!userId){
    return {
        message: "You are not logged in"
    }
  }
  await db.onRampTransaction.create({
    data:{
        userId:parseInt(userId),provider:provider,amount:amount,
        status:"Processing",
        startTime:new Date(),
        token
    }})

    return {
        message:"onRampTransaction added"
    }
}