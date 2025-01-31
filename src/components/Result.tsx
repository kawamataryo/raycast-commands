import { AI, showToast, Toast, Detail, Clipboard } from "@raycast/api";
import { useAI } from "@raycast/utils";
import { useEffect } from "react";
import { MODEL, PROMPTS } from "../constants";

interface ResultProps {
  translationText: string;
  detectedLanguage: string;
  replyText: string;
  tone: string;
}

export const Result = ({ translationText, detectedLanguage, replyText, tone }: ResultProps) => {
  const { data: replyTranslationText, isLoading: isReplyTextLoading } = useAI(PROMPTS.REPLY({ originalText: translationText, detectedLanguage, reply: replyText, tone }), {
    model: MODEL,
    execute: !!translationText && !!detectedLanguage && !!replyText && !!tone,
    creativity: "none",
  });

  const { data: reTranslationTextData, isLoading: isReTranslationTextLoading } = useAI(PROMPTS.TRANSLATION(replyTranslationText), {
    model: MODEL,
    execute: !!replyTranslationText,
    creativity: "none",
  });

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
      markdown={replyTranslationText ? `### ${detectedLanguage} 返信文  \n\n\`\`\`\n${replyTranslationText}\n\`\`\`\n\n### 🇯🇵 翻訳結果  \n\n\`\`\`\n${reTranslationTextData}\n\`\`\`` : "Generating..."}
      isLoading={isReplyTextLoading || isReTranslationTextLoading}
    />
  );
};
