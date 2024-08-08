import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../utils/store';
import { addUserData, User } from '../utils/userDataSlice';
import Swal from 'sweetalert2';



const Dashboard = () => {
  const userData = useSelector((state: RootState) => state.userdata);
  const [userState,setUserState]=useState<string|null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchItem, setSearchItem] = useState<RootState|User[]>(userData);


  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

  const filteredUsers = userData.filter(user => {
    const regex = new RegExp(searchTerm, 'i'); 
    return regex.test(user.username);

});
setSearchItem(filteredUsers)

}
  const dispatch=useDispatch()
  const navigate=useNavigate()


  const deleteUser=(userId:string)=>{
    

    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        axios.get(`http://localhost:3000/admin/deleteUser?userId=${userId}`) 
        .then(response => {
            setUserState(userId)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
      }
    });
   
  }
  useEffect(() => {
    if (Array.isArray(userData)) {
      setSearchItem(userData);
    }
  }, [userData]);

  useEffect(()=>{
  const fetchProtectedData = async () => {
    try {
      axios.defaults.withCredentials = true;  

      const response = await axios.get('http://localhost:3000/admin/userData', {
      });
      if(response.data.valied){
        dispatch(addUserData(response.data.userData))
      }
      else{
        navigate("/admin/adminlogin")
      }
    } catch (error) {
      console.error('Error fetching protected data:', error);
      navigate("/admin/adminlogin")
      
    }
  };

  fetchProtectedData()

},[userState])
  return (
    <div className="container mx-auto px-24 py-4">
        <div className='flex justify-between py-8'>
        <h1 className="text-4xl font-semibold mb-2 px-16">User details</h1>
        <input className='border-2 px-3 rounded-lg'
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
            />
    <button className='bg-green-900 p-3 w-36 rounded-md opacity-80 text-white ' onClick={()=>navigate('/admin/createUser')}>create user</button>
        </div>

      <table className="min-w-full bg-white border border-gray-300 ">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Photo</th>
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {Array.isArray(searchItem)&&searchItem.map((user,index)=>(

            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left"><img src={user.imgUrl} alt="" className='h-24 rounded-full w-24'/> </td>
            <td className="py-3 px-6 text-left">{user._id}</td>
            <td className="py-3 px-6 text-left">{user.username}</td>
            <td className="py-3 px-6 text-left">{user.email}</td>
            <td className="py-3 px-6 text-center">
              <button onClick={()=>navigate("/admin/editUser",{state:user._id})} className='bg-slate-600 px-3 text-white mx-2'>Edit</button>
              <button onClick={()=>deleteUser(user._id)} className='bg-red-700 px-3 text-white'>Delete</button>
            </td>
            </tr>

          ))
        }
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
