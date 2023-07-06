import { createClient } from '@sanity/client';

export type SanityApiProps = {
  SANITY_PUBLIC_PROJECT_ID: string;
  SANITY_PUBLIC_DATASET: string;
  SANITY_PUBLIC_API_VERSION: string;
  SANITY_PERSPECTIVE: string;
  USE_SANITY_CDN: boolean;
  SANITY_API_TOKEN: string;
};

export const sanityAPI = (env: SanityApiProps) =>
  createClient({
    projectId: sanityApiConfig.SANITY_PUBLIC_PROJECT_ID,
    dataset: sanityApiConfig.SANITY_PUBLIC_DATASET,
    apiVersion: sanityApiConfig.SANITY_PUBLIC_API_VERSION,
    useCdn: true,
    perspective: sanityApiConfig.SANITY_PERSPECTIVE,
    token: sanityApiConfig.SANITY_API_TOKEN,
  });
