'use client'
import Loading from "@/components/Helps/Loading";
import {useSession } from "next-auth/react";
import {useEffect, useState } from "react";
import styles from './orders.module.css'
import DashboardAccess from "@/components/DashboardAccess/DashboardAccess.components";
import { Button, Input, InputPicker, Table, Modal, } from "rsuite";
import axios from "axios";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

const { Column, HeaderCell, Cell } = Table;



export default function DashnoardCardAdd() {
  const [loading, setLoading] = useState(true);
  const { data: getSession } = useSession();

  const [user, setUser] = useState<any>([]);

  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    axios.get(`/api/order`).then(res => {
      setOrders(res.data?.orders);
    })
  }, [])


  useEffect(() => {
    if(typeof(getSession) == "object"){
      if(getSession != null){
        setUser(getSession?.user)
      }
      setLoading(false)
    }
  }, [getSession]);

  if(loading){
    return <Loading/>
  }

  if(user?.role != "ADMIN" || getSession == null){
    return <DashboardAccess user={user}/>
  }else{
    return (
      <main className={styles.main}>
        <div className={styles.displayFlex}>
          <div className={styles.form}>
            <h1>Заказы</h1>
            
          </div> 
        </div> 
        <hr/>

        <Table
        wordWrap="break-word"
        height={400}
        data={orders}
      >
      <Column width={60} align="center" fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={400}>
        <HeaderCell>Покупатель</HeaderCell>
        <Cell dataKey="fio" />
      </Column>

      <Column width={300}>
        <HeaderCell>Почта</HeaderCell>
        <Cell className={styles.mb} dataKey="email" />
      </Column>

      <Column width={150}>
        <HeaderCell>Телефон</HeaderCell>
        <Cell dataKey="phone" />
      </Column>

      <Column width={150}>
        <HeaderCell>Сумма</HeaderCell>
        <Cell dataKey="cost" />
      </Column>

      <Column width={150}>
        <HeaderCell>Метод получения</HeaderCell>
        <Cell dataKey="method" />
      </Column>
    </Table>
      </main>
    );
  }
}
