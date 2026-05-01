'use client';

import React from 'react';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = React.useState(true);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md glass border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="p-8">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-400 text-sm">
                {isLogin 
                  ? 'Enter your credentials to access the obsidian dashboard.' 
                  : 'Join the industrial revolution in task management.'}
              </p>
            </div>

            <form className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 transition-all"
                  />
                </div>
              )}
              
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 transition-all"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="password" 
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 transition-all"
                />
              </div>

              <button className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 industrial-glow transition-all active:scale-[0.98]">
                {isLogin ? 'Sign In' : 'Get Started'}
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-gray-500 text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-accent hover:underline font-medium"
                >
                  {isLogin ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
