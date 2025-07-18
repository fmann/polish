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

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.8; // Slightly slower for language learning
    utterance.pitch = 1;
    utterance.volume = 1;

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
