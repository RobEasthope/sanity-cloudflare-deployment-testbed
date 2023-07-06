import type { ClientPerspective } from '@sanity/client';
import { createClient } from '@sanity/client';

export type SanityApiProps = {
  SANITY_PUBLIC_PROJECT_ID: string;
  SANITY_PUBLIC_DATASET: string;
  SANITY_PUBLIC_API_VERSION: string;
  SANITY_PERSPECTIVE: ClientPerspective;
  SANITY_USE_CDN: boolean;
  SANITY_API_TOKEN: string;
};

export const sanityAPI = (env: SanityApiProps) =>
  createClient({
    projectId: env.SANITY_PUBLIC_PROJECT_ID,
    dataset: env.SANITY_PUBLIC_DATASET,
    apiVersion: env.SANITY_PUBLIC_API_VERSION,
    perspective: env.SANITY_PERSPECTIVE,
    useCdn: env.SANITY_USE_CDN,
    token: env.SANITY_API_TOKEN,
  });
