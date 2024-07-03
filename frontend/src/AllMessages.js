import React, { useEffect } from 'react'
import Message from './Message'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { setmsg } from './redux/messageslice'

function Messages() {

  const selecteduser = useSelector(state => state.user.selecteduser);
  const msgs = useSelector(state => state.mesaage.msg)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (selecteduser) {
          const res = await axios.get(`http://localhost:8000/message/${selecteduser._id}`, { withCredentials: true });
          dispatch(setmsg(res.data.data))
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchUser();
  }, [selecteduser]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (selecteduser) {
          const res = await axios.get(`http://localhost:8000/message/${selecteduser._id}`, { withCredentials: true });
          dispatch(setmsg(res.data.data))
          
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchUser();
  }, [selecteduser]);

  const socket = useSelector(store=>store.socket.socket);
    // const {messages} = useSelector(store=>store.message);
    useEffect(()=>{
        if(socket){
        socket.on("newMessage", (newMessage)=>{
          if(msgs){
            dispatch(setmsg([...msgs, newMessage]));
          }
          else{
            dispatch(setmsg([newMessage]));
          }
        });
        return () => socket.off("newMessage");
      }
    },[setmsg, msgs]);

    console.log(msgs)
  return (

    <div className='px-4 flex-1 overflow-auto'>
      {msgs &&
        msgs.map((msg) => (
          <Message key={msg._id} msg={msg} />
        ))

      }
    </div>
  )
}

export default Messages
