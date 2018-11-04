import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

const markdownIt = new MarkdownIt({
  html: true
});

export function markdown(markdownText) {
  return markdownIt.render(markdownText);
}
