import React, { useState } from 'react'
import logo from "../assets/logo.png"
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

function Nav() {
  const { userData } = useSelector(state=>state.user) 
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [show, Setshow] = useState(false)

  const handlelogout =async ()=>{
    try {
      await axios.get(serverUrl + '/api/auth/logout', {withCredentials:true})
      dispatch(setUserData(null))
      toast.success("Logout Successfully")
    } catch (error) {
      toast.error(error.response.data.message)
      
    }
  }
  return (
    <div >
        <div className='w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10' >
            <div className='lg:w-[20%] w-[40%] lg:pl-[50px]'>
                <img src={logo} alt="" className='w-[80px] rounded-[5px] border-2 border-white cursor-pointer' />
            </div>
            <div className='w-[30%] lg:flex items-center justify-center gap-4'>
                  {!userData && <IoPersonCircle className='w-[50px] h-[50px] fill-[#5d8452] cursor-pointer' onChange={()=>Setshow(prev=>!prev)} />}
                  {userData && <div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer' onClick={()=>Setshow(prev=>!prev)} >{userData?.name.slice(0,1).toUpperCase()}</div>}
                  {userData?.role === "educator" && <div className='px-[20px] py-[10px] border-2 border-white text-white bg-[#5d8452] rounded-[10px] text-[18px] font-light cursor-pointer'>Dasboard</div>}
                  {!userData? <span className='px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#5d8452]' onClick={()=>navigate("/login")}>Login</span>:
                  <span className='px-[20px] py-[10px] bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer' onClick={handlelogout}>LogOut</span>}
                  {show && <div className='absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-[white] px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white cursor-pointer hover:bg-black '>
                  <span className='bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600'>My Profile</span>
                  <span className='bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600'>My Course</span>
                </div>}
            </div>

        </div>
    </div>
  )
}

export default Nav