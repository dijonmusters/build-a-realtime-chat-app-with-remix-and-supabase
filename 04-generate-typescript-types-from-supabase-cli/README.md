[🏡 Home](../README.md)

[![Create Supabase project](https://placehold.co/15x15/00ff00/00ff00.png)](../01-create-supabase-project/README.md)
[![Create Remix application](https://placehold.co/15x15/00ff00/00ff00.png)](../02-create-remix-application/README.md)
[![Query Supabase data with Remix Loaders](https://placehold.co/15x15/00ff00/00ff00.png)](../03-query-supabase-data-with-remix-loaders/README.md)
[![Generate TypeScript types from Supabase CLI](https://placehold.co/15x15/00ff00/00ff00.png)](../04-generate-typescript-types-from-supabase-cli/README.md)
[![Implement Supabase Auth using GitHub](https://placehold.co/15x15/555555/555555.png)](../05-implement-supabase-auth-using-github/README.md)
[![Restrict access with RLS policies](https://placehold.co/15x15/555555/555555.png)](../06-restrict-access-with-rls-policies/README.md)
[![Automatically set session cookie with Supabase Auth Helpers](https://placehold.co/15x15/555555/555555.png)](../07-automatically-set-session-cookie-with-supabase-auth-helpers/README.md)
[![Call active Loaders on Supabase Auth state change](https://placehold.co/15x15/555555/555555.png)](../08-call-active-loaders-on-supabase-auth-state-change/README.md)
[![Mutate Supabase data with Remix Actions](https://placehold.co/15x15/555555/555555.png)](../09-mutate-supabase-data-with-remix-actions/README.md)
[![Subscribe to database changes with Supabase Realtime](https://placehold.co/15x15/555555/555555.png)](../10-subscribe-to-database-changes-with-supabase-realtime/README.md)
[![Deploy Remix app to Vercel](https://placehold.co/15x15/555555/555555.png)](../11-deploy-remix-app-to-vercel/README.md)

# Generate TypeScript types from Supabase CLI

**[📹 Video](https://egghead.io/lessons/supabase-generate-typescript-type-definitions-with-the-supabase-cli?af=9qsk0a)**

TypeScript helps us build more robust, maintainable and safe applications. In this lesson, we look at installing the [Supabase CLI](https://supabase.com/docs/reference/cli), and using it to generate type definitions for Supabase.

We can use this to add TypeScript support to our Supabase client, which flows through our entire application - server and client. This means we get in-editor feedback about what we can and can't do with Supabase, helping to discover cool new things, while reducing bugs.

Additionally, we use the `LoaderArgs` type signature for our Loader function, which allows us to infer the return type in our component.

> Note: this does not automatically update with changes to Supabase. You need to manually run this command whenever you change the structure of the database.

## Code Snippets

**Generate TypeScript definitions from Supabase**

```bash
supabase gen types typescript --project-id your-project-id > db_types.ts
```

**Create typesafe Supabase client**

```tsx
import { createClient } from "@supabase/supabase-js";

import type { Database } from "db_types";

export default createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
```

**Fetch data with end-to-end type defs**

```tsx
import { useLoaderData } from "@remix-run/react";
import supabase from "utils/supabase";

import type { LoaderArgs } from "@remix-run/node";

export const loader = async ({}: LoaderArgs) => {
  const { data } = await supabase.from("messages").select();
  return { messages: data ?? [] };
};

export default function Index() {
  const { messages } = useLoaderData<typeof loader>();
  return <pre>{JSON.stringify(messages, null, 2)}</pre>;
}
```

## Resources

- [Supabase CLI](https://supabase.com/docs/reference/cli)
- [Supabase TypeScript Support](https://supabase.com/docs/reference/javascript/typescript-support)
- [Remix decision to infer types](https://github.com/remix-run/remix/blob/main/decisions/0003-infer-types-for-useloaderdata-and-useactiondata-from-loader-and-action-via-generics.md)

---

[👉 Next lesson](/05-implement-supabase-auth-using-github/README.md)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
