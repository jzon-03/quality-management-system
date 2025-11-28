# GitHub Pages Deployment Guide

This Angular application is configured for deployment to GitHub Pages with a custom domain (qms.sharpfloornc.com).

## Features

✅ **Custom Domain Support** - Configured for qms.sharpfloornc.com  
✅ **Angular Routing Support** - No 404 errors on page refresh  
✅ **Automatic Deployment** - GitHub Actions workflow  
✅ **Production Optimized** - Minified and compressed builds  

## Prerequisites

1. Push your code to a GitHub repository
2. Configure your domain DNS to point to GitHub Pages
3. Enable GitHub Pages in repository settings

## DNS Configuration

Set up these DNS records for your domain `sharpfloornc.com`:

```
Type: A
Name: qms
Value: 185.199.108.153

Type: A  
Name: qms
Value: 185.199.109.153

Type: A
Name: qms  
Value: 185.199.110.153

Type: A
Name: qms
Value: 185.199.111.153
```

Or use CNAME record:
```
Type: CNAME
Name: qms
Value: yourusername.github.io
```

## Manual Deployment

To deploy manually from your local machine:

```bash
# Build and deploy to GitHub Pages
npm run deploy:gh-pages
```

## Automatic Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically:

1. **Triggers** on push to main/master branch
2. **Builds** the Angular application for production
3. **Deploys** to GitHub Pages
4. **Serves** at your custom domain

## Repository Setup

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Quality Management System"
   git branch -M main
   git remote add origin https://github.com/yourusername/quality-management-system.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: Select `gh-pages` 
   - Folder: `/ (root)`
   - Custom domain: `qms.sharpfloornc.com`

3. **Configure Custom Domain**:
   - In Pages settings, add custom domain: `qms.sharpfloornc.com`
   - Enable "Enforce HTTPS"

## File Structure

```
src/
├── CNAME                 # Custom domain configuration
├── 404.html             # Handles Angular routing on GitHub Pages
├── index.html           # Updated with SPA redirect script
└── ...

.github/
└── workflows/
    └── deploy.yml       # GitHub Actions deployment workflow
```

## How It Works

### Angular Routing Fix

GitHub Pages serves static files and doesn't understand Angular routes. Our solution:

1. **404.html** - Catches all unknown routes and redirects them with URL encoding
2. **index.html** - Contains JavaScript to decode and restore the original Angular route
3. **Result** - Users can refresh any page or share deep links without getting 404 errors

### Build Process

The build process:
1. Sets base href to your custom domain
2. Includes CNAME and 404.html files
3. Optimizes for production (minification, tree-shaking)
4. Outputs to `dist/quality-management-system/`

## Available Scripts

```bash
npm run build:prod        # Production build (generic)
npm run build:gh-pages    # GitHub Pages build (with custom domain)
npm run deploy:gh-pages   # Build and deploy manually
```

## Troubleshooting

### Common Issues:

1. **404 on refresh**: Make sure 404.html and index.html scripts are properly configured
2. **Custom domain not working**: Check DNS configuration and GitHub Pages settings
3. **Build fails**: Ensure all dependencies are installed and TypeScript compiles without errors
4. **HTTPS issues**: Enable "Enforce HTTPS" in GitHub Pages settings

### Verification:

After deployment, test these scenarios:
- ✅ Visit homepage: `https://qms.sharpfloornc.com`
- ✅ Navigate to routes: `https://qms.sharpfloornc.com/dashboard`
- ✅ Refresh any page: Should not show 404
- ✅ Direct link access: Routes should work when shared

## Production Checklist

Before going live:

- [ ] Domain DNS configured correctly
- [ ] GitHub Pages enabled with custom domain
- [ ] HTTPS enforced
- [ ] Test all routes work on refresh
- [ ] Verify mobile responsiveness
- [ ] Check performance metrics
- [ ] Test user authentication if implemented

## Support

For issues with:
- **Angular build**: Check `npm run build` locally
- **GitHub Pages**: Verify repository settings and Actions logs
- **Custom domain**: Confirm DNS configuration
- **Routing**: Test 404.html redirect logic