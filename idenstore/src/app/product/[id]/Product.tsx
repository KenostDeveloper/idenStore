/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

'use client'
import Link from "next/link";
import styles from "./product.module.css";
import CatalogMenuItem from "@/components/CatalogMenuItem/CatalogMenuItem.component";
import ProductCard from "@/components/ProductCard/ProductCatd.components";
import Counter from "@/components/Counter/Counter.components";
import { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import axios from "axios";
import Loading from "@/components/Helps/Loading";
import { notFound } from "next/navigation";

export default function Catalog({params}:any) {

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState<any>();


  useEffect(() => {
    axios.get(`/api/product?id=${params.id}`).then((res) => {
      setProduct(res.data?.product);
      if(res.data?.product == undefined){
        notFound()
      }
    }).finally(() => setLoading(false));
  }, [])

  //swiper
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  if (loading) {
    return <Loading />;
  }

  return(
    <main className={styles.main}>
      <div className={`container ${styles.container}`}>
        <div className={styles.photo}>
            <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            <SwiperSlide>
              <div className={styles.PhotoFull}>
                <img src="https://cifra-shop.ru/image/cache/catalog/product/4/ek9y5mwd1mlcrh6_1f4159c6-1400x1000.jpg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.PhotoFull}>
                <img src="https://cifra-shop.ru/image/cache/catalog/product/4/ek9y5mwd1mlcrh6_1f4159c6-1400x1000.jpg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.PhotoFull}>
                <img src="https://cifra-shop.ru/image/cache/catalog/product/4/ek9y5mwd1mlcrh6_1f4159c6-1400x1000.jpg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.PhotoFull}>
                <img src="https://cifra-shop.ru/image/cache/catalog/product/4/ek9y5mwd1mlcrh6_1f4159c6-1400x1000.jpg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.PhotoFull}>
                <img src="https://cifra-shop.ru/image/cache/catalog/product/4/ek9y5mwd1mlcrh6_1f4159c6-1400x1000.jpg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.PhotoFull}>
                <img src="https://cifra-shop.ru/image/cache/catalog/product/4/ek9y5mwd1mlcrh6_1f4159c6-1400x1000.jpg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.PhotoFull}>
                <img src="https://cifra-shop.ru/image/cache/catalog/product/4/ek9y5mwd1mlcrh6_1f4159c6-1400x1000.jpg" />
              </div>
            </SwiperSlide>
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className={`mySwiper ${styles.minSlider}`}
          >
            <SwiperSlide>
              <div className={styles.PhotoMin}>
                <img src="https://cifra-shop.ru/image/cache/catalog/product/4/ek9y5mwd1mlcrh6_1f4159c6-1400x1000.jpg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.PhotoMin}>
                <img src="https://cifra-shop.ru/image/cache/catalog/product/4/ek9y5mwd1mlcrh6_1f4159c6-1400x1000.jpg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.PhotoMin}>
                <img src="https://cifra-shop.ru/image/cache/catalog/product/4/ek9y5mwd1mlcrh6_1f4159c6-1400x1000.jpg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.PhotoMin}>
                <img src="https://cifra-shop.ru/image/cache/catalog/product/4/ek9y5mwd1mlcrh6_1f4159c6-1400x1000.jpg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.PhotoMin}>
                <img src="https://cifra-shop.ru/image/cache/catalog/product/4/ek9y5mwd1mlcrh6_1f4159c6-1400x1000.jpg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.PhotoMin}>
                <img src="https://cifra-shop.ru/image/cache/catalog/product/4/ek9y5mwd1mlcrh6_1f4159c6-1400x1000.jpg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.PhotoMin}>
                <img src="https://cifra-shop.ru/image/cache/catalog/product/4/ek9y5mwd1mlcrh6_1f4159c6-1400x1000.jpg" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className={styles.product}>
          <h1>Смартфон Apple iPhone 15 Pro Max SIM 256 ГБ, «титановый чёрный»</h1>
          <div className={styles.params}>
            <p>Цвет:</p>
            <div className={styles.flex}>
              <div className={`${styles.color} ${styles.active}`} style={{ background: `#E96B52`}}></div>
              <div className={`${styles.color}`} style={{ background: `#595E70`}}></div>
              <div className={`${styles.color}`} style={{ background: `#E4E3E3`}}></div>
              <div className={`${styles.color}`} style={{ background: `#484A4B`}}></div>
            </div>
          </div>
          <div className={`${styles.params} ${styles.mt}`}>
            <p>Память:</p>
            <div className={styles.flex}>
              <div className={`${styles.size} ${styles.active}`}>256 ГБ</div>
              <div className={`${styles.size}`}>256 ГБ</div>
              <div className={`${styles.size}`}>256 ГБ</div>
              <div className={`${styles.size}`}>256 ГБ</div>
            </div>
          </div>

          <hr className={styles.hr}/>

          <p className={styles.price}>130 000₽</p>
          <div className={styles.flex}>
            <Counter count={count} setCount={setCount}/>
            <button className={styles.button}>В корзину</button>
          </div>
          <span className={styles.priceCredit}>Товар доступен в <p>рассрочку</p> от 15 999₽</span>

          <hr className={styles.hr}/>

          <h2>Описание</h2>
          <p className={styles.description}>Одним из первых заметных изменений в iPhone 15 Pro Max является его титановый корпус. Этот материал обеспечивает невероятную прочность и устойчивость к внешним воздействиям, при этом оставаясь легким и приятным на ощупь. Кроме того, новый iPhone имеет самые тонкие рамки среди всех моделей этой линейки, что делает его дизайн еще более изысканным и современным.</p>
          
          <h2>Характеристики</h2>

          <div className={styles.propertys}>
              <div className={styles.property}>
                  <span>Серия</span>
                  <p>iPhone 15 Pro Max</p>
              </div>
              <div className={styles.property}>
                  <span>Серия</span>
                  <p>iPhone 15 Pro Max</p>
              </div>
              <div className={styles.property}>
                  <span>Серия</span>
                  <p>iPhone 15 Pro Max</p>
              </div>
              <div className={styles.property}>
                  <span>Серия</span>
                  <p>iPhone 15 Pro Max</p>
              </div>
              <div className={styles.property}>
                  <span>Серия</span>
                  <p>iPhone 15 Pro Max</p>
              </div>
          </div>
        </div>
      </div>
    </main>
  )
}