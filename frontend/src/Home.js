import React from 'react';
import { useSelector } from 'react-redux';

import Chatwindow from './Chatwindow';
import Chatlist from './Chatpeople';
import './Home.css';

const Home = () => {
    const user = useSelector((state) => state.user);
    const socket = useSelector(store=>store.socket.socket);
    const messages = useSelector(store => store.mesaage.msg);
    console.log(user);
    console.log("SocketID",socket)
    console.log(messages)

    
    
    return (
        <div className='a items-center justify-center flex'>
            <div className='flex sm:h-[550px] md:h-[640px] md:w-[1410px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <Chatlist/>
            <Chatwindow/>

            </div>
        </div> 
    );
};

export default Home;












































































































































































































































































































































// import React, { useState } from 'react';
// import SplitPane from 'react-split-pane';
// import './Home.css'; // Custom CSS file

// import ChatWindow from './ChatWindow';
// const Home = () => {
    // const [message, setMessage] = useState('');

    // const [selectedChat, setSelectedChat] = useState(null);
    
    
    // const handleChatSelect = (chat) => {
        //   console.log(chat)
        //   setSelectedChat(chat);
        // };


        // return (
            //   <div className="home-container">
            //     {/* <header className="home-header">
            //       <h1>Chat App</h1>
            //     </header> */}
            //     <SplitPane
            //       split="vertical"
            
      //       minSize={150}
      //       defaultSize={200}
      //       style={{ position: 'relative' }}
      //       paneStyle={{ overflow: 'hidden' }}
      //       resizerStyle={{
        //         background: '#000',
        //         opacity: '0.2',
        //         zIndex: '1',
        //         cursor: 'col-resize',
        //         width: '5px',
        //         margin: '0 -2.5px',
        //         height: '100%',
        //       }}
        //     >
        //       <ChatList onSelectChat={handleChatSelect} />
        //       <ChatWindow chat={selectedChat} />
        //     </SplitPane>
        //   </div>
        // );
    // );
// };

        