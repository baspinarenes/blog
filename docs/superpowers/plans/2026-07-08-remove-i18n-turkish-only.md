# Tek Dilli (TR) Siteye Geçiş — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all English/i18n support; serve the blog Turkish-only at root URLs with 301 redirects from legacy `/tr` and `/en` prefixes.

**Architecture:** Astro 5 static site with Vercel adapter (API routes are on-demand). Pages move from `src/pages/[lang]/...` to `src/pages/...`; middleware 301-redirects legacy locale-prefixed URLs; all i18n utilities, the language switcher, and English content files are deleted; Turkish strings are inlined.

**Tech Stack:** Astro 5, Svelte (removed usage), Tailwind, Supabase (view counts), satori/resvg (OG images), dayjs.

**Spec:** `docs/superpowers/specs/2026-07-08-remove-i18n-turkish-only-design.md`

## Global Constraints

- Site language is Turkish only; `<html lang="tr">`.
- Target URLs: `/`, `/journey`, `/writings`, `/cultures`, `/thoughts`, `/<category>/<entry>`.
- Legacy `/tr/...` and `/en/...` → **301** to the un-prefixed path.
- No test framework exists in this repo; per-task verification is `yarn build` (once the tree is consistent) plus targeted grep. Tasks 1–8 leave the build transiently broken until Task 4+; that is expected — final verification is Task 9.
- View counts live in Supabase `entry_views` keyed by `(entry_id, locale)`. Keep the `locale` column, hardcode `"tr"` server-side so existing Turkish counts are preserved.
- Content entry files keep their `<slug>/tr.mdx` naming (colocated `media/`/`images/` folders stay); only `en.mdx` files are deleted.

---

### Task 0: Commit the user's in-progress working tree

The working tree already contains the user's own unfinished cleanup (deleted toolkit/packages pages, modified configuration, etc.). Commit it as-is so the i18n refactor has a clean baseline and is revertable independently.

- [ ] **Step 1: Inspect and commit everything currently pending**

```bash
git add -A
git commit -m "wip: in-progress cleanup before i18n removal"
```

Expected: commit created; `git status` clean.

---

### Task 1: Delete English content and flatten journey data

**Files:**
- Delete: every `src/content/blog/**/en.mdx`
- Modify: `src/content/journey/data.json` (flatten `{en,tr}` → tr string)
- Modify: `src/content.config.ts:24-31` (journey schema)

**Interfaces:**
- Produces: journey collection items where `item.title: string` and `item.description: string` (Turkish). Entry collections contain only `<slug>/tr.mdx`, so every `entry.id` is `"<slug>/tr"`.

- [ ] **Step 1: Delete English mdx files**

```bash
find src/content/blog -name "en.mdx" -delete
find src/content/blog -name "en.mdx" | wc -l
```

Expected: second command prints `0`.

- [ ] **Step 2: Flatten journey data.json to Turkish strings**

```bash
node -e "
const fs = require('fs');
const p = 'src/content/journey/data.json';
const data = JSON.parse(fs.readFileSync(p, 'utf8'));
for (const year of data) {
  for (const item of year.items) {
    item.title = item.title.tr;
    item.description = item.description.tr;
  }
}
fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
"
grep -c '\"en\"' src/content/journey/data.json || true
```

Expected: grep prints `0` (exit code 1 is fine).

- [ ] **Step 3: Update journey schema in `src/content.config.ts`**

Replace the `items` array object schema:

```ts
      items: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          image: image().optional(),
        })
      ),
```

- [ ] **Step 4: Commit**

```bash
git add -A src/content src/content.config.ts
git commit -m "refactor: remove english content, flatten journey data to turkish"
```

---

### Task 2: Strip i18n from configuration, types, and astro config

**Files:**
- Modify: `src/configuration.ts`
- Modify: `src/models/type.ts`
- Modify: `astro.config.ts` (remove `i18n` block)

**Interfaces:**
- Produces: `C.CATEGORIES_LABELS: Record<'home'|'journey'|'writings'|'cultures'|'thoughts', string>` (plain Turkish strings), `C.NAVIGATIONS: Array<{ name: string; href: string }>`, `C.ENTRY_CATEGORIES` (unchanged), `C.AUTHOR` (unchanged). `Category` type stays; `Lang` and `Multilingual` are gone.
- Consumers updated in later tasks: navigations, category/entry pages, entries sidebar.

- [ ] **Step 1: Rewrite `src/configuration.ts`**

