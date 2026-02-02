# authme

Nuxt module that sets `event.context.user` from Authelia/Caddy forward-auth headers and provides `useUser()` and GET /api/me.

## Usage

1. Add to your Nuxt app:

   ```bash
   npm install authme
   # or for local development: "authme": "file:../authme"
   ```

2. In `nuxt.config.ts`:

   ```ts
   export default defineNuxtConfig({
     modules: ['authme']
   })
   ```

3. Behind a reverse proxy (e.g. Caddy) with Authelia forward auth, configure copy_headers so the proxy sends:
   - `Remote-User`, `Remote-Email`, `Remote-Name`, `Remote-Groups`

4. In server routes, use `event.context.user` (typed). In the client, use `useUser()` for profile and `isAuthenticated`.

## Local development without proxy

Set env vars: `DEV_USER`, optionally `DEV_EMAIL`, `DEV_NAME`, `DEV_GROUPS` (comma-separated). The middleware will set `event.context.user` from these.

## API

- **GET /api/me** — Returns current user or 401.
- **useUser()** — Composable: `user`, `loading`, `error`, `isAuthenticated`, `fetchUser()`, `clearUser()`.
