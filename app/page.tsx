import { HomeSection } from "@/components/home-section";
import { AUTHOR } from "@/lib/utils/constants";

export default async function Page() {
  return (
    <div className="container">
      <p>
        I'm {AUTHOR.name}, {AUTHOR.age} yrs, a software engineer at{" "}
        <span className="text-orange-500">Trendyol</span>, live in Türkiye.
      </p>
      <p>
        I studied image processing in college, and that was my graduation project. But then, I
        totally changed my path. I jumped into web development, even though I didn't know much. I
        joined to a bootcamp, got a job, and now I've decided to continue my blog. It will include
        book reviews, thoughts, and developer stuff. Join my world!
      </p>
      <HomeSection type="article" />
      <HomeSection type="book-review" />
      <HomeSection type="thought" />
    </div>
  );
}
