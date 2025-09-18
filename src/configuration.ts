export const C = {
  AUTHOR: {
    NAME: "Enes Başpınar",
    AGE: new Date().getFullYear() - 1999,
    JOB: "Software Engineer",
    COMPANY: "Trendyol",
    SOCIAL_MEDIA: {
      twitter: "https://x.com/ensbaspinar",
      linkedin: "https://www.linkedin.com/in/enesbaspinar",
      github: "https://github.com/baspinarenes",
      youtube: "https://www.youtube.com/ensbaspinar",
    },
  },
  LOCALES: {
    en: {
      label: "English",
      lang: "en-US",
    },
    tr: {
      label: "Türkçe",
      lang: "tr-TR",
    },
  },
  DEFAULT_LOCALE: "en" as const,
  ENTRY_CATEGORIES: [
    "articles",
    "snippets",
    "writings",
    "cultures",
    "thoughts",
  ],
  NAVIGATIONS: [
    {
      name: "home",
      href: "/",
      locales: ["en", "tr"],
    },
    {
      name: "journey",
      href: "/journey",
      locales: ["en", "tr"],
    },
    {
      name: "toolkit",
      href: "/toolkit",
      locales: ["en", "tr"],
    },
    {
      name: "articles",
      href: "/articles",
      locales: ["en", "tr"],
    },
    {
      name: "snippets",
      href: "/snippets",
      locales: ["en", "tr"],
    },
    {
      name: "writings",
      href: "/writings",
      locales: ["tr"],
    },
    {
      name: "cultures",
      href: "/cultures",
      locales: ["tr"],
    },
    {
      name: "thoughts",
      href: "/thoughts",
      locales: ["tr"],
    },
  ] as Array<{ name: string; locales: string[]; href: string }>,
  PACKAGES: [
    {
      name: "Money",
      href: "/packages/money",
    },
  ],
  CATEGORIES_LABELS: {
    home: {
      tr: "Anasayfa",
      en: "Home",
    },
    journey: {
      tr: "Yolculuğum",
      en: "Journey",
    },
    toolkit: {
      tr: "Araçlarım",
      en: "My Toolkit",
    },
    articles: {
      tr: "Makalelerim",
      en: "Articles",
    },
    snippets: {
      tr: "Kod Parçalarım",
      en: "Snippets",
    },
    writings: {
      tr: "Yazılarım",
      en: "Writings",
    },
    cultures: {
      tr: "Kültür & Sanat",
      en: "Culture & Art",
    },
    thoughts: {
      tr: "Düşüncelerim",
      en: "Thoughts",
    },
  },
  MESSAGES: {
    en: {
      language: "English",
      title: "Enes Başpınar",
      description: "A starter template for Astro with i18n support.",
      "navigation.home": "Home",
      "navigation.journey": "Journey",
      "navigation.toolkit": "Toolkit",
      "navigation.articles": "Articles",
      "navigation.snippets": "Snippets",
    },
    tr: {
      language: "Türkçe",
      title: "Enes Başpınar",
      description: "A starter template for Astro with i18n support.",
      "navigation.home": "Anasayfa",
      "navigation.journey": "Yolculuğum",
      "navigation.toolkit": "Araç Çantam",
      "navigation.articles": "Makaleler",
      "navigation.snippets": "Kod Parçaları",
    },
  } satisfies { [key: string]: { [key: string]: string } },
};
