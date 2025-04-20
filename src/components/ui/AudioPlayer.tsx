
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, SkipBack } from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';
import { resumeAudioContext, applyGenreEffectToAudioElement } from '@/utils/audioProcessor';
import { toast } from "sonner";

interface AudioPlayerProps {
  title: string;
  isGenerating?: boolean;
  audioUrl?: string;
  genre?: string;
}

const AudioPlayer = ({ title, isGenerating = false, audioUrl = '', genre = 'default' }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [effectsApplied, setEffectsApplied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [intensity, setIntensity] = useState(0.5);
  const [bpm, setBpm] = useState(128);
  const [isEdmMode, setIsEdmMode] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const effectsChainRef = useRef<AudioNode[]>([]);
  const analyzerRef = useRef<AnalyserNode | null>(null);

  // Use a reliable sample audio source if none provided
  // Using direct audio files that are guaranteed to work
  const sampleAudio = 'https://cdn.freesound.org/previews/388/388713_7364899-lq.mp3';
  const effectiveAudioUrl = audioUrl || sampleAudio;

  // Track if we're using a voice-generated audio
  const [isGeneratedAudio, setIsGeneratedAudio] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const maxLoadAttempts = 3;

  useEffect(() => {
    // Simulating progress for demo purposes
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev < 100) return prev + 1;
          clearInterval(interval);
          return 100;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  // Reset state when URL changes
  useEffect(() => {
    setIsAudioReady(false);
    setEffectsApplied(false);
    setLoadAttempts(0);
    setIsGeneratedAudio(audioUrl !== sampleAudio && !!audioUrl);
  }, [audioUrl, sampleAudio]);

  useEffect(() => {
    // Create a new audio element when the component mounts or URL changes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
      audioRef.current.load();
      setIsPlaying(false);
      setEffectsApplied(false);
    }

    // Create and configure the audio element
    const audio = new Audio();

    // Force unmute and set volume
    audio.muted = false;
    audio.volume = 0.7;

    // Set up event listeners before setting the source
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', () => setIsPlaying(false));
    audio.addEventListener('canplaythrough', () => {
      handleCanPlayThrough();

      // Auto-play when loaded (YouTube Music style) with multiple attempts
      const attemptPlay = (attempts = 0) => {
        if (attempts >= 3) {
          toast.error('Click play button to start audio', { id: 'play-error' });
          return;
        }

        audio.play().then(() => {
          setIsPlaying(true);
          console.log("Auto-play successful");
          // Force unmute again after play starts
          audio.muted = false;
        }).catch(playError => {
          console.error(`Auto-play attempt ${attempts + 1} failed:`, playError);
          // Try again with a slight delay
          setTimeout(() => attemptPlay(attempts + 1), 300);
        });
      };

      // Start play attempts
      attemptPlay();
    });
    audio.addEventListener('error', handleAudioError);

    // Configure the audio element
    audio.crossOrigin = "anonymous";
    audio.preload = "auto";
    audio.volume = 0.7; // Set a comfortable default volume

    // Set the source
    audio.src = effectiveAudioUrl;
    audioRef.current = audio;

    // Preload the audio
    try {
      audio.load();
      console.log("Audio loading started for:", effectiveAudioUrl);

      // Add user interaction simulation to help with autoplay
      document.body.click();
    } catch (loadError) {
      console.error("Error loading audio:", loadError);
      handleAudioError(new ErrorEvent('error', { error: loadError }));
    }

    // Clean up
    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', () => setIsPlaying(false));
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('error', handleAudioError);

      // Revoke object URL if it's a blob URL
      if (effectiveAudioUrl.startsWith('blob:')) {
        try {
          URL.revokeObjectURL(effectiveAudioUrl);
          console.log("Revoked object URL:", effectiveAudioUrl);
        } catch (revokeError) {
          console.warn("Error revoking object URL:", revokeError);
        }
      }
    };
  }, [effectiveAudioUrl]);

  // Apply genre effects when audio is ready and genre changes
  useEffect(() => {
    if (audioRef.current && isAudioReady && !effectsApplied && !isGenerating) {
      try {
        // Resume audio context and apply genre effects
        resumeAudioContext().then(() => {
          if (audioRef.current) {
            applyGenreEffectToAudioElement(audioRef.current, genre);
            setEffectsApplied(true);
            console.log(`Applied ${genre} effects to audio`);
          }
        });
      } catch (error) {
        console.error('Error applying audio effects:', error);
        // Still mark as applied to prevent repeated attempts
        setEffectsApplied(true);
      }
    }
  }, [genre, isAudioReady, effectsApplied, isGenerating]);

  const handleCanPlayThrough = () => {
    setIsAudioReady(true);
  };

  const handleAudioError = (e: Event) => {
    console.error('Audio error:', e);

    // Increment load attempts
    const newAttempts = loadAttempts + 1;
    setLoadAttempts(newAttempts);

    if (newAttempts < maxLoadAttempts) {
      // Try again with a delay
      console.log(`Retrying audio load (attempt ${newAttempts} of ${maxLoadAttempts})...`);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.load();
        }
      }, 1000);
    } else if (isGeneratedAudio && audioUrl !== sampleAudio) {
      // Fall back to sample audio after max attempts
      console.log('Falling back to sample audio after max attempts');
      toast.error('Error loading generated audio. Using sample audio instead.');

      // Create a new audio element with the sample
      const fallbackAudio = new Audio(sampleAudio);
      fallbackAudio.crossOrigin = "anonymous";
      fallbackAudio.preload = "auto";

      // Set up event listeners
      fallbackAudio.addEventListener('loadedmetadata', handleLoadedMetadata);
      fallbackAudio.addEventListener('timeupdate', handleTimeUpdate);
      fallbackAudio.addEventListener('ended', () => setIsPlaying(false));
      fallbackAudio.addEventListener('canplaythrough', handleCanPlayThrough);

      // Replace the current audio element
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = fallbackAudio;
      fallbackAudio.load();
    } else {
      // Show error message
      toast.error('Error loading audio. Please try again.');
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    // Visual feedback
    toast.info(isPlaying ? 'Pausing...' : 'Playing...', { id: 'play-toggle', duration: 1000 });

    // Make sure audio context is resumed (needed for autoplay policy)
    resumeAudioContext().then(() => {
      if (!audioRef.current) return;

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Force load if needed
        if (!isAudioReady) {
          audioRef.current.load();
        }

        // Play with proper error handling
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              toast.success('Now playing!', { id: 'play-toggle' });
            })
            .catch(error => {
              console.error("Error playing audio:", error);

              // Handle autoplay policy
              if (error.name === 'NotAllowedError') {
                toast.error('Playback was blocked. Please interact with the page first.');
              } else {
                // Try again with a delay
                toast.info('Retrying playback...', { id: 'play-toggle' });
                setTimeout(() => {
                  if (audioRef.current) {
                    audioRef.current.play()
                      .then(() => {
                        setIsPlaying(true);
                        toast.success('Now playing!', { id: 'play-toggle' });
                      })
                      .catch(e => {
                        console.error("Second attempt failed:", e);
                        toast.error('Could not play audio. Please try again.');
                      });
                  }
                }, 500);
              }
            });
        }
      }
    }).catch(error => {
      console.error('Error resuming audio context:', error);
      toast.error('Audio system error. Please refresh the page.');
    });
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsAudioReady(true);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleRestart = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = 0;
    setCurrentTime(0);

    if (!isPlaying) {
      resumeAudioContext().then(() => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(e => {
              console.error('Error restarting playback:', e);
              toast.error('Could not restart playback. Please try again.');
            });
        }
      });
    }
  };

  const handleDownload = () => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = effectiveAudioUrl;
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Download started!');
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="bg-gradient-to-r from-[#0f1e26] to-[#1a1625] rounded-xl p-6 space-y-4 transition-all duration-300 hover:shadow-[0_0_15px_rgba(65,253,254,0.3)]"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h3 className="text-xl font-bold bg-gradient-to-r from-[#41FDFE] to-[#41FDFE] bg-clip-text text-transparent">{title}</h3>
          {!isAudioReady && !isGenerating && (
            <div className="ml-3 flex items-center">
              <div className="w-3 h-3 bg-[#41FDFE] rounded-full animate-pulse mr-2"></div>
              <span className="text-xs text-gray-400">Loading audio...</span>
            </div>
          )}
        </div>
        {isAudioReady && (
          <button
            onClick={handleDownload}
            className="text-[#41FDFE] hover:text-white transition-colors duration-300 transform hover:scale-110"
          >
            <Download className="h-6 w-6" />
          </button>
        )}
      </div>

      <div className="relative h-24 bg-gradient-to-b from-[#0a1419] to-[#1e3a44] rounded-xl overflow-hidden border border-[#41FDFE]/20">
        {isGenerating ? (
          <div className="absolute inset-0 bg-[#41FDFE]/30 animate-pulse" />
        ) : !isAudioReady ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-2">
              <div className="w-2 h-8 bg-[#41FDFE] rounded-full animate-equalizer-1"></div>
              <div className="w-2 h-8 bg-[#41FDFE] rounded-full animate-equalizer-2"></div>
              <div className="w-2 h-8 bg-[#41FDFE] rounded-full animate-equalizer-3"></div>
              <div className="w-2 h-8 bg-[#41FDFE] rounded-full animate-equalizer-4"></div>
            </div>
          </div>
        ) : (
          <AudioVisualizer
            audioUrl={effectiveAudioUrl}
            isPlaying={isPlaying}
            genre={genre}
          />
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlayPause}
            disabled={!isAudioReady}
            className={`p-3 rounded-full bg-gradient-to-r from-[#41FDFE] to-[#FF1CF7] text-black disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 ${isHovered ? 'scale-110' : ''} hover:shadow-[0_0_15px_rgba(65,253,254,0.5)]`}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </button>

          <div className="flex-1 space-y-2">
            <div
              ref={progressRef}
              onClick={handleProgressClick}
              className="h-2 bg-[#0a1419] rounded-full overflow-hidden cursor-pointer relative group"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#41FDFE] to-[#FF1CF7] opacity-20 group-hover:opacity-30 transition-opacity"
              />
              <div
                className="h-full bg-gradient-to-r from-[#41FDFE] to-[#FF1CF7] relative z-10 transition-all duration-100"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform" />
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-[#41FDFE]">{formatTime(currentTime)}</span>
              <span className="text-gray-400">{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 mr-2"
          onClick={handleRestart}
          disabled={isGenerating || !isAudioReady}
          title="Restart"
        >
          <SkipBack className="h-4 w-4" />
        </button>
        <button
          className="p-3 rounded-full bg-[#41FDFE] text-black hover:bg-opacity-90"
          onClick={togglePlayPause}
          disabled={isGenerating || !isAudioReady}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
