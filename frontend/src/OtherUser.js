import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setselecteduser } from './redux/userslice'


function OtherUser(props) {
    const user = props.user
    const dispatch = useDispatch()

    const handleClick = async () => {
        // console.log(user)
        dispatch(setselecteduser(user))
    }

    const selecteduser = useSelector(store => store.user.selecteduser)
    const onlineuser = useSelector(store => store.user.onlineUsers)
    // console.log(selecteduser);
    let isOnline
    if(onlineuser){
    isOnline = onlineuser.includes(user._id);
    }

    return (
        <>
            <div onClick={handleClick} className={` ${selecteduser!==null ? (selecteduser._id === user._id ? 'bg-zinc-500 text-black' : '') : ('')} flex gap-2 hover:text-black items-center hover:bg-zinc-500 rounded p-2 cursor-pointer`}>
                <div className={`avatar ${isOnline ? 'online' : '' }`}>
                    <div className='w-12 rounded-full'>
                        <img src={user.profilePhoto} alt="Hi" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 text-white'>
                        <p>{user.FullName}</p>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'></div>
        </>
    )
}

export default OtherUser
