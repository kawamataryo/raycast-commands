import { showToast, Toast, Detail, Clipboard, getPreferenceValues } from "@raycast/api";
import { useAI } from "@raycast/utils";
import { useEffect } from "react";
import { AI_MODELS, PROMPTS } from "../constants";
import { Preferences } from "../types";

interface ResultProps {
  translationText: string;
  detectedLanguage: string;
  replyText: string;
  tone: string;
  translationStyle: string;
}

export const Result = ({ translationText, detectedLanguage, replyText, tone, translationStyle }: ResultProps) => {
  const preferences = getPreferenceValues<Preferences>();
  const { data: replyTranslationText, isLoading: isReplyTextLoading } = useAI(
    PROMPTS.REPLY({
      originalText: translationText,
      detectedLanguage,
      reply: replyText,
      tone,
      translationStyle,
    }),
    {
      model: AI_MODELS[preferences.aiModel],
      execute: !!translationText && !!detectedLanguage && !!replyText && !!tone && !!translationStyle,
      creativity: "none",
    },
  );

  const { data: reTranslationTextData, isLoading: isReTranslationTextLoading } = useAI(
    PROMPTS.TRANSLATION(replyTranslationText, preferences.targetLanguage),
    {
      model: AI_MODELS[preferences.aiModel],
      execute: !!replyTranslationText,
      creativity: "none",
    },
  );

  useEffect(() => {
    if (replyTranslationText) {
      Clipboard.copy(replyTranslationText);
      showToast({
        style: Toast.Style.Success,
        title: "Copied",
        message: "Copied translation to clipboard",
      });
    }
  }, [replyTranslationText]);

  return (
    <Detail
      markdown={
        replyTranslationText
          ? `### ${detectedLanguage} Reply Text  \n\n\`\`\`\n${replyTranslationText}\n\`\`\`\n\n### 🇯🇵 翻訳結果  \n\n\`\`\`\n${reTranslationTextData}\n\`\`\``
          : "Generating..."
      }
      isLoading={isReplyTextLoading || isReTranslationTextLoading}
    />
  );
};
