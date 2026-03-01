import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Haberler from './pages/Haberler';
import Blog from './pages/Blog';
import Arsiv from './pages/Arsiv';
import Hakkimizda from './pages/Hakkimizda';
import Iletisim from './pages/Iletisim';
import BlogPost from './pages/BlogPost';
import YaziGonder from './pages/YaziGonder';

function App() {
  return (
    <Router basename="/isyandayiz-fe">
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/haberler" element={<Haberler />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/arsiv" element={<Arsiv />} />
            <Route path="/hakkimizda" element={<Hakkimizda />} />
            <Route path="/iletisim" element={<Iletisim />} />
            <Route path="/yazi-gonder" element={<YaziGonder />} />
            <Route path="/katil" element={<YaziGonder />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            {/* Fallback for other routes */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <footer style={{ padding: '100px 0 50px 0', borderTop: '1px solid var(--border)', marginTop: '100px' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem' }}>İSYANDAYIZ</h3>
                <p style={{ color: 'var(--text-muted)' }}>Toplumsal dönüşümün öncüsü.</p>
              </div>
              <div>
                <h4 style={{ marginBottom: '1.2rem' }}>Bağlantılar</h4>
                <ul style={{ listStyle: 'none', color: 'var(--text-muted)' }}>
                  <li style={{ marginBottom: '0.8rem' }}><a href="/isyandayiz-fe/haberler">Haberler</a></li>
                  {import.meta.env.DEV && (
                    <li style={{ marginBottom: '0.8rem' }}><a href="http://localhost:5173/admin/index.html">Admin Sayfası</a></li>
                  )}
                  <li style={{ marginBottom: '0.8rem' }}><a href="/isyandayiz-fe/iletisim">İletişim</a></li>
                </ul>
              </div>
              <div>
                <h4 style={{ marginBottom: '1.2rem' }}>Sosyal Medya</h4>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href="#" className="glass" style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>X</a>
                  <a href="#" className="glass" style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>IG</a>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '80px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              &copy; 2024 İSYANDAYIZ Movement. Tüm hakları dayanışmaya aittir.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
