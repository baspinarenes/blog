import { ContentfulEntity } from "../models";
import { fetchArticle, fetchArticles } from "./article";
import { fetchBookReview, fetchBookReviews } from "./book-review";
import { fetchSnippet, fetchSnippets } from "./snippet";
import { fetchThought, fetchThoughts } from "./thought";
import { fetchWriting, fetchWritings } from "./writing";

export default {
  [ContentfulEntity.ARTICLE]: {
    fetch: fetchArticle,
    fetchAll: fetchArticles,
  },
  [ContentfulEntity.WRITING]: {
    fetch: fetchWriting,
    fetchAll: fetchWritings,
  },
  [ContentfulEntity.BOOK_REVIEW]: {
    fetch: fetchBookReview,
    fetchAll: fetchBookReviews,
  },
  [ContentfulEntity.THOUGHT]: {
    fetch: fetchThought,
    fetchAll: fetchThoughts,
  },
  [ContentfulEntity.SNIPPET]: {
    fetch: fetchSnippet,
    fetchAll: fetchSnippets,
  },
};
