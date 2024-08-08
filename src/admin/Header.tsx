import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addUserData } from '../utils/userDataSlice';

const Header = () => {
  const dispatch=useDispatch()

    const userData = useSelector((state: RootState) => state.userdata);
    const [value,setValue]=useState<any>([])
  
    const navigate=useNavigate()
    const logout=()=>{
      axios.get('http://localhost:3000/admin/logout')
      .then(response => {
        if(response){
          dispatch(addUserData(response.data.userData))
          setValue([])
        navigate('/admin/adminlogin')
          console.log(userData);
          
        }
      })
      .catch(error => {
        console.error('Error making GET request:', error);
      })
    }
    useEffect(() => {
      if (Array.isArray(userData)) {
        setValue(userData);
      }
    }, [userData])
    
  return (
    <div className='bg-slate-200 h-20 flex justify-between'>
      <div className='text-white text-4xl p-4 '>
        Admin
      </div>
      {value.length!=0&&
      <div className='py-6 px-10 text 2xl cursor-pointer' onClick={logout}>
        Logout
      </div>
      }
    </div>
  )
}

export default Header
