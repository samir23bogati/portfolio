import { Helmet } from "react-helmet-async";

export const SITE_NAME = "Samir Bogati";
export const SITE_URL = (
  process.env.REACT_APP_SITE_URL || "https://samirbogati.com.np"
).replace(/\/$/, "");

export function Seo({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  jsonLd,
  noindex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Portfolio & Blogs`;
  const desc =
    description ||
    "Portfolio, engineering notes, travel stories, and tech insights by Samir Bogati.";
  const canonical = url || `${SITE_URL}/#/`;
  const ogImage = image || `${SITE_URL}/logo192.png`;
  const kw = Array.isArray(keywords) ? keywords.filter(Boolean).join(", ") : keywords;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {kw ? <meta name="keywords" content={kw} /> : null}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd
        ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((block, i) => (
            <script key={i} type="application/ld+json">
              {JSON.stringify(block)}
            </script>
          ))
        : null}
    </Helmet>
  );
}

export function buildArticleJsonLd(blog) {
  const path = blog.slug ? `/#/blogs/${blog.slug}` : `/#/blogs/${blog._id}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt || (blog.sectionOne || "").slice(0, 160),
    image: blog.image ? [blog.image] : undefined,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    author: {
      "@type": "Person",
      name: blog.author || SITE_NAME,
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${path}`,
    },
    keywords: (blog.metaKeywords || []).join(", "),
  };
}

export function buildBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function toEmbedUrl(url = "") {
  if (!url) return "";
  if (url.startsWith("data:video")) return url;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      if (u.pathname.startsWith("/embed/")) return url;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    return url;
  }
  return url;
}

export function slugifyClient(text = "") {
  return text
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function runSeoChecks({
  focusKeyword = "",
  title = "",
  slug = "",
  content = "",
  metaDescription = "",
  imageAlt = "",
}) {
  const kw = focusKeyword.trim().toLowerCase();
  if (!kw) {
    return { score: "na", checks: [{ id: "kw", label: "Set a focus keyword", status: "yellow" }] };
  }

  const plain = String(content).toLowerCase();
  const firstPara = plain.slice(0, 300);

  const checks = [
    {
      id: "title",
      label: "Keyword in title",
      status: title.toLowerCase().includes(kw) ? "green" : "red",
    },
    {
      id: "slug",
      label: "Keyword in URL slug",
      status: slug.toLowerCase().includes(kw.replace(/\s+/g, "-")) ? "green" : "yellow",
    },
    {
      id: "intro",
      label: "Keyword in first paragraph",
      status: firstPara.includes(kw) ? "green" : "yellow",
    },
    {
      id: "meta",
      label: "Keyword in meta description",
      status: metaDescription.toLowerCase().includes(kw) ? "green" : "red",
    },
    {
      id: "alt",
      label: "Keyword in image alt text",
      status: imageAlt.toLowerCase().includes(kw) ? "green" : "yellow",
    },
  ];

  const greens = checks.filter((c) => c.status === "green").length;
  const score = greens >= 4 ? "green" : greens >= 2 ? "yellow" : "red";
  return { score, checks };
}
