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
  ENTRY_CATEGORIES: [
    "writings",
    "poems",
    "cultures",
  ],
  NAVIGATIONS: [
    { name: "home", href: "/" },
    { name: "journey", href: "/journey" },
    { name: "writings", href: "/writings" },
    { name: "poems", href: "/poems" },
    { name: "cultures", href: "/cultures" },
  ] as Array<{ name: string; href: string }>,
  CATEGORIES_LABELS: {
    home: "Anasayfa",
    journey: "Yolculuğum",
    writings: "Yazılarım",
    cultures: "Kültür & Sanat",
    poems: "Şiirlerim",
  },
};
