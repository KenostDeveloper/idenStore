import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Category } from "@prisma/client";


export async function POST(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions)
    if(!session && session?.user?.role !== "ADMIN"){
        return NextResponse.json({success: false, message: "У вас нет доступа!"});
    }

    try{
        const data = await req.formData()
        const name = data.get('name') as string;
        const id_parent = data.get('id_parent') as string;
        const product_name = data.get('product_name') as string;


        if(!id_parent){
            const category = await db.category.create({
                data: {
                    name: name,
                    product_name: product_name
                }
            });
            return NextResponse.json({success: true, message: "Категория успешно создана!", category});

        }else{
            const category = await db.category.create({
                data: {
                    name: name,
                    id_parent: Number(id_parent),
                    product_name: product_name
                }
            });
        return NextResponse.json({success: true, message: "Категория успешно создана!", category});
        }
        
    
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    }
}


export async function GET(req: NextRequest) {

    let level = req.nextUrl.searchParams.get('level') as string
    let sort = req.nextUrl.searchParams.get('sort') as string
    let product = req.nextUrl.searchParams.get('product') as string

    if(sort){
        try{
            const category:any = await db.category.findMany({
                where: {
                    id_parent: null
                }
            });

            for(let i = 0; i<category.length; i++){
                let categoryEl = await db.category.findMany({
                    where: {
                        id_parent: category[i].id
                    }
                })

                category[i].sort_id = `${i+1}`
                category[i].children = categoryEl;

                for(let j = 0; j<categoryEl.length; j++){
                    category[i].children[j].sort_id = `${i+1}-${j+1}`

                    if(product){
                        const product = await db.card.findMany({
                            take: 6,
                            where: {
                                id_category: category[i].id
                            },
                            include: {
                                company: true,
                                category: true,
                            }
                        })

                        category[i].children[j].products = product

                        if(i == 1){
                            break;
                        }
                    }
                }

                
            }
        
            return NextResponse.json({success: true, category});
        }catch(e){
            return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
        }
    }else{
        if(!level){
            try{
                const category = await db.category.findMany();
            
                return NextResponse.json({success: true, category});
            }catch(e){
                return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
            }
        }else{
            if(Number(level) == 1){
                try{
                    const category = await db.category.findMany({
                        where: {
                            id_parent: null
                        }
                    });
                
                    return NextResponse.json({success: true, category});
                }catch(e){
                    return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
                }
            }
        }
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

        const updateCategory = await db.category.update({
            where: {
                id: Number(id)
            },
            data: {
                name: name,
            },
        });
    
        return NextResponse.json({success: true, message: "Категория успешно создана!", updateCategory});
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

    const deleteCategory = await db.category.delete({
        where: {
            id: idNumber,
        },
    })

    return NextResponse.json({success: true, message: `Категория ${deleteCategory.name} удалено!`, deleteCategory});
}