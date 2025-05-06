// // import React, { useEffect, useState } from 'react';
// // import io from 'socket.io-client';
// // import axios from 'axios';

// // const socket = io('http://localhost:3000');

// // const ChatApp = () => {
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [users, setUsers] = useState([]);
// //   const [chatWith, setChatWith] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const [msg, setMsg] = useState('');
// //   const currentUserId = 1; // Mock current user

// //   useEffect(() => {
// //     socket.emit('join', { userId: currentUserId });

// //     socket.on('receiveMessage', data => {
// //       if (data.senderId === chatWith?.id) {
// //         setMessages(prev => [...prev, data]);
// //       }
// //     });

// //     return () => {
// //       socket.off('receiveMessage');
// //     };
// //   }, [chatWith]);

// //   const searchUsers = async (term) => {
// //     setSearchTerm(term);
// //     if (term.trim() === '') return setUsers([]);
// //     const res = await axios.get(`http://localhost:3000/search?username=${term}`);
// //     setUsers(res.data.filter(u => u.id !== currentUserId));
// //   };

// //   const openChat = (user) => {
// //     setChatWith(user);
// //     setMessages([]); // You can fetch previous messages here if needed
// //   };

// //   const sendMessage = () => {
// //     if (!msg.trim()) return;
// //     const data = {
// //       senderId: currentUserId,
// //       receiverId: chatWith.id,
// //       message: msg
// //     };
// //     socket.emit('sendMessage', data);
// //     setMessages(prev => [...prev, { ...data, timestamp: new Date() }]);
// //     setMsg('');
// //   };

// //   return (
// //     <div style={{ padding: 20, fontFamily: 'Arial' }}>
// //       <h2>Search Users</h2>
// //       <input
// //         type="text"
// //         value={searchTerm}
// //         onChange={e => searchUsers(e.target.value)}
// //         placeholder="Search by username"
// //         style={{ width: 200, marginBottom: 10 }}
// //       />
// //       <div style={{ border: '1px solid #ccc', maxHeight: 150, overflowY: 'auto', marginBottom: 20 }}>
// //         {users.map(user => (
// //           <div
// //             key={user.id}
// //             onClick={() => openChat(user)}
// //             style={{ padding: 5, cursor: 'pointer', borderBottom: '1px solid #eee' }}
// //           >
// //             {user.username}
// //           </div>
// //         ))}
// //       </div>

// //       {chatWith && (
// //         <div style={{ border: '1px solid #ccc', padding: 10, maxWidth: 400 }}>
// //           <h3>Chat with {chatWith.username}</h3>
// //           <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 10, backgroundColor: '#f9f9f9', padding: 10 }}>
// //             {messages.map((m, i) => (
// //               <div key={i} style={{ textAlign: m.senderId === currentUserId ? 'right' : 'left' }}>
// //                 <span>{m.message}</span>
// //               </div>
// //             ))}
// //           </div>
// //           <input
// //             type="text"
// //             value={msg}
// //             onChange={e => setMsg(e.target.value)}
// //             onKeyDown={e => e.key === 'Enter' && sendMessage()}
// //             placeholder="Type a message..."
// //             style={{ width: '80%' }}
// //           />
// //           <button onClick={sendMessage}>Send</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ChatApp;
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';

// const socket = io('http://localhost:3000');

// const ChatApp = () => {
//   const [user, setUser] = useState(null);
//   const [authMode, setAuthMode] = useState('login');
//   const [authForm, setAuthForm] = useState({ username: '', password: '' });

//   const [searchTerm, setSearchTerm] = useState('');
//   const [users, setUsers] = useState([]);
//   const [chatWith, setChatWith] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [msg, setMsg] = useState('');

//   useEffect(() => {
//     if (user) {
//       socket.emit('join', { userId: user.id });
//     }
//   }, [user]);

//   useEffect(() => {
//     socket.on('receiveMessage', data => {
//       if (data.senderId === chatWith?.id) {
//         setMessages(prev => [...prev, data]);
//       }
//     });
//     return () => socket.off('receiveMessage');
//   }, [chatWith]);

//   const handleAuth = async () => {
//     try {
//       const res = await axios.post(`http://localhost:3000/${authMode}`, authForm);
//       if (res.data.id) setUser(res.data);
//       else alert(res.data.message);
//     } catch (err) {
//       alert(err.response?.data?.message || 'Error');
//     }
//   };

