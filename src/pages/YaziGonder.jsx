import { motion, AnimatePresence } from 'framer-motion';
import { Send, FileText, User, Mail, PenTool, Image as ImageIcon, X, AlignLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { useState, useRef } from 'react';

export default function YaziGonder() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Placeholder for Formspark submission
        // Since we are using files, this would typically be a multipart/form-data POST
        setIsSubmitted(true);
    };

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '80px' }}>
            <SEO
                title="Bize Yazı Gönderin"
                description="Yazılarınızı bizimle paylaşın. Toplumsal dönüşüme kaleminizle katkı sağlayın."
                url="/yazi-gonder"
            />

            <div className="container" style={{ maxWidth: '850px' }}>
                <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '1rem' }}>
                            Bize <span style={{ color: 'var(--primary)' }}>Yazı Gönderin</span>
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                            Yazılarınız yönetici ekibimiz tarafından incelendikten sonra yayına alınacaktır.
                        </p>
                    </motion.div>
                </header>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="glass"
                    style={{ padding: '3rem', borderRadius: '32px' }}
                >
                    {isSubmitted ? (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <div className="glass" style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                background: 'rgba(0, 255, 128, 0.1)',
                                border: '2px solid #00ff80'
                            }}>
                                <Send color="#00ff80" size={40} />
                            </div>
                            <h2 style={{ marginBottom: '1rem' }}>Yazınız Kuyruğa Eklendi!</h2>
                            <p style={{ color: 'var(--text-muted)' }}>
                                Değerli katkınız için teşekkür ederiz. Editörlerimiz yazınızı inceleyip en kısa sürede yayına hazırlayacaktır.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="btn-primary"
                                style={{ marginTop: '2rem', border: 'none', marginInline: 'auto' }}
                            >
                                Yeni Bir Yazı Gönder
                            </button>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            style={{ display: 'grid', gap: '2rem' }}
                        >
                            {/* Section: Author Info */}
                            <div style={{ display: 'grid', gap: '1.2rem' }}>
                                <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>Yazar Bilgileri</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <User size={14} /> Adınız Soyadınız (Yazar)
                                        </label>
                                        <input required type="text" name="author" className="input-field" placeholder="Örn: Deniz Gezmiş" onInvalid={e => e.target.setCustomValidity('Lütfen bu alanı doldurun.')} onInput={e => e.target.setCustomValidity('')} />
                                    </div>
                                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Mail size={14} /> İletişim E-postası
                                        </label>
                                        <input required type="email" name="email" className="input-field" placeholder="email@ornek.com" onInvalid={e => e.target.setCustomValidity('Lütfen geçerli bir e-posta adresi girin.')} onInput={e => e.target.setCustomValidity('')} />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Content Details */}
                            <div style={{ display: 'grid', gap: '1.2rem' }}>
                                <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>Yazı Detayları</h3>

                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <PenTool size={14} /> Yazı Başlığı
                                        </label>
                                        <input required type="text" name="title" className="input-field" placeholder="Yazınızın başlığı" onInvalid={e => e.target.setCustomValidity('Lütfen bu alanı doldurun.')} onInput={e => e.target.setCustomValidity('')} />
                                    </div>

                                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <AlignLeft size={14} /> Kısa Özet (Description)
                                        </label>
                                        <textarea required name="description" rows="2" className="input-field" placeholder="Yazınızı özetleyen bir cümle..." style={{ resize: 'none' }} onInvalid={e => e.target.setCustomValidity('Lütfen bu alanı doldurun.')} onInput={e => e.target.setCustomValidity('')}></textarea>
                                    </div>

                                    {/* Image Upload Area */}
                                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <ImageIcon size={14} /> Kapak Görseli (Opsiyonel)
                                        </label>

                                        <div
                                            onClick={() => !imagePreview && fileInputRef.current.click()}
                                            style={{
                                                border: '2px dashed var(--border)',
                                                borderRadius: '20px',
                                                padding: imagePreview ? '1rem' : '2rem',
                                                textAlign: 'center',
                                                cursor: imagePreview ? 'default' : 'pointer',
                                                transition: 'all 0.3s ease',
                                                background: 'rgba(255, 255, 255, 0.02)',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                minHeight: '120px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            className="upload-zone"
                                        >
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleImageChange}
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                name="image"
                                            />

                                            <AnimatePresence mode="wait">
                                                {imagePreview ? (
                                                    <motion.div
                                                        key="preview"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        style={{ position: 'relative', width: '100%', maxWidth: '400px' }}
                                                    >
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' }}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={(e) => { e.stopPropagation(); removeImage(); }}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '10px',
                                                                right: '10px',
                                                                background: 'rgba(0,0,0,0.6)',
                                                                border: 'none',
                                                                borderRadius: '50%',
                                                                padding: '5px',
                                                                cursor: 'pointer',
                                                                color: 'white'
                                                            }}
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="placeholder"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                    >
                                                        <ImageIcon size={32} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
                                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Görsel seçmek için tıklayın</p>
                                                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>JPG, PNG veya WEBP (Max 5MB)</p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <FileText size={14} /> Yazı İçeriği (Markdown desteklenir)
                                        </label>
                                        <textarea required name="body" rows="12" className="input-field" placeholder="Yazınızı buraya yazabilir veya yapıştırabilirsiniz..." style={{ resize: 'vertical' }} onInvalid={e => e.target.setCustomValidity('Lütfen bu alanı doldurun.')} onInput={e => e.target.setCustomValidity('')}></textarea>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '1rem' }}>
                                <button type="submit" className="btn-primary" style={{ width: '100%', border: 'none', justifyContent: 'center', padding: '1.2rem', fontSize: '1.1rem' }}>
                                    Yazıyı Gönder <Send size={20} style={{ marginLeft: '10px' }} />
                                </button>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.2rem', textAlign: 'center', lineHeight: '1.5' }}>
                                    Yazınız admin onayından geçtikten sonra sitede yayınlanacaktır. <br />
                                    Göndererek kullanım şartlarımızı kabul etmiş sayılırsınız.
                                </p>
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .input-field {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--border);
                    padding: 1rem;
                    border-radius: 16px;
                    color: var(--text-main);
                    font-family: inherit;
                    outline: none;
                    transition: all 0.3s ease;
                    font-size: 1rem;
                    width: 100%;
                }
                .input-field:focus {
                    border-color: var(--primary);
                    background: rgba(255, 255, 255, 0.1);
                    box-shadow: 0 0 20px rgba(212, 0, 255, 0.1);
                }
                .upload-zone:hover {
                    border-color: var(--primary) !important;
                    background: rgba(212, 0, 255, 0.05) !important;
                }
                .btn-primary {
                    background: var(--primary);
                    color: white;
                    padding: 0.8rem 2rem;
                    border-radius: 50px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .btn-primary:hover {
                    opacity: 0.9;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(212, 0, 255, 0.3);
                }
                @media (max-width: 600px) {
                    .glass { padding: 1.5rem !important; }
                }
            `}} />
        </div>
    );
}
