import React from 'react';
import styles from './Footer.module.css'
import Link from 'next/link';


const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.container} container`}>
                <div className={styles.info}>
                    <img className={styles.logo} src="/logo_full_two.svg" alt="Логотип айден стор" />
                    <p>для связи вы можете использовать любые соцсети или номер телефона</p>
                    <Link href="#">+7(812)214-19-30</Link>
                    <Link href="#">Воронежская обл, г Богучар, ул Шолохова, д 4</Link>

                    <Link className={styles.developer} href="https://kenost.ru">kenost developer</Link>
                </div>
                <div className={styles.nav}>
                    <div className={styles.menu}>
                        <b>Меню</b>
                        <div className={styles.links}>
                            <Link href="#">Главная</Link>
                            <Link href="#">Каталог</Link>
                            <Link href="#">Контакты</Link>
                        </div>
                    </div>
                    <div className={styles.menu}>
                        <b>СОЦСЕТИ</b>
                        <div className={styles.links}>
                            <Link href="#">Telegram</Link>
                            <Link href="#">WhatsApp</Link>
                            <Link href="#">Вконтакте</Link>
                        </div>
                    </div>
                </div>
                <img className={styles.logoMobile} src="/logo_full_two.svg" alt="Логотип айден стор" />
                
            </div>
        </footer>
    );
};

export default Footer;