# Static Site Generation (SSG) Setup

This project is configured for **Static Site Generation** using React Router v7.

## How SSG Works in This Project

### Build Process

```bash
npm run build
```

This generates:

- `build/client/` - Static files (JS, CSS, images)
- `build/server/` - Build artifact (not used in SSG deployment)

### Key Features

- **Loaders run at build time** - API calls (`https://fakestoreapi.com/products`) happen when you build, not at runtime
- **Static HTML generated** - All routes pre-rendered as static `.html` files
- **No server needed** - Deploy just the static files
- **Fast deployments** - No compute required at runtime

## Deployment Options

### 1. GitHub Pages (Free)

```bash
npm run build
# Deploy the ./build/client directory to GitHub Pages
```

### 2. Netlify (Free Tier)

```bash
npm run build
# Connect your repo - Netlify auto-detects the build
# Set publish directory to: ./build/client
```

### 3. Vercel (Free Tier)

```bash
npm run build
# Deploy the ./build/client directory
# Or connect repo for auto-deployment
```

### 4. Traditional Static Hosting (AWS S3, CloudFront, etc.)

```bash
npm run build
# Deploy ./build/client to your static host
```

## Project Structure

```
app/
├── routes/
│   ├── home.jsx        ← Route with loader (pre-rendered at build)
│   └── cart.jsx        ← Client-only route (no server data)
├── components/
│   ├── Nav.jsx
│   ├── ProductCard.jsx
├── context/
│   └── CartContext.jsx ← Client-side state (localStorage)
└── utils/
    └── cartStorage.js  ← localStorage helpers
```

## What Gets Pre-rendered

Routes with **loaders** run at build time:

- `/` (home) - Fetches products from API → saved in static HTML

Routes that are **client-only**:

- `/cart` - Only client-side React rendering

## Cart State

The cart uses `localStorage` + React Context:

- ✅ Persists across page reloads
- ✅ Works offline
- ✅ No server communication needed

## Build & Serve Locally

```bash
# Build for SSG
npm run build

# Serve static files locally (optional)
npm run preview
```

## Environment Variables

Since this is pure static, no environment variables are needed. API endpoints are hardcoded.

To change the API:

1. Edit `app/routes/home.jsx` - Change the fetch URL in the loader
2. Rebuild: `npm run build`

## Key Differences from SSR/CSR

| Feature    | SSG                | SSR          | CSR           |
| ---------- | ------------------ | ------------ | ------------- |
| Build time | Pre-renders routes | Just bundles | Just bundles  |
| Deploy to  | Static host        | Server       | Static/Server |
| API calls  | At build time      | Per request  | Client-side   |
| Latency    | Fastest            | Slow         | Medium        |
| Cost       | Cheapest           | Expensive    | Medium        |

## Troubleshooting

### Products not showing after deploy

- Ensure the API was reachable when you ran `npm run build`
- Check browser console for errors

### Cart not persisting

- localStorage is browser-specific and device-specific
- Clearing browser storage clears the cart

### Need to update products

- Edit the loader in `app/routes/home.jsx`
- Run `npm run build` again
- Deploy the new build

---

**Happy static hosting! 🚀**
