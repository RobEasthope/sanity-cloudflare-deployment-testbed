/* eslint-disable camelcase */
import type { LoaderArgs } from '@remix-run/cloudflare';

import { useLoaderData } from '@remix-run/react';
import type { V2_HtmlMetaDescriptor, V2_MetaFunction } from '@vercel/remix';
import { json } from '@remix-run/cloudflare';
import { cacheHeader } from 'pretty-cache-header';
import type { Error404Props } from '~/components/generic/Error404/Error404';
import type { PageProps } from '~/components/generic/Page/Page';
import { Page } from '~/components/generic/Page/Page';
import {
  PAGE_BY_ID_QUERY,
  PAGE_COMPONENT_TYPES_BY_SLUG_QUERY,
} from '~/components/generic/Page/Page.query';

import type { SanityPageByIdQueryProps } from '~/types/SanityPageByIdQueryProps';

import { checkMetadata } from '~/utils/checkMetadata';
import { mergeMeta } from '~/utils/mergeMeta';
import type { SanityApiProps } from '~/utils/sanity-js-api/sanityAPI';
import { sanityAPI } from '~/utils/sanity-js-api/sanityAPI';

import type { AppSettingsProps } from '~/components/settings/AppSettings/AppSettings';
import { APP_SETTINGS_QUERY } from '~/components/settings/AppSettings/AppSettings.query';
import { Box } from '~/components/_base/Box/Box';
import { Type } from '~/components/_base/Type/Type';

type PageBySlugProps = PageProps & {
  error404: Error404Props['page'];
};

export async function loader({
  context,
}: LoaderArgs & {
  context: { env: SanityApiProps };
}) {
  const sanityEnvVars = {
    SANITY_PUBLIC_PROJECT_ID: context.env.SANITY_PUBLIC_PROJECT_ID,
    SANITY_PUBLIC_DATASET: context.env.SANITY_PUBLIC_DATASET,
    SANITY_PUBLIC_API_VERSION: context.env.SANITY_PUBLIC_API_VERSION,
    SANITY_USE_CDN: context.env.SANITY_USE_CDN,
    SANITY_PERSPECTIVE: context.env.SANITY_PERSPECTIVE,
    SANITY_API_TOKEN: context.env.SANITY_API_TOKEN,
  };

  const appSettings: AppSettingsProps = await sanityAPI(sanityEnvVars).fetch(
    APP_SETTINGS_QUERY,
  );

  const primer: SanityPageByIdQueryProps = await sanityAPI(sanityEnvVars).fetch(
    PAGE_COMPONENT_TYPES_BY_SLUG_QUERY,
    {
      slug: appSettings?.homePageSlug,
    },
  );

  const payload: PageBySlugProps = await sanityAPI(sanityEnvVars).fetch(
    PAGE_BY_ID_QUERY({
      id: primer?.id,
      componentTypes: primer?.componentTypes,
    }),
  );

  if (!payload?.page) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new Response('Not Found', {
      status: 404,
    });
  }

  return json({
    page: payload?.page || null,
    error404: payload?.error404 || null,
  });
}

// export const meta: V2_MetaFunction = ({
//   matches,
//   data,
// }: {
//   matches: string[];
//   data: PageProps;
// }): V2_HtmlMetaDescriptor[] =>
//   mergeMeta(
//     matches,
//     checkMetadata({
//       title: data?.page?.title,
//       description: data?.page?.metadataDescription,
//       image: data?.page?.metadataImage,
//     }),
//   );

// export function headers() {
//   return {
//     'Cache-Control': cacheHeader({
//       maxAge: '30days',
//       staleWhileRevalidate: '1day',
//       staleIfError: '7days',
//     }),
//   };
// }

export default function Index() {
  const { page } = useLoaderData<typeof loader>();

  return (
    <Box as="article" className="page">
      <Type as="h1">Foo</Type>
      <hr />
      <Type as="h2">{page?.title}</Type>
    </Box>
  );
}
