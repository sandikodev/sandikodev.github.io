import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('posts');

  const searchData = posts.map((post: any) => ({
    title: post.data.title,
    description: post.data.description || "",
    slug: post.id,
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
