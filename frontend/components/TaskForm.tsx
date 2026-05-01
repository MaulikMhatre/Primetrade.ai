'use client';

import React from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { toast } from 'sonner';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    status: 'pending'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/tasks/', formData);
      toast.success('Operation Successful', {
        description: 'New task initialized in the database.'
      });
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Initialization Failed', {
        description: 'Check your connection or permissions.'
      });
    } finally {
      setLoading(false);
    }
  };

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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg glass border border-white/10 rounded-2xl overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Initialize New Task</h3>
              <button type="button" onClick={onClose} className="text-gray-500 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Title</label>
                <input 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-accent/50"
                  placeholder="Operational objective..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Description</label>
                <textarea 
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-accent/50"
                  placeholder="Technical specifications..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Initial Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-accent/50"
                >
                  <option value="pending" className="bg-obsidian">Pending</option>
                  <option value="in_progress" className="bg-obsidian">In Progress</option>
                  <option value="completed" className="bg-obsidian">Completed</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 glass border border-white/5 py-3 rounded-xl text-gray-400 font-bold hover:text-white transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={loading}
                className="flex-2 bg-accent hover:bg-accent/90 text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 industrial-glow transition-all"
              >
                {loading ? 'Processing...' : (
                  <>
                    <Check size={18} />
                    <span>Deploy Task</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskForm;
