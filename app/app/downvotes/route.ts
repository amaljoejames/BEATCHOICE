import { PrismaClient } from "@prisma/client/extension";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "../lib/db";
const UpvoteSchema= z.object({
    streamId: z.string(),
    
})
export async function POST(req:NextResponse) {
    const session = await getServerSession();
    const user= await prismaClient.user.findFirst({
    where :{
    email: session?.user?.email ??""
    }
});

if(!user){
    return NextResponse.json({
                message:"unauthenticated"
},{
    status: 403
})
}
try{
    const data= UpvoteSchema.parse(await req.json());
    await prismaClient.upvotes.delete({
        where :{
        userId_streamId:{
            userId: user.id,
            streamId: data.streamId
        }
    }
    });
    return NextResponse.json({
        message:"done"
    })
} catch(e){
    return NextResponse.json({
        message:"upvoting error"
},{
status: 403
})

}
}