import matter from 'gray-matter';

// This is a trick to use gray-matter in the browser with Vite
// gray-matter uses 'buffer' which might need a polyfill, but for simple frontmatter it usually works or we can parse manually.
// Let's try to parse manually if gray-matter fails in browser, or use a browser-safe parser.
// Actually, gray-matter has a lot of node dependencies. 
// I'll write a simple frontmatter parser to avoid dependency issues in the browser.

export function parseMarkdown(md) {
  const regex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = md.match(regex);

  if (!match) return { data: {}, content: md };

  const frontmatter = match[1];
  const content = match[2];

  const data = {};
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      data[key.trim()] = valueParts.join(':').trim().replace(/^"(.*)"$/, '$1');
    }
  });

  return { data, content };
}

export async function getPosts() {
  const blogModules = import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default', eager: true });
  const newsModules = import.meta.glob('/src/content/haberler/*.md', { query: '?raw', import: 'default', eager: true });

  const parseModules = (modules, defaultType) => {
    return Object.keys(modules).map(path => {
      const slug = path.split('/').pop().replace('.md', '');
      const contentText = modules[path];
      const { data, content } = parseMarkdown(contentText);
      return {
        slug,
        type: data.type || defaultType,
        ...data,
        body: content
      };
    });
  };

  const allPosts = [
    ...parseModules(blogModules, 'blog'),
    ...parseModules(newsModules, 'haber')
  ];

  return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getEvents() {
  const eventModules = import.meta.glob('/src/content/events/*.md', { query: '?raw', import: 'default', eager: true });

  const events = Object.keys(eventModules).map(path => {
    const slug = path.split('/').pop().replace('.md', '');
    const contentText = eventModules[path];
    const { data } = parseMarkdown(contentText);
    return {
      slug,
      ...data
    };
  });

  return events;
}

export async function getPostBySlug(slug) {
  const posts = await getPosts();
  return posts.find(p => p.slug === slug);
}
