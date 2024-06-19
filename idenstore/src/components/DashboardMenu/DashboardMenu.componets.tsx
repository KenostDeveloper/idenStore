'use client'
import React, { useEffect, useState } from 'react';
import styles from './DashboardMenu.module.css'
import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MobileIcon  from '@rsuite/icons/Mobile';
import GridIcon from '@rsuite/icons/Grid';
import PlusIcon from '@rsuite/icons/Plus';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import Loading from '../Helps/Loading';

const DashboardMenu = () => {

    const [activeKey, setActiveKey] = useState('1');
    const { data: session } = useSession();

    if(session?.user.role != "ADMIN"){
        return null;
    }

    return (
        <div className={styles.menu} style={{ width: 240 }}>
            <Sidenav>
              <Link href="/" className={styles.menuLogo}><img src="/logo_full_two.svg" alt="Айден Стор логотип"/></Link>
              <Sidenav.Body>
                <Nav activeKey={activeKey} onSelect={setActiveKey} >
                  <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                    Главная
                  </Nav.Item>
                  <Nav.Item eventKey="2" icon={<GridIcon />}>
                    Заказы
                  </Nav.Item>
                  <Nav.Menu eventKey="3" title="Товары" icon={<MobileIcon />}>
                    <Link className={styles.link} href="/dashboard/product"><Nav.Item eventKey="3-1" icon={<PlusIcon />}>Товары</Nav.Item></Link>
                    <Link className={styles.link} href="/dashboard/product/color"><Nav.Item eventKey="3-1" >Цвет товара</Nav.Item></Link>
                    <Link className={styles.link} href="/dashboard/product/size"><Nav.Item eventKey="3-1">Размер памяти</Nav.Item></Link>
                    <Link className={styles.link} href="/dashboard/card"><Nav.Item eventKey="3-2" icon={<PlusIcon />}>Карточки товаров</Nav.Item></Link>
                    <Link className={styles.link} href="/dashboard/card/company"><Nav.Item eventKey="3-3">Производители</Nav.Item></Link>
                    <Link className={styles.link} href="/dashboard/card/category"><Nav.Item eventKey="3-4">Категории</Nav.Item></Link>
                  </Nav.Menu>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
        </div>
    );
};

export default DashboardMenu;