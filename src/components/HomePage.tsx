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

    setCurrentAudio(url);
    setSelectedProject(id);
    setCurrentGenre(genre);
    setShowPlayer(true);
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

  // Recent projects using remaining EDM samples
  const recentProjects = edmSamples.slice(4, 6).map((sample, index) => ({
    id: index + 5,
    title: `My ${sample.genre} Remix`,
    artist: 'You',
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
                <Button variant="outline" size="sm" className="border-blue-500 text-blue-500">
                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {featuredProjects.map(project => (
                  <Card key={project.id} className="bg-[#1a1625] border-gray-800 overflow-hidden hover:border-[#41FDFE]/50 transition-all duration-300">
                    <div className="relative group">
                      <img src={project.image} alt={project.title} className="w-full aspect-square object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-[#41FDFE] text-black hover:bg-[#41FDFE]/80"
                          onClick={() => handlePlayAudio(project.audioUrl, project.id, project.genre)}
                        >
                          {selectedProject === project.id && showPlayer ?
                            <Pause className="h-6 w-6" /> :
                            <Play className="h-6 w-6" />}
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-gray-400">{project.artist}</p>
                      <div className="flex items-center justify-between mt-2 text-sm">
                        <div className="flex items-center text-gray-400">
                          <Heart size={14} className="mr-1 hover:text-red-500 cursor-pointer" /> {project.likes}
                        </div>
                        <span className="text-[#41FDFE]">{project.genre}</span>
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
                <Button onClick={goToRemix} variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <PlusCircle className="mr-2 h-4 w-4" /> New Project
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentProjects.map(project => (
                  <Card key={project.id} className="bg-[#1a1625] border-gray-800 overflow-hidden hover:border-[#41FDFE]/50 transition-all duration-300">
                    <div className="relative group">
                      <img src={project.image} alt={project.title} className="w-full aspect-square object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-[#41FDFE] text-black hover:bg-[#41FDFE]/80"
                          onClick={() => handlePlayAudio(project.audioUrl, project.id, project.genre)}
                        >
                          {selectedProject === project.id && showPlayer ?
                            <Pause className="h-6 w-6" /> :
                            <Play className="h-6 w-6" />}
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-gray-400">{project.artist}</p>
                      <div className="flex items-center justify-between mt-2 text-sm">
                        <div className="flex items-center text-gray-400">
                          <Heart size={14} className="mr-1 hover:text-red-500 cursor-pointer" /> {project.likes}
                        </div>
                        <span className="text-[#41FDFE]">{project.genre}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="bg-[#1a1625] border-gray-800 border-dashed flex items-center justify-center aspect-square cursor-pointer hover:border-blue-500" onClick={goToRemix}>
                  <div className="text-center p-6">
                    <PlusCircle className="h-12 w-12 mx-auto mb-2 text-gray-500" />
                    <p className="text-gray-400">Create New Project</p>
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
