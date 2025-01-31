import { AI } from "@raycast/api";

export const MODEL = AI.Model["Google_Gemini_2.0_Flash"];

export const PROMPTS = {
  TRANSLATION: (selectedText: string) => `
あなたは高性能な翻訳システムです。与えられた文章を自然な日本語に翻訳してください。
翻訳文のみを出力し、元の文章や説明などは一切含めないでください。

翻訳のルール：
- 文化的な文脈を考慮し、適切な日本語表現を選択する
- 原文のニュアンスをできるだけ保持する

入力文：
${selectedText}
`,
  DETECTED_LANGUAGE: (selectedText: string) => `
あなたは高精度の言語判定システムです。与えられたテキストの言語を判定し、対応する国旗の絵文字のみを返してください。それ以外の文字や説明は一切含めないでください。

判定可能な言語と対応する絵文字：
英語 → 🇬🇧
フランス語 → 🇫🇷
スペイン語 → 🇪🇸
ポルトガル語 → 🇵🇹
日本語 → 🇯🇵
ドイツ語 → 🇩🇪
イタリア語 → 🇮🇹
中国語 → 🇨🇳
韓国語 → 🇰🇷

以下のルールに従ってください：
- 絵文字以外の文字は一切出力しない
- 複数の言語が混在する場合は、最も支配的な言語の絵文字を返す

入力：
${selectedText}`.trim(),
  REPLY: ({
    originalText,
    detectedLanguage,
    reply,
    tone,
  }: {
    originalText: string;
    detectedLanguage: string;
    reply: string;
    tone: string;
  }) => `
あなたは多言語コミュニケーションの専門家です。以下のコメントに対する返信を、指定された言語とトーンで作成してください。

原文コメント：
"""
${originalText}
"""

返信文または返信の内容：
"""
${reply}
"""

出力言語：${detectedLanguage}
コミュニケーションのトーン：${tone}

返信作成のルール：
- 簡潔に内容を表現する
- 文化的背景とローカライズを考慮する
- 指定された言語の慣用句や一般的な表現を適切に使用する
- 指定されたトーンを正確に反映する
- 原文コメントのコンテキストに沿った自然な返信にする

以下に返信文のみを出力してください：
`,
} as const;
