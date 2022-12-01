import { useAppDispatch } from '../hook/hooks'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import 'yup-phone'
import * as yup from 'yup'

import { Button, Box, TextField } from '@mui/material'
import { createUser, getUsers } from '../store/users/usersSlice'
import { IUser } from '../models/IUser'

type CreateUserProps = {
	onClose: () => void
}

const schema = yup
	.object({
		name: yup.string().required(),
		email: yup.string().required().email(),
		phone: yup.string().phone().required(),
		website: yup.string().required().url(),
		company: yup.string().required(),
	})
	.required()
const CreateUserForm: React.FC<CreateUserProps> = ({ onClose }) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<IUser>({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			website: '',
			company: '',
		},
	})

	const dispatch = useAppDispatch()

	const handleCreateUser: SubmitHandler<IUser> = (data) => {
		dispatch(createUser(data)).then((res) => {
			dispatch(getUsers())
			onClose()
		})

		reset()
	}

	return (
		<>
			<form onSubmit={handleSubmit(handleCreateUser)}>
				<Box
					p={3}
					sx={{ textAlign: 'center' }}>
					<Box my={2}>
						<Controller
							name='name'
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label='Name'
									error={Boolean(errors.name)}
									helperText={errors.name?.message}
								/>
							)}
						/>
					</Box>

					<Box my={2}>
						<Controller
							name='email'
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label='Email'
									error={Boolean(errors.email)}
									helperText={errors.email?.message}
								/>
							)}
						/>
					</Box>

					<Box my={2}>
						<Controller
							name='phone'
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label='Phone'
									error={Boolean(errors.phone)}
									helperText={errors.phone?.message}
								/>
							)}
						/>
					</Box>

					<Box my={2}>
						<Controller
							name='website'
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label='Website'
									error={Boolean(errors.website)}
									helperText={errors.website?.message}
								/>
							)}
						/>
					</Box>

					<Box my={2}>
						<Controller
							name='company'
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label='Company'
									error={Boolean(errors.company)}
									helperText={errors.company?.message}
								/>
							)}
						/>
					</Box>

					<Button
						variant='contained'
						type='submit'>
						Create
					</Button>
				</Box>
			</form>
		</>
	)
}

export default CreateUserForm
