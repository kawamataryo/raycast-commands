import {
  Detail,
  Action,
  useNavigation,
  ActionPanel,
  getPreferenceValues,
  environment,
  showHUD,
  AI,
} from "@raycast/api";
import { useAI } from "@raycast/utils";
import { AI_MODELS, PROMPTS } from "./constants";
import ReplyForm from "./components/ReplyForm";
import { useSelectedText } from "./hooks/useSelectedText";
import { Preferences } from "./types";
import { useEffect } from "react";
import { detectLanguage } from "./utils/detectLanguage";
import { LANGUAGES } from "./constants";

export default function Command() {
  const { selectedText, loading: isSelectedTextLoading } = useSelectedText();
  const preferences = getPreferenceValues<Preferences>();

  useEffect(() => {
    if (!environment.canAccess(AI)) {
      showHUD("Raycast Pro plan is required to use AI features.");
    }
  }, []);

  const { data: translationText, isLoading: isTranslationLoading } = useAI(
    PROMPTS.TRANSLATION(selectedText, preferences.targetLanguage),
    {
      model: AI_MODELS[preferences.aiModel],
      execute: !!selectedText && !isSelectedTextLoading && environment.canAccess(AI),
      stream: true,
      creativity: "none",
    },
  );

  const detectedLanguageFlag = selectedText ? detectLanguage(selectedText) : LANGUAGES.en.flag;

  const { push } = useNavigation();

  return (
    <Detail
      markdown={translationText ? `### Translation Result  \n\n\`\`\`\n${translationText}\n\`\`\`` : "Translating..."}
      isLoading={isTranslationLoading || isSelectedTextLoading}
      actions={
        <ActionPanel>
          <Action
            title="Generate Reply"
            onAction={() => {
              push(<ReplyForm translationText={translationText} detectedLanguage={detectedLanguageFlag} />);
            }}
          />
        </ActionPanel>
      }
    />
  );
}
