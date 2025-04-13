import React from 'react'
import { Routes,Route,} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/Navbar'
import Contact from './pages/Contact'
import Cart from './pages/Cart'

import Login from './pages/Login'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Collection from './pages/Collection'
import Footer from './components/Footer'
import Serachbar from './components/Serachbar'
import Product from './pages/Product'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import ScrollToTop from './components/Scrolltotop'

const App = () => {
  return (
    <div className='px-4 sm:px-10 md:px-16 lg:px-28'>
      <ToastContainer position="top-center" autoClose={2000} />
        <Navbar/>
        <Serachbar/>
        <ScrollToTop/>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/products/:productId' element={<Product />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/place-order' element={<PlaceOrder/>}/>
            <Route path='/collection' element={<Collection/>}/>
            <Route path='/verify' element={<Verify/>}/>
        </Routes>
        <Footer/>         
      
    </div>
  )
}

export default App
