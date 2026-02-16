import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getEvents } from '../lib/content';

export default function EventCountdown() {
    const [event, setEvent] = useState(null);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        getEvents().then(events => {
            if (events && events.length > 0) {
                // Get the most recent non-expired event
                const validEvents = events.filter(e => {
                    const eventDate = new Date(e.eventDate);
                    const now = new Date();
                    const oneDayAfter = new Date(eventDate.getTime() + 24 * 60 * 60 * 1000);
                    return now <= oneDayAfter;
                });

                if (validEvents.length > 0) {
                    setEvent(validEvents[0]);
                }
            }
        });
    }, []);

    useEffect(() => {
        if (!event) return;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(event.eventDate).getTime();
            const difference = target - now;

            if (difference < 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                // Check if more than 1 day passed
                const oneDayInMs = 24 * 60 * 60 * 1000;
                if (Math.abs(difference) > oneDayInMs) {
                    setEvent(null);
                }
            } else {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [event]);

    if (!event || !isVisible) return null;

    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '33vh', opacity: 1 }}
            style={{
                background: 'var(--bg-card)',
                position: 'relative',
                overflow: 'hidden',
                borderBottom: '1px solid var(--primary)',
                display: 'flex',
                alignItems: 'center',
                minHeight: '280px'
            }}
        >
            {/* Animated Background Gradients */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-20%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                opacity: 0.15,
                filter: 'blur(100px)',
                zIndex: 1
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                <div style={{ display: 'none' }} className="mobile-only-header">
                    <span style={{ color: 'var(--primary)', fontWeight: 800 }}>ETKİNLİK DUYURUSU</span>
                </div>

                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h4 style={{ color: 'var(--primary)', fontWeight: 800, letterSpacing: '2px', marginBottom: '1rem', fontSize: '0.9rem' }}>GELECEK ETKİNLİK</h4>
                        <h2 style={{ fontSize: '2.5rem', lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--text-main)' }}>{event.title}</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '500px' }}>{event.description}</p>

                        <Link to={`/blog/${event.blogSlug}`} className="btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}>
                            Detayları Gör <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                        </Link>
                    </motion.div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                        {[
                            { label: 'GÜN', val: timeLeft.days },
                            { label: 'SAAT', val: timeLeft.hours },
                            { label: 'DAKIKA', val: timeLeft.minutes },
                            { label: 'SANIYE', val: timeLeft.seconds }
                        ].map((unit, i) => (
                            <motion.div
                                key={unit.label}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                                style={{
                                    background: 'var(--glass)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    minWidth: '100px',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
                                    {String(unit.val).padStart(2, '0')}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontWeight: 700, letterSpacing: '1px' }}>
                                    {unit.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={() => setIsVisible(false)}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'none',
                    color: 'var(--text-muted)',
                    zIndex: 20
                }}
            >
                <X size={24} />
            </button>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 992px) {
                    .container { grid-template-columns: 1fr !important; gap: 2rem !important; }
                    .mobile-only-header { display: block !important; }
                    h2 { fontSize: 1.8rem !important; }
                }
            `}} />
        </motion.div>
    );
}
