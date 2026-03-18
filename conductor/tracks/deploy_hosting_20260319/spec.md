# Track Specification: Deployment & Hosting

## Overview

Deploy the fidyah calculator as a publicly accessible static website using modern hosting platforms.

## Requirements

### User Stories
- Users can access the calculator via a public URL
- Calculator loads fast and reliably
- Site is mobile-friendly

### Functional Requirements
- Static HTML/CSS/JS deployment
- Custom domain support (optional)
- HTTPS enabled by default

### Non-Functional Requirements
- Fast load time (< 2s)
- 99.9% uptime
- Global CDN distribution

### Deployment Options
- **GitHub Pages** - Free, integrates with git workflow
- **Netlify** - Free tier, drag-and-drop, auto-deploy
- **Cloudflare Pages** - Free, fast global CDN

## Tech Stack for Deployment

- Existing: Vanilla HTML/JS/CSS with Tailwind CDN
- Deployment: CI/CD pipeline or manual upload
