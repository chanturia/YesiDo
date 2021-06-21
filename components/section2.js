import React from 'react';
import style from '/styles/Home.module.scss'

export default function section2() {
    return (
        <div className={`${style.section} ${style.state2}`}>
            <div className={style.text1}>Παρασκευή</div>
            <div className={style.text2}>13 ΑΥΓΟΥΣΤΟΥ 2021</div>
            <div className={style.text3}>Ώρα 19:30</div>
        </div>
    )
}
