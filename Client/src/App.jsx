

import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen'
import Footer from './components/Footer'
import Hero from './components/Hero'
import LoginScreen from './screen/LoginScreen'
import RegisterScreen from './screen/RegisterScreen'
import BookScreen from './screen/BookScreen';
import ProfileScreen from './screen/ProfileScreen';
import AdminScreen from './screen/AdminScreen';

// import ReviewScreen from './screen/ReviewScreen'
// import Roomrate from './components/Roomrate';
 import RoomratingScreen from './screen/RoomratingScreen';


function App() {
  
  

  return (
    <div className='app'>
    <Navbar/>
    
    <BrowserRouter>
      <Routes>

        <Route path='/hero' element={<Hero />} />
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/' element={<Hero />} />
        <Route path='/home' element={<HomeScreen />} /> 
        <Route path='/login' element={<LoginScreen />} /> 
        <Route path='/register' element={<RegisterScreen />} /> 
        {/* <Route path='/review' element={<Roomrate />} />  */}
        <Route path='/roomrate/:roomId/:name' element={<RoomratingScreen />} /> 
        {/* <Route path='/reviews/:roomId/:userId' element={<ReviewScreen />} />  */}
        <Route path='/book/:roomid/:fromdate/:todate' element={<BookScreen />} /> 
        <Route path='/admin' element={<AdminScreen />} /> 

      </Routes>
    </BrowserRouter>
    <Footer/>
    
    </div>
  )
}

export default App
