

import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen'
import Footer from './components/Footer'
import Hero from './components/Hero'
import LoginScreen from './screen/LoginScreen'
import RegisterScreen from './screen/RegisterScreen'
import BookScreen from './screen/BookScreen';
import Profile from './components/Profile';
function App() {
  
  

  return (
    <div className='app'>
    <Navbar/>
    <BrowserRouter>
      <Routes>

        <Route path='/hero' element={<Hero />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/' element={<Hero />} />
        <Route path='/home' element={<HomeScreen />} /> 
        <Route path='/login' element={<LoginScreen />} /> 
        <Route path='/register' element={<RegisterScreen />} /> 
        <Route path='/book/:roomid/:fromdate/:todate' element={<BookScreen />} /> 
      </Routes>
    </BrowserRouter>
    <Footer/>
    
    </div>
  )
}

export default App
