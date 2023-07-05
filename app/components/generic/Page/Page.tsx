import type {
  SanityImageAsset,
  SanityImageCrop,
  SanityImageHotspot,
  SanityReference,
} from 'sanity-codegen';
import { Box } from '~/components/_base/Box/Box';
import { Type } from '~/components/_base/Type/Type';

// TYPES
export type PageProps = {
  page: {
    _id: string;
    _type: 'Page';
    title: string;
    slug: { _type: 'slug'; current: string };
    sections: any[];
    metadataDescription: string;
    metadataImage: {
      _type: 'image';
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    };
  };
};

// MARKUP
export const Page = ({ page }: PageProps) => (
  <Box as="article" className="page">
    <Type as="h1">{page?.title}</Type>
  </Box>
);
