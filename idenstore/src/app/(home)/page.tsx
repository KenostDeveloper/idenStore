'use client'
import Basket from "@/components/Basket/Basket.components";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Title from "@/components/UI/Title.components";
import Link from "next/link";
import axios from "axios";
import ProductsSwiper from "@/components/ProductsSwiper/ProductsSwiper.components";
import AnswerSwiper from "@/components/ProductsSwiper/AnswersSwiper.components";
import { motion } from "framer-motion"

export default function Home() {

  const [newProducts, setNewProducts] = useState([]);
  const [promoProducts, setPromoProducts] = useState([]);

  useEffect(() => {
    axios.get(`/api/product?tag=Новинки`).then((res) => {
      setNewProducts(res.data?.product);
    });

    axios.get(`/api/product?tag=Акции`).then((res) => {
      setPromoProducts(res.data?.product);
    });
  })

  const [answers, setAnswers] = useState([
    {
      id: 1,
      name: "Людмила Семёнова",
      text: "Я полностью влюблена в мой iPhone! Этот смартфон обладает удивительным качеством сборки и превосходным дизайном. Он ощущается премиальным в руках, а стеклянный корпус и металлическая рамка создают роскошный вид.",
      photo: "/answer/1.png"
    },
    {
      id: 2,
      name: "Людмила Семёнова",
      text: "Я полностью влюблена в мой iPhone! Этот смартфон обладает удивительным качеством сборки и превосходным дизайном. Он ощущается премиальным в руках, а стеклянный корпус и металлическая рамка создают роскошный вид.",
      photo: "/answer/1.png"
    },
    {
      id: 3,
      name: "Людмила Семёнова",
      text: "Я полностью влюблена в мой iPhone! Этот смартфон обладает удивительным качеством сборки и превосходным дизайном. Он ощущается премиальным в руках, а стеклянный корпус и металлическая рамка создают роскошный вид.",
      photo: "/answer/1.png"
    },
    {
      id: 4,
      name: "Людмила Семёнова",
      text: "Я полностью влюблена в мой iPhone! Этот смартфон обладает удивительным качеством сборки и превосходным дизайном. Он ощущается премиальным в руках, а стеклянный корпус и металлическая рамка создают роскошный вид.",
      photo: "/answer/1.png"
    },
    {
      id: 5,
      name: "Людмила Семёнова",
      text: "Я полностью влюблена в мой iPhone! Этот смартфон обладает удивительным качеством сборки и превосходным дизайном. Он ощущается премиальным в руках, а стеклянный корпус и металлическая рамка создают роскошный вид.",
      photo: "/answer/1.png"
    },
    {
      id: 6,
      name: "Людмила Семёнова",
      text: "Я полностью влюблена в мой iPhone! Этот смартфон обладает удивительным качеством сборки и превосходным дизайном. Он ощущается премиальным в руках, а стеклянный корпус и металлическая рамка создают роскошный вид.",
      photo: "/answer/1.png"
    },
    {
      id: 7,
      name: "Людмила Семёнова",
      text: "Я полностью влюблена в мой iPhone! Этот смартфон обладает удивительным качеством сборки и превосходным дизайном. Он ощущается премиальным в руках, а стеклянный корпус и металлическая рамка создают роскошный вид.",
      photo: "/answer/1.png"
    }
  ]);


  return (
    <main className={styles.main}>
      <div className="container home">
        <div className={styles.banners}>
            <div className={styles.homeBanner}>
              <div className={styles.homeBannerText}>
                <p className={styles.bannerOnline}>Работаем всегда</p>
                <h1>Техника ниже рынка</h1>
                <p>Магазин предлагает продукцию различных брендов и моделей по выгодным ценам, чтобы удовлетворить потребности покупателей</p>
                <button>В каталог</button>
              </div>
              <motion.img 
              initial={{ scale: 0.5, bottom: -300, rotate: 20 }}
              animate={{ scale: 1, bottom: 0, rotate: 0 }}
              transition={{ duration: 0.8 }}
              className={styles.bannerImg} src="/home/banner-hand.png" alt="айфон в руке на прозрачном фоне" />
              <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className={styles.shadow1}></motion.div>
            </div>
            <div className={styles.secondaryBanners}>
              <div className={styles.topBanner}>
                <p className={styles.span}>Lightning</p>
                <p className={styles.textBanner}>Аксессуары по лучшим ценам</p>
                <motion.img
                initial={{ scale: 0.5, right: -200, top: -200, rotate: 0}}
                animate={{ scale: 1, right: -30, top: -50, rotate: -45 }}
                transition={{ duration: 0.9 }}
                src="/home/banner-usb.png" alt="провод на прозрачном фоне" />
                <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ duration: 1 }}
                className={styles.shadow2}></motion.div>
              </div>
              <div className={styles.bottomBanner}>
                <p className={styles.span}>APPLE WATCH</p>
                <p className={styles.textBanner}>Смарт-часы для ваших устройств</p>
                <motion.img
                initial={{ scale: 0.5, right: -200, bottom: 300}}
                animate={{ scale: 1, right: -15, bottom: 25}}
                transition={{ duration: 1.2 }}
                src="/home/banner-smart.png" alt="провод на прозрачном фоне" />
                <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ duration: 1 }}
                className={styles.shadow3}></motion.div>
              </div>
            </div>
        </div>

        <Title text="Новинки"/>
        <ProductsSwiper products={newProducts}/>

        <Title text="Каталог товаров" />
        <div className={styles.catalog}>
            <div className={`${styles.selection} ${styles.selection1}`}>
              <div className={styles.hand50}>
                <Link href="#" className={styles.catalogCard1}>
                    {/* Смартфон */}
                    <p className={styles.catalogName1}>смартфоны</p>
                    <img className={styles.catalogImg1} src="/catalog/1.png" alt="" />
                </Link>
              </div>
              <div className={styles.hand50}>
                <div className={`${styles.selection} ${styles.h50}`}>
                  <div className={styles.hand50}>
                    <Link href="#" className={styles.catalogCard2}>
                      {/* Наушники */}
                      <p className={styles.catalogName2}>Наушники</p>
                      <img className={styles.catalogImg2} src="/catalog/2.png" alt="" />
                    </Link>
                  </div>
                  <div className={styles.hand50}>
                    <Link href="#" className={styles.catalogCard2}>
                      {/* Умные часы */}
                    <p className={styles.catalogName3}>Умные часы</p>
                      <img className={styles.catalogImg3} src="/catalog/3.png" alt="" />
                    </Link>
                  </div>
                </div>
                <div className={`${styles.selection} ${styles.h50}`}>
                    <Link href="#" className={styles.catalogCard2}>
                      {/* Умные калонки */}
                    <p className={styles.catalogName4}>Умные калонки</p>
                      <img className={styles.catalogImg4} src="/catalog/4.png" alt="" />
                    </Link>
                </div>
              </div>
            </div>
            <div className={`${styles.selection} ${styles.selection2}`}>
              <div className={styles.hand40}>
                <Link href="#" className={styles.catalogCard1}>
                    {/* Ноутбуки */}
                    <p className={styles.catalogName5}>Ноутбуки</p>
                    <img className={styles.catalogImg5} src="/catalog/5.png" alt="" />
                </Link>
              </div>
              <div className={styles.hand60}>
                <Link href="#" className={styles.catalogCard1}>
                    {/* Планшеты */}
                    <p className={styles.catalogName6}>Планшеты</p>
                    <img className={styles.catalogImg6} src="/catalog/6.png" alt="" />
                </Link>
              </div>
            </div>

            <div className={`${styles.selection} ${styles.selection3}`}>
              <div className={styles.hand30}>
                <Link href="#" className={styles.catalogCard1}>
                    {/* Аксессуары */}
                    <p className={styles.catalogName7}>Аксессуары</p>
                    <img className={styles.catalogImg7} src="/catalog/7.png" alt="" />
                </Link>
              </div>
              <div className={styles.hand40}>
                <Link href="#" className={styles.catalogCard1}>
                    {/* Техника для дома */}
                    <p className={styles.catalogName8}>Техника для дома</p>
                    <img className={styles.catalogImg8} src="/catalog/8.png" alt="" />
                </Link>
              </div>
              <div className={styles.hand30}>
                <Link href="#" className={styles.catalogCard1}>
                    {/* Зарядные устройства */}
                    <p className={styles.catalogName9}>Зарядные <br/>устройства</p>
                    <img className={styles.catalogImg9} src="/catalog/9.png" alt="" />
                </Link>
              </div>
            </div>
        </div>

        <Title text="Наши преимущества" />
        <div className={styles.advantage}>
          <div className={`${styles.advantageItem}`}>
            <div className={styles.text}>
              <p>Быстрая</p>
              <p>доставка</p>
            </div>
            <div className={styles.circle}><img src="/advantage/1.png" alt="" /></div>
          </div>
          <div className={styles.advantageItem}>
            <div className={styles.circle}><img src="/advantage/2.png" alt="" /></div>
            <div className={styles.text}>
              <p>Отличное</p>
              <p>качество</p>
            </div>
          </div>
          <div className={`${styles.advantageItem}`}>
            <div className={styles.text}>
              <p>Оплата товара</p>
              <p>при получении</p>
            </div>
            <div className={styles.circle}><img src="/advantage/3.png" alt="" /></div>
          </div>
          <div className={styles.advantageItem}>
            <div className={styles.circle}><img src="/advantage/4.png" alt="" /></div>
            <div className={`${styles.text} ${styles.custom2}`}>
              <p>Низкие</p>
              <p>цены</p>
            </div>
          </div>
          <div className={`${styles.advantageItem}`}>
            <div className={`${styles.text} ${styles.custom}`}>
              <p>Оригинальная</p>
              <p>техника</p>
            </div>
            <div className={styles.circle}><img src="/advantage/5.png" alt="" /></div>
          </div>
        </div>

        <Title text="Акции"/>
        <ProductsSwiper products={promoProducts}/>

        <Title text="Отзывы"/>
        <AnswerSwiper answers={answers}/>
      </div>
    </main>
  );
}
