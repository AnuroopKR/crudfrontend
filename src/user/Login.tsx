import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const navigate=useNavigate()
const [email,setEmail]=useState<string>('')
const [password,setPassword]=useState<string>('')

const [errorMessage,setErrorMessage]=useState<string|null>(null)


const handleSubmit=async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if(!email||!password){
    setErrorMessage("invalied credential")
    return
  }
  
  const postData = {
    email,
    password
  };
  axios.defaults.withCredentials = true;  
  await axios.post('http://localhost:3000/api/userLogin', postData)
    .then(response => {
      if(response.data.valied){
        navigate("/user/home")
      }else{
        setErrorMessage("incorrect username or password")
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

      const response = await axios.get('http://localhost:3000/api/userAuth', {
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
    <div className="h-screen w-screen flex justify-center items-center dark:bg-gray-900">
    <div className="grid gap-8">
      <div
        id="back-div"
        className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4"
      >
        <div
          className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2"
        >
          <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default">
            Log in
          </h1>
          <form action="#" method="post" className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2  dark:text-gray-400 text-lg">Email</label>
              <input
                id="email"
                className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="email"
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label  className="mb-2 dark:text-gray-400 text-lg">Password</label>
              <input
                id="password"
                className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
              {errorMessage&&
              <p className='text-red-500'>{errorMessage}</p>
              }           
            <button
              className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              type="submit"
            >
              LOG IN
            </button>
          </form>
          <div className="flex flex-col mt-4 items-center justify-center text-sm">
            <h3 className="dark:text-gray-300">
              Don't have an account?
              <button
                className="group text-blue-400 transition-all duration-100 ease-in-out"
              onClick={()=>navigate("/user/signup")}>
                <span
                  className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                >
                  Sign Up
                </span>
              </button>
            </h3>
          </div>
          

         
        </div>
      </div>
      </div>
    </div>
  )
}

export default Login
