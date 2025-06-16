import React, { useState } from 'react';
import { Note } from '../App';

interface PianoKeysProps {
  notes: Note[];
  onNotePlay: (note: Note) => void;
  currentPlayingNote: Note | null;
}

export const PianoKeys: React.FC<PianoKeysProps> = ({ 
  notes, 
  onNotePlay, 
  currentPlayingNote 
}) => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const handleKeyPress = async (note: Note) => {
    setPressedKey(note.name);
    await onNotePlay(note);
    setTimeout(() => setPressedKey(null), 150);
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {notes.map((note) => (
        <button
          key={note.name}
          onClick={() => handleKeyPress(note)}
          className={`
            piano-key relative overflow-hidden
            w-16 h-24 rounded-lg font-semibold text-white shadow-lg
            hover:shadow-xl hover:scale-105 active:scale-95
            transition-all duration-150 ease-out
            ${note.color}
            ${pressedKey === note.name || currentPlayingNote?.name === note.name 
              ? 'playing ring-4 ring-white/50' 
              : ''
            }
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <span className="text-lg font-bold">{note.name}</span>
            <span className="text-xs opacity-75">
              {Math.round(note.frequency)}Hz
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};