'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SignIn from '@/components/ui/signin-page';
import { 
  Plus, 
  LogOut, 
  CheckCircle2, 
  Trash2, 
  Clock, 
  User as UserIcon, 
  Shield, 
  Filter,
  MoreVertical,
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = 'http://localhost:8000/api/v1';

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken) setToken(savedToken);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/tasks/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = (userData: any, authToken: string) => {
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    try {
      await axios.post(`${API_URL}/tasks/`, { title: taskTitle, status: 'pending' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTaskTitle('');
      fetchTasks();
    } catch (err) {
      alert('Failed to create task');
    }
  };

  const toggleTaskStatus = async (task: any) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      await axios.put(`${API_URL}/tasks/${task.id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setTasks([]);
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  if (!token) {
    return <SignIn onSuccess={handleAuthSuccess} />;
  }

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
          <LayoutDashboard className="text-white" size={18} />
        </div>
        <span className="font-bold text-xl tracking-tight">HUB OS</span>
      </div>

      <nav className="flex-1 space-y-2">
        {[
          { id: 'all', label: 'All Operations', icon: Filter },
          { id: 'pending', label: 'In Progress', icon: Clock },
          { id: 'completed', label: 'Finalized', icon: CheckCircle2 },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setFilter(item.id as any);
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              filter === item.id 
                ? 'bg-primary/10 text-primary font-bold border border-primary/20' 
                : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-border">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
              {user?.role === 'admin' ? <Shield size={18} className="text-destructive" /> : <UserIcon size={18} className="text-primary" />}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user?.email?.split('@')[0]}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{user?.role}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/5"
          >
            <LogOut size={16} />
            Terminate Session
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#020817] text-foreground flex flex-col lg:flex-row overflow-x-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-border flex-col p-6 bg-card/50 backdrop-blur-xl h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-card border-r border-border p-6 z-50 lg:hidden flex flex-col"
            >
              <div className="absolute top-6 right-6">
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-muted-foreground"><X size={24}/></button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header - Sticky on Mobile */}
        <header className="lg:hidden sticky top-0 bg-[#020817]/80 backdrop-blur-md border-b border-border z-30 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-white/5 rounded-lg text-primary"
            >
              <Menu size={24} />
            </button>
            <span className="font-bold text-lg tracking-tight">HUB OS</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
             {user?.role === 'admin' ? <Shield size={16} className="text-destructive" /> : <UserIcon size={16} className="text-primary" />}
          </div>
        </header>

        <div className="p-4 sm:p-8 lg:p-12 w-full max-w-5xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Welcome, <span className="text-primary">Operator</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">Manage critical task infrastructure protocols.</p>
            </div>
            
            {/* Responsive Filter Tabs */}
            <div className="w-full md:w-auto overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5 min-w-max">
                {['all', 'pending', 'completed'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`relative px-5 py-2 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 z-10 min-w-[80px] ${
                      filter === f ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {f}
                    {filter === f && (
                      <motion.div
                        layoutId="activeFilter"
                        className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Add Form - Full width on mobile */}
          <form onSubmit={createTask} className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Plus className="text-primary" size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Initialize new task protocol..." 
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full h-14 sm:h-16 pl-12 pr-28 sm:pr-32 bg-card border border-border rounded-2xl text-sm sm:text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-xl shadow-black/20"
            />
            <button 
              type="submit"
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-[10px] sm:text-sm shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              Deploy
            </button>
          </form>

          {/* Task List - Adaptive Layout */}
          <div className="space-y-3 sm:space-y-4">
            {loading && tasks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 opacity-50">
                <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                <p className="text-sm font-medium">Synchronizing...</p>
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`group relative p-4 sm:p-5 border transition-all duration-500 rounded-2xl flex items-center gap-3 sm:gap-4 ${
                    task.status === 'completed' 
                      ? 'bg-black border-white/5 opacity-40 grayscale-[0.5]' 
                      : 'bg-card border-border hover:border-primary/40'
                  }`}
                >
                  <button 
                    onClick={() => toggleTaskStatus(task)}
                    className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 transition-all flex items-center justify-center ${
                      task.status === 'completed' 
                        ? 'bg-primary border-primary text-white' 
                        : 'border-muted-foreground group-hover:border-primary'
                    }`}
                  >
                    {task.status === 'completed' && <CheckCircle2 size={12} strokeWidth={4} />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm sm:text-lg font-bold truncate transition-all ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-2 sm:gap-3 mt-1">
                      <span className="text-[8px] sm:text-[10px] font-mono text-muted-foreground uppercase">ID: {task.id}</span>
                      <div className="w-0.5 h-0.5 rounded-full bg-border" />
                      <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-widest ${task.status === 'completed' ? 'text-green-500' : 'text-amber-500'}`}>
                        {task.status === 'completed' ? 'Finalized' : 'In Progress'}
                      </span>
                    </div>
                  </div>

                  {/* Actions - Always visible on mobile, hover on desktop */}
                  <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="p-1.5 sm:p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                    >
                      <Trash2 size={16} className="sm:w-[18px]" />
                    </button>
                    <button className="p-1.5 sm:p-2 text-muted-foreground hover:text-white hover:bg-white/5 rounded-lg transition-all">
                      <MoreVertical size={16} className="sm:w-[18px]" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {!loading && filteredTasks.length === 0 && (
              <div className="py-16 sm:py-24 text-center bg-card/30 rounded-3xl border border-dashed border-border px-6">
                <Filter className="text-muted-foreground mx-auto mb-4" size={32} />
                <h3 className="text-lg sm:text-xl font-bold text-muted-foreground">No operations found</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xs mx-auto">Your operational queue is currently empty for this specific protocol filter.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
