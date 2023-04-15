import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import astroI18next from "astro-i18next";
import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [astroI18next(), mdx(), sitemap(), tailwind(), image()],
  experimental: {
    assets: true,
  },
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: false,
    remarkPlugins: [remarkReadingTime],
  },
});