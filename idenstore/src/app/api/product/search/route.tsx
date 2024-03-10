import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try{
        let query = req.nextUrl.searchParams.get('query') as string

        const res = await db.product.findMany({
          take: 16,
          orderBy: {
            _relevance: {
              fields: ['search'],
              search: query,
              sort: 'desc',
            },
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
        })

        const category = await db.category.findMany({
          take: 10,
          orderBy: {
            _relevance: {
              fields: ['name'],
              search: query,
              sort: 'desc',
            },
          }
        })

        return NextResponse.json({success: true, products: res, category });
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    }
}