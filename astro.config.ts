import { C } from "./src/configuration";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import AutoImport from "astro-auto-import";
import expressiveCode, { createInlineSvgUrl } from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { pluginCodeOutput } from "./expressive-plugins/expressive-code-output";
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

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
    expressiveCode({
      themes: ["github-light"],
      frames: {
        extractFileNameFromCode: true,
        showCopyToClipboardButton: true,
      },
      styleOverrides: {
        codePaddingBlock: "1rem",
        frames: {
          copyIcon: createInlineSvgUrl(
            '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>'
          ),
          frameBoxShadowCssValue: "none",
        },
      },
      tabWidth: 2,
      plugins: [pluginLineNumbers(), pluginCodeOutput()],
      defaultProps: {
        showLineNumbers: false,
        frame: "terminal",
        overridesByLang: {
          "sh,bash": {
            showLineNumbers: false,
          },
        },
      },
    }),
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
