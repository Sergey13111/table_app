import { useAppDispatch } from '../hook/hooks'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import 'yup-phone'
import * as yup from 'yup'

import { Button, Box, TextField } from '@mui/material'
import { createUser, getUsers } from '../store/users/usersSlice'

const schema = yup
	.object({
		name: yup.string().required(),
		emaile: yup.string().required().email(),
		phone: yup.string().phone().required(),
		website: yup.string().required().url(),
		company: yup.string().required(),
	})
	.required()
const CreateUserForm = ({ onClose }: any) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			emaile: '',
			phone: '+38',
			website: '',
			company: '',
		},
	})

	const dispatch = useAppDispatch()

	const handleCreateUser = (data: any) => {
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
									// error={errors.name}
									helperText={errors.name?.message}
								/>
							)}
						/>
					</Box>

					<Box my={2}>
						<Controller
							name='emaile'
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label='Emaile'
									// error={errors.nickName}
									helperText={errors.emaile?.message}
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
									// error={errors.phone}
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
									// error={errors.website}
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
									// error={errors.company}
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
