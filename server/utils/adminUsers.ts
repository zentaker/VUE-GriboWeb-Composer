import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import { createError } from 'h3'

export type AdminUserProvider = 'password' | 'google'
export type AdminUserStatus = 'active' | 'disabled'

export type AdminUser = {
  id: string
  name: string
  email: string
  username: string
  authProvider: AdminUserProvider
  googleEmail?: string
  status: AdminUserStatus
  passwordHash?: string
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
}

export type PublicAdminUser = Omit<AdminUser, 'passwordHash'>

const USERS_KEY = 'admin-users.json'
const SCRYPT_KEY_LENGTH = 64

function now() {
  return new Date().toISOString()
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase()
}

function normalizeUsername(value: string) {
  return value.trim().toLowerCase()
}

export async function readAdminUsers(): Promise<AdminUser[]> {
  const storage = useStorage('adminUsers')
  try {
    const stored = await storage.getItem<AdminUser[] | string>(USERS_KEY)

    if (Array.isArray(stored)) return stored
    if (typeof stored === 'string' && stored.trim()) return JSON.parse(stored) as AdminUser[]

    await storage.setItem(USERS_KEY, [])
    return []
  } catch {
    return []
  }
}

export async function writeAdminUsers(users: AdminUser[]) {
  await useStorage('adminUsers').setItem(USERS_KEY, users)
}

export function toPublicAdminUser(user: AdminUser): PublicAdminUser {
  const { passwordHash: _passwordHash, ...publicUser } = user
  return publicUser
}

export function hashAdminPassword(password: string) {
  const salt = randomBytes(16).toString('base64url')
  const hash = scryptSync(password, salt, SCRYPT_KEY_LENGTH).toString('base64url')
  return `scrypt$${salt}$${hash}`
}

export function verifyAdminPassword(password: string, passwordHash = '') {
  const [scheme, salt, storedHash] = passwordHash.split('$')
  if (scheme !== 'scrypt' || !salt || !storedHash) return false

  const candidate = scryptSync(password, salt, SCRYPT_KEY_LENGTH)
  const stored = Buffer.from(storedHash, 'base64url')
  return candidate.length === stored.length && timingSafeEqual(candidate, stored)
}

export async function createAdminUser(input: {
  name: string
  email: string
  username: string
  authProvider: AdminUserProvider
  password?: string
  googleEmail?: string
}) {
  const users = await readAdminUsers()
  const email = normalizeEmail(input.email)
  const username = normalizeUsername(input.username)
  const googleEmail = input.googleEmail ? normalizeEmail(input.googleEmail) : ''

  if (!input.name.trim()) throw createError({ statusCode: 400, statusMessage: 'Name is required.' })
  if (!email) throw createError({ statusCode: 400, statusMessage: 'Email is required.' })
  if (!username) throw createError({ statusCode: 400, statusMessage: 'Username is required.' })
  if (!['password', 'google'].includes(input.authProvider)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid auth provider.' })
  }
  if (input.authProvider === 'password' && (!input.password || input.password.length < 10)) {
    throw createError({ statusCode: 400, statusMessage: 'Password must be at least 10 characters.' })
  }
  if (users.some((user) => normalizeEmail(user.email) === email || (user.googleEmail && normalizeEmail(user.googleEmail) === email))) {
    throw createError({ statusCode: 409, statusMessage: 'Email is already used by another admin user.' })
  }
  if (googleEmail && users.some((user) => normalizeEmail(user.email) === googleEmail || (user.googleEmail && normalizeEmail(user.googleEmail) === googleEmail))) {
    throw createError({ statusCode: 409, statusMessage: 'Google email is already used by another admin user.' })
  }
  if (users.some((user) => normalizeUsername(user.username) === username)) {
    throw createError({ statusCode: 409, statusMessage: 'Username is already used by another admin user.' })
  }

  const timestamp = now()
  const user: AdminUser = {
    id: randomBytes(12).toString('base64url'),
    name: input.name.trim(),
    email,
    username,
    authProvider: input.authProvider,
    googleEmail: input.authProvider === 'google' ? googleEmail || email : googleEmail || undefined,
    status: 'active',
    passwordHash: input.authProvider === 'password' ? hashAdminPassword(input.password || '') : undefined,
    createdAt: timestamp,
    updatedAt: timestamp
  }

  users.push(user)
  await writeAdminUsers(users)
  return user
}

