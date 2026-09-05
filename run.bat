@echo off
chcp 65001 > nul
echo ========================================================
echo    تشغيل مشروع نقل العفش بالكويت (.NET 10 + Angular 19)
echo    هاتف: 60055108 - خدمة 24 ساعة
echo ========================================================
echo.

set PATH=C:\Program Files\nodejs;C:\Program Files\dotnet;%PATH%

echo [1/2] تشغيل الواجهة الخلفية (.NET Web API)...
start "Kuwait Moving API" cmd /k "cd /d a:\Test\SurvayProjectTestsol\clkw\src\KuwaitMoving.Api && dotnet run"

echo [2/2] تشغيل الواجهة الأمامية (Angular Client)...
start "Kuwait Moving Angular Client" cmd /k "cd /d a:\Test\SurvayProjectTestsol\clkw\src\KuwaitMoving.Client && npm start"

echo.
echo ========================================================
echo تم إطلاق مشروعي الـ API والـ Angular بنجاح!
echo رابط الواجهة الأمامية:  http://localhost:4300 (أو انقر للفتح)
echo رابط الواجهة الخلفية:   https://localhost:7196 أو http://localhost:5196
echo ========================================================
pause
