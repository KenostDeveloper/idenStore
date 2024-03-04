'use client'
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './CatalogMenuItem.module.css'

const CatalogMenuItem = ({item, params}:any) => {

    const [active, setActive] = useState(false);

    const contentRef = useRef<any>(null);

    // console.log(item)

    useEffect(() => {
        contentRef.current.style.maxHeight = active
          ? `${contentRef.current.scrollHeight}px`
          : "0px";
    }, [contentRef, active]);

    return (
        <li className={styles.menu} onClick={() => setActive(!active)}>
            <p className={active? `${styles.active}` : ""}>{item?.name}</p>
            <div className={styles.menuItem} ref={contentRef}>
                {item?.children?.map((el:any) => <Link className={params.id == el.id? `${styles.active}`: ''} key={el.id} href={`/catalog/${el.id}`}>{el.name}</Link> )}
            </div>
        </li>
    );
};

export default CatalogMenuItem;