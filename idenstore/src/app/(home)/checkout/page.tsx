'use client'
import { useEffect, useState } from 'react';
import styles from './checkout.module.css'
import Script from 'next/script';
import { useBasketContext } from '@/components/Helps/GlobalBasket';
import axios from 'axios';
import { useSession } from "next-auth/react";
import Loading from '@/components/Helps/Loading';

export default function Checkout() {
  const [methodDelivert, setMetodDelivery] = useState(0);

  const [widget, setWidget] = useState<any>()
  const [codeCdek, setCodeCdek] = useState<any>([]);
  const {basket, setBasket} = useBasketContext();
    
    
  useEffect(() => {
      axios.get(`/api/basket`).then((res) => {
          // setBasketItems(res.data?.basket);
          setBasket(res.data?.basket)
      });
  }, [])

  function initCDEK() {
    setWidget(
      new window.CDEKWidget({
        from: "Санкт-Петербург",
        root: "cdek-map",
        apiKey: "7270e707-f1a7-4397-a1d7-0c545cf0b735",
        servicePath: "http://localhost:3000/api/service",
        defaultLocation: "Санкт-Петербург",
        popup: true,
        hideDeliveryOptions: {
          door: true,
        },
        onChoose: async function(info:any, object:any, address:any){
          setCodeCdek(address)
          console.log(address)
          console.log(codeCdek)
        }
      })
    )
  }

  return (
    <main className={styles.main}>
      <Script src="https://cdn.jsdelivr.net/npm/@cdek-it/widget@3" onReady={initCDEK} />
      <div className={`${styles.container} container`}>
        <h1>Офомление заказа</h1>
        <div className={styles.containerChekout}>
          <div className={styles.left}>
              <div className={styles.data}>
                  <input type="text" placeholder='Фамилия'/>
                  <input type="text" placeholder='Имя'/>
                  <input type="text" placeholder='Отчество'/>
                  <input type="text" placeholder='Номер телефона'/>
                  <input type="text" placeholder='email'/>
              </div>
              <h2>Способы получения</h2>
              <div className={styles.methodDelivery}>
                  <div className={methodDelivert == 1? `${styles.active} ${styles.delivery}` : `${styles.delivery}`} onClick={() => {
                      widget.open()
                      setMetodDelivery(1)
                    }}>
                      <div className={styles.deliveryTitle}><p>Доставка</p> <img src="/order/1.svg" alt="" /></div>
                      <div className={styles.deliveryBody}><p>По России</p><span>Выбрать</span></div>
                  </div>
                  <div className={methodDelivert == 2? `${styles.active} ${styles.delivery}` : `${styles.delivery}`} onClick={() => setMetodDelivery(2)}>
                      <div className={styles.deliveryTitle}><p>Доставка</p> <img src="/order/2.svg" alt="" /></div>
                      <div className={styles.deliveryBody}><p>По СПб</p><span>Выбрать</span></div>
                  </div>
                  <div className={methodDelivert == 3? `${styles.active} ${styles.delivery}` : `${styles.delivery}`} onClick={() => setMetodDelivery(3)}>
                      <div className={styles.deliveryTitle}><p>Самовывоз</p> <img src="/order/3.svg" alt="" /></div>
                      <div className={styles.deliveryBody}><p>В магазине</p><span>Выбрать</span></div>
                  </div>
              </div>
          </div>
          <div className={styles.right}>
            <div className={styles.card}>
              <div className={styles.products}>
                {basket.map((item:any) => 
                  <div key={item.id} className={styles.item}>
                    {item?.product?.image[0].name?
                        <img src={`/product/${item?.product?.image[0].name}`} alt={`${item?.card?.category?.name} ${item?.product?.card?.company?.name} ${item?.product?.card?.name}`} />
                    :
                        <img src="/logo.svg" alt={`${item?.card?.category?.name} ${item?.product?.card?.company?.name} ${item?.product?.card?.name}`} />
                    }
                    <div className={styles.itemText}>
                      <div className={styles.itemTextTitle}>
                        <p>{item.quantity} х {item?.card?.category?.name} {item?.product?.card?.company?.name} {item?.product?.card?.name}</p>
                        <span>{(item?.product?.price)?.toLocaleString()}₽</span>
                      </div>
                      <p className={styles.itemInfo}>«{item?.product?.color?.name}» / {item?.product?.size?.name}</p>
                    </div>
                  </div>
                )}

                {/* <div className={styles.item}>
                  <img src="/product/600x600.webp" alt="" />
                  <div className={styles.itemText}>
                    <div className={styles.itemTextTitle}>
                      <p>2 х Смартфон Apple iPhone 15 Pro Max</p>
                      <span>260 000₽</span>
                    </div>
                    <p className={styles.itemInfo}>«титановый чёрный» / 256 ГБ</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <img src="/product/600x600.webp" alt="" />
                  <div className={styles.itemText}>
                    <div className={styles.itemTextTitle}>
                      <p>2 х Смартфон Apple iPhone 15 Pro Max</p>
                      <span>260 000₽</span>
                    </div>
                    <p className={styles.itemInfo}>«титановый чёрный» / 256 ГБ</p>
                  </div>
                </div> */}
              </div>

              <div className={styles.sale}>
                  <div className={styles.saleEl}>
                    <p>Стоимость товаров</p>
                    <p>260 000₽</p>
                  </div>
                  <div className={styles.saleEl}>
                    <p>Доставка</p>
                    <span>{methodDelivert == 0? "Не выбрано" : methodDelivert == 1? "Бесплатно" : methodDelivert == 2? "Стоимость уточнит менеджер" : "Бесплатно"}</span>
                  </div>
                  {methodDelivert == 1?
                  <div className={styles.saleEl}>
                    <p>Адрес доставки</p>
                    <span>{codeCdek.city? `${codeCdek?.city}, ${codeCdek?.address}` : "Не выбрано"}</span>
                  </div>
                  :
                  ""
                  }
              </div>

              <div className={styles.itog}>
                <p>Итого</p>
                <p>260 000₽</p>
              </div>

              <button className={styles.buttonOrder}>Оформить заказ</button>
              

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}