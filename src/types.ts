export interface FormValues {
  reply: string;
}

export interface TranslationResponse {
  translation: string;
  detectedLanguage: string;
}

export interface ReplyResponse {
  reply: string;
  retranslation: string;
}
