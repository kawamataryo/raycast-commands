import { Detail, Action, useNavigation, ActionPanel } from "@raycast/api";
import { useAI } from "@raycast/utils";
import { MODEL, PROMPTS } from "./constants";
import ReplyForm from "./components/ReplyForm";
import { useSelectedText } from "./hooks/useSelectedText";

export default function Command() {
  const { selectedText, loading: isSelectedTextLoading } = useSelectedText();

  const { data: translationText, isLoading: isTranslationLoading } = useAI(PROMPTS.TRANSLATION(selectedText), {
    model: MODEL,
    execute: !!selectedText && !isSelectedTextLoading,
    stream: true,
    creativity: "none",
  });

  const { data: detectedLanguageData, isLoading: isDetectedLanguageLoading } = useAI(PROMPTS.DETECTED_LANGUAGE(selectedText), {
    model: MODEL,
    execute: !!selectedText && !isSelectedTextLoading,
    stream: false,
    creativity: "none",
  });

  const { push } = useNavigation();

  return (
    <Detail
      markdown={translationText ? `### 🇯🇵 翻訳結果  \n\n\`\`\`\n${translationText}\n\`\`\`` : "Translating..."}
      isLoading={isTranslationLoading || isDetectedLanguageLoading || isSelectedTextLoading}
      actions={
        <ActionPanel>
          <Action
            title="返信文を生成"
            onAction={() => {
              push(<ReplyForm translationText={translationText} detectedLanguage={detectedLanguageData} />);
            }}
          />
        </ActionPanel>
      }
    />
  );
}
