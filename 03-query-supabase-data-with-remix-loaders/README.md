[🏡 Home](../README.md)

[![Create Supabase project](https://placehold.co/15x15/00ff00/00ff00.png)](../01-create-supabase-project/README.md)
[![Create Remix application](https://placehold.co/15x15/00ff00/00ff00.png)](../02-create-remix-application/README.md)
[![Query Supabase data with Remix Loaders](https://placehold.co/15x15/00ff00/00ff00.png)](../03-query-supabase-data-with-remix-loaders/README.md)
[![Generate TypeScript types from Supabase CLI](https://placehold.co/15x15/555555/555555.png)](../04-generate-typescript-types-from-supabase-cli/README.md)
[![Implement Supabase Auth using GitHub](https://placehold.co/15x15/555555/555555.png)](../05-implement-supabase-auth-using-github/README.md)
[![Restrict access with RLS policies](https://placehold.co/15x15/555555/555555.png)](../06-restrict-access-with-rls-policies/README.md)
[![Automatically set session cookie with Supabase Auth Helpers](https://placehold.co/15x15/555555/555555.png)](../07-automatically-set-session-cookie-with-supabase-auth-helpers/README.md)
[![Call active Loaders on Supabase Auth state change](https://placehold.co/15x15/555555/555555.png)](../08-call-active-loaders-on-supabase-auth-state-change/README.md)
[![Mutate Supabase data with Remix Actions](https://placehold.co/15x15/555555/555555.png)](../09-mutate-supabase-data-with-remix-actions/README.md)
[![Subscribe to database changes with Supabase Realtime](https://placehold.co/15x15/555555/555555.png)](../10-subscribe-to-database-changes-with-supabase-realtime/README.md)
[![Deploy Remix app to Vercel](https://placehold.co/15x15/555555/555555.png)](../11-deploy-remix-app-to-vercel/README.md)

# Query Supabase data with Remix Loaders

**[📹 Video](TODO)**

The [supabase-js](https://supabase.com/docs/reference/javascript) package allows us to connect to our Supabase project, and easily query and mutate data. In this lesson, we install `supabase-js`, set up environment variables for `SUPABASE_URL` and `SUPABASE_ANON_KEY`, and create a Supabase client to use across our application.

Additionally, we look at writing an RLS policy to enable `read` access to our `messages` table, use our Supabase client to select all messages, and display them in our Remix app on load.

## Code Snippets

**Install supabase-js**

```bash
npm i @supabase/supabase-js
```

**Use a Loader function to fetch data**

```tsx
export const loader = async () => {
  return null;
};
```

**Fetch data with Supabase Client**

```tsx
const { data } = await supabase.from("messages").select();
```

**Full component**

```tsx
import { useLoaderData } from "@remix-run/react";
import supabase from "utils/supabase";

export const loader = async ({}) => {
  const { data } = await supabase.from("messages").select();
  return { data };
};

export default function Index() {
  const { data } = useLoaderData();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

**Enable read access with RLS policy**

```sql
create policy "users can read messages" ON "public"."messages"
as permissive for select
to public
using (true);
```

> SQL code snippets can be run against your Supabase database by heading over to your project's [SQL Editor](https://app.supabase.com/project/_/sql), pasting them into a new query, and clicking `RUN`.

## Resources

- [Supabase-js docs](https://supabase.com/docs/reference/javascript)
- [Implement Row Level Security in Supabase (video)](https://www.youtube.com/watch?v=Ow_Uzedfohk)
- [Auto-generated project docs](https://app.supabase.com/project/_/api)

---

[👉 Next lesson](/04-generate-typescript-types-from-supabase-cli/README.md)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
