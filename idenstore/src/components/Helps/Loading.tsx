import React from 'react';
import style from './Helps.module.css'


const Loading = () => {
    return (
        <div className={style.Loading}>
            <div className={style.logo}><img src="/logo_main.svg" alt="" /></div>
        </div>
    );
};

export default Loading;