//   const searchUsers = async (term) => {
//     setSearchTerm(term);
//     if (term.trim() === '') return setUsers([]);
//     const res = await axios.get(`http://localhost:3000/search?username=${term}`);
//     setUsers(res.data.filter(u => u.id !== user.id));
//   };

//   const openChat = (userToChat) => {
//     setChatWith(userToChat);
//     setMessages([]); // Load messages if needed
//   };

//   const sendMessage = () => {
//     if (!msg.trim()) return;
//     const data = {
//       senderId: user.id,
//       receiverId: chatWith.id,
//       message: msg
//     };
//     socket.emit('sendMessage', data);
//     setMessages(prev => [...prev, { ...data, timestamp: new Date() }]);
//     setMsg('');
//   };

//   if (!user) {
//     return (
//       <div style={{ padding: 20 }}>
//         <h2>{authMode === 'login' ? 'Login' : 'Register'}</h2>
//         <input
//           type="text"
//           placeholder="Username"
//           value={authForm.username}
//           onChange={e => setAuthForm({ ...authForm, username: e.target.value })}
//         /><br />
//         <input
//           type="password"
//           placeholder="Password"
//           value={authForm.password}
//           onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
//         /><br />
//         <button onClick={handleAuth}>
//           {authMode === 'login' ? 'Login' : 'Register'}
//         </button>
//         <p style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
//           {authMode === 'login' ? 'No account? Register' : 'Have an account? Login'}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: 20, fontFamily: 'Arial' }}>
//       <h2>Welcome, {user.username}</h2>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={e => searchUsers(e.target.value)}
//         placeholder="Search users"
//       />
//       <div style={{ border: '1px solid #ccc', maxHeight: 150, overflowY: 'auto', marginBottom: 20 }}>
//         {users.map(u => (
//           <div key={u.id} style={{ padding: 5, cursor: 'pointer' }} onClick={() => openChat(u)}>
//             {u.username}
//           </div>
//         ))}
//       </div>

//       {chatWith && (
//         <div style={{ border: '1px solid #ccc', padding: 10 }}>
//           <h3>Chat with {chatWith.username}</h3>
//           <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 10, backgroundColor: '#f9f9f9', padding: 10 }}>
//             {messages.map((m, i) => (
//               <div key={i} style={{ textAlign: m.senderId === user.id ? 'right' : 'left' }}>
//                 {m.message}
//               </div>
//             ))}
//           </div>
//           <input
//             type="text"
//             value={msg}
//             onChange={e => setMsg(e.target.value)}
//             onKeyDown={e => e.key === 'Enter' && sendMessage()}
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatApp;


import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3000');

