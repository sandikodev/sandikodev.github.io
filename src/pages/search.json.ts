import { getSinglePage } from "@/lib/contentParser.astro";

export async function GET() {
  const posts = await getSinglePage("posts");
  
  const searchData = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description || "",
    slug: post.slug,
    categories: post.data.categories || [],
    tags: post.data.tags || [],
  }));
  
  return new Response(JSON.stringify(searchData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
