type AiMarkdownProps = {
  content: string;
};

export function AiMarkdown({ content }: AiMarkdownProps) {
  return <article>{content}</article>;
}