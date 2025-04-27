import A from "./a.astro";
import Blockquote from "./blockquote.astro";
import H2 from "./h2.astro";
import H3 from "./h3.astro";
import H4 from "./h4.astro";
import H5 from "./h5.astro";
import H6 from "./h6.astro";
import Img from "./img.astro";
import P from "./p.astro";
import Ul from "./ul.astro";
import Ol from "./ol.astro";
import Li from "./li.astro";
import Hr from "./hr.astro";
import Note from "./note.astro";
import Table from "./table.astro";

export { Note, Table };

export const components = {
  a: A,
  blockquote: Blockquote,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  img: Img,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  hr: Hr,
};
