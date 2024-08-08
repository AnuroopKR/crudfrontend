import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [name,setName]=useState<string|null>(null)
  const [email,setEmail]=useState<string|null>(null)
  const [password,setPassword]=useState<string|null>(null)
  const [image,setImage]=useState<File|null>(null)
  const [imageUrl,setImageUrl]=useState<string|null>(null)
  const [errorMessage,setErrorMessage]=useState<string|null>(null)
const navigate=useNavigate()

const [nameError,setNameError]=useState<string|null>(null);
  const [emailError,setEmailError]=useState<string|null>(null);
  const [passwordError,setPasswordError]=useState<string|null>(null);

  const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/
  ;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      const file = e.target.files[0];
  
      setImageUrl(URL.createObjectURL(file));
  
    }
  };

  const handleSubmit=async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      setErrorMessage("Please select an image first")
      // alert('Please select an image first');
      return;
    }else{
      setErrorMessage(null)
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
  if(nameError||emailError||passwordError){
    return
  }
    const formData = new FormData();
  
    formData.append('image', image);
  
    console.log(formData);



    const data: {
      name: string | null;
      email: string | null;
      password: string | null;
    } = {
      name,
      email,
      password,
      
    };
  console.log("data",data);
  
  
    try {
      const response = await axios.post('http://localhost:3000/admin/uploadUser', data);
  
      if (response.status === 200) {
        const result = response.data;
        if(result.success==false){
          setEmailError("email allready exist")
          return
        }else{
          setEmailError(null)
        }

        try {
          formData.append('userId', result.userId._id);

          const response = await axios.post('http://localhost:3000/admin/uploadImage', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
      
          if (response.status === 200) {
            const result = response.data;

          navigate('/admin/dashboard')
          } else {
            console.error('Failed to upload image:', response.statusText);
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        }

        // setUploadedImageUrl(result.imageUrl); // Update state with the uploaded image URL
      } else {
        console.error('Failed to upload image:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }

  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 flex">
        <form className="space-y-4 w-full flex" method="POST" onSubmit={handleSubmit}>
          <div className="w-2/3 pr-6 my-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create an Account</h1>
            <div>
              <label className="block text-sm font-medium text-gray-700 mt-3">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e)=>setName(e.target.value)}
                className="mt-1 p-1 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter name"
                
              />
              {nameError&&<p className='text-red-500'>{nameError}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mt-3">email</label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={(e)=>setEmail(e.target.value)}
                className="mt-1 p-1 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter email"
              />
              {emailError&&<p className='text-red-500'>{emailError}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mt-3">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e)=>setPassword(e.target.value)}
                className="mt-1 p-1 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter password"
              />
              {passwordError&&<p className='text-red-500'>{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create an Account
            </button>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center mt-8">
          {!imageUrl&&
            <label className="flex flex-col items-center px-4 py-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer mt-6 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400 mb-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2a3 3 0 100 6 3 3 0 000-6zm5 8H4v-1a4 4 0 014-4h2a4 4 0 014 4v1z" />
              </svg>
              <span className="text-gray-600 font-medium">Upload file</span>
              <input id="upload" type="file" className="hidden" onChange={handleFileChange}/>
            </label>
          }{
            imageUrl&&
            <div>
              <img src={imageUrl} alt="" />
            </div>
          }
          {errorMessage&&<p className='text-red-500'>{errorMessage}</p>}
            <button
            onClick={()=>navigate('/admin/dashboard')}
              className="mt-10 h-9 w-36 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
