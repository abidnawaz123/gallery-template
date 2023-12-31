import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData, addApiData, deleteLocalData, updateLocalDataSize, deleteCurrData, addLocalData, updateDataApi, updateDisabledState, deleteApiData, addGalleryData, fetchGalleryData } from '../redux/apiSlice';
import { Badge, Card, Col, Dropdown, Row } from 'antd';
import styles from "./style.module.scss"
import { MoneyCollectOutlined, DeleteOutlined, SettingOutlined, CloudDownloadOutlined } from "@ant-design/icons"
import { QqOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
import Masonry from '@mui/lab/Masonry';
import useMediaQuery from '@mui/material/useMediaQuery';
import ChipsArray from '../Tags/tags';
import CustomDropDown from '../dropDown/DropDown';
import { Chip } from '@mui/material';


const Cards = () => {
    const [cardSize, setCardSize] = useState("400px")
    const [cardSequence, setCardSequence] = useState(false)
    const [currCard, setCurrCard] = useState("")
    const [listData, setListData] = useState(null)
    const [inputValue, setInputValue] = useState("")

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMediumScreen = useMediaQuery('(max-width:900px)');
    const isLargeScreen = useMediaQuery('(max-width:901px)');
    const newcol = () => {
        if (isSmallScreen) {
            console.log('1')
            return 1
        } else if (isMediumScreen) {
            console.log('2')
            return 2
        } else {
            return 3
        }
    }
    const columns = newcol();
    const spacing = isSmallScreen ? 8 : 2;

    const dispatch = useDispatch();
    const apiData = useSelector(state => state.api.data);
    const loading = useSelector(state => state.api.loading);
    const error = useSelector(state => state.api.error);

    const galleryState = useSelector((state) => state.api.tag)
    const galleryData = useSelector(state => state.api.galleryData)

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

    const handleDelete = async (tag, id) => {
        dispatch(deleteApiData(id))
        dispatch(updateDisabledState({ id: id, disabled: true }))
        dispatch(fetchApiData())
    }

    useEffect(() => {
        setListData(apiData);
    }, [apiData]);

    const handleDownload = async (id) => {
        // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

        // const item = apiData.find((item) => item.id === id);

        // if (item) {
        //     if (item.serverImage) {
        //         try {
        //             const image = await fetch(`${proxyUrl}${item.url}`)
        //             if (!image.ok) {
        //                 throw new Error('Failed to fetch the image');
        //             }

        //             const imageBlob = await image.blob();
        //             const imageURL = URL.createObjectURL(imageBlob);

        //             const link = document.createElement('a');
        //             link.href = imageURL;
        //             link.download = item.tag;
        //             document.body.appendChild(link);
        //             link.click();
        //             document.body.removeChild(link);
        //         } catch (error) {
        //             console.error('Error while downloading the image:', error);
        //         }
        //     } else {

        const filteredItem = apiData.filter((items, index) => {
            return (items.id === id)
        })
        const image = await fetch(filteredItem[0].url)
        const imageBlog = await image.blob()
        const imageURL = URL.createObjectURL(imageBlog)

        const link = document.createElement('a')
        link.href = imageURL
        link.download = filteredItem[0].tag
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
    // }
    // }

    const smallCardSize = () => {
        dispatch(updateLocalDataSize({ id: currCard, height: 300 }))
    }

    const mediumCardSize = () => {
        dispatch(updateLocalDataSize({ id: currCard, height: 400 }))
    }
    const largeCardSize = () => {
        dispatch(updateLocalDataSize({ id: currCard, height: 500 }))
    }

    const items = [
        {
            key: '1',
            label: (
                <a onClick={() => { smallCardSize() }}>
                    small
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a onClick={() => { mediumCardSize() }}>
                    medium
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a onClick={() => { largeCardSize() }}>
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
        if (inputValue.trim() !== "") {
            const data = apiData.filter((item) => {
                return item.tag === inputValue;
            });
            setListData(data);
            setInputValue("")
        }
    }

    const handleReset = () => {
        setListData(apiData)
    }
    const handleAddTag = async (item) => {

        const { id, tag, url, user } = item;

        dispatch(addGalleryData({
            description: "Abid",
            title: "Man whom woman produce may rule his man born choose few century",
            url: url,
            id: id,
            user: user,
            tag: tag,
            disabled: true
        }));


        const currTaggedItem = listData.filter((items, _) => {
            return items.tag == tag
        })
        const data = {
            id: currTaggedItem[0].id,
            tag: currTaggedItem[0].tag,
            url: currTaggedItem[0].url,
        }
        dispatch(updateDisabledState({ id: id, disabled: false }))
        dispatch(addLocalData(data))
        dispatch(fetchApiData())
    }
    const removeItem = (tag, id) => {

        const filteredArray = galleryState?.find((item, _) => item.tag === tag)
        if (filteredArray == undefined || filteredArray == null || filteredArray == "") {
            alert('this item is not available in gallery')

        } else {
            dispatch(deleteLocalData(tag))
            dispatch(updateDisabledState({ id: id, disabled: true }))
            alert(`Removed card from gallery with id : ${tag}`)
            dispatch(fetchApiData())
        }
    }

    const deleteTag = () => {
        console.log('deletedTag')
    }

    const DataForChip = [
        {
            label: 'Nature',
            key: '1',
        },
        {
            label: 'City',
            key: '2',
        },
        {
            label: 'Work',
            key: '3',
        },
        {
            label: 'Internet',
            key: '4',
        },
    ];

    return (
        <>
            <input type='text' className={styles.inputField} name='ONE' value={inputValue} placeholder='Search Image based on tag name' onChange={handleChange} />
            <div className={styles.actionButtons} >
                <button onClick={handleSubmit} className={styles.button}>Search</button>
                <button onClick={handleReset} className={styles.button}>Reset</button>
                <Link to="/gallery" className={styles.galleryView}>
                    <button className={styles.listSection}>
                        <QqOutlined style={{ fontSize: 40 }} />
                        <span className={styles.galleryLength}>{galleryData.length}</span>
                    </button>
                </Link>
            </div>
            <div className={styles.mainWrapper}>
                <div className={styles.heading}>
                    <h1>Upload New File</h1>
                    <input type="file" name="photo" onChange={fileSelectedHandler} />
                </div>
            </div>
            {
                // loading === 'loading' ? (
                //     <div>Loading...</div>
                // ) : loading === 'failed' ? (
                //     <div>Error: {error}</div>
                // ) : 
                (
                    <Masonry
                        className={styles.customMasnoryClass}
                        columns={columns} spacing={spacing} defaultColumns={4} defaultSpacing={1}
                    // columns={3}
                    // spacing={2}
                    // defaultColumns={4}
                    // defaultSpacing={1}
                    >
                        {
                            Array.isArray(listData) &&
                            listData.map((item) => {
                                // console.log('item i ',item)
                                return (
                                    <Card className={styles.card}>
                                        <div className={styles.cardBottom}>
                                            <img src={item.url} width='100%' height={`${item.height}px`}
                                                style={{ objectFit: "cover" }}
                                            />
                                            <Badge className={styles.badge} color='darkseagreen' count={item.tag} />
                                            <div>
                                                {/* {currItem} */}
                                            </div>
                                            {/* {
                                                DataForChip.map((system,ind)=>{
                                                    return(
                                                        <Chip label={system.label}/>
                                                    )
                                                })
                                            } */}
                                            {
                                                item?.data?.map((chips, ind) => {
                                                    return (
                                                        <Chip
                                                            label={chips.label}
                                                        />
                                                    )
                                                })
                                            }
                                            <Chip
                                                // icon={icon}
                                                label={item.data?.label}
                                            // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                                            />
                                            <div className={styles.bottomSection}>
                                                <div className={styles.iconsWrapper}>
                                                    <MoneyCollectOutlined className={styles.image} style={{ cursor: 'pointer' }} />
                                                    <CloudDownloadOutlined onClick={() => { handleDownload(item.id) }} className={styles.image} />
                                                    <DeleteOutlined onClick={() => { handleDelete(item.tag, item.id) }} className={styles.image} />
                                                    <Dropdown
                                                        trigger={['click']}
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
                                                {/* <div className={styles.buttonsSection}>
                                                    <button className={styles.addTag} onClick={() => { handleAddTag(item) }}
                                                    // disabled={!item.disabled}
                                                    >Add</button>
                                                    <button className={styles.removeTag} onClick={() => { removeItem(item.tag, item.id) }}
                                                    //  disabled={item.disabled}
                                                    >Remove</button>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div>
                                            <CustomDropDown currentId={item.id} />
                                        </div>
                                    </Card>
                                )
                            })}
                    </Masonry>
                )}
        </>
    );
};

export default Cards;