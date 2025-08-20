import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import Card from '../component/Card';

function MyEnrolledCourse() {
    const {userData} = useSelector(state=>state.user)
    const navigate = useNavigate()

  return (
    <div className='min-h-screen w-full px-4 py-9 bg-gray-50'>
        <FaArrowLeftLong className='absolute top-[3%] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/")}/>
        <h1 className='text-3xl text-center font-bold text-gray-800 mb-6'>My Enrolled Courses</h1>

        {
            userData?.enrolledcourse?.length === 0 ?(
                <p className='text-gray-500 text-center w-full'>You haven't enrolled in any course yet.</p>
            ):(
                <div className='flex items-center justify-center flex-wrap gap-[30px]'>
                    {
                        userData?.enrolledcourse?.map((course,index)=>(
                            <div key={index} className='bg-white rounde-2xl shadow-md overflow-hidden border'>
                                <img src={course?.thumbnail} alt="" className='w-[200px] h-40 object-cover' />
                            </div>
                        ))
                    }
                </div>
            )
        }
    </div>
  )
}

export default MyEnrolledCourse