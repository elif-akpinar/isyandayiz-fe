import { useState, useEffect } from 'react';
import { getPosts } from '../lib/content';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Tag } from 'lucide-react';
import SEO from '../components/SEO';

export default function Arsiv() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then(setPosts);
    }, []);

    // Group posts by year
    const groupedPosts = posts.reduce((groups, post) => {
        const year = new Date(post.date).getFullYear();
        if (!groups[year]) groups[year] = [];
        groups[year].push(post);
        return groups;
    }, {});

    const years = Object.keys(groupedPosts).sort((a, b) => b - a);

    return (
        <div style={{ paddingTop: '120px', minHeight: '100vh' }}>
            <SEO title="Arşiv" description="Isyandayiz hareketinin tüm geçmiş yazıları ve kayıtları." url="/arsiv" />
            <div className="container" style={{ maxWidth: '900px' }}>
                <header style={{ marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Yazı <span style={{ color: 'var(--primary)' }}>Arşivi</span></h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Tüm zamanların kayıtları.</p>
                </header>

                <div>
                    {years.map(year => (
                        <div key={year} style={{ marginBottom: '4rem' }}>
                            <h2 style={{
                                fontSize: '2.5rem',
                                borderBottom: '1px solid var(--border)',
                                paddingBottom: '1rem',
                                marginBottom: '2rem',
                                color: 'var(--primary)'
                            }}>{year}</h2>

                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {groupedPosts[year].map((post, idx) => (
                                    <motion.div
                                        key={post.slug}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <Link to={`/blog/${post.slug}`} className="archive-item glass" style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '1.5rem 2rem',
                                            borderRadius: '16px',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', minWidth: '80px' }}>
                                                    {new Date(post.date).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' })}
                                                </span>
                                                <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{post.title}</h3>
                                            </div>
                                            <Tag size={18} style={{ opacity: 0.3 }} />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .archive-item:hover {
                    border-color: var(--primary);
                    padding-left: 2.5rem;
                }
                .archive-item:hover h3 {
                    color: var(--primary);
                }
            `}} />
        </div>
    );
}
