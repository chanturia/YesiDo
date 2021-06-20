import React from 'react';
import style from '/styles/Home.module.scss'

function Navigation() {

    return (
        <>
            <nav className={style.mainNavigation}>
                <ul>
                    <li><a href="#el" className={style.active}>El</a></li>
                    <li><a href="#ru">Ru</a></li>
                    <li><a href="#ge">Ge</a></li>
                </ul>
            </nav>
        </>
    );
}

export default Navigation;
