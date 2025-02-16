import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

async function getTopHeadlines() {
  const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=30&apiKey=${process.env.NEWS_API_KEY}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
  );

  if (!response.ok) throw new Error("Failed to fetch articles");

  const data = await response.json();
  return data.articles;
}

function generateSlug(title) {
  return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
}

export default async function Home() {
  const articles = await getTopHeadlines();

  return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const slug = generateSlug(article.title);
          return (
              <Card key={slug} className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="hover:text-primary transition-colors">
                    <Link href={`/${slug}`}>{article.title}</Link>
                  </CardTitle>
                  <CardDescription className="flex justify-between items-center">
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    <span className="text-sm">{article.source.name}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  {article.urlToImage && (
                      <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="w-full h-48 object-cover mb-4 rounded-lg"
                      />
                  )}
                  <p className="line-clamp-3">{article.description || article.content}</p>
                </CardContent>
              </Card>
          );
        })}
      </div>
  );
}
