import React from 'react';
import './App.css'
import { BrowserRouter as Router, useRoutes, Link } from 'react-router-dom';
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { setSocketId} from './redux/socketslice';
import { setOnlineUsers } from './redux/userslice';
import { setmsg } from './redux/messageslice'


const AppRoutes = () => {

  const routes = [

    { path: '/', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/Home', element: <Home /> },

  ];

  return useRoutes(routes);
};

function App() {

  const authUser = useSelector(store => store.user.authuser);
  const messages = useSelector(store => store.mesaage.msg);
  // const socketio = useSelector(store => store.socket.socket);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socketio = io("http://localhost:8000", {
        query: {
          userId: authUser._id
        }
      });

        // console.log(socketio)
        dispatch(setSocketId(socketio));
    

      // console.log(socket)
      socketio.on('disconnect', () => {
        dispatch(setSocketId(null));
      });

      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      });

      socketio.on("newMessage", (newMessage) => {
        if(messages){
          dispatch(setmsg([...messages, newMessage]));
        } 
      });

      return () => {
        socketio.disconnect();
        dispatch(setSocketId(null));
      };
    }
    // else {
    //   dispatch(setConnected(false));
    //   dispatch(setSocketId(null));
    // }

  }, [authUser, dispatch]);

  return (
    <div >

      <Router>
        <AppRoutes />
      </Router>


    </div>
  );
}

export default App;

