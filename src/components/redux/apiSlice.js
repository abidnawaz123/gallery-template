import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    data: [],
    galleryData: [],
    loading: 'idle',
    error: null,
    tag: [],
    chipList: [],
};

const fetchApiData = createAsyncThunk('api/fetchData', async () => {

    // const response = await fetch("https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=20");
    const response = await fetch("http://localhost:8000/photos")

    if (!response.ok) {
        throw new Error('Error in response');
    }
    const data = await response.json();
    return data;
});

const fetchGalleryData = createAsyncThunk('api/fetchGalleryData', async () => {

    // const response = await fetch("https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=20");
    const response = await fetch("http://localhost:8000/gallery")

    if (!response.ok) {
        throw new Error('Error in response');
    }
    const data = await response.json();
    return data;
});



const addApiData = createAsyncThunk('api/addData', async (data) => {
    const response = await fetch("http://localhost:8000/photos", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Error in response');
    }
    const responseData = await response.json();
    return responseData;
});

const addGalleryData = createAsyncThunk('api/galleryData', async (data) => {
    const response = await fetch("http://localhost:8000/gallery", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Error in response');
    }
    const responseData = await response.json();
    return responseData;
});



const deleteApiData = createAsyncThunk('api/deleteData', async (id) => {
    console.log('this is id ---.>>', id)
    const response = await fetch(`http://localhost:8000/photos/${id}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        throw new Error('Error in response');
    }
    const data = await response.json();
    return data;
});

const deleteGalleryData = createAsyncThunk('api/deleteGalleryData', async (id) => {
    const response = await fetch(`http://localhost:8000/gallery/${id}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        throw new Error('Error in response');
    }
    const data = await response.json();
    return data;
});

const updateLocalDataSize = createAsyncThunk('api/updateItemHeight', async ({ id, height }) => {
    try {
        const response = await fetch(`http://localhost:8000/photos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ height }),
        });

        if (!response.ok) {
            throw new Error('Error in response');
        }
        return { id, height };
    } catch (error) {
        throw error;
    }
});

const updateDisabledState = createAsyncThunk('api/updateDisableState', async ({ id, disabled }) => {
    try {
        const response = await fetch(`http://localhost:8000/photos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ disabled }),
        });

        if (!response.ok) {
            throw new Error('Error in response');
        }
        return { disabled };
    } catch (error) {
        throw error;
    }
});

const StoreChipList = createAsyncThunk('api/updateChipList', async ({ id, data }) => {
    try {
        const response = await fetch(`http://localhost:8000/photos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        });

        if (!response.ok) {
            throw new Error('Error in response');
        }
        return { id, data };
    } catch (error) {
        throw error;
    }
});


const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        addLocalData: (state, action) => {
            state.tag = [...state.tag, action.payload]
        },
        deleteLocalData: (state, action) => {
            state.tag = state.tag.filter((items, index) => {
                return (items.tag !== action.payload)
            })
        },
        deleteCurrData: (state, action) => {
            state.data = state.data.filter((item, ind) => item.tag !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiData.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(fetchApiData.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchApiData.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            })
            //fetch gallery data
            .addCase(fetchGalleryData.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(fetchGalleryData.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.galleryData = action.payload;
            })
            .addCase(fetchGalleryData.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            })

            //add data
            .addCase(addApiData.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(addApiData.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.data = action.payload;
            })
            .addCase(addApiData.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            })
            //delete api
            .addCase(deleteApiData.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(deleteApiData.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.data = state.data.filter(items => items.id !== action.payload)
            })
            .addCase(deleteApiData.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            })

            //updateHeightOfItem
            .addCase(updateLocalDataSize.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(updateLocalDataSize.fulfilled, (state, action) => {
                const { id, height } = action.payload;
                const updatedData = state.data.map((item) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            height: height,
                        };
                    }
                    return item;
                });
                state.data = updatedData;
                state.loading = 'succeeded';
            })
            .addCase(updateLocalDataSize.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            })


            //update disabled state
            .addCase(updateDisabledState.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(updateDisabledState.fulfilled, (state, action) => {
                const { id, disabled } = action.payload;
                const updatedData = state.data.map((item) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            disabled: disabled,
                        };
                    }
                    return item;
                });
                state.data = updatedData;
                state.loading = 'succeeded';
            })
            .addCase(updateDisabledState.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            })
            ////StoreChipList
            .addCase(StoreChipList.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(StoreChipList.fulfilled, (state, action) => {
                const { id, data } = action.payload;
                const updatedData = state.data.map((item) => {
                    if (item.id === id) {
                        return {
                            ...item, data: [...item.data, ...data],
                        };
                    }
                    return item;
                });

                state.data = updatedData;
                state.loading = 'succeeded';
            })
            .addCase(StoreChipList.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            })


            //add gallery data
            .addCase(addGalleryData.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(addGalleryData.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.galleryData = action.payload;
            })
            .addCase(addGalleryData.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            })
            //delete gallery data
            .addCase(deleteGalleryData.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(deleteGalleryData.fulfilled, (state, action) => {
                state.loading = 'succeeded';

                state.galleryData = state.galleryData.filter(item => item.id !== action.payload)
            })
            .addCase(deleteGalleryData.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            })

    },
});

export const { addLocalData, deleteLocalData, deleteCurrData, updateChipList } = apiSlice.actions;
export { fetchApiData, fetchGalleryData, deleteApiData, addApiData, addGalleryData, deleteGalleryData, updateLocalDataSize, updateDisabledState, StoreChipList };
export default apiSlice.reducer;