import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
    try{
        const tag = await db.tag.findMany();
    
        return NextResponse.json({success: true, tag});
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    }
}