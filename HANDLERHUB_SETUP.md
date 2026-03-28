# HandlerHub Setup Guide

This guide will walk you through setting up your HandlerHub marketplace MVP.

## 🎯 What We've Done So Far

✅ Cloned Next SaaS Template (Next.js 14 + TypeScript + Tailwind)
✅ Installed all dependencies
✅ Created Prisma schema with HandlerHub data models:

- User roles (ADMIN, EXHIBITOR, HANDLER)
- HandlerProfile model (bio, breeds, regions, services, pricing)
- BookingRequest model (show details, status tracking)
  ✅ Created seed file with test data (10 handlers, 5 exhibitors, sample bookings)

## 📋 Next Steps - Before You Can Run

### Step 1: Set Up Supabase Database

1. **Go to [Supabase](https://supabase.com)** and create a free account
2. **Create a new project:**
   - Project name: `handlerhub` (or your choice)
   - Database password: Choose a strong password (save it!)
   - Region: Choose closest to you
   - Click "Create new project" (takes ~2 minutes)

3. **Get your database connection strings:**
   - Go to Project Settings (gear icon) → Database
   - Scroll down to "Connection string"
   - **Copy the "Connection pooling" URI** (Session mode)
     - It looks like: `postgresql://postgres.xxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres`
   - **Also copy the "Direct connection" URI**
     - It looks like: `postgresql://postgres.xxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:5432/postgres`
   - Replace `[YOUR-PASSWORD]` with your actual database password in both

4. **Update your `.env` file:**
   ```bash
   # Open .env file and replace these lines:
   POSTGRES_DATABASE_URL="your-connection-pooling-uri-here"
   POSTGRES_DATABASE_URL_UNPOOLED="your-direct-connection-uri-here"
   ```

### Step 2: Set Up Google OAuth

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create a new project** or select existing
3. **Enable Google+ API:**
   - Search for "Google+ API" in the search bar
   - Click "Enable"
4. **Create OAuth Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "HandlerHub"
   - Authorized JavaScript origins:
     - `http://localhost:3000`
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
   - Click "Create"
   - **Copy your Client ID and Client Secret**

5. **Update your `.env` file:**
   ```bash
   GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret-here
   ```

### Step 3: Set Up Resend for Emails

1. **Go to [Resend](https://resend.com)** and create an account
2. **Get your API key:**
   - Go to "API Keys" in dashboard
   - Click "Create API Key"
   - Name: "HandlerHub Development"
   - Permission: "Sending access"
   - Click "Create"
   - **Copy your API key** (starts with `re_`)

3. **Update your `.env` file:**

   ```bash
   RESEND_API_KEY=re_your_api_key_here
   RESEND_FROM_EMAIL="HandlerHub <noreply@handlerhub.com>"
   ```

   Note: In development, Resend allows you to send to any email. For production, you'll need to verify your domain.

### Step 4: Generate NextAuth Secret

1. **Generate a random secret:**

   ```bash
   openssl rand -base64 32
   ```

2. **Update your `.env` file:**
   ```bash
   NEXTAUTH_SECRET=your-generated-secret-here
   ```

### Step 5: Run Database Migrations

Once your Supabase connection strings are in `.env`:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (creates all tables)
npx prisma db push

# Seed the database with test data
npm run prisma:seed
```

You should see output like:

```
✅ Database has been seeded successfully! 🌱
📋 Test Accounts Created:
  Admin:      admin@handlerhub.com / password123
  Handlers:   handler1-10@handlerhub.com / password123
  Exhibitors: exhibitor1-5@handlerhub.com / password123
```

### Step 6: Start the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` - you should see the app!

## 🧪 Test Accounts

After seeding, you can log in with:

| Role      | Email                     | Password    |
| --------- | ------------------------- | ----------- |
| Admin     | admin@handlerhub.com      | password123 |
| Handler   | handler1@handlerhub.com   | password123 |
| Handler   | handler2@handlerhub.com   | password123 |
| Exhibitor | exhibitor1@handlerhub.com | password123 |

## 🛠️ Useful Commands

```bash
# Start development server
npm run dev

# Start development server with turbo (faster)
npm run dev:turbo

# View database in Prisma Studio
npx prisma studio

# Reset database and re-seed
npx prisma db push --force-reset && npm run prisma:seed

# Build for production
npm run build

# Run production build
npm run start
```

## 📂 Project Structure

```
/src
  /app                 # Next.js App Router pages
    /api              # API routes
    /auth             # Authentication pages
    /dashboard        # User dashboard
  /components         # React components
    /ui              # Shadcn UI components
  /lib               # Utilities and helpers
/prisma
  schema.prisma      # Database schema
  seed.ts           # Seed data
/public              # Static assets
```

## 🚀 What's Next?

Now that the foundation is set up, we'll build:

1. ✅ Auth pages (login, signup, role selection)
2. ✅ Handler profile creation/editing
3. ✅ Handler browse/search page for exhibitors
4. ✅ Handler profile public view page
5. ✅ Booking request form and inbox
6. ✅ Landing page with HandlerHub branding

## ❓ Troubleshooting

### Can't connect to database

- Check that your Supabase connection strings are correct
- Make sure there are no extra spaces in the .env file
- Verify your database password is correct

### OAuth not working

- Make sure redirect URIs in Google Cloud Console match exactly
- Check that GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set
- Restart the dev server after changing .env

### Prisma errors

- Run `npx prisma generate` after changing schema
- Run `npx prisma db push` to apply schema changes
- Use `npx prisma studio` to view your database

---

## 📞 Need Help?

Once you've completed these setup steps, let me know and we'll continue with building the HandlerHub-specific features!
