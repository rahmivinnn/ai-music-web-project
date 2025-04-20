
import { useState, useEffect, useRef } from 'react';
import StyleChip from './ui/StyleChip';
import GenreSelect from './ui/GenreSelect';
import VoiceSelect from './ui/VoiceSelect';
import AudioPlayer from './ui/AudioPlayer';
import { toast } from "sonner";
import { resumeAudioContext } from '@/utils/audioProcessor';
import { playGeneratedAudio } from '@/utils/textToAudioGenerator';
// Import voice samples types but load the actual data dynamically to avoid circular dependencies
import type { VoiceSample } from '../data/voice-samples';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { Play, Pause, Save, RefreshCw, Music, Activity } from 'lucide-react';
import { edmSamples } from '../data/edm-samples';

// EDM-focused styles
const styles = ['EDM Drop', 'Festival', 'Club Mix', 'Progressive', 'Future Bass', 'Melodic'];

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [previewSample, setPreviewSample] = useState<string | null>(null);
  const [edmPresets, setEdmPresets] = useState([
    { name: 'Festival EDM', bpm: 128, sidechain: 0.8, reverb: 0.4, delay: 0.2, stereo: 0.9, drop: 0.9 },
    { name: 'Deep House', bpm: 124, sidechain: 0.6, reverb: 0.5, delay: 0.3, stereo: 0.7, drop: 0.5 },
    { name: 'Future Bass', bpm: 150, sidechain: 0.7, reverb: 0.6, delay: 0.25, stereo: 0.8, drop: 0.85 },
    { name: 'Melodic EDM', bpm: 126, sidechain: 0.4, reverb: 0.7, delay: 0.4, stereo: 0.6, drop: 0.7 },
    { name: 'Trap EDM', bpm: 140, sidechain: 0.9, reverb: 0.3, delay: 0.15, stereo: 0.5, drop: 0.95 },
  ]);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  // Apply preset settings
  const applyPreset = (index: number) => {
    const preset = edmPresets[index];
    setSelectedPreset(index);
    setBpm(preset.bpm);
    setSidechainAmount(preset.sidechain);
    setReverbAmount(preset.reverb);
    setDelayAmount(preset.delay);
    setStereoWidth(preset.stereo);
    setDropIntensity(preset.drop);
    toast.success(`Applied ${preset.name} preset`);
  };

  // Toggle preview mode with EDM samples
  const togglePreview = () => {
    if (previewMode) {
      setPreviewMode(false);
      setPreviewSample(null);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      setPreviewMode(true);
      // Get a random EDM sample
      const randomSample = edmSamples[Math.floor(Math.random() * edmSamples.length)];
      setPreviewSample(randomSample.url);
      toast.info(`Preview mode: ${randomSample.title} by ${randomSample.artist}`);
    }
  };

  // Handle play/pause for audio preview
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleGenerateAudio = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a description of what you want to create');
      return;
    }

    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    setIsGenerating(true);
    setProcessingError(null);
    setShowResult(false); // Hide previous result while generating

    try {
      // Make sure audio context is resumed
      await resumeAudioContext();

      // Apply current EDM effect settings
      const edmSettings = {
        bpm,
        sidechain: sidechainAmount,
        reverb: reverbAmount,
        delay: delayAmount,
        stereo: stereoWidth,
        drop: dropIntensity
      };

      // Generate audio from prompt with selected voice and genre
      const audioUrl = await playGeneratedAudio(prompt, voice, genre);

      // Update state with the generated audio URL
      setGeneratedAudioUrl(audioUrl);
      setShowResult(true);
      toast.success(`Your ${voice} voice with ${genre} style is ready to play!`);
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
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-[#41FDFE] to-[#FF1CF7] bg-clip-text text-transparent">Remix Settings</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`border-[#41FDFE]/50 ${previewMode ? 'bg-[#41FDFE]/20 text-[#41FDFE]' : 'text-gray-400'}`}
              onClick={togglePreview}
            >
              <Music className="h-4 w-4 mr-2" />
              {previewMode ? 'Stop Preview' : 'Preview EDM'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <label className="text-lg text-[#41FDFE]/80 mb-3 block font-medium">Voice Setup</label>
            <VoiceSelect value={voice} onChange={setVoice} />
          </div>

          <div>
            <label className="text-lg text-[#41FDFE]/80 mb-3 block font-medium">Genre Style</label>
            <GenreSelect value={genre} onChange={setGenre} />
          </div>
        </div>

        <div className="bg-black/30 p-4 rounded-lg mb-6">
          <h4 className="text-lg font-medium text-[#41FDFE] mb-4">EDM Effect Controls</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-400">BPM</label>
                  <span className="text-[#41FDFE]">{bpm}</span>
                </div>
                <Slider
                  value={[bpm]}
                  min={80}
                  max={180}
                  step={1}
                  onValueChange={(value) => setBpm(value[0])}
                  className="py-1"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-400">Sidechain</label>
                  <span className="text-[#41FDFE]">{Math.round(sidechainAmount * 100)}%</span>
                </div>
                <Slider
                  value={[sidechainAmount]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={(value) => setSidechainAmount(value[0])}
                  className="py-1"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-400">Reverb</label>
                  <span className="text-[#41FDFE]">{Math.round(reverbAmount * 100)}%</span>
                </div>
                <Slider
                  value={[reverbAmount]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={(value) => setReverbAmount(value[0])}
                  className="py-1"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-400">Delay</label>
                  <span className="text-[#41FDFE]">{Math.round(delayAmount * 100)}%</span>
                </div>
                <Slider
                  value={[delayAmount]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={(value) => setDelayAmount(value[0])}
                  className="py-1"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-400">Stereo Width</label>
                  <span className="text-[#41FDFE]">{Math.round(stereoWidth * 100)}%</span>
                </div>
                <Slider
                  value={[stereoWidth]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={(value) => setStereoWidth(value[0])}
                  className="py-1"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-400">Drop Intensity</label>
                  <span className="text-[#41FDFE]">{Math.round(dropIntensity * 100)}%</span>
                </div>
                <Slider
                  value={[dropIntensity]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={(value) => setDropIntensity(value[0])}
                  className="py-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium text-[#41FDFE] mb-4">EDM Presets</h4>
          <div className="flex flex-wrap gap-2">
            {edmPresets.map((preset, index) => (
              <Button
                key={preset.name}
                variant={selectedPreset === index ? "default" : "outline"}
                size="sm"
                className={selectedPreset === index ? "bg-[#41FDFE] text-black" : "border-[#41FDFE]/30 text-[#41FDFE]/80 hover:border-[#41FDFE] hover:text-[#41FDFE]"}
                onClick={() => applyPreset(index)}
              >
                {preset.name}
              </Button>
            ))}
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

      {/* Preview Audio Player */}
      {previewMode && previewSample && (
        <div className="bg-gradient-to-br from-[#0f1e26] to-[#1a1625] border border-[#41FDFE]/20 p-8 rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(65,253,254,0.2)] transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-[#41FDFE]">EDM Preview Mode</h3>
            <Button
              variant="outline"
              size="sm"
              className="border-[#41FDFE]/50 text-[#41FDFE]"
              onClick={togglePreview}
            >
              Stop Preview
            </Button>
          </div>
          <AudioPlayer
            title="EDM Sample Track"
            audioUrl={previewSample}
            genre={genre}
          />
          <p className="text-gray-400 text-sm mt-4">Adjust the EDM effect controls above to hear how they would affect your generated audio.</p>
        </div>
      )}

      {/* Generated Audio Result */}
      {(isGenerating || showResult) && (
        <div className="bg-gradient-to-br from-[#0f1e26] to-[#1a1625] border border-[#41FDFE]/20 p-8 rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(65,253,254,0.2)] transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-[#41FDFE]">{isGenerating ? 'Generating Your Audio...' : 'Your Audio is Ready!'}</h3>
            {!isGenerating && showResult && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#41FDFE]/50 text-[#41FDFE]"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#41FDFE]/50 text-[#41FDFE]"
                  onClick={() => {
                    const a = document.createElement('a');
                    a.href = generatedAudioUrl;
                    a.download = `${prompt.substring(0, 20)}_${genre}_${voice}.wav`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    toast.success('Audio downloaded successfully!');
                  }}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            )}
          </div>

          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 border-4 border-[#41FDFE] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">Creating your EDM audio masterpiece...</p>
            </div>
          ) : (
            <>
              <div className="bg-black/30 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#41FDFE]/20 rounded-full flex items-center justify-center">
                    {isPlaying ?
                      <Activity className="h-8 w-8 text-[#41FDFE] animate-pulse" /> :
                      <Play className="h-8 w-8 text-[#41FDFE]" />}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{voice} Voice with {genre} Style</h4>
                    <p className="text-gray-400 text-sm">BPM: {bpm} | Effects: Sidechain {Math.round(sidechainAmount * 100)}%, Reverb {Math.round(reverbAmount * 100)}%</p>
                  </div>
                </div>

                <audio
                  ref={audioRef}
                  src={generatedAudioUrl}
                  className="w-full mt-4"
                  controls
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />
              </div>

              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">Generated from your prompt using AI</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-[#41FDFE]"
                  onClick={handleGenerateAudio}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
              </div>
            </>
          )}

          {processingError && (
            <p className="text-red-400 text-sm mt-2">{processingError}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TextToRemixPage;
