import React from 'react';
import style from '/styles/Home.module.scss'
import {useRouter} from "next/router";

function Navigation() {
    const router = useRouter();
    const query = router.query?.userCode ? `?userCode=${router.query.userCode}` : ''
    return (
        <>
            <nav className={style.mainNavigation}>
                <ul>
                    <li><a href={`/gr${query}`} className={router.locale === 'gr' ? style.active : ''}>Ελ</a></li>
                    <li><a href={`/ru${query}`} className={router.locale === 'ru' ? style.active : ''}>Ру</a></li>
                    <li><a href={`/ge${query}`} className={router.locale === 'ge' ? style.active : ''}>ქა</a></li>
                </ul>
            </nav>
        </>
    );
}

export default Navigation;
