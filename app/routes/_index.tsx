import type { V2_MetaFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import groq from 'groq';
import { sanityAPI } from '~/utils/sanity-js-api/sanityAPI';

export async function loader() {
  const payload = await sanityAPI({ preview: false }).fetch(
    groq`*[_type in ["Page"] && slug.current == 'home'][0]{
      title
    }`,
  );

  if (!payload) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new Response('Not Found', {
      status: 404,
    });
  }

  return json({
    page: payload || null,
  });
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const { page } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>{page?.title}</h1>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
