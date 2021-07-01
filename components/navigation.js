import React from 'react';
import style from '/styles/Home.module.scss'
import {useRouter} from "next/router";

function Navigation() {
    const router = useRouter();
    return (
        <>
            <nav className={style.mainNavigation}>
                <ul>
                    <li><a href="/gr" className={router.locale === 'gr' ? style.active : ''}>Ελ</a></li>
                    <li><a href="/ru" className={router.locale === 'ru' ? style.active : ''}>Ру</a></li>
                    <li><a href="/ge" className={router.locale === 'ge' ? style.active : ''}>ქა</a></li>
                </ul>
            </nav>
        </>
    );
}

export default Navigation;
