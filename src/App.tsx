import React, { useState, useRef, useCallback } from 'react';
import { PianoKeys } from './components/PianoKeys';
import { ControlPanel } from './components/ControlPanel';
import { SequenceDisplay } from './components/SequenceDisplay';
import { AudioEngine } from './utils/AudioEngine';

export interface Note {
  name: string;
  frequency: number;
  color: string;
}

const notes: Note[] = [
  { name: 'C', frequency: 261.63, color: 'bg-red-500' },
  { name: 'D', frequency: 293.66, color: 'bg-orange-500' },
  { name: 'E', frequency: 329.63, color: 'bg-yellow-500' },
  { name: 'F', frequency: 349.23, color: 'bg-green-500' },
  { name: 'G', frequency: 392.00, color: 'bg-blue-500' },
  { name: 'A', frequency: 440.00, color: 'bg-indigo-500' },
  { name: 'B', frequency: 493.88, color: 'bg-purple-500' },
  { name: 'C1', frequency: 523.25, color: 'bg-pink-500' },
];

function App() {
  const [sequence, setSequence] = useState<Note[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(-1);
  const [sequenceLength, setSequenceLength] = useState(5);
  const [playbackSpeed, setPlaybackSpeed] = useState(500);
  const audioEngineRef = useRef(new AudioEngine());

  const playNote = useCallback(async (note: Note) => {
    await audioEngineRef.current.playNote(note.frequency, 0.3);
  }, []);

  const generateRandomSequence = useCallback(() => {
    const newSequence: Note[] = [];
    for (let i = 0; i < sequenceLength; i++) {
      const randomIndex = Math.floor(Math.random() * notes.length);
      newSequence.push(notes[randomIndex]);
    }
    setSequence(newSequence);
    setCurrentNoteIndex(-1);
  }, [sequenceLength]);

  const playSequence = useCallback(async () => {
    if (sequence.length === 0) return;
    
    setIsPlaying(true);
    setCurrentNoteIndex(-1);

    for (let i = 0; i < sequence.length; i++) {
      setCurrentNoteIndex(i);
      await playNote(sequence[i]);
      await new Promise(resolve => setTimeout(resolve, playbackSpeed));
    }

    setCurrentNoteIndex(-1);
    setIsPlaying(false);
  }, [sequence, playNote, playbackSpeed]);

  const stopSequence = useCallback(() => {
    setIsPlaying(false);
    setCurrentNoteIndex(-1);
  }, []);

  const clearSequence = useCallback(() => {
    setSequence([]);
    setCurrentNoteIndex(-1);
  }, []);

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎵 Music Generator
          </h1>
          <p className="text-white/80 text-lg">
            Create beautiful melodies with random note sequences
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Piano Keys */}
          <div className="glass-effect rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Piano Keys</h2>
            <PianoKeys 
              notes={notes} 
              onNotePlay={playNote}
              currentPlayingNote={currentNoteIndex >= 0 ? sequence[currentNoteIndex] : null}
            />
          </div>

          {/* Control Panel */}
          <div className="glass-effect rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Controls</h2>
            <ControlPanel
              sequenceLength={sequenceLength}
              playbackSpeed={playbackSpeed}
              isPlaying={isPlaying}
              hasSequence={sequence.length > 0}
              onSequenceLengthChange={setSequenceLength}
              onPlaybackSpeedChange={setPlaybackSpeed}
              onGenerateSequence={generateRandomSequence}
              onPlaySequence={playSequence}
              onStopSequence={stopSequence}
              onClearSequence={clearSequence}
            />
          </div>

          {/* Sequence Display */}
          {sequence.length > 0 && (
            <div className="glass-effect rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Generated Sequence</h2>
              <SequenceDisplay 
                sequence={sequence} 
                currentNoteIndex={currentNoteIndex}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;