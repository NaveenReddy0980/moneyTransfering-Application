"use client"
import {Button} from "@repo/ui/button"
import {Card} from "@repo/ui/card";
import {Center} from "@repo/ui/center"
import {Select} from "@repo/ui/select"
import { useState } from "react";
import { TextInput } from "@repo/ui/Textinput";
import React from "react";
import {db} from "@repo/db/client"
import { createOnRampTransaction } from "../user-app/lib/actions/createOnRampTxn";


const SUPPORTED_BANKS=[{
    name:"HDFC Bank",
    redirectUrl:"hdfc://netbanking/hdfcbankaccout.con"
},
{
    name:'Axis Bank',
    redirectUrl:'https://www.axisbank.com'
    
}
];

export const AddMoney=()=>{
    const [amount,setAmount]=useState(0)
    const [Bank,setBank]=useState("HDFC Bank")
    const [redirectUrl,setRedirectUrl]=useState(SUPPORTED_BANKS[0]?.redirectUrl)
    return <Card title="Add Money">
        <div className="w-full">
            <TextInput label="Amount"  placeholder="Amount" onChange={(value)=>{
                setAmount(parseInt(value))
            }}/>
                <div className="py-4 text-left">
                    Bank
                </div>
                <Select onSelect={(value)=>{setRedirectUrl(SUPPORTED_BANKS.find(x=>x.name===value)?.redirectUrl||"")
                setBank(value);
                }}
                    options={SUPPORTED_BANKS.map(x=>({key:x.name,value:x.name}))} />
                  
                  <div className="flex justify-center pt-4">

                    <Button onClick={async()=>{
                        // db.onRampTransaction.create({
                        //     data:{
                        //     status: "Processing",
                        //     token:"secret_token",
                        //     provider:Bank,
                        //     amount:amount,
                        //     startTime:new Date(),
                        //     userId:1,
                        //     }


                        // })
                        await createOnRampTransaction(Bank,amount*100);

                        window.location.href=redirectUrl||" "
                    }}>Add Money</Button>

                    

                  </div>
                


        </div>
        
    </Card>

}
