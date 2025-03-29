"use server"
import {db} from "@repo/db/client";
import {getServerSession} from "next-auth"
import { AuthOptions } from "next-auth";
import { authOptions } from "../auth";

export async function p2pTransfer(to:string,amount:string)
{
    const session =await getServerSession(authOptions);
    const from =session?.user?.id;
    if(!from)
    {
        return {
            message:"Error while Sending"
        }
    }
    const toUser=await db.user.findFirst(
        {
            where:{
                number:to
            }
        }
    )
    if(!toUser)
    {
        return {
            message:"user not found"
        }
    }

    await db.$transaction(async (tx)=>{
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
        const frombalance=await tx.balance.findFirst({
            where:{
                userId:Number(from)
            }
        });
        await new Promise(resolve=>setTimeout(resolve,4000))
        if(!frombalance||frombalance.amount<Number(amount))
        {
           
                throw new Error('Insufficient funds')
            
        }

        await tx.balance.update({
            where:{
                userId:Number(from)
            },
            data:{
                amount:{
                    decrement:Number(amount)*100
                }
            }

        })

        await tx.balance.update({
            where:{userId:toUser.id},
            data:{
                amount:{
                    increment:Number(amount)*100
                }
            }
        })

        await tx.p2pTransfer.create({
            data:{
                fromUserId:Number(from),
                toUserId:toUser.id,
                amount:Number(amount)*100,
                timestamp:new Date()
            }
        })

    })

}