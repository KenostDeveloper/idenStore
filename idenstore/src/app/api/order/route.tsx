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
import { getChangePasswordPattern } from "@/components/EmailPatterns/ChangePasswordPattern";
import nodemailer from "nodemailer";
import { env } from "process";


export async function POST(req: NextRequest, res: NextResponse) {
    try{
        const data = await req.formData()
        const surname = data.get('surname') as string;
        const name = data.get('name') as string;
        const patronymic = data.get('patronymic') as string;
        const email = data.get('email') as string;
        const phone = data.get('phone') as string;
        const methodDelivert = data.get('methodDelivert') as string;

        const cookiesList = cookies()
        const isBasketNull = cookiesList.has('basket-iden-store')
        
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

        //Получили корзину
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


        let cost = 0;
        for(let i = 0; i < basket.length; i++) {
            cost = cost + Number(basket[i].quantity) * Number(basket[i].product.price)
        }

        const order = await db.orders.create({
            data: {
                date: new Date(),
                cost: cost,
                deliveryMethod: methodDelivert,
                surname: surname,
                name: name,
                patronymic: patronymic,
                email: email,
                phone: phone
            }
        })

        for(let i = 0; i < basket.length; i++) {
            const orderProduct = await db.orderProducts.create({
                data: {
                    id_order: order.id,
                    id_product: basket[i].id_product,
                    quantity: basket[i].quantity,
                    price: basket[i].product.price
                }
            })
        }

        const basketDelete = await db.basket.deleteMany({
            where: {
                id_token: getToken?.id
            }
        })

        const transporter = nodemailer.createTransport({
            service: "mail",
            host: "smtp.mail.ru",
            port: 465,
            auth: {
                user: env.EMAIL_LOGIN,
                pass: env.EMAIL_PASSWORD,
            },
        });

        // Генерация уникального ключа для восстановления пароля
        const hash_id = uuidv4();

        const pattern = getChangePasswordPattern({
            name: name,
            surname: surname,
            patronymic: patronymic,
            email: email,
            phone: phone,
            order: order.id
        });

        console.log(email)  

        const info = await transporter.sendMail({
            from: env.EMAIL_LOGIN, // sender address
            to: email as string, // list of receivers "email1, email2"
            subject: "Восстановление пароля", // Subject line
            text: `Recover password`, // plain text body
            html: pattern, // html body
        });

        console.log("Message sent: %s", info.messageId);

        return NextResponse.json({success: true, message: "Ваш заказ отправлен на вашу почту", order});
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    }
}


export async function GET(req: NextRequest) {
    try{
        let id = req.nextUrl.searchParams.get('id') as string

        if(!id){
            const count = await db.orders.count();

            const orders:any = await db.orders.findMany({
                include: {
                    orderProducts: {
                        include: {
                            product: {
                                include: {
                                    card: {
                                        include: {
                                            company: true,
                                            category: true,
                                            productProperty: true
                                        }
                                    },
                                    color: true,
                                    size: true,
                                    image: true,
                                    tag: true
                                }
                            }
                        }
                    }
                }
            });

            for(let i = 0; i < orders.length; i++){
                orders[i].fio = orders[i].surname + " " + orders[i].name + " " + orders[i].patronymic
                orders[i].method = orders[i].deliveryMethod == 1? "Доставка" : "Самовывоз"
            }


            return NextResponse.json({count, orders});

        }else{
            const order = await db.orders.findUnique({
                where: {
                    id: Number(id)
                },
                include: {
                    orderProducts: {
                        include: {
                            product: {
                                include: {
                                    card: {
                                        include: {
                                            company: true,
                                            category: true,
                                            productProperty: true
                                        }
                                    },
                                    color: true,
                                    size: true,
                                    image: true,
                                    tag: true
                                }
                            }
                        }
                    }
                }
            });


            return NextResponse.json({order});
        }

    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    }
}