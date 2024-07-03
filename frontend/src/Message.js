import React from 'react'
import img from './avt.jpg'
import { useSelector } from 'react-redux'

function Message(props) {
    let formattedDate;

    function getISTDate(date) {
        const offset = 5.5 * 60 * 60 * 1000;
        return new Date(date.getTime() + offset);
    }

    function stripTime(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    function isWithinLastWeek(date) {
        const now = stripTime(getISTDate(new Date()));
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return date >= oneWeekAgo && date <= now;
    }


    function getDateOrDay(dateString) {
        const date = new Date(dateString);
        const istDate = stripTime(getISTDate(date));

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = daysOfWeek[istDate.getDay()];

        const day = istDate.getDate().toString().padStart(2, '0');
        const month = (istDate.getMonth() + 1).toString().padStart(2, '0');
        const year = istDate.getFullYear().toString().slice(-2);

        if (isWithinLastWeek(istDate)) 
        {
            console.log("Hi")
            formattedDate=dayOfWeek;
        } 
        else 
        {
            console.log("Bye")
            formattedDate=`${day}/${month}/${year}`;
        }
    }

    getDateOrDay(props.msg.updatedAt); 





    const selecteduser = useSelector(state => state.user.selecteduser);
    // console.log(props)
    return (
        <div className={`chat ${selecteduser._id === props.msg.
            RecieverId ? 'chat-end' : 'chat-start'} `}>

            <div className="chat-header">
                <time className="text-xs opacity-50 text-white">{formattedDate}</time>
            </div>
            <div className="chat-bubble bg-gray-200 text-black">{props.msg.message}</div>
        </div>

    )
}

export default Message
