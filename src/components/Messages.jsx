import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { api_url, app_url,api_assets_url } from '../common/Helpers';
import axios from 'axios';
import { getDatabase, ref, query, orderByChild, equalTo, limitToLast, onValue, off } from 'firebase/database';
import firebaseApp from '../firebase';

export default function Messages() {
  const navigate = useNavigate();
  const uid = localStorage.getItem('uid');
  const [reqdata, setreqdata] = useState([]);

  useEffect(() => {
    getdatamsg(uid);
  }, []);

  const getdatamsg = async (uid) => {
    try {
      const response = await axios.get(api_url + 'mymessage/' + uid);
      const requestData = response.data;
      const messagesPromises = requestData.map(async (dataItem) => {
        const lastMessage = await getLastMessageForUser(dataItem.chatbox);
        let lastMessageTime = 'No messages';
        if (lastMessage) {
            const messageDate = new Date(lastMessage.timestamp);
            const today = new Date();
            
            if (messageDate.toDateString() === today.toDateString()) {
              // If the message was sent today, show time and date
              lastMessageTime = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else {
              // If the message was not sent today, show only the date
              lastMessageTime = messageDate.toLocaleDateString();
            }
          }
        //    +', ' + messageDate.toLocaleDateString()
        return {
          ...dataItem,
          lastMessage: lastMessage ? lastMessage.text : 'No messages', // You can adjust this as needed
          lastTime: lastMessageTime
        };
      });
      Promise.all(messagesPromises)
        .then((updatedData) => {
          setreqdata(updatedData);
        })
        .catch((error) => {
          console.error('Error fetching last messages:', error);
        });
    } catch (error) {
      console.error('Error fetching request data:', error);
    }
  };

  const getuserchats = (toperson, chatbox) => {
    localStorage.setItem('chatbox', chatbox);
    localStorage.setItem('toperson', toperson);
    navigate(app_url + 'viewmessage');
  };

  const getLastMessageForUser = async (chatbox) => {
    try {
      const db = getDatabase(firebaseApp);
      console.log(db)
      const messagesRef = ref(db, 'messages');
      const userMessagesQuery = query(messagesRef, orderByChild('chatbox'), equalTo(chatbox), limitToLast(1));

      return new Promise((resolve, reject) => {
        onValue(userMessagesQuery, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const messageList = Object.values(data);
            resolve(messageList[0]);
          } else {
            resolve(null); // No messages found
          }
        }, (error) => {
          reject(error);
        });
      });
    } catch (error) {
      throw error;
    }
  };
    return (
        <div>
            <div className="perfecthight" style={{ height: '100vh', padding: '10px 0', background: 'linear-gradient(180deg, rgba(8,0,5,1) 0%, rgba(42,0,29,1) 50%, rgba(79,0,55,1) 100%)' }}>
                <div className="container mt-2" style={{ padding: '20px' }}>
                    <h2 style={{ color: 'white', fontSize: '30px', fontFamily:'nunito' }}>Messages</h2>
                    <p className="text-white" style={{ fontSize: '11px',fontSize: '14px',marginTop:'-6px', fontWeight: 100, fontFamily:'nunito' }}>Connect instantly, share endlessly: Messaging made magical!</p>
                    
                    {reqdata.map((item) => (
                        <div className='card px-3 pb-1' style={{ background: '#4D333E', borderRadius: '10px', marginTop: '30px' }} onClick={()=>{getuserchats(item.receiver,item.chatbox)}}>
                            <div className="row py-2">
                                <div className="col-2 d-flex justify-content-center align-items-center">
                                    <img  src={api_assets_url+"profilepicture/"+item.profilephoto} style={{ height: 40, width: 37, marginTop: 4,borderRadius: '5px' }} />
                                </div>
                                <div className="col-7 text-white p-1">
                                    <div style={{ fontWeight: 600, textTransform: 'capitalize', fontSize: 14, fontFamily:'nunito' }}>{item.uname}</div>
                                    <div style={{ fontWeight: 100, textTransform: 'capitalize', fontSize: 11, fontFamily:'nunito' }}>{item.lastMessage}</div>
                                </div>
                                <div className="col-3 pe-0 d-flex align-items-center justify-content-center">
                                    <div>
                                        <div className="text-center" style={{ height: 10, color: 'rgb(251, 255, 84)', fontWeight: 'bold', fontSize: 9, fontFamily:'nunito' }}>
                                            {item.lastTime}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex-lg-column my-auto glasscreen  mx-2" style={{
                    position: 'fixed',
                    width: '95%',
                    bottom: '10px',
                    padding: '2px 10px'
                }}>
                    <ul className="nav nav-pills side-menu-nav justify-content-around" role="tablist">
                        <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Profile" data-bs-original-title="Profile" role="presentation">
                            <Link to={app_url + 'homepage'}>
                                <span className="nav-link" id="pills-user-tab activethis" data-bs-toggle="pill" role="tab" aria-selected="false" tabIndex={-1}>
                                    <img className="home" src={app_url + 'assets/image/home.png'} alt />
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Chats" data-bs-original-title="Chats" role="presentation">
                            <Link to={app_url + 'connection'}>
                                <span className="nav-link" id="pills-chat-tab" data-bs-toggle="pill" role="tab" aria-selected="true">
                                    <img className="home" src={app_url + 'assets/image/link.png'} alt />
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Chats" data-bs-original-title="Chats" role="presentation">
                     <Link to={app_url + 'postrequest'}>
                        <span className="nav-link" id="pills-chat-tab" data-bs-toggle="pill" role="tab" aria-selected="true">
                           <img className="home" src={app_url + 'assets/image/add.png'} alt />
                        </span>
                     </Link>
                  </li>
                        <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Contacts" data-bs-original-title="Contacts" role="presentation">
                            <Link to={app_url + 'messages'}>
                                <span className="nav-link active" id="pills-contacts-tab" data-bs-toggle="pill" role="tab" aria-selected="false" tabIndex={-1}>
                                    <img className="home" src={app_url + 'assets/image/messenger.png'} alt />
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Settings" data-bs-original-title="Settings" role="presentation">
                            <Link to={app_url + 'ownprofile'}>
                                <span className="nav-link" id="pills-setting-tab" data-bs-toggle="pill" role="tab" aria-selected="false" tabIndex={-1}>
                                    <img className="home" src={app_url + 'assets/image/user.png'} alt />
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}