```ts
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
    "cultures",
    "thoughts",
  ],
  NAVIGATIONS: [
    { name: "home", href: "/" },
    { name: "journey", href: "/journey" },
    { name: "writings", href: "/writings" },
    { name: "cultures", href: "/cultures" },
    { name: "thoughts", href: "/thoughts" },
  ] as Array<{ name: string; href: string }>,
  CATEGORIES_LABELS: {
    home: "Anasayfa",
    journey: "Yolculuğum",
    writings: "Yazılarım",
    cultures: "Kültür & Sanat",
    thoughts: "Düşüncelerim",
  },
};
```

(`LOCALES`, `DEFAULT_LOCALE`, `MESSAGES` deleted; `NAVIGATIONS[].locales` deleted. `MESSAGES` had no real consumer — `useTranslations` never read it.)

- [ ] **Step 2: Rewrite `src/models/type.ts`**

```ts
import { C } from "@configuration";

export type Category = keyof typeof C.CATEGORIES_LABELS;
```

- [ ] **Step 3: Remove the `i18n` block from `astro.config.ts`**

Delete these lines entirely:

```ts
  i18n: {
    locales: Object.keys(C.LOCALES),
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
```

Also remove the now-unused `import { C } from "./src/configuration";` **only if** nothing else in the file uses `C` (check with grep; currently only the i18n block uses it).

- [ ] **Step 4: Commit**

```bash
git add src/configuration.ts src/models/type.ts astro.config.ts
git commit -m "refactor: drop locales, messages and astro i18n config"
```

---

### Task 3: Simplify utils — delete i18n helpers, de-localize the rest

**Files:**
- Delete: `src/utils/i18n.ts`
- Delete: `src/utils/views.ts` (dead code: only consumers are inline `define:vars` scripts that duplicate it — verify with grep in Step 1)
- Modify: `src/utils/index.ts`
- Modify: `src/utils/pathManager.ts`
- Modify: `src/utils/date.ts`
- Modify: `src/utils/request.ts`

**Interfaces:**
- Produces:
  - `formatDate(date: Date, type?: "short" | "long"): string` — always Turkish.
  - `getEntries({ category }: { category: string })` — returns entries with `id` = slug (no lang), `href` = `/<collection>/<slug>`.
  - `pathManager.isActive(currentPath: string, href: string): boolean` — argument order matches existing call sites `isActive(Astro.url.pathname, href)`.
- Removed: `useTranslations`, `getLocalePaths`, `localeParams`, `DEFAULT_LOCALE`, `incrementViewCount`, `getEntryViews`, `pathManager.getLocale/changeLocale/isAvailable`.

- [ ] **Step 1: Verify `views.ts` exports are unused, then delete files**

```bash
grep -rn "getEntryViews\|incrementViewCount" src --include="*.astro" --include="*.ts" --include="*.svelte" | grep -v "src/utils/views.ts" | grep -v "define:vars" || echo "OK: unused"
rm src/utils/i18n.ts src/utils/views.ts
```

Expected: `OK: unused` (the only `incrementViewCount` outside views.ts is a local function inside an inline `<script define:vars>` in the entry page — not an import).

- [ ] **Step 2: Update `src/utils/index.ts`**

```ts
export * from "./checker";
export * from "./date";
export * from "./request";
export * from "./string";
export * from "./supabase";
export * from "./pathManager";
```

- [ ] **Step 3: Rewrite `src/utils/pathManager.ts`**

```ts
class PathManager {
  isActive(currentPath: string, href: string) {
    const current = this.removeTrailingSlash(currentPath);
    const target = this.removeTrailingSlash(href);

    if (target === "/") return current === "/";
    return current === target || current.startsWith(`${target}/`);
  }

  private removeTrailingSlash(path: string) {
    if (path !== "/" && path.endsWith("/")) {
      return path.slice(0, -1);
    }
    return path;
  }
}

export const pathManager = new PathManager();
```

Note: the old signature was `isActive(href, path)` but both call sites pass `(Astro.url.pathname, href)`; the new signature makes the names match reality. Entry pages (`/writings/foo`) keep the `/writings` nav item active via the `startsWith` branch.

- [ ] **Step 4: Rewrite `src/utils/date.ts`**

```ts
import dayjs from "dayjs";
import "dayjs/locale/tr";

export const formatDate = (date: Date, type: "short" | "long" = "long") => {
  return dayjs(date)
    .locale("tr")
    .format(type === "short" ? "MMM D, YYYY" : "MMMM D, YYYY");
};
```

- [ ] **Step 5: Rewrite `getEntries` in `src/utils/request.ts`**

```ts
import { getCollection, type CollectionEntry } from "astro:content";

export async function getEntries({ category }: { category: string }) {
  const entries = (await getCollection(
    category as any
  )) as unknown as CollectionEntry<"writings">[];

  const mappedEntries = entries.map((entry) => {
    const [slug] = entry.id.split("/");

    return {
      ...entry,
      id: slug,
      href: `/${entry.collection}/${slug}`,
    };
  });

  const sortedEntries = mappedEntries.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  return sortedEntries.filter((entry) => !entry.data.draft);
}
```

