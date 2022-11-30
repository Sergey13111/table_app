import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StringDecoder } from 'string_decoder'

import usersService from '../services/usersService'

type User = {
	id: number
	name: string
	emaile: string
	phone: string
	website: string
	company: string
}
interface UsersSliceState {
	users: User[] | null
	// isError: boolean
	isLoading: boolean
	// message: string | null
}

export const getUsers = createAsyncThunk('USERS', async (_, thunkAPI) => {
	try {
		return await usersService.getUsers()
	} catch (error: any) {
		// return thunkAPI.rejectWithValue(error.response)
		return thunkAPI.rejectWithValue('error')
	}
})

export const createUser = createAsyncThunk<User, StringDecoder>(
	'CREATE_USER',
	async (userData, thunkAPI) => {
		try {
			return await usersService.createUser(userData)
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response)
		}
	}
)

const initialState: UsersSliceState = {
	users: [],
	// isError: false,
	isLoading: false,
	// message: '',
}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUsers.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(getUsers.fulfilled, (state, action: any) => {
			state.isLoading = false
			state.users = action.payload
		})
		builder.addCase(getUsers.rejected, (state) => {
			state.isLoading = false
			// state.isError = true
			// state.message = action.payload.message
			state.users = null
		})

		builder.addCase(createUser.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(createUser.fulfilled, (state: any, action) => {
			state.isLoading = false
			state.users.push(action.payload)
			state.users = action.payload
		})
		builder.addCase(createUser.rejected, (state) => {
			state.isLoading = false
			// state.isError = true
		})
	},
})

export default usersSlice.reducer
