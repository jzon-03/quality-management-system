#!/bin/bash

# GitHub Pages Deployment Verification Script
# Run this script to verify your deployment setup is correct

echo "🔍 Verifying GitHub Pages Deployment Setup..."
echo ""

# Check if required files exist
echo "✅ Checking required files:"

if [ -f "src/CNAME" ]; then
    echo "   ✓ CNAME file exists"
    echo "     Domain: $(cat src/CNAME)"
else
    echo "   ❌ CNAME file missing"
fi

if [ -f "src/404.html" ]; then
    echo "   ✓ 404.html exists (Angular routing support)"
else
    echo "   ❌ 404.html missing"
fi

if [ -f ".github/workflows/deploy.yml" ]; then
    echo "   ✓ GitHub Actions workflow exists"
else
    echo "   ❌ GitHub Actions workflow missing"
fi

echo ""

# Check package.json scripts
echo "✅ Checking deployment scripts:"
if grep -q "build:gh-pages" package.json; then
    echo "   ✓ build:gh-pages script configured"
else
    echo "   ❌ build:gh-pages script missing"
fi

if grep -q "deploy:gh-pages" package.json; then
    echo "   ✓ deploy:gh-pages script configured"
else
    echo "   ❌ deploy:gh-pages script missing"
fi

echo ""

# Check angular.json assets
echo "✅ Checking Angular configuration:"
if grep -q "CNAME" angular.json; then
    echo "   ✓ CNAME configured in angular.json"
else
    echo "   ❌ CNAME not configured in angular.json"
fi

if grep -q "404.html" angular.json; then
    echo "   ✓ 404.html configured in angular.json"
else
    echo "   ❌ 404.html not configured in angular.json"
fi

echo ""

# Test build
echo "🔨 Testing production build..."
if npm run build:gh-pages; then
    echo "   ✓ Production build successful"
    
    # Check build output
    if [ -d "dist/quality-management-system/browser" ]; then
        echo "   ✓ Build output directory exists"
        
        if [ -f "dist/quality-management-system/browser/CNAME" ]; then
            echo "   ✓ CNAME included in build"
        else
            echo "   ❌ CNAME not included in build"
        fi
        
        if [ -f "dist/quality-management-system/browser/404.html" ]; then
            echo "   ✓ 404.html included in build"
        else
            echo "   ❌ 404.html not included in build"
        fi
    else
        echo "   ❌ Build output directory missing"
    fi
else
    echo "   ❌ Production build failed"
fi

echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Push to GitHub:"
echo "   git add ."
echo "   git commit -m 'Configure GitHub Pages deployment'"
echo "   git push origin main"
echo ""
echo "2. Enable GitHub Pages in repository settings"
echo "   - Go to Settings > Pages"
echo "   - Source: Deploy from a branch" 
echo "   - Branch: gh-pages"
echo "   - Custom domain: qms.sharpfloornc.com"
echo ""
echo "3. Configure DNS for sharpfloornc.com:"
echo "   - Add CNAME record: qms -> yourusername.github.io"
echo "   - Or add A records pointing to GitHub Pages IPs"
echo ""
echo "4. Wait for deployment and test:"
echo "   - Check GitHub Actions for deployment status"
echo "   - Visit https://qms.sharpfloornc.com"
echo "   - Test deep links and page refreshes"
echo ""
echo "✨ Deployment setup complete!"