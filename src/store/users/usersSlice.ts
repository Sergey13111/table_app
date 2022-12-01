import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import usersService from '../services/usersService'
import { IUser } from '../../models/IUser'

interface UsersSliceState {
	users: IUser[] | null
	isLoading: boolean
	error: string | undefined | null
}

export const getUsers = createAsyncThunk<IUser[], undefined>(
	'USERS',
	async (_, { rejectWithValue }: any) => {
		try {
			return await usersService.getUsers()
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const createUser = createAsyncThunk<IUser, IUser>(
	'CREATE_USER',
	async (userData, { rejectWithValue }) => {
		try {
			return await usersService.createUser(userData)
		} catch (error: any) {
			return rejectWithValue(error.massage)
		}
	}
)

const initialState: UsersSliceState = {
	users: null,
	isLoading: false,
	error: null,
}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUsers.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(getUsers.fulfilled, (state, action) => {
			state.isLoading = false
			state.users = action.payload
		})
		builder.addCase(getUsers.rejected, (state, action) => {
			state.isLoading = false
			state.users = null
			state.error = action.error.message
		})

		builder.addCase(createUser.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(createUser.fulfilled, (state: any, action) => {
			state.isLoading = false
			state.users && state.users.push(action.payload)
			state.users = action.payload
		})
		builder.addCase(createUser.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.error.message
		})
	},
})

export default usersSlice.reducer
