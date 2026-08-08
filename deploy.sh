#!/bin/bash

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "\${BLUE}🚀 Starting Multi-Platform Deployment...\${NC}\n"

# GitHub
echo -e "\${YELLOW}📦 Deploying to GitHub Pages...\${NC}"
git add .
git commit -m "Deploy portfolio update"
git push origin main
echo -e "\${GREEN}✅ GitHub Pages deployed!\${NC}\n"

# GitLab
if git remote | grep -q "gitlab"; then
    echo -e "\${YELLOW}📦 Deploying to GitLab Pages...\${NC}"
    git push gitlab main
    echo -e "\${GREEN}✅ GitLab Pages deployed!\${NC}\n"
fi

# Codeberg
if git remote | grep -q "codeberg"; then
    echo -e "\${YELLOW}📦 Deploying to Codeberg...\${NC}"
    git push codeberg main
    echo -e "\${GREEN}✅ Codeberg deployed!\${NC}\n"
fi

# Bitbucket
if git remote | grep -q "bitbucket"; then
    echo -e "\${YELLOW}📦 Deploying to Bitbucket...\${NC}"
    git push bitbucket main
    echo -e "\${GREEN}✅ Bitbucket deployed!\${NC}\n"
fi

# Cloudflare Pages (if installed)
if command -v wrangler &> /dev/null; then
    echo -e "\${YELLOW}☁️ Deploying to Cloudflare Pages...\${NC}"
    wrangler pages deploy . --project-name=mka-portfolio
    echo -e "\${GREEN}✅ Cloudflare Pages deployed!\${NC}\n"
fi

echo -e "\${BLUE}🎉 All deployments completed!\${NC}"
