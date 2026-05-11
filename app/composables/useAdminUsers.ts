export type AdminUserProvider = 'password' | 'google'
export type AdminUserStatus = 'active' | 'disabled'

export interface AdminUserRecord {
  id: string
  name: string
  email: string
  username: string
  authProvider: AdminUserProvider
  googleEmail?: string
  status: AdminUserStatus
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
}

export function useAdminUsers() {
  const listUsers = () => $fetch<{ users: AdminUserRecord[] }>('/api/admin/users/list')

  const createUser = (payload: {
    name: string
    email: string
    username: string
    authProvider: AdminUserProvider
    googleEmail?: string
    password?: string
    confirmPassword?: string
  }) => $fetch<{ ok: boolean, user: AdminUserRecord }>('/api/admin/users/create', {
    method: 'POST',
    body: payload
  })

  const updateUser = (payload: Partial<AdminUserRecord> & { id: string }) =>
    $fetch<{ ok: boolean, user: AdminUserRecord }>('/api/admin/users/update', {
      method: 'POST',
      body: payload
    })

  const setUserStatus = (id: string, status: AdminUserStatus) =>
    $fetch<{ ok: boolean, user: AdminUserRecord }>('/api/admin/users/status', {
      method: 'POST',
      body: { id, status }
    })

  const changePassword = (id: string, password: string, confirmPassword: string) =>
    $fetch<{ ok: boolean, user: AdminUserRecord }>('/api/admin/users/password', {
      method: 'POST',
      body: { id, password, confirmPassword }
    })

  return {
    listUsers,
    createUser,
    updateUser,
    setUserStatus,
    changePassword
  }
}

