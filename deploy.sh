#!/bin/bash

# NJ SPIRIT Presentation - GitHub Pages Deployment Script
# This script helps deploy the secure presentation to GitHub Pages

echo "🚀 NJ SPIRIT Presentation Deployment Script"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "index.html" ] || [ ! -f "presentation.html" ]; then
    echo "❌ Error: Missing required files. Please run from the correct directory."
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git repository not initialized. Please run 'git init' first."
    exit 1
fi

# Get GitHub repository URL
read -p "🔗 Enter your GitHub repository URL (e.g., https://github.com/username/nj-spirit-presentation.git): " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ Error: Repository URL is required."
    exit 1
fi

# Check if remote origin exists
if git remote get-url origin >/dev/null 2>&1; then
    echo "📡 Remote origin already exists. Updating..."
    git remote set-url origin "$REPO_URL"
else
    echo "📡 Adding remote origin..."
    git remote add origin "$REPO_URL"
fi

# Stage any changes
echo "📦 Staging files..."
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "✅ No changes to commit."
else
    echo "💾 Committing changes..."
    git commit -m "Update NJ SPIRIT presentation - $(date)"
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
if git push -u origin main; then
    echo "✅ Successfully pushed to GitHub!"
else
    echo "❌ Failed to push to GitHub. Please check your credentials and repository URL."
    exit 1
fi

# Extract username and repository name from URL
REPO_NAME=$(echo "$REPO_URL" | sed 's/.*\/\([^\/]*\)\.git$/\1/')
USERNAME=$(echo "$REPO_URL" | sed 's/.*github\.com\/\([^\/]*\)\/.*$/\1/')

echo ""
echo "🎉 Deployment Complete!"
echo "========================"
echo "📍 GitHub Repository: $REPO_URL"
echo "🌐 GitHub Pages URL: https://$USERNAME.github.io/$REPO_NAME/"
echo ""
echo "⚙️  Next Steps:"
echo "1. Go to your GitHub repository settings"
echo "2. Navigate to Pages section"
echo "3. Enable GitHub Pages from main branch"
echo "4. Wait 5-10 minutes for deployment"
echo "5. Access your presentation at the URL above"
echo ""
echo "🔑 Login Credentials:"
echo "- demo / presentation2025 (General demo access)"
echo "- client / njspirit2025 (Client stakeholder access)"
echo "- team / northhighland (North Highland team access)"
echo "- admin / secure123 (Administrative access)"
echo "- guest / view2025 (Guest/temporary access)"
echo ""
echo "🔒 Security Features:"
echo "- Session timeout: 24 hours"
echo "- Inactivity logout: 30 minutes"
echo "- Developer tools disabled"
echo "- Right-click disabled"
echo "- Activity monitoring"
echo ""
echo "📖 For more information, see README.md"
echo "✅ Happy presenting!"