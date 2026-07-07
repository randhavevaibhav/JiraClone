## Drizzle

Run below commands to push changes to local or remote db

1. pnpm run db:push (for development)
   - this command will directly push changes to db
   - use it directly only in development
2. For PROD
   - first run
     pnpm db:generate
     this will generate a migration file
   - second run
     pnpm db:migrate
     this will migrate all changes to PROD db.
     Note that sequence is very IMP first generate and then migrate otherwise cmd will FAIL.
