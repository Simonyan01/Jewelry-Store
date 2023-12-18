import Footer from 'components/footer/Footer'
import Header from 'components/header/Header'
import Router from 'routes/Router'
import './i18n.js'
import './App.scss'

const App = () => {
  return (
    <>
      <Header />
      <Router />
      <Footer />
    </>
  )
}

export default App
