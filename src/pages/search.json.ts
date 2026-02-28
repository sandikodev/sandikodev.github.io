import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("posts");

  const searchData = posts.map((post: any) => ({
    categories: post.data.categories || [],
    description: post.data.description || "",
    slug: post.id.replace(/\.mdx?$/, ""),
    tags: post.data.tags || [],
    title: post.data.title,
  }));

  return new Response(JSON.stringify(searchData), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
