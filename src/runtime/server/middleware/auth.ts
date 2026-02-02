import { defineEventHandler, getHeader } from 'h3'
import type { H3Event } from 'h3'
import type { User } from '../../types'

export default defineEventHandler((event: H3Event) => {
  const remoteUser = getHeader(event, 'remote-user')
  const remoteEmail = getHeader(event, 'remote-email')
  const remoteName = getHeader(event, 'remote-name')
  const remoteGroups = getHeader(event, 'remote-groups')

  if (remoteUser) {
    event.context.user = {
      id: remoteUser,
      username: remoteUser,
      email: remoteEmail || undefined,
      displayName: remoteName || remoteUser,
      groups: remoteGroups ? remoteGroups.split(',').map((g) => g.trim()) : undefined
    } as User
    return
  }

  const devUser = process.env.DEV_USER
  if (devUser) {
    event.context.user = {
      id: devUser,
      username: devUser,
      email: process.env.DEV_EMAIL || undefined,
      displayName: process.env.DEV_NAME || devUser,
      groups: process.env.DEV_GROUPS ? process.env.DEV_GROUPS.split(',').map((g) => g.trim()) : undefined
    } as User
  }
})
