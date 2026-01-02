# Render Deployment Guide: Adeleke University Portal

This guide will walk you through deploying your Vite + React + TypeScript application on Render, with Supabase as your backend service.

## 🏗️ Architecture Overview

- **Frontend**: Vite + React + TypeScript (deployed on Render)
- **Backend**: Supabase (serverless - already hosted)
- **Database**: PostgreSQL (via Supabase)
- **Storage**: Supabase Storage
- **Authentication**: Supabase Auth

> [!NOTE]
> Since you're using Supabase, you only need to deploy the frontend on Render. Supabase is already a hosted backend service, so there's no separate backend server to deploy.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- [ ] A [Render account](https://render.com) (free tier available)
- [ ] Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- [ ] Your Supabase project credentials (URL and anon key)
- [ ] All environment variables documented

---

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Project for Deployment

#### 1.1 Update `.gitignore`

Ensure sensitive files are not committed:

```gitignore
# Environment files
.env
.env.local
.env.production

# Dependencies
node_modules/

# Build output
dist/
build/

# IDE
.vscode/
.idea/
```

#### 1.2 Create Environment Variable Template

Make sure your `.env.local.example` file is up to date with all required variables (without actual values):

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

#### 1.3 Verify Build Script

Check that your `package.json` has the correct build script:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

#### 1.4 Test Local Build

Run a local build to ensure everything works:

```bash
npm run build
```

This should create a `dist` folder with your production-ready files.

---

### Step 2: Push Code to Git Repository

If you haven't already, push your code to GitHub (or GitLab/Bitbucket):

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for Render deployment"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to main branch
git push -u origin main
```

> [!IMPORTANT]
> Never commit your `.env.local` file with actual credentials. Only commit `.env.local.example`.

---

### Step 3: Create a New Web Service on Render

#### 3.1 Log in to Render

1. Go to [render.com](https://render.com)
2. Sign in or create an account
3. Click **"New +"** button in the top right
4. Select **"Static Site"**

#### 3.2 Connect Your Repository

1. Click **"Connect a repository"**
2. Select your Git provider (GitHub, GitLab, or Bitbucket)
3. Authorize Render to access your repositories
4. Search for and select your `adeleke-university-portal` repository

#### 3.3 Configure the Static Site

Fill in the following settings:

| Setting | Value |
|---------|-------|
| **Name** | `adeleke-university-portal` (or your preferred name) |
| **Branch** | `main` (or your default branch) |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

> [!TIP]
> The publish directory for Vite projects is typically `dist`. This is where Vite outputs the built files.

---

### Step 4: Configure Environment Variables

In the Render dashboard for your static site:

1. Scroll down to **"Environment Variables"** section
2. Click **"Add Environment Variable"**
3. Add each variable from your `.env.local` file:

| Key | Value | Notes |
|-----|-------|-------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Found in Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key | Found in Supabase Dashboard → Settings → API |
| `VITE_GOOGLE_CLIENT_ID` | Your Google OAuth Client ID | From Google Cloud Console |

> [!WARNING]
> Make sure all environment variables start with `VITE_` prefix. Vite only exposes environment variables that start with `VITE_` to the client-side code.

---

### Step 5: Deploy Your Application

1. Click **"Create Static Site"** at the bottom of the page
2. Render will automatically:
   - Clone your repository
   - Install dependencies (`npm install`)
   - Run the build command (`npm run build`)
   - Deploy the `dist` folder

The initial deployment may take 2-5 minutes.

---

### Step 6: Configure Custom Domain (Optional)

#### 6.1 Using Render's Free Domain

After deployment, Render provides a free `.onrender.com` domain:
- Your site will be available at: `https://adeleke-university-portal.onrender.com`

#### 6.2 Adding a Custom Domain

To use your own domain:

1. In the Render dashboard, go to your static site
2. Click **"Settings"** → **"Custom Domains"**
3. Click **"Add Custom Domain"**
4. Enter your domain (e.g., `portal.adeleke.edu.ng`)
5. Follow Render's instructions to update your DNS records

---

### Step 7: Update Supabase Configuration

After deployment, you need to update your Supabase project to allow requests from your Render domain.

#### 7.1 Update Authentication URLs

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication → URL Configuration**
4. Update the following:

| Field | Value |
|-------|-------|
| **Site URL** | `https://your-app-name.onrender.com` |
| **Redirect URLs** | Add: `https://your-app-name.onrender.com/**` |

#### 7.2 Update Google OAuth Redirect URIs

If you're using Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **APIs & Services → Credentials**
3. Click on your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, add:
   ```
   https://YOUR_SUPABASE_PROJECT_REF.supabase.co/auth/v1/callback
   ```
5. Under **Authorized JavaScript origins**, add:
   ```
   https://your-app-name.onrender.com
   ```

---

### Step 8: Verify Deployment

#### 8.1 Check Build Logs

1. In Render dashboard, click on your static site
2. Click on **"Logs"** tab
3. Verify the build completed successfully
4. Look for messages like:
   ```
   Build successful
   Static site live at https://your-app-name.onrender.com
   ```

#### 8.2 Test Your Application

Visit your deployed URL and test the following:

- [ ] Home page loads correctly
- [ ] All routes work (no 404 errors)
- [ ] User authentication (sign up, sign in, sign out)
- [ ] Google OAuth login
- [ ] File uploads to Supabase Storage
- [ ] Data fetching from Supabase database
- [ ] All API calls to Supabase work

---

## 🔧 Troubleshooting Common Issues

### Issue 1: 404 Errors on Page Refresh

**Problem**: When you refresh a page or navigate directly to a route (e.g., `/dashboard`), you get a 404 error.

**Solution**: Configure redirects for your Single Page Application (SPA).

Create a `_redirects` file in your `public` folder:

```bash
# public/_redirects
/*    /index.html   200
```

Or create a `render.yaml` file in your project root:

```yaml
services:
  - type: web
    name: adeleke-university-portal
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

### Issue 2: Environment Variables Not Working

**Problem**: Your app can't connect to Supabase after deployment.

**Solutions**:

1. **Check variable names**: Ensure all variables start with `VITE_`
2. **Verify in Render**: Go to Settings → Environment Variables and confirm they're set
3. **Redeploy**: After adding env variables, click "Manual Deploy → Deploy latest commit"
4. **Check build logs**: Search for your variables in the build output (they should be present)

### Issue 3: Build Fails with TypeScript Errors

**Problem**: Build command fails with TypeScript compilation errors.

**Solutions**:

1. **Fix TypeScript errors locally first**:
   ```bash
   npm run build
   ```
2. **Temporary workaround** (not recommended for production):
   Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     build: {
       rollupOptions: {
         onwarn(warning, warn) {
           // Suppress certain warnings
           if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
           warn(warning);
         }
       }
     }
   });
   ```

### Issue 4: CORS Errors

**Problem**: Getting CORS errors when making requests to Supabase.

**Solution**: Supabase should allow requests from any origin by default, but if you face issues:

1. Check **Supabase Dashboard → Settings → API**
2. Verify your Supabase URL and anon key are correct
3. Ensure you've added your Render domain to Supabase's allowed origins (if configured)

### Issue 5: Slow Initial Load Time

**Problem**: The first visit to your site is slow.

**Explanations & Solutions**:

1. **Render's Free Tier**: Free tier instances spin down after 15 minutes of inactivity and take 30-60 seconds to spin back up
2. **Upgrade to Paid Plan**: Consider upgrading to a paid plan for always-on instances
3. **Optimize Build**:
   - Enable code splitting
   - Lazy load components
   - Optimize images

---

## 🔄 Continuous Deployment

Render automatically deploys your app when you push to your connected branch:

1. Make changes to your code locally
2. Commit and push to your repository:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. Render automatically detects the push and redeploys

You can also trigger manual deployments in the Render dashboard.

---

## 📊 Monitoring and Logs

### View Deployment Logs

1. Go to your static site in Render dashboard
2. Click **"Logs"** tab
3. View real-time logs of builds and deployments

### Check Site Status

1. Click on **"Events"** tab
2. See deployment history and status

---

## 💰 Pricing Considerations

### Render Free Tier

- **Static Sites**: Free forever
- **Bandwidth**: 100 GB/month
- **Build Minutes**: 500 minutes/month
- **Limitations**: Sites may spin down after inactivity

### Render Paid Plans

If you need more resources, consider upgrading:

- **Starter Plan**: $7/month
  - Increased bandwidth and build minutes
  - Faster build times
- **Standard Plan**: Custom pricing for enterprise needs

### Supabase Pricing

Your Supabase backend operates independently:

- **Free Tier**: 
  - 500 MB database
  - 1 GB file storage
  - 2 GB bandwidth
- **Pro Plan**: $25/month for more resources

---

## 🔐 Security Best Practices

### Environment Variables

- [ ] Never commit `.env.local` to Git
- [ ] Use Row Level Security (RLS) in Supabase
- [ ] Rotate keys if accidentally exposed

### Supabase Security

- [ ] Enable RLS on all tables
- [ ] Use service role key only for server-side operations
- [ ] Implement proper authentication flows
- [ ] Validate data on both client and server side

### HTTPS

- [ ] Render provides free SSL certificates
- [ ] Always use HTTPS URLs
- [ ] Update all OAuth redirect URIs to use HTTPS

---

## 🎯 Post-Deployment Checklist

After successful deployment:

- [ ] Test all user flows (sign up, login, logout)
- [ ] Verify file uploads work
- [ ] Test Google OAuth integration
- [ ] Check responsive design on mobile devices
- [ ] Run Lighthouse audit for performance
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure analytics (e.g., Google Analytics)
- [ ] Create backups of your Supabase database
- [ ] Document your deployment process
- [ ] Share the live URL with stakeholders

---

## 📚 Additional Resources

### Render Documentation
- [Static Sites Guide](https://render.com/docs/static-sites)
- [Environment Variables](https://render.com/docs/environment-variables)
- [Custom Domains](https://render.com/docs/custom-domains)

### Supabase Documentation
- [Authentication Guide](https://supabase.com/docs/guides/auth)
- [Storage Guide](https://supabase.com/docs/guides/storage)
- [Database Guide](https://supabase.com/docs/guides/database)

### Vite Documentation
- [Building for Production](https://vitejs.dev/guide/build.html)
- [Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

## 🆘 Getting Help

If you encounter issues:

1. **Check Render Logs**: Most issues are visible in build/runtime logs
2. **Render Community**: [community.render.com](https://community.render.com)
3. **Supabase Discord**: [discord.supabase.com](https://discord.supabase.com)
4. **GitHub Issues**: Create an issue in your repository

---

## 🎉 Conclusion

You should now have:

✅ Your frontend deployed on Render  
✅ Automatic deployments on Git push  
✅ Environment variables configured securely  
✅ Proper connection to Supabase backend  
✅ SSL certificate (HTTPS) configured automatically  

Your Adeleke University Portal is now live and accessible to users!

---

**Last Updated**: January 1, 2026

**Need Help?** Refer to the troubleshooting section or check the deployment logs in your Render dashboard.
