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
[![Deploy Remix app to Vercel](https://placehold.co/15x15/00ff00/00ff00.png)](../11-deploy-remix-app-to-vercel/README.md)

# Deploy Remix app to Vercel

**[📹 Video](https://egghead.io/lessons/remix-deploy-a-remix-application-to-vercel-from-a-github-repository?af=9qsk0a)**

Using a GitHub repo to deploy our application to Vercel, keeps our code and live production site in sync. In this lesson we look at using the [GitHub CLI](https://cli.github.com/) tool to create a public repo, and adding it as a remote origin for our project.

Additionally, we create a new Vercel project from this GitHub repo, add our Supabase environment variables, and deploy. Lastly, we update the Homepage URL in our GitHub OAuth app to be our new Vercel URL, and set our Supabase project's [Authentication Site URL](https://app.supabase.com/project/_/auth/url-configuration) to our new live application URL.

## Extension ideas

- Style the app using Tailwind CSS (or another method of choice)
- Implement the ability for a user to `update` and `delete` their own messages
- Add the option to set a username and display this alongside messages
- Add separate message threads/chat rooms
- Implement private messages/chat rooms

## Resources

- [GitHub CLI](https://cli.github.com/)
- [Vercel docs](https://vercel.com/docs)
- [Deploying Remix app to Vercel](https://vercel.com/guides/deploying-remix-with-vercel)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
