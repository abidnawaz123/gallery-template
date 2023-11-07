import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space, Menu, Button } from 'antd';
import ChipsArray from '../Tags/tags';
import styles from "./style.module.scss"
import { StoreChipList } from '../redux/apiSlice';
import { useDispatch } from 'react-redux';

const CustomDropDown = ({ currentId }) => {
  const [currState, setCurrState] = useState([])
  const dispatch = useDispatch();

  const items = [
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

  const onClick = (item) => {
    const currTag = items.find((i) => i.key === item.key).label;
    const currId = items.find((i) => i.key === item.key).key;

    if (!currState.some((tag) => tag.key === currId)) {
      // setCurrState((prevState) => [...prevState, { label: currTag, key: currId }]);
      // console.log('this is current State ->', currState)
      dispatch(StoreChipList({ id: currentId, data: [...currState, { label: currTag, key: currId }] }))
    }
  };
  const menu = (
    <Menu onClick={onClick}>
      {items.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <div className={styles.dropDownWrapper}>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button onClick={(e) => e.preventDefault()}>
            <Space>
              Add Tag
            </Space>
          </Button>
        </Dropdown>
        <ChipsArray currState={currState} setCurrState={setCurrState} />
      </div>
    </>
  );
};

export default CustomDropDown;