import '@fullcalendar/core/vdom'
import 'assets/js/app'
import AppRouter from 'routers'
import BreadcrumbProvider from 'contexts/breadcrumb'
import { ThemeProvider } from 'contexts/theme'

function App() {
	return (
		<BreadcrumbProvider>
			<ThemeProvider>
					<AppRouter />
			</ThemeProvider>
		</BreadcrumbProvider>
	)
}

export default App