(Entry ids are `"<slug>/tr"` after Task 1, so `split("/")[0]` is the slug. The `locale` filter is gone; the `CollectionEntry<"snippets">` cast becomes `"writings"` because the snippets collection does not exist in `content.config.ts`.)

- [ ] **Step 6: Commit**

```bash
git add -A src/utils
git commit -m "refactor: remove i18n utils, de-localize date/entries/path helpers"
```

---

### Task 4: Move pages to root URLs

**Files:**
- Delete: `src/pages/index.astro` (old language-redirect page)
- Create: `src/pages/index.astro` (real homepage, from `[lang]/index.astro`)
- Create: `src/pages/journey.astro` (from `[lang]/journey.astro`)
- Create: `src/pages/[category]/index.astro` (from `[lang]/[category]/index.astro`)
- Create: `src/pages/[category]/[entry]/index.astro` (from `[lang]/[category]/[entry]/index.astro`)
- Delete: `src/pages/[lang]/` (entire directory)

**Interfaces:**
- Consumes: `getEntries({ category })`, `formatDate(date)`, `C.CATEGORIES_LABELS[category]` (string), `C.ENTRY_CATEGORIES` from earlier tasks.
- Produces: routes `/`, `/journey`, `/<category>`, `/<category>/<entry>`.

- [ ] **Step 1: Write the new homepage `src/pages/index.astro`** (overwrite the redirect page)

```astro
---
import { C } from "@configuration";
import { Icon } from "astro-icon/components";
import { Title } from "@ui-kit";
import BaseLayout from "../layouts/base.astro";

const title = "Anasayfa";

const description = `Selam. Ben ${C.AUTHOR.NAME}, ${C.AUTHOR.AGE} yaşındayım. ${C.AUTHOR.COMPANY}'da ${new Date().getFullYear() - 2021} yıldır ${C.AUTHOR.JOB} olarak çalışıyorum. Araştırmaktan ve yeni şeyler öğrenmekten hoşlanıyorum. Öğrendiklerimi başkalarına anlatmayı seviyorum ve bu yüzden blog tutuyorum. Monoton ve aynı içerikli yazılar okuduğumda çığlık atasım geliyor ve insanları sıkıcılıktan kurtarmak için farklı şeyler yazmaya çalışıyorum.`;
---

<BaseLayout title={title}>
  <main>
    <div class="main-container">
      <div class="flex flex-col md:flex-row items-center md:gap-6 mb-4">
        <Icon
          name="logo"
          size={124}
          class="mx-auto shrink-0 md:hidden md:mx-0 animate-scream"
        />
        <div>
          <Title>Bloguma hoş geldin!</Title>
          <p class="mt-4 text-justify md:text-left">{description}</p>
        </div>
      </div>
    </div>
  </main>
</BaseLayout>
```

(The commented-out newsletter block and the unused `formatEntryForTable`/`getEntries`/`Table`/`iconByLanguage` imports from the old `[lang]/index.astro` are dropped as dead code.)

- [ ] **Step 2: Create `src/pages/journey.astro`**

```astro
---
import { BaseLayout } from "@layouts";
import { getCollection } from "astro:content";
import { JourneyYear } from "@components";

const title = "Yolculuğum";

const journey = await getCollection("journey");
const sortedJourney = journey.sort((a, b) => b.data.year - a.data.year);
---

<BaseLayout title={title}>
  <main>
    <div class="main-container">
      {
        sortedJourney.map((item) => (
          <JourneyYear year={item.data.year} items={item.data.items} />
        ))
      }
    </div>
  </main>
</BaseLayout>
```

- [ ] **Step 3: Create `src/pages/[category]/index.astro`**

```astro
---
import { CategoryLayout } from "@layouts";
import { C } from "@configuration";
import type { Category } from "@models/type";

export function getStaticPaths() {
  return C.ENTRY_CATEGORIES.map((category) => ({ params: { category } }));
}

const { category } = Astro.params;
const title = C.CATEGORIES_LABELS[category as Category];
---

<CategoryLayout title={title} />
```

- [ ] **Step 4: Create `src/pages/[category]/[entry]/index.astro`**

```astro
---
import { components } from "@components/markdown";
import { EntryLayout } from "@layouts";
import { render } from "astro:content";
import { getEntries, formatDate } from "@utils";
import { Icon, Image } from "@ui-kit";
import { C } from "@configuration";

