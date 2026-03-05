@echo off
title ISYANDAYIZ - Guncelle
color 0A
echo ============================================================
echo.
echo    ISYANDAYIZ SIYASI HAREKETI - GUNCELLEME ARACI
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

echo [1/1] Github'dan guncellemeler aliniyor...
git pull

echo.
if %errorlevel% neq 0 (
    echo [HATA] Guncelleme sirasinda bir sorun olustu. 
    echo Lutfen internet baglantinizi kontrol edin.
) else (
    echo ============================================================
    echo    ISLEM BASARIYLA TAMAMLANDI!
    echo    Siteniz basariyla guncellendi.
    echo ============================================================
)

echo.
pause
