# ✊ İSYANDAYIZ Hareket Sitesi - Yönetim Rehberi

Bu rehber, teknik bilgisi olmayan kullanıcıların **İSYANDAYIZ** web sitesine nasıl içerik (Haber, Blog, Etkinlik) ekleyebileceğini anlatır.

---

## 🚀 Başlarken (İlk Kurulum)

Eğer bilgisayarınızda çalışma ortamı kurulu değilse, sadece bir kez şu adımı yapmanız gerekir:
1. [Node.js](https://nodejs.org/) adresine gidin.
2. **"LTS"** yazan butona tıklayıp indirin ve kurun.

---

## 🖥️ İçerik Nasıl Eklenir? (Yönetim Paneli)

Siteye yazı eklemek veya düzenlemek için şu adımları takip edin:

1. **Başlatma:** Proje klasöründeki `yönetim-panelini-başlat.bat` dosyasına çift tıklayın.
2. **Bekleme:** Karşınıza siyah bir pencere gelecek ve gerekli hazırlıkları yapacaktır. Yaklaşık 10 saniye sonra tarayıcınızda yönetim paneli otomatik olarak açılacaktır.
3. **Kullanım:**
   - **Haberler:** Güncel duyurular ve kısa haberler için.
   - **Blog Yazıları:** Fikir yazıları, analizler ve uzun makaleler için.
   - **Etkinlikler:** Anasayfadaki geri sayım sayacı için.

### 📝 Yeni Yazı Ekleme Kuralları
- **Başlık:** Yazınızın ana başlığı.
- **Yazar:** Kendi adınızı veya "Isyandayiz Merkez" yazabilirsiniz.
- **Tarih:** Yazının yayınlanma tarihi.
- **Öne Çıkan Görsel:** Yazı için bir kapak fotoğrafı seçebilirsiniz.
- **Gövde (Body):** Yazınızın ana metni. Burada kalın yazı veya başlık gibi biçimlendirmeler yapabilirsiniz.

**Önemli:** Yazınızı bitirdiğinizde sağ üstteki **"Publish"** butonuna basmayı unutmayın!

---

## 🎨 Tema (Karanlık/Aydınlık) Modu
Sitenin sağ üst köşesinde bulunan **Güneş/Ay** ikonuna tıklayarak görüntüyü değiştirebilirsiniz. Bu özellik kullanıcıların okuma konforu için eklenmiştir.

---

## 🛠️ Teknik Notlar (Geliştiriciler İçin)
- Bu site **React** ve **Vite** kullanılarak inşa edilmiştir.
- İçerikler `/cms-admin` klasöründeki yapılandırma ile yönetilir ancak içerik dosyaları `/src/content` altında `.md` formatında saklanır.
- **Yayınlama:** Siteyi canlıya almak için `npm run build` komutunu kullanıp `dist` klasörünü sunucunuza yüklemeniz yeterlidir.

---

**Dayanışma yaşatır!** ✊✨
