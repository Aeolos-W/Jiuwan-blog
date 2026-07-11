'use client';

interface IdenticonAvatarProps {
  seed: string;
  size?: number;
  className?: string;
}

export default function IdenticonAvatar({ seed, size = 32, className = '' }: IdenticonAvatarProps) {
  // Use DiceBear identicon which closely resembles GitHub's identicon style
  const url = `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(seed)}&size=${size}`;

  return (
    <img
      src={url}
      alt={seed}
      width={size}
      height={size}
      className={`inline-block flex-shrink-0 ${className}`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
