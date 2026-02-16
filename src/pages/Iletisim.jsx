import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import SEO from '../components/SEO';

export default function Iletisim() {
    return (
        <div style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '100px' }}>
            <SEO title="İletişim" description="Femsol ile iletişime geçin. Dayanışmaya katılmak, soru sormak veya öneride bulunmak için bize yazın." url="/iletisim" />
            <div className="container">
                <header style={{ marginBottom: '5rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Bize <span style={{ color: 'var(--primary)' }}>Ulaşın</span></h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        Dayanışmayı büyütmek için sorularınız, önerileriniz veya katılım taleplerinizle ilgili bize yazabilirsiniz.
                    </p>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem'
                }}>
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>İletişim Bilgilerimiz</h2>
                        <div style={{ display: 'grid', gap: '2rem' }}>
                            {[
                                { icon: <Mail color="var(--primary)" />, title: 'E-posta', val: 'merkez@femsol.org' },
                                { icon: <Phone color="var(--primary)" />, title: 'Telefon', val: '+90 212 XXX XX XX' },
                                { icon: <MapPin color="var(--primary)" />, title: 'Merkez', val: 'Kadıköy, İstanbul' }
                            ].map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div className="glass" style={{ width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.title}</h4>
                                        <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{item.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '4rem' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Bizi Takip Edin</h3>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {['TW', 'IG', 'FB', 'YT'].map(social => (
                                    <a href="#" key={social} className="glass" style={{ width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{social}</a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="glass"
                        style={{ padding: '3rem', borderRadius: '32px' }}
                    >
                        <form style={{ display: 'grid', gap: '1.5rem' }} onSubmit={e => e.preventDefault()}>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Adınız Soyadınız</label>
                                <input type="text" className="input-field" placeholder="Örn: Ayşe Yılmaz" />
                            </div>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>E-posta Adresiniz</label>
                                <input type="email" className="input-field" placeholder="email@ornek.com" />
                            </div>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Mesajınız</label>
                                <textarea rows="5" className="input-field" placeholder="Bize nasıl katılmak istersiniz?" style={{ resize: 'none' }}></textarea>
                            </div>
                            <button className="btn-primary" style={{ width: '100%', marginTop: '1rem', border: 'none' }}>
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
                    padding: 1rem;
                    border-radius: 12px;
                    color: white;
                    font-family: inherit;
                    outline: none;
                    transition: all 0.3s ease;
                }
                .input-field:focus {
                    border-color: var(--primary);
                    background: rgba(255, 255, 255, 0.1);
                }
            `}} />
        </div>
    );
}
