import axios from '../../helpers/axios'
import { IUser } from '../../models/IUser'

const getUsers = async () => {
	const users = await axios.get<IUser[]>('/users')
	return users
}

const createUser = async (userData: IUser) => {
	const user = await axios.post('/users', userData)
	return user.data
}

const usersService = {
	getUsers,
	createUser,
}

export default usersService
