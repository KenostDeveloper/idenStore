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
    const session = await getServerSession(authOptions)
    if(!session && session?.user?.role !== "ADMIN"){
        return NextResponse.json({success: false, message: "У вас нет доступа!"});
    }

    try{
        const data = await req.formData()
        const acticle = data.get('acticle') as string;
        const price = data.get('price') as string;
        const id_card = data.get('id_card') as string;
        const id_color = data.get('id_color') as string;
        const id_size = data.get('id_size');
        const image = data.get('image') as string;
        const id_tag = data.get('id_tag') as string;
        const isShow = data.get('isShow')

        if(!acticle && !price && !id_card && !id_color){
            return NextResponse.json({success: false, message: "Пожалуйста заполните все поля!"});
        }

        let product;

        const card = await db.card.findUnique({
            where: {
                id: Number(id_card)
            },
            include: {
                company: true,
                category: true
            }
        });

        const size = await db.size.findUnique({
            where: {
                id: Number(id_size)
            }
        });

        const color = await db.color.findUnique({
            where: {
                id: Number(id_color)
            }
        });

        if(id_tag){
            product = await db.product.create({
                data: {
                    acticle: acticle,
                    price: Number(price),
                    id_card: Number(id_card),
                    id_color: Number(id_color),
                    id_size: Number(id_size),
                    isShow: Boolean(isShow),
                    id_tag: Number(id_tag),
                    search: `${card?.category?.name} ${card?.company?.name} ${card?.name} ${card?.company?.name} ${size?.name} ${color?.name}`
                }
            });
        }else{
            product = await db.product.create({
                data: {
                    acticle: acticle,
                    price: Number(price),
                    id_card: Number(id_card),
                    id_color: Number(id_color),
                    id_size: Number(id_size),
                    isShow: Boolean(isShow),
                    search: `${card?.category?.name} ${card?.company?.name} ${card?.name} ${card?.company?.name} ${size?.name} ${color?.name}`
                }
            });
        }

        

        let imageList = image.split(',');

    


        for(let i = 0; i < imageList.length; i++){
            await db.image.create({
                data: {
                    id_product: product.id,
                    name: imageList[i]
                }
            });

            mv(`${process.cwd()}/public/product/temp/${imageList[i]}`, `${process.cwd()}/public/product/${imageList[i]}`, function(err:any) {
                //return NextResponse.json({success: false, message: "Произошла ошибка при загрузке изображений!"});
            });
        }

        // fs.readdirSync(`${process.cwd()}/public/product/temp/`).forEach((file: any) => {
        //     fs.unlinkSync(`${process.cwd()}/public/product/temp/${file}`);
        // });
    
        return NextResponse.json({success: true, message: "Карточка успешно создана!", product});
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    }
}


