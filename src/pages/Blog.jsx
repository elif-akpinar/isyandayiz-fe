import { useState, useEffect, useMemo } from 'react';
import { getPosts } from '../lib/content';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, X } from 'lucide-react';
import SEO from '../components/SEO';

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);

    useEffect(() => {
        getPosts().then(allPosts => {
            const blogPosts = allPosts.filter(post => post.type === 'blog');
            setPosts(blogPosts);
        });
    }, []);

    const allTags = useMemo(() => {
        const tags = new Set();
        posts.forEach(post => {
            if (post.tags) {
                post.tags.forEach(tag => tags.add(tag.toLowerCase()));
            }
        });
        return Array.from(tags).sort();
    }, [posts]);

    const filteredPosts = useMemo(() => {
        if (!selectedTag) return posts;
        return posts.filter(post =>
            post.tags && post.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase())
        );
    }, [posts, selectedTag]);

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '60px' }}>
            <SEO title="Blog" description="Toplumsal cinsiyet teoryesi, radikal politika ve dayanışma üzerine derinlemesine analizler." url="/blog" />
            <div className="container">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '0.5rem' }}>Fikirler & <span style={{ color: 'var(--primary)' }}>Yazılar</span></h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Derinlemesine analizler ve düşünce yazıları.</p>
                </header>

                {/* Tag Filter Bar */}
                <div style={{ marginBottom: '3rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={`tag-btn ${!selectedTag ? 'active' : ''}`}
                        style={{
                            padding: '0.5rem 1.2rem',
                            borderRadius: '50px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            border: '1px solid var(--border)',
                            background: !selectedTag ? 'var(--primary)' : 'transparent',
                            color: !selectedTag ? 'white' : 'var(--text-muted)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                    >
                        Tümü
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                            className={`tag-btn ${selectedTag === tag ? 'active' : ''}`}
                            style={{
                                padding: '0.5rem 1.2rem',
                                borderRadius: '50px',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                border: '1px solid var(--border)',
                                background: selectedTag === tag ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: selectedTag === tag ? 'white' : 'var(--text-muted)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}
                        >
                            <Hash size={14} /> {tag}
                        </button>
                    ))}
                    {selectedTag && (
                        <button
                            onClick={() => setSelectedTag(null)}
                            style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', marginLeft: '0.5rem' }}
                        >
                            <X size={14} /> Filtreyi Temizle
                        </button>
                    )}
                </div>

                <div className="blog-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2.5rem'
                }}>
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.map((post, idx) => (
                            <motion.article
                                key={post.slug}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="blog-card"
                            >
                                <Link to={`/blog/${post.slug}`}>
                                    <div style={{
                                        aspectRatio: '16/9',
                                        backgroundColor: '#222',
                                        borderRadius: '20px',
                                        marginBottom: '1.2rem',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        border: '1px solid rgba(255,255,255,0.05)'
                                    }}>
                                        {post.image ? (
                                            <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '2.5rem', fontWeight: 800 }}>
                                                İSY
                                            </div>
                                        )}
                                        {Array.isArray(post.tags) && (
                                            <div style={{ position: 'absolute', bottom: '10px', left: '10px', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                {post.tags.slice(0, 2).map(t => (
                                                    <span key={t} style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', color: 'white', fontSize: '0.65rem', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>#{t}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ padding: '0 0.5rem' }}>
                                        <time style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>{new Date(post.date).toLocaleDateString('tr-TR')}</time>
                                        <h2 style={{ fontSize: '1.4rem', margin: '0.4rem 0 0.8rem 0', lineHeight: 1.2, fontWeight: 700 }}>{post.title}</h2>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
                                            {post.description}
                                        </p>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredPosts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Bu etikete uygun yazı bulunamadı.</p>
                        <button onClick={() => setSelectedTag(null)} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '50px', marginTop: '1rem', cursor: 'pointer', fontWeight: 600 }}>Tüm Yazıları Gör</button>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .blog-card {
          transition: all 0.4s ease;
        }
        .blog-card:hover {
          transform: translateY(-8px);
        }
        .blog-card h2:hover {
          color: var(--primary);
        }
        .tag-btn:hover {
            border-color: var(--primary) !important;
            color: var(--primary) !important;
        }
        .tag-btn.active {
            border-color: var(--primary) !important;
            box-shadow: 0 5px 15px var(--primary-glow);
        }
        @media (max-width: 600px) {
            .blog-grid { gap: 2rem !important; }
            .blog-card h2 { font-size: 1.2rem !important; }
        }
      `}} />
        </div>
    );
}
