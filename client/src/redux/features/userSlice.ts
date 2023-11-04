import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
import { UserTypes } from '../../types'
import { handleError, handleSuccess } from '../../utils/notifications'


const initialState = {
    isLoading: false,
    isError: false,
    data: {},
    myDetails: {}
}

export const getDetails = createAsyncThunk("getDetails", async () => {
    try {
        const response = await axios.get("/user/getProfile", { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log("Unable to get profile")
    }
})

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
            localStorage.setItem("UserId", response.data.User)
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

export const logout = createAsyncThunk('logout', async () => {
    try {
        const response = await axios.post("/user/logout", {}, { withCredentials: true })


        if (response.data.success) {
            handleSuccess(response.data.message);
            localStorage.removeItem("UserId")
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
})

export const updateProfile = createAsyncThunk('updateProfile', async (formData: any) => {
    try {
        const response = await axios.put("/user/updateProfile", formData, { withCredentials: true })


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
})
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
        builder.addCase(logout.pending, (state, action) => {
            state.isLoading = true
        }).addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(logout.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true; getDetails
        })
        builder.addCase(getDetails.pending, (state, action) => {
            state.isLoading = true
        }).addCase(getDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.myDetails = action.payload;
        }).addCase(getDetails.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true;
        })
        builder.addCase(updateProfile.pending, (state, action) => {
            state.isLoading = true
        }).addCase(updateProfile.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(updateProfile.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true;
        })
    }
})



export default userSlice.reducer;