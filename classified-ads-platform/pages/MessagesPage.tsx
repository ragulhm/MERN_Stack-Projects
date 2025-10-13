
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchConversations, postMessage } from '../services/api';
import type { Conversation, Message } from '../types';
import Spinner from '../components/Spinner';

const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [unreadConversations, setUnreadConversations] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    const loadConversations = async () => {
      setLoading(true);
      const data = await fetchConversations(user.id);
      setConversations(data);
      if (data.length > 0) {
        setSelectedConversation(data[0]);
      }
      setLoading(false);
    };
    loadConversations();
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation?.messages]);

  const handleSelectConversation = (convo: Conversation) => {
    setSelectedConversation(convo);
    // Mark as read by removing from the unread set
    setUnreadConversations(prev => {
      const newSet = new Set(prev);
      newSet.delete(convo.id);
      return newSet;
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || !user) return;
    
    const currentConvoId = selectedConversation.id;
    const receiver = selectedConversation.participants.find(p => p.id !== user.id);
    if (!receiver) return;

    const messageData = { senderId: user.id, receiverId: receiver.id, text: newMessage };

    // 1. Send user's message and update state immediately
    const sentMessage = await postMessage(currentConvoId, messageData);
    
    setConversations(prev => prev.map(c => 
        c.id === currentConvoId ? { ...c, messages: [...c.messages, sentMessage] } : c
    ));
    setSelectedConversation(prev => prev ? ({ ...prev, messages: [...prev.messages, sentMessage] }) : null);
    setNewMessage('');

    // 2. Simulate a real-time reply after a short delay
    setTimeout(() => {
        const replyMessage: Message = {
            id: `msg-reply-${Date.now()}`,
            senderId: receiver.id,
            receiverId: user.id,
            text: `Received your message about the "${selectedConversation.productTitle}". I will reply shortly.`,
            timestamp: new Date().toISOString(),
        };

        // 3. Update state with the reply
        setConversations(prev => prev.map(c => 
            c.id === currentConvoId ? { ...c, messages: [...c.messages, replyMessage] } : c
        ));

        setSelectedConversation(prevSelected => {
            // If user is still viewing this chat, add the message to their view
            if (prevSelected && prevSelected.id === currentConvoId) {
                return { ...prevSelected, messages: [...prevSelected.messages, replyMessage] };
            } 
            // If user has navigated away, mark the conversation as unread
            else {
                setUnreadConversations(prevUnread => new Set(prevUnread).add(currentConvoId));
                return prevSelected;
            }
        });
    }, 1500);
  };

  if (loading) return <Spinner />;
  if (!user) return null;

  const otherUser = selectedConversation?.participants.find(p => p.id !== user.id);

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Conversations List */}
      <aside className="w-1/3 border-r overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-primary">Chats</h2>
        </div>
        <ul>
          {conversations.map(convo => {
            const participant = convo.participants.find(p => p.id !== user.id);
            if (!participant) return null;
            return (
              <li
                key={convo.id}
                onClick={() => handleSelectConversation(convo)}
                className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${selectedConversation?.id === convo.id ? 'bg-gray-200' : ''}`}
              >
                <img src={participant.profilePicture} alt={participant.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                <div className="flex-grow">
                  <p className="font-semibold">{participant.name}</p>
                  <p className="text-sm text-gray-500 truncate">{convo.productTitle}</p>
                </div>
                {unreadConversations.has(convo.id) && (
                    <span className="w-3 h-3 bg-accent rounded-full animate-pulse ml-2"></span>
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Chat Window */}
      <main className="w-2/3 flex flex-col">
        {selectedConversation && otherUser ? (
          <>
            <div className="flex items-center p-4 border-b bg-gray-50">
              <img src={otherUser.profilePicture} alt={otherUser.name} className="w-10 h-10 rounded-full object-cover mr-3" />
              <div>
                <p className="font-bold">{otherUser.name}</p>
                <div className={`flex items-center text-xs ${otherUser.isOnline ? 'text-green-500' : 'text-gray-400'}`}>
                    <span className={`w-2 h-2 rounded-full mr-1 ${otherUser.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    {otherUser.isOnline ? 'Online' : 'Offline'}
                </div>
              </div>
            </div>
            <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
                {selectedConversation.messages.map(msg => (
                    <div key={msg.id} className={`flex mb-4 ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`rounded-lg px-4 py-2 max-w-sm ${msg.senderId === user.id ? 'bg-primary text-white' : 'bg-white'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t bg-white">
                <form onSubmit={handleSendMessage} className="flex">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
                    />
                    <button type="submit" className="bg-primary text-white px-6 font-bold rounded-r-lg hover:bg-primary-light transition-colors">
                        Send
                    </button>
                </form>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Select a conversation to start chatting.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MessagesPage;
