import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { handleError, handleSuccess } from '../../utils/notifications';


const initialState = {
    isLoading: false,
    isError: false,
    data: {},
}


export const addListing = createAsyncThunk("addListing", async (formData: any) => {
    try {
        const response = await axios.post("/listing/add", formData, { withCredentials: true })


        if (response.data.success) {
            handleSuccess(response.data.message);
            setTimeout(() => {
                window.location.replace("/");
            }, 1000)
        }
        else {
            handleError(response.data.response.data.message)
        }

    } catch (error: any) {
        handleError(error.response.data.message)
    }
})

export const updateListing = createAsyncThunk("updateListing", async ({ formData, id }: any) => {
    try {
        const response = await axios.put(`/listing/${id}`, formData, { withCredentials: true })


        if (response.data.success) {
            handleSuccess(response.data.message);
            setTimeout(() => {
                window.location.replace("/");
            }, 1000)
        }
        else {
            handleError(response.data.response.data.message)
        }

    } catch (error: any) {
        handleError(error.response.data.message)
    }
})



const listingSlice = createSlice({
    name: "listing",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(addListing.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(addListing.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(addListing.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
        builder.addCase(updateListing.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(updateListing.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(updateListing.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})


export default listingSlice.reducer;