import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../lib/content';
import ReactMarkdown from 'react-markdown';
import { ChevronLeft, Calendar, User } from 'lucide-react';

export default function BlogPost() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        getPostBySlug(slug).then(setPost);
    }, [slug]);

    if (!post) return <div style={{ paddingTop: '150px', textAlign: 'center' }}>Yükleniyor...</div>;

    return (
        <article style={{ paddingTop: '120px', paddingBottom: '100px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                    <ChevronLeft size={20} /> Yazılara Dön
                </Link>

                <header style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '2rem' }}>{post.title}</h1>

                    <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={16} /> {new Date(post.date).toLocaleDateString('tr-TR')}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={16} /> {post.author}
                        </div>
                    </div>
                </header>

                {post.image && (
                    <img
                        src={post.image}
                        alt={post.title}
                        style={{ width: '100%', borderRadius: '24px', marginBottom: '3rem', display: 'block' }}
                    />
                )}

                <div className="markdown-content">
                    <ReactMarkdown>{post.body}</ReactMarkdown>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .markdown-content {
          font-size: 1.25rem;
          line-height: 1.8;
          color: #ddd;
        }
        .markdown-content h2 { color: white; margin: 2.5rem 0 1.5rem 0; font-size: 2rem; }
        .markdown-content h3 { color: white; margin: 2rem 0 1rem 0; font-size: 1.5rem; }
        .markdown-content p { margin-bottom: 1.5rem; }
        .markdown-content ul, .markdown-content ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
        .markdown-content li { margin-bottom: 0.5rem; }
        .markdown-content blockquote {
          border-left: 4px solid var(--primary);
          padding-left: 2rem;
          font-style: italic;
          color: var(--text-muted);
          margin: 3rem 0;
        }
      `}} />
        </article>
    );
}
