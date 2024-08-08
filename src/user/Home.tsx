import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { RootState } from '../utils/store';


const Home = () => {
  interface User {
    _id: string;
    username:string;
    email:string
  }
  
  const user = useSelector((state: RootState) => state.user as unknown as User);
  if(user)
console.log("user",user._id);

  const dispatch=useDispatch()
const navigate=useNavigate()
const [form,setform]=useState<boolean>(false)
const [image, setImage] = useState<File | null>(null);
const [imageUrl, setImageUrl] = useState<string | null>(null);
const [imgUrl,setImgUrl]=useState<string|null>(null)
const [uplodedImageUrl,setUploadedImageUrl]=useState<string|null>(null)
const [errorMessage,setErrorMessage]=useState<string|null>(null)


const cancelButton=()=>{
  setform(false)
  setErrorMessage(null)
}

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    setImage(e.target.files[0]);
    const file = e.target.files[0];

    setImageUrl(URL.createObjectURL(file));

  }
};
const submitImage=async ()=>{
  if (!image) {
    setErrorMessage("Please select an image first")
    // alert('Please select an image first');
    return;
  }else{
    setErrorMessage(null)

  }

  const formData = new FormData();
  formData.append('userId', user._id);

  formData.append('image', image);

  console.log(formData);
  



  try {
    const response = await axios.post('http://localhost:3000/api/uploadImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status === 200) {
      const result = response.data;
      setform(false)
      setImageUrl(null)
      setUploadedImageUrl(result.imageUrl); // Update state with the uploaded image URL
    } else {
      console.error('Failed to upload image:', response.statusText);
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

  useEffect(()=>{
    const fetchProtectedData = async () => {
      try {
        axios.defaults.withCredentials = true;  
  
        const response = await axios.get('http://localhost:3000/api/userHome', {
        });
        console.log(response.data);
        if(response.data.valied){
          dispatch(addUser(response.data.user))
          setImgUrl(response.data.user?.imgUrl)
        }
        else{
          navigate("/user/login")
        }
      } catch (error) {
        console.error('Error fetching protected data:', error);
        navigate("/user/login")
        
      }
    };
  
    fetchProtectedData()
  
  },[uplodedImageUrl])

  return (
    
<div>
  {user&&
  <div className="flex justify-center items-center h-screen">
    <div className="w-1/2 shadow-xl rounded-2xl p-10 border">
      <div className="flex justify-around gap-11 items-center ">
        
        <div className='w-[200px] h-[200px] border-2 rounded-2xl'>
        {imgUrl &&
          <img src={imgUrl} alt="" className="rounded-2xl w-[600px] h-[200px] object-cover"/>
        }
        </div>
        <div>
          <h1 className="font-extrabold text-3xl">Hi, I'm {user.username}</h1>
          <p className="font-semibold text-sm">{user.email}</p>
          {!form && <button className='p-3 m-4 text-white bg-slate-500 rounded-md' onClick={() => setform(true)}>Upload Photo</button>}
        </div>
      </div>
      {form && 
      <div className="flex flex-col items-start space-y-2 p-4">
        <label className="text-gray-700 font-semibold" htmlFor="file-input">Select image</label>
        <input className="border border-gray-300 p-2 rounded-lg cursor-pointer" type="file" id="file-input" onChange={handleFileChange}/>
        {errorMessage&&<p className='text-red-500'>{errorMessage}</p>}
        {imageUrl && (
          <div className="w-64 h-64 mt-4">
            <img src={imageUrl} alt="Selected" className="max-w-full h-auto"/>
          </div>
        )}
        <div className="w-full flex justify-end">
        <button className="bg-slate-500 text-white p-2 mx-3 rounded-lg" onClick={cancelButton}>cancel</button>

          <button className="bg-slate-500 text-white p-2 rounded-lg" onClick={submitImage}>Submit</button>
        </div>
      </div>
      }
    </div>
  </div>
}
</div>
  
  )
}

export default Home
