@echo off
title ISYANDAYIZ - Siteyi Yayina Al
color 0B
echo ============================================================
echo.
echo    ISYANDAYIZ SIYASI HAREKETI - YAYINLAMA ARACI
echo.
echo ============================================================
echo.

:: Git kontrolü
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [HATA] Git yuklu degil! Lutfen once Git yukleyin.
    pause
    exit
)

echo [1/3] Degisiklikler paketleniyor...
git add .

echo.
set /p commit_msg="Yaptiginiz degisiklikleri kisaca yazin (bos birakirsaniz 'Guncelleme' yazilir): "
if "%commit_msg%"=="" set commit_msg=Guncelleme

echo.
echo [2/3] Degisiklikler kaydediliyor...
git commit -m "%commit_msg%"

echo.
echo [3/3] Github'a yukleniyor (Internet baglantiniz olmali)...
git push

echo.
if %errorlevel% neq 0 (
    echo [HATA] Yukleme sirasinda bir sorun olustu. 
    echo Lutfen internet baglantinizi kontrol edin veya giris yaptiginizdan emin olun.
) else (
    echo ============================================================
    echo    ISLEM BASARIYLA TAMAMLANDI!
    echo    Degisiklikleriniz Github'a gonderildi. 
    echo    Birkaç dakika icinde site guncellenecektir.
    echo ============================================================
)

echo.
pause
