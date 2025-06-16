import React from 'react';
import { Note } from '../App';

interface SequenceDisplayProps {
  sequence: Note[];
  currentNoteIndex: number;
}

export const SequenceDisplay: React.FC<SequenceDisplayProps> = ({ 
  sequence, 
  currentNoteIndex 
}) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {sequence.map((note, index) => (
        <div
          key={index}
          className={`
            relative w-12 h-12 rounded-full flex items-center justify-center
            font-bold text-white shadow-lg transition-all duration-200
            ${note.color}
            ${index === currentNoteIndex 
              ? 'ring-4 ring-white scale-110 sequence-note' 
              : 'hover:scale-105'
            }
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
          <span className="relative z-10 text-sm">{note.name}</span>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white/60">
            {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
};