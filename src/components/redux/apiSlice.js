import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    loading: 'idle',
    error: null,
    tag: [],
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

const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        updateLocalData : (state,action)=>{
            state.tag =[...state.tag,action.payload]
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
                state.data = action.payload;
            })
            .addCase(deleteApiData.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            });
    },
});

export const {updateLocalData} = apiSlice.actions;
export { fetchApiData, deleteApiData, addApiData };
export default apiSlice.reducer;
