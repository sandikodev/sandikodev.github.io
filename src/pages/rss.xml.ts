import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import config from '@/config/config.json';

export async function GET(context) {
  const posts = await getCollection('posts');
  
  // Sort posts by date (newest first)
  const sortedPosts = posts
    .filter(post => !post.data.draft)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: config.site.title,
    description: config.metadata.meta_description,
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description || post.data.meta_title,
      author: post.data.authors?.[0] || config.site.author,
      link: `/blog/${post.slug}/`,
      categories: post.data.categories || [],
    })),
    customData: `<language>en-us</language>`,
  });
}
