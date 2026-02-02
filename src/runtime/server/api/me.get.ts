import { createError, defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  const user = event.context.user
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated',
      message: 'No user context. Log in via Authelia or set DEV_USER for local dev.'
    })
  }
  return user
})
