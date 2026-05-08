import { useEffect } from 'react';

const EMBED_SCRIPT_SRC = 'https://www.instagram.com/embed.js';

function loadInstagramEmbedScript() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }
    if (window.instgrm?.Embeds) {
      resolve();
      return;
    }
    const existing = document.querySelector(`script[src="${EMBED_SCRIPT_SRC}"]`);
    if (existing) {
      if (window.instgrm?.Embeds) {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve(), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = EMBED_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

export default function InstagramEmbed({ permalink }) {
  useEffect(() => {
    if (!permalink?.trim()) return undefined;

    let cancelled = false;

    loadInstagramEmbedScript().then(() => {
      if (cancelled) return;
      window.instgrm?.Embeds?.process();
    });

    return () => {
      cancelled = true;
    };
  }, [permalink]);

  if (!permalink?.trim()) return null;

  return (
    <div className="relative min-h-[380px] w-full overflow-hidden rounded-2xl bg-black/50 ring-1 ring-white/10">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={permalink.trim()}
        data-instgrm-version="14"
        style={{
          margin: 0,
          width: '100%',
          maxWidth: '540px',
          minWidth: 'unset'
        }}
      >
        <a
          href={permalink.trim()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[200px] items-center justify-center px-6 py-10 text-center text-sm text-gray-400 transition-colors hover:text-purple-300"
        >
          Ver esta publicación en Instagram
        </a>
      </blockquote>
    </div>
  );
}
