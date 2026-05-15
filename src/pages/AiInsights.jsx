import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ai-insights.css";
import { apiCall } from "../api";
import DashboardSidebar from "../components/DashboardSidebar";

const AIInsights = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  
  // Chat State
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiCall("/api/users/profile", "GET");
        const user = res.data || res.user || res;
        setUserData(user);
        
        // Initial Bot Message
        setMessages([{
          type: 'bot',
          text: `Hello ${user.firstName || 'there'}! 👋 I'm your SecureX AI Assistant. I can help you with transactions, trust scores, and security tips. How can I assist you today?`
        }]);
      } catch (err) {
        console.error(err);
        setUserData({ firstName: "Guest" });
      }
    };
    fetchUser();
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getInitials = (user) => {
    if (!user) return "??";
    return ((user.firstName?.[0] || "") + (user.lastName?.[0] || "")).toUpperCase() || "U";
  };

  // Send Message
  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = { type: 'user', text: text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Call Chatbot API
      const res = await apiCall("/api/chatbot", "POST", { message: text });
      
      const botMessage = { 
        type: 'bot', 
        text: res.reply || "I'm sorry, I didn't understand that." 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: "I'm having trouble connecting right now. Please try again later." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick Action Buttons
  const quickActions = [
    { label: "Start a Transaction", icon: "📝", action: () => navigate("/create-transaction") },
    { label: "Check Trust Score", icon: "🛡️", action: () => handleSend("What is my trust score?") },
    { label: "Security Tips", icon: "💡", action: () => handleSend("Give me security tips") },
    { label: "Dispute Help", icon: "⚖️", action: () => handleSend("How do I resolve a dispute?") }
  ];

  return (
    <div className="ai-page">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="ai-main">
        <header className="ai-header">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6H21M3 12H21M3 18H21" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          
          <div className="header-title">
            <div className="bot-avatar-header">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                 <circle cx="12" cy="12" r="10" stroke="#4A5CF5" strokeWidth="2"/>
                 <path d="M8 14S9.5 16 12 16S16 14 16 14" stroke="#4A5CF5" strokeWidth="2" strokeLinecap="round"/>
                 <circle cx="9" cy="10" r="1.5" fill="#4A5CF5"/>
                 <circle cx="15" cy="10" r="1.5" fill="#4A5CF5"/>
               </svg>
            </div>
            <div>
              <h1>SecureX AI Assistant</h1>
              <span className="status-badge">Online</span>
            </div>
          </div>

          <div className="header-actions">
            <button className="user-btn"><div className="user-avatar-small">{getInitials(userData)}</div></button>
          </div>
        </header>

        {/* Chat Area */}
        <div className="chat-container">
          <div className="messages-area">
            {messages.map((msg, index) => (
              <div key={index} className={`message-row ${msg.type}`}>
                {msg.type === 'bot' && (
                  <div className="avatar-bot">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#4A5CF5" strokeWidth="2"/><path d="M8 14S9.5 16 12 16S16 14 16 14" stroke="#4A5CF5" strokeWidth="2" strokeLinecap="round"/></svg>
                  </div>
                )}
                <div className={`message-bubble ${msg.type}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message-row bot">
                <div className="avatar-bot"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#4A5CF5" strokeWidth="2"/></svg></div>
                <div className="message-bubble bot typing">
                  <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions (Show if few messages) */}
          {messages.length <= 1 && (
            <div className="quick-actions-overlay">
              <p>I can help you with:</p>
              <div className="quick-action-grid">
                {quickActions.map((action, i) => (
                  <button key={i} className="quick-action-btn" onClick={action.action}>
                    <span className="action-icon">{action.icon}</span>
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="input-area">
          <div className="input-container">
            <textarea 
              placeholder="Type your message..." 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              rows="1"
            />
            <button className="send-btn" onClick={() => handleSend()} disabled={!input.trim()}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M18 10L3 3L6 10L3 17L18 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 10H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <p className="input-hint">SecureX AI can make mistakes. Consider checking important information.</p>
        </div>
      </main>
    </div>
  );
};

export default AIInsights;