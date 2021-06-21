import React from 'react';
import style from '/styles/Home.module.scss'

export default function section1() {
    return (
        <div className={`${style.section} ${style.state1}`}>
            <h2>Είπαμε ναι!</h2>
            <p>
                Θα χαρούμε να βρεθείτε στην
                γαμήλια γιορτή μας
                να μοιραστείτε τη χαρά μας!
            </p>
        </div>
    )
}
