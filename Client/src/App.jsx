

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
import Landingpage from './Landingpage';
import ExtraScreen from './screen/ExtraScreen';
import { UserProvider } from '../UserContext.jsx'
import RoomratingScreen from './screen/RoomratingScreen';


function App() {



  return (
    <div className='app'>
      <UserProvider>
        <Navbar />
        <BrowserRouter>
          <Routes>


            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/landing' element={<Landingpage />} />
            <Route path='/extra' element={<ExtraScreen />} />
            <Route path='/' element={<Landingpage />} />
            <Route path='/home' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/roomrate/:roomId' element={<RoomratingScreen />} />
            <Route path='/book/:roomid/:fromdate/:todate' element={<BookScreen />} />
            <Route path='/admin' element={<AdminScreen />} />

          </Routes>
        </BrowserRouter>
        <Footer />
      </UserProvider>
    </div>
  )
}

export default App
