import groq from 'groq';

import type { SanityPageByIdQueryProps } from '~/types/SanityPageByIdQueryProps';

// Fetch all page slugs
export const PAGE_SLUGS_QUERY = groq`
  *[_type == "Page"  && defined(slug.current)].slug.current
`;

// Fetch page id and components types by slug
export const PAGE_COMPONENT_TYPES_BY_SLUG_QUERY = groq`
  *[_type in ["Page"]  && slug.current == $slug][0]{
    "id": _id,
    "componentTypes": array::unique(rawSections[]._type),
  }
`;

// Fetch components types by id
export const PAGE_COMPONENT_TYPES_BY_ID_QUERY = groq`
  *[_type in ["Page"] && _id == $id][0]{
    "componentTypes": array::unique(rawSections[]._type),
  }
`;

// Fetch page data by id
export const PAGE_BY_ID_QUERY = ({
  id,
  componentTypes = [],
}: SanityPageByIdQueryProps) => {
  return groq`{
    "page": *[_id == "${id}"][0]{
      _id,
      title,
      slug,
      metadataDescription,
      metadataImage,
    },
  }`;
};
