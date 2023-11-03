import React from 'react'
import Cards from '../components/Card/Cards'
import styles from "./style.module.scss"
import Header from '../components/header/Header'

const Layout = () => {
    return (
        <>
            <Header />
            <div className={styles.layoutWrapper}>
                <Cards />
            </div>
        </>
    )
}

export default Layout