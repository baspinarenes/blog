import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";
import { og } from "./plugins/og";
import { C } from "./src/configuration";

export default defineConfig({
  site: "https://www.enesbaspinar.com",

  i18n: {
    locales: Object.keys(C.LOCALES),
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      () =>
        (tree, { data }) => {
          const textOnPage = toString(tree);
          const readingTime = getReadingTime(textOnPage, {
            wordsPerMinute: 120,
          });
          data.astro!.frontmatter!.minutesRead = Math.ceil(readingTime.minutes);
        },
    ],
  },

  integrations: [
    og(),
    expressiveCode(),
    icon(),
    AutoImport({
      imports: [
        {
          "@components/markdown": ["Note"],
          "@ui-kit": ["Table"],
        },
      ],
    }),
    mdx(),
    svelte(),
    react(),
  ],

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
