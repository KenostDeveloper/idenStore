import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { unlinkSync } from "fs";
var mv = require('mv');
const fs = require('fs');


export async function POST(req: NextRequest, res: NextResponse) {
    // const session = await getServerSession(authOptions)
    // if(!session && session?.user?.role !== "ADMIN"){
    //     return NextResponse.json({success: false, message: "У вас нет доступа!"});
    // }


    try{
        const data = await req.formData()
        const acticle = data.get('acticle') as string;
        const price = data.get('price') as string;
        const id_card = data.get('id_card') as string;
        const id_color = data.get('id_color') as string;
        const id_size = data.get('id_size');
        const image = data.get('image') as string;
        const isShow = data.get('isShow')

        if(!acticle && !price && !id_card && !id_color){
            return NextResponse.json({success: false, message: "Пожалуйста заполните все поля!"});
        }

        const product = await db.product.create({
            data: {
                acticle: acticle,
                price: Number(price),
                id_card: Number(id_card),
                id_color: Number(id_color),
                id_size: Number(id_size),
                isShow: Boolean(isShow)
            }
        });

        let imageList = image.split(',');

    


        for(let i = 0; i < imageList.length; i++){
            await db.image.create({
                data: {
                    id_product: product.id,
                    name: imageList[i]
                }
            });

            mv(`${process.cwd()}/public/product/temp/${imageList[i]}`, `${process.cwd()}/public/product/${imageList[i]}`, function(err:any) {
                return NextResponse.json({success: false, message: "Произошла ошибка при загрузке изображений!"});
            });
        }

        fs.readdirSync(`${process.cwd()}/public/product/temp/`).forEach((file: any) => {
            fs.unlinkSync(`${process.cwd()}/public/product/temp/${file}`);
        });
    
        return NextResponse.json({success: true, message: "Карточка успешно создана!", product});
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    }
}


export async function GET(req: NextRequest) {
    try{
        let id = req.nextUrl.searchParams.get('id') as string
    
        if(!id){

            const count = await db.product.count();

            const product = await db.product.findMany({
                include: {
                    card: true,
                    color: true,
                    size: true,
                }
            });

            return NextResponse.json({count, product});

        }else{
            const product = await db.product.findUnique({
                where: {
                    id: Number(id)
                }
            })

            return NextResponse.json({product});
        }

        
    
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
        const acticle = data.get('acticle') as string;
        const id = data.get('id') as string;
        const card = data.get('card') as string;
        const isShow = data.get('isShow') as string;
        const color = data.get('color') as string;
        const size = data.get('size') as string;
        //const image = data.get('image') as string;


        const updateProduct = await db.product.update({
            where: {
                id: Number(id)
            },
            data: {
                acticle: acticle,
                id_card: Number(card),
                isShow: Boolean(isShow),
                id_color: Number(color),
                id_size: Number(size)
            },
        });
    
        return NextResponse.json({success: true, message: "Продукт успешно обновлена!", updateProduct});
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    }
}


export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if(!session && session?.user?.role !== "ADMIN"){
        return NextResponse.json({success: false, message: "У вас нет доступа!"});
    }
    try{
        let id = req.nextUrl.searchParams.get('id') as string

        if(id == null){
            return NextResponse.json({success: false, message: "Вы не указали id"});
        }

        const selectImage = await db.image.findMany({
            where: {
                id_product: Number(id), 
            }
        })

        const deleteImage = await db.image.deleteMany({
            where: {
                id_product: Number(id),
            }
        })

        for(let i = 0; i<selectImage.length; i++){
            //Путь файла
            const path = process.cwd() + "/public/Photo/" + selectImage[i].name;
            //Удаляем файл
            unlinkSync(path);
        }
    
        const deleteProduct = await db.product.delete({
            where: {
                id: Number(id),
            },
        })
    
        return NextResponse.json({success: true, message: `Товар удален!`, deleteProduct, deleteImage});
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    }

    
}