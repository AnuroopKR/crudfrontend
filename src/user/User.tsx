import React from 'react'
import { Routes,Route} from 'react-router-dom'

import Header from './Header'
import Login from './Login'
import Home from './Home'
import Signup from './Signup'
import ProfileEdit from './ProfileEdit'

const User = () => {
  return (
    <div>
      <Header/>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/editProfile' element={<ProfileEdit/>}/>

      </Routes>

    </div>
  )
}

export default User
