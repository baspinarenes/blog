# Şiir Detay Sayfası Tasarımı — Kâğıt & Mürekkep + Müzik

**Tarih:** 2026-07-08
**Durum:** Onaylandı

## Amaç

Şiir (`poems`) kategorisindeki yazıların detay sayfası, blogun teknik sayfalarından farklı bir atmosfere kavuşur: eski bir şiir defteri hissi veren "kâğıt & mürekkep" tasarımı ve şiir bazında seçilebilen, sayfaya girince (tarayıcı izin verdiği ölçüde) otomatik başlayan müzik.

## Kararlar (kullanıcı onaylı)

| Konu | Karar |
|---|---|
| Müzik kaynağı | Yerel mp3 dosyası, şiirin kendi klasöründe |
| Otomatik oynatma | Autoplay denenir; engellenirse ilk kullanıcı etkileşiminde (pointerdown/keydown/scroll) kendiliğinden başlar |
| Atmosfer | Kâğıt & mürekkep (krem zemin, serif, ince çerçeve) |
| Kapsam | Mevcut blog düzeni korunur; kâğıt dokusu yalnızca içerik alanını kaplar. Sidebar, şiir listesi (Entries), topbar aynen kalır |
| Şarkı bitince | Başa sarar (loop) |

## İçerik Modeli

`src/content.config.ts` içindeki `poems` koleksiyonunun şeması, ortak `entrySchema` alanlarına ek olarak opsiyonel `song` alanı alır:

```yaml
# src/content/blog/poems/ilk-siirim/tr.mdx frontmatter örneği
song:
  file: ./agladikca.mp3   # şiir klasörüne göre göreli yol
  name: Ağladıkça
  artist: Ahmet Kaya      # opsiyonel
```

Zod şeması:

```ts
song: z
  .object({
    file: z.string(),
    name: z.string(),
    artist: z.string().optional(),
  })
  .optional()
```

Mp3 dosyaları şiir klasöründe co-locate edilir (ör. `src/content/blog/poems/ilk-siirim/agladikca.mp3`). Sayfa tarafında `import.meta.glob("/src/content/blog/poems/**/*.mp3", { eager: true, query: "?url", import: "default" })` ile dosya URL'e çevrilir; frontmatter'daki göreli yol, şiirin klasör yoluyla birleştirilerek glob sonucundan eşlenir. Eşleşme bulunamazsa build sırasında anlaşılır bir hata fırlatılır (sessiz kırık player yerine).

## Sayfa Yapısı

- `src/pages/[category]/[entry]/index.astro` içinde `post.collection === "poems"` ise standart makale gövdesi yerine yeni **`PoemEntry`** bileşeni (`src/components/poem-entry.astro`) render edilir.
- `EntryLayout` (sidebar + Entries listesi + view counter script'i) tüm kategoriler için ortak kalır; şiire özel olan yalnızca içerik alanıdır.
- Görüntülenme sayacı artırma script'i ve meta satırı (tarih / okuma süresi / görüntülenme / etiketler) şiir sayfasında da korunur, kâğıt renk paletine boyanır.

## Görsel Atmosfer

- **Zemin:** krem degrade (`#f6f1e5 → #efe7d4`), içerik alanının kenarından ~12px içeride 1px, %18 opaklıkta (`rgba(58,47,36,.18)`) ince çerçeve çizgisi.
- **Başlık bölgesi:** üstte harf aralıklı, küçük puntolu "— ŞİİR —" etiketi (`#a08c6d`), altında italik serif başlık (`#3a2f24`).
- **Dizeler:** ortalanmış, serif, `line-height: 2`, mürekkep tonu (`#4a3d2e`).
- **Font:** Lora (Google Fonts) yalnızca şiir detay sayfasında yüklenir — base layout'taki `AstroFont` konfigürasyonuna eklenmez; `PoemEntry` içinde `<link>` ile getirilir.
- **Mobil:** topbar korunur; kâğıt, topbar altındaki içerik alanını kaplar.

## Müzik Çalar

- **Görünüm:** kâğıt tonlarında hap (pill) player — yuvarlak oynat/duraklat düğmesi (`#3a2f24` zemin, krem ikon), çalarken hareket eden 4 çubuklu ekolayzer animasyonu, `"{artist} — {name}"` metni (artist yoksa yalnız `name`).
- **Konum:** içerik alanının altına yapışık (`position: sticky; bottom: …`), uzun şiirlerde de görünür kalır.
- **Davranış:**
  - Sayfa yüklenince `audio.play()` denenir (`loop = true`, `volume = 0.7`).
  - Promise reddedilirse `pointerdown`, `keydown`, `wheel`/`touchmove` olaylarına tek seferlik dinleyiciler takılır; ilk etkileşimde çalma yeniden denenir ve dinleyiciler kaldırılır.
  - Oynat/duraklat düğmesi her durumda manuel kontrol sağlar; ekolayzer yalnızca çalarken hareket eder.
  - Sayfadan ayrılınca ses doğal olarak durur (tam sayfa geçişleri, SPA yok).

## Kenar Durumlar

- `song` alanı olmayan şiir → player render edilmez; sayfa sessiz, yalnızca kâğıt tasarımı.
- Autoplay engellendi ve kullanıcı hiç etkileşmedi → player "▶" durumunda bekler; tıklanınca çalar.
- `song.file` glob sonuçlarında bulunamazsa → build hatası (yazım hatasını erken yakalamak için).
- Diğer kategorilerin (`writings`, `thoughts`, `cultures`, `snippets` vb.) sayfaları değişmez.

## Doğrulama

Dev sunucusunda şiir sayfası açılarak:

1. Autoplay / ilk-etkileşimde başlama davranışı (yeni sekmede açıp hiç etkileşmeden ve etkileşerek),
2. Döngü (şarkı sonunda başa sarma),
3. Oynat/duraklat ve ekolayzer durumları,
4. `song`suz şiirde player'ın görünmemesi,
5. Şiir dışı bir kategorinin detay sayfasının etkilenmediği

kontrol edilir; ardından production build (`astro build`) hatasız tamamlanmalıdır.
