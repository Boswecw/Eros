interface BookSchemaProps {
  title: string;
  author?: string;
  isbn?: string;
  description: string;
  image: string;
  datePublished?: string;
  genre?: string[];
  inLanguage?: string;
  numberOfPages?: number;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
  }[];
}

export function BookSchema(props: BookSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": props.title,
    "author": {
      "@type": "Person",
      "name": props.author || "Ἔρως"
    },
    "description": props.description,
    "image": props.image,
    "datePublished": props.datePublished,
    "genre": props.genre,
    "inLanguage": props.inLanguage || "en",
    "numberOfPages": props.numberOfPages,
    ...(props.isbn && { "isbn": props.isbn }),
    ...(props.aggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": props.aggregateRating.ratingValue,
        "reviewCount": props.aggregateRating.reviewCount
      }
    }),
    ...(props.offers && {
      "offers": props.offers.map(offer => ({
        "@type": "Offer",
        "price": offer.price,
        "priceCurrency": offer.priceCurrency,
        "availability": `https://schema.org/${offer.availability}`,
        "url": offer.url
      }))
    })
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
}

interface AuthorSchemaProps {
  name: string;
  url: string;
  image?: string;
  sameAs?: string[];
  description?: string;
}

export function AuthorSchema(props: AuthorSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": props.name,
    "url": props.url,
    "image": props.image,
    "sameAs": props.sameAs || [],
    "description": props.description,
    "jobTitle": "Author",
    "genre": "Romance Fiction"
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ἔρως Author",
    "url": "https://epwcauthor.com",
    "description": "Official website for author Ἔρως - bold adult-fantasy stories",
    "author": {
      "@type": "Person",
      "name": "Ἔρως"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://epwcauthor.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
}