export async function getStaticPaths() {
  const entries = await Promise.all(
    C.ENTRY_CATEGORIES.map((category) => getEntries({ category }))
  );

  const paths = entries.flat().map((post) => {
    return {
      params: {
        category: post.collection,
        entry: post.id,
      },
      props: post,
    };
  });

  return paths;
}

const post = Astro.props;
const entryId = post.id.split("/").pop() || "";

const { Content, remarkPluginFrontmatter } = await render(post);
const { title, description, date, tags, topic, cover } = post.data;
---

<EntryLayout {entryId} {title} {description} {date}>
  <main>
    <div class="main-container">
      <article>
        <div
          class="hidden md:flex flex-col lg:flex-row gap-2 text-sm select-none mb-8 text-gray-500"
        >
          <div class="flex gap-2">
            <div class="block">{formatDate(date)} /</div>
            <div class="flex gap-1 items-center">
              <Icon name="clock" size={16} />
              {remarkPluginFrontmatter.minutesRead} dk /
            </div>
            <div id="view-counter" class="flex gap-1 items-center ml-4 md:ml-0">
              <Icon name="view" size={16} />
              <span
                data-entry-view-count={entryId}
                class="empty:opacity-0 transition-opacity duration-700 whitespace-nowrap"
              ></span>
            </div>
          </div>
          <div class="flex gap-1 items-center lg:ml-auto">
            {
              tags
                .slice(0, 3)
                .map((tag) => (
                  <div class="text-xs px-2 py-1 rounded-lg bg-gray-200">
                    #{tag}
                  </div>
                ))
            }
          </div>
        </div>
        {!cover && <Icon name={topic} size={64} class="mb-8" colored />}
        <h1 class="mb-5 mt-4 md:mb-6 md:mt-5 text-balance">{title}</h1>
        {
          cover && (
            <div class="mb-8">
              <Image src={cover.src} alt={title} class="w-full h-auto" />
            </div>
          )
        }
        <Content components={components} />
      </article>
    </div>
  </main>
</EntryLayout>

<script define:vars={{ entryId }}>
  async function incrementViewCount() {
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      return;
    }

    try {
      await fetch("/api/increment-view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entryId }),
      });
    } catch (error) {
      console.error("[ERROR] Failed to increment view count:", error);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(async () => await incrementViewCount(), 10 * 1000);
  });
</script>
```

- [ ] **Step 5: Delete the `[lang]` directory**

```bash
rm -rf "src/pages/[lang]"
```

- [ ] **Step 6: Commit**

```bash
git add -A src/pages
git commit -m "refactor: move pages from /[lang] to root urls"
```

---

### Task 5: Middleware — 301 redirects for legacy locale URLs

**Files:**
- Modify: `src/middleware.ts` (full rewrite)

**Interfaces:**
- Produces: `GET /tr/x?q=1` → `301 /x?q=1`; `GET /en` → `301 /`; everything else passes through.

- [ ] **Step 1: Rewrite `src/middleware.ts`**

```ts
import type { MiddlewareHandler } from "astro";

const LEGACY_LOCALE_PREFIX = /^\/(tr|en)(\/|$)/;

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { pathname, search } = context.url;

  if (LEGACY_LOCALE_PREFIX.test(pathname)) {
    const target = pathname.replace(/^\/(tr|en)/, "") || "/";
    return context.redirect(`${target}${search}`, 301);
  }

  return next();
};
```

(The old `pathManager.isAvailable` guard and the static-asset skip list are gone: locale-prefixed paths no longer exist as static files, so requests to them fall through to the server function where this middleware answers; every other unknown path 404s normally.)

- [ ] **Step 2: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: 301 redirect legacy /tr and /en urls to root"
```

---

### Task 6: Components and layouts — remove Languager and inline Turkish strings

**Files:**
- Delete: `src/components/svelte/Languager.svelte`, `src/components/sidebar/languager.astro`, `src/icons/translate.svg`
- Modify: `src/components/index.ts` (drop Languager export)
- Modify: `src/components/sidebar/content.astro`
- Modify: `src/components/sidebar/navigations/index.astro`
- Modify: `src/components/sidebar/navigations/item.astro`
- Modify: `src/components/topbar/index.astro`
- Modify: `src/components/entries/index.astro`
- Modify: `src/components/entries/item.astro`
- Modify: `src/components/entries/not-found.astro`
- Modify: `src/components/journey/item.astro`
- Modify: `src/components/journey/year.astro`
- Modify: `src/components/markdown/note.astro`
- Modify: `src/layouts/base.astro`

