import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '1rem 0', background: 'var(--nav-bg)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-1px', color: 'var(--primary)' }}>
                    FEM<span style={{ color: 'var(--text-main)' }}>SOL</span>
                </Link>

                {/* Desktop Menu */}
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-menu">
                    <Link to="/" className="nav-link">Anasayfa</Link>
                    <Link to="/haberler" className="nav-link">Haberler</Link>
                    <Link to="/blog" className="nav-link">Blog</Link>
                    <Link to="/arsiv" className="nav-link">Arşiv</Link>
                    <Link to="/hakkimizda" className="nav-link">Hakkımızda</Link>
                    <Link to="/iletisim" className="nav-link">İletişim</Link>

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
                    <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
                        {isOpen ? <X /> : <Menu />}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .nav-link { font-weight: 500; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
        .nav-link:hover { color: var(--primary); }
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
      `}} />
        </nav>
    );
}
