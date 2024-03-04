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
import { cookies } from 'next/headers'


export async function POST(req: NextRequest, res: NextResponse) {
    try{
        const data = await req.formData()
        const id_product = data.get('id_product') as string;
        const quantity = data.get('quantity') as string;
    
        const cookiesList = cookies()
        const isBasketNull = cookiesList.has('basket-iden-store')

        const thisData = new Date(Date.now());



        //Удаляем все просроченые токены
        const deleteExpiresTokenBasket = await db.basket.deleteMany({
            where: {
                token: {
                    expires: {
                        lt: thisData
                    }
                }
            }
        })

        const deleteExpiresToken = await db.basketToken.deleteMany({
            where: {
                expires: {
                    lt: thisData
                }
            }
        })
        
    
        if(!isBasketNull){
            //Созаём токен
            const token = uuidv4();

            let time = 24*60*60*30*1000;
            const maxAgeCokies = new Date(Date.now() + time);

            cookies().set({
                name: 'basket-iden-store',
                value: token,
                httpOnly: true,
                expires: maxAgeCokies,
                path: '/',
            })

            const BasketToken = await db.basketToken.create({
                data: {
                    token: token,
                    expires: maxAgeCokies
                }
            })
            
            const basket = await db.basket.create({
                data: {
                    id_token: BasketToken.id,
                    id_product: Number(id_product),
                    quantity: Number(quantity)
                }
            });

            return NextResponse.json({success: true, basket});
        }else{
            //Получаем токен
            const token = cookiesList.get('basket-iden-store');

            let time = 24*60*60*30*1000;
            const maxAgeCokies = new Date(Date.now() + time);

            cookies().set({
                name: 'basket-iden-store',
                value: `${token?.value}`,
                httpOnly: true,
                expires: maxAgeCokies,
                path: '/',
            })

            const getToken = await db.basketToken.findFirst({
                where: {
                    token: token?.value
                }
            })

            const updateExpires = await db.basketToken.update({
                where: {
                    id: getToken?.id
                },
                data: {
                    expires: maxAgeCokies
                }
            })

            const isProduct = await db.basket.findFirst({
                where: {
                    id_token: getToken?.id,
                    id_product: Number(id_product)
                }
            })


            if(isProduct == null){
                const basket = await db.basket.create({
                    data: {
                        id_token: getToken?.id!,
                        id_product: Number(id_product),
                        quantity: Number(quantity)
                    }
                });

                return NextResponse.json({success: true, basket});
            }else{
                const basket = await db.basket.update({
                    where: {
                        id: isProduct.id
                    },
                    data: {
                        id_token: getToken?.id,
                        id_product: Number(id_product),
                        quantity: Number(quantity)
                    }
                });
                return NextResponse.json({success: true, basket});
            }
        }
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    }
    
}


export async function GET(req: NextRequest) {
    try{
        const cookiesList = cookies()
        const isBasketNull = cookiesList.has('basket-iden-store')
        
        if(!isBasketNull){
            return NextResponse.json({success: false, basket: null});
        }else{
            //Получаем токен
            const token = cookiesList.get('basket-iden-store');

            let time = 24*60*60*30*1000;
            const maxAgeCokies = new Date(Date.now() + time);

            cookies().set({
                name: 'basket-iden-store',
                value: `${token?.value}`,
                httpOnly: true,
                expires: maxAgeCokies,
                path: '/',
            })

            const getToken = await db.basketToken.findFirst({
                where: {
                    token: token?.value
                }
            })

            const updateExpires = await db.basketToken.update({
                where: {
                    id: getToken?.id
                },
                data: {
                    expires: maxAgeCokies
                }
            })

            const basket = await db.basket.findMany({
                where: {
                    id_token: getToken?.id
                },
                include: {
                    product: {
                        include: {
                            card: {
                                include: {
                                    company: true,
                                    category: true
                                }
                            },
                            color: true,
                            size: true,
                            image: true
                        }
                    }
                }
            })

            


            return NextResponse.json({success: false, basket});
        }
    
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    }
}


export async function PUT(req: NextRequest) {
    // const session = await getServerSession(authOptions)
    // if(!session && session?.user?.role !== "ADMIN"){
    //     return NextResponse.json({success: false, message: "У вас нет доступа!"});
    // }

    // try{
    //     const data = await req.formData()
    //     const acticle = data.get('acticle') as string;
    //     const id = data.get('id') as string;
    //     const card = data.get('card') as string;
    //     const isShow = data.get('isShow') as string;
    //     const color = data.get('color') as string;
    //     const size = data.get('size') as string;
    //     //const image = data.get('image') as string;


    //     const updateProduct = await db.product.update({
    //         where: {
    //             id: Number(id)
    //         },
    //         data: {
    //             acticle: acticle,
    //             id_card: Number(card),
    //             isShow: Boolean(isShow),
    //             id_color: Number(color),
    //             id_size: Number(size)
    //         },
    //     });
    
    //     return NextResponse.json({success: true, message: "Продукт успешно обновлена!", updateProduct});
    // }catch(e){
    //     return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    // }
}


export async function DELETE(req: NextRequest) {
    try{
        let id = req.nextUrl.searchParams.get('id') as string
        const cookiesList = cookies()
        const isBasketNull = cookiesList.has('basket-iden-store')
        
        if(!isBasketNull){
            return NextResponse.json({success: false, basket: null});
        }else{
            //Получаем токен
            const token = cookiesList.get('basket-iden-store');

            const maxAgeCokies = new Date(Date.now() + 24*60*60*30);

            cookies().set({
                name: 'basket-iden-store',
                value: `${token?.value}`,
                httpOnly: true,
                expires: maxAgeCokies,
                path: '/',
            })

            const getToken = await db.basketToken.findFirst({
                where: {
                    token: token?.value
                }
            })

            const deleteProduct = await db.basket.deleteMany({
                where: {
                    id_token: getToken?.id,
                    id_product: Number(id)
                }
            })

            return NextResponse.json({success: true, deleteProduct});
        }
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    }

    
}