**Interfaces:**
- Consumes: `C.NAVIGATIONS` (`{name, href}`), `C.CATEGORIES_LABELS` (strings), `formatDate(date, type?)`, `pathManager.isActive(currentPath, href)`, `getEntries({category})`.
- Produces: `JourneyItem` props become `title: string; description: string; image?: ImageMetadata`.

- [ ] **Step 1: Delete Languager files and icon**

```bash
rm src/components/svelte/Languager.svelte src/components/sidebar/languager.astro src/icons/translate.svg
```

- [ ] **Step 2: Remove the Languager export from `src/components/index.ts`**

Delete this line:

```ts
export { default as Languager } from "./sidebar/languager.astro";
```

- [ ] **Step 3: Rewrite `src/components/sidebar/content.astro`**

```astro
---
import { Navigations, Profile, Socials } from "@components";
import { Seperator, Spacer } from "@ui-kit";

type Props = {
  parent?: "menu" | "sidebar";
};

const { parent = "sidebar" } = Astro.props as Props;
---

<div class="flex flex-col w-full h-full">
  <div class="flex flex-col w-full h-full">
    <div class="flex gap-2">
      <Profile />
    </div>
    <Spacer size={8} />
    <Navigations />
    <Spacer size={parent === "menu" ? 4 : 0} />
    {parent === "menu" && <Seperator />}
    <Spacer size={8} />
    <Socials />
    <Spacer size={4} />
    <div
      class:list={{
        hidden: parent === "menu",
      }}
    >
      <Seperator />
      <Spacer size={4} />
      <footer class="text-xs text-gray-500 text-center">
        Inspired by onur.dev
      </footer>
    </div>
  </div>
</div>
```

- [ ] **Step 4: Rewrite `src/components/sidebar/navigations/index.astro`**

```astro
---
import { NavigationItem } from "@components";
import { C } from "@configuration";
---

<nav class="flex flex-col gap-1">
  {
    C.NAVIGATIONS.map((navigation) => (
      <NavigationItem name={navigation.name} href={navigation.href} />
    ))
  }
</nav>
```

- [ ] **Step 5: Rewrite `src/components/sidebar/navigations/item.astro`**

```astro
---
import { C } from "@configuration";
import { pathManager } from "@utils";
import { Icon } from "astro-icon/components";

interface Props {
  name: string;
  href: string;
}

const { name, href } = Astro.props;

const isActive = pathManager.isActive(Astro.url.pathname, href);
---

<a
  href={href}
  class:list={[
    "flex gap-4 items-center px-2 py-2 rounded-lg text-sm text-slate-700 ",
    !isActive && "hover:bg-gray-200",
    isActive && "bg-black text-white",
  ]}
>
  <Icon name={name} size={18} />
  <span class="text-sm">
    {C.CATEGORIES_LABELS[name as keyof typeof C.CATEGORIES_LABELS]}
  </span>
</a>
```

- [ ] **Step 6: Update `src/components/topbar/index.astro`**

```astro
---
import { Menu, PageBackButton } from "@components";
import { Icon, Spacer } from "@ui-kit";
import { formatDate } from "@utils";

type Props = {
  id?: string;
  title?: string;
  date?: Date;
};

const { id, title, date } = Astro.props as Props;

const currentPath = Astro.url.pathname.endsWith("/")
  ? Astro.url.pathname
  : `${Astro.url.pathname}/`;
const isEntry = currentPath.split("/").length > 3;
---

<div
  class="top-0 flex gap-2.5 items-center bg-gray-100 p-4 border-b-[1.5px] border-slate-200 w-full"
>
  {isEntry ? <PageBackButton /> : <Menu />}
  {
    isEntry && date && (
      <p class="text-sm font-medium !mb-0 leading-4">{formatDate(date)}</p>
    )
  }
  {
    isEntry && (
      <div class="text-sm ml-auto font-medium flex gap-1 !mb-0 leading-4">
        / <Icon name="views" size={16} />
        <span
          data-entry-view-count={id}
          class="empty:opacity-0 transition-opacity duration-700"
        />
      </div>
    )
  }
  {!isEntry && <h1 class="text-sm font-bold !mb-0 leading-4">{title}</h1>}
  <Spacer />
</div>
```

(`isEntry` threshold drops from `> 4` to `> 3` because the locale segment is gone: `/cultures/mafia-1/` splits into 4 parts, `/cultures/` into 3.)

- [ ] **Step 7: Update `src/components/entries/index.astro` frontmatter and strings**

Frontmatter becomes:

```astro
---
import { EntryItem, EntriesNotFound } from "@components";
import { getEntries } from "@utils";
import { C } from "@configuration";
import type { Category } from "@models/type";
import { Icon } from "@ui-kit";

const { category } = Astro.params;

const entries = await getEntries({ category: category! });

const title = C.CATEGORIES_LABELS[category as Category];
const entryIds = entries.map((entry) => entry.id);
---
```

