import Header from 'components/header/Header'
import Footer from 'components/footer/Footer'
import Router from 'routes/Router'
import { Box } from '@mui/material'
import './App.scss'

const App = () => {
  return (
    <Box className="flex flex-col min-h-screen">
      <Header />
      <Box className="flex-1">
        <Router />
      </Box>
      <Footer />
    </Box>

  )
}

export default App
