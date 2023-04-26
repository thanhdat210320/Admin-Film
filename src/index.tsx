import { createRoot } from 'react-dom/client'
import './assets/css/app.css'
import App from 'App'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
	<BrowserRouter>
		<>
			<ToastContainer position="bottom-right"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
			/>
			<App />
		</>
	</BrowserRouter>
)
