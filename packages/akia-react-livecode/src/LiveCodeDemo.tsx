type LiveCodeDemoProps = {
  title?: string;
  code?: string;
};

export function LiveCodeDemo({
  title = "Live code demo",
  code = "const message = 'akia-react';"
}: LiveCodeDemoProps) {
  return (
    <section>
      <h2>{title}</h2>
      <pre>
        <code>{code}</code>
      </pre>
    </section>
  );
}