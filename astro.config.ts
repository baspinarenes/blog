import { C } from "./src/configuration";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import AutoImport from "astro-auto-import";
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import expressiveCode from 'astro-expressive-code'

import vercel from "@astrojs/vercel";

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
    expressiveCode(),
    icon(),
    svelte(),
    AutoImport({
      imports: [
        {
          "@components/markdown": ["Note"],
          "@ui-kit": ["Table"],
        },
      ],
    }),
    mdx(),
  ],

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
