# Tek Dilli (TR) Siteye Geçiş — i18n Kaldırma

**Tarih:** 2026-07-08
**Durum:** Onaylandı

## Amaç

Blog şu an `/[lang]/...` rotalarıyla iki dilli (en/tr) altyapıya sahip. İngilizce
tamamen kaldırılacak; site tek dilli Türkçe olacak ve dil öneki olmadan kök
URL'lerden servis edilecek.

## Hedef URL Yapısı

- `/` — anasayfa (mevcut `/tr` içeriği)
- `/journey`
- `/writings`, `/writings/<entry>`
- `/cultures`, `/cultures/<entry>`
- `/thoughts`, `/thoughts/<entry>`
- Eski `/tr/...` ve `/en/...` URL'leri kök karşılığına **301 redirect** edilir
  (`/tr/writings/x` → `/writings/x`, `/en` → `/`).

## Değişiklikler

### 1. Rotalar (`src/pages/`)

- `src/pages/[lang]/index.astro` → `src/pages/index.astro` (mevcut dil
  yönlendirme sayfası silinir, yerine gerçek anasayfa gelir)
- `src/pages/[lang]/journey.astro` → `src/pages/journey.astro`
- `src/pages/[lang]/[category]/index.astro` → `src/pages/[category]/index.astro`
- `src/pages/[lang]/[category]/[entry]/index.astro` → `src/pages/[category]/[entry]/index.astro`
- `getStaticPaths` içlerinden `lang` paramı ve `localeParams` kullanımı çıkarılır.

### 2. Middleware (`src/middleware.ts`)

- Path `/tr` veya `/en` ile başlıyorsa öneki soyup kalan yola 301 redirect.
- `pathManager.isAvailable` locale kontrolü kaldırılır; geçersiz kategori
  yönlendirmesi (varsa) locale'siz çalışır ya da tamamen kalkar (404'e bırakılır).

### 3. Konfigürasyon

- `astro.config.mjs`: `i18n` bloğu silinir.
- `src/configuration.ts`:
  - `LOCALES`, `DEFAULT_LOCALE` silinir.
  - `MESSAGES` düz Türkçe key-value olur (en silinir) ya da kullanılmıyorsa
    tamamen kaldırılır.
  - `CATEGORIES_LABELS` düz Türkçe string map'e iner: `{ home: "Anasayfa", ... }`.
  - `NAVIGATIONS`'dan `locales` alanı kalkar.

### 4. Dil Değiştirici

- `src/components/svelte/Languager.svelte` silinir.
- `src/components/sidebar/languager.astro` ve tüm kullanımları silinir.
- `components/index.ts` export'ları güncellenir.

### 5. Utils ve Tipler

- `src/utils/i18n.ts` silinir (`useTranslations`, `getLocalePaths`,
  `localeParams`). Tüm `t(...)` çağrıları düz Türkçe metinle değiştirilir.
- `src/utils/pathManager.ts`: locale mantığı (`getLocale`, `changeLocale`,
  `parse`'daki lang tespiti) çıkarılır; sadece gerekli kalan yardımcılar tutulur.
- `src/models/type.ts`: `Lang`, `Multilingual` tipleri silinir.

### 6. İçerik

- `src/content/journey/data.json`: `title`/`description` alanları `{ en, tr }`
  nesnesinden düz Türkçe string'e indirilir (en metinleri silinir).
- `src/content.config.ts`: journey şeması buna göre `z.string()` olur.

### 7. SEO / Meta

- `src/layouts/base.astro` (ve kökteki eski index): hreflang alternate linkleri
  kaldırılır; `<html lang="tr">`; `og:locale` → `tr_TR`.
- Sitemap Astro tarafından yeni rotalarla üretilir.

## Doğrulama

1. `yarn build` hatasız tamamlanır.
2. Dev sunucuda `/`, `/journey`, `/writings`, bir yazı detayı açılır.
3. `/tr/journey` → 301 → `/journey` redirect'i çalışır.
4. Kod tabanında `en`, `locale`, `Lang`, `i18n` kalıntısı grep ile taranır.
