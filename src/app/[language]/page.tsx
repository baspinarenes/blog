import { Logo } from "@/components/atoms/Logo";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Title } from "@/components/atoms/Title";
import { PostCardList } from "@/components/molecules/PostCardList";
import { getAllPosts } from "@/lib/api";
import type { PageProps } from "../../types/props";
import { draftMode } from "next/headers";
import { useTranslation } from "../i18n";

export default async function Home({ params: { language } }: PageProps) {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts({
    language,
    preview: isEnabled || process?.env?.NODE_ENV === "development",
  });
  const { t } = await useTranslation(language, "home");

  return (
    <main className="mt-6">
      <Title level={1} className="hidden">
        {t("home:title")}
      </Title>
      <Logo />
      <Paragraph>
        {/* Translation tasi */}
        Selam! Ben Enes, 25 yaşındayım. Trendyol'da 2 yıldır Software Engineer
        olarak çalışıyorum. Araştırmaktan ve yeni şeyler öğrenmekten
        hoşlanıyorum. Öğrendiklerimi başkalarına anlatmayı seviyorum ve bu
        yüzden blog tutuyorum. Monoton ve aynı içerikli yazılar okuduğumda
        çığlık atasım geliyor ve insanları sıkıcılıktan kurtarmak için farklı
        şeyler yapmaya çalışıyorum.
      </Paragraph>
      <Title level={2} className="mt-12">
        {t("home:subTitle")}
      </Title>
      <PostCardList language={language} entries={allPosts} />
    </main>
  );
}
