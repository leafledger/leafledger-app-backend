# Database Setup Guide

## Overview

This project supports both local PostgreSQL and Supabase (production) databases. You can easily switch between them using npm scripts.

## Environment Files

- `.env.local` - Local PostgreSQL configuration
- `.env.production` - Supabase (production) configuration
- `.env` - Active environment (automatically copied from local or production)
- `.env.example` - Template file (committed to git)

## Quick Start

### Option 1: Connect to Local PostgreSQL

```bash
# Run development server with local database
npm run dev:local

# Seed local database
npm run seed:local
```

This will:
- Copy `.env.local` to `.env`
- Connect to PostgreSQL at `localhost:5432`
- Database name: `leafledger`

**Prerequisites:**
1. PostgreSQL installed and running locally
2. Database created: `CREATE DATABASE leafledger;`
3. Update credentials in `.env.local` if needed

### Option 2: Connect to Supabase (Production)

```bash
# Run development server with Supabase
npm run dev:prod

# Seed Supabase database
npm run seed:prod
```

This will:
- Copy `.env.production` to `.env`
- Connect to Supabase cloud database
- Use connection pooling for better performance

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Run with current `.env` file |
| `npm run dev:local` | Run with local PostgreSQL |
| `npm run dev:prod` | Run with Supabase |
| `npm run seed` | Seed current database |
| `npm run seed:local` | Seed local database |
| `npm run seed:prod` | Seed Supabase database |
| `npm run prisma:studio` | Open Prisma Studio GUI |
| `npm run prisma:migrate` | Run migrations |

## Database Migrations

### For Local Development

```bash
# Create and apply migration
npm run dev:local
npx prisma migrate dev --name your_migration_name
```

### For Production (Supabase)

```bash
# Apply migrations to production
npm run dev:prod
npx prisma migrate deploy
```

## Connection String Format

### Local PostgreSQL
```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"
DIRECT_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"
```

### Supabase
```
DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://[USER]:[PASSWORD]@[HOST]:5432/postgres"
```

**Note:**
- Port `6543` = Pooled connection (for runtime queries)
- Port `5432` = Direct connection (for migrations)

## Checking Active Database

When you start the server, you'll see:

```
[DATABASE] Connected successfully to Local PostgreSQL
[DATABASE] Environment: development
[DATABASE] Connection verified
[SERVER] Running on port 8000
```

or

```
[DATABASE] Connected successfully to Supabase (Production)
[DATABASE] Environment: production
[DATABASE] Connection verified
[SERVER] Running on port 8000
```

## Viewing Database Data

### Using Prisma Studio
```bash
npm run prisma:studio
```
Opens at `http://localhost:5555`

### Using Supabase Dashboard
Navigate to: https://supabase.com/dashboard/project/lbqqlaqzeyuszrhtdnvc/editor

## Initial Setup

### 1. Setup Local Database (Optional)

```bash
# Install PostgreSQL
# Create database
createdb leafledger

# Or using psql
psql -U postgres
CREATE DATABASE leafledger;
\q

# Update credentials in .env.local
# Run migrations
npm run dev:local
npx prisma migrate dev --name init

# Seed data
npm run seed:local
```

### 2. Setup Supabase (Already configured)

```bash
# Supabase is already configured
# Just seed the data
npm run seed:prod
```

## Seeded Data

Both databases will have:

**Provinces:**
- PUN - Punjab
- SIN - Sindh
- KPK - Khyber Pakhtunkhwa
- BAL - Balochistan
- GB - Gilgit-Baltistan
- AJK - Azad Jammu and Kashmir
- ICT - Islamabad Capital Territory

**Plans:**
- Plan 1 (Free): 7 days history, 1 login
- Plan 2 (₨999): 30 days history, 3 logins, refresh enabled
- Plan 3 (₨2999): 90 days history, 10 logins, refresh enabled

## Troubleshooting

### Local database connection fails
```bash
# Check if PostgreSQL is running
psql -U postgres -c "SELECT version();"

# Check if database exists
psql -U postgres -l | grep leafledger

# Create database if missing
createdb leafledger
```

### Supabase connection fails
- Verify credentials in `.env.production`
- Check Supabase dashboard for service status
- Ensure IP is whitelisted (Supabase allows all by default)

### Migration issues
```bash
# Reset local database
npx prisma migrate reset

# Force push schema (destructive)
npx prisma db push --force-reset
```

## Best Practices

1. **Development**: Use local PostgreSQL for faster iteration
2. **Testing**: Use Supabase for integration testing
3. **Production**: Use Supabase with proper connection pooling
4. **Never commit**: `.env`, `.env.local`, `.env.production`
5. **Always commit**: `.env.example`

## Security Notes

- Change `JWT_SECRET` in production
- Use strong database passwords
- Never expose `.env` files
- Rotate Supabase credentials regularly
- Use environment variables in CI/CD
