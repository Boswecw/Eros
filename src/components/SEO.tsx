import { Meta, Title } from "@solidjs/meta";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  url?: string;
}

export function SEO(props: SEOProps) {
  const title = props.title ? `${props.title} - Ἔρως` : "Ἔρως Author";
  const description = props.description || "Official website for author Ἔρως - bold adult-fantasy stories";
  const image = props.image || "https://firebasestorage.googleapis.com/v0/b/endless-fire-467204-n2.firebasestorage.app/o/Eros%2FEros_Signature_GoldFoil.png?alt=media&token=e2ab0b7a-6a84-494f-b744-0e08b190df39";

  return (
    <>
      <Title>{title}</Title>
      <Meta name="description" content={description} />
      <Meta property="og:title" content={title} />
      <Meta property="og:description" content={description} />
      <Meta property="og:image" content={image} />
      <Meta property="og:type" content={props.type || "website"} />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={title} />
      <Meta name="twitter:description" content={description} />
      <Meta name="twitter:image" content={image} />
      <Meta name="twitter:site" content="@EPWCAuthor" />
    </>
  );
}