export async function GET(req: NextRequest) {
    try{
        let id = req.nextUrl.searchParams.get('id') as string
        let category_id = req.nextUrl.searchParams.get('category_id') as string

        let page = req.nextUrl.searchParams.get('page') as string
        let limit = req.nextUrl.searchParams.get('limit') as string
        let tag = req.nextUrl.searchParams.get('tag') as string
        let filter = req.nextUrl.searchParams.get('filter') as string

        let getPage = Number(page) || 1;
        let getLimit = Number(limit) || 9;
        let getFilter = Number(filter) || 1;

        let offset = getPage * getLimit - getLimit;


        if(tag){
            const product = await db.product.findMany({
                take: getLimit,
                skip: offset,
                where: {
                    tag: {
                        name: tag
                    }
                },
                include: {
                    card: {
                        include: {
                            company: true,
                            category: true
                        }
                    },
                    color: true,
                    size: true,
                    image: true,
                    tag: true
                }
            });

            return NextResponse.json({product});
        }
    

        if(category_id){
            const count = await db.product.count({
                where: {
                    card: {
                        id_category: Number(category_id)
                    }
                }
            });

            const category : any = await db.category.findUnique({
                where: {
                    id: Number(category_id)
                }
            })

            if(category?.id_parent != null){
                category.parent = await db.category.findUnique({
                    where: {
                        id: category.id_parent
                    }
                })
            }

            let product; 
            switch(getFilter){
                case 0:
                    //Без сортировки
                    product = await db.product.findMany({
                        take: getLimit,
                        skip: offset,
                        where: {
                            card: {
                                id_category: Number(category_id)
                            }
                        },
                        include: {
                            card: {
                                include: {
                                    company: true,
                                    category: true,
                                }
                            },
                            color: true,
                            size: true,
                            image: true,
                            tag: true,
                        }
                    });

                    break;
                case 1:
                    //Сортировка по цене, дешевле
                    product = await db.product.findMany({
                        take: getLimit,
                        skip: offset,
                        where: {
                            card: {
                                id_category: Number(category_id)
                            }
                        },
                        include: {
                            card: {
                                include: {
                                    company: true,
                                    category: true,
                                }
                            },
                            color: true,
                            size: true,
                            image: true,
                            tag: true,
                        },
                        orderBy: {
                            price: 'asc',
                            
                        },
                    });
                    break;
                case 2:
                    //Сортировка по цене, дороже
                    product = await db.product.findMany({
                        take: getLimit,
                        skip: offset,
                        where: {
                            card: {
                                id_category: Number(category_id)
                            }
                        },
                        orderBy: {
                            price: 'desc',
                        },
                        include: {
                            card: {
                                include: {
                                    company: true,
                                    category: true,
                                }
                            },
                            color: true,
                            size: true,
                            image: true,
                            tag: true,
                        }
                    });
                    break;
                case 3:
                    //Сортировка по алфовиту
                    product = await db.product.findMany({
                        take: getLimit,
                        skip: offset,
                        where: {
                            card: {
                                id_category: Number(category_id)
                            }
                        },
                        orderBy: {
                            search: 'desc',
                        },
                        include: {
                            card: {
                                include: {
                                    company: true,
                                    category: true,
                                }
                            },
                            color: true,
                            size: true,
                            image: true,
                            tag: true,
                        }
                    });
                    break;
            }
    
            

            return NextResponse.json({count, category, product});
        }else{
            if(!id){
                const count = await db.product.count();
    
                const product = await db.product.findMany({
                    take: getLimit,
                    skip: offset,
                    include: {
                        card: {
                            include: {
                                company: true,
                                category: true
                            }
                        },
                        color: true,
                        size: true,
                        image: true,
                        tag: true
                    }
                });
    
                return NextResponse.json({count, product});
    
            }else{
                const product = await db.product.findUnique({
                    where: {
                        id: Number(id)
                    },
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
                });

                const cardProduct = await db.product.findMany({
                    where: {
                        id_card: product?.id_card
                    },
                    include: {
                        color: true,
                        size: true,
                    }
                })
    
                return NextResponse.json({product, cardProduct});
            }
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
        const id_card = data.get('card') as string;
        const isShow = data.get('isShow') as string;
        const id_color = data.get('color') as string;
        const id_size = data.get('size') as string;
        const id_tag = data.get('id_tag') as string;
        //const image = data.get('image') as string;

        const card = await db.card.findUnique({
            where: {
                id: Number(id_card)
            },
            include: {
                company: true,
                category: true
            }
        });

        const size = await db.size.findUnique({
            where: {
                id: Number(id_size)
            }
        });

        const color = await db.color.findUnique({
            where: {
                id: Number(id_color)
            }
        });
        

        const updateProduct = await db.product.update({
            where: {
                id: Number(id)
            },
            data: {
                acticle: acticle,
                id_card: Number(id_card),
                isShow: Boolean(isShow),
                id_color: Number(id_color),
                id_size: Number(id_size),
                id_tag: Number(id_tag),
                search: `${card?.category?.name} ${card?.company?.name} ${card?.name} ${card?.company?.name} ${size?.name} ${color?.name}`
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