import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../lib/content';
import ReactMarkdown from 'react-markdown';
import { ChevronLeft, Calendar, User } from 'lucide-react';
import SEO from '../components/SEO';

export default function BlogPost() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        getPostBySlug(slug).then(setPost);
    }, [slug]);

    if (!post) return <div style={{ paddingTop: '150px', textAlign: 'center' }}>Yükleniyor...</div>;

    return (
        <article style={{ paddingTop: '100px', paddingBottom: '80px' }}>
            <SEO
                title={post.title}
                description={post.description}
                image={post.image}
                url={`/blog/${slug}`}
            />
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <ChevronLeft size={18} /> Yazılara Dön
                </Link>

                <header style={{ marginBottom: '2.5rem' }}>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>{post.title}</h1>

                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Calendar size={14} /> {new Date(post.date).toLocaleDateString('tr-TR')}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <User size={14} /> {post.author}
                        </div>
                    </div>

                    {Array.isArray(post.tags) && (
                        <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                            {post.tags.map(tag => (
                                <Link
                                    key={tag}
                                    to={post.type === 'blog' ? '/blog' : '/haberler'}
                                    style={{
                                        color: post.type === 'blog' ? 'var(--primary)' : 'var(--secondary)',
                                        fontSize: '0.9rem',
                                        fontWeight: 700,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.2rem'
                                    }}
                                >
                                    #{tag}
                                </Link>
                            ))}
                        </div>
                    )}
                </header>

                {post.image && (
                    <img
                        src={post.image}
                        alt={post.title}
                        style={{ width: '100%', borderRadius: '20px', marginBottom: '2.5rem', display: 'block', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                    />
                )}

                <div className="markdown-content">
                    <ReactMarkdown>{post.body}</ReactMarkdown>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .markdown-content {
          font-size: 1.15rem;
          line-height: 1.7;
          color: var(--text-main);
        }
        .markdown-content h2 { color: var(--text-main); margin: 2.5rem 0 1.2rem 0; font-size: 1.8rem; }
        .markdown-content h3 { color: var(--text-main); margin: 2rem 0 1rem 0; font-size: 1.4rem; }
        .markdown-content p { margin-bottom: 1.5rem; opacity: 0.9; }
        .markdown-content ul, .markdown-content ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
        .markdown-content li { margin-bottom: 0.5rem; }
        .markdown-content blockquote {
          border-left: 4px solid var(--primary);
          padding: 1.5rem 2rem;
          font-style: italic;
          color: var(--text-muted);
          margin: 2.5rem 0;
          background: var(--glass);
          border-radius: 0 16px 16px 0;
        }
        @media (max-width: 768px) {
            .markdown-content { font-size: 1.1rem; }
            .markdown-content h2 { font-size: 1.6rem; }
            .markdown-content blockquote { padding: 1.2rem 1.5rem; }
        }
      `}} />
        </article>
    );
}
