'use client';

import React from 'react';
import { MoreVertical, Calendar, Clock, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  className?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description, status, className }) => {
  const statusColors = {
    pending: "text-amber-500 bg-amber-500/10",
    in_progress: "text-blue-500 bg-blue-500/10",
    completed: "text-emerald-500 bg-emerald-500/10",
  };

  return (
    <div className={cn("glass-card p-5 rounded-xl group relative overflow-hidden", className)}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[40px] -mr-16 -mt-16 group-hover:bg-accent/10 transition-all" />
      
      <div className="flex justify-between items-start mb-4">
        <div className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider", statusColors[status])}>
          {status.replace('_', ' ')}
        </div>
        <button className="text-gray-500 hover:text-white transition-colors">
          <MoreVertical size={16} />
        </button>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">{title}</h3>
      <p className="text-sm text-gray-400 mb-6 line-clamp-2">{description}</p>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-obsidian bg-industrial-gray flex items-center justify-center text-[10px] font-bold text-gray-400">
                U{i}
              </div>
            ))}
          </div>
          <span className="text-[10px] text-gray-500 font-medium">+2 more</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Clock size={12} />
          <span className="text-[10px] font-mono tracking-tighter uppercase">2d left</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