In the template, replace the search input placeholder:

```astro
      placeholder="Ara"
```

and the no-results text block:

```astro
    Sonuç bulunamadı
```

(both previously `t({ en: ..., tr: ... })` expressions; the rest of the file is unchanged).

- [ ] **Step 8: Update `src/components/entries/item.astro` frontmatter**

```astro
---
import { iconByLanguage } from "@constants";
import { Icon } from "@ui-kit";
import { formatDate } from "@utils";
import { pathManager } from "src/utils/pathManager";

interface Props {
  entryId: string;
  name: string;
  href: string;
  topic: string;
  date: Date;
}

const { entryId, name, href, topic, date = new Date() } = Astro.props;
const formattedDate = formatDate(date, "short");
const isActive = pathManager.isActive(Astro.url.pathname, href);
---
```

(template unchanged)

- [ ] **Step 9: Rewrite `src/components/entries/not-found.astro`**

```astro
---
import { Icon } from "astro-icon/components";
---

<div class="flex-1 p-3 flex items-center justify-center md:items-start md:mt-8">
  <p class="text-gray-500 flex flex-col justify-center items-center gap-4">
    <Icon name="coffee" class="text-7xl md:text-4xl" />
    <span class="text-center" set:html={"Henüz bir yazı yazmadım.<br/>Yazarım bi ara."} />
  </p>
</div>
```

- [ ] **Step 10: Update `src/components/journey/item.astro`**

```astro
---
import { Image } from "src/ui-kit";

type Props = {
  title: string;
  description: string;
  image?: ImageMetadata;
};

const { title, description, image } = Astro.props;
---

<div
  class="flex pb-3 gap-4 relative last:before:hidden before:content-[''] before:w-px before:h-full before:bg-gray-200 before:absolute before:left-[10px]"
>
  <div
    class="size-5 bg-white z-10 rounded-full shrink-0 flex items-center justify-center"
  >
    <div class="size-2.5 bg-black rounded-full"></div>
  </div>
  <div class="flex flex-col gap-1 -mt-0.5">
    <h3 class="text-base font-semibold">{title}</h3>
    <p class="text-sm mb-3">{description}</p>
    {image && <Image src={image.src} width={image.width} height={image.height} alt={title} class="w-full" rounded />}
  </div>
</div>
```

- [ ] **Step 10b: Update `src/components/journey/year.astro` props**

```astro
---
import { JourneyItem } from "@components";

type Props = {
  year: number;
  items: {
    title: string;
    description: string;
    image?: ImageMetadata;
  }[];
};

const { year, items } = Astro.props;
---

<div class="flex flex-col gap-5">
  <h2 class="text-xl font-semibold">{year}</h2>
  <div class="flex flex-col">
    {items.map((item) => <JourneyItem {...item} />)}
  </div>
</div>
```

- [ ] **Step 11: Clean `src/components/markdown/note.astro` frontmatter**

Remove the i18n imports and the unused `text` map. Frontmatter becomes:

```astro
---
import { Icon } from "astro-icon/components";

type Props = {
  type: "info" | "warning" | "important" | "danger";
};

const { type } = Astro.props as Props;

const barBgColor = {
  info: "bg-blue-500",
  warning: "bg-yellow-400",
  important: "bg-green-300",
  danger: "bg-red-300",
}[type];

const xColor = {
  info: "bg-blue-50",
  warning: "bg-yellow-50",
  important: "bg-green-50",
  danger: "bg-red-50",
}[type];
---
```

(`capitalize` and `Icon` were imported but `Icon`/`capitalize` unused in template — keep only what the template uses; template unchanged. Note: `text` was never rendered, it is dead code.)

- [ ] **Step 12: Update `src/layouts/base.astro` frontmatter, html tag, and script**

Frontmatter becomes:

```astro
---
import { Sidebar, Topbar } from "@components";
import "@styles/global.css";
import { AstroFont } from "astro-font";
import Analytics from "@vercel/analytics/astro";
import SpeedInsights from "@vercel/speed-insights/astro";

interface Props {
  id?: string;
  title?: string;
  description?: string;
  date?: Date;
}

const { id, title = "", description, date } = Astro.props;
const url = Astro.url.href;
const siteTitle = "Enes Başpınar";
const pageTitle = title ? `${title} - ${siteTitle}` : siteTitle;
const pageDescription =
  description ||
  "Enes Başpınar'ın kişisel blogu; yazılım, kültür-sanat ve düşünceler.";
---
```

