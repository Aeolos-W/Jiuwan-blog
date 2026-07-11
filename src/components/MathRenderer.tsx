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

  // --- Phase 1: Extract and protect special content ---
  const protectedBlocks: { placeholder: string; html: string }[] = [];
  let blockIndex = 0;

  function protect(html: string): string {
    const placeholder = `__PROTECTED_${blockIndex++}__`;
    protectedBlocks.push({ placeholder, html });
    return placeholder;
  }

  // Extract display math with optional number: $$...$$ (n)
  processed = processed.replace(/\$\$([\s\S]*?)\$\$(?:\s*\((\d+)\))?/g, (match, tex, num) => {
    const tag = num
      ? `<span class="math-display-num" data-tex="${escapeAttr(tex)}"></span><span class="math-number">(${num})</span>`
      : `<span class="math-display" data-tex="${escapeAttr(tex)}"></span>`;
    return protect(tag);
  });

  // Extract inline math \( ... \)
  processed = processed.replace(/\\\(([\s\S]*?)\\\)/g, (match, tex) => {
    return protect(`<span class="math-inline" data-tex="${escapeAttr(tex)}"></span>`);
  });

  // Extract inline math $...$ (but not $$)
  processed = processed.replace(/(?<!\$)\$(?!\$)([\s\S]*?)(?<!\$)\$(?!\$)/g, (match, tex) => {
    return protect(`<span class="math-inline" data-tex="${escapeAttr(tex)}"></span>`);
  });

  // Extract code blocks
  processed = processed.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return protect(`<pre><code class="language-${lang || 'text'}">${escapeHtml(code)}</code></pre>`);
  });

  // --- Phase 2: Escape HTML ---
  processed = processed
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // --- Phase 3: Process blockquotes with special types ---
  // Handle multi-line blockquotes grouped by > prefix
  const lines = processed.split('\n');
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Check if line starts with > (after HTML escaping it's &gt;)
    const bqMatch = line.match(/^&gt;\s?(.*)$/);
    if (bqMatch) {
      const inner = bqMatch[1];
      // Check for special blockquote types: Theorem, Question, Proof, Remark, etc.
      const specialMatch = inner.match(/^(Theorem|Question|Proof|Remark|Lemma|Proposition|Corollary|Definition|Example|Exercise)\s*(\d*)\s*(?:\(([^)]+)\))?\s*:\s*(.*)$/);
      if (specialMatch) {
        const type = specialMatch[1].toLowerCase();
        const num = specialMatch[2];
        const label = specialMatch[3];
        const text = specialMatch[4];
        const titleHtml = `<span class="bq-title">${specialMatch[1]}${num ? ` ${num}` : ''}${label ? ` (${label})` : ''}</span>`;
        // Collect continuation lines
        const bodyLines: string[] = [text];
        while (i + 1 < lines.length && lines[i + 1].match(/^&gt;\s?(.*)$/)) {
          i++;
          const contMatch = lines[i].match(/^&gt;\s?(.*)$/);
          if (contMatch) bodyLines.push(contMatch[1]);
        }
        const body = bodyLines.join('\n');
        result.push(protect(`<div class="bq-box bq-${type}">${titleHtml}<div class="bq-body">${body}</div></div>`));
      } else {
        // Regular blockquote
        const bodyLines: string[] = [inner];
        while (i + 1 < lines.length && lines[i + 1].match(/^&gt;\s?(.*)$/)) {
          i++;
          const contMatch = lines[i].match(/^&gt;\s?(.*)$/);
          if (contMatch) bodyLines.push(contMatch[1]);
        }
        const body = bodyLines.join('\n');
        result.push(protect(`<blockquote>${body}</blockquote>`));
      }
      continue;
    }
    result.push(line);
  }

  processed = result.join('\n');

  // --- Phase 4: Process remaining markdown ---

  // Footnotes [^1] and [^1]: definition
  const footnotes: { id: string; text: string }[] = [];
  processed = processed.replace(/^\[(\^\d+)\]:\s*(.+)$/gm, (match, id, text) => {
    footnotes.push({ id, text });
    return protect(`<div class="footnote" id="fn-${id}"><sup>${id}</sup> ${text} <a href="#fnref-${id}">↩</a></div>`);
  });
  processed = processed.replace(/\[(\^\d+)\]/g, (match, id) => {
    return protect(`<sup class="fn-ref"><a href="#fn-${id}" id="fnref-${id}">${id}</a></sup>`);
  });

  // Headings
  processed = processed.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  processed = processed.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  processed = processed.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  processed = processed.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

  // Images
  processed = processed.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;height:auto;">');

  // Links
  processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Bold
  processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Italic
  processed = processed.replace(/(?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)/g, '<em>$1</em>');

  // Inline code
  processed = processed.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Horizontal rule
  processed = processed.replace(/^---+$/gm, '<hr>');

  // --- Phase 5: Paragraphs and lists ---
  const finalLines = processed.split('\n');
  const output: string[] = [];
  let inUl = false;
  let inOl = false;

  for (let i = 0; i < finalLines.length; i++) {
    const line = finalLines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      if (inUl) { output.push('</ul>'); inUl = false; }
      if (inOl) { output.push('</ol>'); inOl = false; }
      continue;
    }

    if (trimmed.startsWith('<h') || trimmed.startsWith('<blockquote') ||
        trimmed.startsWith('<pre') || trimmed.startsWith('<hr') ||
        trimmed.startsWith('<div class="bq-box') || trimmed.startsWith('<div class="footnote') ||
        trimmed.startsWith('<span class="math') ||
        trimmed.startsWith('__PROTECTED_')) {
      if (inUl) { output.push('</ul>'); inUl = false; }
      if (inOl) { output.push('</ol>'); inOl = false; }
      output.push(line);
      continue;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (inOl) { output.push('</ol>'); inOl = false; }
      if (!inUl) { output.push('<ul>'); inUl = true; }
      output.push(`<li>${trimmed.substring(2)}</li>`);
      continue;
    }

    const olMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      if (inUl) { output.push('</ul>'); inUl = false; }
      if (!inOl) { output.push('<ol>'); inOl = true; }
      output.push(`<li>${olMatch[1]}</li>`);
      continue;
    }

    if (inUl) { output.push('</ul>'); inUl = false; }
    if (inOl) { output.push('</ol>'); inOl = false; }
    output.push(`<p>${line}</p>`);
  }

  if (inUl) output.push('</ul>');
  if (inOl) output.push('</ol>');

  processed = output.join('\n');

  // --- Phase 6: Restore protected blocks ---
  protectedBlocks.forEach(({ placeholder, html }) => {
    processed = processed.replace(placeholder, html);
  });

  // Footnotes section
  if (footnotes.length > 0) {
    processed += `<hr><div class="footnotes"><h4>Footnotes</h4>` +
      footnotes.map(f => `<div class="footnote" id="fn-${f.id}"><sup>${f.id}</sup> ${f.text} <a href="#fnref-${f.id}">↩</a></div>`).join('') +
      `</div>`;
  }

  return processed;
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
