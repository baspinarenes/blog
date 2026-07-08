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
