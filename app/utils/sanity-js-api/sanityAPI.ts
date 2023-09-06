import { createClient } from '@sanity/client';
import type { SanityClient } from '@sanity/client';

export function sanityAPI({ preview }: { preview?: boolean }): SanityClient {
  // Published mode
  if (!preview) {
    return createClient({
      projectId: 'ogtnx80u' || '',
      dataset: 'green' || '',
      apiVersion: '2021-10-21' || '',
      useCdn: true,
      perspective: 'published',
    });
  }

  // Preview mode
  return createClient({
    projectId: 'ogtnx80u' || '',
    dataset: 'green' || '',
    apiVersion: '2021-10-21' || '',
    token: process.env.SANITY_API_TOKEN || '',
    useCdn: false,
    ignoreBrowserTokenWarning: true,
    perspective: 'previewDrafts',
  });
}
