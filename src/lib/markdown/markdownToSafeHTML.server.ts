"use server";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

export function markdownToSafeHTMLServer(md: string): string {
  const html = marked.parse(md || "");
  // En server, DOMPurify usa JSDOM implícita de isomorphic-dompurify
  return DOMPurify.sanitize(String(html));
}
