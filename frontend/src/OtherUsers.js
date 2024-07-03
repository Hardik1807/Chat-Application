import React, { useEffect } from 'react'
import OtherUser from './OtherUser'
import axios from 'axios'
import {useSelector, useDispatch } from 'react-redux';

import {setotheruser} from './redux/userslice'


function OtherUsers(props) {

  const dispatch = useDispatch();

  const Otheruser = useSelector(state => state.user.Otheruser);
  
  useEffect( ()=>{
    const fetchUser = async () =>{
      try {
        const res = await axios.get("http://localhost:8000/user/",{ withCredentials: true })
      // console.log(res.data)
      dispatch(setotheruser(res.data))
      } catch (error) {
        return
      }
    }
    fetchUser();
  },[dispatch])
  
  if(!Otheruser){
    console.log("No data")
    return;
  }

  let content;

  if (props.search=="") {
    content = Otheruser.map((user) => (
      <OtherUser key={user._id} user={user} />
    ));
  } else {
    // console.log(props.users)
    content = (props.users || []).map((user) => (
      // console.log(user)
      <OtherUser key={user._id} user={user} />
    ));
  }


  return (
    <div className='overflow-auto flex-1'>
      {content}
    </div>
  )
}

export default OtherUsers
