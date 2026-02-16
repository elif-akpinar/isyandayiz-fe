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
            setLatestPosts(posts.slice(0, 10));
            setHeroPosts(posts.slice(0, 5));
        });
    }, []);

    return (
        <div style={{ paddingTop: '80px' }}>
            <SEO />
            <EventCountdown />
            {/* Hero Carousel Section */}
            <section style={{
                height: '85vh',
                minHeight: '600px',
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
                                    filter: 'brightness(0.4)',
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
                                            FEMSOL
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
                                    >
                                        <span className="glass" style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '50px',
                                            fontSize: '0.8rem',
                                            fontWeight: 700,
                                            color: 'var(--primary)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            display: 'inline-block',
                                            marginBottom: '1.5rem'
                                        }}>
                                            Öne Çıkan Yazı
                                        </span>
                                        <h1 style={{
                                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                                            lineHeight: 1.1,
                                            fontWeight: 800,
                                            marginBottom: '1.5rem',
                                            maxWidth: '900px'
                                        }}>
                                            {post.title}
                                        </h1>
                                        <p style={{
                                            fontSize: '1.2rem',
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
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem'
                }}>
                    <button onClick={scrollPrev} className="carousel-btn">
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

                    <button onClick={scrollNext} className="carousel-btn">
                        <ArrowRight size={24} />
                    </button>
                </div>
            </section>

            {/* Latest Posts Section */}
            <section style={{ padding: '100px 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
                        <div>
                            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Son <span style={{ color: 'var(--primary)' }}>Yazılar</span></h2>
                            <p style={{ color: 'var(--text-muted)' }}>Hareketimizden en güncel haberler ve makaleler.</p>
                        </div>
                        <Link to="/blog" style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Tümünü Gör <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {latestPosts.map((post, idx) => (
                            <motion.article
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="home-blog-card glass"
                                style={{ borderRadius: '20px', overflow: 'hidden' }}
                            >
                                <Link to={`/blog/${post.slug}`}>
                                    <div style={{ aspectRatio: '16/9', background: '#222', position: 'relative' }}>
                                        {post.image ? (
                                            <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '2rem', fontWeight: 800 }}>
                                                FEMSOL
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                                            <Calendar size={14} />
                                            {new Date(post.date).toLocaleDateString('tr-TR')}
                                        </div>
                                        <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', lineHeight: 1.3 }}>{post.title}</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {post.description}
                                        </p>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
        .btn-primary {
          background: var(--primary);
          color: white;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-weight: 700;
          box-shadow: 0 10px 30px var(--primary-glow);
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
        }
        .btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 40px var(--primary-glow);
        }
        .home-blog-card {
          transition: all 0.4s ease;
        }
        .home-blog-card:hover {
          transform: translateY(-10px);
          border-color: var(--primary);
        }
        .carousel-btn {
            background: rgba(255,255,255,0.1);
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            alignItems: center;
            justifyContent: center;
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
      `}} />
        </div>
    );
}