`<html lang={locale}>` → `<html lang="tr">`. `<title>{localeTitle}</title>` → `<title>{pageTitle}</title>`. `content={localeDescription}` → `content={pageDescription}`.

In the Open Graph block, add the locale meta right after `og:url`:

```astro
    <meta property="og:locale" content="tr_TR" />
```

The inline script drops `define:vars` and the locale body:

```astro
    <script>
      async function fetchViewCounts() {
        try {
          const response = await fetch("/api/get-view-counts", {
            method: "POST",
          });

          if (!response.ok) throw new Error("View count fetch failed");

          const data = await response.json();

          if (data.success && data.viewCounts) {
            const viewCountElements = document.querySelectorAll(
              `[data-entry-view-count]`
            );

            viewCountElements.forEach((element) => {
              element.textContent = `${data.viewCounts[element.getAttribute("data-entry-view-count")] ?? 0}`;
            });
          }
        } catch (error) {
          console.error("[ERROR] Failed to fetch view counts:", error);
        }
      }

      document.addEventListener("DOMContentLoaded", fetchViewCounts);
    </script>
```

- [ ] **Step 13: Commit**

```bash
git add -A src/components src/layouts src/icons
git commit -m "refactor: remove language switcher, inline turkish strings in components"
```

---

### Task 7: API routes — hardcode locale "tr"

**Files:**
- Modify: `src/pages/api/increment-view.ts`
- Modify: `src/pages/api/get-view-counts.ts`
- Modify: `src/pages/api/get-views.ts`

**Interfaces:**
- Produces: `POST /api/increment-view` body `{ entryId }`; `POST /api/get-view-counts` no body; `GET /api/get-views?entryId=x`. All query Supabase with `.eq("locale", "tr")` so existing Turkish counts keep working.

- [ ] **Step 1: Rewrite `src/pages/api/increment-view.ts`**

```ts
import type { APIRoute } from "astro";
import { supabaseAdmin } from "@utils";

export const prerender = false;

const LOCALE = "tr";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { entryId } = data;

    if (!entryId) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid parameters" }),
        { status: 400 }
      );
    }

    const result = await incrementViewCount(entryId);

    if (!result.success) {
      return new Response(
        JSON.stringify({ success: false, error: result.error }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("[ERROR] Increment view API error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500 }
    );
  }
};

const incrementViewCount = async (entryId: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("entry_views")
      .select("*")
      .eq("entry_id", entryId)
      .eq("locale", LOCALE)
      .maybeSingle();

    if (error) {
      console.error("[ERROR] View increment error:", error);
      return { success: false, error };
    }

    if (data) {
      const { error: updateError } = await supabaseAdmin
        .from("entry_views")
        .update({
          views: data.views + 1,
          updated_at: new Date().toISOString(),
        })
        .eq("entry_id", entryId)
        .eq("locale", LOCALE);

      if (updateError) {
        console.error("[ERROR] View update error:", updateError);
        return { success: false, error: updateError };
      }
    } else {
      const { error: insertError } = await supabaseAdmin
        .from("entry_views")
        .insert({
          entry_id: entryId,
          locale: LOCALE,
          views: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (insertError) {
        console.error("[ERROR] View insert error:", insertError);
        return { success: false, error: insertError };
      }
    }

    return { success: true };
  } catch (error) {
    console.error("[ERROR] View increment unexpected error:", error);
    return { success: false, error };
  }
};
```

- [ ] **Step 2: Rewrite `src/pages/api/get-view-counts.ts`**

```ts
import type { APIRoute } from "astro";
import { supabaseAdmin } from "@utils";

export const prerender = false;

const LOCALE = "tr";

export const POST: APIRoute = async () => {
  try {
    const viewCounts = await getViewCounts();

    return new Response(JSON.stringify({ success: true, viewCounts }), {
      status: 200,
    });
  } catch (error) {
    console.error("[ERROR] Get view counts API error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500 }
    );
  }
};

const getViewCounts = async (): Promise<Record<string, number>> => {
  try {
    const { data, error } = await supabaseAdmin
      .from("entry_views")
      .select("entry_id, views")
      .eq("locale", LOCALE);

    if (error) {
      console.error("[ERROR] View count fetch error:", error);
      return {};
    }

    const viewCounts: Record<string, number> = {};

    data.forEach((item) => {
      viewCounts[item.entry_id] = item.views;
    });

    return viewCounts;
  } catch (error) {
    console.error("[ERROR] View count unexpected error:", error);
    return {};
  }
};
```

- [ ] **Step 3: Rewrite `src/pages/api/get-views.ts`**

