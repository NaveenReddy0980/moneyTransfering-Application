"use client"
import React from "react";
import { useState } from "react";
import {Center} from "@repo/ui/center"
import {Card} from "@repo/ui/card"
import {TextInput} from "@repo/ui/Textinput"
import {Button} from "@repo/ui/button"
import { p2pTransfer } from "../user-app/lib/actions/p2pTransfer";



export function SendCard()
{
    const [number,setNumber]=useState("")
    const [amount,setAmount]=useState("")

    return (<div className="h-[90vh]">

       <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                            await p2pTransfer(number,amount)
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>)
}
    













