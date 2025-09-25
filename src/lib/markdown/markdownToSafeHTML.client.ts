"use client";
// NO usar el helper de servidor aquí. Si realmente necesitas render en cliente:
// usa DOMPurify del navegador.
import DOMPurify from "dompurify";
import { marked } from "marked";

export function markdownToSafeHTMLClient(md: string): string {
  const html = marked.parse(md || "");
  return DOMPurify.sanitize(String(html));
}
