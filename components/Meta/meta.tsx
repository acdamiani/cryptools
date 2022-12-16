import Head from 'next/head';
import { ComponentProps } from 'react';

export interface OpenGraph {
  title?: string;
  description?: string;
  image?: URL | string;
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

export default function Meta({
  title,
  ogInheritTitle = false,
  description,
  ogInheritDescription = false,
  og,
}: MetaProps) {
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
      {og?.url && <meta property="og:url" content={og.url.toString()} />}
      {og?.type && <meta property="og:type" content={og.type} />}
    </Head>
  );
}
