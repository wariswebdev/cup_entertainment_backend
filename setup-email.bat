@echo off
echo 🔧 Cup Entertainment Email Configuration Setup
echo ==============================================
echo.

if not exist ".env" (
    echo ❌ .env file not found!
    pause
    exit /b 1
)

echo 📧 This script will help you configure email settings for OTP delivery.
echo.
echo Choose your email provider:
echo 1) Gmail (Recommended)
echo 2) Outlook/Hotmail
echo 3) Yahoo
echo 4) Custom SMTP
echo 5) Skip email setup (for testing without emails)
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto gmail
if "%choice%"=="2" goto outlook
if "%choice%"=="3" goto yahoo
if "%choice%"=="4" goto custom
if "%choice%"=="5" goto skip
goto invalid

:gmail
echo.
echo 📧 Gmail Setup Selected
echo Please follow these steps:
echo 1. Go to https://myaccount.google.com
echo 2. Navigate to Security ^> 2-Step Verification (enable if not already enabled)
echo 3. Go to Security ^> App passwords
echo 4. Select 'Mail' and generate a new password
echo 5. Copy the 16-character password
echo.
set /p gmail_user="Enter your Gmail address: "
set /p gmail_pass="Enter your 16-character app password: "

powershell -Command "(Get-Content .env) -replace 'SMTP_USER=.*', 'SMTP_USER=\"%gmail_user%\"' | Set-Content .env"
powershell -Command "(Get-Content .env) -replace 'SMTP_PASS=.*', 'SMTP_PASS=\"%gmail_pass%\"' | Set-Content .env"

echo ✅ Gmail configuration updated!
goto end

:outlook
echo.
echo 📧 Outlook/Hotmail Setup Selected
set /p outlook_user="Enter your Outlook email: "
set /p outlook_pass="Enter your password: "

powershell -Command "(Get-Content .env) -replace 'SMTP_HOST=.*', 'SMTP_HOST=\"smtp-mail.outlook.com\"' | Set-Content .env"
powershell -Command "(Get-Content .env) -replace 'SMTP_USER=.*', 'SMTP_USER=\"%outlook_user%\"' | Set-Content .env"
powershell -Command "(Get-Content .env) -replace 'SMTP_PASS=.*', 'SMTP_PASS=\"%outlook_pass%\"' | Set-Content .env"

echo ✅ Outlook configuration updated!
goto end

:yahoo
echo.
echo 📧 Yahoo Setup Selected
set /p yahoo_user="Enter your Yahoo email: "
set /p yahoo_pass="Enter your app password: "

powershell -Command "(Get-Content .env) -replace 'SMTP_HOST=.*', 'SMTP_HOST=\"smtp.mail.yahoo.com\"' | Set-Content .env"
powershell -Command "(Get-Content .env) -replace 'SMTP_USER=.*', 'SMTP_USER=\"%yahoo_user%\"' | Set-Content .env"
powershell -Command "(Get-Content .env) -replace 'SMTP_PASS=.*', 'SMTP_PASS=\"%yahoo_pass%\"' | Set-Content .env"

echo ✅ Yahoo configuration updated!
goto end

:custom
echo.
echo 📧 Custom SMTP Setup Selected
set /p smtp_host="Enter SMTP host: "
set /p smtp_port="Enter SMTP port (587 or 465): "
set /p smtp_user="Enter SMTP username: "
set /p smtp_pass="Enter SMTP password: "

powershell -Command "(Get-Content .env) -replace 'SMTP_HOST=.*', 'SMTP_HOST=\"%smtp_host%\"' | Set-Content .env"
powershell -Command "(Get-Content .env) -replace 'SMTP_PORT=.*', 'SMTP_PORT=%smtp_port%' | Set-Content .env"
powershell -Command "(Get-Content .env) -replace 'SMTP_USER=.*', 'SMTP_USER=\"%smtp_user%\"' | Set-Content .env"
powershell -Command "(Get-Content .env) -replace 'SMTP_PASS=.*', 'SMTP_PASS=\"%smtp_pass%\"' | Set-Content .env"

echo ✅ Custom SMTP configuration updated!
goto end

:skip
echo.
echo ⚠️  Skipping email setup
echo Note: OTP emails will not be sent until you configure email settings.
echo You can run this script again or manually edit the .env file.
goto end

:invalid
echo ❌ Invalid choice
pause
exit /b 1

:end
echo.
echo 🚀 Configuration complete!
echo.
echo Next steps:
echo 1. Restart your development server: npm run start:dev
echo 2. Test the OTP functionality
echo.
echo For detailed setup instructions, see: EMAIL_SETUP.md
echo.
pause