export async function updateAdminUser(id: string, input: Partial<Pick<AdminUser, 'name' | 'email' | 'username' | 'googleEmail' | 'authProvider'>>) {
  const users = await readAdminUsers()
  const index = users.findIndex((user) => user.id === id)
  if (index === -1) throw createError({ statusCode: 404, statusMessage: 'Admin user not found.' })

  const next = { ...users[index] }
  if (input.name !== undefined) next.name = input.name.trim()
  if (input.email !== undefined) next.email = normalizeEmail(input.email)
  if (input.username !== undefined) next.username = normalizeUsername(input.username)
  if (input.googleEmail !== undefined) next.googleEmail = input.googleEmail ? normalizeEmail(input.googleEmail) : undefined
  if (input.authProvider !== undefined) next.authProvider = input.authProvider

  if (!next.name) throw createError({ statusCode: 400, statusMessage: 'Name is required.' })
  if (!next.email) throw createError({ statusCode: 400, statusMessage: 'Email is required.' })
  if (!next.username) throw createError({ statusCode: 400, statusMessage: 'Username is required.' })
  if (!['password', 'google'].includes(next.authProvider)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid auth provider.' })
  }
  if (next.authProvider === 'google' && !next.googleEmail) next.googleEmail = next.email
  if (next.authProvider === 'password' && !next.passwordHash) {
    throw createError({ statusCode: 400, statusMessage: 'Password users require a password.' })
  }
  if (users.some((user) => user.id !== id && normalizeUsername(user.username) === next.username)) {
    throw createError({ statusCode: 409, statusMessage: 'Username is already used by another admin user.' })
  }
  if (users.some((user) => user.id !== id && (normalizeEmail(user.email) === next.email || (user.googleEmail && normalizeEmail(user.googleEmail) === next.email)))) {
    throw createError({ statusCode: 409, statusMessage: 'Email is already used by another admin user.' })
  }

  next.updatedAt = now()
  users[index] = next
  await writeAdminUsers(users)
  return next
}

export async function setAdminUserStatus(id: string, status: AdminUserStatus) {
  const users = await readAdminUsers()
  const index = users.findIndex((user) => user.id === id)
  if (index === -1) throw createError({ statusCode: 404, statusMessage: 'Admin user not found.' })
  users[index] = { ...users[index], status, updatedAt: now() }
  await writeAdminUsers(users)
  return users[index]
}

export async function changeAdminUserPassword(id: string, password: string) {
  if (!password || password.length < 10) {
    throw createError({ statusCode: 400, statusMessage: 'Password must be at least 10 characters.' })
  }

  const users = await readAdminUsers()
  const index = users.findIndex((user) => user.id === id)
  if (index === -1) throw createError({ statusCode: 404, statusMessage: 'Admin user not found.' })
  users[index] = {
    ...users[index],
    authProvider: 'password',
    passwordHash: hashAdminPassword(password),
    updatedAt: now()
  }
  await writeAdminUsers(users)
  return users[index]
}

export async function findPasswordAdminUser(usernameOrEmail: string) {
  const lookup = usernameOrEmail.trim().toLowerCase()
  return (await readAdminUsers()).find((user) => user.status === 'active'
    && user.authProvider === 'password'
    && (normalizeUsername(user.username) === lookup || normalizeEmail(user.email) === lookup)
  )
}

export async function findGoogleAdminUser(email: string) {
  const lookup = normalizeEmail(email)
  return (await readAdminUsers()).find((user) => user.status === 'active'
    && user.authProvider === 'google'
    && (normalizeEmail(user.email) === lookup || (user.googleEmail && normalizeEmail(user.googleEmail) === lookup))
  )
}

export async function markAdminUserLogin(id: string) {
  const users = await readAdminUsers()
  const index = users.findIndex((user) => user.id === id)
  if (index === -1) return undefined
  users[index] = { ...users[index], lastLoginAt: now(), updatedAt: now() }
  await writeAdminUsers(users)
  return users[index]
}
