// app/components/SocialIcon.js
import React from 'react';
import {
  Globe,
  Mail,
  Share2,
  ExternalLink,
  Code2,
  Gamepad2,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';

export function getPlatformFromUrl(url = '', label = '') {
  const combined = (url + ' ' + label).toLowerCase();
  
  if (combined.includes('instagram.com') || combined.includes('instagram') || combined.includes('insta')) return 'instagram';
  if (combined.includes('youtube.com') || combined.includes('youtu.be') || combined.includes('youtube') || combined.includes('yt')) return 'youtube';
  if (combined.includes('github.com') || combined.includes('github')) return 'github';
  if (combined.includes('twitter.com') || combined.includes('x.com') || combined.includes('twitter')) return 'twitter';
  if (combined.includes('linkedin.com') || combined.includes('linkedin')) return 'linkedin';
  if (combined.includes('spotify.com') || combined.includes('music.apple') || combined.includes('spotify') || combined.includes('soundcloud') || combined.includes('audio')) return 'spotify';
  if (combined.includes('tiktok.com') || combined.includes('tiktok')) return 'tiktok';
  if (combined.includes('discord.com') || combined.includes('discord.gg') || combined.includes('discord')) return 'discord';
  if (combined.includes('twitch.tv') || combined.includes('twitch')) return 'twitch';
  if (combined.includes('facebook.com') || combined.includes('facebook') || combined.includes('fb')) return 'facebook';
  if (combined.includes('mailto:') || combined.includes('email') || combined.includes('mail')) return 'mail';
  if (combined.includes('portfolio') || combined.includes('dev') || combined.includes('code')) return 'code';
  if (combined.includes('game') || combined.includes('steam') || combined.includes('play')) return 'game';
  
  return 'globe';
}

export default function SocialIcon({ platform, className = "w-4 h-4", size = 18 }) {
  const p = (platform || '').toLowerCase();

  switch (p) {
    case 'instagram':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      );
    case 'youtube':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"></polygon>
        </svg>
      );
    case 'github':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      );
    case 'twitter':
    case 'x':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      );
    case 'spotify':
    case 'music':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14.5c2.5-1 5.5-1 8 0"></path>
          <path d="M7 11.5c3-1.5 7-1.5 10 0"></path>
          <path d="M6 8.5c3.5-1.5 8.5-1.5 12 0"></path>
        </svg>
      );
    case 'tiktok':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
        </svg>
      );
    case 'twitch':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
        </svg>
      );
    case 'discord':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M18 6h0a14.5 14.5 0 0 0-4-1.5 9.5 9.5 0 0 0-.5 1.5 12.5 12.5 0 0 0-3 0 9.5 9.5 0 0 0-.5-1.5A14.5 14.5 0 0 0 6 6C3 10.5 2 15 2 19.5a14.5 14.5 0 0 0 4.5 2.5 11 11 0 0 0 1-2 9 9 0 0 1-2.5-1.2c.2-.2.4-.3.6-.5a10 10 0 0 0 12.8 0c.2.2.4.3.6.5a9 9 0 0 1-2.5 1.2 11 11 0 0 0 1 2 14.5 14.5 0 0 0 4.5-2.5c0-4.5-1-9-4-13.5z"></path>
          <circle cx="9" cy="13" r="1"></circle>
          <circle cx="15" cy="13" r="1"></circle>
        </svg>
      );
    case 'facebook':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      );
    case 'mail':
    case 'email':
      return <Mail className={className} size={size} />;
    case 'code':
      return <Code2 className={className} size={size} />;
    case 'game':
      return <Gamepad2 className={className} size={size} />;
    default:
      return <Globe className={className} size={size} />;
  }
}
