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
    
    // Dynamically import KaTeX on client side
    const renderMath = async () => {
      try {
        const katex = await import('katex');
        if (containerRef.current) {
          // Find all math elements and render them
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

  // Process content to identify math expressions
  const processedContent = processMathContent(content);

  if (inline) {
    return (
      <span
        ref={containerRef as any}
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}

function processMathContent(content: string): string {
  if (!content) return '';
  
  let processed = content;
  
  // Escape HTML entities first
  processed = processed
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  // Process display math $$...$$
  processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (match, tex) => {
    return `<span class="math-display" data-tex="${escapeAttr(tex)}"></span>`;
  });
  
  // Process inline math \( ... \)
  processed = processed.replace(/\\\(([\s\S]*?)\\\)/g, (match, tex) => {
    return `<span class="math-inline" data-tex="${escapeAttr(tex)}"></span>`;
  });
  
  // Process inline math $...$ (but not $$)
  processed = processed.replace(/(?<!\$)\$(?!\$)([\s\S]*?)(?<!\$)\$(?!\$)/g, (match, tex) => {
    return `<span class="math-inline" data-tex="${escapeAttr(tex)}"></span>`;
  });
  
  // Convert newlines to <br> or <p> tags for non-math content
  const paragraphs = processed.split('\n\n');
  processed = paragraphs
    .map((p) => {
      if (p.trim().startsWith('<span class="math-display"')) {
        return p;
      }
      if (p.trim().startsWith('- ') || p.trim().startsWith('* ') || p.trim().match(/^\d+\./)) {
        return p;
      }
      return `<p>${p.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('\n');
  
  // Process markdown bold
  processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Process markdown lists
  processed = processed.replace(/((?:^<p>-\s+.+<\/p>\n?)+)/gm, (match) => {
    const items = match.match(/<p>-\s+(.+?)<\/p>/g);
    if (items) {
      return '<ul>' + items.map((item) => `<li>${item.replace(/<p>-\s+(.+?)<\/p>/, '$1')}</li>`).join('') + '</ul>';
    }
    return match;
  });
  
  return processed;
}

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
