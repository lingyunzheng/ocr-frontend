import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://offline-ocr.vercel.app',
      lastModified: new Date('2026-01-13'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://offline-ocr.vercel.app/ocr',
      lastModified: new Date('2026-01-13'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://offline-ocr.vercel.app/privacy',
      lastModified: new Date('2026-01-13'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://offline-ocr.vercel.app/terms',
      lastModified: new Date('2026-01-13'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
