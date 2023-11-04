import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { handleError, handleSuccess } from '../../utils/notifications';
import { myListing } from '../../types/index'

const initialState = {
    isLoading: false,
    isError: false,
    data: {},
    myListing: [],
    allListings: []
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


export const getmyListings = createAsyncThunk("getmyListings", async () => {
    try {

        const response = await axios.get("/listing/my", { withCredentials: true });
        return response.data;
    } catch (error: any) {
        handleError(error.response.data.message)
    }
})


export const deleteListing = createAsyncThunk("deleteListing", async (id: string) => {
    try {
        const response = await axios.delete(`/listing/${id}`, { withCredentials: true })


        if (response.data.success) {
            handleSuccess(response.data.message);
            setTimeout(() => {
                window.location.replace("/profile");
            }, 1000)
        }
        else {
            handleError(response.data.response.data.message)
        }

    } catch (error: any) {
        handleError(error.response.data.message)
    }
})

export const getAllListing = createAsyncThunk("getAllListing", async () => {
    try {
        const response = await axios.get("/listing", { withCredentials: true });
        return response.data;
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
        builder.addCase(getmyListings.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getmyListings.fulfilled, (state, action) => {
            state.isLoading = false;
            state.myListing = action.payload;
        }).addCase(getmyListings.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
        builder.addCase(deleteListing.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(deleteListing.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(deleteListing.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
        builder.addCase(getAllListing.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getAllListing.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allListings = action.payload;
        }).addCase(getAllListing.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})


export default listingSlice.reducer;