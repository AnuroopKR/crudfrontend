import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../utils/store';

const Header = () => {
  interface User {
    _id: string;
    username:string;
    email:string
  }

  const user = useSelector((state: RootState) => state.user as unknown as User);
  const [value,setValue]=useState<any>([])


  const logout=()=>{
    axios.get('http://localhost:3000/api/logout')
  .then(response => {
    if(response){
    navigate('/user/login')
    setValue(null)
    }
  })
  .catch(error => {
    console.error('Error making GET request:', error);
  })
  }
  const navigate=useNavigate()

  useEffect(() => {
   
      setValue(user);
    
  }, [user])

  return (
    <div className='bg-gradient-to-r from-blue-500 to-purple-500 h-20 flex justify-between '>
      <div className=' text-red-500 text-2xl p-5'>
      <h1 className='text-'>hello dev</h1>
      </div>
      <div className='flex'>
        {/* <div className='p-7 text-white ' onClick={()=>navigate('/user/editProfile')}>
          edit profile
        </div> */}
      {value&&
        <div onClick={logout} className='w-14 h-14 rounded-full bg-red-500 m-3 mr-8 text-white flex text-center pt-4'>
          Logout
        </div>
      }
      </div>
    </div>
  )
}



export default Header;
 