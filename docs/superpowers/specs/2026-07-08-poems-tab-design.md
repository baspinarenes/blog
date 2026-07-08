# Şiirlerim Sekmesi

**Tarih:** 2026-07-08
**Durum:** Onaylandı

## Amaç

Bloga, mevcut kategori mimarisine (writings/cultures/thoughts) birebir uyan yeni
bir "Şiirlerim" kategorisi eklenecek. Her şiir ayrı bir `.mdx` dosyası olacak,
sidebar'da sekme olarak görünecek ve tıklanınca şiirin kendi sayfası açılacak.
Özel bileşen veya yeni kod yok; yalnızca konfigürasyon ve içerik.

## Kararlar

- **Yapı:** Mevcut kategori düzeni. Yeni bir `poems` content collection.
- **Şema:** Mevcut `entrySchema` aynen kullanılır (`title`, `description`,
  `date`, `topic`, `tags` zorunlu; `cover`, `draft` opsiyonel). Yeni şema yok.
- **İsim/URL:** Sidebar etiketi "Şiirlerim", URL `/poems` (diğer kategorilerin
  İngilizce URL düzenine uygun).

## Değişiklikler

### 1. `src/content.config.ts`

- `writings` ile aynı kalıpta `poems` koleksiyonu eklenir:
  glob loader, pattern `**/[^_]*.mdx`, base `./src/content/blog/poems`,
  şema `entrySchema`.
- `collections` export'una `poems` eklenir.

### 2. `src/configuration.ts`

- `ENTRY_CATEGORIES` dizisine `"poems"` eklenir.
- `NAVIGATIONS` dizisine `{ name: "poems", href: "/poems", locales: ["tr"] }`
  eklenir (thoughts'tan sonra).
- `CATEGORIES_LABELS`'a `poems: { tr: "Şiirlerim", en: "Poems" }` eklenir.

### 3. İçerik: `src/content/blog/poems/`

- Klasör oluşturulur ve örnek bir şiir eklenir: `<slug>/tr.mdx`, frontmatter'da
  `title`, `description`, `date`, `topic: "şiir"`, `tags`.
- Sekmenin uçtan uca çalıştığını doğrulamak için örnek içerik şarttır; glob
  loader boş klasörde hata vermez ama liste boş görünür.

## Otomatik Gelenler (kod değişikliği gerektirmez)

- `Category` tipi `keyof typeof C.CATEGORIES_LABELS`'tan türediği için tip
  güncellemesi gerekmez.
- `src/pages/[lang]/[category]/index.astro` ve `[entry]/index.astro`,
  `ENTRY_CATEGORIES` üzerinden statik yol ürettiği için `/tr/poems` listesi ve
  `/tr/poems/<şiir>` detay sayfaları kendiliğinden oluşur.
- Sidebar sekmesi, arama kutusu ve boş-sonuç durumu mevcut `Entries`
  bileşeninden hazır gelir.

## i18n Kaldırma Çalışmasıyla İlişki

Çalışma ağacında devam eden tek-dilli (TR) geçiş var
(`2026-07-08-remove-i18n-turkish-only-design.md`). Bu tasarım onunla çakışmaz:

- Şiir içeriği yalnızca `tr.mdx` olarak eklenir.
- i18n kaldırma tamamlandığında `poems` da diğer kategorilerle birlikte aynı
  dönüşümü geçirir: `CATEGORIES_LABELS.poems` düz `"Şiirlerim"` string'ine iner,
  `NAVIGATIONS`'dan `locales` alanı kalkar, URL `/poems` olur. Ek iş çıkarmaz.

## Doğrulama

- `npm run build` (veya dev server) ile:
  - `/tr/poems` sayfası açılır ve örnek şiir listelenir,
  - `/tr/poems/<slug>` detay sayfası render olur,
  - sidebar'da "Şiirlerim" sekmesi görünür.