// Helper function to format time in IST
const formatIST = (date) => {
  return new Date(date).toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

const ChatApp = () => {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ username: '', password: '' });

  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [chatWith, setChatWith] = useState(null);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const [conversations, setConversations] = useState([]);

  const getConversationId = (userId1, userId2) => {
    return [userId1, userId2].sort().join('_');
  };

  useEffect(() => {
    if (user) {
      socket.emit('join', { userId: user.id });
      loadConversations();
    }
  }, [user]);

  useEffect(() => {
    socket.on('receiveMessage', data => {
      const conversationId = getConversationId(user.id, data.senderId);
      
      if (chatWith?.id === data.senderId) {
        setMessages(prev => [...prev, data]);
      }
      
      loadConversations();
    });
    
    return () => socket.off('receiveMessage');
  }, [chatWith, user]);

  const loadConversations = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/conversations?userId=${user.id}`);
      setConversations(res.data);
    } catch (err) {
      console.error('Failed to load conversations:', err);
    }
  };

  const handleAuth = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/${authMode}`, authForm);
      if (res.data.id) setUser(res.data);
      else alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  const searchUsers = async (term) => {
    setSearchTerm(term);
    if (term.trim() === '') return setUsers([]);
    const res = await axios.get(`http://localhost:3000/search?username=${term}`);
    setUsers(res.data.filter(u => u.id !== user?.id));
  };

  const openChat = async (userToChat) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/messages?userId1=${user.id}&userId2=${userToChat.id}`
      );
      setMessages(res.data);
      setChatWith(userToChat);
      
      await axios.post(`http://localhost:3000/markAsRead`, {
        userId1: user.id,
        userId2: userToChat.id
      });
      
      loadConversations();
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };

  const startNewChat = async (userToChat) => {
    setChatWith(userToChat);
    setMessages([]);
    setSearchTerm('');
    setUsers([]);
  };

  const sendMessage = async () => {
    if (!msg.trim()) return;
    const data = {
      senderId: user.id,
      receiverId: chatWith.id,
      message: msg
    };
    socket.emit('sendMessage', data);
    setMessages(prev => [...prev, { ...data, timestamp: new Date(), read: false }]);
    setMsg('');
    loadConversations();
  };

  if (!user) {
    return (
      <div style={styles.authContainer}>
        <div style={styles.authBox}>
          <h2 style={styles.authTitle}>{authMode === 'login' ? 'Login' : 'Register'}</h2>
          <input
            type="text"
            placeholder="Username"
            value={authForm.username}
            onChange={e => setAuthForm({ ...authForm, username: e.target.value })}
            style={styles.authInput}
          />
          <input
            type="password"
            placeholder="Password"
            value={authForm.password}
            onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
            style={styles.authInput}
          />
          <button onClick={handleAuth} style={styles.authButton}>
            {authMode === 'login' ? 'Login' : 'Register'}
          </button>
          <p 
            style={styles.authToggle} 
            onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
          >
            {authMode === 'login' ? 'No account? Register' : 'Have an account? Login'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.appContainer}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {/* Header */}
        <div style={styles.sidebarHeader}>
          <div style={styles.userInfo}>
            <div style={styles.avatar}>{user.username.charAt(0).toUpperCase()}</div>
            <span style={styles.username}>{user.username}</span>
          </div>
          <h3 style={styles.appTitle}>Campus Resource Sharing</h3>
        </div>
        
        {/* Search */}
        <div style={styles.searchContainer}>
          <input
            type="text"
            value={searchTerm}
            onChange={e => searchUsers(e.target.value)}
            placeholder="Search campus members"
            style={styles.searchInput}
          />
        </div>
        
        {/* Search results */}
        {users.length > 0 && (
          <div style={styles.searchResults}>
            {users.map(u => (
              <div 
                key={u.id} 
                style={styles.searchResultItem}
                onClick={() => startNewChat(u)}
              >
                <div style={styles.avatar}>{u.username.charAt(0).toUpperCase()}</div>
                <span>{u.username}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Conversations list */}
        <div style={styles.conversationsList}>
          {conversations.map(conv => {
            const otherUser = conv.user1.id === user.id ? conv.user2 : conv.user1;
            const lastMessage = conv.lastMessage;
            
            return (
              <div 
                key={conv.conversationId}
                style={{
                  ...styles.conversationItem,
                  backgroundColor: chatWith?.id === otherUser.id ? '#f0f2f5' : 'transparent'
                }}
                onClick={() => openChat(otherUser)}
              >
                <div style={styles.avatar}>{otherUser.username.charAt(0).toUpperCase()}</div>
                <div style={styles.conversationDetails}>
                  <div style={styles.conversationHeader}>
                    <span style={styles.conversationName}>{otherUser.username}</span>
                    <span style={styles.conversationTime}>
                      {lastMessage ? formatIST(lastMessage.timestamp) : ''}
                    </span>
                  </div>
                  <div style={styles.conversationPreview}>
                    <span style={{
                      ...styles.lastMessage,
                      fontWeight: lastMessage && !lastMessage.read && lastMessage.senderId !== user.id ? 'bold' : 'normal'
                    }}>
                      {lastMessage ? 
                        (lastMessage.senderId === user.id ? `You: ${lastMessage.message}` : lastMessage.message) : 
                        'No messages yet'}
                    </span>
                    {lastMessage && !lastMessage.read && lastMessage.senderId !== user.id && (
                      <span style={styles.unreadBadge}></span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Chat area */}
      <div style={styles.chatArea}>
        {chatWith ? (
          <>
            {/* Chat header */}
            <div style={styles.chatHeader}>
              <div style={styles.chatUserInfo}>
                <div style={styles.avatar}>{chatWith.username.charAt(0).toUpperCase()}</div>
                <span style={styles.chatUsername}>{chatWith.username}</span>
              </div>
            </div>
            
            {/* Messages */}
            <div style={styles.messagesContainer}>
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  style={{
                    ...styles.messageBubble,
                    alignSelf: m.senderId === user.id ? 'flex-end' : 'flex-start',
                    backgroundColor: m.senderId === user.id ? '#d9fdd3' : '#ffffff'
                  }}
                >
                  {m.message}
                  <div style={styles.messageTime}>
                    {formatIST(m.timestamp)}
                    {m.senderId === user.id && (
                      <span style={styles.messageStatus}>
                        {m.read ? '✓✓' : '✓'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message input */}
            <div style={styles.messageInputContainer}>
              <input
                type="text"
                value={msg}
                onChange={e => setMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                style={styles.messageInput}
              />
              <button 
                onClick={sendMessage}
                style={styles.sendButton}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div style={styles.emptyChat}>
            <div style={styles.emptyChatContent}>
              <h3>Campus Resource Sharing</h3>
              <p>Select a conversation to start sharing resources</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  authContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5'
    
  },
  authBox: {
    backgroundColor: '#ffffff',
    padding: '20px 30px',
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: 350,
    textAlign: 'center'
  },
  authTitle: {
    marginBottom: 20,
    color: '#333333'
  },
  authInput: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    border: '1px solid #ddd',
    borderRadius: 5,
    fontSize: 16
  },
  authButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#333333',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    fontSize: 16,
    cursor: 'pointer',
    marginBottom: 15
  },
  authToggle: {
    color: '#333333',
    cursor: 'pointer',
    fontSize: 14,
    margin: 0
  },
  appContainer: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Segoe UI, Helvetica Neue, Helvetica, sans-serif'
  },
  sidebar: {
    width: '30%',
    borderRight: '1px solid #e0e0e0',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column'
  },
  sidebarHeader: {
    padding: '10px 16px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  appTitle: {
    color: '#333333',
    margin: '10px 0 0 0',
    fontSize: '1.2rem'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: '#333333',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  username: {
    fontWeight: 'bold',
    color: '#212121'
  },
  searchContainer: {
    padding: '8px 12px',
    backgroundColor: '#f5f5f5'
  },
  searchInput: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: 8,
    border: 'none',
    backgroundColor: '#ffffff',
    fontSize: 14,
    outline: 'none'
  },
  searchResults: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e0e0e0'
  },
  searchResultItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#f0f0f0'
    }
  },
  conversationsList: {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: '#ffffff'
  },
  conversationItem: {
    display: 'flex',
    padding: '10px 12px',
    cursor: 'pointer',
    borderBottom: '1px solid #e0e0e0',
    ':hover': {
      backgroundColor: '#f0f0f0'
    }
  },
  conversationDetails: {
    flex: 1,
    marginLeft: 10,
    overflow: 'hidden'
  },
  conversationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 2
  },
  conversationName: {
    fontWeight: 'bold',
    color: '#212121',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  conversationTime: {
    fontSize: 12,
    color: '#757575'
  },
  conversationPreview: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  lastMessage: {
    fontSize: 14,
    color: '#757575',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '80%'
  },
  unreadBadge: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: '#333333',
    alignSelf: 'center'
  },
  chatArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f0f0f0',
    backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABqSURBVDhP7cxBCsAgDETR6P3P3KWVQqFQ6J8u8iELX0iYQZJmWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWfYHvgYvQ0QZt1jD1AAAAABJRU5ErkJggg==")'
  },
  chatHeader: {
    padding: '10px 16px',
    backgroundColor: '#f5f5f5',
    borderLeft: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  chatUserInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  chatUsername: {
    fontWeight: 'bold',
    color: '#212121'
  },
  messagesContainer: {
    flex: 1,
    padding: '20px 80px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  messageBubble: {
    maxWidth: '60%',
    padding: '8px 12px',
    borderRadius: '8px',
    marginBottom: 8,
    boxShadow: '0 1px 0.5px rgba(0, 0, 0, 0.13)',
    position: 'relative'
  },
  // messageTime: {
  //   fontSize: 11,
  //   color: '#757575',
  //   textAlign: 'right',
  //   marginTop: 4,
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'flex-end'
  // },
  // messageStatus: {
  //   marginLeft: 4,
  //   color:'#bdbdbd'
  // },
  messageTime: {
    fontSize: 11,
    color: '#757575',
    textAlign: 'right',
    marginTop: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  // messageStatus: {
  //   marginLeft: 4,
  //   color: '#e0e0e0' // Changed from green to light grey
  // },
  messageStatus: {
    marginLeft: 4,
    color: '#bdbdbd !important' // Force override
  },
  messageInputContainer: {
    padding: '8px 16px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center'
  },
  messageInput: {
    flex: 1,
    padding: '9px 12px',
    borderRadius: 8,
    border: 'none',
    outline: 'none',
    fontSize: 15
  },
  sendButton: {
    marginLeft: 10,
    padding: '9px 20px',
    backgroundColor: '#333333',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 15,
    fontWeight: 'bold'
  },
  emptyChat: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa'
  },
  emptyChatContent: {
    textAlign: 'center',
    color: '#757575'
  }
};


export default ChatApp;