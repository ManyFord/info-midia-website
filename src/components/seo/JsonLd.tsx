import { company, seo } from "@/config/company";
import { faqs } from "@/config/faq";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: company.name,
        description: seo.description,
        telephone: "+55-45-99922-2216",
        address: {
          "@type": "PostalAddress",
          addressLocality: company.city,
          addressRegion: company.state,
          addressCountry: "BR",
        },
        areaServed: "BR",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
