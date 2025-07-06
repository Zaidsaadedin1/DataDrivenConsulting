import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

interface SoundContextType {
  isSoundOn: boolean;
  toggleSound: () => void;
  playGlobalSound: (src: string) => void;
  backgroundAudio: HTMLAudioElement | null;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const backgroundAudio = useRef<HTMLAudioElement | null>(null);

  // Initialize background audio
  useEffect(() => {
    backgroundAudio.current = new Audio("/audio/background-sound.mp3");
    backgroundAudio.current.loop = true;
    backgroundAudio.current.volume = 0.3; // Set to 30% volume

    return () => {
      if (backgroundAudio.current) {
        backgroundAudio.current.pause();
        backgroundAudio.current = null;
      }
    };
  }, []);

  // Handle sound toggle
  useEffect(() => {
    if (!backgroundAudio.current) return;

    if (isSoundOn) {
      backgroundAudio.current.play().catch((e) => {
        console.error("Autoplay prevented:", e);
      });
    } else {
      backgroundAudio.current.pause();
    }
  }, [isSoundOn]);

  const toggleSound = () => {
    setIsSoundOn((prev) => !prev);
  };

  const playGlobalSound = async (src: string) => {
    if (!isSoundOn) return;

    try {
      const audio = new Audio(src);
      audio.volume = 0.5;
      await audio.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  return (
    <SoundContext.Provider
      value={{
        isSoundOn,
        toggleSound,
        playGlobalSound,
        backgroundAudio: backgroundAudio.current,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
