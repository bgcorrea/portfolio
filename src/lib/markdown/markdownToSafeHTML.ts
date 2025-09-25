import { marked } from "marked";
import DOMPurify from "dompurify";

export function markdownToSafeHTML(md: string): string {
  const html = marked.parse(md || "");
  return DOMPurify.sanitize(String(html));
}
