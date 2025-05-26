"use client";

/**
 * Chatbot Button Component
 * 
 * This component renders a floating action button that opens a chat interface
 * with information about Moroccan cities and travel costs.
 * 
 * Features:
 * - Animated button with hover effects
 * - Tooltip display on hover
 * - Opens chat modal on click
 * - Hides when chat is open
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { ChatModal } from "./chat-modal";

export function ChatbotButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  return (
    <>
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      <AnimatePresence>
        {!isChatOpen && (
          <motion.div 
            className="fixed bottom-6 right-6 z-40"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full mb-2 right-0 bg-white dark:bg-gray-800 px-4 py-2 rounded-md shadow-lg text-sm font-medium"
                >
                  Ask about Morocco
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.button
              onClick={() => setIsChatOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center justify-center w-16 h-16 rounded-full shadow-lg"
            >
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#8A1538] to-[#C53030]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.15)_20%,rgba(255,255,255,0)_80%)]"></div>
              </div>
              <div className="relative z-10 flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <span className="sr-only">Open Chat</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}