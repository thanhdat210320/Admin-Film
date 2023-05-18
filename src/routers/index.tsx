import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from 'components/Layout'
import PrivateRouter from './privateRouter'

const SignIn = lazy(() => import('../pages/Signin'))
const SignUp = lazy(() => import('../pages/SignUp'))
const Home = lazy(() => import('../pages/index'))
const Users = lazy(() => import('../pages/Users'))
const Exercise = lazy(() => import('../pages/Exercise'))
const Study = lazy(() => import('../pages/Study'))
const UserDetail = lazy(() => import('../pages/UserDetail'))

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
				path="/user/:id"
				element={
					<Suspense>
						<PrivateRouter>
						<Layout>
							<UserDetail />
						</Layout>
						</PrivateRouter>
					</Suspense>
				}
			/>
			<Route
				path="/exercise"
				element={
					<Suspense>
						<PrivateRouter>
						<Layout>
							<Exercise />
						</Layout>
						</PrivateRouter>
					</Suspense>
				}
			/>
				<Route
				path="/study"
				element={
					<Suspense>
						<PrivateRouter>
						<Layout>
							<Study />
						</Layout>
						</PrivateRouter>
					</Suspense>
				}
			/>
		</Routes>
	)
}

export default AppRouter