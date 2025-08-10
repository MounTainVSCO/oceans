# 🌐 Oceans Publishing System

A complete backend infrastructure for publishing user life stories to custom subdomains with DNS configuration and hosting deployment.

## 🏗️ Architecture Overview

```
User Request → API Endpoints → Publishing Service → DNS + Hosting → Live Site
                                      ↓
                               Database Storage ← Build Process ← Static Generation
```

## 📊 Database Schema

### Sites Table
- `id` - Unique site identifier
- `subdomain` - Custom subdomain (e.g., "john" for john.oceans.life)
- `title` - Site title
- `description` - Site description
- `layout` - Layout type (timeline, calendar, scrapbook, etc.)
- `buildStatus` - Current build status (pending, building, deployed, failed)
- `deployUrl` - Final deployment URL
- `userId` - Owner of the site
- `timelineId` - Associated timeline data

### Site Deployments Table
- `id` - Deployment identifier
- `siteId` - Associated site
- `status` - Deployment status
- `buildLog` - Build output and errors
- `version` - Deployment version number

## 🚀 API Endpoints

### Subdomain Management
```typescript
POST /publishing/check-subdomain
Body: { subdomain: string }
Response: { available: boolean, reason?: string }
```

### Site Creation & Management
```typescript
POST /publishing/sites
Body: {
  subdomain: string,
  title: string,
  description?: string,
  layout: string,
  timelineId?: string
}

GET /publishing/sites
Response: Site[]

PUT /publishing/sites/:id
Body: Partial<Site>

DELETE /publishing/sites/:id
```

## 🔧 Services

### PublishingService
- **Subdomain validation** - Checks availability and reserved names
- **Site creation** - Database records and triggering builds
- **Static site generation** - Converts timeline data to HTML
- **Build management** - Handles build status and deployment records

### DNSService 
- **Cloudflare integration** - Automatic CNAME record creation
- **DNS propagation checking** - Verifies records are live
- **Subdomain cleanup** - Removes records when sites are deleted

### HostingService
- **Multi-provider support** - Vercel, Netlify, AWS S3+CloudFront
- **Automatic deployment** - Uploads built files to hosting
- **SSL certificate handling** - Ensures HTTPS for all sites
- **Deployment verification** - Confirms sites are accessible

## 🛠️ Static Site Generation

### Process Flow
1. **Data transformation** - Timeline → Life Story format
2. **HTML generation** - Layout-specific templates
3. **Asset compilation** - CSS, fonts, images
4. **File output** - Static files ready for hosting

### Layout Support
- **Timeline** - Chronological story view
- **Calendar** - Month-based organization  
- **Scrapbook** - Rotated cards with tape effects
- **Journal** - Lined paper journal entries
- **Polaroid** - Photo-style cards with pins
- **Postcard** - Travel postcard theme
- **Map** - Geographic journey visualization
- **Vinyl** - Record collection aesthetic
- **Bookshelf** - Library-style presentation
- **Art Gallery** - Museum exhibition layout

## 🌐 DNS & Hosting Integration

### Cloudflare DNS
```typescript
// Automatic subdomain creation
await dnsService.createSubdomainRecord('john', 'https://deploy-url.vercel.app');
// Results in: john.oceans.life → deploy-url.vercel.app
```

### Multi-Provider Hosting
```typescript
// Attempts Vercel first, falls back to Netlify
const result = await hostingService.deploy({
  subdomain: 'john',
  buildDir: '/tmp/build-john',
  siteTitle: 'John\'s Life Story'
});
```

### SSL & CDN
- **Automatic SSL** - All sites get HTTPS certificates
- **Global CDN** - Cloudflare proxy for fast loading
- **Edge caching** - Static assets cached worldwide

## 🔐 Security Features

### Reserved Subdomains
Prevents users from claiming system subdomains:
```typescript
const reserved = ['www', 'api', 'admin', 'app', 'blog', 'mail', 'ftp', 'ssh'];
```

### User Authentication
- **JWT tokens** - Secure API access
- **Site ownership** - Users can only manage their own sites
- **Input validation** - Subdomain format and content validation

## 📈 Monitoring & Logging

### Build Process Tracking
- **Real-time status updates** - pending → building → deployed
- **Build logs** - Detailed output for debugging
- **Error handling** - Graceful failure with user feedback

### Deployment History
- **Version tracking** - Each deployment gets a version number
- **Rollback capability** - Can redeploy previous versions
- **Performance metrics** - Build times and success rates

## 🚀 Getting Started

1. **Environment Setup**
   ```bash
   cp .env.example .env
   # Fill in your API keys for Cloudflare, Vercel, etc.
   ```

2. **Database Migration**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

3. **Start API Server**
   ```bash
   npm run dev
   ```

4. **Test Endpoints**
   ```bash
   curl -X POST http://localhost:3001/publishing/check-subdomain \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"subdomain": "testsite"}'
   ```

## 🔮 Future Enhancements

- **Custom domains** - Allow users to use their own domains
- **Advanced analytics** - Site visit tracking and engagement metrics  
- **Template marketplace** - User-created layout themes
- **Collaboration** - Multi-user site editing
- **Export options** - PDF, eBook, print-ready formats
- **Social sharing** - Easy story sharing on social platforms
- **SEO optimization** - Meta tags, sitemaps, structured data

---

The system provides a complete solution for transforming personal timelines into beautiful, hosted websites with custom subdomains and professional infrastructure. 🌊
