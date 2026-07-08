# Şiir Detay Sayfası (Kâğıt & Mürekkep + Müzik) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `poems` kategorisinin detay sayfasına kâğıt & mürekkep atmosferi ve şiir bazında seçilebilen, otomatik başlamayı deneyen yerel mp3 çalar eklemek.

**Architecture:** Ortak `[category]/[entry]/index.astro` sayfası, koleksiyon `poems` olduğunda standart makale gövdesi yerine yeni `PoemEntry` bileşenini render eder. Şarkı mp3'ü şiir klasöründe co-locate edilir, frontmatter'daki göreli yol `import.meta.glob` ile URL'e çevrilir. Sidebar/Entries/topbar ve view-counter mekanizması değişmez.

**Tech Stack:** Astro 5, Tailwind CSS v4 (vite plugin), Zod content collections, vanilla JS (`<script>` içinde), Google Fonts (Lora).

**Spec:** `docs/superpowers/specs/2026-07-08-poem-detail-page-design.md`

## Global Constraints

- Repoda test framework'ü YOK — doğrulama `pnpm astro sync`, `pnpm build` ve dev sunucusunda manuel kontrolle yapılır.
- Paket yöneticisi: `pnpm`. Yeni npm bağımlılığı EKLENMEZ.
- Kâğıt paleti (spec'ten birebir): zemin `linear-gradient(180deg, #f6f1e5 0%, #efe7d4 100%)`, çerçeve `rgba(58,47,36,.18)`, etiket `#a08c6d`, başlık/mürekkep koyu `#3a2f24`, dize rengi `#4a3d2e`.
- Ses davranışı: `loop = true`, `volume = 0.7`, autoplay reddedilirse `pointerdown/keydown/wheel/touchmove` ilk etkileşiminde başlat.
- Font: Lora yalnızca şiir sayfasında yüklenir; base layout'taki `AstroFont` konfigürasyonuna dokunulmaz.
- `song` alanı opsiyonel: yoksa player render edilmez. `song.file` çözülemezse build sırasında hata fırlatılır.
- Diğer koleksiyonların (`writings`, `thoughts`, `cultures`, `snippets`) sayfa çıktısı değişmemeli.
- Commit mesajları mevcut convention'ı izler (`feat:`, `refactor:`, `docs:` …) ve şu satırla biter: `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`
- `src/content/blog/poems/ilk-siirim/tr.mdx` dosyasında commit'lenmemiş kullanıcı değişikliği var — üzerine yazma, mevcut içeriğin üstüne ekleme yap.

---

### Task 1: `poems` şemasına `song` alanı

**Files:**
- Modify: `src/content.config.ts:55-61`

**Interfaces:**
- Produces: `poems` frontmatter'ında opsiyonel `song: { file: string; name: string; artist?: string }` alanı. Task 4 ve 5 bu alan adlarını kullanır.

- [ ] **Step 1: Şemayı genişlet**

`src/content.config.ts` içinde `poems` tanımını şu hale getir (mevcut hali `schema: entrySchema` idi):

```ts
const poems = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.mdx",
    base: "./src/content/blog/poems",
  }),
  schema: (ctx: { image: any }) =>
    entrySchema(ctx).extend({
      song: z
        .object({
          file: z.string(),
          name: z.string(),
          artist: z.string().optional(),
        })
        .optional(),
    }),
});
```

- [ ] **Step 2: Şema senkronunu doğrula**

Run: `pnpm astro sync`
Expected: hatasız tamamlanır ("Types generated" çıktısı; `song` alanı zorunlu olmadığı için mevcut şiir geçerli kalır).

- [ ] **Step 3: Commit**

```bash
git add src/content.config.ts
git commit -m "feat: add optional song field to poems schema

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Mp3 çözücü util (`resolvePoemSongUrl`)

**Files:**
- Create: `src/utils/audio.ts`
- Modify: `src/utils/index.ts`

**Interfaces:**
- Produces: `resolvePoemSongUrl(poemSlug: string, file: string): string` — `@utils`'ten export edilir; şiir klasöründeki mp3'ün servis edilebilir URL'ini döner, dosya yoksa `Error` fırlatır. Task 4 bunu kullanır.

- [ ] **Step 1: Util dosyasını yaz**

`src/utils/audio.ts`:

```ts
const audioFiles = import.meta.glob("/src/content/blog/poems/**/*.mp3", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export function resolvePoemSongUrl(poemSlug: string, file: string): string {
  const normalized = file.replace(/^\.\//, "");
  const key = `/src/content/blog/poems/${poemSlug}/${normalized}`;
  const url = audioFiles[key];

  if (!url) {
    throw new Error(
      `[poems] Şarkı dosyası bulunamadı: ${key}. Mevcut dosyalar: ${Object.keys(audioFiles).join(", ") || "(hiç yok)"}`
    );
  }

  return url;
}
```

- [ ] **Step 2: Index'ten export et**

`src/utils/index.ts` dosyasına şu satırı ekle:

```ts
export * from "./audio";
```

- [ ] **Step 3: Derlemenin bozulmadığını doğrula**

Run: `pnpm build`
Expected: build hatasız tamamlanır (util henüz çağrılmıyor, glob boş eşleşse de sorun değil).

- [ ] **Step 4: Commit**

```bash
git add src/utils/audio.ts src/utils/index.ts
git commit -m "feat: add poem song url resolver util

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: `PoemEntry` bileşeni (kâğıt tasarımı + player)

**Files:**
- Create: `src/components/poem-entry.astro`
- Modify: `src/components/index.ts`

**Interfaces:**
- Consumes: `formatDate` (`@utils`), `Icon` (`@ui-kit`).
- Produces: `PoemEntry` bileşeni — `@components`'tan export edilir. Props: `{ title: string; date: Date; minutesRead: string; entryId: string; tags: string[]; song: { url: string; name: string; artist?: string } | null }`. Şiir gövdesi default `<slot />` ile geçilir. Bileşen kendi `<main>` sarmalayıcısını içerir (Task 4'te `EntryLayout`'un doğrudan çocuğu olur).

- [ ] **Step 1: Bileşeni yaz**

`src/components/poem-entry.astro`:

```astro
---
import { Icon } from "@ui-kit";
import { formatDate } from "@utils";

interface Props {
  title: string;
  date: Date;
  minutesRead: string;
  entryId: string;
  tags: string[];
  song: { url: string; name: string; artist?: string } | null;
}

const { title, date, minutesRead, entryId, tags, song } = Astro.props;
const songLabel = song
  ? song.artist
    ? `${song.artist} — ${song.name}`
    : song.name
  : "";
---

<main class="poem-paper">
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
  />
  <div class="poem-frame">
    <div class="poem-inner">
      <div class="poem-meta hidden md:flex">
        <span>{formatDate(date)}</span>
        <span class="poem-meta-item">
          <Icon name="clock" size={14} />
          {minutesRead} dk
        </span>
        <span class="poem-meta-item">
          <Icon name="view" size={14} />
          <span
            data-entry-view-count={entryId}
            class="empty:opacity-0 transition-opacity duration-700 whitespace-nowrap"
          ></span>
        </span>
        <span class="poem-tags">
          {tags.slice(0, 3).map((tag) => <span class="poem-tag">#{tag}</span>)}
        </span>
      </div>

      <div class="poem-kicker">— Şiir —</div>
      <h1 class="poem-title">{title}</h1>

      <article class="poem-verses">
        <slot />
      </article>
    </div>

    {
      song && (
        <div id="poem-player" class="poem-player">
          <audio src={song.url} preload="auto" />
          <button
            id="poem-play-toggle"
            class="poem-play-btn"
            aria-label="Müziği başlat veya durdur"
          >
            <svg
              class="icon-play"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path d="M2 1l9 5-9 5V1z" />
            </svg>
            <svg
              class="icon-pause"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path d="M2 1h3v10H2V1zm5 0h3v10H7V1z" />
            </svg>
          </button>
          <span class="poem-eq" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span class="poem-song-label">{songLabel}</span>
        </div>
      )
    }
  </div>
</main>

<style>
  .poem-paper {
    background: linear-gradient(180deg, #f6f1e5 0%, #efe7d4 100%);
    font-family: "Lora", Georgia, serif;
    color: #3a2f24;
  }

  .poem-frame {
    border: 1px solid rgba(58, 47, 36, 0.18);
    border-radius: 4px;
    margin: 12px;
    padding: 2.5rem 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .poem-inner {
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    text-align: center;
  }

  .poem-meta {
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.8rem;
    color: #a08c6d;
    margin-bottom: 2rem;
    user-select: none;
    font-family: "Geist", sans-serif;
  }

  .poem-meta-item {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  .poem-tags {
    display: inline-flex;
    gap: 0.375rem;
  }

  .poem-tag {
    font-size: 0.7rem;
    padding: 0.125rem 0.5rem;
    border-radius: 999px;
    background: rgba(58, 47, 36, 0.08);
    color: #8a7355;
  }

  .poem-kicker {
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #a08c6d;
    margin-bottom: 1rem;
  }

  .poem-title {
    font-family: "Lora", Georgia, serif;
    font-style: italic;
    font-weight: 500;
    font-size: 2rem;
    color: #3a2f24;
    margin-bottom: 2.5rem;
    display: block;
    text-wrap: balance;
  }

  .poem-verses {
    font-size: 1.05rem;
    line-height: 2;
    color: #4a3d2e;
    text-align: center;
  }

  .poem-verses :global(p) {
    margin-bottom: 1.75rem;
  }

  .poem-player {
    position: sticky;
    bottom: 1rem;
    margin: 2.5rem auto 0;
    display: flex;
    align-items: center;
    gap: 0.625rem;
    width: fit-content;
    max-width: 90%;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    background: rgba(246, 241, 229, 0.92);
    border: 1px solid rgba(58, 47, 36, 0.15);
    box-shadow: 0 2px 12px rgba(58, 47, 36, 0.12);
    backdrop-filter: blur(4px);
    font-family: "Geist", sans-serif;
    font-size: 0.75rem;
    color: #4a3d2e;
  }

  .poem-play-btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #3a2f24;
    color: #f6f1e5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
  }

  .poem-player .icon-pause {
    display: none;
  }

  .poem-player.is-playing .icon-pause {
    display: block;
  }

  .poem-player.is-playing .icon-play {
    display: none;
  }

  .poem-eq {
    display: flex;
    gap: 2px;
    align-items: flex-end;
    height: 14px;
  }

  .poem-eq span {
    width: 3px;
    height: 4px;
    border-radius: 2px;
    background: #3a2f24;
  }

  .poem-player.is-playing .poem-eq span {
    animation: poem-eq 0.9s ease-in-out infinite alternate;
  }

  .poem-player.is-playing .poem-eq span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .poem-player.is-playing .poem-eq span:nth-child(3) {
    animation-delay: 0.4s;
  }

  .poem-player.is-playing .poem-eq span:nth-child(4) {
    animation-delay: 0.1s;
  }

  @keyframes poem-eq {
    from {
      height: 4px;
    }
    to {
      height: 14px;
    }
  }

  .poem-song-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<script>
  const player = document.getElementById("poem-player");
  const audio = player?.querySelector("audio");
  const toggle = document.getElementById("poem-play-toggle");

  if (player && audio && toggle) {
    audio.loop = true;
    audio.volume = 0.7;

    audio.addEventListener("play", () => player.classList.add("is-playing"));
    audio.addEventListener("pause", () =>
      player.classList.remove("is-playing")
    );

    toggle.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    });

    const interactionEvents = ["pointerdown", "keydown", "wheel", "touchmove"];

    function startOnFirstInteraction() {
      cleanup();
      if (audio && audio.paused) {
        audio.play().catch(() => {});
      }
    }

    function cleanup() {
      interactionEvents.forEach((event) =>
        window.removeEventListener(event, startOnFirstInteraction)
      );
    }

    audio.play().catch(() => {
      interactionEvents.forEach((event) =>
        window.addEventListener(event, startOnFirstInteraction, {
          passive: true,
        })
      );
    });
  }
</script>
```

- [ ] **Step 2: Index'ten export et**

`src/components/index.ts` dosyasına şu satırı ekle (mevcut `PageBackButton` satırından sonra):

```ts
export { default as PoemEntry } from "./poem-entry.astro";
```

- [ ] **Step 3: Derlemeyi doğrula**

Run: `pnpm build`
Expected: build hatasız tamamlanır (bileşen henüz kullanılmıyor ama Astro tüm bileşenleri tip-kontrol eder... etmez; sadece syntax hatası build'de yakalanır. Hata görürsen bileşen kodunu düzelt).

- [ ] **Step 4: Commit**

```bash
git add src/components/poem-entry.astro src/components/index.ts
git commit -m "feat: add PoemEntry component with paper design and audio player

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Detay sayfasına bağlama

**Files:**
- Modify: `src/pages/[category]/[entry]/index.astro`

**Interfaces:**
- Consumes: `PoemEntry` (Task 3, `@components`), `resolvePoemSongUrl` (Task 2, `@utils`), `song` frontmatter alanı (Task 1).

- [ ] **Step 1: Sayfayı güncelle**

`src/pages/[category]/[entry]/index.astro` dosyasının tamamını şu hale getir (frontmatter'a import + `song` çözümü, gövdeye koşullu render eklenir; standart gövde ve view-counter script'i aynen korunur):

```astro
---
import { components } from "@components/markdown";
import { PoemEntry } from "@components";
import { EntryLayout } from "@layouts";
import { render } from "astro:content";
import { getEntries, formatDate, resolvePoemSongUrl } from "@utils";
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

const isPoem = post.collection === "poems";
const songData = isPoem ? (post.data as { song?: { file: string; name: string; artist?: string } }).song : undefined;
const song = songData
  ? {
      url: resolvePoemSongUrl(post.id, songData.file),
      name: songData.name,
      artist: songData.artist,
    }
  : null;
---

<EntryLayout {entryId} {title} {description} {date}>
  {
    isPoem ? (
      <PoemEntry
        {title}
        {date}
        minutesRead={remarkPluginFrontmatter.minutesRead}
        {entryId}
        {tags}
        {song}
      >
        <Content components={components} />
      </PoemEntry>
    ) : (
      <main>
        <div class="main-container">
          <article>
            <div class="hidden md:flex flex-col lg:flex-row gap-2 text-sm select-none mb-8 text-gray-500">
              <div class="flex gap-2">
                <div class="block">{formatDate(date)} /</div>
                <div class="flex gap-1 items-center">
                  <Icon name="clock" size={16} />
                  {remarkPluginFrontmatter.minutesRead} dk /
                </div>
                <div
                  id="view-counter"
                  class="flex gap-1 items-center ml-4 md:ml-0"
                >
                  <Icon name="view" size={16} />
                  <span
                    data-entry-view-count={entryId}
                    class="empty:opacity-0 transition-opacity duration-700 whitespace-nowrap"
                  />
                </div>
              </div>
              <div class="flex gap-1 items-center lg:ml-auto">
                {tags.slice(0, 3).map((tag) => (
                  <div class="text-xs px-2 py-1 rounded-lg bg-gray-200">
                    #{tag}
                  </div>
                ))}
              </div>
            </div>
            {!cover && <Icon name={topic} size={64} class="mb-8" colored />}
            <h1 class="mb-5 mt-4 md:mb-6 md:mt-5 text-balance">{title}</h1>
            {cover && (
              <div class="mb-8">
                <Image src={cover.src} alt={title} class="w-full h-auto" />
              </div>
            )}
            <Content components={components} />
          </article>
        </div>
      </main>
    )
  }
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

- [ ] **Step 2: Build ile doğrula**

Run: `pnpm build`
Expected: hatasız tamamlanır. Henüz hiçbir şiirde `song` frontmatter'ı yok → player'sız kâğıt sayfası üretilir.

- [ ] **Step 3: Şiir dışı sayfaların değişmediğini doğrula**

Run: `pnpm dev` (arka planda) ve tarayıcıda bir snippet sayfası aç (ör. `http://localhost:4321/snippets/reset-default-element-styles`).
Expected: sayfa eskisi gibi beyaz zemin, standart makale düzeni. `http://localhost:4321/poems/ilk-siirim` ise kâğıt zemin + ortalanmış dizeler gösterir (player yok).

- [ ] **Step 4: Commit**

```bash
git add "src/pages/[category]/[entry]/index.astro"
git commit -m "feat: render poems with PoemEntry paper layout

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: Örnek şarkı + frontmatter

**Files:**
- Create: `src/content/blog/poems/ilk-siirim/song.mp3`
- Modify: `src/content/blog/poems/ilk-siirim/tr.mdx` (SADECE frontmatter'a ekleme — dosyada commit'lenmemiş kullanıcı değişikliği var, gövdeye dokunma)

**Interfaces:**
- Consumes: Task 1'in `song` şeması, Task 2'nin dosya çözümü.

- [ ] **Step 1: Deneme mp3'ü oluştur veya iste**

Run: `which ffmpeg`

ffmpeg VARSA — 15 saniyelik yumuşak bir test ezgisi üret:

```bash
ffmpeg -f lavfi -i "sine=frequency=220:duration=15" -af "volume=0.4,afade=t=in:d=2,afade=t=out:st=13:d=2" -q:a 6 src/content/blog/poems/ilk-siirim/song.mp3
```

ffmpeg YOKSA — kullanıcıdan dosya iste ve bekle: "Şiirde çalmasını istediğin mp3'ü `src/content/blog/poems/ilk-siirim/song.mp3` olarak koyar mısın?" (Bu, kullanıcı girdisi gerektiren tek adımdır.)

- [ ] **Step 2: Frontmatter'a şarkıyı ekle**

`src/content/blog/poems/ilk-siirim/tr.mdx` frontmatter'ına (`tags` satırından sonra) ekle — `name`/`artist` değerlerini kullanıcı gerçek şarkı adını verdiyse onunla değiştir:

```yaml
song:
  file: ./song.mp3
  name: Deneme Ezgisi
```

- [ ] **Step 3: Build ile dosya çözümünü doğrula**

Run: `pnpm build`
Expected: hatasız tamamlanır. Kasıtlı kırık test: frontmatter'da `file: ./yanlis.mp3` yapıp `pnpm build` çalıştır → "Şarkı dosyası bulunamadı" hatasıyla FAIL etmeli; sonra `./song.mp3`'e geri al.

- [ ] **Step 4: Commit**

```bash
git add src/content/blog/poems/ilk-siirim/song.mp3 src/content/blog/poems/ilk-siirim/tr.mdx
git commit -m "feat: add song to ilk-siirim poem

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

(Not: `tr.mdx`'teki kullanıcının önceki değişiklikleri de bu commit'e girer — commit'ten önce `git diff --staged` çıktısını kontrol et ve kullanıcıya not düş.)

---

### Task 6: Uçtan uca doğrulama

**Files:** (değişiklik yok — doğrulama görevi)

- [ ] **Step 1: Dev sunucusunda player davranışını kontrol et**

Run: `pnpm dev` ve `http://localhost:4321/poems/ilk-siirim` aç. Kontrol listesi (spec'in Doğrulama bölümü):

1. Sayfa açılınca müzik çalıyor mu; çalmıyorsa ilk tık/scroll/tuş ile kendiliğinden başlıyor mu?
2. Player'da duraklat → ekolayzer duruyor, ikon ▶ oluyor; tekrar başlat çalışıyor mu?
3. Şarkı bitince başa sarıyor mu (kısa test mp3 ile 15 sn bekle)?
4. Kâğıt tasarımı: krem zemin, ince çerçeve, "— ŞİİR —" etiketi, italik Lora başlık, ortalanmış dizeler görünüyor mu?
5. Mobil genişlikte (devtools ile ~390px) topbar duruyor, kâğıt içerik alanını kaplıyor, player altta sticky mi?

Expected: hepsi evet. Sorun varsa ilgili task'ın dosyasında düzelt, aynı commit convention'ı ile `fix:` commit'i at.

- [ ] **Step 2: Şarkısız şiir durumunu kontrol et**

`tr.mdx`'ten `song` bloğunu geçici olarak sil, sayfayı yenile.
Expected: player görünmez, sayfa sessiz, kâğıt tasarımı durur. Kontrolden sonra `song` bloğunu geri koy.

- [ ] **Step 3: Production build**

Run: `pnpm build`
Expected: hatasız tamamlanır; `dist/` altında `_astro/` içine mp3 kopyalanmış olmalı (`ls dist/_astro | grep -i mp3` ile teyit et; Vercel adapter kullanılıyorsa çıktı `.vercel/output/static/_astro` altında olabilir).

