[🏡 Home](../README.md)

[![Create Supabase project](https://placehold.co/15x15/00ff00/00ff00.png)](../01-create-supabase-project/README.md)
[![Create Remix application](https://placehold.co/15x15/00ff00/00ff00.png)](../02-create-remix-application/README.md)
[![Query Supabase data with Remix Loaders](https://placehold.co/15x15/00ff00/00ff00.png)](../03-query-supabase-data-with-remix-loaders/README.md)
[![Generate TypeScript types from Supabase CLI](https://placehold.co/15x15/00ff00/00ff00.png)](../04-generate-typescript-types-from-supabase-cli/README.md)
[![Implement Supabase Auth using GitHub](https://placehold.co/15x15/00ff00/00ff00.png)](../05-implement-supabase-auth-using-github/README.md)
[![Restrict access with RLS policies](https://placehold.co/15x15/00ff00/00ff00.png)](../06-restrict-access-with-rls-policies/README.md)
[![Automatically set session cookie with Supabase Auth Helpers](https://placehold.co/15x15/555555/555555.png)](../07-automatically-set-session-cookie-with-supabase-auth-helpers/README.md)
[![Call active Loaders on Supabase Auth state change](https://placehold.co/15x15/555555/555555.png)](../08-call-active-loaders-on-supabase-auth-state-change/README.md)
[![Mutate Supabase data with Remix Actions](https://placehold.co/15x15/555555/555555.png)](../09-mutate-supabase-data-with-remix-actions/README.md)
[![Subscribe to database changes with Supabase Realtime](https://placehold.co/15x15/555555/555555.png)](../10-subscribe-to-database-changes-with-supabase-realtime/README.md)
[![Deploy Remix app to Vercel](https://placehold.co/15x15/555555/555555.png)](../11-deploy-remix-app-to-vercel/README.md)

# Restrict access with RLS policies

**[📹 Video](TODO)**

Row Level Security denies all access to the database. Select, insert, update and delete queries will be blocked by default. This allows us to write access policies in the database itself, to allow only what our application needs to function.

In this lesson, we look at adding a `user_id` column to the `messages` table, which has a foreign key relationship to the `auth.users` table - what Supabase uses to manage authentication and sessions.

Additionally, we step through a common migration pattern to use when existing data conflicts with the constraints of a new change in structure - we want each message to belong to a user, but the existing data had no column for `user_id`. This requires a three-step process where we add the column without the `not null` constraint, update the existing data to belong to a user, and then add the `not null` constraint to the `user_id` column.

Lastly, we update our RLS policy to only allow read access to signed in users.

## Code Snippets

> SQL code snippets can be run against your Supabase database by heading over to your project's [SQL Editor](https://app.supabase.com/project/_/sql), pasting them into a new query, and clicking `RUN`.

**Add column with not null constraint**

```sql
alter table public.messages
add user_id uuid references auth.users not null;
```

**Add column without not null constraint**

```sql
alter table public.messages
add user_id uuid references auth.users;
```

**Add not null constraint to column**

```sql
alter table public.messages
alter column user_id set not null;
```

**Alter RLS policy to require authenticated user**

```sql
begin;
  alter policy "users can read messages" on "public"."messages" rename to "authenticated users can read messages";
  alter policy "authenticated users can read messages" on "public"."messages" to authenticated;
commit;
```

## Resources

- [Implement Row Level Security in Supabase (video)](https://www.youtube.com/watch?v=Ow_Uzedfohk)

---

[👉 Next lesson](/07-automatically-set-session-cookie-with-supabase-auth-helpers/README.md)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
