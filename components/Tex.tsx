import katex from "katex";

export function Tex({ tex, display = false }: { tex: string; display?: boolean }) {
  const html = katex.renderToString(tex, { throwOnError: false, displayMode: display });
  return <span className={display ? "tex-display" : "tex-inline"} dangerouslySetInnerHTML={{ __html: html }} />;
}
