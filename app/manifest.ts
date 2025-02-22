import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BCON',
    short_name: 'BCON',
    description: 'Send money across the globe with bcon',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/logo.svg',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.svg',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}