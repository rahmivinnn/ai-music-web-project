import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
  CheckCircle2,
  Music,
  Mic,
  Headphones,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import prismLogo from '../assets/dark-side-logo.svg';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);

  const genres = [
    'Trap', 'RnB', 'Pop', 'EDM', 'Lo-Fi', 'Rock',
    'Hip Hop', 'Jazz', 'Classical', 'Country', 'Reggae', 'Metal'
  ];

  const experienceLevels = [
    { id: 'beginner', label: 'Beginner', description: 'I\'m new to music production' },
    { id: 'intermediate', label: 'Intermediate', description: 'I have some experience' },
    { id: 'advanced', label: 'Advanced', description: 'I\'m experienced in music production' }
  ];

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      navigate('/remix');
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      // Go back to login
      navigate('/');
    }
  };

  const skipOnboarding = () => {
    navigate('/remix');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0e0b16] text-white">
      {/* Header */}
      <div className="p-6 flex justify-between items-center">
        <div className="flex items-center">
          <img src={prismLogo} alt="Prism Logo" className="h-10 w-10 mr-2" />
          <span className="text-xl font-bold">AI Music Web</span>
        </div>
        <Button variant="link" onClick={skipOnboarding}>Skip</Button>
      </div>

      {/* Progress indicator */}
      <div className="px-6 py-2">
        <div className="flex justify-between max-w-md mx-auto">
          <div className={`flex flex-col items-center ${step >= 1 ? 'text-[#41FDFE]' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#41FDFE] text-black' : 'bg-gray-800'}`}>
              {step > 1 ? <CheckCircle2 size={20} /> : 1}
            </div>
            <span className="text-xs mt-1">Welcome</span>
          </div>
          <div className={`flex-1 border-t border-gray-700 self-center mx-2 ${step >= 2 ? 'border-[#41FDFE]' : ''}`}></div>
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-[#41FDFE]' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#41FDFE] text-black' : 'bg-gray-800'}`}>
              {step > 2 ? <CheckCircle2 size={20} /> : 2}
            </div>
            <span className="text-xs mt-1">Preferences</span>
          </div>
          <div className={`flex-1 border-t border-gray-700 self-center mx-2 ${step >= 3 ? 'border-[#41FDFE]' : ''}`}></div>
          <div className={`flex flex-col items-center ${step >= 3 ? 'text-[#41FDFE]' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#41FDFE] text-black' : 'bg-gray-800'}`}>
              3
            </div>
            <span className="text-xs mt-1">Experience</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          {step === 1 && (
            <div className="text-center">
              <div className="mb-8 flex justify-center">
                <div className="p-6 bg-[#1a1625] rounded-full">
                  <Music className="h-16 w-16 text-[#41FDFE]" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4">Welcome to AI Music Web</h1>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Create amazing music remixes with the power of AI. Transform your voice,
                mix with beats, and share your creations with the world.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
                <div className="bg-[#1a1625] p-4 rounded-lg text-center">
                  <Mic className="h-8 w-8 mx-auto mb-2 text-[#41FDFE]" />
                  <h3 className="font-semibold mb-1">Voice Transformation</h3>
                  <p className="text-sm text-gray-400">Change your voice with AI</p>
                </div>
                <div className="bg-[#1a1625] p-4 rounded-lg text-center">
                  <Music className="h-8 w-8 mx-auto mb-2 text-[#41FDFE]" />
                  <h3 className="font-semibold mb-1">Beat Mixing</h3>
                  <p className="text-sm text-gray-400">Mix with professional beats</p>
                </div>
                <div className="bg-[#1a1625] p-4 rounded-lg text-center">
                  <Headphones className="h-8 w-8 mx-auto mb-2 text-[#41FDFE]" />
                  <h3 className="font-semibold mb-1">Style Transfer</h3>
                  <p className="text-sm text-gray-400">Apply genre-specific styles</p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="text-3xl font-bold mb-4 text-center">What music do you like?</h1>
              <p className="text-gray-400 mb-8 text-center">
                Select your favorite genres to personalize your experience
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
                {genres.map(genre => (
                  <Button
                    key={genre}
                    variant={selectedGenres.includes(genre) ? "default" : "outline"}
                    className={selectedGenres.includes(genre)
                      ? "bg-[#41FDFE] hover:bg-[#41FDFE]/90 border-[#41FDFE] text-black"
                      : "border-gray-700 hover:border-[#41FDFE]"}
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre}
                  </Button>
                ))}
              </div>

              <p className="text-sm text-gray-400 mb-4 text-center">
                You can change these preferences later in settings
              </p>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 className="text-3xl font-bold mb-4 text-center">What's your experience level?</h1>
              <p className="text-gray-400 mb-8 text-center">
                This helps us tailor the interface to your needs
              </p>

              <div className="space-y-4 mb-8">
                {experienceLevels.map(level => (
                  <div
                    key={level.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedExperience === level.id
                        ? 'bg-[#41FDFE]/10 border-[#41FDFE]'
                        : 'bg-[#1a1625] border-gray-700 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedExperience(level.id)}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                        selectedExperience === level.id ? 'border-[#41FDFE]' : 'border-gray-500'
                      }`}>
                        {selectedExperience === level.id && (
                          <div className="w-3 h-3 rounded-full bg-[#41FDFE]"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{level.label}</h3>
                        <p className="text-sm text-gray-400">{level.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-400 mb-4 text-center">
                Don't worry, you'll get tutorials regardless of your experience level
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="p-6 flex justify-between max-w-2xl mx-auto w-full">
        <Button variant="outline" onClick={prevStep} className="border-gray-700">
          <ChevronLeft className="mr-2 h-4 w-4" />
          {step === 1 ? 'Back to Login' : 'Previous'}
        </Button>

        <Button onClick={nextStep} className="bg-[#41FDFE] hover:bg-[#41FDFE]/90 text-black">
          {step === 3 ? 'Get Started' : 'Continue'}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPage;
