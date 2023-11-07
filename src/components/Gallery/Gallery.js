import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Button, Card, Col, Row } from 'antd'
import styles from "./style.module.scss"
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { deleteGalleryData, deleteLocalData, fetchGalleryData, updateDisabledState } from '../redux/apiSlice'
import { fetchApiData } from '../redux/apiSlice'

const Gallery = () => {
  const dispatch = useDispatch();
  const [localList, setLocalList] = useState("")


  const fetchGalleryDataFromApi = async () => {
    try {
      await dispatch(fetchGalleryData());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchGalleryDataFromApi()
  }, [])

  const galleryData = useSelector((state) => state.api.galleryData)


  const removeCardFromList = (tag, id) => {
    dispatch(deleteGalleryData(id))
    dispatch(updateDisabledState({ id: id, disabled: true }))
    dispatch(fetchGalleryData())
    // dispatch(fetchApiData())
  }

  return (
    <>
      <Header />
      <div className={styles.galleryWrapper}>
        <div className={styles.goBackBtn}>
          <Link to="/"><Button icon={<ArrowLeftOutlined />}>Go back</Button></Link>
        </div>
        <Row gutter={[10, 10]}>
          {
            galleryData.length ?
              galleryData?.map((items, ind) => {
                return (
                  <Col key={ind} xs={24} sm={12} md={6} >
                    <Card>
                      <img className={styles.images} src={items.url} height="100%" width="100%" />
                      <div className={styles.actionBtnWrapper}>
                        <Badge count={items.tag.toUpperCase()} />
                        <Button type='dashed' onClick={() => { removeCardFromList(items.tag, items.id) }}>Remove</Button>
                      </div>
                    </Card>
                  </Col>
                )
              })
              :
              (<h1 className={styles.emptyData}>It's lonely Here ...</h1>)
          }
        </Row>
      </div>

    </>
  )
}

export default Gallery