[🏡 Home](../README.md)

[![Create Supabase project](https://placehold.co/15x15/00ff00/00ff00.png)](../01-create-supabase-project/README.md)
[![Create Remix application](https://placehold.co/15x15/00ff00/00ff00.png)](../02-create-remix-application/README.md)
[![Query Supabase data with Remix Loaders](https://placehold.co/15x15/00ff00/00ff00.png)](../03-query-supabase-data-with-remix-loaders/README.md)
[![Generate TypeScript types from Supabase CLI](https://placehold.co/15x15/00ff00/00ff00.png)](../04-generate-typescript-types-from-supabase-cli/README.md)
[![Implement Supabase Auth using GitHub](https://placehold.co/15x15/00ff00/00ff00.png)](../05-implement-supabase-auth-using-github/README.md)
[![Restrict access with RLS policies](https://placehold.co/15x15/555555/555555.png)](../06-restrict-access-with-rls-policies/README.md)
[![Automatically set session cookie with Supabase Auth Helpers](https://placehold.co/15x15/555555/555555.png)](../07-automatically-set-session-cookie-with-supabase-auth-helpers/README.md)
[![Call active Loaders on Supabase Auth state change](https://placehold.co/15x15/555555/555555.png)](../08-call-active-loaders-on-supabase-auth-state-change/README.md)
[![Mutate Supabase data with Remix Actions](https://placehold.co/15x15/555555/555555.png)](../09-mutate-supabase-data-with-remix-actions/README.md)
[![Subscribe to database changes with Supabase Realtime](https://placehold.co/15x15/555555/555555.png)](../10-subscribe-to-database-changes-with-supabase-realtime/README.md)
[![Deploy Remix app to Vercel](https://placehold.co/15x15/555555/555555.png)](../11-deploy-remix-app-to-vercel/README.md)

# Implement Supabase Auth using GitHub

**[📹 Video](https://egghead.io/lessons/github-implement-authentication-for-supabase-with-oauth-and-github?af=9qsk0a)**

Supabase supports [a collection of auth strategies](https://supabase.com/docs/guides/auth) - Email and password, passwordless and OAuth. In this lesson, we look at implementing OAuth with GitHub.

In order to do this, we [create a new GitHub OAuth app](https://github.com/settings/applications/new), and configure Supabase to use its Client ID and Secret. Additionally, we create a `<Login />` component that uses the Supabase client to sign users in and out.

This identifies a problem that we don't have access to the environment variables required to create a Supabase client outside of loaders or actions. Therefore, we pipe through our `SUPABASE_URL` and `SUPABASE_ANON_KEY` from the Loader function, and create a singleton Supabase client, to use across our components.

Lastly, we look at sharing this single instance of Supabase through the Outlet Context and declare types to ensure we have TypeScript helping us out throughout the application.

## Code Snippets

**Expose environment variables from the server**

```tsx
export const loader = async ({}: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  return json({ env });
};
```

**Access `env` in component**

```tsx
const { env } = useLoaderData<typeof loader>();
```

**Create a singleton Supabase client**

```tsx
const [supabase] = useState(() =>
  createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
);
```

**Share global variables with Outlet Context**

```tsx
<Outlet context={{ supabase }} />
```

**Consuming Outlet Context**

```tsx
const { supabase } = useOutletContext<SupabaseOutletContext>();
```

**Logging in with GitHub**

```tsx
await supabase.auth.signInWithOAuth({
  provider: "github",
});
```

**Logging out**

```tsx
await supabase.auth.signOut();
```

**Entire root component**

```tsx
import { json, LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";

import type { Database } from "db_types";

type TypedSupabaseClient = SupabaseClient<Database>;

export type SupabaseOutletContext = {
  supabase: TypedSupabaseClient;
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader = async ({}: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  return json({ env });
};

export default function App() {
  const { env } = useLoaderData<typeof loader>();

  const [supabase] = useState(() =>
    createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet context={{ supabase }} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

## Resources

- [Supabase docs - login with GitHub](https://supabase.com/docs/guides/auth/auth-github)
- [Remix docs - Outlet Context](https://remix.run/docs/en/v1/api/remix#useoutletcontext)

---

[👉 Next lesson](/06-restrict-access-with-rls-policies/README.md)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
