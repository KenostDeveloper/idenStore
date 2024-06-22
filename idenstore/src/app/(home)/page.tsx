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
import Catalog from "@/components/catalog/catalog.components";

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
  }, [])

  const [answers, setAnswers] = useState([
    {
      id: 1,
      name: "Людмила Семёнова",
      text: "Я полностью влюблена в мой iPhone! Этот смартфон обладает удивительным качеством сборки и превосходным дизайном. Он ощущается премиальным в руках, а стеклянный корпус и металлическая рамка создают роскошный вид.",
      photo: "/answer/1.png"
    },
    {
      id: 2,
      name: "Виктор Хлебников",
      text: "Замечательный магазин! Заказал телефон, доставка была очень быстрой, всего пару дней. Курьер доставил прямо до двери. Телефон был отлично упакован, все работает как часы. Буду заказывать здесь еще!",
      photo: "/answer/2.jpg"
    },
    {
      id: 3,
      name: "Анастасия Егорова",
      text: "Неплохой выбор, но цены кусаются.  В целом, ассортимент магазина хороший, нашла все, что искала. Но цены немного выше, чем у конкурентов.  Пришлось немного подождать доставку, но в целом, все прошло без проблем.",
      photo: "/answer/3.jpg"
    },
    {
      id: 4,
      name: "Полина Токарева",
      text: "Супер!  Долго искала блендер для смузи, и здесь нашла именно то, что нужно.  Доставка была бесплатной и очень быстрой, всего день. Блендер работает отлично, все соответствует описанию. ",
      photo: "/answer/4.jpg"
    },
    {
      id: 5,
      name: "Лилия Абдалава",
      text: "Очень довольна покупкой! Недавно приобрела в этом магазине умные часы.  Огромный выбор моделей,  быстрая доставка,  и главное –  оказались очень удобные в использовании.  Магазин однозначно рекомендую!",
      photo: "/answer/5.jpg"
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
                <Link className={styles.bannerButton} href="/catalog">В каталог</Link>
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
        <Catalog/>

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
