import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"


export async function POST(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions)
    if(!session && session?.user?.role !== "ADMIN"){
        return NextResponse.json({success: false, message: "У вас нет доступа!"});
    }

    try{
        const data = await req.formData()
        const name = data.get('name') as string;
        const code = data.get('code') as string;

        const color = await db.color.create({
            data: {
                name: name,
                code: code
            }
        });
    
        return NextResponse.json({success: true, message: "Цвет успешно создан!", color});
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    }
}

export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if(!session && session?.user?.role !== "ADMIN"){
        return NextResponse.json({success: false, message: "У вас нет доступа!"});
    }

    try{
        const data = await req.formData()
        const name = data.get('name') as string;
        const id = data.get('id') as string;
        const code = data.get('code') as string;

        const updateColor = await db.color.update({
            where: {
                id: Number(id)
            },
            data: {
                name: name,
                code: code
            },
        });
    
        return NextResponse.json({success: true, message: "Категория успешно создана!", updateColor});
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    }
}



export async function GET(req: NextRequest) {
    try{
        const color = await db.color.findMany();
    
        return NextResponse.json({success: true, color});
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    }
}

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if(!session && session?.user?.role !== "ADMIN"){
        return NextResponse.json({success: false, message: "У вас нет доступа!"});
    }

    let id = req.nextUrl.searchParams.get('id') as string

    if(id == null){
        return NextResponse.json({success: false, message: "Вы не указали id"});
    }

    let idNumber = Number(id)

    const deleteColor = await db.color.delete({
        where: {
            id: idNumber,
        },
    })

    return NextResponse.json({success: true, message: `Категория ${deleteColor.name} удалено!`, deleteColor});
}


