'use client'
import React, { useEffect, useState } from 'react';
import styles from './BasketProduct.module.css'
import Counter from '../Counter/Counter.components';
import axios from 'axios';
import Link from 'next/link';


const BasketProduct = ({basket, index, setBasket} :any) => {
    const [item, setItem] = useState(basket[index])
    const [count, setCount] = useState(0)

    useEffect(() => {
        setItem(basket[index])
        setCount(item?.quantity)
    }, [basket])


    const changeCount = async (countValue: number) => {
        if(countValue != 0){
            const formData = new FormData();
            formData.append("id_product", item.id_product);
            formData.append("quantity", `${countValue}`);
            setCount(countValue)
    
            axios.post(`/api/basket`, formData).then((res) => {
                if (res.data.success) {
                    // setCount(countValue)
                    const updateBasket = basket.map((basket: any) => {
                        if (basket.id_product != item.id_product) {
                          // No change
                          return basket;
                        } else {
                          // Return a new circle 50px below
                          return {
                            ...basket,
                            quantity: countValue,
                          };
                        }
                    });
                    setBasket(updateBasket);
                }
            });
        }else{
            deleteProductBasket(item.id_product)
        }
    }

    const deleteProductBasket = async (id: number) => {
        axios.delete(`/api/basket?id=${id}`).then((res) => {
            if (res.data.success) {
                // deleteProduct
                setBasket(
                    basket.filter((bask: any) => bask?.id_product !== id)
                );
            }
        });
    }

    return (
        <div className={styles.product}>
            <Link href={`/product/${item?.product?.id}`} className={styles.img}>
                {item?.product?.image[0].name?
                    <img src={`/product/${item?.product?.image[0].name}`} alt={`${item?.card?.category?.name} ${item?.product?.card?.company?.name} ${item?.product?.card?.name}`} />
                :
                    <img src="/logo_main.svg" alt={`${item?.card?.category?.name} ${item?.product?.card?.company?.name} ${item?.product?.card?.name}`} />
                }
            </Link>
            <div className={styles.info}>
                <div className={styles.infoTitle}>
                    <Link href={`/product/${item?.product?.id}`}>{item?.card?.category?.name} {item?.product?.card?.company?.name} {item?.product?.card?.name}</Link>
                    <div className={styles.productClose} onClick={() => deleteProductBasket(item?.product?.id)}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.24178 7L13.8298 12.588L12.588 13.8298L7 8.24178L1.41197 13.8298L0.170186 12.588L5.75822 7L0.170186 1.41197L1.41197 0.170184L7 5.75822L12.588 0.170184L13.8298 1.41197L8.24178 7Z" fill="#02121C"/>
                        </svg>
                    </div>
                </div>
                <span className={styles.productLast}>«{item?.product?.color?.name}» / {item?.product?.size?.name}</span>
                <div className={styles.buttons}>
                    <Counter count={count} setCount={changeCount}/>
                    <p>{(item?.product?.price)?.toLocaleString()}₽</p>
                </div>
            </div>
        </div>
    );
};

export default BasketProduct;