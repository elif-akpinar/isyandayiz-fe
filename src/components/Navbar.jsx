import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const navLinks = [
        { name: 'Anasayfa', path: '/' },
        { name: 'Haberler', path: '/haberler' },
        { name: 'Blog', path: '/blog' },
        { name: 'Arşiv', path: '/arsiv' },
        { name: 'Hakkımızda', path: '/hakkimizda' },
        { name: 'İletişim', path: '/iletisim' },
    ];

    return (
        <nav className="glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '1rem 0', background: 'var(--nav-bg)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-1px', color: 'var(--primary)' }} onClick={() => setIsOpen(false)}>
                    FEM<span style={{ color: 'var(--text-main)' }}>SOL</span>
                </Link>

                {/* Desktop Menu */}
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-menu">
                    {navLinks.map(link => (
                        <Link key={link.path} to={link.path} className="nav-link">{link.name}</Link>
                    ))}

                    <button onClick={toggleTheme} className="glass" style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <Link to="/katil" className="glass" style={{ padding: '0.5rem 1.5rem', borderRadius: '50px', border: '1px solid var(--primary)', color: 'var(--primary)', fontWeight: 700 }}>Katıl</Link>
                </div>

                {/* Mobile Controls */}
                <div className="mobile-controls" style={{ display: 'none', gap: '1rem', alignItems: 'center' }}>
                    <button onClick={toggleTheme} className="glass" style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', color: 'var(--text-main)', zIndex: 1100 }}>
                        {isOpen ? <X size={30} /> : <Menu size={30} />}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '85%',
                            maxWidth: '320px',
                            background: theme === 'dark' ? '#000000' : '#ffffff',
                            opacity: 1,
                            zIndex: 1050,
                            padding: '100px 2.5rem 2rem 2.5rem',
                            boxShadow: '-10px 0 50px rgba(0,0,0,0.8)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2.5rem',
                            borderLeft: '1px solid var(--border)'
                        }}
                    >
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 700,
                                    color: 'var(--text-main)',
                                    display: 'block',
                                    padding: '0.5rem 0'
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/katil"
                            onClick={() => setIsOpen(false)}
                            className="glass"
                            style={{
                                padding: '1.2rem',
                                borderRadius: '16px',
                                textAlign: 'center',
                                border: '2px solid var(--primary)',
                                color: 'var(--primary)',
                                fontWeight: 800,
                                marginTop: '1.5rem',
                                background: 'rgba(212, 0, 255, 0.05)'
                            }}
                        >
                            KATIL BİZE
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(5px)',
                            zIndex: 1040
                        }}
                    />
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{
                __html: `
        .nav-link { font-weight: 500; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
        .nav-link:hover { color: var(--primary); }
        @media (max-width: 992px) {
          .desktop-menu { display: none !important; }
          .mobile-controls { display: flex !important; }
          
          /* Force solid background on mobile for better visibility */
          nav.glass { 
            background: ${theme === 'dark' ? '#0a0a0a' : '#ffffff'} !important;
            backdrop-filter: none !important;
            border-bottom: 1px solid var(--border) !important;
          }
        }
      `}} />
        </nav>
    );
}
