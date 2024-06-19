import React from 'react';
import styles from './catalog.module.css'
import Link from 'next/link';


const Catalog = () => {
    return (
      <>
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
                    {/* Умные колонки */}
                  <p className={styles.catalogName4}>Умные колонки</p>
                    <img className={styles.catalogImg4} src="/catalog/4.png" alt="" />
                  </Link>
              </div>
            </div>
          </div>
          <div className={`${styles.selection} ${styles.selection2}`}>
            <div className={styles.hand40}>
              <Link href="#" className={styles.catalogCard1}>
                  {/* Планшеты */}
                  <p className={styles.catalogName5}>Планшеты</p>
                  <img className={styles.catalogImg5} src="/catalog/5.png" alt="" />
              </Link>
            </div>
            <div className={styles.hand60}>
              <Link href="#" className={styles.catalogCard1}>
                  {/* Ноутбуки */}
                  <p className={styles.catalogName6}>Ноутбуки</p>
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

      <div className={styles.catalogMobile}>
          <Link href="" className={styles.catalogMobileItemUnical}>
            <p>смартфоны</p>
            <img className={styles.catalogMobileImg1} src="/catalog/1.png" alt="" />
          </Link>
          <Link href="" className={styles.catalogMobileItem}>
            <p>Наушники</p>
            <img className={styles.catalogMobileImg2} src="/catalog/2.png" alt="" />
          </Link>
          <Link href="" className={styles.catalogMobileItem}>
            <p>Умные часы</p>
            <img className={styles.catalogMobileImg3} src="/catalog/3.png" alt="" />
          </Link>
          <Link href="" className={styles.catalogMobileItem}>
            <p>Умные калонки</p>
            <img className={styles.catalogMobileImg4} src="/catalog/4.png" alt="" />
          </Link>
          <Link href="" className={styles.catalogMobileItem}>
            <p>Планшеты</p>
            <img className={styles.catalogMobileImg5} src="/catalog/5.png" alt="" />
          </Link>
          <Link href="" className={styles.catalogMobileItem}>
            <p>Ноутбуки</p>
            <img className={styles.catalogMobileImg6} src="/catalog/6.png" alt="" />
          </Link>
          <Link href="" className={styles.catalogMobileItem}>
            <p>Аксессуары</p>
            <img className={styles.catalogMobileImg7} src="/catalog/7.png" alt="" />
          </Link>
          <Link href="" className={styles.catalogMobileItem}>
            <p>Техника для дома</p>
            <img className={styles.catalogMobileImg8} src="/catalog/8.png" alt="" />
          </Link>
          <Link href="" className={styles.catalogMobileItem}>
            <p>Зарядные устройства</p>
            <img className={styles.catalogMobileImg9} src="/catalog/9.png" alt="" />
          </Link>
      </div>
      </>
    );
};

export default Catalog;