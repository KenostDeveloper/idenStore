'use client'
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './CatalogMenuItem.module.css'


const CatalogMenuItem = () => {

    const [active, setActive] = useState(false);

    const contentRef = useRef<any>(null);

    useEffect(() => {
        contentRef.current.style.maxHeight = active
          ? `${contentRef.current.scrollHeight}px`
          : "0px";
    }, [contentRef, active]);

    return (
        <li className={styles.menu} onClick={() => setActive(!active)}>
            <p className={active? `${styles.active}` : ""}>Смартфоны</p>
            <div className={styles.menuItem} ref={contentRef}>
                <Link href="#">Смартфоны</Link>
                <Link href="#">Смартфоны</Link>
                <Link href="#">Смартфоны</Link>
                <Link href="#">Смартфоны</Link>
                <Link href="#">Смартфоны</Link>
            </div>
        </li>
    );
};

export default CatalogMenuItem;