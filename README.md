# ✊ İSYANDAYIZ Web Sitesi Kurulum ve Yönetim Rehberi

Bu rehber, teknik bilgisi olmayan birinin projeyi bilgisayarına yüklemesi, çalıştırması ve içerik eklemesi için hazırlanmıştır. Aşağıdaki adımları takip ederek her şeyi tek tıkla halledebilirsiniz.

---

## 🛠️ 1. Hazırlık (Lütfen Sadece Bir Kez Yapın)

Siteyi çalıştırabilmek için bilgisayarınızda şu iki programın olması gerekir:

1.  **Node.js:** [Buradan indirin](https://nodejs.org/). (Sol taraftaki **"LTS"** yazan yeşil butona tıklayıp kurun.)
2.  **Git:** [Buradan indirin](https://git-scm.com/downloads). (Windows yazana tıklayıp kurun.)

*(Not: Kurulum sırasında çıkan tüm seçeneklere sadece "İleri/Next" diyerek onay verebilirsiniz.)*

---

## 🚀 2. Siteyi ve Yönetim Panelini Başlatma

Kurulumlardan sonra tek yapmanız gereken şudur:

1.  Proje klasörünün içindeki **`yönetim-panelini-başlat.bat`** dosyasına çift tıklayın.
2.  **Bekleyin:** Siyah bir pencere açılacak ve gerekli tüm ayarları otomatik yapacaktır. (Eğer ilk kez açıyorsanız, kütüphaneleri yükleyeceği için 1-2 dakika sürebilir.)
3.  **Keyfini Çıkarın:** Yaklaşık 10 saniye sonra hem web siteniz hem de yazı ekleme paneliniz tarayıcıda otomatik olarak açılacaktır.

---

## 📝 3. Yazı ve Haber Ekleme

Panel açıldığında (Content Manager yazan sayfa):

1.  Sol menüden ne eklemek istediğinizi seçin (**Blog Yazıları**, **Haberler** veya **Etkinlikler**).
2.  **"New Entry"** butonuna basarak yeni içeriğinizi yazın.
3.  Sağ üstteki **"Publish"** butonuna basarak kaydetmeyi unutmayın.

---

## 🌎 4. Yaptığınız Değişiklikleri İnternete Yükleme

Sitede bir yazı ekledikten veya bir hata düzelttikten sonra bu değişiklikleri herkesin görmesi için GitHub'a göndermeniz gerekir:

1.  Proje klasöründeki **`yayınla.bat`** dosyasına çift tıklayın.
2.  **Mesaj Yazın:** Ekran size ne yaptığınızı soracaktır (Örn: "Yeni haber eklendi"). Yazıp Enter'a basın.
3.  **Bitti:** Dosyalarınız otomatik olarak GitHub'a yüklenecektir. Birkaç dakika içinde siteniz otomatik olarak güncellenir.

---

## ⚠️ Dikkat Edilmesi Gerekenler
- `yönetim-panelini-başlat.bat` dosyasını çalıştırdığınızda açılan **siyah pencereleri kapatmayın**. Bu pencereler sitenin arka plandaki motorudur. Onları kapatırsanız site de kapanır.
- İşiniz bittiğinde o pencereleri normal bir şekilde çarpıdan kapatabilirsiniz.

---

## 🛠️ Geliştiriciler İçin Komutlar
Eğer manuel olarak çalıştırmak isterseniz:
- Kurulum: `npm install`
- Başlatma: `npm run dev`
- CMS Veri Sunucusu: `npx decap-server`