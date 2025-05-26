
import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, FileText, Code, Image, MessageSquare, Palette, Settings, ArrowDown, Sparkles, Brain, Zap } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "AI Chat Assistant",
      description: "Advanced conversational AI with multi-model support including GPT, Gemini, and Claude",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Brain,
      title: "Smart Tutoring",
      description: "Personalized learning across subjects with adaptive teaching methodology",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Code,
      title: "Code Generation",
      description: "Write, debug, and explain code in 50+ programming languages",
      gradient: "from-green-500 to-teal-600"
    },
    {
      icon: FileText,
      title: "Document Processing",
      description: "Convert, analyze, and generate documents with AI-powered insights",
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: Image,
      title: "Vision & OCR",
      description: "Extract text from images and analyze visual content with precision",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      icon: Mic,
      title: "Voice Interface",
      description: "Natural speech interaction with real-time transcription and synthesis",
      gradient: "from-pink-500 to-rose-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars absolute inset-0"></div>
        <div className="twinkling absolute inset-0"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-white font-bold text-xl">MarkOne</span>
                <span className="text-gray-400 text-sm ml-2">AI</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/chat" className="text-gray-300 hover:text-white transition-colors duration-200">Chat</Link>
              <Link to="/upload" className="text-gray-300 hover:text-white transition-colors duration-200">Files</Link>
              <Link to="/code" className="text-gray-300 hover:text-white transition-colors duration-200">Code</Link>
              <Link to="/draw" className="text-gray-300 hover:text-white transition-colors duration-200">Draw</Link>
              <Settings className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-full text-sm text-gray-300 mb-6">
                <Zap className="w-4 h-4 mr-2 text-blue-400" />
                Powered by Advanced AI Models
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                MarkOne
              </span>
              <br />
              <span className="text-4xl md:text-5xl text-gray-300 font-normal">
                AI Assistant
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-6 max-w-4xl mx-auto leading-relaxed">
              Experience the next generation of AI-powered productivity
            </p>
            
            <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
              Chat, code, analyze documents, process images, and create with the power of multiple AI models in one unified platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link 
                to="/chat" 
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                <span className="relative z-10">Start Chatting</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </Link>
              <Link 
                to="/upload" 
                className="border border-gray-600 text-gray-300 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800/50 hover:border-gray-500 transition-all duration-300 backdrop-blur-sm"
              >
                Upload Files
              </Link>
            </div>

            <div className="animate-bounce">
              <ArrowDown className="w-6 h-6 text-gray-500 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Advanced Capabilities
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Professional-grade AI tools designed for maximum productivity and creativity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-500 hover:transform hover:scale-[1.02]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className={`relative w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="relative text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="relative text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Powered by Industry Leaders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['OpenAI GPT', 'Google Gemini', 'Anthropic Claude', 'Meta LLaMA'].map((tech) => (
              <div key={tech} className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                <p className="text-white font-semibold">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">
            © 2024 MarkOne AI - Professional AI Assistant Platform
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .stars {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><circle cx="100" cy="100" r="1" fill="white" opacity="0.8"/><circle cx="300" cy="200" r="1" fill="white" opacity="0.6"/><circle cx="500" cy="150" r="1" fill="white" opacity="0.9"/><circle cx="700" cy="300" r="1" fill="white" opacity="0.7"/><circle cx="900" cy="250" r="1" fill="white" opacity="0.5"/><circle cx="200" cy="400" r="1" fill="white" opacity="0.8"/><circle cx="600" cy="500" r="1" fill="white" opacity="0.6"/><circle cx="800" cy="600" r="1" fill="white" opacity="0.9"/><circle cx="400" cy="700" r="1" fill="white" opacity="0.7"/><circle cx="150" cy="800" r="1" fill="white" opacity="0.5"/></svg>') repeat;
          animation: move-stars 50s linear infinite;
        }
        
        .twinkling {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><circle cx="250" cy="100" r="0.5" fill="cyan" opacity="0.8"/><circle cx="450" cy="300" r="0.5" fill="purple" opacity="0.6"/><circle cx="650" cy="200" r="0.5" fill="pink" opacity="0.9"/><circle cx="850" cy="400" r="0.5" fill="blue" opacity="0.7"/></svg>') repeat;
          animation: move-twinkling 100s linear infinite;
        }
        
        @keyframes move-stars {
          from { transform: translateY(0px); }
          to { transform: translateY(-1000px); }
        }
        
        @keyframes move-twinkling {
          from { transform: translateY(0px); }
          to { transform: translateY(-1000px); }
        }
      `}</style>
    </div>
  );
};

export default Index;
