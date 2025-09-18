import { Resvg } from "@resvg/resvg-js";
import type { AstroIntegration } from "astro";
import parseFrontmatter from "gray-matter";
import fs from "node:fs";
import satori from "satori";
import { C } from "../src/configuration";
import { capitalize } from "../src/utils/string";

export const og = (): AstroIntegration => ({
  name: "satori-og",
  hooks: {
    "astro:build:done": async ({ dir, pages }) => {
      try {
        const jetBrainsMono = fs.readFileSync(
          "public/fonts/JetBrainsMono-Regular.ttf"
        );

        const jetBrainsMonoExtraBold = fs.readFileSync(
          "public/fonts/JetBrainsMono-ExtraBold.ttf"
        );

        for (const { pathname } of pages) {
          const parts = pathname.split("/").filter(Boolean);
          // ["en", "articles", "what-is-function-overloading"]
          // ["en", "articles"]
          // ["en", "journey"]
          let type = "";

          console.log(pathname);

          if (
            [0, 1].includes(parts.length) &&
            !["404/", "500/"].includes(pathname)
          )
            type = "homepage";
          if ([2].includes(parts.length)) type = "category";
          if ([3].includes(parts.length)) type = "entry";

          console.log("typetype", type);

          const [locale, category, ...entryPath] = pathname
            .split("/")
            .filter(Boolean);

          let title = "";
          let description = "";
          let subtitle = "";

          switch (type) {
            case "category":
              subtitle = `Blog`;
              title = capitalize(category);
              description = "";
              break;
            case "entry":
              const file = fs.readFileSync(
                `src/content/blog/${category}/${entryPath.join(
                  "/"
                )}/${locale}.mdx`
              );

              const { title: t, description: d } = parseFrontmatter(file)
                .data as {
                title: string;
                category: string;
                description: string;
              };

              title = t;
              description = d;
              subtitle = `Blog / ${capitalize(category)}`;
              break;
            default:
              subtitle = `Blog`;
              title = C.AUTHOR.NAME;
              description = `${C.AUTHOR.JOB} at ${C.AUTHOR.COMPANY}`;
              break;
          }

          const svg = await satori(
            <div
              id="background"
              style={{
                backgroundColor: "white",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                padding: "40px 64px",
                fontSize: "32px",
                lineHeight: "1.2",
                position: "relative",
                fontFamily: "JetBrains Mono",
              }}
            >
              <div
                id="category"
                style={{
                  display: "flex",
                  color: "#9ca3af",
                  maxWidth: "800px",
                  lineHeight: "1",
                }}
              >
                {subtitle}
              </div>

              <div
                id="title"
                style={{
                  fontSize: "82px",
                  fontWeight: 700,
                  display: "flex",
                  lineHeight: "1.2",
                  fontFamily: "JetBrains Mono Bold",
                }}
              >
                {title}
              </div>

              {description && (
                <div
                  id="description"
                  style={{
                    display: "flex",
                    color: "#9ca3af",
                    maxWidth: "800px",
                  }}
                >
                  {description}
                </div>
              )}

              <img
                src="https://www.enesbaspinar.com/favicon.svg"
                alt={title}
                width={400}
                height={400}
                style={{
                  position: "absolute",
                  bottom: -80,
                  right: -60,
                  transform: "rotate(-20deg)",
                }}
              />
            </div>,
            {
              width: 1200,
              height: 630,
              fonts: [
                {
                  name: "JetBrains Mono",
                  data: jetBrainsMono,
                  weight: 400,
                  style: "normal",
                },
                {
                  name: "JetBrains Mono Bold",
                  data: jetBrainsMonoExtraBold,
                  weight: 700,
                  style: "normal",
                },
              ],
            }
          );

          const resvg = new Resvg(svg, {
            fitTo: {
              mode: "width",
              value: 1200,
            },
          });

          try {
            fs.writeFileSync(
              `${dir.pathname}${pathname}og.png`,
              resvg.render().asPng()
            );
          } catch (error) {}
        }

        console.log(`\x1b[32mog:\x1b[0m Generated OpenGraph images\n`);
      } catch (e) {
        console.error(e);
        console.log(`\x1b[31mog:\x1b[0m OpenGraph image generation failed\n`);
      }
    },
  },
});
