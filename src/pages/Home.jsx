import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, User, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPosts, getEvents } from '../lib/content';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import EventCountdown from '../components/EventCountdown';
import SEO from '../components/SEO';

export default function Home() {
    const [latestPosts, setLatestPosts] = useState([]);
    const [heroPosts, setHeroPosts] = useState([]);

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
    }, [emblaApi, onSelect]);

    useEffect(() => {
        getPosts().then(posts => {
            setLatestPosts(posts);
            setHeroPosts(posts.slice(0, 5));
        });
    }, []);

    const blogPosts = latestPosts.filter(p => p.type === 'blog').slice(0, 4);
    const newsPosts = latestPosts.filter(p => p.type === 'haber').slice(0, 4);

    return (
        <div style={{ paddingTop: '80px' }}>
            <SEO />
            <EventCountdown />
            {/* Hero Carousel Section */}
            <section style={{
                height: '85vh',
                minHeight: '500px',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#000'
            }}>
                <div className="embla" ref={emblaRef} style={{ height: '100%' }}>
                    <div className="embla__container" style={{ display: 'flex', height: '100%' }}>
                        {heroPosts.map((post, idx) => (
                            <div key={post.slug} className="embla__slide" style={{
                                flex: '0 0 100%',
                                position: 'relative',
                                height: '100%'
                            }}>
                                {/* Background Image with Overlay */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundImage: post.image ? `url(${post.image})` : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    filter: 'brightness(0.3)',
                                    zIndex: 1
                                }}>
                                    {!post.image && (
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '15vw',
                                            fontWeight: 900,
                                            color: 'rgba(212, 0, 255, 0.05)',
                                            letterSpacing: '-10px'
                                        }}>
                                            İSYANDAYIZ
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="container" style={{
                                    position: 'relative',
                                    zIndex: 10,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: selectedIndex === idx ? 1 : 0, y: selectedIndex === idx ? 0 : 30 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="hero-content"
                                    >
                                        <span className="glass" style={{
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '50px',
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                            color: 'var(--primary)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            display: 'inline-block',
                                            marginBottom: '1rem'
                                        }}>
                                            Öne Çıkan Yazı
                                        </span>
                                        <h1 className="hero-title" style={{
                                            fontSize: 'clamp(2rem, 8vw, 4.5rem)',
                                            lineHeight: 1.1,
                                            fontWeight: 800,
                                            marginBottom: '1.5rem',
                                            maxWidth: '900px'
                                        }}>
                                            {post.title}
                                        </h1>
                                        <p className="hero-desc" style={{
                                            fontSize: '1.1rem',
                                            maxWidth: '600px',
                                            color: '#ccc',
                                            marginBottom: '2.5rem',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {post.description}
                                        </p>
                                        <Link to={`/blog/${post.slug}`} className="btn-primary">
                                            Okumaya Devam Et <ChevronRight size={18} style={{ marginLeft: '5px' }} />
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Carousel Controls */}
                <div className="carousel-controls" style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem'
                }}>
                    <button onClick={scrollPrev} className="carousel-btn desktop-only">
                        <ArrowLeft size={24} />
                    </button>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {heroPosts.map((_, i) => (
                            <div key={i} style={{
                                width: selectedIndex === i ? '30px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                background: selectedIndex === i ? 'var(--primary)' : 'rgba(255,255,255,0.3)',
                                transition: 'all 0.3s ease'
                            }} />
                        ))}
                    </div>

                    <button onClick={scrollNext} className="carousel-btn desktop-only">
                        <ArrowRight size={24} />
                    </button>
                </div>
            </section>

            {/* Latest Posts Section split into two columns */}
            <section style={{ padding: '80px 0' }} className="latest-posts">
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
                        gap: '4rem'
                    }} className="split-grid">

                        {/* Blog Column */}
                        <div>
                            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                                <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>Fikirler & <span style={{ color: 'var(--primary)' }}>Yazılar</span></h2>
                                <Link to="/blog" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>Tümünü Gör</Link>
                            </div>

                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {blogPosts.map((post, idx) => (
                                    <motion.article
                                        key={post.slug}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="home-blog-card glass"
                                        style={{ borderRadius: '20px', overflow: 'hidden', display: 'flex', gap: '1rem', padding: '1rem' }}
                                    >
                                        <Link to={`/blog/${post.slug}`} style={{ display: 'flex', gap: '1.2rem', width: '100%', alignItems: 'center' }}>
                                            <div style={{ width: '120px', height: '80px', flexShrink: 0, borderRadius: '12px', overflow: 'hidden', background: '#222' }}>
                                                {post.image ? (
                                                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '1rem', fontWeight: 800 }}>İSY</div>
                                                )}
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.3rem' }}>
                                                    {new Date(post.date).toLocaleDateString('tr-TR')}
                                                </div>
                                                <h3 style={{ fontSize: '1.1rem', lineHeight: 1.3, marginBottom: '0.4rem' }}>{post.title}</h3>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                    {post.description}
                                                </p>
                                            </div>
                                        </Link>
                                    </motion.article>
                                ))}
                            </div>
                        </div>

                        {/* News Column */}
                        <div>
                            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                                <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>Hareketten <span style={{ color: 'var(--secondary)' }}>Haberler</span></h2>
                                <Link to="/haberler" style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '0.9rem' }}>Tümünü Gör</Link>
                            </div>

                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {newsPosts.map((post, idx) => (
                                    <motion.article
                                        key={post.slug}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="home-blog-card glass"
                                        style={{ borderRadius: '20px', overflow: 'hidden', display: 'flex', gap: '1rem', padding: '1rem' }}
                                    >
                                        <Link to={`/blog/${post.slug}`} style={{ display: 'flex', gap: '1.2rem', width: '100%', alignItems: 'center' }}>
                                            <div style={{ width: '120px', height: '80px', flexShrink: 0, borderRadius: '12px', overflow: 'hidden', background: '#222' }}>
                                                {post.image ? (
                                                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '1rem', fontWeight: 800 }}>İSY</div>
                                                )}
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 600, marginBottom: '0.3rem' }}>
                                                    {new Date(post.date).toLocaleDateString('tr-TR')}
                                                </div>
                                                <h3 style={{ fontSize: '1.1rem', lineHeight: 1.3, marginBottom: '0.4rem' }}>{post.title}</h3>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                    {post.description}
                                                </p>
                                            </div>
                                        </Link>
                                    </motion.article>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
        .btn-primary {
          background: var(--primary);
          color: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 700;
          box-shadow: 0 10px 30px var(--primary-glow);
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          font-size: 0.9rem;
        }
        .btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 40px var(--primary-glow);
        }
        .home-blog-card {
          transition: all 0.4s ease;
        }
        .home-blog-card:hover {
          transform: translateY(-8px);
          border-color: var(--primary);
        }
        .carousel-btn {
            background: rgba(255,255,255,0.1);
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
            transition: all 0.3s ease;
        }
        .carousel-btn:hover {
            background: var(--primary);
            border-color: var(--primary);
        }
        .embla { overflow: hidden; }
        .embla__container { display: flex; }
        .embla__slide { flex: 0 0 100%; min-width: 0; }

        @media (max-width: 992px) {
            .split-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        @media (max-width: 768px) {
            .desktop-only { display: none !important; }
            .mobile-only { display: block !important; }
            .section-header { flex-direction: row !important; align-items: center !important; }
            .latest-posts { padding: 40px 0 !important; }
            .hero-desc { font-size: 1rem !important; margin-bottom: 2rem !important; }
            .btn-primary { padding: 0.8rem 1.5rem !important; width: 100%; border: none; justify-content: center; }
            .hero-content { text-align: center; }
            .hero-title { margin-left: auto; margin-right: auto; }
            .hero-desc { margin-left: auto; margin-right: auto; }
            .home-blog-card { padding: 0.8rem !important; }
            .home-blog-card a { gap: 0.8rem !important; }
            .home-blog-card img, .home-blog-card div:first-child { width: 80px !important; height: 60px !important; }
            .home-blog-card h3 { font-size: 1rem !important; }
        }
      `}} />
        </div>
    );
}
