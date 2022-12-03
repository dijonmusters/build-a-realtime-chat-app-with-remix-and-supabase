[🏡 Home](../README.md)

[![Create Supabase project](https://placehold.co/15x15/00ff00/00ff00.png)](../01-create-supabase-project/README.md)
[![Create Remix application](https://placehold.co/15x15/00ff00/00ff00.png)](../02-create-remix-application/README.md)
[![Query Supabase data with Remix Loaders](https://placehold.co/15x15/00ff00/00ff00.png)](../03-query-supabase-data-with-remix-loaders/README.md)
[![Generate TypeScript types from Supabase CLI](https://placehold.co/15x15/00ff00/00ff00.png)](../04-generate-typescript-types-from-supabase-cli/README.md)
[![Implement Supabase Auth using GitHub](https://placehold.co/15x15/00ff00/00ff00.png)](../05-implement-supabase-auth-using-github/README.md)
[![Restrict access with RLS policies](https://placehold.co/15x15/00ff00/00ff00.png)](../06-restrict-access-with-rls-policies/README.md)
[![Automatically set session cookie with Supabase Auth Helpers](https://placehold.co/15x15/00ff00/00ff00.png)](../07-automatically-set-session-cookie-with-supabase-auth-helpers/README.md)
[![Call active Loaders on Supabase Auth state change](https://placehold.co/15x15/00ff00/00ff00.png)](../08-call-active-loaders-on-supabase-auth-state-change/README.md)
[![Mutate Supabase data with Remix Actions](https://placehold.co/15x15/555555/555555.png)](../09-mutate-supabase-data-with-remix-actions/README.md)
[![Subscribe to database changes with Supabase Realtime](https://placehold.co/15x15/555555/555555.png)](../10-subscribe-to-database-changes-with-supabase-realtime/README.md)
[![Deploy Remix app to Vercel](https://placehold.co/15x15/555555/555555.png)](../11-deploy-remix-app-to-vercel/README.md)

# Call active Loaders on Supabase Auth state change

**[📹 Video](TODO)**

The OAuth flow is asynchronous. This means we get redirected to the landing page before GitHub and Supabase have decided that you can be trusted! 👍

Since our Loader functions get called when we first load the page they make a request to Supabase before receiving a valid access token. This causes RLS to deny the request to select data.

Once our session has been correctly set, Supabase is happy but we aren't telling Remix to fetch this data again. In this lesson, we look at using the `onAuthStateChange` hook from Supabase to submit a `post` request to an empty `action`. Anytime an `Action` function completes, Remix recalls any active `loaders` to keep data in sync with mutations.

Therefore, any time the user's session is updated - the auth flow has completed for either signing in or out - Remix will automatically call all loader functions that are active on the current route (this could be many with nested routing), fetching fresh data from Supabase with a valid access token.

## Code Snippets

**onAuthStateChange listener**

```tsx
useEffect(() => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    if (session?.access_token !== serverAccessToken) {
      fetcher.submit(null, {
        method: "post",
        action: "/handle-supabase-session",
      });
    }
  });

  return () => {
    subscription.unsubscribe();
  };
}, [serverAccessToken, supabase, fetcher]);
```

**Empty action**

```tsx
export const action = () => {
  return null;
};
```

## Resources

- [Supabase docs - onAuthStateChange](https://supabase.com/docs/reference/javascript/auth-onauthstatechange)
- [Remix docs - Actions](https://remix.run/docs/en/v1/api/conventions#action)

---

[👉 Next lesson](/09-mutate-supabase-data-with-remix-actions/README.md)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
