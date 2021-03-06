import MarkdownIt from 'markdown-it';
import MarkdownItAttrs from 'markdown-it-attrs';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const markdownIt = new MarkdownIt({
  html: false,
  highlight: (text, lang) => {
    return hljs.highlight(lang, text).value;
  }
});
markdownIt.use(MarkdownItAttrs);

export function markdown(markdownText) {
  return markdownIt.render(markdownText);
}
