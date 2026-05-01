'use client';

import React from 'react';
import { LayoutDashboard, CheckSquare, Settings, LogOut, User, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: CheckSquare, label: 'Tasks', active: false },
    { icon: User, label: 'Profile', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <>
      <button 
        className="fixed top-4 left-4 z-50 p-2 glass rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={20} />
      </button>
      
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 glass border-r border-white/10 transition-transform duration-300 md:translate-x-0",
        !isOpen && "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center industrial-glow">
              <CheckSquare className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">OBSIDIAN</h1>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                  item.active 
                    ? "bg-accent/10 text-accent border border-accent/20" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon size={18} className={cn(
                  item.active ? "text-accent" : "text-gray-500 group-hover:text-white"
                )} />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/5">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/5 group">
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
