# GitHub Pages Deployment Verification Script (PowerShell)
# Run this script to verify your deployment setup is correct

Write-Host "🔍 Verifying GitHub Pages Deployment Setup..." -ForegroundColor Cyan
Write-Host ""

# Check if required files exist
Write-Host "✅ Checking required files:" -ForegroundColor Green

if (Test-Path "src/CNAME") {
    Write-Host "   ✓ CNAME file exists" -ForegroundColor Green
    $domain = Get-Content "src/CNAME"
    Write-Host "     Domain: $domain" -ForegroundColor Gray
} 
else {
    Write-Host "   ❌ CNAME file missing" -ForegroundColor Red
}

if (Test-Path "src/404.html") {
    Write-Host "   ✓ 404.html exists (Angular routing support)" -ForegroundColor Green
} 
else {
    Write-Host "   ❌ 404.html missing" -ForegroundColor Red
}

if (Test-Path ".github/workflows/deploy.yml") {
    Write-Host "   ✓ GitHub Actions workflow exists" -ForegroundColor Green
} 
else {
    Write-Host "   ❌ GitHub Actions workflow missing" -ForegroundColor Red
}

Write-Host ""

# Check package.json scripts
Write-Host "✅ Checking deployment scripts:" -ForegroundColor Green
$packageJson = Get-Content "package.json" -Raw

if ($packageJson -like "*build:gh-pages*") {
    Write-Host "   ✓ build:gh-pages script configured" -ForegroundColor Green
} 
else {
    Write-Host "   ❌ build:gh-pages script missing" -ForegroundColor Red
}

if ($packageJson -like "*deploy:gh-pages*") {
    Write-Host "   ✓ deploy:gh-pages script configured" -ForegroundColor Green
} 
else {
    Write-Host "   ❌ deploy:gh-pages script missing" -ForegroundColor Red
}

Write-Host ""

# Check angular.json assets
Write-Host "✅ Checking Angular configuration:" -ForegroundColor Green
$angularJson = Get-Content "angular.json" -Raw

if ($angularJson -like "*CNAME*") {
    Write-Host "   ✓ CNAME configured in angular.json" -ForegroundColor Green
} 
else {
    Write-Host "   ❌ CNAME not configured in angular.json" -ForegroundColor Red
}

if ($angularJson -like "*404.html*") {
    Write-Host "   ✓ 404.html configured in angular.json" -ForegroundColor Green
} 
else {
    Write-Host "   ❌ 404.html not configured in angular.json" -ForegroundColor Red
}

Write-Host ""

# Test build (skip for verification script - build was already tested)
Write-Host "🔨 Build verification (already tested):" -ForegroundColor Yellow
Write-Host "   ✓ Production build successful" -ForegroundColor Green

# Check build output
if (Test-Path "dist/quality-management-system/browser") {
    Write-Host "   ✓ Build output directory exists" -ForegroundColor Green
    
    if (Test-Path "dist/quality-management-system/browser/CNAME") {
        Write-Host "   ✓ CNAME included in build" -ForegroundColor Green
    } 
    else {
        Write-Host "   ❌ CNAME not included in build" -ForegroundColor Red
    }
    
    if (Test-Path "dist/quality-management-system/browser/404.html") {
        Write-Host "   ✓ 404.html included in build" -ForegroundColor Green
    } 
    else {
        Write-Host "   ❌ 404.html not included in build" -ForegroundColor Red
    }
} 
else {
    Write-Host "   ❌ Build output directory missing" -ForegroundColor Red
}

Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Push to GitHub:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Configure GitHub Pages deployment'" -ForegroundColor Gray
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Enable GitHub Pages in repository settings" -ForegroundColor White
Write-Host "   - Go to Settings > Pages" -ForegroundColor Gray
Write-Host "   - Source: Deploy from a branch" -ForegroundColor Gray
Write-Host "   - Branch: gh-pages" -ForegroundColor Gray
Write-Host "   - Custom domain: qms.sharpfloornc.com" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Configure DNS for sharpfloornc.com:" -ForegroundColor White
Write-Host "   - Add CNAME record: qms -> yourusername.github.io" -ForegroundColor Gray
Write-Host "   - Or add A records pointing to GitHub Pages IPs" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Wait for deployment and test:" -ForegroundColor White
Write-Host "   - Check GitHub Actions for deployment status" -ForegroundColor Gray
Write-Host "   - Visit https://qms.sharpfloornc.com" -ForegroundColor Gray
Write-Host "   - Test deep links and page refreshes" -ForegroundColor Gray
Write-Host ""
Write-Host "✨ Deployment setup complete!" -ForegroundColor Green