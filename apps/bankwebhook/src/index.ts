import express from "express";
import {db} from "@repo/db/client";

const app=express();
app.use(express.json());
app.post("/hdfcwebhook",async(req, res) => {

    const paymentInformation={
        token:req.body.token,
        userId:req.body.user_identifier,
        amount:req.body.amount
    };
    const txn=await db.onRampTransaction.findFirst({
        where:{
            token:paymentInformation.token
        }
    })
    if(txn?.status==="Success")
    {
        res.status(200).json({
            message:"it is already captured "
        })
    }
    if(txn?.status==="Failure")
        {
            res.status(200).json({
                message:"it is already Failed "
            })
        }
    try{
        await db.$transaction([

            db.balance.updateMany({
                where:{
                    userId:Number(paymentInformation.userId)
                },
                data:{
                    amount:{
                        increment:Number(paymentInformation.amount)/100
                    }
                }
            }),

            db.onRampTransaction.updateMany({
                where:{
                    token:paymentInformation.token
                },
                data:{
                    status:"Success"
                }
            })
        ])
        
            res.status(200).json({
                message:"captured"
            })

       

    }catch(e)
    {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
  

  
    

    }
)

app.listen(3003);