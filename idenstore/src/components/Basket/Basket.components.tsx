'use state'
import React, { useEffect, useState } from 'react';
import styles from './Basket.module.css'
import BasketProduct from '../BasketProduct/BasketProduct.components';
import { cookies } from 'next/headers'
import axios from 'axios';
import Link from 'next/link';
import { useBasketContext } from '../Helps/GlobalBasket';


const Basket = ({active, setActive}: any) => {

    // const [basketItems, setBasketItems] = useState<any>([]);
    const [amount, setAmount] = useState(0);

    const {basket, setBasket} = useBasketContext();
    
    
    useEffect(() => {
        axios.get(`/api/basket`).then((res) => {
            // setBasketItems(res.data?.basket);
            setBasket(res.data?.basket)
        });
    }, [])

    useEffect(() => {
        if(basket){
            let temp = 0;

            for(let i = 0; i < basket?.length; i++){
                temp = temp + basket[i]?.quantity * basket[i]?.product?.price;
            }
            setAmount(temp);
        }

        // axios.get(`/api/basket`).then((res) => {
        //     // setBasketItems(res.data?.basket);
        //     setBasket(res.data?.basket)
        // });

    }, [basket])
    
    if(basket == null || basket?.length == 0){
        return(
            <div className={active? `${styles.Basket} ${styles.active}` : `${styles.Basket}`} onClick={() => setActive(false)}>
            <div onClick={(e) => e.stopPropagation()} className={styles.BasketContent}>
                <div className={styles.title}>
                    <h4>Корзина</h4>
                    <div className={styles.close} onClick={() => setActive(false)}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.24178 7L13.8298 12.588L12.588 13.8298L7 8.24178L1.41197 13.8298L0.170186 12.588L5.75822 7L0.170186 1.41197L1.41197 0.170184L7 5.75822L12.588 0.170184L13.8298 1.41197L8.24178 7Z" fill="#02121C"/>
                        </svg>
                    </div>
                </div>
                <div className={`${styles.items} ${styles.centerItem}`}>
                    <img src="/basket-empty.svg" alt="корзина пустая" />
                    <p>Ваша корзина на данный момент пуста</p>
                </div>
                <div className={styles.buttons}>
                    <Link href="/catalog" className={styles.buttonOrder}>Перейти в каталог</Link>
                </div>
            </div>
        </div>
        )
    }
    
    return (
        <div className={active? `${styles.Basket} ${styles.active}` : `${styles.Basket}`} onClick={() => setActive(false)}>
            <div onClick={(e) => e.stopPropagation()} className={styles.BasketContent}>
                <div className={styles.title}>
                    <h4>Корзина</h4>
                    <div className={styles.close} onClick={() => setActive(false)}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.24178 7L13.8298 12.588L12.588 13.8298L7 8.24178L1.41197 13.8298L0.170186 12.588L5.75822 7L0.170186 1.41197L1.41197 0.170184L7 5.75822L12.588 0.170184L13.8298 1.41197L8.24178 7Z" fill="#02121C"/>
                        </svg>
                    </div>
                </div>
                <div className={styles.items}>
                    {/* <BasketProduct/> */}
                    {basket.map((basketEl:any, index:number) => <BasketProduct key={basketEl.id} basket={basket} setBasket={setBasket} index={index} />)}
                </div>
                <div className={styles.buttons}>
                    <div className={styles.itog}>
                        <p>Итого:</p>
                        <p>{(amount)?.toLocaleString()}₽</p>
                    </div>
                    <Link onClick={() => setActive(false)} href="/checkout" className={styles.buttonOrder}>Оформить заказ</Link>
                </div>
            </div>
        </div>
    );
};

export default Basket;