'use client'
import React from 'react';
import style from './ProductCard.module.css'
import { HoverSlideshow } from "react-hover-slideshow";


const ProductCard = () => {

    const imageURLs = [
		"/product/лаймм.png",
		"/product/РЗРЗ.png",
		"/product/фото.png"
	];

    return (
        <div className={style.ProductCard}>
            <HoverSlideshow
				aria-label="My pretty picture slideshow"
				images={imageURLs}
				width="200px"
				height="200px"
			/>

            <div className={style.ProductCardText}>
                <p>Смартфон Apple iPhone 15 Pro Max</p>
                <b>130 000₽</b>
                <button>В корзину</button>
            </div>
        </div>
    );
};

export default ProductCard;