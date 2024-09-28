import Navbar from './Navbar/Navbar'
import './App.css'
import Footer from './Footer/Footer'
import { BrowserRouter } from 'react-router-dom'
import RouteName from './RouteName'
// import ScrollToTop from './ScrollToTop'
function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar />
      <RouteName />
    <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
