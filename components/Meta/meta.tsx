import Head from 'next/head';

export interface OpenGraph {
  title?: string;
  description?: string;
  image?: URL | string;
  imageType?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  url?: URL | string;
  type?:
    | `music.song`
    | `music.album`
    | `music.playlist`
    | `music.radio_station`
    | `video.movie`
    | `video.episode`
    | `video.tv_show`
    | `video.other`
    | `article`
    | `book`
    | `profile`
    | `website`;
}

interface InternalProps {
  title: string;
  ogInheritTitle?: boolean;
  description?: string;
  ogInheritDescription?: boolean;
  og?: OpenGraph;
}

export type MetaProps = InternalProps;

export const openGraphDefaults: OpenGraph = {
  type: `website`,
  image: `https://cryptools.dev/preview.png`,
  imageType: `image/png`,
  imageWidth: 1200,
  imageHeight: 627,
  imageAlt: `Cryptools social media image`,
} as const;

export default function Meta({
  title,
  ogInheritTitle = true,
  description,
  ogInheritDescription = true,
  og,
}: MetaProps) {
  og = {
    ...openGraphDefaults,
    ...og,
  };

  return (
    <Head>
      <title>{title}</title>
      {description && <meta property="description" content={description} />}
      {(og?.title || ogInheritTitle) && (
        <meta property="og:title" content={og?.title ?? title} />
      )}
      {(og?.description || (description && ogInheritDescription)) && (
        <meta
          property="og:description"
          content={og?.description ?? description}
        />
      )}
      {og?.image && <meta property="og:image" content={og.image.toString()} />}
      {og?.imageAlt && <meta property="og:image:alt" content={og.imageAlt} />}
      {og?.imageType && (
        <meta property="og:image:type" content={og.imageType} />
      )}
      {og?.imageWidth && (
        <meta property="og:image:width" content={og.imageWidth.toString()} />
      )}
      {og?.imageHeight && (
        <meta property="og:image:height" content={og.imageHeight.toString()} />
      )}
      {og?.url && <meta property="og:url" content={og.url.toString()} />}
      {og?.type && <meta property="og:type" content={og.type} />}
    </Head>
  );
}
