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

## Test

- For now running test on local setup only.
- For running a particular test file use
- terminate running api for running tests as max pool size limit is 1.

```
npm run test -- "<file path>"
from api folder.
```

- for running a paraticular `it` or `describe` block in a test file use

```
npm run test <file path> -t "<it/decribe block statement>"
```

If you see error like

```
PostgresError: too many connections for role "test"
```

Then run below query in pgadmin

```
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE usename = 'test'
  AND pid <> pg_backend_pid();
```

replace appropriate username!
