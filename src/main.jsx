import { BrowserRouter } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
