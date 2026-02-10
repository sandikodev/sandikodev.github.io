import type { APIContext } from "astro";

import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import config from "@/config/config.json";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");

  // Sort posts by date (newest first)
  const sortedPosts = posts
    .filter((post) => !post.data.draft)
    .sort(
      (a, b) =>
        new Date(b.data.date ?? 0).getTime() -
        new Date(a.data.date ?? 0).getTime(),
    );

  return rss({
    customData: "<language>en-us</language>",
    description: config.metadata.meta_description,
    items: sortedPosts.map((post) => ({
      author: post.data.authors?.[0] || config.metadata.meta_author,
      categories: post.data.categories || [],
      description: post.data.description || post.data.meta_title || "",
      link: `/blog/${post.id}/`,
      pubDate: new Date(post.data.date ?? new Date()),
      title: post.data.title,
    })),
    site: context.site ?? config.site.base_url,
    title: config.site.title,
  });
}
