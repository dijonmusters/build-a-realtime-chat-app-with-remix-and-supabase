[🏡 Home](../README.md)

[![Create Supabase project](https://placehold.co/15x15/00ff00/00ff00.png)](../01-create-supabase-project/README.md)
[![Create Remix application](https://placehold.co/15x15/00ff00/00ff00.png)](../02-create-remix-application/README.md)
[![Query Supabase data with Remix Loaders](https://placehold.co/15x15/00ff00/00ff00.png)](../03-query-supabase-data-with-remix-loaders/README.md)
[![Generate TypeScript types from Supabase CLI](https://placehold.co/15x15/00ff00/00ff00.png)](../04-generate-typescript-types-from-supabase-cli/README.md)
[![Implement Supabase Auth using GitHub](https://placehold.co/15x15/00ff00/00ff00.png)](../05-implement-supabase-auth-using-github/README.md)
[![Restrict access with RLS policies](https://placehold.co/15x15/00ff00/00ff00.png)](../06-restrict-access-with-rls-policies/README.md)
[![Automatically set session cookie with Supabase Auth Helpers](https://placehold.co/15x15/00ff00/00ff00.png)](../07-automatically-set-session-cookie-with-supabase-auth-helpers/README.md)
[![Call active Loaders on Supabase Auth state change](https://placehold.co/15x15/00ff00/00ff00.png)](../08-call-active-loaders-on-supabase-auth-state-change/README.md)
[![Mutate Supabase data with Remix Actions](https://placehold.co/15x15/00ff00/00ff00.png)](../09-mutate-supabase-data-with-remix-actions/README.md)
[![Subscribe to database changes with Supabase Realtime](https://placehold.co/15x15/00ff00/00ff00.png)](../10-subscribe-to-database-changes-with-supabase-realtime/README.md)
[![Deploy Remix app to Vercel](https://placehold.co/15x15/555555/555555.png)](../11-deploy-remix-app-to-vercel/README.md)

# Subscribe to database changes with Supabase Realtime

**[📹 Video](TODO)**

[Supabase Realtime](https://supabase.com/docs/guides/realtime) allow us to subscribe to change events in the database - `insert`, `update` and `delete` - and update the UI dynamically. In this lesson, we [enable `replication` on the `messages` table](https://app.supabase.com/project/_/database/replication) to tell Supabase we want to know about changes to this table.

Additionally, we use the Supabase client to set up a subscription for `insert` events on the `messages` table. This will receive websocket updates from Supabase, which we can handle in a callback function, and merge our server state with realtime updates, to allow our application to dynamically update as new messages are sent.

## Code Snippets

**Subscribe to realtime updates**

```tsx
useEffect(() => {
  const channel = supabase
    .channel("*")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        const newMessage = payload.new as Message;

        if (!messages.find((message) => message.id === newMessage.id)) {
          setMessages([...messages, newMessage]);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [supabase, messages, setMessages]);
```

**Enable realtime events on messages table**

```sql
alter table public.messages
replica identity full;
```

> SQL code snippets can be run against your Supabase database by heading over to your project's [SQL Editor](https://app.supabase.com/project/_/sql), pasting them into a new query, and clicking `RUN`.

## Resources

- [Your project's replication settings](https://app.supabase.com/project/_/database/replication)
- [Supabase docs - Realtime guide](https://supabase.com/docs/guides/realtime)
- [Supabase docs - Realtime in JS](https://supabase.com/docs/reference/javascript/subscribe)

---

[👉 Next lesson](/11-deploy-remix-app-to-vercel/README.md)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
