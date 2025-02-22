export interface FormValues {
  reply: string;
  tone: string;
  translationStyle: string;
}

export interface TranslationResponse {
  translation: string;
  detectedLanguage: string;
}

export interface ReplyResponse {
  reply: string;
  retranslation: string;
}

export type AIModel = "OpenAI_GPT4_Mini" | "Google_Gemini_2_0_Flash" | "Anthropic_Claude_3_5_Haiku";
export type Language =
  | "ja"
  | "en"
  | "fr"
  | "es"
  | "de"
  | "it"
  | "zh"
  | "ko"
  | "pt"
  | "ru"
  | "nl"
  | "vi"
  | "th"
  | "id"
  | "hi"
  | "ar"
  | "bn"
  | "tr"
  | "uk"
  | "pl"
  | "he"
  | "sv"
  | "da"
  | "fi";

export interface Preferences {
  aiModel: AIModel;
  targetLanguage: Language;
}
