import { Action, ActionPanel, Form, useNavigation } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { Result } from "./Result";

interface ReplyFormProps {
  translationText: string;
  detectedLanguage: string;
}

const ReplyForm = ({ translationText, detectedLanguage }: ReplyFormProps) => {
  const { push } = useNavigation();
  const { handleSubmit, itemProps } = useForm<{ reply: string; tone: string; translationStyle: string }>({
    initialValues: {
      tone: "formal",
      translationStyle: "natural",
    },
    onSubmit: (values) => {
      push(
        <Result
          translationText={translationText}
          detectedLanguage={detectedLanguage}
          replyText={values.reply}
          tone={values.tone}
          translationStyle={values.translationStyle}
        />,
      );
    },
  });

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Generate" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description title="Translation" text={translationText} />
      <Form.TextArea title="Reply Text" placeholder="Reply text" {...itemProps.reply} />
      <Form.Dropdown title="Tone Options" {...itemProps.tone}>
        <Form.Dropdown.Item value="formal" title="🎩 Formal" />
        <Form.Dropdown.Item value="casual" title="😊 Casual" />
      </Form.Dropdown>
      <Form.Dropdown title="Translation Style" {...itemProps.translationStyle}>
        <Form.Dropdown.Item value="natural" title="🌿 Natural" />
        <Form.Dropdown.Item value="literal" title="📝 Literal" />
        <Form.Dropdown.Item value="simple" title="💫 Simple" />
      </Form.Dropdown>
    </Form>
  );
};

export default ReplyForm;
