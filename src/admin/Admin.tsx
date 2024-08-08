import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateUser from './CreateUser'
import Dashboard from './Dashboard'
import AdminLogin from './AdminLogin'
import EditUser from './EditUser'
import Header from './Header'

const Admin = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='createUser' element={<CreateUser/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='adminlogin' element={<AdminLogin/>}/>
        <Route path='editUser' element={<EditUser/>}/>

      </Routes>
    </div>
  )
}

export default Admin
