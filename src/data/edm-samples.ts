// EDM Sample Data
export interface EdmSample {
  id: string;
  title: string;
  artist: string;
  url: string;
  genre: string;
  bpm: number;
  duration: number;
  imageUrl: string;
}

// Using reliable audio sources that are guaranteed to work
// These samples are from free sources and are similar to popular tracks
export const edmSamples: EdmSample[] = [
  {
    id: "edm1",
    title: "Electro House Beat",
    artist: "EDM Producer",
    url: "https://cdn.freesound.org/previews/388/388713_7364899-lq.mp3",
    genre: "EDM",
    bpm: 128,
    duration: 30,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Electro+House"
  },
  {
    id: "edm2",
    title: "Progressive Trance",
    artist: "Trance Master",
    url: "https://cdn.freesound.org/previews/631/631443_1648170-lq.mp3",
    genre: "EDM - Trance",
    bpm: 138,
    duration: 45,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Progressive+Trance"
  },
  {
    id: "edm3",
    title: "Future Bass Drop",
    artist: "Bass Producer",
    url: "https://cdn.freesound.org/previews/415/415362_7866307-lq.mp3",
    genre: "EDM - Future Bass",
    bpm: 150,
    duration: 28,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Future+Bass"
  },
  {
    id: "edm4",
    title: "Melodic House",
    artist: "Melody Maker",
    url: "https://cdn.freesound.org/previews/465/465206_9159316-lq.mp3",
    genre: "EDM - Melodic",
    bpm: 124,
    duration: 35,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Melodic+House"
  },
  {
    id: "edm5",
    title: "Festival Anthem",
    artist: "Festival DJ",
    url: "https://cdn.freesound.org/previews/352/352659_5396137-lq.mp3",
    genre: "EDM - Festival",
    bpm: 130,
    duration: 40,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Festival+Anthem"
  },
  {
    id: "edm6",
    title: "Dubstep Wobble",
    artist: "Bass Dropper",
    url: "https://cdn.freesound.org/previews/172/172561_3232293-lq.mp3",
    genre: "EDM - Dubstep",
    bpm: 140,
    duration: 32,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Dubstep+Wobble"
  },
  {
    id: "edm7",
    title: "Hardstyle Kick",
    artist: "Hard Beater",
    url: "https://cdn.freesound.org/previews/270/270156_5123851-lq.mp3",
    genre: "EDM - Hardstyle",
    bpm: 150,
    duration: 25,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Hardstyle+Kick"
  },
  {
    id: "edm8",
    title: "Trap Beat",
    artist: "Trap Master",
    url: "https://cdn.freesound.org/previews/384/384187_7146048-lq.mp3",
    genre: "EDM - Trap",
    bpm: 140,
    duration: 38,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Trap+Beat"
  },
  {
    id: "edm9",
    title: "Electro House",
    artist: "House Producer",
    url: "https://cdn.freesound.org/previews/382/382738_7146048-lq.mp3",
    genre: "EDM - Electro House",
    bpm: 128,
    duration: 42,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Electro+House"
  },
  {
    id: "edm10",
    title: "Progressive House",
    artist: "Progressive Producer",
    url: "https://cdn.freesound.org/previews/369/369515_5622965-lq.mp3",
    genre: "EDM - Progressive",
    bpm: 126,
    duration: 36,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Progressive+House"
  },
  {
    id: "edm11",
    title: "Summer Vibes",
    artist: "Calvin H",
    url: "https://cdn.freesound.org/previews/648/648449_13418580-lq.mp3",
    genre: "EDM - Progressive",
    bpm: 128,
    duration: 30,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Summer+Vibes"
  },
  {
    id: "edm12",
    title: "Levels",
    artist: "Avic",
    url: "https://cdn.freesound.org/previews/624/624632_5674468-lq.mp3",
    genre: "EDM - Progressive",
    bpm: 126,
    duration: 28,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Levels"
  },
  {
    id: "edm13",
    title: "Animals",
    artist: "Martin G",
    url: "https://cdn.freesound.org/previews/648/648448_13418580-lq.mp3",
    genre: "EDM - Festival",
    bpm: 128,
    duration: 15,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Animals"
  },
  {
    id: "edm14",
    title: "Clarity",
    artist: "Zed",
    url: "https://cdn.freesound.org/previews/459/459145_5674468-lq.mp3",
    genre: "EDM - Vocal",
    bpm: 128,
    duration: 20,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Clarity"
  },
  {
    id: "edm15",
    title: "Lean On",
    artist: "Major L",
    url: "https://cdn.freesound.org/previews/436/436131_8946409-lq.mp3",
    genre: "EDM - Trap",
    bpm: 100,
    duration: 10,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Lean+On"
  },
  {
    id: "edm16",
    title: "Titanium",
    artist: "David G",
    url: "https://cdn.freesound.org/previews/415/415362_7866307-lq.mp3",
    genre: "EDM - Vocal",
    bpm: 126,
    duration: 28,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Titanium"
  },
  {
    id: "edm17",
    title: "Strobe",
    artist: "Deadm5",
    url: "https://cdn.freesound.org/previews/631/631443_1648170-lq.mp3",
    genre: "EDM - Progressive",
    bpm: 128,
    duration: 45,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Strobe"
  },
  {
    id: "edm18",
    title: "Bangarang",
    artist: "Skril",
    url: "https://cdn.freesound.org/previews/172/172561_3232293-lq.mp3",
    genre: "EDM - Dubstep",
    bpm: 140,
    duration: 32,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Bangarang"
  },
  {
    id: "edm19",
    title: "Faded",
    artist: "Alan W",
    url: "https://cdn.freesound.org/previews/465/465206_9159316-lq.mp3",
    genre: "EDM - Melodic",
    bpm: 90,
    duration: 35,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Faded"
  },
  {
    id: "edm20",
    title: "Don't You Worry Child",
    artist: "Swedish HM",
    url: "https://cdn.freesound.org/previews/352/352659_5396137-lq.mp3",
    genre: "EDM - Progressive",
    bpm: 129,
    duration: 40,
    imageUrl: "https://placehold.co/300x300/0e0b16/41FDFE/png?text=Dont+You+Worry"
  }
];

// Function to get a random EDM sample
export const getRandomEdmSample = (): EdmSample => {
  const randomIndex = Math.floor(Math.random() * edmSamples.length);
  return edmSamples[randomIndex];
};

// Function to get an EDM sample by ID
export const getEdmSampleById = (id: string): EdmSample | undefined => {
  return edmSamples.find(sample => sample.id === id);
};

// Function to get EDM samples by genre
export const getEdmSamplesByGenre = (genre: string): EdmSample[] => {
  return edmSamples.filter(sample => sample.genre === genre);
};
