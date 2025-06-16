import React from 'react';

interface ControlPanelProps {
  sequenceLength: number;
  playbackSpeed: number;
  isPlaying: boolean;
  hasSequence: boolean;
  onSequenceLengthChange: (length: number) => void;
  onPlaybackSpeedChange: (speed: number) => void;
  onGenerateSequence: () => void;
  onPlaySequence: () => void;
  onStopSequence: () => void;
  onClearSequence: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  sequenceLength,
  playbackSpeed,
  isPlaying,
  hasSequence,
  onSequenceLengthChange,
  onPlaybackSpeedChange,
  onGenerateSequence,
  onPlaySequence,
  onStopSequence,
  onClearSequence,
}) => {
  return (
    <div className="space-y-6">
      {/* Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white font-medium mb-2">
            Sequence Length: {sequenceLength}
          </label>
          <input
            type="range"
            min="3"
            max="12"
            value={sequenceLength}
            onChange={(e) => onSequenceLengthChange(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            disabled={isPlaying}
          />
          <div className="flex justify-between text-xs text-white/60 mt-1">
            <span>3</span>
            <span>12</span>
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Playback Speed: {playbackSpeed}ms
          </label>
          <input
            type="range"
            min="200"
            max="1000"
            step="50"
            value={playbackSpeed}
            onChange={(e) => onPlaybackSpeedChange(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            disabled={isPlaying}
          />
          <div className="flex justify-between text-xs text-white/60 mt-1">
            <span>Fast</span>
            <span>Slow</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={onGenerateSequence}
          disabled={isPlaying}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 
                   text-white font-semibold rounded-lg shadow-lg
                   hover:from-green-600 hover:to-emerald-700 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200 transform hover:scale-105"
        >
          🎲 Generate Random Sequence
        </button>

        {hasSequence && !isPlaying && (
          <button
            onClick={onPlaySequence}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 
                     text-white font-semibold rounded-lg shadow-lg
                     hover:from-blue-600 hover:to-indigo-700 
                     transition-all duration-200 transform hover:scale-105"
          >
            ▶️ Play Sequence
          </button>
        )}

        {isPlaying && (
          <button
            onClick={onStopSequence}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 
                     text-white font-semibold rounded-lg shadow-lg
                     hover:from-red-600 hover:to-rose-700 
                     transition-all duration-200 transform hover:scale-105"
          >
            ⏹️ Stop
          </button>
        )}

        {hasSequence && !isPlaying && (
          <button
            onClick={onClearSequence}
            className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 
                     text-white font-semibold rounded-lg shadow-lg
                     hover:from-gray-600 hover:to-gray-700 
                     transition-all duration-200 transform hover:scale-105"
          >
            🗑️ Clear
          </button>
        )}
      </div>
    </div>
  );
};