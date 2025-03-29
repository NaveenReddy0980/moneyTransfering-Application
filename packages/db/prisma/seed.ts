import {PrismaClient} from "@prisma/client"
const prisma=new PrismaClient()
import bycrypt from "bcrypt"


async function  main()
{
    const hashedPassword=await bycrypt.hash('alice',10);
    const hashedPassword2=await bycrypt.hash('bob',10);
    const alice=await prisma.user.upsert({
        where:{number:'9999999999'},
        update:{
            password:hashedPassword,
            Balance:{
                create:{
                    amount:200000,
                    locked:2300
                }
            },
        },
        create:{
            number:'9999999999',
            password:'alice',
            name:'alice',
         
            OnRampTransaction:{
                create:{
                    startTime:new Date(),
                    status:"Success",
                    amount:20000,
                    token:'122',
                    provider:"HDFC Bank"
                }
            }
            
        }
    })
    const bob = await prisma.user.upsert({
        where: { number: '9999999998' },
        update: {
            password: hashedPassword2,
            Balance:{
                create:{
                    amount:100000,
                    locked:0
                }
            },
        },
        create: {
          number: '9999999998',
          password: 'bob',
          name: 'bob',
         
          OnRampTransaction: {
            create: {
              startTime: new Date(),
              status: "Failure",
              amount: 2000,
              token: "123",
              provider: "HDFC Bank",
            },
          },
        },
    })
    console.log({alice,bob})

}
main().then(async()=>{
    await prisma.$disconnect()
}).catch(
    async(e)=>{
        console.error(e);
        await prisma.$disconnect()
        process.exit(1)
    }
)