[🏡 Home](../README.md)

[![Create Supabase project](https://placehold.co/15x15/00ff00/00ff00.png)](../01-create-supabase-project/README.md)
[![Create Remix application](https://placehold.co/15x15/00ff00/00ff00.png)](../02-create-remix-application/README.md)
[![Query Supabase data with Remix Loaders](https://placehold.co/15x15/00ff00/00ff00.png)](../03-query-supabase-data-with-remix-loaders/README.md)
[![Generate TypeScript types from Supabase CLI](https://placehold.co/15x15/00ff00/00ff00.png)](../04-generate-typescript-types-from-supabase-cli/README.md)
[![Implement Supabase Auth using GitHub](https://placehold.co/15x15/00ff00/00ff00.png)](../05-implement-supabase-auth-using-github/README.md)
[![Restrict access with RLS policies](https://placehold.co/15x15/00ff00/00ff00.png)](../06-restrict-access-with-rls-policies/README.md)
[![Automatically set session cookie with Supabase Auth Helpers](https://placehold.co/15x15/00ff00/00ff00.png)](../07-automatically-set-session-cookie-with-supabase-auth-helpers/README.md)
[![Call active Loaders on Supabase Auth state change](https://placehold.co/15x15/555555/555555.png)](../08-call-active-loaders-on-supabase-auth-state-change/README.md)
[![Mutate Supabase data with Remix Actions](https://placehold.co/15x15/555555/555555.png)](../09-mutate-supabase-data-with-remix-actions/README.md)
[![Subscribe to database changes with Supabase Realtime](https://placehold.co/15x15/555555/555555.png)](../10-subscribe-to-database-changes-with-supabase-realtime/README.md)
[![Deploy Remix app to Vercel](https://placehold.co/15x15/555555/555555.png)](../11-deploy-remix-app-to-vercel/README.md)

# Automatically set session cookie with Supabase Auth Helpers

**[📹 Video](TODO)**

Remix Loaders allow us to fetch data server-side, before rendering a component. This works great if you are implementing your authorization rules for data fetching in the loader function, however, Supabase allows us to use Row Level Security policies to write access policies alongside the data in the database.

By default, `supabase-js` stores session data in `localStorage`, which exists only within the user's browser. If we want this session to be available within Loader or Action functions in Remix, we need to store the session in a cookie. Cookies are automatically sent with every request to the server.

In this lesson, we look at using the Supabase Auth Helpers package for Remix to automate this process, and swap out the storage mechanism for the Supabase client, to use cookies to store session data.

Additionally, we refactor our application to use the new `createServerClient` and `createBrowserClient` functions, making cookies the single source of truth about the user's current session, across the server and client-side of our Remix app.

## Code Snippets

**Install Remix Auth Helpers**

```bash
npm i @supabase/auth-helpers-remix
```

**Create server-side Supabase client**

```tsx
import { createServerClient } from "@supabase/auth-helpers-remix";

import type { Database } from "db_types";

export default ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) =>
  createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { request, response }
  );
```

**Create client-side Supabase client (simplified)**

```tsx
import { useState } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-remix";

export const loader = async ({ request }: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  return json({ env });
};

const { env, session } = useLoaderData<typeof loader>();

const [supabase] = useState(() =>
  createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
);

return <Outlet context={{ supabase }} />;
```

**Use Supabase in a loader**

```tsx
export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createServerSupabase({ request, response });

  const { data } = await supabase.from("messages").select();

  return json({ data }, { headers: response.headers });
};
```

**Use Supabase in an action**

```tsx
export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabase = createServerSupabase({ request, response });

  const { data } = await supabase.from("messages").insert({ content: "hello" });

  return json({ data }, { headers: response.headers });
};
```

**Use Supabase in a component**

```tsx
import { useOutletContext } from "@remix-run/react";

import type { SupabaseOutletContext } from "~/root";

export default function Login() {
  const { supabase } = useOutletContext<SupabaseOutletContext>();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

## Resources

- [Supabase docs - Remix Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/remix)

---

[👉 Next lesson](/08-call-active-loaders-on-supabase-auth-state-change/README.md)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
