import { useState, useEffect } from 'react';
import { getPosts, getFiles } from '../lib/content';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Tag, FileText, Download } from 'lucide-react';
import SEO from '../components/SEO';

export default function Arsiv() {
    const [posts, setPosts] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        getPosts().then(setPosts);
        getFiles().then(setFiles);
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
        <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '60px' }}>
            <SEO title="Arşiv" description="Isyandayiz hareketinin tüm geçmiş yazıları ve kayıtları." url="/arsiv" />
            <div className="container">
                <header style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '1rem' }}>Siyasi <span style={{ color: 'var(--primary)' }}>Bellek</span></h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Tüm zamanların kayıtları ve belgeleri.</p>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 300px',
                    gap: '4rem',
                    alignItems: 'start'
                }} className="archive-grid">

                    {/* Left Column: Posts Archive */}
                    <div>
                        {years.map(year => (
                            <div key={year} style={{ marginBottom: '3rem' }}>
                                <h2 style={{
                                    fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                                    borderBottom: '1px solid var(--border)',
                                    paddingBottom: '1rem',
                                    marginBottom: '1.5rem',
                                    color: 'var(--primary)'
                                }}>{year}</h2>

                                <div style={{ display: 'grid', gap: '0.8rem' }}>
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
                                                padding: '1rem 1.2rem',
                                                borderRadius: '16px',
                                                transition: 'all 0.3s ease'
                                            }}>
                                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                    <span className="archive-date" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', minWidth: '60px' }}>
                                                        {new Date(post.date).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' })}
                                                    </span>
                                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.3 }}>{post.title}</h3>
                                                </div>
                                                <Tag size={16} style={{ opacity: 0.3, flexShrink: 0 }} className="desktop-only" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: PDF Files */}
                    <aside>
                        <div style={{
                            position: 'sticky',
                            top: '120px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                marginBottom: '2rem',
                                borderBottom: '1px solid var(--primary)',
                                paddingBottom: '0.8rem'
                            }}>
                                <FileText size={20} color="var(--primary)" />
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Dosyalar</h2>
                            </div>

                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {files.length === 0 ? (
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>Henüz dosya eklenmemiş.</p>
                                ) : (
                                    files.map((file, idx) => (
                                        <motion.a
                                            key={file.slug}
                                            href={file.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + (idx * 0.1) }}
                                            className="file-item glass"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '1rem',
                                                borderRadius: '16px',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <div style={{ overflow: 'hidden' }}>
                                                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.title}</h4>
                                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{new Date(file.date).toLocaleDateString('tr-TR')}</span>
                                            </div>
                                            <Download size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                                        </motion.a>
                                    ))
                                )}
                            </div>

                            <div className="glass" style={{ marginTop: '2.5rem', padding: '1.5rem', borderRadius: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                <p>Arşivimizdeki bildiriler, raporlar ve yayınlara buradan ulaşabilirsiniz.</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .archive-item:hover, .file-item:hover {
                    border-color: var(--primary);
                    background: rgba(255, 255, 255, 0.08);
                }
                .archive-item:hover {
                    padding-left: 1.5rem !important;
                }
                .archive-item:hover h3, .file-item:hover h4 {
                    color: var(--primary);
                }
                @media (max-width: 992px) {
                    .archive-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
                    aside { position: static !important; }
                    aside div { position: static !important; }
                }
                @media (max-width: 600px) {
                    .desktop-only { display: none; }
                    .archive-item { padding: 0.8rem 1rem !important; }
                    .archive-date { min-width: 55px !important; }
                }
            `}} />
        </div>
    );
}
