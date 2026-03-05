import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://feministisyan.org';
const CONTENT_DIRS = [
    'src/content/blog',
    'src/content/haberler'
];

const staticPages = [
    '',
    'haberler',
    'blog',
    'arsiv',
    'hakkimizda',
    'iletisim'
];

function generateSitemap() {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Statik sayfaları ekle
    staticPages.forEach(page => {
        xml += `  <url>\n`;
        xml += `    <loc>${SITE_URL}/${page}</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
        xml += `  </url>\n`;
    });

    // Blog ve Haber yazılarını ekle
    CONTENT_DIRS.forEach(dir => {
        const fullPath = path.join(process.cwd(), dir);
        if (fs.existsSync(fullPath)) {
            const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.md'));
            files.forEach(file => {
                const slug = file.replace('.md', '');
                const stats = fs.statSync(path.join(fullPath, file));

                xml += `  <url>\n`;
                xml += `    <loc>${SITE_URL}/blog/${slug}</loc>\n`;
                xml += `    <lastmod>${stats.mtime.toISOString().split('T')[0]}</lastmod>\n`;
                xml += `    <changefreq>monthly</changefreq>\n`;
                xml += `    <priority>0.6</priority>\n`;
                xml += `  </url>\n`;
            });
        }
    });

    xml += '</urlset>';

    fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), xml);
    console.log('✅ Sitemap başarıyla güncellendi (public/sitemap.xml)');
}

generateSitemap();
