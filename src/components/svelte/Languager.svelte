<script>
  import { getRelativeLocaleUrl } from "astro:i18n";

  export let currentLocale;
  export let locales = [];

  const currentLocaleIdx = locales.indexOf(currentLocale);
  const nextLocale = [...locales, locales[0]][currentLocaleIdx + 1];

  function changeLocale() {
    localStorage.setItem("selectedLang", nextLocale);
    location.href = getRelativeLocaleUrl(
      nextLocale,
      window.location.pathname.replace(/^\/[a-zA-Z-]+/, "")
    );
  }
</script>

<button on:click={changeLocale} class="flex items-center gap-2 cursor-pointer">
  <slot />
</button>
