import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [userName,setUserName]=useState<string|null>(null)
    const [password,setPassword]=useState<string|null>(null)
    const [errorMessage,setErrorMessage]=useState<string|null>(null)
    const navigate=useNavigate()

    const handleSubmit=async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const postData = {
            userName,
            password
          };
          axios.defaults.withCredentials = true;  
          await axios.post('http://localhost:3000/admin/login', postData)
            .then(response => {
              if(response.data.valied){
                navigate("/admin/dashboard")
              }else{
                setErrorMessage("invalied credential")
              }
            })
            .catch(error => {
              console.error('There was an error making the POST request!', error);
            });
    }
    

    useEffect(()=>{
        const fetchProtectedData = async () => {
          try {
            axios.defaults.withCredentials = true;  
      
            const response = await axios.get('http://localhost:3000/admin/adminAuth', {
            });
            if(response.data.valied){
              navigate("/user/home")
            }
          } catch (error) {
            console.error('Error fetching protected data:', error);
          }
        };
      
        fetchProtectedData()
      
      },[])

  return (
    <div>
      <div className="py-20">
    <div className="flex h-full items-center justify-center">
        <div
            className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
            <div className="flex h-full flex-col justify-center gap-4 p-6">
                <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
                    <form className="flex flex-col gap-4 pb-4" onSubmit={handleSubmit}>
                        <h1 className="mb-4 text-2xl font-bold  dark:text-white">Login</h1>
                        <div>
                            <div className="mb-2">
                                <label className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >Email:</label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                    <input onChange={(e)=>setUserName(e.target.value)} className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                        id="email" type="email" name="email" placeholder="email@example.com"
                                        />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2">
                                <label className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                    data-testid="flowbite-label" >Password</label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                    <input onChange={(e)=>setPassword(e.target.value)} className="block w-full border disabled:cursor-not-allowed disabled:opacity-50
                                     bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500
                                      focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                                       dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                        id="password" type="password" name="password" />
                                </div>
                            </div>
                            {errorMessage&&<p className='text-red-500'>{errorMessage}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <button type="submit"
                                className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg ">
                                <span
                                    className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                    Login
                                </span>
                            </button>
                            
                           
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
</div>

    </div>
  )
}

export default AdminLogin
