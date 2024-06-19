"use client";

import { useRouter } from "next/navigation";
import Title from "../UI/Title.components";
import styles from "./OrdersList.module.scss";
import Product from "./Product";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const Order = ({ order, setOrder }: { order: any; setOrder: any }) => {
    const [modalActive, setModalActive] = useState<boolean>(false);

    const router = useRouter();

    let options :any = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };

    return (
        <section className={`${styles["order"]} container`}>
            <div className={`${styles["order__top-side"]}`}>
                <div className={`${styles["order__top-side-block"]}`}>
                    <div className={`${styles["order__title-container"]}`}>
                        <h1 className={`${styles["order__title"]}`}>
                            Заказ #{order?.id}
                        </h1>
                        <p className={`${styles["order__date"]}`}>от {new Date(order?.date).toLocaleString("ru", options)}</p>
                    </div>
                </div>
            </div>
            <div className={`${styles["order__info-container"]}`}>
            <div className={`${styles["order__info"]}`}>
                    <p className={`${styles["order__info-label"]}`}>Фамилия</p>
                    <p className={`${styles["order__info-text"]}`}>{order?.surname}</p>
                </div>
                <div className={`${styles["order__info"]}`}>
                    <p className={`${styles["order__info-label"]}`}>Имя</p>
                    <p className={`${styles["order__info-text"]}`}>{order?.name}</p>
                </div>
                <div className={`${styles["order__info"]}`}>
                    <p className={`${styles["order__info-label"]}`}>Отчество</p>
                    <p className={`${styles["order__info-text"]}`}>{order?.patronymic}</p>
                </div>
                <div className={`${styles["order__info"]}`}>
                    <p className={`${styles["order__info-label"]}`}>E-mail</p>
                    <p className={`${styles["order__info-text"]}`}>{order?.email}</p>
                </div>
                <div className={`${styles["order__info"]}`}>
                    <p className={`${styles["order__info-label"]}`}>Способ доставки</p>
                    <p className={`${styles["order__info-text"]}`}>{order?.deliveryMethod == 1? "Доставка": "Самовывоз"}</p>
                </div>
                <div className={`${styles["order__info"]}`}>
                    <p className={`${styles["order__info-label"]}`}>Телефон</p>
                    <p className={`${styles["order__info-text"]}`}>{order?.phone}</p>
                </div>
            </div>
            <div className={`${styles["order__price-container"]}`}>
                <div className={`${styles["order__info"]}`}>
                    <p
                        className={`${styles["order__info-label"]} ${styles["order__info-label--bold"]}`}>
                        Товары ({order?.orderProducts?.length})
                    </p>
                    <p
                        className={`${styles["order__info-text"]} ${styles["order__info-text--bold"]}`}>
                        {(order?.cost)?.toLocaleString()} ₽
                    </p>
                </div>
            </div>
            <div className={`${styles["order__products-container"]}`}>
                {order?.orderProducts?.map((product: any, index: number) => {
                    return <Product key={product.id} product={product} setOrder={setOrder} inBasket={false} />;
                })}
            </div>
        </section>
    );
};

export default Order;
