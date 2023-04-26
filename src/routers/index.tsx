import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from 'components/Layout'

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
						<Layout>
							<Home />
						</Layout>
					</Suspense>
				}
			/>
			<Route
				path="/users"
				element={
					<Suspense>
						<Layout>
							<Users />
						</Layout>
					</Suspense>
				}
			/>
				<Route
				path="/user/:id"
				element={
					<Suspense>
						<Layout>
							<UserDetail />
						</Layout>
					</Suspense>
				}
			/>
			<Route
				path="/exercise"
				element={
					<Suspense>
						<Layout>
							<Exercise />
						</Layout>
					</Suspense>
				}
			/>
				<Route
				path="/study"
				element={
					<Suspense>
						<Layout>
							<Study />
						</Layout>
					</Suspense>
				}
			/>
		</Routes>
	)
}

export default AppRouter