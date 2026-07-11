'use client';

import { useEffect, useRef } from 'react';

interface MathRendererProps {
  content: string;
  inline?: boolean;
}

export default function MathRenderer({ content, inline = false }: MathRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const renderMath = async () => {
      try {
        const katex = await import('katex');
        if (containerRef.current) {
          const displayMath = containerRef.current.querySelectorAll('.math-display');
          const inlineMath = containerRef.current.querySelectorAll('.math-inline');

          displayMath.forEach((el) => {
            const tex = el.getAttribute('data-tex');
            if (tex) {
              katex.default.render(tex, el as HTMLElement, {
                displayMode: true,
                throwOnError: false,
              });
            }
          });

          inlineMath.forEach((el) => {
            const tex = el.getAttribute('data-tex');
            if (tex) {
              katex.default.render(tex, el as HTMLElement, {
                displayMode: false,
                throwOnError: false,
              });
            }
          });
        }
      } catch (e) {
        console.error('KaTeX rendering error:', e);
      }
    };

    renderMath();
  }, [content]);

  const processedContent = processContent(content);

  if (inline) {
    return <span ref={containerRef as any} dangerouslySetInnerHTML={{ __html: processedContent }} />;
  }

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: processedContent }} />;
}

function processContent(content: string): string {
  if (!content) return '';

  let processed = content;

  // Protect math expressions from markdown processing
  const mathBlocks: { placeholder: string; html: string }[] = [];

  // Extract display math $$...$$
  processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (match, tex) => {
    const placeholder = `__MATH_BLOCK_${mathBlocks.length}__`;
    mathBlocks.push({ placeholder, html: `<span class="math-display" data-tex="${escapeAttr(tex)}"></span>` });
    return placeholder;
  });

  // Extract inline math \( ... \)
  processed = processed.replace(/\\\(([\s\S]*?)\\\)/g, (match, tex) => {
    const placeholder = `__MATH_INLINE_${mathBlocks.length}__`;
    mathBlocks.push({ placeholder, html: `<span class="math-inline" data-tex="${escapeAttr(tex)}"></span>` });
    return placeholder;
  });

  // Extract inline math $...$ (but not $$)
  processed = processed.replace(/(?<!\$)\$(?!\$)([\s\S]*?)(?<!\$)\$(?!\$)/g, (match, tex) => {
    const placeholder = `__MATH_INLINE_${mathBlocks.length}__`;
    mathBlocks.push({ placeholder, html: `<span class="math-inline" data-tex="${escapeAttr(tex)}"></span>` });
    return placeholder;
  });

  // Escape HTML entities
  processed = processed
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Restore math placeholders before markdown processing
  mathBlocks.forEach(({ placeholder, html }) => {
    processed = processed.replace(placeholder, html);
  });

  // Process code blocks ```lang\ncode\n```
  processed = processed.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code class="language-${lang || 'text'}">${escapeHtml(code)}</code></pre>`;
  });

  // Process inline code `code`
  processed = processed.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Process headings # ## ###
  processed = processed.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  processed = processed.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  processed = processed.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  processed = processed.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

  // Process blockquote > text
  processed = processed.replace(/^&gt;\s*(.+)$/gm, '<blockquote>$1</blockquote>');

  // Process images ![alt](url)
  processed = processed.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;height:auto;">');

  // Process links [text](url)
  processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Process bold **text**
  processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Process italic *text* (but not **)
  processed = processed.replace(/(?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)/g, '<em>$1</em>');

  // Process horizontal rule ---
  processed = processed.replace(/^---+$/gm, '<hr>');

  // Process paragraphs and lists
  const lines = processed.split('\n');
  const result: string[] = [];
  let inUl = false;
  let inOl = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      if (inUl) { result.push('</ul>'); inUl = false; }
      if (inOl) { result.push('</ol>'); inOl = false; }
      continue;
    }

    // Already processed blocks (headings, blockquote, pre, hr, math)
    if (trimmed.startsWith('<h') || trimmed.startsWith('<blockquote') ||
        trimmed.startsWith('<pre') || trimmed.startsWith('<hr') ||
        trimmed.startsWith('<span class="math-display"') ||
        trimmed.startsWith('<span class="math-inline"')) {
      if (inUl) { result.push('</ul>'); inUl = false; }
      if (inOl) { result.push('</ol>'); inOl = false; }
      result.push(line);
      continue;
    }

    // Unordered list
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (inOl) { result.push('</ol>'); inOl = false; }
      if (!inUl) { result.push('<ul>'); inUl = true; }
      result.push(`<li>${trimmed.substring(2)}</li>`);
      continue;
    }

    // Ordered list
    const olMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      if (inUl) { result.push('</ul>'); inUl = false; }
      if (!inOl) { result.push('<ol>'); inOl = true; }
      result.push(`<li>${olMatch[1]}</li>`);
      continue;
    }

    // Regular paragraph
    if (inUl) { result.push('</ul>'); inUl = false; }
    if (inOl) { result.push('</ol>'); inOl = false; }
    result.push(`<p>${line}</p>`);
  }

  if (inUl) result.push('</ul>');
  if (inOl) result.push('</ol>');

  return result.join('\n');
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
