import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {generateSlug} from "@/util/regex";
import {notFound} from "next/navigation";
import Link from "next/link";

async function getArticleBySlug(slug) {
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=30&apiKey=${process.env.NEWS_API_KEY}`, {
            // cache: 'force-cache',
            next: {
                revalidate: 3600
            }
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        console.log('slug', slug);

        return data.articles.find((article) => generateSlug(article.title) === slug);
    } catch (error) {
        return null
    }
}


export default async function ArticlePage({params}) {
    const {slug} = await params;
    const article = await getArticleBySlug(slug);

    console.log('article', article);

    if (!article) {
        notFound();
    }


    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription className="flex justify-between items-center">
            <span>
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
              })}
            </span>
                        <span className="text-sm">{article.source.name}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {article.urlToImage && (
                        <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    )}
                    <div className="prose max-w-none">
                        <p className="text-lg">{article.description}</p>
                        <p>{article.content?.replace(/\[\+[\d]+ chars\]$/, "")}</p>
                    </div>
                    <div className="mt-6">
                        <Link
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                        >
                            Read Full Article
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-2"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
