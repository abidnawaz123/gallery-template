import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData, deleteApiData, addApiData, updateLocalData } from '../redux/apiSlice';
import {Badge, Card, Col, Dropdown, Row } from 'antd';
import styles from "./style.module.scss"
import { MoneyCollectOutlined, DeleteOutlined, SettingOutlined, CloudDownloadOutlined } from "@ant-design/icons"
import { QqOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';

const Cards = () => {
    const [cardSize, setCardSize] = useState("400px")
    const [cardSequence, setCardSequence] = useState(false)
    const [currCard, setCurrCard] = useState("")
    const [listData, setListData] = useState(null)
    const [inputValue, setInputValue] = useState("")

    const dispatch = useDispatch();
    const apiData = useSelector(state => state.api.data);
    const loading = useSelector(state => state.api.loading);
    const error = useSelector(state => state.api.error);

    const galleryState = useSelector((state) => state.api.tag)



    const fetchDataFromApi = async () => {
        try {
            await dispatch(fetchApiData());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (loading === 'idle') {
            fetchDataFromApi();
        }
    }, [loading]);

    const handleDelete = async (id) => {

        dispatch(deleteApiData(id))
        setTimeout(async () => {
            await fetchDataFromApi()
        }, 1000)
    }

    useEffect(() => {
        // Initialize listData with apiData
        setListData(apiData);
    }, [apiData]);


    const handleDownload = (id) => {
        console.log('id is ->', id)
        const filteredItem = apiData.filter((items, index) => {
            return (items.id === id)
        })
        console.log('filtered Items --->>', filteredItem[0].url);
    }

    const smallCardSize = () => {
        setCardSize("350px")
        setCardSequence(true)
    }

    const mediumCardSize = () => {
        setCardSize("400px")
    }
    const largeCardSize = () => {
        setCardSize("450px")
        setCardSequence(false)
    }

    const items = [
        {
            key: '1',
            label: (
                <a onClick={smallCardSize}>
                    small
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a onClick={mediumCardSize}>
                    medium
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a onClick={largeCardSize}>
                    large
                </a>
            ),
        },
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1000) {
                setCardSequence(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const fileSelectedHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                const dataUrl = reader.result;
                dispatch(addApiData({
                    description: "Abid",
                    url: dataUrl,
                    title: "Man whom woman produce may rule his man born choose few century",
                    id: Math.floor(Math.random()),
                    user: Math.random(),
                    tag: `tag${Math.floor(Math.random() * 30 + 5)}`
                }));
            };
            reader.readAsDataURL(file);
            setTimeout(async () => {
                await dispatch(fetchApiData())
            }, 1000)
        }
    }
    const openSetting = (id) => {
        setCurrCard(id)
    }

    const handleChange = async (e) => {
        setInputValue(e.target.value)

    }

    const handleSubmit = () => {
        // Filter the data based on the inputValue
        const data = apiData.filter((item) => {
            return item.tag === inputValue;
        });
        setListData(data);
    }

    const handleReset = () => {
        setListData(apiData)
    }
    const handleAddTag = async (tags) => {

        const currTaggedItem = listData.filter((items, _) => {
            return items.tag == tags
        })
        const data = {
            id: currTaggedItem[0].id,
            tag: currTaggedItem[0].tag,
            url: currTaggedItem[0].url,
        }
        dispatch(updateLocalData(data))
        setTimeout(async () => {
            await fetchApiData()
        }, 1000)
    }
    return (
        <>
            <input type='text' className={styles.inputField} name='ONE' value={inputValue} placeholder='Search Image based on tag name' onChange={handleChange} />
            <div className={styles.actionButtons} >
                <button onClick={handleSubmit} style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 20, paddingLeft: 20 }}>search</button>
                <button onClick={handleReset} style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 20, paddingLeft: 20 }}>reset</button>
                <Link to="/gallery" className={styles.galleryView}>
                <button className={styles.listSection}>
                    <QqOutlined style={{ fontSize: 40 }} />
                    <span className={styles.galleryLength}>{galleryState?.length}</span>
                </button>
            </Link>
            </div>
            <div className={styles.mainWrapper}>
                <div className={styles.heading}>
                    <h1>Upload New File</h1>
                    <input type="file" name="photo" onChange={fileSelectedHandler}/>
                </div>

                {loading === 'loading' ? (
                    <div>Loading...</div>
                ) : loading === 'failed' ? (
                    <div>Error: {error}</div>
                ) : (
                    <div>
                        <Row gutter={[30, 30]} className={styles.mainRow}>
                            {
                                Array.isArray(listData) &&
                                listData.map((item) => (
                                    <Col xs={24} sm={12} md={!cardSequence ? 8 : 6} key={item.id}>
                                        <Card className={styles.card}>
                                            <div className={styles.cardBottom}>
                                                <img src={item.url} height='100%' width='100%'/>
                                                <Badge className={styles.badge} color='darkseagreen' count={item.tag}/>
                                                <div className={styles.bottomSection}>
                                                    <div className={styles.iconsWrapper}>
                                                        <MoneyCollectOutlined className={styles.image} />
                                                        <CloudDownloadOutlined onClick={() => { handleDownload(item.id) }} className={styles.image} />
                                                        <DeleteOutlined onClick={() => { handleDelete(item.id) }} className={styles.image} />
                                                        <Dropdown
                                                            menu={{ items }}
                                                            placement="topLeft"
                                                            arrow={{
                                                                pointAtCenter: true,
                                                            }}
                                                        >
                                                            <button style={{ border: 'none' }} onClick={() => { openSetting(item.id) }} >
                                                                <SettingOutlined className={styles.image} /></button >
                                                        </Dropdown>
                                                    </div>
                                                    <div className={styles.buttonsSection}>
                                                        <button className={styles.addTag} onClick={() => { handleAddTag(item.tag) }}>Add</button>
                                                        <button className={styles.removeTag}>Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                ))}
                        </Row>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cards;



{/* <Col xs={24} sm={12} md={!cardSequence ? 8 : 6} key={item.id}>
<Card className={styles.backgroundImage}>
    <div className={styles.cardsWrapper} style={{ maxWidth: cardSize }} >
        <img src={item.url ? item.url : sample1} alt="img" height="100%" width="100%" style={{ boxShadow: "0px 2px 10px 2px black", borderRadius: 5 }} />
        <div className={styles.iconsWrapper}>
            <MoneyCollectOutlined className={styles.image} style={{ fontSize: 20 }} />
            <CloudDownloadOutlined onClick={() => { handleDownload(item.id) }} className={styles.image} style={{ fontSize: 20 }} />
            <DeleteOutlined onClick={() => { handleDelete(item.id) }} className={styles.image} style={{ fontSize: 20 }} />
            <Dropdown
                menu={{ items }}
                placement="topLeft"
                arrow={{
                    pointAtCenter: true,
                }}
            >
                <button style={{ backgroundColor: "#c93737", border: 'none' }} onClick={() => { openSetting(item.id) }} ><SettingOutlined className={styles.image} style={{ fontSize: 20 }} /></button >
            </Dropdown>
        </div>
    </div>
</Card>
</Col> */}