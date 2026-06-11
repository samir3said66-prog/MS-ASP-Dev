# Deployment Guide

## Overview

The portfolio is configured for automatic deployment to Netlify on every push to the `main` branch.

## Deployment Platforms

### Netlify (Recommended)

#### Prerequisites
- GitHub repository linked
- Netlify account
- Basic permissions to connect

#### Setup

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select GitHub and authorize
   - Choose your repository

2. **Configuration** (Automatic)
   - Netlify reads `netlify.toml` for build settings
   - Build Command: `npm install -g bun && bun install && bun run build`
   - Publish Directory: `dist`
   - Production Branch: `main`

3. **Deploy**
   - Push to `main` branch
   - Netlify automatically builds and deploys
   - Site URL: `https://ms-asp-dev.netlify.app`

#### Netlify Configuration File

```toml
# netlify.toml
[build]
  command = "npm install -g bun && bun install && bun run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Environment Variables (if needed)

1. Go to Netlify Dashboard
2. Site Settings → Build & Deploy → Environment
3. Add environment variables
4. Redeploy after adding variables

#### Monitoring Deployments

1. **Netlify Dashboard**
   - View deployment history
   - Check build logs
   - Monitor site analytics

2. **GitHub Status**
   - Deployment status shows on GitHub commits
   - View detailed logs by clicking "Details"

### Other Platforms

#### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

#### GitHub Pages

```bash
# Push to gh-pages branch
git push origin dist:gh-pages
```

Configure in repository settings:
- Publishing source: `gh-pages` branch

## Local Build & Testing

### Build Locally

```bash
# Build production bundle
bun run build

# Preview production build
bun run preview
```

### Test Before Deploying

```bash
# 1. Build
bun run build

# 2. Check build output
ls -la dist/

# 3. Preview
bun run preview

# 4. Open http://localhost:4173
```

## Troubleshooting Deployments

### Build Fails on Netlify

**Issue**: Build fails but works locally

**Solutions**:
1. Check Node.js version (should be 20.x)
2. Check environment variables
3. View build logs in Netlify dashboard
4. Try clearing cache: "Deploys" → "Clear cache and retry latest deploy"

### Site Shows Old Version

**Issue**: Changes not reflected after deploy

**Solutions**:
1. Check deployment status in Netlify
2. Hard refresh browser (Ctrl+Shift+R)
3. Clear browser cache
4. Check if build actually completed

### Asset Loading Fails

**Issue**: CSS or JS files return 404

**Solutions**:
1. Check `dist/` folder is published correctly
2. Verify paths in HTML are relative
3. Check Netlify redirects configuration

## Performance Optimization

### Before Deployment

1. **Build Analysis**
   ```bash
   bun run build
   # Check dist/ folder size
   ```

2. **Lighthouse Audit**
   - Run Lighthouse in Chrome DevTools
   - Target score: 90+ for all categories

3. **Performance Metrics**
   - First Contentful Paint (FCP): < 2s
   - Largest Contentful Paint (LCP): < 2.5s
   - Cumulative Layout Shift (CLS): < 0.1

### After Deployment

Monitor using:
- Netlify Analytics
- Google PageSpeed Insights
- Web Vitals

## Rollback

If deployment causes issues:

### On Netlify

1. Go to Deploys
2. Select previous successful deploy
3. Click "Publish deploy"

### From GitHub

```bash
# Revert last commit
git revert HEAD

# Push revert commit
git push origin main

# Netlify automatically redeploys
```

## DNS & Custom Domain

### Add Custom Domain to Netlify

1. **Purchase Domain**
   - Buy from registrar (GoDaddy, Namecheap, etc.)
   - Or through Netlify

2. **Connect Domain**
   - Netlify Dashboard → Custom domains
   - Add domain
   - Update registrar nameservers (or use CNAME)

3. **SSL Certificate**
   - Netlify automatically provisions Let's Encrypt
   - Enforces HTTPS

## CI/CD Pipeline

The deployment uses:
- **GitHub**: Code repository & trigger
- **Netlify**: Build & deploy service
- **Bun**: Package manager & build tool

Pipeline:
```
Push to main
    ↓
GitHub webhook trigger
    ↓
Netlify receives trigger
    ↓
bun install && bun run build
    ↓
Upload dist/ to CDN
    ↓
Deploy live
    ↓
DNS updates
```

## Monitoring in Production

### Netlify Analytics

- Dashboard shows page views
- Monitor deployment frequency
- Track build performance

### Error Tracking

- Check browser console for errors
- Use Sentry for production error monitoring (optional)

### Performance Monitoring

- Google Analytics for user metrics
- Core Web Vitals monitoring
- Real User Monitoring (RUM)

## Best Practices

1. **Always test locally** before pushing
2. **Use descriptive commit messages**
3. **Tag releases** for version tracking
4. **Keep dependencies updated**
5. **Monitor deployments** after pushing
6. **Document changes** in commit messages

## Next Steps

- Review [ARCHITECTURE.md](./ARCHITECTURE.md) for project structure
- Check [STYLING.md](./STYLING.md) for design system
- See [INTERNATIONALIZATION.md](./INTERNATIONALIZATION.md) for i18n setup
