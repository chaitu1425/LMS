import React from 'react'
import { Navigate, Route , Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
export const serverUrl="http://localhost:8000"
import { ToastContainer } from 'react-toastify';
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import Forgotpass from './pages/Forgotpass'
import EditProfile from './pages/EditProfile'
function App() {
  getCurrentUser()
  const {userData} = useSelector(state=>state.user)
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={!userData ? <Signup/> : <Navigate to={"/"} />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={ userData ? <Profile/> : <Navigate to={"/signup"}/>}/>
        <Route path='/forgot' element={ userData ? <Forgotpass/> : <Navigate to={"/signup"}/>}/>
        <Route path='/editprofile' element={ userData ? <EditProfile/> : <Navigate to={"/signup"}/>}/>

      </Routes> 
    </>
  )
}

export default App