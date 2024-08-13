import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api_assets_url, api_url, app_url } from '../common/Helpers';
import axios from 'axios';
import { getDatabase, ref, get,set,update,query, push,orderByChild, equalTo, onValue, off } from 'firebase/database';
import firebaseApp from '../firebase'; // Make sure the path to your firebase.js file is correct
export default function Viewmessage() {
  const [messages, setMessages] = useState([]);
  const [mainchatdata, setmainchatdata] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  let uid = localStorage.getItem('uid');
  let chatbox = localStorage.getItem('chatbox');
  let toperson = localStorage.getItem('toperson');
  const chatboxRef = useRef(null);
  
  // Function to scroll to the end of the chatbox
  const scrollToBottom = () => {
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  };
  useEffect(() => {
    getdata(toperson);
  
    // Get the database instance
    const db = getDatabase(firebaseApp);
  
    // Define the messages reference
    const messagesRef = ref(db, 'messages');
  
    // Define the chatbox value you want to query
    const targetChatbox = chatbox; // Change this to the chatbox value you want to retrieve
  
    // Create a query to filter messages by the 'chatbox' property and 'isDeleted' condition
    const chatboxQuery = query(
      messagesRef,
      orderByChild('chatbox'),
      equalTo(targetChatbox)
    );
  
    // Listen for changes in the database and update the messages state
    const handleDataChange = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const myuid = uid; // Replace with the user ID you want to filter for
        const messageList = Object.values(data)
          .filter(message => {
            if (message.uid === myuid) {
              return !message.isDeleted; // Filter only if message belongs to myuid and is not deleted
            }
            return true; // Include all other messages
          });
        console.log(messageList);
        setMessages(messageList);
      }
    };

    
  
    // Set up the listener with the chatbox query
    onValue(chatboxQuery, handleDataChange);
  
    // Clean up the listener when the component unmounts
    return () => {
      off(chatboxQuery, 'value', handleDataChange);
    };
  }, []);
  
  const getdata =  async (toperson)=>{
    await axios.get(api_url+'mainchatdata/'+toperson).then(response => {
      setmainchatdata(response.data);
    })
  }
  useEffect(() => {
    // Scroll to the bottom whenever the messages state updates
    scrollToBottom();
  }, [messages]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();

    const db = getDatabase(firebaseApp); // Get the database instance from the firebaseApp
    const messagesRef = ref(db, 'messages');

    // Save the new message to the database
    push(messagesRef, {
      uid: uid,
      chatbox: chatbox,
      text: newMessage,
      timestamp: Date.now(),
      isDeleted: false, // Add this property
    });

    // Clear the input field
    setNewMessage('');
  };
  const openthis = () => {
  alert(openthis)
  }
  const [visible, setVisible] = useState(false);

  const showMenu = (e) => {
    e.preventDefault();
    if (!visible) {
      setVisible(true);
      document.addEventListener('mousedown', hideMenu);
    }
  };

  const hideMenu = (e) => {
    if (e.target.closest('.more')) {
      return;
    }
    setVisible(false);
    document.removeEventListener('mousedown', hideMenu);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousedown', hideMenu);
    };
  }, []);
  const clearallchats = async () => {
    try {
      const db = getDatabase(firebaseApp);
      const messagesRef = ref(db, "messages");
    
      // Step 1: Fetch Data
      const chatboxId = chatbox;
    
      const snapshot = await get(query(messagesRef, orderByChild("chatbox"), equalTo(chatboxId)));
    
      if (snapshot.exists()) {
        const currentUserUid = uid; // Get the UID of the current user
    
        const updates = {};
    
        snapshot.forEach((childSnapshot) => {
          const messageId = childSnapshot.key;
          const messageData = childSnapshot.val();
    
          // Check if the message belongs to the current user
          if (messageData.uid === currentUserUid) {
            // Update the isDeleted property to true for the current user's messages
            messageData.isDeleted = true;
    
            // Prepare update for the message
            updates[messageId] = messageData;
          }
        });
    
        // Step 3: Update Firebase
        await update(messagesRef, updates);
    
        console.log("Your messages in chatbox", chatboxId, "are marked as deleted.");
      } else {
        console.log("No messages found in the chatbox", chatboxId);
      }
      setVisible(false)
    } catch (error) {
      console.error("Error updating messages:", error);
    }
  };
  
  
  
  

    const navigate = useNavigate();
  
    const viewprofile = (userid) => {
      localStorage.setItem('viewprofile', userid);
      navigate(app_url + 'profile');
    };
  return (
    <div>
      <div className="perfecthight" style={{ height: '100vh',maxWidth: '100%', padding: '25px 10px', background: 'linear-gradient(180deg, rgba(8,0,5,1) 0%, rgba(42,0,29,1) 50%, rgba(79,0,55,1) 100%)' }}>
       <div className='d-flex justify-content-between mx-2'>
        <div>
        <Link to={app_url + 'messages'} className='text-white'>
          Back to chats
        </Link>
        </div>
      
        </div>
        <div
      className='card px-2 pb-1'
      style={{
        background: 'transparent',
        borderRadius: '10px',
        position: 'sticky', // Make the card sticky
        top: 0, // Stick to the top of the viewport
        zIndex: 999, // Set the z-index to ensure it stays on top of other elements
        marginTop: 20
      }}
    >
      <div className="d-flex justify-content-between align-items-center text-white">
        <div className='d-flex align-items-center'>
          <div className='me-2'>
            <img   onClick={() => viewprofile(toperson)}
              src={api_assets_url + "profilepicture/" + mainchatdata.profile}
              style={{ height: 50, width: 50,border: '1px solid #82737B', borderRadius: '100%' }}
            />
          </div>
          <div style={{ display: 'inline-block' }}>
            <div   onClick={() => viewprofile(toperson)} style={{ fontWeight: 600, textTransform: 'capitalize', fontSize: 14 }}>
              {mainchatdata.topersonname}
            </div>
            <div style={{ fontWeight: 100, fontSize: 9, lineHeight: 1, fontWeight: '600' }}>
            {mainchatdata.isOnline == 1 ? 
            <div> <i className="fa-solid fa-circle mt-1" style={{ color: '#8FFF00'}}></i> <span className='d-inline-block' style={{fontWeight: 200}}>Active Now</span> </div> 
                      :
            <div> <i className="fa-solid fa-circle mt-1" style={{ color: 'red',  }}></i> <span className='d-inline-block' style={{fontWeight: 200}}>Offline</span> </div> 
            }
            </div>
          </div>
        </div>
        <div>
        <div className={`${visible ? 'show-more-menu' : ''}`}>
      <div className="more">
        <button
          onClick={showMenu}
          style={{background: 'none',border: 'none',color: 'white'}}
        ><i  className="fa-solid fa-ellipsis-vertical"></i>
        </button>
        <div className="more-menu" aria-hidden={!visible}>
          {/* ...menu items here... */}
          <div class="more-menu-caret">
                <div class="more-menu-caret-outer"></div>
                <div class="more-menu-caret-inner"></div>
            </div>
            <ul class="more-menu-items" tabindex="-1" role="menu" aria-labelledby="more-btn" aria-hidden="true">
                <li class="more-menu-item" role="presentation">
                    <button onClick={()=>{clearallchats()}} type="button" class="more-menu-btn" role="menuitem">Clear all</button>
                </li>
            </ul>
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>
        <div style={{ height: '75vh', overflowY: 'auto'}} ref={chatboxRef}>
          {messages.map((message) => (
            <>
              {message.uid == uid ? (
                <div key={message.timestamp} style={{ color: 'white',marginLeft: '56px'}} className='text-end mt-2'>
                  <p
                    className='text-white'
                    style={{
                      border: '1px solid #5F4D59',
                      display: 'inline-block',
                      padding: '8px',
                      borderRadius: '10px',
                      fontFamily: 'Nunito',
                      position: 'relative',
                      padding: '5px 5px 15px 10px',
                      maxWidth: '100%',
                      wordBreak: 'break-word', // Add word-break: break-word to wrap long words
                      minWidth: '75px'
                    }}
                  >
                    {message.text}
                    <small
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        right: '6px',
                        color: '#777',
                        fontSize: '0.7em',
                      }}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </small>
                  </p>

                </div>
              ) : (
                <div key={message.timestamp} style={{ color: 'white',marginRight: '56px' }} className='text-start mt-2'>
                  <p
                    className='text-white'
                    style={{
                      border: '1px solid #5F4D59',
                      display: 'inline-block',
                      padding: '8px',
                      borderRadius: '10px',
                      fontFamily: 'Nunito',
                      position: 'relative', // Add position: 'relative' to the message container
                      padding: '5px 65px 12px 10px',
                      minWidth: '75px',
                      wordBreak: 'break-word',
                    }}
                  >
                    {message.text}
                    <small
                      style={{
                        position: 'absolute', // Add position: 'absolute'
                        bottom: '2px', // Adjust the bottom spacing to position the timestamp correctly
                        right: '6px', // Adjust the right spacing to position the timestamp correctly
                        color: '#777',
                        fontSize: '0.7em',
                      }}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </small>
                  </p>
                </div>
              )}
            </>
          ))}
        </div>      
        <form onSubmit={handleMessageSubmit}>
          <div className='row mb-3' style={{ position: 'fixed', bottom: '0', width: '100%' }}>
            <div className="col-10 pe-0">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{ height: '40px', backgroundColor: '#2B011E', border: 'none', borderRadius: '10px', width: '100%', fontSize: '12px' }}
                className="px-2 py-2 text-white"
                placeholder="Write your message here..."
                aria-label="Search"
                aria-describedby="search-addon"
                required
              />
            </div>
            <div className="col-2">
              <button type='submit' style={{ background: 'none', border: 'none', paddingLeft: '0' }}>
                <img style={{ height: '40px', backgroundColor: '#2B011E', padding: '7px 9px', borderRadius: '10px' }} src={app_url + 'assets/image/paper-plane.png'} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}