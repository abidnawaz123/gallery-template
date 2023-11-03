import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData, deleteApiData, addApiData } from '../redux/apiSlice';
import { Button, Col, Dropdown, Row, Upload } from 'antd';
import sample1 from "../../assets/images/sample.png"
import styles from "./style.module.scss"
import { MoneyCollectOutlined, DeleteOutlined, SettingOutlined, CloudDownloadOutlined } from "@ant-design/icons"

const Cards = () => {
    const dispatch = useDispatch();
    const apiData = useSelector(state => state.api.data);
    const loading = useSelector(state => state.api.loading);
    const error = useSelector(state => state.api.error);

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
        setTimeout(async()=>{
            await fetchDataFromApi()
        },1000)
    }

    const handleDownload = (id) => {
        console.log('id is ->', id)
        const filteredItem = apiData.filter((items, index) => {
            return (items.id === id)
        })
        console.log('filtered Items --->>', filteredItem[0].url);

    }


    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    small
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    medium
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    large
                </a>
            ),
        },
    ];

    const fileSelectedHandler =async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            // console.log('now this is reader 🤦‍♂️',reader)
            reader.onload = async () => {
                const dataUrl = reader.result;
                dispatch(addApiData({
                    description: "Abid",
                    url: dataUrl,
                    title: "Man whom woman produce may rule his man born choose few century",
                    id: Math.floor(Math.random()),
                    user: Math.random(),
                }));
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className={styles.mainWrapper}>
            <h1 className={styles.Labelheading}>Unsplashed Gallery Design</h1>
            <input type="file" multiple
            onChange={fileSelectedHandler} 
            about='add image' />

            {loading === 'loading' ? (
                <div>Loading...</div>
            ) : loading === 'failed' ? (
                <div>Error: {error}</div>
            ) : (
                <div>
                    <Row gutter={[60, 60]} className={styles.mainRow}>
                        {
                            apiData.length && apiData?.map((item) => (
                                <Col xs={24} sm={12} md={8} key={item.id}>
                                    <div className={styles.cardsWrapper}>
                                        <img src={item.url ? item.url : sample1} alt="img" height="100%" width="100%" style={{ boxShadow: "0px 2px 10px 2px black", borderRadius: 5 }} />
                                        <div className={styles.iconsWrapper}>
                                            <MoneyCollectOutlined className={styles.image} style={{ fontSize: 30 }} />
                                            {/* <a href="#" download={item.url}>download</a> */}

                                            <CloudDownloadOutlined onClick={() => { handleDownload(item.id) }} className={styles.image} style={{ fontSize: 30 }} />
                                            <DeleteOutlined onClick={() => { handleDelete(item.id) }} className={styles.image} style={{ fontSize: 30 }} />
                                            <Dropdown
                                                menu={{
                                                    items,
                                                }}
                                                placement="topLeft"
                                                arrow={{
                                                    pointAtCenter: true,
                                                }}
                                            >
                                                <button style={{ backgroundColor: "#c93737", border: 'none' }} ><SettingOutlined className={styles.image} style={{ fontSize: 30 }} /></button >
                                            </Dropdown>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                    </Row>
                </div>
            )}
        </div>
    );
};

export default Cards;