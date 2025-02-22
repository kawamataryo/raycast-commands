import { AI } from "@raycast/api";
import { AIModel, Language } from "./types";

export const AI_MODELS: Record<AIModel, AI.Model> = {
  OpenAI_GPT4_Mini: AI.Model.OpenAI_GPT4,
  Google_Gemini_2_0_Flash: AI.Model["Google_Gemini_2.0_Flash"],
  Anthropic_Claude_3_5_Haiku: AI.Model.Anthropic_Claude_Haiku,
} as const;

export const LANGUAGES: Record<Language, { name: string; flag: string }> = {
  ja: { name: "Japanese", flag: "🇯🇵" },
  en: { name: "English", flag: "🇺🇸" },
  fr: { name: "French", flag: "🇫🇷" },
  es: { name: "Spanish", flag: "🇪🇸" },
  he: { name: "Hebrew", flag: "🇮🇱" },
  sv: { name: "Swedish", flag: "🇸🇪" },
  da: { name: "Danish", flag: "🇩🇰" },
  fi: { name: "Finnish", flag: "🇫🇮" },
  de: { name: "German", flag: "🇩🇪" },
  it: { name: "Italian", flag: "🇮🇹" },
  zh: { name: "Chinese", flag: "🇨🇳" },
  ko: { name: "Korean", flag: "🇰🇷" },
  pt: { name: "Portuguese", flag: "🇵🇹" },
  ru: { name: "Russian", flag: "🇷🇺" },
  nl: { name: "Dutch", flag: "🇳🇱" },
  vi: { name: "Vietnamese", flag: "🇻🇳" },
  th: { name: "Thai", flag: "🇹🇭" },
  id: { name: "Indonesian", flag: "🇮🇩" },
  hi: { name: "Hindi", flag: "🇮🇳" },
  ar: { name: "Arabic", flag: "🇸🇦" },
  bn: { name: "Bengali", flag: "🇧🇩" },
  tr: { name: "Turkish", flag: "🇹🇷" },
  uk: { name: "Ukrainian", flag: "🇺🇦" },
  pl: { name: "Polish", flag: "🇵🇱" },
} as const;

export const PROMPTS = {
  TRANSLATION: (selectedText: string, targetLanguage: Language) => `
You are a high-performance translation system. Please translate the given text into ${LANGUAGES[targetLanguage].name}.
Output only the translation, without including the original text or any explanations.

Translation rules:
- Consider cultural context and choose appropriate expressions
- Maintain the nuance of the original text as much as possible

Input text:
${selectedText}
`,
  REPLY: ({
    originalText,
    detectedLanguage,
    reply,
    tone,
    translationStyle,
  }: {
    originalText: string;
    detectedLanguage: string;
    reply: string;
    tone: string;
    translationStyle: string;
  }) => `
You are a multilingual communication expert. Please create a reply in the specified language and tone for the following comment.

Original comment:
"""
${originalText}
"""

Reply content:
"""
${reply}
"""

Output language: ${detectedLanguage}
Communication tone: ${tone}
Translation style: ${translationStyle}

Reply creation rules:
- Express content ${translationStyle === "simple" ? "in the simplest possible way" : translationStyle === "literal" ? "with word-for-word accuracy" : "naturally and idiomatically"}
- ${translationStyle === "natural" ? "Use appropriate idioms and common expressions" : translationStyle === "simple" ? "Avoid complex expressions and idioms" : "Maintain strict word order where possible"}
- Consider cultural background and localization
- Accurately reflect the specified tone
- Create a reply that aligns with the context of the original comment

Please output only the reply text:
`,
} as const;
