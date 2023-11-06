import * as React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { useSelector } from 'react-redux';


export default function BasicMasonry() {
    const galleryImages = useSelector(state => state.api.data)
    return (
        <Box>
            <Masonry
                columns={3}
                spacing={2}
                defaultHeight={450}
                defaultColumns={4}
                defaultSpacing={1}
            >
                {galleryImages.map((item, ind) => (
                    <img src={item.url} style={{ height: item.height }} />
                ))}
            </Masonry>
        </Box>
    );
}