import React from 'react'
import styles from "./style.module.scss"
import { QqOutlined } from "@ant-design/icons"


const Header = () => {
  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.logo}>
          <QqOutlined />
        </div>
        <h3>A Successfull life's Journey </h3>
      </div>
    </>
  )
}

export default Header