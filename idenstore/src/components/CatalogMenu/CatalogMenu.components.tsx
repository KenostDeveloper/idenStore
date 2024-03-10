'use client'
import React, { useEffect, useState } from 'react';
import styles from './CatalogMenu.module.css'
import CatalogMenuItem from '../CatalogMenuItem/CatalogMenuItem.component';
import axios from 'axios';


const CatalogMenu = (params: any) => {

    const [category, setCategory] = useState<any>([]);


    useEffect(() => {
        axios.get(`/api/card/category?sort=true`).then(res => {
            setCategory(res.data?.category);
        })
    }, [])
    
    return (
        <div className={styles.menu}>
          <ul>
            {category.map((item:any) => <CatalogMenuItem key={item.id} item={item} params={params.params} />)}
          </ul>
        </div>
    );
};

export default CatalogMenu;