import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { SITE } from '../data/site';
import { getAllBlogs } from '../lib/microcms';
import { href } from '../lib/url';

export const GET: APIRoute = async (context) => {
  const blogs = await getAllBlogs();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items: blogs.map((blog) => ({
      title: blog.title,
      description: blog.description,
      link: href(`/blog/${blog.slug}/`),
      pubDate: new Date(blog.publishedAt),
    })),
    customData: '<language>ja</language>',
  });
};
