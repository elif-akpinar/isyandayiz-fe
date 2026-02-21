import { useEffect } from 'react';

const SEO = ({ title, description, image, url }) => {
    const defaultTitle = 'İSYANDAYIZ | Eşitlik ve Dayanışma Hareketi';
    const defaultDescription = 'Isyandayiz, toplumsal cinsiyet eşitliği ve sosyal adalet için mücadele eden radikal bir siyasi harekettir.';
    const siteUrl = 'https://isyandayiz.org'; // Replace with actual URL

    useEffect(() => {
        // Update Document Title
        document.title = title ? `${title} | İSYANDAYIZ` : defaultTitle;

        // Update Meta Tags
        const updateMeta = (selector, content) => {
            const el = document.querySelector(selector);
            if (el) el.setAttribute('content', content || '');
        };

        const finalDescription = description || defaultDescription;
        const finalImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.jpg`;
        const finalUrl = url ? `${siteUrl}${url}` : siteUrl;

        // Standard meta
        updateMeta('meta[name="description"]', finalDescription);

        // Open Graph
        updateMeta('meta[property="og:title"]', title ? `${title} | İSYANDAYIZ` : defaultTitle);
        updateMeta('meta[property="og:description"]', finalDescription);
        updateMeta('meta[property="og:image"]', finalImage);
        updateMeta('meta[property="og:url"]', finalUrl);

        // Twitter
        updateMeta('meta[property="twitter:title"]', title ? `${title} | İSYANDAYIZ` : defaultTitle);
        updateMeta('meta[property="twitter:description"]', finalDescription);
        updateMeta('meta[property="twitter:image"]', finalImage);
        updateMeta('meta[property="twitter:url"]', finalUrl);

    }, [title, description, image, url]);

    return null; // This component doesn't render anything
};

export default SEO;
