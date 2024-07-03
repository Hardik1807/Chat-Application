import React from 'react';
import img from './avt.jpg';
import SendInput from './SendInput';
import Messages from './AllMessages';
import {useSelector} from 'react-redux';
import NoUserSelected from './DefaultWindow'; // Import the new component

function Chatwindow() {
  const selecteduser = useSelector(state => state.user.selecteduser);
  const onlineuser = useSelector(store => store.user.onlineUsers)

  if (!selecteduser) {
    return <NoUserSelected />; // Render the NoUserSelected component if no user is selected
  }

    let isOnline
    if(onlineuser){
    isOnline = onlineuser.includes(selecteduser._id);
    }

  return (
    <div className='md:min-w-[1090px] flex flex-col'>
      <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
        <div className={`avatar ${isOnline ? 'online' : '' }`}>
          <div className='w-12 rounded-full'>
            <img src={selecteduser.profilePhoto} alt="user-profile" />
          </div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex justify-between gap-2'>
            <p>{selecteduser.FullName}</p>
          </div>
        </div>
      </div>
      <Messages />
      <SendInput />
    </div>
  );
}

export default Chatwindow;
