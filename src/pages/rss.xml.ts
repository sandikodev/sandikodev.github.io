import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import config from '@/config/config.json';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');

  // Sort posts by date (newest first)
  const sortedPosts = posts
    .filter(post => !post.data.draft)
    .sort((a, b) => new Date(b.data.date ?? 0).getTime() - new Date(a.data.date ?? 0).getTime());

  return rss({
    title: config.site.title,
    description: config.metadata.meta_description,
    site: context.site ?? config.site.base_url,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date ?? new Date()),
      description: post.data.description || post.data.meta_title || '',
      author: post.data.authors?.[0] || config.metadata.meta_author,
      link: `/blog/${post.id}/`,
      categories: post.data.categories || [],
    })),
    customData: `<language>en-us</language>`,
  });
}
