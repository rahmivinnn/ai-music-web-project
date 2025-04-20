import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import {
  Home,
  Music,
  Mic,
  Settings,
  LogOut,
  Search,
  PlusCircle,
  Heart,
  Play,
  Pause,
  Volume2
} from 'lucide-react';
import prismLogo from '../assets/dark-side-logo.svg';
import { edmSamples } from '../data/edm-samples';
import AudioPlayer from './ui/AudioPlayer';
import { toast } from 'sonner';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('discover');
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentGenre, setCurrentGenre] = useState('EDM');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleLogout = () => {
    navigate('/');
  };

  const goToRemix = () => {
    navigate('/remix');
  };

  const goToTextToRemix = () => {
    navigate('/text-to-remix');
  };

  const goToLibrary = () => {
    setActiveTab('recent');
    toast.info('Showing your recent projects');
  };

  const goToSettings = () => {
    toast.info('Settings feature coming soon!');
  };

  const handlePlayAudio = (url: string, id: number, genre: string = 'EDM') => {
    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Show loading toast
    toast.info('Loading audio...', { id: 'loading-audio' });

    // Set state for audio player
    setCurrentAudio(url);
    setSelectedProject(id);
    setCurrentGenre(genre);
    setShowPlayer(true);

    // Create a new audio element to test if the URL is valid
    const testAudio = new Audio();

    // Force unmute and set volume
    testAudio.muted = false;
    testAudio.volume = 0.7;

    // Set up event listeners before setting the source
    testAudio.addEventListener('canplaythrough', () => {
      toast.success('Playing now!', { id: 'loading-audio' });

      // Auto-play when loaded with multiple attempts
      const attemptPlay = (attempts = 0) => {
        if (attempts >= 3) {
          toast.error('Please click the play button to start audio', { id: 'play-error' });
          return;
        }

        testAudio.play().then(() => {
          console.log('Auto-play successful!');
          // Force unmute again after play starts
          testAudio.muted = false;
        }).catch(playError => {
          console.error(`Auto-play attempt ${attempts + 1} failed:`, playError);
          // Try again with a slight delay
          setTimeout(() => attemptPlay(attempts + 1), 300);
        });
      };

      // Start play attempts
      attemptPlay();
    });

    testAudio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      toast.error('Could not load audio. Using fallback.', { id: 'loading-audio' });

      // Use a fallback URL if the original fails
      const fallbackUrl = 'https://cdn.freesound.org/previews/388/388713_7364899-lq.mp3';
      setCurrentAudio(fallbackUrl);

      // Try with the fallback URL
      const fallbackAudio = new Audio(fallbackUrl);
      fallbackAudio.muted = false;
      fallbackAudio.volume = 0.7;

      fallbackAudio.addEventListener('canplaythrough', () => {
        fallbackAudio.play().then(() => {
          console.log('Fallback audio playing successfully');
        }).catch(err => {
          console.error('Fallback auto-play failed:', err);
          toast.error('Click play button to start audio', { id: 'play-error' });
        });
      });

      fallbackAudio.load();
      audioRef.current = fallbackAudio;
    });

    // Configure the audio element
    testAudio.crossOrigin = "anonymous";
    testAudio.preload = "auto";

    // Set the source and start loading
    testAudio.src = url;
    testAudio.load();

    // Store the audio element for later use
    audioRef.current = testAudio;

    // Add user interaction simulation to help with autoplay
    document.body.click();
  };

  // Featured projects using EDM samples
  const featuredProjects = edmSamples.slice(0, 4).map((sample, index) => ({
    id: index + 1,
    title: sample.title,
    artist: sample.artist,
    likes: Math.floor(Math.random() * 500) + 100,
    image: sample.imageUrl,
    audioUrl: sample.url,
    genre: sample.genre
  }));

  // Recent projects using popular EDM tracks
  const recentProjects = edmSamples.slice(10, 20).map((sample, index) => ({
    id: index + 11,
    title: sample.title,
    artist: sample.artist,
    likes: Math.floor(Math.random() * 20) + 5,
    image: sample.imageUrl,
    audioUrl: sample.url,
    genre: sample.genre
  }));

  return (
    <div className="flex h-screen bg-[#0e0b16] text-white">
      {/* Sidebar */}
      <div className="w-16 md:w-64 bg-[#1a1625] flex flex-col">
        <div className="p-4 flex justify-center md:justify-start items-center">
          <img src={prismLogo} alt="Prism Logo" className="h-10 w-10 mr-2" />
          <span className="hidden md:block text-xl font-bold">AI Music Web</span>
        </div>

        {/* Upgrade to Pro Button */}
        <div className="px-4 mb-4">
          <Button
            className="w-full bg-gradient-to-r from-[#41FDFE] to-[#FF1CF7] text-black font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              toast.success('Upgrading to Pro version!', {
                description: 'You now have access to all premium features.',
                action: {
                  label: 'View Features',
                  onClick: () => toast.info('Premium features include unlimited remixes, high-quality audio exports, and exclusive EDM samples.')
                },
              });
            }}
          >
            Upgrade to Pro
          </Button>
        </div>

        <div className="flex-1 mt-8">
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('discover')}>
              <Home className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Home</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={goToLibrary}>
              <Music className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Library</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={goToRemix}>
              <Mic className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Audio Remix</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={goToTextToRemix}>
              <Volume2 className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Text to Audio</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={goToSettings}>
              <Settings className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Settings</span>
            </Button>
          </div>
        </div>

        <div className="p-4">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome to Remix AI Studio</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 rounded-full bg-[#1a1625] border border-gray-700 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-gray-800">
          <div className="flex space-x-6">
            <button
              className={`py-3 px-1 ${activeTab === 'discover' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
              onClick={() => setActiveTab('discover')}
            >
              Discover
            </button>
            <button
              className={`py-3 px-1 ${activeTab === 'recent' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
              onClick={() => setActiveTab('recent')}
            >
              Recent Projects
            </button>
            <button
              className={`py-3 px-1 ${activeTab === 'favorites' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
              onClick={() => setActiveTab('favorites')}
            >
              Favorites
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'discover' && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Featured Projects</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#41FDFE] text-[#41FDFE] hover:bg-[#41FDFE]/10 transition-all duration-300 transform hover:scale-105"
                  onClick={() => {
                    // Show all featured projects
                    toast.success('Loading all featured projects', {
                      description: 'Showing all available EDM tracks',
                      action: {
                        label: 'Play All',
                        onClick: () => {
                          // Play all tracks in sequence
                          toast.info('Playing all tracks in sequence');

                          // Play the first track immediately
                          if (featuredProjects.length > 0) {
                            handlePlayAudio(featuredProjects[0].audioUrl, featuredProjects[0].id, featuredProjects[0].genre);
                          }
                        }
                      }
                    });

                    // Switch to Recent Projects tab to show more tracks
                    setActiveTab('recent');

                    // Play a random track to demonstrate functionality
                    const randomProject = recentProjects[Math.floor(Math.random() * recentProjects.length)];
                    handlePlayAudio(randomProject.audioUrl, randomProject.id, randomProject.genre);
                  }}
                >
                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {featuredProjects.map(project => (
                  <Card
                    key={project.id}
                    className="bg-[#1a1625] border-gray-800 overflow-hidden hover:border-[#41FDFE]/50 transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      // Play audio when clicking anywhere on the card
                      handlePlayAudio(project.audioUrl, project.id, project.genre);
                    }}
                  >
                    <div className="relative group">
                      <img src={project.image} alt={project.title} className="w-full aspect-square object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="secondary"
                          className={`rounded-full ${selectedProject === project.id && showPlayer ? 'bg-[#FF1CF7] animate-pulse' : 'bg-[#41FDFE]'} text-black hover:bg-[#41FDFE]/80 transition-all duration-300 transform hover:scale-110`}
                          onClick={() => {
                            // Visual feedback on click
                            const btn = document.activeElement as HTMLElement;
                            if (btn) btn.blur();

                            // Play the audio
                            handlePlayAudio(project.audioUrl, project.id, project.genre);
                          }}
                        >
                          {selectedProject === project.id && showPlayer ?
                            <Pause className="h-6 w-6" /> :
                            <Play className="h-6 w-6" />}
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-[#41FDFE]">{project.title}</h3>
                      <p className="text-sm text-white">{project.artist}</p>
                      <div className="flex items-center justify-between mt-2 text-sm">
                        <div className="flex items-center text-gray-400">
                          <Heart size={14} className="mr-1 hover:text-red-500 cursor-pointer" /> {project.likes}
                        </div>
                        <span className="bg-[#41FDFE]/20 text-[#41FDFE] px-2 py-0.5 rounded-full text-xs">
                          {project.genre.replace('EDM - ', '')}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Popular Styles</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {['EDM', 'EDM - Trap', 'EDM - Dubstep', 'EDM - Progressive', 'EDM - Melodic', 'EDM - Festival'].map(style => (
                  <Button
                    key={style}
                    variant="outline"
                    className={`border-gray-700 hover:border-[#41FDFE] hover:text-[#41FDFE] ${currentGenre === style ? 'border-[#41FDFE] text-[#41FDFE] bg-[#41FDFE]/10' : ''}`}
                    onClick={() => {
                      setCurrentGenre(style);
                      const filteredProject = [...featuredProjects, ...recentProjects].find(p => p.genre === style);
                      if (filteredProject) {
                        handlePlayAudio(filteredProject.audioUrl, filteredProject.id, filteredProject.genre);
                        toast.success(`Playing ${style} sample`);
                      }
                    }}
                  >
                    {style.replace('EDM - ', '')}
                  </Button>
                ))}
              </div>
            </>
          )}

          {activeTab === 'recent' && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Recent Projects</h2>
                <Button
                  onClick={goToRemix}
                  variant="default"
                  size="sm"
                  className="bg-gradient-to-r from-[#41FDFE] to-[#FF1CF7] text-black font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> New Project
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentProjects.map(project => (
                  <Card
                    key={project.id}
                    className="bg-[#1a1625] border-gray-800 overflow-hidden hover:border-[#41FDFE]/50 transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      // Play audio when clicking anywhere on the card
                      handlePlayAudio(project.audioUrl, project.id, project.genre);
                    }}
                  >
                    <div className="relative group">
                      <img src={project.image} alt={project.title} className="w-full aspect-square object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="secondary"
                          className={`rounded-full ${selectedProject === project.id && showPlayer ? 'bg-[#FF1CF7] animate-pulse' : 'bg-[#41FDFE]'} text-black hover:bg-[#41FDFE]/80 transition-all duration-300 transform hover:scale-110`}
                          onClick={() => {
                            // Visual feedback on click
                            const btn = document.activeElement as HTMLElement;
                            if (btn) btn.blur();

                            // Play the audio
                            handlePlayAudio(project.audioUrl, project.id, project.genre);
                          }}
                        >
                          {selectedProject === project.id && showPlayer ?
                            <Pause className="h-6 w-6" /> :
                            <Play className="h-6 w-6" />}
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-[#41FDFE]">{project.title}</h3>
                      <p className="text-sm text-white">{project.artist}</p>
                      <div className="flex items-center justify-between mt-2 text-sm">
                        <div className="flex items-center text-gray-400">
                          <Heart size={14} className="mr-1 hover:text-red-500 cursor-pointer" /> {project.likes}
                        </div>
                        <span className="bg-[#41FDFE]/20 text-[#41FDFE] px-2 py-0.5 rounded-full text-xs">
                          {project.genre.replace('EDM - ', '')}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card
                  className="bg-[#1a1625] border-[#41FDFE]/30 border-dashed flex items-center justify-center aspect-square cursor-pointer hover:border-[#41FDFE] hover:shadow-[0_0_15px_rgba(65,253,254,0.3)] transition-all duration-300"
                  onClick={() => {
                    toast.success('Creating new remix project', {
                      description: 'Taking you to the remix studio',
                    });
                    goToRemix();
                  }}
                >
                  <div className="text-center p-6">
                    <div className="relative group">
                      <PlusCircle className="h-16 w-16 mx-auto mb-3 text-[#41FDFE] animate-pulse" />
                      <div className="absolute inset-0 bg-[#41FDFE]/20 rounded-full filter blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <p className="text-[#41FDFE] font-semibold">Create New Project</p>
                    <p className="text-gray-400 text-sm mt-1">Start remixing with AI</p>
                  </div>
                </Card>
              </div>
            </>
          )}

          {activeTab === 'favorites' && (
            <div className="text-center py-12">
              <Music className="h-16 w-16 mx-auto mb-4 text-gray-600" />
              <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
              <p className="text-gray-400 mb-6">Start exploring and save your favorite remixes</p>
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700" onClick={() => setActiveTab('discover')}>
                Discover Projects
              </Button>
            </div>
          )}
        </div>

        {/* Audio Player */}
        {showPlayer && currentAudio && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#0a0814] border-t border-[#41FDFE]/20 p-4">
            <AudioPlayer
              title={`Playing: ${[...featuredProjects, ...recentProjects].find(p => p.id === selectedProject)?.title || 'EDM Track'}`}
              audioUrl={currentAudio}
              genre={currentGenre}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
