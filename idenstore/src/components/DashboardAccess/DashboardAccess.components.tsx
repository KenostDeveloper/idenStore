'use client'
import React, { useEffect, useState} from 'react';
import { signIn, useSession } from 'next-auth/react';
import Loading from '../Helps/Loading';
import styles from './DashboardAccess.module.css'
import Link from 'next/link';

const DashboardAccess = ({user: user}: any) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(typeof(user) == "object" && user != undefined){
            setLoading(false)
        }
    }, [user]);
    

    if(loading){
        return <Loading/>
    }

    if(user?.role != "ADMIN"){
        if(user?.role == "USER"){
            return(
                <div className={styles.auth}>
                    <img src="/logo_main.svg" alt="" />
                    <p>У вас недостаточно прав!</p>
                    <Link href="/">На главную</Link>
                </div>
            )
        }else{
            return(
                <div className={styles.auth}>
                    <img src="/logo_main.svg" alt="" />
                    <p className={styles.btn} onClick={() => signIn('yandex')}>Войти</p>
                </div>
            )
        }
    }
        
};

export default DashboardAccess;