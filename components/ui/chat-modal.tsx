"use client";

/**
 * Chat Modal Component
 * 
 * This component provides an interactive chatbot experience for users to get information 
 * about Moroccan cities, including hotel prices, restaurants, and attractions.
 * 
 * Features:
 * - Pre-defined question buttons for common inquiries
 * - City-specific information about costs and attractions
 * - Animated chat interface with smooth transitions
 * - Mobile-responsive design
 * - Auto-scroll to latest messages
 */

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, ChevronRight } from "lucide-react";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * City information database with pricing details for hotels, restaurants, and attractions
 * This can be extended with more cities and information categories as needed
 */
const cityInfo = {
  marrakech: {
    hotels: "Hotels in Marrakech range from $50-100/night for budget options to $200-500/night for luxury riads.",
    restaurants: "Meals range from $5-15 at local eateries to $30-70 at upscale restaurants.",
    attractions: "Main attractions include Jardin Majorelle ($8), Bahia Palace ($3), and Medina markets (free entry)."
  },
  casablanca: {
    hotels: "Hotels in Casablanca range from $60-120/night for budget options to $150-400/night for luxury hotels.",
    restaurants: "Meals range from $7-20 at local restaurants to $40-80 at upscale establishments.",
    attractions: "Main attractions include Hassan II Mosque ($12), Morocco Mall (free entry), and Old Medina (free entry)."
  },
  fez: {
    hotels: "Hotels in Fez range from $40-80/night for budget options to $120-300/night for luxury riads.",
    restaurants: "Meals range from $4-12 at local eateries to $25-60 at upscale restaurants.",
    attractions: "Main attractions include Al-Qarawiyyin Mosque (exterior only for non-Muslims), Bou Inania Madrasa ($3), and the Tanneries (usually requires a small tip)."
  },
  rabat: {
    hotels: "Hotels in Rabat range from $55-110/night for budget options to $150-350/night for luxury hotels.",
    restaurants: "Meals range from $6-18 at local restaurants to $35-70 at upscale establishments.",
    attractions: "Main attractions include Kasbah of the Udayas (free), Hassan Tower (free), and Chellah Necropolis ($2)."
  }
};

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Array<{text: string, isBot: boolean}>>([
    { text: "Hi there! I'm your Morocco travel assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (text: string = input) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text, isBot: false }]);
    setInput("");
    
    // Process the message and generate a response
    setTimeout(() => {
      let botResponse = "I'm not sure how to help with that. Would you like to know about prices in specific Moroccan cities?";
      
      const lowerText = text.toLowerCase();
      
      // Check for city information requests
      if (lowerText.includes("marrakech")) {
        if (lowerText.includes("hotel") || lowerText.includes("stay") || lowerText.includes("accommodation")) {
          botResponse = cityInfo.marrakech.hotels;
        } else if (lowerText.includes("restaurant") || lowerText.includes("food") || lowerText.includes("eat")) {
          botResponse = cityInfo.marrakech.restaurants;
        } else if (lowerText.includes("attraction") || lowerText.includes("visit") || lowerText.includes("see")) {
          botResponse = cityInfo.marrakech.attractions;
        } else {
          botResponse = "Marrakech is known as the 'Red City' and is famous for its vibrant markets, gardens, and historic sites. What would you like to know about? Hotels, restaurants, or attractions?";
        }
      } else if (lowerText.includes("casablanca")) {
        if (lowerText.includes("hotel") || lowerText.includes("stay") || lowerText.includes("accommodation")) {
          botResponse = cityInfo.casablanca.hotels;
        } else if (lowerText.includes("restaurant") || lowerText.includes("food") || lowerText.includes("eat")) {
          botResponse = cityInfo.casablanca.restaurants;
        } else if (lowerText.includes("attraction") || lowerText.includes("visit") || lowerText.includes("see")) {
          botResponse = cityInfo.casablanca.attractions;
        } else {
          botResponse = "Casablanca is Morocco's largest city and economic center, famous for the Hassan II Mosque and its cosmopolitan atmosphere. What would you like to know about? Hotels, restaurants, or attractions?";
        }
      } else if (lowerText.includes("fez") || lowerText.includes("fes")) {
        if (lowerText.includes("hotel") || lowerText.includes("stay") || lowerText.includes("accommodation")) {
          botResponse = cityInfo.fez.hotels;
        } else if (lowerText.includes("restaurant") || lowerText.includes("food") || lowerText.includes("eat")) {
          botResponse = cityInfo.fez.restaurants;
        } else if (lowerText.includes("attraction") || lowerText.includes("visit") || lowerText.includes("see")) {
          botResponse = cityInfo.fez.attractions;
        } else {
          botResponse = "Fez has one of the world's largest car-free urban areas and is known for its ancient walled city. What would you like to know about? Hotels, restaurants, or attractions?";
        }
      } else if (lowerText.includes("rabat")) {
        if (lowerText.includes("hotel") || lowerText.includes("stay") || lowerText.includes("accommodation")) {
          botResponse = cityInfo.rabat.hotels;
        } else if (lowerText.includes("restaurant") || lowerText.includes("food") || lowerText.includes("eat")) {
          botResponse = cityInfo.rabat.restaurants;
        } else if (lowerText.includes("attraction") || lowerText.includes("visit") || lowerText.includes("see")) {
          botResponse = cityInfo.rabat.attractions;
        } else {
          botResponse = "Rabat is Morocco's capital city, known for its Islamic and French-colonial heritage. What would you like to know about? Hotels, restaurants, or attractions?";
        }
      } else if (lowerText.includes("price") || lowerText.includes("cost") || lowerText.includes("how much")) {
        botResponse = "I can provide information about prices in various Moroccan cities. Which city are you interested in? Marrakech, Casablanca, Fez, or Rabat?";
      } else if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText === "hey") {
        botResponse = "Hello! I'm here to help with information about Moroccan cities and prices. Which city would you like to learn about?";
      } else if (lowerText.includes("thank")) {
        botResponse = "You're welcome! Is there anything else you'd like to know about Morocco?";
      }

      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 600);
  };

  const suggestedQuestions = [
    "What are hotel prices in Marrakech?",
    "Tell me about restaurants in Casablanca",
    "What attractions can I visit in Fez?",
    "How much do hotels cost in Rabat?"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden z-40 flex flex-col"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#8A1538] to-[#C53030] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageSquare className="h-4 w-4" />
              </div>
              <h3 className="font-medium text-lg">Morocco Travel Guide</h3>
            </div>
            <button onClick={onClose} className="text-white hover:text-white/70">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Chat area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            <div className="space-y-4">
              {messages.map((message, i) => (
                <div key={i} className={`max-w-[80%] ${message.isBot ? 'ml-0' : 'ml-auto'}`}>
                  <div className={`p-3 rounded-2xl shadow-sm ${message.isBot 
                    ? 'bg-white text-gray-800 border border-gray-100' 
                    : 'bg-gradient-to-r from-[#8A1538] to-[#C53030] text-white'}`}>
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Suggested questions */}
          {messages.length < 3 && (
            <div className="px-4 py-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button 
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="bg-gray-100 hover:bg-[#8A1538]/10 rounded-full px-3 py-1 text-xs text-gray-700 flex items-center gap-1 transition-colors"
                  >
                    {question.length > 25 ? question.substring(0, 25) + "..." : question}
                    <ChevronRight className="h-3 w-3" />
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input area */}
          <div className="p-4 border-t border-gray-200 bg-white flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Ask about cities and prices..." 
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              onClick={() => handleSendMessage()}
              className="h-10 w-10 rounded-full bg-gradient-to-r from-[#8A1538] to-[#C53030] text-white flex items-center justify-center transition-all hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
