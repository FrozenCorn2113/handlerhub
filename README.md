# HandlerHub

**The Professional Dog Show Handler Marketplace**

HandlerHub connects professional dog show handlers with exhibitors, making it easy to find, book, and manage handler services for dog shows across the country.

## About HandlerHub

HandlerHub is a specialized marketplace platform that helps:

- **Exhibitors** find and book qualified professional handlers for their dogs
- **Handlers** showcase their expertise, manage bookings, and grow their business
- **Show community** build trust through verified profiles and transparent pricing

## Tech Stack

### Frameworks

- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [Auth.js v5](https://authjs.dev/) - Authentication with multiple providers
- [Prisma](https://www.prisma.io/) - Type-safe database ORM
- [React Email](https://react.email/) - Email template framework

### Database & Platforms

- [PostgreSQL](https://www.postgresql.org/) via [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/) - Deployment and hosting
- [Resend](https://resend.com/) - Transactional emails

### UI & Styling

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Shadcn/ui](https://ui.shadcn.com/) - Accessible component library
- [Framer Motion](https://framer.com/motion) - Animation library
- [Lucide](https://lucide.dev/) - Icon library

## Getting Started

### Prerequisites

- Node.js 20.10.0 or higher
- npm, pnpm, or bun package manager
- Supabase account (free tier works)
- Google OAuth credentials
- Resend account for emails

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd HandlerHub
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

- Supabase database URLs
- Google OAuth credentials
- Resend API key
- NextAuth secret

See `HANDLERHUB_SETUP.md` for detailed setup instructions.

4. Initialize the database:

```bash
npx prisma generate
npx prisma db push
npm run prisma:seed
```

5. Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see the app!

## Key Features

- **User Roles**: Admin, Handler, and Exhibitor accounts
- **Handler Profiles**: Showcase experience, specialties, breeds, and pricing
- **Search & Discovery**: Find handlers by location, breeds, and services
- **Booking System**: Request and manage handler bookings
- **Secure Authentication**: Google OAuth and email/password login
- **Responsive Design**: Works on desktop, tablet, and mobile

## Project Structure

```
/src
  /app                 # Next.js App Router pages
    /(auth)           # Authentication pages
    /(dashboard)      # User dashboard
    /(dashboard-admin)# Admin dashboard
    /(marketing)      # Public marketing pages
    /api             # API routes
  /components         # React components
    /ui              # Shadcn UI components
  /lib               # Utilities and helpers
/prisma
  schema.prisma      # Database schema
  seed.ts           # Seed data script
/public              # Static assets
```

## Development Commands

```bash
# Start dev server
npm run dev

# Start dev server (turbo mode)
npm run dev:turbo

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Format code
npm run format:fix

# View database
npx prisma studio

# Reset and re-seed database
npx prisma db push --force-reset && npm run prisma:seed
```

## Test Accounts

After running the seed script, you can log in with:

| Role      | Email                     | Password    |
| --------- | ------------------------- | ----------- |
| Admin     | admin@handlerhub.com      | password123 |
| Handler   | handler1@handlerhub.com   | password123 |
| Exhibitor | exhibitor1@handlerhub.com | password123 |

## Contributing

This is a private project. Please contact the team for contribution guidelines.

## License

Copyright (c) 2024 HandlerHub. All rights reserved.
