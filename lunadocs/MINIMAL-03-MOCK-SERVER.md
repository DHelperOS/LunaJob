# Minimal Template - Mock Server Setup

We provide some simple examples on how to set up a mock API so you can work in your `localhost`.

⚠️ **Warning**: The online demo API can be disabled at any time. To avoid interruptions during work, you should host your own API server according to the instructions below.

## 💻 Usage in localhost 

**Video Guide**: [Watch Setup Tutorial](https://youtu.be/z9Mjd5IBYG8)

### Step 1: Download Resource

Download resource inside the `README.md` or `MOCK_API.md`.

**v6 Structure:**
```
next-ts
├── README.md
├── ...
```

**v5 Structure:**
```
Minimal_Typescript
├── MOCK_API.md
├── ...
```

### Step 2: Start Local Server

- Start project `minimal-api-dev` folder
- Make sure you are running on the correct port `http://localhost:7272`

**Change port in `next.config.mjs`:**
```javascript
"DEV_API: "http://localhost:7272","
```

**Change port in `package.json`:**
```json
"dev": "next dev -p 7272",
"start": "next start -p 7272",
```

**Install and run:**
```bash
yarn install
yarn dev
```

### Step 3: Update Environment Variables

**For next.js, vite.js, starter-next-ts, starter-vite-ts...**

Update `.env` in your current project:
```env
VITE_SERVER_URL=http://localhost:7272
VITE_ASSET_URL=http://localhost:7272
```

## ☁️ Usage on Production

Support for **Vercel** and **Cloudflare** servers.

### Step 1: Deploy API Server

- Push source code `minimal-api-dev` to your GitHub
- Deploy on your [vercel.com](https://dev.to/ohdylan/nextjs-series-7-deploying-the-web-page-to-vercel-for-free-from-github-repo-1mob)

### Step 2: Configure Production API

**In `next.config.mjs` of `minimal-api-dev`:**

```javascript
const nextConfig = {
  reactStrictMode: true,
  env: {
    DEV_API: 'http://localhost:7272',
    PRODUCTION_API: 'https://your-domain-api.vercel.app',
  },
};

export default nextConfig;
```

### Step 3: Update Production Environment

**Update `.env` in your current project:**
```env
VITE_SERVER_URL=https://your-domain-api.vercel.app
VITE_ASSET_URL=https://your-domain-api.vercel.app
```

## Configuration Tips

1. **Port Management**: Ensure the API server runs on a different port than your main application
2. **Environment Variables**: Always use environment variables for API endpoints
3. **CORS Configuration**: Make sure your API server allows requests from your frontend domain
4. **Testing**: Test both local and production API endpoints before deployment

---
**Source**: https://docs.minimals.cc/mock-server
**Date**: 2025-09-02
**Project**: Luna Job (루나알바)