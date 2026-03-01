@echo off
REM SSG Build Script - Pre-renders all routes to static files (Windows)

echo 🔨 Building Static Site Generation ^(SSG^)...
echo.

REM Build the project
call npm run build

if errorlevel 1 (
  echo ❌ Build failed!
  exit /b 1
)

echo.
echo ✅ Build successful!
echo.
echo 📂 Build Output Structure:
echo    build\
echo    ├── client\          ^<-- 🎯 Deploy this to static hosting
echo    │   ├── assets\      ^(Pre-compiled JavaScript ^& CSS^)
echo    │   ├── favicon.ico
echo    │   └── index.html   ^(Pre-rendered routes^)
echo    └── server\          ^(Not needed for SSG^)
echo.
echo 📊 Build Summary:
echo    • All routes pre-rendered as static HTML
echo    • API data fetched at build time
echo    • Zero runtime server needed
echo    • Ready for static hosting
echo.
echo 🚀 To deploy:
echo    → GitHub Pages: Push build\client to gh-pages branch
echo    → Netlify: Connect repo, set publish dir to ./build/client
echo    → Vercel: Deploy build\client folder
echo.
echo Preview locally:
echo    npm run preview
