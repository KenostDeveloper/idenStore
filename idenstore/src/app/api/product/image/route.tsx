import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from 'uuid';


export async function POST(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions)
    if(!session && session?.user?.role !== "ADMIN"){
        return NextResponse.json({success: false, message: "У вас нет доступа!"});
    }

    try{
        const data = await req.formData()
        const file: File | null = data.get('file') as unknown as File
    
        if(!file){
            return NextResponse.json({success: false, message: "Файл не загружен, попробуйте заного"});
        }
    
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
    
        //Получаем тип файла
        //let type = "." + file.type.replace('image/','');
    
        //const name = uuidv4();
    
        //Путь файла
        const path = `${process.cwd()}/public/product/temp/${file.name}`;
        //Сохраняем файл
        await writeFile(path, buffer);

        return NextResponse.json({success: true, message: "Файл успешно загружен!", name: `${file.name}`});
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :("});
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
