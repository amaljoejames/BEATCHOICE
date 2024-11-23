import { prismaClient } from "@/app/lib/db";
import exp from "constants";
import { NextRequest,NextResponse } from "next/server";
import { cache } from "react";
import { number, z } from "zod";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";
import { stringify } from "querystring";
const YT_REGEX= new RegExp("/^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})(\?[A-Za-z0-9_-]+=[A-Za-z0-9_-]+(&[A-Za-z0-9_-]+=[A-Za-z0-9_-]+)*")


const CreateStreamSchema= z.object({
    creatorId: z.string(),
    url:z.string()
})

export async function POST(req:NextResponse) {
    try{
        const data =CreateStreamSchema.parse(await req.json())
        const isYt= data.url.match(YT_REGEX)
        if(!isYt){
            return NextResponse.json({
                message:"ERROR WHILE ADDING A STREAM"
    
            },{
                status:411
    
            })

        }
        const extractedId=data.url.split("?v=");

        const res= await youtubesearchapi.GetVideoDetails(extractedId);
        console.log(res.title);
        console.log(res.thumbnail.thumbnails);
        const thumbnails=res.thumbnail.thumbnails;
        thumbnails.sort(( a:{width: number  },b:{width: number})=> a.width<b.width? -1:1);
      const stream =await prismaClient.stream.create({
        data:{
            userId: data.creatorId,
            //@ts-ignore
            url:  data.url   ,
            //@ts-ignore
            extractedId,
            type :"Youtube",
            title: res.title ??"cant find",
            smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length-1] ).url??"",
            bigImg : thumbnails[thumbnails.length -1].url??""
        }

        });
        return NextResponse.json({
            message:"ERROR WHILE ADDING A STREAM",
            id: stream.id
    })}
    
    catch(e){
        console.log(e);
        return NextResponse.json({
            message:"ERROR WHILE ADDING A STREAM"

        },{
            status:411

        })
    }

    
}
export async function GET(req:NextRequest) {
    const creatorId=req.nextUrl.searchParams.get("creatorId");
    const streams=await prismaClient.stream.findMany({

        where: {
            userId: creatorId ??""
        }
    })
    return NextResponse.json({
        streams
    })
}