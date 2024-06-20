'use client'
import React, { useEffect, useRef, useState } from 'react';
import styles from './Nav.module.css'
import Link from 'next/link';
import Basket from '../Basket/Basket.components';
import axios from 'axios';
import Sitebar from '../Sitebar/Sitebar.components';


const Nav = () => {
    const [basketActive, setBasketActive] = useState(false)
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState<any>([])
    const [searchResultCatalog, setSearchResultCatalog] = useState<any>([])
    const [searchModal, setSearchModal] = useState(false);
    const [loading, setLoading] = useState(true)
    const [catalogMenu, setCatalogMenu] = useState(false);
    const [catalogMenuList, setCatalogMenuList] = useState(0);
    const rootEl = useRef<any>(null);
    const [category, setCategory] = useState([]);
    const [sitebar, setSitebar] = useState(false);

    useEffect(() => {
        if(basketActive || searchModal || catalogMenu || sitebar){
            document.body.classList.add("overflow-y-hidden");
        }else{
            document.body.classList.remove("overflow-y-hidden");
        }

    }, [basketActive, searchModal, catalogMenu, sitebar])

    useEffect(() => {
        const onClick = (e: any) => rootEl.current.contains(e.target) || setSearchModal(false);
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    useEffect(() => {
        axios.get(`/api/card/category?sort=true&product=true`).then(res => {
            setCategory(res.data?.category);
        })
    }, [])


    useEffect(() => {
        const Debounce = setTimeout(() => {
            if(!search){
                return null;
            }

            axios.get(`/api/product/search?query=${encodeURIComponent(search)}`).then((res) => {
                setSearchResult(res.data?.products)
                setSearchResultCatalog(res.data?.category)
            }).finally(() => setLoading(false));
            
        }, 300)

        return () => clearTimeout(Debounce);
    }, [search])


    return (
        <>
        <nav className={styles.Nav}>
            <Basket active={basketActive} setActive={setBasketActive}/>
            <Sitebar active={sitebar} setActive={setSitebar}/>
            <div className={`container ${styles.container}`}>
                <div className={styles.left}>
                    <div className={styles.sitebarMenu} onClick={() => setSitebar(true)}>
                        <svg id="Layer_1" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M381,190.9H131c-11,0-20-9-20-20s9-20,20-20h250c11,0,20,9,20,20S392,190.9,381,190.9z"/></g><g><path d="M381,361.1H131c-11,0-20-9-20-20s9-20,20-20h250c11,0,20,9,20,20S392,361.1,381,361.1z"/></g><g><path d="M381,276H131c-11,0-20-9-20-20s9-20,20-20h250c11,0,20,9,20,20S392,276,381,276z"/></g></g></svg>
                    </div>
                    <Link className={styles.logo} href="/"><img src="/logo_full_two.svg" alt="" /></Link>
                    <Link className={styles.logoMobile} href="/"><img src="/logo_main.svg" alt="" /></Link>
                    <div className={styles.catalog} onMouseEnter={() => setCatalogMenu(true)} onMouseLeave={() => 
                        {setCatalogMenu(false)
                        setCatalogMenuList(0)}                     
                        }>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.71429 1H2.14286C1.51276 1 1 1.51276 1 2.14286V6.71429C1 7.34438 1.51276 7.85714 2.14286 7.85714H6.71429C7.34438 7.85714 7.85714 7.34438 7.85714 6.71429V2.14286C7.85714 1.51276 7.34438 1 6.71429 1ZM7.09524 6.71429C7.09524 6.92419 6.92457 7.09524 6.71429 7.09524H2.14286C1.93257 7.09524 1.7619 6.92419 1.7619 6.71429V2.14286C1.7619 1.93295 1.93257 1.7619 2.14286 1.7619H6.71429C6.92457 1.7619 7.09524 1.93295 7.09524 2.14286V6.71429Z" fill="white" stroke="white" stroke-width="0.5"/>
                        <path d="M6.71429 10.1429H2.14286C1.51276 10.1429 1 10.6556 1 11.2857V15.8571C1 16.4872 1.51276 17 2.14286 17H6.71429C7.34438 17 7.85714 16.4872 7.85714 15.8571V11.2857C7.85714 10.6556 7.34438 10.1429 6.71429 10.1429ZM7.09524 15.8571C7.09524 16.0674 6.92457 16.2381 6.71429 16.2381H2.14286C1.93257 16.2381 1.7619 16.0674 1.7619 15.8571V11.2857C1.7619 11.0754 1.93257 10.9048 2.14286 10.9048H6.71429C6.92457 10.9048 7.09524 11.0754 7.09524 11.2857V15.8571Z" fill="white" stroke="white" stroke-width="0.5"/>
                        <path d="M15.8572 1H11.2857C10.6556 1 10.1429 1.51276 10.1429 2.14286V6.71429C10.1429 7.34438 10.6556 7.85714 11.2857 7.85714H15.8572C16.4873 7.85714 17 7.34438 17 6.71429V2.14286C17 1.51276 16.4873 1 15.8572 1ZM16.2381 6.71429C16.2381 6.92419 16.0675 7.09524 15.8572 7.09524H11.2857C11.0755 7.09524 10.9048 6.92419 10.9048 6.71429V2.14286C10.9048 1.93295 11.0755 1.7619 11.2857 1.7619H15.8572C16.0675 1.7619 16.2381 1.93295 16.2381 2.14286V6.71429Z" fill="white" stroke="white" stroke-width="0.5"/>
                        <path d="M15.8571 10.1429H11.2857C10.6556 10.1429 10.1428 10.6556 10.1428 11.2857V15.8571C10.1428 16.4872 10.6556 17 11.2857 17H15.8571C16.4872 17 17 16.4872 17 15.8571V11.2857C17 10.6556 16.4872 10.1429 15.8571 10.1429ZM16.2381 15.8571C16.2381 16.0674 16.0674 16.2381 15.8571 16.2381H11.2857C11.0754 16.2381 10.9047 16.0674 10.9047 15.8571V11.2857C10.9047 11.0754 11.0754 10.9048 11.2857 10.9048H15.8571C16.0674 10.9048 16.2381 11.0754 16.2381 11.2857V15.8571Z" fill="white" stroke="white" stroke-width="0.5"/>
                        </svg>
                        <Link className={styles.catalogText} href={`/catalog`}>Каталог</Link>

                        <div className={catalogMenu? `${styles.catalogMenu} ${styles.show}` : `${styles.catalogMenu}`}>
                            <ul className={styles.catalogMenuUl}>

                                {category?.map((item:any, index:any) => 
                                    <li className={catalogMenuList == index + 1? `${styles.catalogMainLink} ${styles.show}` : `${styles.catalogMainLink}`} key={item.id} onMouseEnter={() => setCatalogMenuList(index + 1)}>
                                        <a className={styles.catalogLink} href={`/catalog/${item.id}`}>{item.name}</a>
                                        {item.children.length == 0? '' :
                                            <div className={catalogMenuList == index + 1? `${styles.catalogMenuEl} ${styles.show}` : `${styles.catalogMenuEl}`}>
                                                {item.children.map((elem:any) => 
                                                <>
                                                    {elem.products.length == 0? "" : 
                                                        <>
                                                            <b>{elem.name}</b>
                                                            {elem.products.map((el: any) => <a className={styles.catalogMenuElLink} key={el.id} href={`/product/${el.id}`}>{el?.category?.name} {el?.company?.name} {el?.name}</a>)}
                                                            <a className={styles.catalogMenuElAll} href={`catalog/${elem.id}`}>Показать все</a>
                                                        </>
                                                    }
                                                </>
                                                )}
                                                
                                            </div>
                                        }
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.search} ref={rootEl}>
                        <input onClick={() => setSearchModal(true)} value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Поиск' />
                        <div className={searchModal && (search.length > 3 || searchResult.length !== 0)? `${styles.searchModal} ${styles.show}` : `${styles.searchModal}`}>

                            {loading? 
                                <span className={styles.loader}></span>
                                :
                                <>
                                <div className={styles.searchModalCategory}>
                                    <h2>Категории</h2>
                                    <div className={styles.searchModalCategoryContainer}>
                                        {searchResultCatalog?.map((item:any) => <a key={item.id} href={`/catalog/${item.id}`}>{item.name}</a>)}
                                    </div>
                                    <Link className={styles.searchModalCategoryAll} href={`/catalog`}>Все категории</Link>
                                </div>
                                <div className={styles.searchModalProducts}>
                                    {searchResult?.map((product:any) => 
                                        <Link onClick={() => setSearchModal(false)} key={product.id} href={`/product/${product.id}`} className={styles.searchProduct} >
                                            {product?.image[0]?.name ?
                                            <img src={`/static/products/${product?.image[0]?.name}`} alt={`${product?.card?.category?.name} ${product?.card?.company?.name} ${product?.card?.name} ${product?.size?.name}, «${product?.color?.name}»`}/>
                                            :
                                            <img src={`/logo_main.svg`} alt={`${product?.card?.category?.name} ${product?.card?.company?.name} ${product?.card?.name} ${product?.size?.name}, «${product?.color?.name}»`}/>
                                            }
                                            <div className={styles.searchProductText}>
                                                <div className={styles.searchProductTextTitle}>
                                                    <p className={styles.searchProductTextName}>{`${product?.card?.category?.name} ${product?.card?.company?.name} ${product?.card?.name}`}</p>
                                                    <p className={styles.searchProductTextPrice}>{(product?.price).toLocaleString()}₽</p>
                                                </div>
                                                <p className={styles.searchProductTextInfo}>{`«${product?.color?.name}»`} / {`${product?.size?.name}`}</p>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                                </>
                                
                            }

                            
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.social}>
                        <Link target='_blank' href="https://t.me/hiresstud" className={styles.tg}>
                            <svg viewBox="0 0 28 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M25.6129 0.872658C25.6129 0.872658 28.2031 -0.137342 27.9872 2.31552C27.9153 3.32553 27.2677 6.86053 26.7641 10.6841L25.0373 22.0106C25.0373 22.0106 24.8934 23.6699 23.5983 23.9585C22.3031 24.247 20.3605 22.9485 20.0007 22.6599C19.7129 22.4435 14.6045 19.197 12.8057 17.6099C12.3021 17.177 11.7265 16.3113 12.8777 15.3013L20.4325 8.087C21.2959 7.22126 22.1593 5.20126 18.5617 7.65413L8.48873 14.5077C8.48873 14.5077 7.33753 15.2291 5.17907 14.5799L0.502281 13.137C0.502281 13.137 -1.22453 12.0549 1.72543 10.9727C8.92047 7.58193 17.7703 4.11906 25.6129 0.872658Z"
                                    />
                            </svg>
                        </Link>
                        <Link target='_blank' href="https://api.whatsapp.com/send?phone=79939731212" className={styles.wts}>
                            <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                                <g id="Watshapp">
                                <path id="Vector" d="M44.7 37.1446C44.0455 36.8373 40.9107 35.3012 40.3251 35.0622C39.7395 34.8232 39.3261 34.755 38.8783 35.4036C38.4305 36.0522 37.2248 37.4518 36.8459 37.8956C36.4669 38.3394 36.1224 38.3735 35.4679 37.8956C33.588 37.148 31.8518 36.0856 30.3352 34.755C28.9623 33.474 27.8 31.9882 26.8904 30.3513C26.5115 29.7368 26.8904 29.3954 27.166 29.0541C27.4415 28.7127 27.786 28.3372 28.1305 27.9617C28.3824 27.6369 28.5908 27.2812 28.7506 26.9034C28.836 26.7277 28.8804 26.5352 28.8804 26.3402C28.8804 26.1451 28.836 25.9526 28.7506 25.7769C28.7506 25.4697 27.3038 22.3632 26.7526 21.1001C26.2014 19.837 25.7191 20.0077 25.3402 20.0077H23.9623C23.3059 20.0331 22.6865 20.3155 22.2399 20.7929C21.5191 21.4745 20.9482 22.2963 20.5629 23.2068C20.1775 24.1173 19.9862 25.0969 20.0008 26.0841C20.177 28.5078 21.0763 30.8249 22.5844 32.7409C25.3518 36.8149 29.138 40.1082 33.5733 42.2993C35.089 42.9479 36.2602 43.3234 37.1903 43.6306C38.4964 44.0218 39.8769 44.1037 41.2208 43.8696C42.1133 43.6901 42.9591 43.3309 43.7057 42.8142C44.4524 42.2974 45.0839 41.6341 45.5612 40.8655C45.9584 39.9163 46.0893 38.8783 45.9401 37.8614C45.7679 37.6225 45.3545 37.4518 44.7 37.1446Z"/>
                                <path id="Vector_2" d="M50.3267 13.5581C47.9129 11.138 45.0356 9.22249 41.8645 7.92455C38.6934 6.62662 35.2927 5.97253 31.863 6.00088C27.3197 6.0245 22.8621 7.23164 18.9355 9.50175C15.0089 11.7719 11.7507 15.0255 9.48623 18.9376C7.22182 22.8498 6.03047 27.2836 6.03118 31.7961C6.03189 36.3087 7.22464 40.7421 9.49029 44.6536L6 58L19.7517 54.5334C23.5535 56.5881 27.8141 57.6609 32.1423 57.6533H31.863C37.0214 57.6867 42.0729 56.1934 46.3733 53.3639C50.6738 50.5344 54.0283 46.4969 56.0092 41.7662C57.99 37.0355 58.5074 31.8261 57.4953 26.8022C56.4832 21.7783 53.9876 17.1676 50.3267 13.5581ZM31.863 53.2161C27.9907 53.2191 24.1904 52.1767 20.8686 50.2001L20.1008 49.7495L11.9335 51.8641L14.0975 43.9602L13.6088 43.1629C10.8213 38.7043 9.77863 33.3845 10.6786 28.2129C11.5785 23.0413 14.3584 18.3777 18.4909 15.1069C22.6234 11.8362 27.821 10.1858 33.0974 10.4691C38.3738 10.7523 43.3621 12.9493 47.1156 16.6434C49.1279 18.6259 50.7228 20.9864 51.8074 23.5872C52.892 26.1881 53.4446 28.9773 53.433 31.7924C53.4238 37.4715 51.1483 42.9154 47.1051 46.9311C43.062 50.9468 37.5809 53.2069 31.863 53.2161Z"/>
                                </g>
                            </svg>
                        </Link>
                    </div>
                    
                    <Link className={styles.tel} href="tel:+78122141930">+7 (812) 214-19-30</Link>
                    <img onClick={() => setBasketActive(true)} className={styles.card} src="/card.svg" alt="корзина" />
                </div>
            </div>
        </nav>

        <div className={styles.MobileMenu}>
            <Link href="/" className={styles.MobileMenuItem}>
                <img src="/home.svg" alt="" />
                <p>Главная</p>
            </Link>
            <Link href="/catalog" className={styles.MobileMenuItem}>
                <img src="/catalog.svg" alt="" />
                <p>Каталог</p>
            </Link>
            <div onClick={() => setBasketActive(true)} className={styles.MobileMenuItem}>
                <img src="/card.svg" alt="" />
                <p>Корзина</p>
            </div>
        </div>
        </>
    );
};

export default Nav;