import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
import { UserTypes } from '../../types'
import { handleError, handleSuccess } from '../../utils/notifications'


const initialState = {
    isLoading: false,
    isError: false,
    data: {}
}

export const signup = createAsyncThunk("signup", async (input: UserTypes) => {
    try {
        const response = await axios.post("/user/signup", input, { withCredentials: true })


        if (response.data.success) {
            handleSuccess(response.data.message);
            setTimeout(() => {
                window.location.replace("/login")
            }, 1000)

        }
        else {
            handleError(response.data.response.data.message)
        }

    } catch (error: any) {
        handleError(error.response.data.message)
    }
});

export const login = createAsyncThunk("login", async (input: UserTypes) => {
    try {
        const response = await axios.post("/user/login", input, { withCredentials: true })


        if (response.data.success) {
            handleSuccess(response.data.message);
            setTimeout(() => {
                window.location.replace("/")
            }, 1000)

        }
        else {
            handleError(response.data.response.data.message)
        }

    } catch (error: any) {
        handleError(error.response.data.message)
    }
});

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state, action) => {
            state.isLoading = true
        }).addCase(signup.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(signup.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true;
        })
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true
        }).addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true;
        })
    }
})



export default userSlice.reducer;