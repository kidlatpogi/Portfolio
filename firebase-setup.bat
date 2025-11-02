@echo off
REM Firebase Setup Script for Windows
REM This script will help you enable Firestore and deploy security rules

echo ======================================
echo 🔥 FIREBASE SETUP GUIDE
echo ======================================
echo.
echo ⚠️  YOU ARE GETTING PERMISSION ERRORS!
echo This means Firestore is not enabled yet.
echo.
echo ======================================
echo STEP 1: ENABLE FIRESTORE DATABASE
echo ======================================
echo.
echo 1. Open this link in your browser:
echo    👉 https://console.firebase.google.com/project/kidlat-portfolio/firestore
echo.
echo 2. Click the 'Create database' button
echo.
echo 3. Select 'Start in PRODUCTION MODE'
echo.
echo 4. Choose location: 'asia-southeast1 (Singapore)'
echo    (This is closest to Philippines for best performance)
echo.
echo 5. Click 'Enable'
echo    (This will take about 30 seconds)
echo.
echo Press any key to continue to Step 2...
pause >nul
echo.
echo ======================================
echo STEP 2: DEPLOY SECURITY RULES
echo ======================================
echo.
echo After Firestore is enabled:
echo.
echo 1. Click on the 'Rules' tab at the top
echo.
echo 2. You'll see a rules editor
echo.
echo 3. DELETE everything in the editor
echo.
echo 4. Copy the contents from: firestore.rules
echo    (File is in your project root folder)
echo.
echo 5. Paste into the Firebase Console rules editor
echo.
echo 6. Click 'Publish' button
echo.
echo Press any key to continue to Step 3...
pause >nul
echo.
echo ======================================
echo STEP 3: TEST YOUR PORTFOLIO
echo ======================================
echo.
echo 1. Refresh your portfolio page
echo.
echo 2. Open Browser Console (F12)
echo.
echo 3. You should see NO more Firebase errors!
echo.
echo 4. Visitor counter should update
echo.
echo 5. Likes should work
echo.
echo ======================================
echo QUICK LINKS:
echo ======================================
echo.
echo Firebase Console:
echo https://console.firebase.google.com/project/kidlat-portfolio
echo.
echo Firestore Database:
echo https://console.firebase.google.com/project/kidlat-portfolio/firestore
echo.
echo ======================================
echo.
echo Press any key to open Firebase Console in browser...
pause >nul
start https://console.firebase.google.com/project/kidlat-portfolio/firestore
echo.
echo Done! Follow the steps above.
echo.
pause
