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
import { useBasketContext } from "@/components/Helps/GlobalBasket";
import Title from "@/components/UI/Title.components";
import ProductsSwiper from "@/components/ProductsSwiper/ProductsSwiper.components";
import { Placeholder } from "rsuite";

export default function Catalog({params}:any) {

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState<any>();
  const [cardProduct, setCardProduct] = useState<any>([]);
  const [photo, setPhoto] = useState<any>([]);
  const [isBasket, setIsBasket] = useState(false);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    axios.get(`/api/product`).then((res) => {
      setNewProducts(res.data?.product);
    });
  }, [])
  
  const {basket, setBasket} = useBasketContext();

  useEffect(() => {
    axios.get(`/api/product?id=${params.id}`).then((res) => {
      setProduct(res.data?.product);
      setCardProduct(res.data?.cardProduct)
      setPhoto(res.data?.product?.image)
    }).finally(() => setLoading(false));
  }, [])

  useEffect(() => {
    //Проверка товара в корзине пользователя
    let temp = false;
    let countTemp;
    for(let i = 0; i<basket?.length; i++){
      if(basket[i].id_product == params.id){
        temp = true;
        countTemp = basket[i]?.quantity;
        break;
      }
    }
    if(temp){
      setIsBasket(true)
      setCount(countTemp)
    }else{
      setIsBasket(false)
    }
  }, [basket])

 //Добавление в корзину
 const addToBasket = async () => {
  const formData = new FormData();
  formData.append("id_product", params.id);
  formData.append("quantity", `${count}`);

  axios.post(`/api/basket`, formData).then((res) => {
      if (res.data.success) {
        setIsBasket(true)
        axios.get(`/api/basket`).then((res) => {
          setBasket(res.data?.basket)
        });
      }
  });
  };

  const changeCount = async (countValue: number) => {
    if(countValue != 0){
        const formData = new FormData();
        formData.append("id_product", params.id);
        formData.append("quantity", `${countValue}`);

        axios.post(`/api/basket`, formData).then((res) => {
            if (res.data.success) {
                setCount(countValue)
                const updateBasket = basket.map((basket: any) => {
                    if (basket.id_product != params.id) {
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
      deleteProductBasket(params.id)
    }
    axios.get(`/api/basket`).then((res) => {
      setBasket(res.data?.basket)
    });
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


  //swiper
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  // if (loading) {
  //   return <Loading />;
  // }

  if(!product){
    return (
      <div>404 page</div>
    )
  }

  return(
    <main className={styles.main}>
      <div className={`container ${styles.container}`}>
        <div className={styles.photo}>
          {!loading?
            <>
              <Swiper
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              {photo.map((img: any) => 
                <SwiperSlide key={img.id}>
                  <div className={styles.PhotoFull}>
                    <img src={`/static/products/${img.name}`}  alt={`${product?.card?.category?.name} ${product?.card?.company?.name} ${product?.card?.name} ${product?.size?.name}, «${product?.color?.name}»`}/>
                  </div>
                </SwiperSlide>
              )}
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
              {photo.map((img: any) => 
                <SwiperSlide key={img.id}>
                  <div className={styles.PhotoMin}>
                    <img src={`/static/products/${img.name}`}  alt={`${product?.card?.category?.name} ${product?.card?.company?.name} ${product?.card?.name} ${product?.size?.name}, «${product?.color?.name}»`}/>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
            </>
          :
          <Placeholder.Graph active style={{ height: 450, width: '100%', borderRadius: 8, background: 'linear-gradient(-45deg, #ffffff 25%, #eeeeee 37%, #ffffff 63%)' }} />
          }
        </div>
        
        <div className={styles.product}>
          {!loading? <h1>{product?.card?.category?.product_name} {product?.card?.company?.name} {product?.card?.name} {product?.size?.name}, «{product?.color?.name}»</h1> : <h1><Placeholder.Graph active style={{ height: 15, width: 300 }} /></h1>}
          <div className={styles.params}>
            {!loading? <p>Цвет:</p> : <p><Placeholder.Graph active style={{ height: 15, width: 100 }} /></p>}
            <div className={styles.flex}>
              {!loading?
                cardProduct.map((cardProd:any) => 
                  cardProd.id_size == product.id_size ? <Link href={`/product/${cardProd.id}`} key={cardProd.id} className={cardProd.id == params.id ?`${styles.color} ${styles.active}` : cardProd.color?.code == 'FFF' || cardProd.color?.code == 'FFFFFF' ? `${styles.color} ${styles.white}` : `${styles.color}`} style={{ background: `#${cardProd.color?.code}`}}></Link> : ""
                )
                :
                <>
                  <Placeholder.Graph active style={{ height: 30, width: 30, marginRight: 8, borderRadius: '50%' }} />
                  <Placeholder.Graph active style={{ height: 30, width: 30, marginRight: 8, borderRadius: '50%' }} />
                  <Placeholder.Graph active style={{ height: 30, width: 30, marginRight: 8, borderRadius: '50%' }} />
                  <Placeholder.Graph active style={{ height: 30, width: 30, marginRight: 8, borderRadius: '50%' }} />
                </>
              }
            </div>
          </div>
          <div className={`${styles.params} ${styles.mt}`}>
            {!loading? <p>Память:</p> : <p><Placeholder.Graph active style={{ height: 15, width: 100 }} /></p>}
            <div className={styles.flex}>
              {!loading?
                cardProduct.map((cardProd:any) => 
                  cardProd.id_color == product.id_color ? <Link href={`/product/${cardProd.id}`} key={cardProd.id} className={cardProd.id == params.id ? `${styles.size} ${styles.active}` : `${styles.size}`}>{cardProd.size.name}</Link> : ""
                )
                :
                <>
                  <Placeholder.Graph active style={{ height: 42, width: 75, marginRight: 8, borderRadius: 8 }} />
                  <Placeholder.Graph active style={{ height: 42, width: 75, marginRight: 8, borderRadius: 8 }} />
                  <Placeholder.Graph active style={{ height: 42, width: 75, marginRight: 8, borderRadius: 8 }} />
                  <Placeholder.Graph active style={{ height: 42, width: 75, marginRight: 8, borderRadius: 8 }} />
                  <Placeholder.Graph active style={{ height: 42, width: 75, marginRight: 8, borderRadius: 8 }} />
                </>
              }
            </div>
          </div>

          <hr className={styles.hr}/>
          {!loading? <p className={styles.price}>{(product?.price).toLocaleString()}₽</p> : <p><Placeholder.Graph active style={{ height: 25, width: 200, marginBottom: 20 }} /></p>}
          <div className={styles.flex}>

            {!isBasket? 
            <>
            {!loading? <Counter count={count} setCount={setCount}/> : <Placeholder.Graph active style={{ height: 42, width: 114, borderRadius: 8}} />}
            {!loading? <button className={styles.button} onClick={() => addToBasket()}>В корзину</button> : <Placeholder.Graph active style={{ height: 42, width: 165, borderRadius: 8, marginLeft: 14}} />}
            </>
            :
            <>
            {!loading? <Counter count={count} setCount={changeCount}/> : <Placeholder.Graph active style={{ height: 42, width: 114, borderRadius: 8}} />}
            {!loading? <button className={`${styles.button} ${styles.btnActive}`}>В корзине</button> : <Placeholder.Graph active style={{ height: 42, width: 165, borderRadius: 8, marginLeft: 14}} />}
            </>
            }
          </div>
          {/* <span className={styles.priceCredit}>Товар доступен в <p>рассрочку</p> от 15 999₽</span> */}
          {!loading? <span className={styles.priceCredit}>Скоро товар будет доступен в <p>рассрочку</p> (в разработке)</span> : <Placeholder.Graph active style={{ height: 15, width: 380, marginTop: 14 }} />}
          
          <hr className={styles.hr}/>

          {!loading? <h2>Описание</h2> : <h2><Placeholder.Graph active style={{ height: 20, width: 108, marginBottom: 12 }} /></h2>}
          {!loading? <p className={styles.description}>{product?.card?.description}</p> : <Placeholder.Paragraph active style={{ marginBottom: 25 }} rows={4} />}
          
          
          {product?.card?.productProperty[0]? 
            !loading? <h2>Характеристики</h2> : <h2><Placeholder.Graph active style={{ height: 20, width: 175, marginBottom: 12 }} /></h2>
            :
            ""
          }
          
          {!loading?
            <div className={styles.propertys}>
              {product?.card?.productProperty.map((el:any) => 
                <div key={el.id} className={styles.property}>
                    <span>{el.name}</span>
                    <span>{el.value}</span>
                </div>
              )}
            </div>
          : <Placeholder.Paragraph active style={{ marginBottom: 25 }} rows={4} />}
          
        </div>
      </div>
      <div className={`container`}>
        <Title text="Похожие товары"/>
        <ProductsSwiper products={newProducts}/>
      </div>
    </main>
  )
}