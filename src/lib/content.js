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
  const lines = frontmatter.split('\n');

  let currentKey = null;

  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    if (trimmedLine.startsWith('- ')) {
      // Handle list items
      if (currentKey) {
        if (!Array.isArray(data[currentKey])) {
          data[currentKey] = [];
        }
        data[currentKey].push(trimmedLine.substring(2).replace(/^"(.*)"$/, '$1'));
      }
    } else {
      const colonIndex = trimmedLine.indexOf(':');
      if (colonIndex !== -1) {
        const key = trimmedLine.substring(0, colonIndex).trim();
        const value = trimmedLine.substring(colonIndex + 1).trim().replace(/^"(.*)"$/, '$1');

        currentKey = key;

        if (value.startsWith('[') && value.endsWith(']')) {
          try {
            // Handle [item1, item2] format
            data[key] = JSON.parse(value.replace(/'/g, '"'));
          } catch (e) {
            data[key] = value;
          }
        } else {
          data[key] = value;
        }
      }
    }
  });

  return { data, content };
}

export function fixImagePath(path) {
  if (!path) return path;
  if (path.startsWith('http')) return path;

  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (path.startsWith('/uploads/')) {
    return `${baseUrl}${path}`;
  }
  return path;
}

export async function getPosts() {
  const blogModules = import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default', eager: true });
  const newsModules = import.meta.glob('/src/content/haberler/*.md', { query: '?raw', import: 'default', eager: true });

  const parseModules = (modules, defaultType) => {
    return Object.keys(modules).map(path => {
      const slug = path.split('/').pop().replace('.md', '');
      const contentText = modules[path];
      const { data, content } = parseMarkdown(contentText);

      // Fix featured image path
      if (data.image) {
        data.image = fixImagePath(data.image);
      }

      // Fix images in markdown body
      const fixedBody = content.replace(/!\[(.*?)\]\(\/uploads\/(.*?)\)/g, (match, alt, filename) => {
        const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
        return `![${alt}](${baseUrl}/uploads/${filename})`;
      });

      return {
        slug,
        type: data.type || defaultType,
        ...data,
        body: fixedBody
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

    // Potentially fix any image fields in events if they exist
    if (data.image) {
      data.image = fixImagePath(data.image);
    }

    return {
      slug,
      ...data
    };
  });

  return events;
}

export async function getFiles() {
  const fileModules = import.meta.glob('/src/content/files/*.md', { query: '?raw', import: 'default', eager: true });

  const files = Object.keys(fileModules).map(path => {
    const slug = path.split('/').pop().replace('.md', '');
    const contentText = fileModules[path];
    const { data } = parseMarkdown(contentText);

    // Fix file path if it exists
    if (data.file) {
      data.file = fixImagePath(data.file);
    }

    return {
      slug,
      ...data
    };
  });

  return files.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPostBySlug(slug) {
  const posts = await getPosts();
  return posts.find(p => p.slug === slug);
}
