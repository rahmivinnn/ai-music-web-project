import React, { useState } from 'react';
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
  Play
} from 'lucide-react';
import prismLogo from '../assets/dark-side-logo.svg';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('discover');

  const handleLogout = () => {
    navigate('/');
  };

  const goToRemix = () => {
    navigate('/remix');
  };

  // Mock data for music cards
  const featuredProjects = [
    { id: 1, title: 'Trap Beat Remix', artist: 'AI Producer', likes: 245, image: 'https://placehold.co/300x300/4B0082/FFFFFF/png?text=Trap+Beat' },
    { id: 2, title: 'RnB Smooth Vocals', artist: 'VocalAI', likes: 189, image: 'https://placehold.co/300x300/0000FF/FFFFFF/png?text=RnB+Vocals' },
    { id: 3, title: 'EDM Drop Master', artist: 'BeatMaker', likes: 302, image: 'https://placehold.co/300x300/00FF00/000000/png?text=EDM+Drop' },
    { id: 4, title: 'Lo-Fi Study Mix', artist: 'ChillAI', likes: 421, image: 'https://placehold.co/300x300/FF7F00/FFFFFF/png?text=Lo-Fi+Mix' },
  ];

  const recentProjects = [
    { id: 5, title: 'My First Remix', artist: 'You', likes: 12, image: 'https://placehold.co/300x300/FF0000/FFFFFF/png?text=My+Remix' },
    { id: 6, title: 'Voice Experiment', artist: 'You', likes: 8, image: 'https://placehold.co/300x300/FFFF00/000000/png?text=Voice+Exp' },
  ];

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
            <Button variant="ghost" className="w-full justify-start">
              <Home className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Home</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Music className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Library</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={goToRemix}>
              <Mic className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Create Remix</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
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
                  <Card key={project.id} className="bg-[#1a1625] border-gray-800 overflow-hidden">
                    <div className="relative group">
                      <img src={project.image} alt={project.title} className="w-full aspect-square object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="secondary" className="rounded-full">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-gray-400">{project.artist}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-400">
                        <Heart size={14} className="mr-1" /> {project.likes}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Popular Styles</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {['Trap', 'RnB', 'Pop', 'EDM', 'Lo-Fi', 'Rock'].map(style => (
                  <Button key={style} variant="outline" className="border-gray-700 hover:border-purple-500 hover:text-purple-500">
                    {style}
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
                  <Card key={project.id} className="bg-[#1a1625] border-gray-800 overflow-hidden">
                    <div className="relative group">
                      <img src={project.image} alt={project.title} className="w-full aspect-square object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="secondary" className="rounded-full">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-gray-400">{project.artist}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-400">
                        <Heart size={14} className="mr-1" /> {project.likes}
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
      </div>
    </div>
  );
};

export default HomePage;
