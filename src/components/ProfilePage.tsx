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
  User,
  Edit,
  Heart,
  Play,
  Share2,
  MoreHorizontal,
  Bell
} from 'lucide-react';
import prismLogo from '../assets/dark-side-logo.svg';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');

  const handleLogout = () => {
    navigate('/');
  };

  const goToHome = () => {
    navigate('/home');
  };

  const goToRemix = () => {
    navigate('/remix');
  };

  // Mock data for user profile
  const userProfile = {
    name: 'Alex Johnson',
    username: '@alexj',
    bio: 'Music producer and AI enthusiast. Creating the future of sound.',
    followers: 128,
    following: 75,
    projects: 12,
    avatar: 'https://placehold.co/200x200/4B0082/FFFFFF/png?text=AJ'
  };

  // Mock data for user projects
  const userProjects = [
    { id: 1, title: 'Trap Beat Remix', likes: 45, plays: 230, image: 'https://placehold.co/300x300/4B0082/FFFFFF/png?text=Trap+Beat' },
    { id: 2, title: 'RnB Smooth Vocals', likes: 32, plays: 189, image: 'https://placehold.co/300x300/0000FF/FFFFFF/png?text=RnB+Vocals' },
    { id: 3, title: 'EDM Drop Master', likes: 67, plays: 302, image: 'https://placehold.co/300x300/00FF00/000000/png?text=EDM+Drop' },
    { id: 4, title: 'Lo-Fi Study Mix', likes: 89, plays: 421, image: 'https://placehold.co/300x300/FF7F00/FFFFFF/png?text=Lo-Fi+Mix' },
  ];

  // Mock data for liked projects
  const likedProjects = [
    { id: 5, title: 'Summer Vibes', artist: 'DJ Neural', likes: 245, image: 'https://placehold.co/300x300/FF0000/FFFFFF/png?text=Summer' },
    { id: 6, title: 'Chill Hop', artist: 'BeatMaster', likes: 189, image: 'https://placehold.co/300x300/FFFF00/000000/png?text=Chill+Hop' },
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
            <Button variant="ghost" className="w-full justify-start" onClick={goToHome}>
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
          <h1 className="text-2xl font-bold">Profile</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Profile header */}
        <div className="px-6 pb-6">
          <div className="bg-[#1a1625] rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <Button variant="ghost" size="icon" className="absolute bottom-0 right-0 bg-blue-600 rounded-full w-8 h-8 p-1.5">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                    <p className="text-gray-400">{userProfile.username}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Button variant="outline" className="border-blue-500 text-blue-500 mr-2">
                      <Edit className="h-4 w-4 mr-2" /> Edit Profile
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <p className="mt-4 text-gray-300">{userProfile.bio}</p>

                <div className="flex justify-center md:justify-start space-x-6 mt-4">
                  <div>
                    <span className="font-bold">{userProfile.projects}</span>
                    <span className="text-gray-400 ml-1">Projects</span>
                  </div>
                  <div>
                    <span className="font-bold">{userProfile.followers}</span>
                    <span className="text-gray-400 ml-1">Followers</span>
                  </div>
                  <div>
                    <span className="font-bold">{userProfile.following}</span>
                    <span className="text-gray-400 ml-1">Following</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-gray-800">
          <div className="flex space-x-6">
            <button
              className={`py-3 px-1 ${activeTab === 'projects' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
              onClick={() => setActiveTab('projects')}
            >
              My Projects
            </button>
            <button
              className={`py-3 px-1 ${activeTab === 'liked' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
              onClick={() => setActiveTab('liked')}
            >
              Liked
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {userProjects.map(project => (
                <Card key={project.id} className="bg-[#1a1625] border-gray-800 overflow-hidden">
                  <div className="relative group">
                    <img src={project.image} alt={project.title} className="w-full aspect-square object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-2">
                        <Button size="icon" variant="secondary" className="rounded-full">
                          <Play className="h-5 w-5" />
                        </Button>
                        <Button size="icon" variant="secondary" className="rounded-full">
                          <Edit className="h-5 w-5" />
                        </Button>
                        <Button size="icon" variant="secondary" className="rounded-full">
                          <Share2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{project.title}</h3>
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Heart size={14} className="mr-1" /> {project.likes}
                      </div>
                      <div className="flex items-center">
                        <Play size={14} className="mr-1" /> {project.plays}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-[#1a1625] border-gray-800 border-dashed flex items-center justify-center aspect-square cursor-pointer hover:border-blue-500" onClick={goToRemix}>
                <div className="text-center p-6">
                  <Mic className="h-12 w-12 mx-auto mb-2 text-gray-500" />
                  <p className="text-gray-400">Create New Remix</p>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'liked' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {likedProjects.map(project => (
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
                      <Heart size={14} className="mr-1 text-blue-500" /> {project.likes}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
