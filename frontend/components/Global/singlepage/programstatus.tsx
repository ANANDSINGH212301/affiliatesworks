import React from 'react'

interface ProgramStatusProps {
    status: 'Active' | 'Paused' | 'Closed';
  }
  
const ProgramStatus = ({ status }: ProgramStatusProps) => {
    const statusColors: Record<'Active' | 'Paused' | 'Closed', { bg: string; text: string }> = {
        Active: {
          bg: 'bg-emerald-200',
          text: 'text-emerald-800',
        },
        Paused: {
          bg: 'bg-orange-200',
          text: 'text-orange-800',
        },
        Closed: {
          bg: 'bg-red-200',
          text: 'text-red-800',
        },
      };
      
      
    
  return (
    <span
      className={`${statusColors[status].bg} ${statusColors[status].text} px-4 py-0.5 text-sm font-medium rounded-full`}
    >
      {status}
    </span>

  )
}

export default ProgramStatus
