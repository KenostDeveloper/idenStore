import Link from "next/link";
import styles from "./product.module.css";
import CatalogMenuItem from "@/components/CatalogMenuItem/CatalogMenuItem.component";
import ProductCard from "@/components/ProductCard/ProductCatd.components";

export default function Catalog({params}:any) {
  return(
    <main className={styles.main}>
      {/* <p>Post: {params.id[0]} / {params.id[1]}</p> */}

      <div className={`container ${styles.container}`}>
        <div className={styles.menu}>
          <ul>
            <CatalogMenuItem />
            <CatalogMenuItem />
            <CatalogMenuItem />
            <CatalogMenuItem />
          </ul>
        </div>

        <div className={styles.contnent}>
          <div className={styles.title}>
            <h1>Смартфоны / iPhone</h1>
            <div className={styles.titleInfo}>
              <p>12 товаров</p>
              <p>Популярные</p>
            </div>
          </div>

          <div className={styles.catalog}>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            
          </div>

        </div>
      </div>

    </main>
  )
}