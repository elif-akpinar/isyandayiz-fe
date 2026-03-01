# ✊ İSYANDAYIZ Web Sitesi Kurulum ve Yönetim Rehberi

Bu rehber, teknik bilgisi olmayan birinin projeyi bilgisayarına yüklemesi, çalıştırması ve içerik eklemesi için hazırlanmıştır. Aşağıdaki adımları takip ederek her şeyi tek tıkla halledebilirsiniz.

---

## 🛠️ 1. Hazırlık (Lütfen Sadece Bir Kez Yapın)

### A) Programları Kurun
Siteyi çalıştırabilmek için bilgisayarınızda şu iki programın olması gerekir:
1.  **Node.js:** [Buradan indirin](https://nodejs.org/). (Sol taraftaki **"LTS"** yazan yeşil butona tıklayıp kurun.)
2.  **Git:** [Buradan indirin](https://git-scm.com/downloads). (Windows yazana tıklayıp kurun.)

### B) Git Ayarlarını Yapın
GitHub'a yükleme yapabilmek için terminali (siyah ekranı) açın ve şu iki komutu kendi bilgilerinizle yazın:
```bash
git config --global user.name "Adınız Soyadınız"
git config --global user.email "email@adresiniz.com"
```

---

## 📥 2. Projeyi Bilgisayarınıza İndirme (Clone)

Eğer proje dosyaları henüz bilgisayarınızda değilse, bir klasör açın ve terminale şunu yazın:
```bash
git clone https://github.com/KULLANICI_ADINIZ/isyandayiz-fe.git
```
*(Not: `KULLANICI_ADINIZ` kısmını kendi GitHub kullanıcı adınızla değiştirin.)*

---

## 🚀 3. Siteyi ve Yönetim Panelini Başlatma

Kurulumlardan sonra tek yapmanız gereken şudur:
1.  Proje klasörünün içindeki **`yönetim-panelini-başlat.bat`** dosyasına çift tıklayın.
2.  **Bekleyin:** Siyah bir pencere açılacak ve gerekli tüm ayarları otomatik yapacaktır.
3.  **Keyfini Çıkarın:** Sistem hazır olduğunda tarayıcınızda site otomatik açılacaktır.

---

## 📝 4. Yazı ve Haber Ekleme

Panel açıldığında:
1.  Soldaki menüden **Blog Yazıları**, **Haberler** veya **Etkinlikler** kısmına girin.
2.  **"New Entry"** diyerek yeni içeriğinizi oluşturun.
3.  Bitirdiğinizde sağ üstteki **"Publish"** butonuna basarak kaydedin.

---

## 🌎 5. Yaptığınız Değişiklikleri İnternete Yükleme

Değişikliklerin canlı sitede görünmesi için:
1.  **`yayınla.bat`** dosyasına çift tıklayın.
2.  Ekrana ne yaptığınızı yazıp Enter'a basın (Örn: "Yazı eklendi").
3.  İşlem bitince siteniz birkaç dakika içinde güncellenecektir.

---

## 🔗 Önemli Adresler

Site bilgisayarınızda çalışırken şu adresleri kullanabilirsiniz:
-   **Canlı Önizleme (Localhost):** [http://localhost:5173](http://localhost:5173)
-   **Yönetim Paneli (Admin):** [http://localhost:5173/admin/index.html](http://localhost:5173/admin/index.html)

---

## ⚠️ Dikkat Edilmesi Gerekenler
- `yönetim-panelini-başlat.bat` ile açılan **siyah pencereleri kapatmayın**. Kapatırsanız site bağlantısı kopar.
- İşiniz bittiğinde pencereleri çarpıdan kapatabilirsiniz.

---

## 🛠️ Geliştiriciler İçin Komutlar
- Kurulum: `npm install`
- Başlatma: `npm run dev`
- CMS Sunucusu: `npx decap-server`