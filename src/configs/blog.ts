export const title = "Enes Başpınar";
export const url = "https://www.enesbaspinar.com";
export const description =
  "A weird blog about software engineering, programming, and life.";
export const author = {
  name: "Enes",
  surname: "Başpınar",
  title: "Software Engineer",
  age: new Date().getFullYear() - 1999,
  experience: Math.floor(
    (new Date().getTime() - new Date(2021, 10, 4).getTime()) /
      (1000 * 60 * 60 * 24 * 365)
  ),
  email: "ensbaspinar@gmail.com",
  socials: {
    twitter: "ensbaspinar",
    github: "baspinarenes",
    linkedin: "enesbaspinar",
    youtube: "ensbaspinar",
  },
};
export const copyright = "Inspired by onur.dev";
export const navigations: Record<string, Record<string, string>> = {
  tr: {
    home: "/tr",
    journey: "/tr/journey",
    tools: "/tr/tools",
    article: "/tr/article",
    snippet: "/tr/snippet",
    writing: "/tr/writing",
    culture: "/tr/culture",
    thought: "/tr/thought",
  },
  en: {
    home: "/en",
    journey: "/en/journey",
    tools: "/en/tools",
    article: "/en/article",
    snippet: "/en/snippet",
  },
};
