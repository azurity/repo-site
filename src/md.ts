import * as MarkdownIt from 'markdown-it'
import * as hljs from 'highlight.js'
import '@/main.css'

hljs.initHighlighting()

const MD = MarkdownIt({
    highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return (
                    '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>'
                )
            } catch (__) {}
        }
        return '<pre class="hljs"><code>' + defaultEscape(str) + '</code></pre>'
    }
})

function defaultEscape(str: string) {
    MD.utils.escapeHtml(str)
}

export default MD
