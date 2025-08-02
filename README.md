# 🎯 Tier-Based Event Showcase

A modern, responsive web application built with Next.js 14 that allows users to view events based on their membership tier. Users can only access events for their tier level and below, with the ability to upgrade their tier to unlock more exclusive events.

## 🚀 Features

- **🔐 Authentication**: Secure user authentication with Clerk.dev
- **🎫 Tier-Based Access**: Events filtered by user membership tier (Free, Silver, Gold, Platinum)
- **📱 Responsive Design**: Beautiful, mobile-first UI built with Tailwind CSS
- **⚡ Tier Upgrades**: Simulate tier upgrades to unlock more events
- **🎨 Modern UI**: Clean, accessible interface with hover effects and animations
- **🔄 Real-time Updates**: Instant UI updates after tier changes
- **🔒 Row-Level Security**: Supabase RLS for data security

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Authentication**: Clerk.dev
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- npm or yarn package manager
- A Clerk.dev account
- A Supabase account

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tier-based-event-showcase
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Clerk Authentication

1. Go to [Clerk.dev](https://clerk.dev) and create a new application
2. In your Clerk dashboard:
   - Navigate to **API Keys**
   - Copy your **Publishable Key** and **Secret Key**
3. Configure authentication providers (Email, Social logins, etc.)

### 4. Set Up Supabase Database

1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the database to be provisioned
3. In your Supabase dashboard:
   - Go to **Settings** > **API**
   - Copy your **Project URL** and **anon/public key**
   - Copy your **service_role key** (for admin operations)

4. Set up the database schema:
   - Go to **SQL Editor** in Supabase
   - Run the contents of `supabase/schema.sql`
   - Run the contents of `supabase/seed.sql` to populate sample data

### 5. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 6. Configure User Tiers in Clerk

To set up demo users with different tiers:

1. Go to your Clerk dashboard
2. Navigate to **Users**
3. For each user you want to test with:
   - Click on the user
   - Go to **Metadata** tab
   - Add to **Public Metadata**:
   ```json
   {
     "tier": "free"
   }
   ```
   - Use values: `"free"`, `"silver"`, `"gold"`, or `"platinum"`

### 7. Run the Application

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🧪 Demo Users & Testing

### Test User Scenarios

Create test users with different tiers to see the tier-based filtering in action:

1. **Free Tier User**:
   - Can see: Free events only
   - Cannot see: Silver, Gold, Platinum events

2. **Silver Tier User**:
   - Can see: Free, Silver events
   - Cannot see: Gold, Platinum events

3. **Gold Tier User**:
   - Can see: Free, Silver, Gold events
   - Cannot see: Platinum events

4. **Platinum Tier User**:
   - Can see: All events (Free, Silver, Gold, Platinum)

### Testing Tier Upgrades

1. Log in with any user
2. Navigate to the Events page
3. Use the "Upgrade Your Tier" section to simulate upgrades
4. Notice how more events become available after upgrading

## 📁 Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   │   ├── upgrade-tier/  # Tier upgrade endpoint
│   │   └── placeholder/   # Image placeholder service
│   ├── events/            # Events page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── EventCard.tsx      # Individual event card
│   ├── EventsContainer.tsx # Events grid container
│   ├── Navbar.tsx         # Navigation component
│   └── TierUpgrade.tsx    # Tier upgrade interface
├── lib/                   # Utility libraries
│   ├── clerk.ts           # Clerk helper functions
│   └── supabase.ts        # Supabase client & types
├── supabase/              # Database files
│   ├── schema.sql         # Database schema
│   └── seed.sql           # Sample data
└── middleware.ts          # Clerk authentication middleware
```

## 🎨 Design Features

### Responsive Design
- **Mobile-first approach** with Tailwind CSS
- **Adaptive grid layouts** that work on all screen sizes
- **Touch-friendly interactions** for mobile devices

### Tier-Based UI Elements
- **Color-coded tier badges** for easy identification
- **Locked event overlays** for restricted content
- **Progressive disclosure** of upgrade options

### Animations & Interactions
- **Hover effects** on cards and buttons
- **Smooth transitions** for state changes
- **Loading states** for better UX

## 🔒 Security Features

### Authentication
- **Protected routes** with Clerk middleware
- **User session management**
- **Secure API endpoints**

### Authorization
- **Tier-based access control**
- **Supabase Row-Level Security (RLS)**
- **Client-side filtering with server-side validation**

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set all the environment variables in your production environment:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk.dev Documentation](https://clerk.dev/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🐛 Troubleshooting

### Common Issues

1. **Authentication not working**:
   - Check Clerk environment variables
   - Verify Clerk webhook configurations

2. **Database connection issues**:
   - Verify Supabase environment variables
   - Check if RLS policies are properly configured

3. **Tier upgrades not working**:
   - Ensure API route is accessible
   - Check browser console for errors

### Getting Help

If you encounter issues:

1. Check the browser console for errors
2. Verify all environment variables are set correctly
3. Ensure database schema and seed data are properly loaded
4. Check Clerk and Supabase dashboards for any service issues

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Next.js 14, Clerk.dev, and Supabase** 