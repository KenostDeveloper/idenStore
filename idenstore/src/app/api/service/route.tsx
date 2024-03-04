// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import axios, { AxiosRequestConfig } from "axios";
// import url from 'url'

// export async function GET(req: NextRequest) {
//     try{
//         // const options = {
//         //     method: 'POST',
//         //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
//         //     data: {
//         //         "grant_type": "client_credentials",
//         //         "client_id": "EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI",
//         //         "client_secret": "PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG"
//         //     },
//         //     url: "https://api.edu.cdek.ru/v2/oauth/token?parameters",
//         // };
//         // const auth = await axios(options);

//         // const axiosConfig: AxiosRequestConfig = {
//         //     headers: {
//         //       'Content-Type': 'application/x-www-form-urlencoded',
//         //     },
//         // };

//         // const formDataDiscord = new url.URLSearchParams({
//         //     grant_type: "client_credentials",
//         //     client_id: "EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI",
//         //     client_secret: "PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG"
//         // })

//         // axios.post("https://api.edu.cdek.ru/v2/oauth/token?parameters", formDataDiscord.toString(), axiosConfig).then((res) => {
//         //     return NextResponse.json({success: true, res});
//         // })

//         NextResponse.json({success: true})

//         // const auth = axios.request(config)

//     }catch(e: any){
//         return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
//     }
//     // return NextResponse.json();
// }

import axios, { AxiosRequestConfig } from "axios";
import { NextRequest, NextResponse } from "next/server";
import url from 'url'


export async function GET(req: NextRequest) {
    try{
        // let auth = await axios("http://localhost:3000/api/product/tag");
        // let res = JSON.stringify(auth.data)

        const axiosConfig: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        const formDataDiscord = new url.URLSearchParams({
            grant_type: "client_credentials",
            client_id: process.env.CDEK_CLIENT_ID!,
            client_secret: process.env.CDEK_CLIENT_SECRET!
        })

        const res = await axios.post(`${process.env.CDEK_URL}/v2/oauth/token?parameters`, formDataDiscord.toString(), axiosConfig);
        const access_token = res.data.access_token

        const authConfig: AxiosRequestConfig = {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        };

        const {data: office} = await axios.get(`${process.env.CDEK_URL}/v2/deliverypoints`, authConfig);
        

        return NextResponse.json(office);
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(", e});
    }
}