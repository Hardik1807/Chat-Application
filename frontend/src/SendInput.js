import React, { useState } from 'react'
import { IoMdSend } from "react-icons/io";
import './SendInput.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setmsg } from './redux/messageslice'

function SendInput() {
    const dispatch = useDispatch()
    const [message,setMesaage]=useState("")

    const selecteduser = useSelector(state => state.user.selecteduser);
    const msg = useSelector(store => store.mesaage.msg)

    const submithandler = async (event) =>{
        event.preventDefault()
        
        try {
            const res = await axios.post(`http://localhost:8000/message/send/${selecteduser._id}`,{message},{ withCredentials: true })
            
            if(msg)
            {
                dispatch(setmsg([...msg,res.data]))
            }
            else{
                dispatch(setmsg([res.data]))
            }
            setMesaage("")
        } catch (error) {
            console.log(error)
            return;
        }
        
    }


    return (
        <form onSubmit={submithandler} className='px-4 my-3'>
            <div className='w-full relative'>
                <input
                    value={message}
                    onChange={(e)=>setMesaage(e.target.value)}
                    type="text"
                    placeholder='Send a message...'
                    className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'
                />
                <button type="submit" className='trans absolute flex inset-y-0 end-0 items-center pr-4'>
                    <IoMdSend />
                </button>
            </div>
        </form>
    )
}

export default SendInput
