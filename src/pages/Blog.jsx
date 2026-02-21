import { useState, useEffect } from 'react';
import { getPosts } from '../lib/content';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

export default function Blog() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then(allPosts => {
            const blogPosts = allPosts.filter(post => post.type === 'blog');
            setPosts(blogPosts);
        });
    }, []);

    return (
        <div style={{ paddingTop: '120px', minHeight: '100vh' }}>
            <SEO title="Blog" description="Toplumsal cinsiyet teoryesi, radikal politika ve dayanışma üzerine derinlemesine analizler." url="/blog" />
            <div className="container">
                <header style={{ marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Fikirler & <span style={{ color: 'var(--primary)' }}>Yazılar</span></h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Derinlemesine analizler ve düşünce yazıları.</p>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '3rem'
                }}>
                    {posts.map((post, idx) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="blog-card"
                        >
                            <Link to={`/blog/${post.slug}`}>
                                <div style={{
                                    aspectRatio: '16/9',
                                    backgroundColor: '#222',
                                    borderRadius: '16px',
                                    marginBottom: '1.5rem',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}>
                                    {post.image ? (
                                        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444', fontSize: '3rem', fontWeight: 800 }}>
                                            İSYANDAYIZ
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: '0 0.5rem' }}>
                                    <time style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>{new Date(post.date).toLocaleDateString('tr-TR')}</time>
                                    <h2 style={{ fontSize: '1.8rem', margin: '0.5rem 0 1rem 0', lineHeight: 1.2 }}>{post.title}</h2>
                                    <p style={{ color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {post.description}
                                    </p>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .blog-card {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .blog-card:hover {
          transform: translateY(-15px);
        }
        .blog-card h2:hover {
          color: var(--primary);
        }
      `}} />
        </div>
    );
}
