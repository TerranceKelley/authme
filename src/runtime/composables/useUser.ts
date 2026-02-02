import type { User } from '../types'

export type { User } from '../types'

export function useUser() {
  const user = useState<User | null>('authme-user', () => null)
  const loading = useState<boolean>('authme-user-loading', () => true)
  const error = useState<string | null>('authme-user-error', () => null)

  const isAuthenticated = computed(() => !!user.value)

  const fetchUser = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch<User>('/api/me')
      user.value = data
    } catch (e: any) {
      user.value = null
      if (e?.statusCode === 401) {
        error.value = null
      } else {
        error.value = e?.message || 'Failed to load user'
      }
    } finally {
      loading.value = false
    }
  }

  const clearUser = () => {
    user.value = null
    error.value = null
  }

  onMounted(() => {
    if (user.value === null && loading.value) {
      fetchUser()
    }
  })

  return {
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    isAuthenticated,
    fetchUser,
    clearUser
  }
}
