import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from 'components/Layout'
import PrivateRouter from './privateRouter'


const SignIn = lazy(() => import('../pages/Signin'))
const SignUp = lazy(() => import('../pages/SignUp'))
const Home = lazy(() => import('../pages/index'))
const Users = lazy(() => import('../pages/Users'))
const Ticket = lazy(() => import('../pages/Ticket'))
const Movies = lazy(() => import('../pages/Movies'))
const Cinemas = lazy(() => import('../pages/Cinemas'))
const Screenings = lazy(() => import('../pages/Screenings'))
const Bookings = lazy(() => import('../pages/Bookings'))
const Reviews = lazy(() => import('../pages/Reviews'))

const AppRouter = () => {
	return (
		<Routes>
			<Route>
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
			</Route>
			<Route
				path="/"
				element={
					<Suspense>
					 <PrivateRouter >
						<Layout>
							<Home />
						</Layout>
						</PrivateRouter>
					</Suspense>
				}
			/>
			<Route
				path="/users"
				element={
					<Suspense>
						 <PrivateRouter >
						<Layout>
							<Users />
						</Layout>
						</PrivateRouter>
					</Suspense>
				}
			/>
			<Route
				path="/tickets"
				element={
					<Suspense>
						 <PrivateRouter >
						<Layout>
							<Ticket />
						</Layout>
						</PrivateRouter>
					</Suspense>
				}
			/>
			<Route
				path="/movies"
				element={
					<Suspense>
						 <PrivateRouter >
						<Layout>
							<Movies />
						</Layout>
						</PrivateRouter>
					</Suspense>
				}
			/>
			<Route
				path="/screenings"
				element={
					<Suspense>
						 <PrivateRouter >
						<Layout>
							<Screenings />
						</Layout>
						</PrivateRouter>
					</Suspense>
				}
			/>
			<Route
				path="/bookings"
				element={
					<Suspense>
						 <PrivateRouter >
						<Layout>
							<Bookings />
						</Layout>
						</PrivateRouter>
					</Suspense>
				}
			/>
			<Route
				path="/cinemas"
				element={
					<Suspense>
						 <PrivateRouter >
						<Layout>
							<Cinemas />
						</Layout>
						</PrivateRouter>
					</Suspense>
				}
			/>
			<Route
				path="/reviews"
				element={
					<Suspense>
						 <PrivateRouter >
						<Layout>
							<Reviews />
						</Layout>
						</PrivateRouter>
					</Suspense>
				}
			/>
		</Routes>
	)
}

export default AppRouter
