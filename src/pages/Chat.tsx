
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, Mic, Settings, User, FileText, Paperclip, RotateCcw, Copy, ThumbsUp, ThumbsDown, Code, Image, FileUp, Zap, Camera, Upload, Download, Scan, Plus, X, Sparkles } from 'lucide-react';
import FileConverter from '../components/FileConverter';
import OCRProcessor from '../components/OCRProcessor';
import CodeGenerator from '../components/CodeGenerator';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m MarkOne AI, your advanced space-age AI assistant. I can help you with coding, document analysis, file conversion, OCR, creative writing, problem-solving, and much more. What would you like to explore today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: generateAIResponse(message),
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string) => {
    if (userMessage.toLowerCase().includes('convert') || userMessage.toLowerCase().includes('file')) {
      return "I can help you convert files between various formats! I support:\n\n📄 **Document Conversion**: PDF ↔ DOCX ↔ TXT ↔ HTML\n📊 **Spreadsheet Conversion**: XLSX ↔ CSV ↔ JSON\n🖼️ **Image Conversion**: PNG ↔ JPG ↔ WEBP ↔ SVG\n🎵 **Audio/Video**: MP4 ↔ MP3 ↔ WAV\n\nJust upload your file and I'll convert it instantly!";
    }
    if (userMessage.toLowerCase().includes('ocr') || userMessage.toLowerCase().includes('text from image')) {
      return "🔍 **OCR (Optical Character Recognition)** ready! I can extract text from:\n\n• Screenshots and photos\n• Scanned documents\n• Handwritten notes\n• PDFs with images\n• Any image with text\n\nUpload an image and I'll extract all readable text with 99%+ accuracy!";
    }
    if (userMessage.toLowerCase().includes('code') || userMessage.toLowerCase().includes('program')) {
      return "💻 **Code Generation & Analysis** activated! I can:\n\n🚀 **Generate**: Complete apps, functions, algorithms\n🔧 **Debug**: Find and fix errors instantly\n📖 **Explain**: Break down complex code\n🎨 **Optimize**: Improve performance\n\nSupported languages: Python, JavaScript, React, Node.js, C++, Java, and 50+ more!";
    }
    
    const responses = [
      "🌟 I understand you're asking about that. Let me provide you with a comprehensive analysis and solution using my advanced AI capabilities.",
      "🚀 That's an excellent question! Here's how I would approach this problem using cutting-edge reasoning and multiple perspectives.",
      "⭐ I can help you with that. Based on my training on diverse datasets, here's what I recommend for your specific use case.",
      "🌌 Great point! Let me break this down step by step and provide you with actionable insights and detailed explanations."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = target.scrollHeight + 'px';
  };

  const features = [
    { id: 'converter', name: 'File Converter', icon: FileUp, component: FileConverter },
    { id: 'ocr', name: 'OCR Scanner', icon: Scan, component: OCRProcessor },
    { id: 'code', name: 'Code Generator', icon: Code, component: CodeGenerator }
  ];

  const quickActions = [
    { icon: FileUp, label: 'Upload', action: () => fileInputRef.current?.click() },
    { icon: Camera, label: 'OCR', action: () => setActiveFeature('ocr') },
    { icon: Code, label: 'Code', action: () => setActiveFeature('code') },
    { icon: FileText, label: 'Convert', action: () => setActiveFeature('converter') }
  ];

  const models = [
    { value: 'gpt-4', label: 'GPT-4 Turbo' },
    { value: 'claude', label: 'Claude 3 Sonnet' },
    { value: 'gemini', label: 'Gemini Pro' },
    { value: 'qwen', label: 'Qwen 2.5' },
    { value: 'deepseek', label: 'DeepSeek' }
  ];

  const chatHistory = [
    { title: "File Conversion Help", time: "2 hours ago" },
    { title: "Python Code Review", time: "Yesterday" },
    { title: "OCR Text Extraction", time: "3 days ago" },
    { title: "Document Analysis", time: "1 week ago" }
  ];

  const renderActiveFeature = () => {
    const feature = features.find(f => f.id === activeFeature);
    if (!feature) return null;
    
    const FeatureComponent = feature.component;
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{feature.name}</h2>
            <button
              onClick={() => setActiveFeature(null)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <FeatureComponent />
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-white dark:bg-gray-900 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">MarkOne AI</div>
                <div className="text-xs text-gray-500">Space-Age Assistant</div>
              </div>
            </Link>
          </div>
          <button className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {chatHistory.map((chat, index) => (
              <div key={index} className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer group">
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{chat.title}</div>
                <div className="text-xs text-gray-500">{chat.time}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <select 
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {models.map(model => (
              <option key={model.value} value={model.value}>{model.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">MarkOne AI</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {features.map(feature => {
              const IconComponent = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  title={feature.name}
                >
                  <IconComponent className="w-5 h-5" />
                </button>
              );
            })}
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-8 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} space-x-4`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' 
                      ? 'bg-blue-500 ml-3' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 mr-3'
                  }`}>
                    {msg.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  <div className={`group relative ${
                    msg.role === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  } rounded-2xl px-4 py-3 shadow-sm`}>
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.content.split('\n').map((line, i) => (
                        <div key={i} className={line.startsWith('**') ? 'font-semibold' : ''}>
                          {line}
                        </div>
                      ))}
                    </div>
                    
                    <div className={`mt-2 text-xs opacity-70`}>
                      {msg.timestamp}
                    </div>
                    
                    {msg.role === 'assistant' && (
                      <div className="absolute -bottom-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded transition-colors">
                          <Copy className="w-3 h-3" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-green-500 hover:bg-white dark:hover:bg-gray-700 rounded transition-colors">
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-white dark:hover:bg-gray-700 rounded transition-colors">
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="mb-8 flex justify-start">
                <div className="flex space-x-4 max-w-[80%]">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-4">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={() => {}}
                accept="*/*"
              />
              
              <div className="flex space-x-2">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={action.action}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      title={action.label}
                    >
                      <IconComponent className="w-5 h-5" />
                    </button>
                  );
                })}
              </div>
              
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onInput={handleInputResize}
                  placeholder="Message MarkOne AI..."
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[48px] max-h-32"
                  rows={1}
                />
                
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className={`absolute right-2 bottom-2 p-2 rounded-lg transition-all duration-200 ${
                    message.trim()
                      ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <Mic className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-3 text-xs text-gray-500 text-center">
              MarkOne AI can make mistakes. Consider checking important information.
            </div>
          </div>
        </div>
      </div>

      {/* Feature Modals */}
      {renderActiveFeature()}
    </div>
  );
};

export default Chat;
