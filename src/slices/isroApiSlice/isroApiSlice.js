import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    spaceCrafts: null,
    launchers: null,
    customerSatellites: null,
    centres: null
}

export const getSpaceCrafts = createAsyncThunk(
    "isroapi/spaceCrafts",
    async (only10, thunkAPI) => {
        try {
            const res = await fetch('https://isro.vercel.app/api/spacecrafts')
            const data = await res.json()
            if (only10 === true) {
                return data.spacecrafts.slice(0, 10)
            }
            return data.spacecrafts
        } catch (error) {
            return thunkAPI.rejectWithValue("Some error occured!")
        }
    }
)
export const getLaunchers = createAsyncThunk(
    "isroapi/launchers",
    async (only10, thunkAPI) => {
        try {
            const res = await fetch('https://isro.vercel.app/api/launchers')
            const data = await res.json()
            if (only10 === true) {
                return data.launchers.slice(0, 10)
            }
            return data.launchers
        } catch (error) {
            return thunkAPI.rejectWithValue("Some error occured!")
        }
    }
)
export const getCustomerSatellites = createAsyncThunk(
    "isroapi/customer_satellites",
    async (only10, thunkAPI) => {
        try {
            const res = await fetch('https://isro.vercel.app/api/customer_satellites')
            const data = await res.json()

            if (only10 === true) {
                return data.customer_satellites.slice(0, 10)
            }
            return data.customer_satellites
        } catch (error) {
            return thunkAPI.rejectWithValue("Some error occured!")
        }
    }
)
export const getCentres = createAsyncThunk(
    "isroapi/centres",
    async (only10, thunkAPI) => {
        try {
            const res = await fetch('https://isro.vercel.app/api/centres')
            const data = await res.json()
            if (only10 === true) {
                return data.centres.slice(0, 10)
            }
            return data.centres
        } catch (error) {
            return thunkAPI.rejectWithValue("Some error occured!")
        }
    }
)

const isroApiSlice = createSlice({
    name: 'isroapi',
    initialState,
    reducers: {},
    extraReducers: {
        [getSpaceCrafts.fulfilled]: (state, action) => {
            state.spaceCrafts = action.payload
        },
        [getLaunchers.fulfilled]: (state, action) => {
            state.launchers = action.payload
        },
        [getCustomerSatellites.fulfilled]: (state, action) => {
            state.customerSatellites = action.payload
        },
        [getCentres.fulfilled]: (state, action) => {
            state.centres = action.payload
        }
    }
})

export default isroApiSlice.reducer