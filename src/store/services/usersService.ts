import axios from '../../helpers/axios'

type User = {
	id: number
	name: string
	nickName: string
	phone: string
	website: string
	company: string
}

const getUsers = async () => {
	const users = await axios.get<User[]>('/users')
	return users
}

const createUser = async (userData: any) => {
	const user = await axios.post('/users', userData)

	console.log(user.data)
	return user.data
}

const usersService = {
	getUsers,
	createUser,
}

export default usersService
