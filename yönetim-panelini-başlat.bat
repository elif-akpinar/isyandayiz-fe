@echo off
title ISYANDAYIZ Admin Panel Baslatici
color 0D
echo ============================================================
echo.
echo    ISYANDAYIZ SIYASI HAREKETI - ICERIK YONETIM PANELI
echo.
echo ============================================================
echo.

:: Node.js kontrolü
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [HATA] Node.js yuklu degil! Lutfen once Node.js yukleyin.
    pause
    exit
)

:: Modül kontrolü
if not exist "node_modules\" (
    echo [BILGI] Ilk kurulum yapiliyor, lutfen bekleyin...
    call npm install
)

echo [1/3] CMS Veri Sunucusu baslatiliyor...
start "ISYANDAYIZ-CMS-Proxy" npx decap-server

echo [2/3] Web Tasarim Sunucusu baslatiliyor...
start "ISYANDAYIZ-Web-Sunucusu" npm run dev

echo.
echo [LUTFEN BEKLEYIN] Sistem hazirlaniyor (7 saniye)...
timeout /t 7 /nobreak > nul

echo [3/3] Yönetim paneli tarayicida aciliyor...
start http://localhost:5173/admin/index.html

echo.
echo ============================================================
echo    ISLEM BASARIYLA TAMAMLANDI!
echo.
echo    DIKKAT: Acilan siyah pencereleri kapatmayin. 
echo    Isiniz bittiginde bu pencereleri kapatabilirsiniz.
echo ============================================================
echo.
pause
