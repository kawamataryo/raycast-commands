import { Action, ActionPanel, Form, useNavigation } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { Result } from "./Result";

interface ReplyFormProps {
  translationText: string;
  detectedLanguage: string;
}

const ReplyForm = ({ translationText, detectedLanguage }: ReplyFormProps) => {
  const { push } = useNavigation();
  const { handleSubmit, itemProps } = useForm<{ reply: string; tone: string }>({
    initialValues: {
      tone: "formal",
    },
    onSubmit: (values) => {
      push(<Result translationText={translationText} detectedLanguage={detectedLanguage} replyText={values.reply} tone={values.tone} />);
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
      <Form.Description title="Language" text={detectedLanguage} />
      <Form.TextArea title="Reply Text" placeholder="Reply text" {...itemProps.reply} />
      <Form.Dropdown title="Tone Options" {...itemProps.tone}>
        <Form.Dropdown.Item value="formal" title="🎩 Formal" />
        <Form.Dropdown.Item value="casual" title="😊 Casual" />
      </Form.Dropdown>
    </Form>
  );
};

export default ReplyForm;
