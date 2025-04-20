
import { useState, useEffect } from 'react';
import StyleChip from './ui/StyleChip';
import GenreSelect from './ui/GenreSelect';
import VoiceSelect from './ui/VoiceSelect';
import AudioPlayer from './ui/AudioPlayer';
import { toast } from "sonner";
import { resumeAudioContext } from '@/utils/audioProcessor';
import { playGeneratedAudio } from '@/utils/textToAudioGenerator';
// Import voice samples types but load the actual data dynamically to avoid circular dependencies
import type { VoiceSample } from '../data/voice-samples';

const styles = ['Classic', 'Sad', 'Rock', 'Hiphop', 'Guitar music', 'High music'];

import { analyzePrompt, PromptAnalysis } from '../utils/promptAnalyzer';
import { createAudioProcessingChain, AudioEffect } from '../utils/audioEffectProcessor';
import { genreCategories } from '../data/genre-categories';

const TextToRemixPage = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [voice, setVoice] = useState('Male Pop');
  const [genre, setGenre] = useState('EDM');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState('');
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [promptAnalysis, setPromptAnalysis] = useState<PromptAnalysis | null>(null);
  const [audioEffects, setAudioEffects] = useState<AudioEffect[]>([]);
  const [intensity, setIntensity] = useState(0.5);
  const [bpm, setBpm] = useState(128);
  const [isEdmMode, setIsEdmMode] = useState(true);
  const [sidechainAmount, setSidechainAmount] = useState(0.5);
  const [reverbAmount, setReverbAmount] = useState(0.3);
  const [delayAmount, setDelayAmount] = useState(0.2);
  const [stereoWidth, setStereoWidth] = useState(0.7);
  const [dropIntensity, setDropIntensity] = useState(0.8);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      // Revoke any object URLs to prevent memory leaks
      if (generatedAudioUrl && generatedAudioUrl.startsWith('blob:')) {
        URL.revokeObjectURL(generatedAudioUrl);
      }
    };
  }, []);

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev =>
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const handlePromptAnalysis = () => {
    if (!prompt.trim()) return;

    const analysis = analyzePrompt(prompt);
    setPromptAnalysis(analysis);
    setGenre(analysis.detectedGenre);
    setIntensity(analysis.intensity);

    const effects = createAudioProcessingChain(analysis);
    setAudioEffects(effects);
  };

  useEffect(() => {
    handlePromptAnalysis();
  }, [prompt]);

  const handleGenerateAudio = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a description of what you want to create');
      return;
    }

    setIsGenerating(true);
    setProcessingError(null);

    try {
      // Make sure audio context is resumed
      await resumeAudioContext();

      // Generate audio from prompt with selected voice and genre
      const audioUrl = await playGeneratedAudio(prompt, voice, genre);

      // Update state with the generated audio URL
      setGeneratedAudioUrl(audioUrl);
      setShowResult(true);
      toast.success(`Your ${voice} voice with ${genre} style has been generated successfully!`);
    } catch (error) {
      console.error('Error generating audio:', error);
      setProcessingError('Failed to generate audio. Please try again.');
      toast.error('Error generating audio. Please try again.');

      // Import voice samples for fallback
      const { voiceSamples } = await import('../data/voice-samples');
      const fallbackAudio = voiceSamples[voice]?.fallbackUrl || voiceSamples.default.fallbackUrl;
      setGeneratedAudioUrl(fallbackAudio);
      setShowResult(true);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 bg-gradient-to-br from-[#0e0b16] to-[#1a1625] min-h-screen -mt-6 -mx-6 p-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#41FDFE] to-[#FF1CF7] bg-clip-text text-transparent animate-gradient">Composition Converter Remix Studio</h1>
        <h2 className="text-2xl font-medium text-[#41FDFE]/80">Customize Your Sound</h2>
        <p className="text-lg text-gray-400">Enter a prompt, select voice and genre to create the perfect remix.</p>
      </div>

      <div className="bg-gradient-to-br from-[#0f1e26] to-[#1a1625] border border-[#41FDFE]/20 p-8 rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(65,253,254,0.2)] transition-all duration-300">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-[#41FDFE] to-[#FF1CF7] bg-clip-text text-transparent mb-6">Enter Prompt</h3>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to create"
          className="w-full h-40 p-6 bg-[#0a1419]/80 border-2 border-[#41FDFE]/30 rounded-xl focus:outline-none focus:border-[#41FDFE] text-white text-lg transition-all duration-300 hover:border-[#41FDFE]/50 resize-none placeholder-gray-400"
        />
        {promptAnalysis && (
          <div className="mt-4 space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[#41FDFE]">Detected Mood:</span>
                {promptAnalysis.emotionalTags.map(tag => (
                  <span key={tag} className="px-4 py-2 bg-gradient-to-r from-[#41FDFE]/10 to-[#FF1CF7]/10 border border-[#41FDFE]/30 rounded-full text-[#41FDFE] text-sm font-medium">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#41FDFE]">Musical Elements:</span>
                {promptAnalysis.detectedElements.map(element => (
                  <span key={element} className="px-4 py-2 bg-gradient-to-r from-[#41FDFE]/10 to-[#FF1CF7]/10 border border-[#41FDFE]/30 rounded-full text-[#41FDFE] text-sm font-medium">{element}</span>
                ))}
              </div>
              <div className="flex items-center gap-4 w-full">
                <span className="text-[#41FDFE] min-w-[80px]">Intensity:</span>
                <div className="flex-1 h-3 bg-[#0a1419] rounded-full overflow-hidden p-[2px]">
                  <div
                    className="h-full bg-gradient-to-r from-[#41FDFE] to-[#FF1CF7] rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${promptAnalysis.intensity * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-3 mb-8">
          {styles.map(style => (
            <StyleChip
              key={style}
              label={style}
              selected={selectedStyles.includes(style)}
              onClick={() => toggleStyle(style)}
              className="bg-black/20 hover:bg-[#41FDFE]/20 border border-gray-600 hover:border-[#41FDFE] text-white transition-all duration-200"
            />
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#0f1e26] to-[#1a1625] border border-[#41FDFE]/20 p-8 rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(65,253,254,0.2)] transition-all duration-300">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-[#41FDFE] to-[#FF1CF7] bg-clip-text text-transparent mb-6">Remix Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-lg text-[#41FDFE]/80 mb-3 block font-medium">Voice Setup</label>
            <VoiceSelect value={voice} onChange={setVoice} />
          </div>

          <div>
            <label className="text-lg text-[#41FDFE]/80 mb-3 block font-medium">Genre Style</label>
            <GenreSelect value={genre} onChange={setGenre} />
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerateAudio}
        disabled={isGenerating}
        className="w-full py-3 px-4 bg-gradient-to-r from-[#41FDFE] to-[#FF1CF7] text-black font-semibold rounded-lg transition-all duration-300 hover:opacity-90 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#41FDFE] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isGenerating ? 'Generating Audio...' : 'Generate Audio'}
      </button>

      {(isGenerating || showResult) && (
        <div className="bg-gradient-to-br from-[#0f1e26] to-[#1a1625] border border-[#41FDFE]/20 p-8 rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(65,253,254,0.2)] transition-all duration-300">
          <AudioPlayer
            title="Your Audio is Ready!"
            isGenerating={isGenerating}
            audioUrl={generatedAudioUrl}
            genre={genre}
          />
          {processingError && (
            <p className="text-red-400 text-sm mt-2">{processingError}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TextToRemixPage;
