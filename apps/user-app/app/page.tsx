
//import {prisma} from "@repo/db/client";

import { getServerSession } from 'next-auth';
import {redirect} from 'next/navigation'
import { authOptions } from '../lib/auth';


export default async function Home() {
  const session =await getServerSession(authOptions);
 if(session?.user){
  redirect("/dashboard") ; 
 }
 else{
  redirect("/api/auth/signin");
 }

  
}


// "use client"
// import {prisma} from "@repo/db/client";

// import { useBalance } from "@repo/store/useBalance";

// export default function() {
//   const balance = useBalance();
//   return <div>
//     hi there {balance}
//   </div>
// }