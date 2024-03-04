'use client'
import Link from "next/link";
import styles from "./product.module.css";
import CatalogMenuItem from "@/components/CatalogMenuItem/CatalogMenuItem.component";
import ProductCard from "@/components/ProductCard/ProductCatd.components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useBasketContext } from "@/components/Helps/GlobalBasket";

export default function Catalog({params}:any) {

  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<any>([]);
  const [count, setCount] = useState(0);
  const [basketItems, setBasketItems] = useState<any>([]);
  const [productsCategory, setProductsCategory] = useState<any>([]);


  // useEffect(() => {
  //   console.log(basket)
  // }, [basket])

  useEffect(() => {
    setCount(0)
    axios.get(`/api/product?category_id=${params.id}`).then((res) => {
      setProducts(res.data?.product);
      setCount(res.data?.count);
      setProductsCategory(res.data?.category)
      // console.log(cardProduct)
    }).finally(() => setLoading(false));

    axios.get(`/api/card/category?sort=true`).then(res => {
      setCategory(res.data?.category);
    })

    axios.get(`/api/basket`).then((res) => {
      setBasketItems(res.data?.basket);
    });
  }, [])

  if(!products && !loading){
    return (
      <div>404 page</div>
    )
  }

  function declOfNum(n:any, text_forms:any) {  
    n = Math.abs(n) % 100; 
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
  }


  return(
    <main className={styles.main}>
      {/* <p>Post: {params.id[0]} / {params.id[1]}</p> */}
      {/* {basket} */}
      <div className={`container ${styles.container}`}>
        <div className={styles.menu}>
          <ul>
            {category.map((item:any) => <CatalogMenuItem key={item.id} item={item} params={params} />)}
          </ul>
        </div>
        
        <div className={styles.contnent}>
          <div className={styles.title}>
            <h1>{productsCategory?.parent?.name} {productsCategory.parent ? "/" : ""} {productsCategory?.name}</h1>
            <div className={styles.titleInfo}>
              <p>{count} {declOfNum(count, ['товар', 'товара', 'товаров'])}</p>
              <p>Популярные</p>
            </div>
          </div>

          <div className={styles.catalog}>
            {products.map((item:any) => <ProductCard key={item.id} item={item}/>)}
          </div>

        </div>
      </div>

    </main>
  )
}