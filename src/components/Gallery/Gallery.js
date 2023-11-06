import React from 'react'
import Header from '../header/Header'
import { useSelector } from 'react-redux'
import { Badge, Card, Col, Row } from 'antd'
import styles from "./style.module.scss"

const Gallery = () => {
    const updateLocalData = useSelector((state) => state.api.tag)
    console.log("updateLocalDataupdateLocalData",updateLocalData)
  return (
    <>
    <Header />
    <div className={styles.galleryWrapper}>
    <Row gutter={[10,10]}>
      {
        updateLocalData.length ? 
        updateLocalData?.map((items,ind)=>{
          return(
            <Col xs={24} sm={12} md={8} >
      <Card>
        <img src={items.url} height="100%" width="100%"/>
        <Badge count={items.tag}/>
      </Card>
      </Col>
          )
        })
        :
       ( <h1>Nothing in here..</h1>)
      }
    </Row>
    </div>
    
    </>
  )
}

export default Gallery