[🏡 Home](../README.md)

[![Create Supabase project](https://placehold.co/15x15/00ff00/00ff00.png)](../01-create-supabase-project/README.md)
[![Create Remix application](https://placehold.co/15x15/555555/555555.png)](../02-create-remix-application/README.md)
[![Query Supabase data with Remix Loaders](https://placehold.co/15x15/555555/555555.png)](../03-query-supabase-data-with-remix-loaders/README.md)
[![Generate TypeScript types from Supabase CLI](https://placehold.co/15x15/555555/555555.png)](../04-generate-typescript-types-from-supabase-cli/README.md)
[![Implement Supabase Auth using GitHub](https://placehold.co/15x15/555555/555555.png)](../05-implement-supabase-auth-using-github/README.md)
[![Restrict access with RLS policies](https://placehold.co/15x15/555555/555555.png)](../06-restrict-access-with-rls-policies/README.md)
[![Automatically set session cookie with Supabase Auth Helpers](https://placehold.co/15x15/555555/555555.png)](../07-automatically-set-session-cookie-with-supabase-auth-helpers/README.md)
[![Call active Loaders on Supabase Auth state change](https://placehold.co/15x15/555555/555555.png)](../08-call-active-loaders-on-supabase-auth-state-change/README.md)
[![Mutate Supabase data with Remix Actions](https://placehold.co/15x15/555555/555555.png)](../09-mutate-supabase-data-with-remix-actions/README.md)
[![Subscribe to database changes with Supabase Realtime](https://placehold.co/15x15/555555/555555.png)](../10-subscribe-to-database-changes-with-supabase-realtime/README.md)
[![Deploy Remix app to Vercel](https://placehold.co/15x15/555555/555555.png)](../11-deploy-remix-app-to-vercel/README.md)

# Create Supabase project

**[📹 Video](https://egghead.io/lessons/egghead-create-a-supabase-project-with-a-table-and-example-data?af=9qsk0a)**

[Supabase](http://supabase.com?utm_source=egghead&utm_campaign=remix) handles hosting a database, authentication, authorization, file storage, realtime, edge functions, database functions, triggers and webhooks - lots of ways to build apps and automate backend stuff.

In this lesson, we head over to [database.new](https://database.new) to create a new Supabase project. Additionally, we use the dashboard to easily create a new table for our `messages`. We talk through some different data types and constraints that can be applied to columns. Lastly, we populate our new table with some example messages.

## Code Snippets

> SQL code snippets can be run against your Supabase database by heading over to your project's [SQL Editor](https://app.supabase.com/project/_/sql), pasting them into a new query, and clicking `RUN`.

**Create a messages table**

```sql
create table if not exists messages (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  content text not null
);
```

**Insert messages**

```sql
insert into messages(content)
values
  ('first message'),
  ('second message');
```

## Resources

- [Supabase Docs](https://supabase.com/docs)

---

[👉 Next lesson](/02-create-remix-application/README.md)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
