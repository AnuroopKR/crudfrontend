import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate=useNavigate()
  const [name, setName] = useState<string>('');
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");


  const [nameError,setNameError]=useState<string|null>(null);
  const [emailError,setEmailError]=useState<string|null>(null);
  const [passwordError,setPasswordError]=useState<string|null>(null);

  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'email') {
      setEmail(value);
    } else if (id === 'name') {
      setName(value);
    } else if (id === 'password') {
      setPassword(value);
    }

    if (!name) {
      setNameError('Name is required')
    } else if (!nameRegex.test(name)) {
      setNameError('Name can only contain letters and spaces')
    }else{
      setNameError(null)
    }

    if (!email) {
      setEmailError('email is required')
    } else if (!emailRegex.test(email)) {
      setEmailError('Enter a valid email address')
    }else{
      setEmailError(null)
    }

    if (!password) {
      setPasswordError('password is required')
    } else if (!passwordRegex.test(password)) {
      setPasswordError('enter valied password')
    }else{
      setPasswordError(null)

    }
  };
  


  const handleSignup=async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(nameError||emailError||passwordError){
      return
    }
    
    const postData = {
      name,
      email,
      password
    };
    axios.defaults.withCredentials = true;  
    await axios.post('http://localhost:3000/api/userSignup', postData)
      .then(response => {
        if(response.data.signup){
          navigate('/user/home')
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
            Signup
          </h1>
          <form action="#" method="post" className="space-y-4" onSubmit={handleSignup}>
          <div>
              <label className="mb-2  dark:text-gray-400 text-lg">Name</label>
              <input
                id="name"
                className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="text"
                onChange={(e)=>handleChange(e)}
                placeholder="Name"
                required
              />
              {nameError&&<p className='text-red-500'>{nameError}</p>}
            </div>
            <div>
              <label className="mb-2  dark:text-gray-400 text-lg">Email</label>
              <input
                id="email"
                className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="email"
                onChange={(e)=>handleChange(e)}
                placeholder="Email"
                required
              />
               {emailError&&<p className='text-red-500'>{emailError}</p>}
            </div>
            <div>
              <label  className="mb-2 dark:text-gray-400 text-lg">Password</label>
              <input
                id="password"
                className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                onChange={(e)=>handleChange(e)}
                placeholder="Password"
                required
              />
               {passwordError&&<p className="text-red-500">
        {passwordError}
      </p>}
            </div>
            <a
              className="group text-blue-400 transition-all duration-100 ease-in-out"
              href="#"
            >
              {/* <span
                className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
              >
                Forget your password?
              </span> */}
            </a>
            <button
              className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              type="submit"
            >
              SIGN UP 
            </button>
          </form>
          <div className="flex flex-col mt-4 items-center justify-center text-sm">
            <h3 className="dark:text-gray-300">
              Do you have an account?
              <button
                className="group text-blue-400 transition-all duration-100 ease-in-out"
              onClick={()=>navigate("/user/login")}>
                <span
                  className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                >
                  Login
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

export default Signup
