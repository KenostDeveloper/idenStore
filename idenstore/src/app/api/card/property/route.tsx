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
        const info = await req.json()

        for(let i = 0; i<info.characteristics.length; i++){
            const property = await db.productProperty.create({
                data: {
                    id_card: info.id_card,
                    uid: info.characteristics[i].id,
                    name: info.characteristics[i].name,
                    value: info.characteristics[i].value
                }
            });
        }
    
        return NextResponse.json({success: true, message: "Характеристики добавлены!"})
    }catch(e:any){
        return NextResponse.json({success: false, message: "Ошибка добавления характеристик!", e})
    }
    
}



export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if(!session && session?.user?.role !== "ADMIN"){
        return NextResponse.json({success: false, message: "У вас нет доступа!"});
    }

    try{
        const info = await req.json()

        for(let i = 0; i<info.updateProperty.length; i++){
            if(info.updateProperty[i].name != "" && info.updateProperty[i].value){

                const isProperty = await db.productProperty.count({
                    where: {
                        uid: info.updateProperty[i].uid,
                    }
                });

                console.log(isProperty)

                if(isProperty == 0){
                    console.log('Не найдено');

                    const property = await db.productProperty.create({
                        data: {
                            id_card: info.id_card,
                            uid: info.updateProperty[i].id,
                            name: info.updateProperty[i].name,
                            value: info.updateProperty[i].value
                        }
                    });

                }else{
                    const property = await db.productProperty.updateMany({
                        where: {
                            uid: info.updateProperty[i].uid,
                        },
                        data: {
                            name: info.updateProperty[i].name,
                            value: info.updateProperty[i].value
                        }
                    });

                    console.log('Найдено' + property);
                }        
            }else{
                const property = await db.productProperty.deleteMany({
                    where: {
                        uid: info.updateProperty[i].uid,
                    }
                });

                console.log('Удалено!' + property);
            }
            
        }
    
        return NextResponse.json({success: true, message: "Карточка успешно обновлена!"});
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    }
}