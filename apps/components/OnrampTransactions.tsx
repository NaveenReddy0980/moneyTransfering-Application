import {Card} from "@repo/ui/card"
import React from "react"

export const OnRampTransactions=({transactions}:{
    transactions:{
        time:Date,
        amount:number,
        status:string,
        provider:string
    }[]
})=>
{
    if(!transactions.length)
    {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactioms">
        <div className="pt-2">
            {transactions.map((t,idx)=><div  key={idx} className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Recieved INR

                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div>
                    + Rs {t.amount/100}
                </div>

            </div>)}

        </div>

    </Card>

}