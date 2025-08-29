import { useEffect } from "react";

interface UseAutoSpeechOptions {
  text: string;
  enabled: boolean;
  language?: string;
  rate?: number;
  delay?: number;
}

/**
 * Custom hook for automatic text-to-speech with high-quality voice selection
 */
export const useAutoSpeech = ({
  text,
  enabled,
  language = "pl-PL",
  rate = 0.8,
  delay = 300,
}: UseAutoSpeechOptions): void => {
  useEffect(() => {
    if (!text || !enabled || !("speechSynthesis" in window)) {
      return;
    }

    const timer = setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = rate;

      // Enhanced voice selection for Polish
      if (language === "pl-PL") {
        const voices = window.speechSynthesis.getVoices();
        const preferredVoiceNames = [
          "Zosia",
          "Polish",
          "Maja",
          "Katarzyna",
          "pl-PL",
        ];

        let selectedVoice = null;

        // Try preferred voice names first
        for (const voiceName of preferredVoiceNames) {
          selectedVoice = voices.find(
            (voice) =>
              voice.name.includes(voiceName) ||
              (voice.lang.includes("pl") && voice.name.includes(voiceName))
          );
          if (selectedVoice) break;
        }

        // Look for high-quality Polish voices
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
        }
      }

      window.speechSynthesis.speak(utterance);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, enabled, language, rate, delay]);
};
