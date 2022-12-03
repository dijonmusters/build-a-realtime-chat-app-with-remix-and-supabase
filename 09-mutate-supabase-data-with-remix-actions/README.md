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
[![Subscribe to database changes with Supabase Realtime](https://placehold.co/15x15/555555/555555.png)](../10-subscribe-to-database-changes-with-supabase-realtime/README.md)
[![Deploy Remix app to Vercel](https://placehold.co/15x15/555555/555555.png)](../11-deploy-remix-app-to-vercel/README.md)

# Mutate Supabase data with Remix Actions

**[📹 Video](TODO)**

To mutate data in Remix, we use an Action function. In this lesson, we look at creating a Remix `<Form />` to submit the content of a message as a `post` request to our `Action` function.

Additionally, we use the server-side Supabase client from the Remix Auth Helpers package to make an authenticated request to Supabase, writing the new message to the `messages` table.

Futhermore, we run into an issue with RLS as we have not yet written a policy for the `insert` action. By setting this to the `authenticated` role and ensuring that the `user_id` column is equal to the value returned by the `auth.uid()` function - a function we get from Supabase to retrieve the ID for the user attempting to insert a new row - we ensure that users can not write a message on someone else's behalf.

Lastly, we use the `auth.uid()` function to set the default value of the `user_id` column to the ID of the user attempting to `insert` the new row in the `messages` table.

## Code Snippets

**Write data to Supabase**

```tsx
export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabase = createServerSupabase({ request, response });

  const { message } = Object.fromEntries(await request.formData());

  await supabase.from("messages").insert({ content: String(message) });

  return json(null, { headers: response.headers });
};
```

**Form to submit to action**

```tsx
<Form method="post">
  <input type="text" name="message" />
  <button type="submit">Send</button>
</Form>
```

**Add policy for insert**

```sql
create policy "users can insert their own messages" on "public"."messages"
as permissive for insert
to authenticated
wuth check (user_id = auth.uid());
```

> SQL code snippets can be run against your Supabase database by heading over to your project's [SQL Editor](https://app.supabase.com/project/_/sql), pasting them into a new query, and clicking `RUN`.

## Resources

- [Supabase docs - insert](https://supabase.com/docs/reference/javascript/insert)
- [Implement Row Level Security in Supabase (video)](https://www.youtube.com/watch?v=Ow_Uzedfohk)
- [Remix docs - Writing data](https://remix.run/docs/en/v1/guides/data-writes)

---

[👉 Next lesson](/10-subscribe-to-database-changes-with-supabase-realtime/README.md)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
