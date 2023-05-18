import '@fullcalendar/core/vdom'
import AuthProvider from 'contexts/auth'
import 'assets/js/app'
import AppRouter from 'routers'
import BreadcrumbProvider from 'contexts/breadcrumb'
import { ThemeProvider } from 'contexts/theme'

function App() {
	return (
		<AuthProvider>
			<BreadcrumbProvider>
				<ThemeProvider>
					<AppRouter />
				</ThemeProvider>
			</BreadcrumbProvider>
		</AuthProvider>
	)
}

export default App
