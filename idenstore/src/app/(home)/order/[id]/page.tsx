'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./order.module.css";
import Order from "@/components/Order/Order";

export default function OrderPage({params}:any) {
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState();
    
    useEffect(() => {
        axios.get(`/api/order?id=${params.id}`).then((res) => {
            setOrder(res.data?.order);
        }).finally(() => setLoading(false));
      }, [])


    if(!order){
        return (
            <div>404 page</div>
        )
    }

    return (
        <main className={styles.main}>
            <div className="container">
                <Order order={order} setOrder={setOrder}/>
            </div>
        </main>
    )
}