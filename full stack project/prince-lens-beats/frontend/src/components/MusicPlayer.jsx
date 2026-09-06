import React, { useState, useEffect, useRef } from 'react';
import { getMusicTracks } from '../services/api';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, Disc, ExternalLink } from 'lucide-react';

const MusicPlayer = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    const fetchMusic = async () => {
      const data = await getMusicTracks();
      setTracks(data);
    };
    fetchMusic();
  }, []);

  const currentTrack = tracks[currentTrackIndex] || null;

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => console.log('Audio play blocked:', err));
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (tracks.length === 0) return;
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIdx);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (tracks.length === 0) return;
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIdx);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(err => console.log('Audio error:', err));
    }
  }, [currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '00:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    setIsMuted(val === 0);
  };

  return (
    <section className="py-20 bg-darkBg relative overflow-hidden">
      {/* Hidden HTML5 Audio Element */}
      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleNext}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neonCyan/10 text-neonCyan text-xs font-semibold uppercase tracking-wider mb-4 border border-neonCyan/30">
            <Disc size={14} className="animate-spin" />
            <span>Sonic Discography</span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl text-white tracking-wide mb-4">
            MUSIC & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-neonPink">BEATS PLAYER</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Stream high-energy synthwave, hypnotic lo-fi, and original film scores directly from the studio.
          </p>
        </div>

        {/* Featured Player Component Card */}
        {currentTrack && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cardBorder shadow-2xl mb-16 relative overflow-hidden max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Album Art with Glowing Ring */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex-shrink-0 rounded-2xl overflow-hidden group shadow-2xl">
                <img
                  src={currentTrack.coverArtUrl}
                  alt={currentTrack.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105 rotate-1' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkBg/80 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neonPink text-white shadow-lg">
                  {currentTrack.genre}
                </div>
              </div>

              {/* Player Details & Controls */}
              <div className="flex-1 w-full space-y-6">
                <div>
                  <h3 className="font-bebas text-4xl text-white tracking-wide mb-1">{currentTrack.title}</h3>
                  <p className="text-neonCyan text-sm font-medium">{currentTrack.artist}</p>
                </div>

                {/* Simulated Animated Audio Waveform */}
                <div className="flex items-center justify-between gap-1 h-10 px-2 py-1 rounded-xl bg-darkBg/60 border border-cardBorder">
                  {[40, 70, 30, 90, 60, 100, 45, 80, 20, 65, 95, 35, 75, 50, 85, 40, 60, 90, 30, 70].map((height, i) => (
                    <div
                      key={i}
                      style={{ height: isPlaying ? `${Math.max(15, (height * (i % 2 === 0 ? 0.9 : 1.1))) }%` : '20%' }}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        isPlaying ? 'bg-gradient-to-t from-neonPink to-neonCyan' : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-neonPink"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Control Buttons Bar */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handlePrev}
                      className="p-3 rounded-full bg-darkBg border border-cardBorder text-slate-300 hover:text-white hover:border-neonCyan transition-all"
                    >
                      <SkipBack size={20} />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="p-4 rounded-full bg-gradient-to-r from-neonPink to-pink-600 text-white shadow-xl shadow-neonPink/40 hover:scale-105 transition-all"
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                    </button>

                    <button
                      onClick={handleNext}
                      className="p-3 rounded-full bg-darkBg border border-cardBorder text-slate-300 hover:text-white hover:border-neonCyan transition-all"
                    >
                      <SkipForward size={20} />
                    </button>
                  </div>

                  {/* Volume Control */}
                  <div className="hidden sm:flex items-center space-x-2">
                    <button onClick={() => setIsMuted(!isMuted)} className="text-slate-400 hover:text-white">
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-neonCyan"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Track Playlist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tracks.map((track, index) => (
            <div
              key={track._id}
              onClick={() => {
                setCurrentTrackIndex(index);
                setIsPlaying(true);
              }}
              className={`p-5 rounded-2xl glass-panel border transition-all duration-300 cursor-pointer flex items-center space-x-4 group ${
                currentTrackIndex === index
                  ? 'border-neonPink bg-neonPink/10 shadow-lg shadow-neonPink/10'
                  : 'border-cardBorder hover:border-neonCyan/50'
              }`}
            >
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img src={track.coverArtUrl} alt={track.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  {currentTrackIndex === index && isPlaying ? (
                    <Pause size={18} className="text-neonPink" />
                  ) : (
                    <Play size={18} className="text-white group-hover:scale-110 transition-transform" />
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-bebas text-xl text-white truncate group-hover:text-neonCyan transition-colors">
                  {track.title}
                </h4>
                <p className="text-xs text-slate-400 truncate">{track.artist}</p>
                <span className="text-[10px] text-neonPink uppercase tracking-wider font-semibold">{track.genre}</span>
              </div>

              <div className="text-xs font-mono text-slate-500">
                {track.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusicPlayer;