```ts
import type { APIRoute } from "astro";
import { supabase } from "@utils";

export const prerender = false;

const LOCALE = "tr";

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const entryId = url.searchParams.get("entryId");

    if (!entryId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid parameters",
        }),
        { status: 400 }
      );
    }

    const result = await getViewCount(entryId);

    return new Response(
      JSON.stringify({ success: true, views: result.views }),
      { status: 200 }
    );
  } catch (error) {
    console.error("[ERROR] Get views API error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500 }
    );
  }
};

const getViewCount = async (entryId: string) => {
  try {
    const { data, error } = await supabase
      .from("entry_views")
      .select("views")
      .eq("entry_id", entryId)
      .eq("locale", LOCALE)
      .single();

    if (error) {
      console.error("[ERROR] Get view count error:", error);
      return { views: 0, error };
    }

    return { views: data?.views || 0 };
  } catch (error) {
    console.error("[ERROR] Get view count unexpected error:", error);
    return { views: 0, error };
  }
};
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/api
git commit -m "refactor: hardcode tr locale in view count apis"
```

---

### Task 8: OG image plugin — locale-free paths

**Files:**
- Modify: `plugins/og.tsx:22-66` (page-type detection and mdx path)

**Interfaces:**
- Consumes: built page pathnames without locale prefix (`""`, `"journey/"`, `"writings/"`, `"writings/foo/"`).
- Produces: `og.png` per page, reading entry frontmatter from `src/content/blog/<category>/<slug>/tr.mdx`.

- [ ] **Step 1: Update type detection and file path in `plugins/og.tsx`**

Replace this block:

```tsx
        for (const { pathname } of pages) {
          const parts = pathname.split("/").filter(Boolean);
          let type = "";

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
```

with:

```tsx
        for (const { pathname } of pages) {
          const parts = pathname.split("/").filter(Boolean);
          let type = "";

          if (parts.length === 0) type = "homepage";
          if (parts.length === 1 && !["404/", "500/"].includes(pathname))
            type = "category";
          if (parts.length === 2) type = "entry";

          const [category, ...entryPath] = parts;
```

and in the `case "entry":` branch, replace the file read:

```tsx
              const file = fs.readFileSync(
                `src/content/blog/${category}/${entryPath.join("/")}/tr.mdx`
              );
```

(`/journey/` now has `parts.length === 1`, so it renders as "category" type with title `Journey` → `capitalize("journey")`. That matches the old behaviour for `/tr/journey/`.)

- [ ] **Step 2: Commit**

```bash
git add plugins/og.tsx
git commit -m "refactor: generate og images from locale-free paths"
```

---

### Task 9: Final verification and residue sweep

**Files:**
- Possibly modify: anything the grep sweep or build surfaces.
- Modify: `src/pages/404.astro:18` (copy references multiple languages)

- [ ] **Step 1: Fix 404 copy**

In `src/pages/404.astro`, replace:

```astro
      Aradığın sayfayı bulamadım. İstediğiniz dilde olmayabilir veya bozmuş olabilirim.
```

with:

```astro
      Aradığın sayfayı bulamadım. Taşımış ya da bozmuş olabilirim.
```

- [ ] **Step 2: Grep sweep for i18n residue**

```bash
grep -rn "useTranslations\|getLocalePaths\|localeParams\|Multilingual\|LOCALES\|DEFAULT_LOCALE\|currentLocale\|Languager\|changeLocale\|selectedLang\|\"en\"\|'en'" src plugins astro.config.ts --include="*.ts" --include="*.tsx" --include="*.astro" --include="*.svelte" || echo "CLEAN"
grep -rn "type Lang\|Lang}" src --include="*.ts" --include="*.astro" || echo "CLEAN"
```

Expected: `CLEAN` (or only false positives like `lang="tr"`; fix any real hits).

- [ ] **Step 3: Build**

```bash
yarn build
```

Expected: build completes; output contains `dist/index.html`, `dist/journey/index.html`, `dist/writings/index.html`, `dist/cultures/mafia-1/index.html`, and `og.png` files next to them. No `dist/tr/` or `dist/en/` directories:

```bash
ls dist/tr dist/en 2>&1 | head -2
ls dist/index.html dist/journey/index.html dist/cultures/mafia-1/index.html
find dist -name "og.png" | head -5
```

Expected: first command errors with "No such file or directory"; the rest list files.

- [ ] **Step 4: Runtime check with dev server**

```bash
yarn dev &
sleep 5
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:4321/tr/journey
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:4321/en
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/journey
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/cultures/mafia-1
kill %1
```

Expected:
- `/tr/journey` → `301` with redirect_url ending `/journey`
- `/en` → `301` with redirect_url ending `/`
- `/`, `/journey`, `/cultures/mafia-1` → `200`

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: finish turkish-only migration, fix 404 copy"
```
