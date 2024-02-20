import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"


export async function POST(req: NextRequest, res: NextResponse) {
    // const session = await getServerSession(authOptions)
    // if(!session && session?.user?.role !== "ADMIN"){
    //     return NextResponse.json({success: false, message: "У вас нет доступа!"});
    // }

    try{
        const data = await req.formData()
        const name = data.get('name') as string;
        const description = data.get('description') as string;
        const category = data.get('category') as string;
        const company = data.get('company') as string;

        if(!name && !description && !category && !company){
            return NextResponse.json({success: false, message: "Пожалуйста заполните все поля!"});
        }

        const card = await db.card.create({
            data: {
                name: name,
                description: description,
                id_category: Number(category),
                id_company: Number(company),
            }
        });
    
        return NextResponse.json({success: true, message: "Карточка успешно создана!", card});
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    }
}


export async function GET(req: NextRequest) {
    try{
        const card = await db.card.findMany({
            include: {
                company: true,
                category: true
            }
        });
        
    
        return NextResponse.json({success: true, card});
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
        const description = data.get('description') as string;
        const category = data.get('category') as string;
        const company = data.get('company') as string;

        const updateCard = await db.card.update({
            where: {
                id: Number(id)
            },
            data: {
                name: name,
                description: description,
                id_category: Number(category),
                id_company: Number(company),
            },
        });
    
        return NextResponse.json({success: true, message: "Карточка успешно обновлена!", updateCard});
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

    const deleteCard = await db.card.delete({
        where: {
            id: idNumber,
        },
    })

    return NextResponse.json({success: true, message: `Категория ${deleteCard.name} удалено!`, deleteCard});
}