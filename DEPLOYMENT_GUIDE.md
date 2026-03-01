# 🚀 SSG Deployment Guide

Your fake eCommerce project is now configured for **Static Site Generation (SSG)**!

## What Changed?

✅ **Removed from dependencies:**

- `@react-router/serve` - No longer needed
- `isbot` - Only for SSR

✅ **Kept in devDependencies:**

- `@react-router/dev` - Build tooling for SSG
- `@react-router/node` - Runtime for build process

✅ **How it works:**

1. `npm run build` fetches all product data from API
2. Pre-renders HTML for all routes with that data
3. Bundles React for client-side features (cart, filtering)
4. Generates pure static files in `build/client/`

## Build & Deploy Workflow

### Step 1: Build

```bash
npm run build
# Or use the helper script:
# Windows: build-ssg.bat
# Mac/Linux: bash build-ssg.sh
```

### Step 2: Test Locally

```bash
npm run preview
# Open http://localhost:4173
# Test all features:
# - Browse products by category
# - Add/remove items from cart
# - Cart persists on page reload
```

### Step 3: Deploy

#### **Option A: GitHub Pages** ⭐ (Free, easiest)

```bash
# 1. Build
npm run build

# 2. Deploy
cd build/client
git init
git add .
git commit -m "Deploy SSG"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

# 3. Go to repo Settings > Pages
# Select "Deploy from a branch"
# Choose branch: main, folder: / (root)
```

#### **Option B: Netlify** ⭐ (Free, automatic)

```bash
# Easy way:
# 1. Push code to GitHub
# 2. Go to netlify.com
# 3. Connect your repo
# 4. Set Build command: npm run build
# 5. Set Publish directory: build/client
# Deploy! 🎉
```

#### **Option C: Vercel** ⭐ (Free, fastest)

```bash
# Easy way:
# 1. Push code to GitHub
# 2. Go to vercel.com
# 3. Import your project
# 4. Build command: npm run build
# 5. Output directory: build/client
# Deploy! 🎉
```

#### **Option D: Any Web Server**

```bash
# 1. Build
npm run build

# 2. Copy contents of build/client/ to your web server
cp -r build/client/* /var/www/html/
# or
xcopy build\client\* C:\inetpub\wwwroot\ /E /Y
```

## What Gets Generated

After `npm run build`:

```
build/client/
├── index.html           ← Main entry point (pre-rendered)
├── assets/
│   ├── entry.client-HASH.js       (React client-side code)
│   ├── cart-HASH.js                (Cart route component)
│   ├── home-HASH.js                (Home route component)
│   ├── CartContext-HASH.js         (State management)
│   ├── root-HASH.css               (Tailwind + DaisyUI styles)
│   └── manifest-HASH.js            (Route metadata)
└── favicon.ico
```

## Key Points

✅ **Pre-rendered at build time:**

- All products loaded from API
- Routes compiled to static HTML

✅ **Client-side features:**

- Category filtering (instant, no server)
- Shopping cart (localStorage)
- Navigation (client-side routing)

✅ **Performance:**

- Instant page loads (no API calls at runtime)
- Minimum JavaScript sent to browser
- Works offline
- Cheap hosting (or free with GitHub Pages/Netlify)

## Update Flow

If you need to update products:

```bash
# 1. Update app/routes/home.jsx (if needed)
# 2. Rebuild
npm run build

# 3. New products loaded from API
# 4. Static files regenerated
# 5. Deploy new build/client/
```

## Environment Variables

None needed! 🎉 This is pure static.

To change the API endpoint:

1. Edit `app/routes/home.jsx` line 18: `const res = await fetch('...')`
2. Rebuild: `npm run build`

## Troubleshooting

### Products show "Loading..." after deploy

→ Check browser console (F12) for fetch errors
→ Ensure API was reachable during build
→ Rebuild and redeploy

### Cart not working

→ Check browser DevTools > Application > localStorage
→ Clear cache and try again

### Styles not loading

→ Check CSS file in `build/client/assets/`
→ Make sure your host serves static files correctly

### Routes not working

→ Ensure your host serves `index.html` for all unknown paths
→ Most static hosts (Netlify, Vercel) do this automatically
→ For traditional servers, create a rewrite rule

## Cost Comparison

| Hosting            | Cost   | Setup  | Notes               |
| ------------------ | ------ | ------ | ------------------- |
| GitHub Pages       | Free   | 5 min  | Best for portfolios |
| Netlify            | Free   | 3 min  | Best overall        |
| Vercel             | Free   | 3 min  | Fastest CDN         |
| Cloudflare Pages   | Free   | 5 min  | Plus analytics      |
| Traditional server | Varies | Manual | More control        |

---

**You've successfully converted to SSG! 🎉**

Questions? Check the docs:

- React Router: https://reactrouter.com
- Netlify: https://docs.netlify.com
- Vercel: https://vercel.com/docs
