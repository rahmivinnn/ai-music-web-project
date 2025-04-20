import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import {
  Home,
  Library,
  History,
  Bell,
  Settings,
  LogOut,
  Music,
  Mic,
  Heart,
  MoreVertical,
  Search,
  User,
  Link,
  Share,
  Plus
} from 'lucide-react';
import prismLogo from '../assets/dark-side-logo.svg';

const RemixHomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const goToRemixAudio = () => {
    navigate('/remix-audio');
  };

  const goToTextToRemix = () => {
    navigate('/text-to-remix');
  };

  // Mock data for recent remixes
  const recentRemixes = [
    {
      id: 1,
      title: 'Neon Dreams',
      genre: 'Pop',
      creator: 'Wade Warren',
      image: 'https://placehold.co/300x300/ff9a8b/000000/png?text=Neon+Dreams',
      liked: false
    },
    {
      id: 2,
      title: 'Bass Overdrive',
      genre: 'EDM Remix',
      creator: 'Wade Warren',
      image: 'https://placehold.co/300x300/000000/ff0000/png?text=Bass+Overdrive',
      liked: true
    },
    {
      id: 3,
      title: 'Midnight Cypher',
      genre: 'Hip-Hop',
      creator: 'Wade Warren',
      image: 'https://placehold.co/300x300/2d3436/ffffff/png?text=Midnight+Cypher',
      liked: true
    },
    {
      id: 4,
      title: 'Echoes of Tomorrow',
      genre: 'Synthwave',
      creator: 'Wade Warren',
      image: 'https://placehold.co/300x300/00a8ff/ffffff/png?text=Echoes',
      liked: false
    },
    {
      id: 5,
      title: 'Glitch Harmony',
      genre: 'Electronic Rock',
      creator: 'Wade Warren',
      image: 'https://placehold.co/300x300/2d3436/ffffff/png?text=Glitch+Harmony',
      liked: false
    },
    {
      id: 6,
      title: 'Lo-Fi Serenity',
      genre: 'Chill Lo-Fi',
      creator: 'Wade Warren',
      image: 'https://placehold.co/300x300/ff8c00/ffffff/png?text=Lo-Fi+Serenity',
      liked: false
    },
  ];

  return (
    <div className="flex h-screen bg-[#0e0b16] text-white">
      {/* Sidebar */}
      <div className="w-16 md:w-64 bg-black flex flex-col">
        <div className="p-4 flex justify-center md:justify-start items-center">
          <img src={prismLogo} alt="Prism Logo" className="h-10 w-10 mr-2" />
          <span className="hidden md:block text-xl font-bold">AI Music Web</span>
        </div>

        <div className="flex-1 mt-8">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-[#41FDFE]" onClick={() => navigate('/remix')}>
              <Home className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Home</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:text-[#41FDFE]" onClick={() => navigate('/history')}>
              <History className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Remix History</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:text-[#41FDFE]" onClick={() => navigate('/library')}>
              <Library className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">My Library</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:text-[#41FDFE]" onClick={() => navigate('/subscription')}>
              <User className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Subscription</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:text-[#41FDFE]" onClick={() => navigate('/notifications')}>
              <Bell className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Notifications</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:text-[#41FDFE]" onClick={() => navigate('/settings')}>
              <Settings className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Settings</span>
            </Button>
          </div>
        </div>

        <div className="p-4">
          <Button variant="ghost" className="w-full justify-start hover:text-[#41FDFE]" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#41FDFE] to-[#FF1CF7] text-transparent bg-clip-text">AI-Powered Music Creation</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hover:bg-white/10 transition-colors">
              <Search className="h-5 w-5 text-[#41FDFE]" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-white/10 transition-colors">
              <Bell className="h-5 w-5 text-[#FF1CF7]" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-white/10 transition-colors rounded-full">
              <img src="/avatar.jpg" alt="User" className="h-8 w-8 rounded-full ring-2 ring-[#41FDFE]" />
            </Button>
          </div>
        </div>

        {/* Main feature cards */}
        <div className="px-6 grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Remix Song AI Card */}
          <Card className="bg-[#00BCD4] text-black overflow-hidden border-0 rounded-xl">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">Remix Song AI</h2>
                  <p className="text-black/80 mb-6">
                    Transform any song into an EDM remix with AI-powered creativity. Upload, remix, and enjoy!
                  </p>
                  <Button
                    onClick={goToRemixAudio}
                    className="bg-black text-white hover:bg-black/80"
                  >
                    <Music className="mr-2 h-4 w-4" /> Create remix
                  </Button>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="2" height="16" rx="1" fill="currentColor" />
                    <rect x="8" y="7" width="2" height="10" rx="1" fill="currentColor" />
                    <rect x="12" y="2" width="2" height="20" rx="1" fill="currentColor" />
                    <rect x="16" y="9" width="2" height="6" rx="1" fill="currentColor" />
                    <rect x="20" y="6" width="2" height="12" rx="1" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Text-to-Audio Card */}
          <Card className="bg-[#00BCD4] text-black overflow-hidden border-0 rounded-xl">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">Text-to-Audio</h2>
                  <p className="text-black/80 mb-6">
                    Convert your text into AI-generated music or vocals. Simply enter text and let AI create the sound!
                  </p>
                  <Button
                    onClick={goToTextToRemix}
                    className="bg-black text-white hover:bg-black/80"
                  >
                    <Mic className="mr-2 h-4 w-4" /> Generate Audio
                  </Button>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" fill="currentColor" />
                    <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Remixes */}
        <div className="px-6 mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Recent Remixes</h2>
            <Button variant="outline" size="sm" className="border-[#41FDFE] text-[#41FDFE]">
              View All
            </Button>
          </div>

          <p className="text-gray-400 mb-6">Here is the list of your recent remixes</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentRemixes.map((remix) => (
              <Card key={remix.id} className="group bg-black/30 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-[#41FDFE]/50 transition-all duration-300">
                <CardContent className="p-0 relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img src={remix.image} alt={remix.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="p-4 relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-[#41FDFE] to-[#FF1CF7] text-transparent bg-clip-text">{remix.title}</h3>
                        <p className="text-sm text-[#41FDFE]/80">{remix.genre}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="hover:bg-white/10">
                        <MoreVertical className="h-5 w-5 text-[#FF1CF7]" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <img
                          src="/avatar.jpg"
                          alt={remix.creator}
                          className="w-6 h-6 rounded-full ring-2 ring-[#41FDFE] mr-2"
                        />
                        <span className="text-sm text-gray-400">{remix.creator}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="hover:bg-white/10">
                          <Heart className={`h-5 w-5 ${remix.liked ? 'text-[#FF1CF7] fill-[#FF1CF7]' : 'text-gray-400'}`} />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-white/10">
                          <Share className="h-5 w-5 text-[#41FDFE]" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Premium Banner */}
        <div className="px-6 mb-6">
          <div className="bg-[#00BCD4] rounded-lg p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-black">Go Premium & Remix Like a Pro!</h3>
              <p className="text-sm text-black/80">Get unlimited access to premium remix tools, high quality AI-generated vocals & exclusive sound packs</p>
            </div>
            <Button className="bg-black text-white hover:bg-black/80" onClick={() => navigate('/subscription')}>
              Upgrade Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemixHomePage;
