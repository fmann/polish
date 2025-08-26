import React, { useState } from "react";

interface SpeechButtonProps {
  text: string;
  language?: string;
  className?: string;
}

const SpeechButton: React.FC<SpeechButtonProps> = ({
  text,
  language = "pl-PL",
  className = "ml-2 text-blue-500 hover:text-blue-700 transition-colors cursor-pointer",
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const handleSpeak = (): void => {
    if (!text.trim()) return;

    // Check if the Web Speech API is supported
    if (!("speechSynthesis" in window)) {
      alert("Sorry, your browser doesn't support text-to-speech!");
      return;
    }

    // Stop any current speech
    window.speechSynthesis.cancel();

    const speakWithVoice = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = 0.8; // Slightly slower for language learning
      utterance.pitch = 1;
      utterance.volume = 1;

      // Try to select a better voice for Polish on Mac/Chrome
      if (language === "pl-PL") {
        const voices = window.speechSynthesis.getVoices();

        // Preferred voice names for Polish (in order of preference)
        const preferredVoiceNames = [
          "Zosia", // High-quality Polish voice on Mac
          "Polish",
          "Maja", // Alternative Polish voice
          "Katarzyna",
          "pl-PL",
        ];

        // Find the best available Polish voice
        let selectedVoice = null;
        for (const voiceName of preferredVoiceNames) {
          selectedVoice = voices.find(
            (voice) =>
              voice.name.includes(voiceName) ||
              (voice.lang.includes("pl") && voice.name.includes(voiceName))
          );
          if (selectedVoice) break;
        }

        // If no preferred voice found, look for any high-quality Polish voice
        if (!selectedVoice) {
          selectedVoice = voices.find(
            (voice) =>
              voice.lang.includes("pl") &&
              (voice.name.includes("Premium") ||
                voice.name.includes("Enhanced") ||
                voice.name.includes("Neural") ||
                !voice.name.includes("Google"))
          );
        }

        // Fallback to any Polish voice
        if (!selectedVoice) {
          selectedVoice = voices.find((voice) => voice.lang.includes("pl"));
        }

        if (selectedVoice) {
          utterance.voice = selectedVoice;
          console.log(`Selected Polish voice: ${selectedVoice.name}`);
        } else {
          console.log("No specific Polish voice found, using default");
          // List available voices for debugging
          console.log(
            "Available voices:",
            voices.map((v) => `${v.name} (${v.lang})`)
          );
        }
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        console.error("Speech synthesis error");
      };

      window.speechSynthesis.speak(utterance);
    };

    // Voices might not be loaded immediately, so we wait for them
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      // Wait for voices to load
      window.speechSynthesis.addEventListener(
        "voiceschanged",
        () => {
          speakWithVoice();
        },
        { once: true }
      );
    } else {
      speakWithVoice();
    }
  };

  return (
    <button
      onClick={handleSpeak}
      className={className}
      title={`Listen to pronunciation in ${
        language === "pl-PL" ? "Polish" : "English"
      }`}
      disabled={isSpeaking}
    >
      {isSpeaking ? "🔊" : "🔉"}
    </button>
  );
};

export default SpeechButton;
