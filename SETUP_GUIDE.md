# 🚀 Quick Setup Guide

Follow these steps to get your Tier-Based Event Showcase up and running in minutes!

## ⚡ Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Setup Script
```bash
npm run setup
```
This interactive script will help you configure all environment variables.

### 3. Set Up Supabase Database

1. **Go to [Supabase](https://supabase.com)** and create a new project
2. **Wait for database provisioning** (2-3 minutes)
3. **Run the database setup:**
   - Go to **SQL Editor** in your Supabase dashboard
   - Copy and paste the contents of `supabase/schema.sql`
   - Click **Run**
   - Copy and paste the contents of `supabase/seed.sql`
   - Click **Run**

### 4. Configure Clerk Users (Optional but Recommended)

1. **Go to [Clerk.dev](https://clerk.dev)** dashboard
2. **Navigate to Users** section
3. **For each test user:**
   - Click on the user
   - Go to **Metadata** tab
   - Add to **Public Metadata**:
   ```json
   {
     "tier": "silver"
   }
   ```
   - Use different tiers: `"free"`, `"silver"`, `"gold"`, `"platinum"`

### 5. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

## 🧪 Testing the App

1. **Sign up/Sign in** with Clerk
2. **Navigate to Events** page
3. **Test tier filtering** by upgrading your tier
4. **See restricted events** unlock as you upgrade

## 📋 What You'll Have

- ✅ **8 sample events** (2 per tier)
- ✅ **Responsive design** that works on all devices
- ✅ **Tier-based filtering** system
- ✅ **Upgrade simulation** functionality
- ✅ **Beautiful UI** with animations and hover effects

## 🆘 Need Help?

- **Database issues?** Check Supabase dashboard for connection status
- **Authentication problems?** Verify Clerk keys in `.env.local`
- **Build errors?** Run `npm install` again

For detailed troubleshooting, see the main [README.md](README.md) file.

---

**Happy coding! 🎯** 