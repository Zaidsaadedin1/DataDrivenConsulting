// utils/sound.ts
export const playHoverSound = () => {
  // Create audio element on first use
  const audio = new Audio("/audio/hover.mp3");
  audio.volume = 0.3; // 30% volume
  audio.play().catch((e) => console.log("Sound play prevented:", e));

  // Cleanup after playback
  audio.addEventListener("ended", () => {
    audio.remove();
  });
};
