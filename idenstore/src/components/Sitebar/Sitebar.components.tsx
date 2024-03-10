'use client'
import React, { useEffect, useRef, useState } from 'react';
import styles from './Sitebar.module.css'
import Link from 'next/link';
import { usePathname } from 'next/navigation'


const Sitebar = ({active, setActive}:any) => {

    const [sitebar, setSitebar] = useState([
        {
            name: "Главная",
            icon: "home.svg",
            link: "/"
        },
        {
            name: "Каталог",
            icon: "catalog.svg",
            link: "/catalog"
        },
    
    ])

    const pathname = usePathname()


    return (
        <div onClick={() => setActive(false)} className={active? `${styles.Sitebar} ${styles.active}` : `${styles.Sitebar}`}>
            <div onClick={(e) => e.stopPropagation()} className={active? `${styles.SitebarContent} ${styles.active}` : `${styles.SitebarContent}`}>
                <Link className={styles.logo} href="/"><img src="/logo_full_two.svg" alt="" /></Link>

                <div className={styles.menu}>
                    {sitebar.map((item:any) => <Link onClick={() => setActive(false)} className={pathname == item.link? `${styles.active}` : ""} key={item.name} href={item.link}><img src={`/${item.icon}`} alt="" />{item.name}</Link>)}
                </div>

                <div onClick={() => setActive(false)} className={styles.close}>
                    <img src="/close.svg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Sitebar;