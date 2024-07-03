import React, { useState, useEffect } from 'react'
import OtherUsers from './OtherUsers'
import toast from 'react-hot-toast'
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { setauthuser, setotheruser, setselecteduser, setOnlineUsers } from './redux/userslice'
import { setmsg } from './redux/messageslice'


function Chatpeople() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate()
  const otherUsers = useSelector(store => store.user.Otheruser);
  const socket = useSelector(store => store.socket.socket)
  const dispatch = useDispatch();
  
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(otherUsers)
    const conversationUser = otherUsers.find((user) => (
      // console.log(user),
      user.FullName.toLowerCase().includes(search.toLowerCase())
      
    ));
    if (conversationUser) {
      dispatch(setotheruser([conversationUser]));
    } else {
      toast.error("User not found!");
    }
  }
  
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/user/logout", { withCredentials: true })
      toast.success("Logged out successfully")
      dispatch(setauthuser(null))
      dispatch(setotheruser(null))
      dispatch(setselecteduser(null))
      dispatch(setOnlineUsers(null))
      dispatch(setmsg(null))
      socket.disconnect()
      navigate('/')
    }
    catch (error) {
      console.log(error)
      return
    }
  }
  
  const changehandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    
  }

  const [searchedusers, setSearchedUsers] = useState(null);
  
  
  useEffect(() => {
    let filteredUsers;
    if(search!="")
      {

        if (otherUsers) {
          
          filteredUsers = otherUsers.filter((user) =>
            user.FullName.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      if (filteredUsers) {
        setSearchedUsers(filteredUsers)
      } else {
        setSearchedUsers(null)
        toast.error("User not found!");
      }
    }
    }, [search]);

  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <form onSubmit={searchSubmitHandler} action="" className='flex items-center'>
        <input
          value={search}
          onChange={changehandler}
          className='input input-bordered rounded-md' type="text"
          placeholder='Search...'
        />
        <button type='submit' className='btn bg-zinc-700 text-white'>
          <BiSearchAlt2 className='w-6 h-6 outline-none' />
        </button>
      </form>
      <div className="divider px-3"></div>
      <OtherUsers search={search} users={searchedusers}/>
      <div className='mt-2'>
        <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
      </div>
    </div>
  )
}

export default Chatpeople
