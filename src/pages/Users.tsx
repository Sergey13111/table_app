import { useAppDispatch, useAppSelector } from '../hook/hooks'
import { useEffect, useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Dialog,
	DialogTitle,
	Container,
	Typography,
	Box,
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { getUsers } from '../store/users/usersSlice'
import CreateUserForm from '../components/CreateUserForm'

const Users: React.FC = () => {
	const dispatch = useAppDispatch()

	const { users, isLoading } = useAppSelector((state) => state.users)

	const [isDialogOpen, setDialogOpen] = useState(false)

	useEffect(() => {
		dispatch(getUsers())
	}, [dispatch])

	if (isLoading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
				<CircularProgress />
			</Box>
		)
	}

	const handleDialogOpen = () => {
		setDialogOpen(true)
	}
	const handleDialogClose = () => {
		setDialogOpen(false)
	}

	return (
		<>
			<Container maxWidth='xl'>
				<Typography
					sx={{ mt: 2 }}
					variant='h3'
					component='h1'
					align='center'>
					Users
				</Typography>
				<TableContainer
					sx={{ mt: 3, mb: 3 }}
					component={Paper}>
					<Table
						sx={{ minWidth: 650 }}
						aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontSize: 18, fontWeight: 600 }}>#</TableCell>
								<TableCell sx={{ fontSize: 18, fontWeight: 600 }}>Name</TableCell>
								<TableCell sx={{ fontSize: 18, fontWeight: 600 }}>Email</TableCell>
								<TableCell sx={{ fontSize: 18, fontWeight: 600 }}>Phone</TableCell>
								<TableCell sx={{ fontSize: 18, fontWeight: 600 }}>Website</TableCell>
								<TableCell sx={{ fontSize: 18, fontWeight: 600 }}>Company</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users &&
								users.map(({ id, name, email, phone, website, company }, index) => (
									<TableRow
										key={id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell
											component='th'
											scope='row'>
											{index + 1}
										</TableCell>
										<TableCell>{name}</TableCell>
										<TableCell>{email}</TableCell>
										<TableCell>{phone}</TableCell>
										<TableCell>{website}</TableCell>
										<TableCell>{company}</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
				<Box sx={{ textAlign: 'center' }}>
					<Button
						variant='outlined'
						size='large'
						onClick={handleDialogOpen}>
						Add new user
					</Button>
				</Box>

				<Dialog
					open={isDialogOpen}
					onClose={handleDialogClose}>
					<DialogTitle sx={{ fontWeight: 700, textAlign: 'center' }}>Create user</DialogTitle>
					<CreateUserForm onClose={handleDialogClose} />
				</Dialog>
			</Container>
		</>
	)
}

export default Users
