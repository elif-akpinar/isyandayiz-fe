import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import SEO from '../components/SEO';

export default function Iletisim() {
    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '80px' }}>
            <SEO title="İletişim" description="Isyandayiz ile iletişime geçin. Dayanışmaya katılmak, soru sormak veya öneride bulunmak için bize yazın." url="/iletisim" />
            <div className="container">
                <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '1rem' }}>Bize <span style={{ color: 'var(--primary)' }}>Ulaşın</span></h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Dayanışmayı büyütmek için sorularınız, önerileriniz veya katılım taleplerinizle ilgili bize yazabilirsiniz.
                    </p>
                </header>

                <div className="contact-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '3rem'
                }}>
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>İletişim Bilgilerimiz</h2>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {[
                                { icon: <Mail color="var(--primary)" />, title: 'E-posta', val: 'merkez@isyandayiz.org' },
                                { icon: <Phone color="var(--primary)" />, title: 'Telefon', val: '+90 212 XXX XX XX' },
                                { icon: <MapPin color="var(--primary)" />, title: 'Merkez', val: 'Kadıköy, İstanbul' }
                            ].map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div className="glass" style={{ width: '45px', height: '45px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.title}</h4>
                                        <p style={{ fontSize: '1rem', fontWeight: 600 }}>{item.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '3rem' }}>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Bizi Takip Edin</h3>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {['TW', 'IG', 'FB', 'YT'].map(social => (
                                    <a href="#" key={social} className="glass" style={{ width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>{social}</a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="glass contact-form-card"
                        style={{ padding: '2.5rem', borderRadius: '32px' }}
                    >
                        <form style={{ display: 'grid', gap: '1.2rem' }} onSubmit={e => e.preventDefault()}>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Adınız Soyadınız</label>
                                <input type="text" className="input-field" placeholder="Örn: Ayşe Yılmaz" />
                            </div>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>E-posta Adresiniz</label>
                                <input type="email" className="input-field" placeholder="email@ornek.com" />
                            </div>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mesajınız</label>
                                <textarea rows="5" className="input-field" placeholder="Bize nasıl katılmak istersiniz?" style={{ resize: 'none' }}></textarea>
                            </div>
                            <button className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', border: 'none', justifyContent: 'center' }}>
                                Gönder <Send size={18} style={{ marginLeft: '10px' }} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .input-field {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--border);
                    padding: 0.8rem 1rem;
                    border-radius: 12px;
                    color: white;
                    font-family: inherit;
                    outline: none;
                    transition: all 0.3s ease;
                    font-size: 0.95rem;
                }
                .input-field:focus {
                    border-color: var(--primary);
                    background: rgba(255, 255, 255, 0.1);
                }
                @media (max-width: 768px) {
                    .contact-form-card { padding: 1.5rem !important; }
                }
            `}} />
        </div>
    );
}
