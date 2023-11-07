import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { QqOutlined } from '@ant-design/icons';

export default function ChipsArray({ currState, setCurrState }) {

    const handleDelete = (chipToDelete) => () => {
        setCurrState((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    return (

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {currState?.map((data) => {
                let icon;

                if (data.label === 'Nature') {
                    icon = <QqOutlined />;
                }

                return (
                    <Chip
                        icon={icon}
                        label={data.label}
                        onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                    />
                );
            })}
        </div>
    );
}