import { motion } from 'framer-motion';
import { Target, Heart, Globe } from 'lucide-react';
import SEO from '../components/SEO';

export default function Hakkimizda() {
    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '80px' }}>
            <SEO title="Hakkımızda" description="Isyandayiz'un misyonu, vizyonu ve toplumsal dönüşüm için savunduğu temel değerler." url="/hakkimizda" />
            <div className="container">
                <header style={{ marginBottom: '4rem', textAlign: 'center' }} className="page-header">
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '1rem' }}>Biz <span style={{ color: 'var(--primary)' }}>Kimiz?</span></h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
                        Isyandayiz, sadece bir isim değil; eşitlik ve adalet için atan milyonlarca kalbin ortak sesidir.
                    </p>
                </header>

                <div className="about-grid" style={{ display: 'grid', gap: '5rem' }}>
                    {/* Mission Section */}
                    <div className="mission-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                                <Target size={30} />
                                <span style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Misyonumuz</span>
                            </div>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '1.5rem', lineHeight: 1.2 }}>Eşitliğin Estetiği ve Gücü</h2>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                                Toplumsal hiyerarşilerin yıkıldığı, her bireyin emeğinin ve kimliğinin değer gördüğü bir dünya inşa etmek.
                                Isyandayiz olarak, radikal dönüşümü teoriden pratiğe dökmek için örgütleniyoruz.
                                Politikamızı sokaktan, gücümüzü dayanışmadan alıyoruz.
                            </p>
                        </motion.div>
                        <div className="glass mission-bg" style={{ aspectRatio: '1/1', borderRadius: '40px', background: 'linear-gradient(45deg, var(--primary), var(--secondary))', opacity: 0.1 }}></div>
                    </div>

                    {/* Values Section */}
                    <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { icon: <Heart size={40} color="var(--primary)" />, title: 'Ücretsiz Emek', desc: 'Ev içi emeğin görünür kılınması ve toplumsallaştırılması için mücadele ediyoruz.' },
                            { icon: <Globe size={40} color="var(--secondary)" />, title: 'Ekoloji', desc: 'Doğanın sömürülmesine karşı, yaşamın savunucusuyuz.' },
                            { icon: <Target size={40} color="var(--accent)" />, title: 'Bağımsızlık', desc: 'Hiçbir sermaye grubuna veya kurumsal yapıya bağlı kalmadan, sadece tabanın gücüyle hareket ediyoruz.' }
                        ].map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass"
                                style={{ padding: '2.5rem', borderRadius: '24px' }}
                            >
                                <div style={{ marginBottom: '1.5rem' }}>{v.icon}</div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{v.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 768px) {
                    .mission-bg { display: none; }
                    .about-grid { gap: 4rem !important; }
                    .page-header { margin-bottom: 3rem !important; }
                }
            `}} />
        </div>
    );
}
