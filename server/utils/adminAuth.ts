import { createHmac, createHash, timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'
import { createError, deleteCookie, getCookie, getHeader, setCookie } from 'h3'
import { findPasswordAdminUser, markAdminUserLogin, verifyAdminPassword } from './adminUsers'

const ADMIN_SESSION_COOKIE = 'gribo_admin_session'
const DEFAULT_SESSION_TTL_SECONDS = 60 * 60 * 8
const PLACEHOLDER_VALUE = 'change-me-before-production'

type AdminSessionPayload = {
  id: string
  name: string
  email: string
  username: string
  authProvider: 'password' | 'google' | 'env'
  exp: number
}

function base64Url(input: string) {
  return Buffer.from(input, 'utf8').toString('base64url')
}

function fromBase64Url(input: string) {
  return Buffer.from(input, 'base64url').toString('utf8')
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a)
  const bBuffer = Buffer.from(b)
  return aBuffer.length === bBuffer.length && timingSafeEqual(aBuffer, bBuffer)
}

function sha256(value: string) {
  return createHash('sha256').update(value).digest('hex')
}

function signValue(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('base64url')
}

function isLocalRequest(event?: H3Event) {
  const host = event ? getHeader(event, 'host') || '' : ''
  const remoteAddress = event?.node.req.socket.remoteAddress || ''
  const localHost = host.startsWith('localhost') || host.startsWith('127.0.0.1') || host.startsWith('[::1]')
  const localRemote = ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(remoteAddress)

  return localHost && localRemote
}

export function getAdminAuthConfig(event?: H3Event) {
  const production = process.env.NODE_ENV === 'production'
  const localRequest = isLocalRequest(event)
  const enforceProductionCredentials = production && !localRequest
  const username = process.env.ADMIN_USERNAME || (enforceProductionCredentials ? '' : 'admin')
  const password = process.env.ADMIN_PASSWORD || (enforceProductionCredentials ? '' : PLACEHOLDER_VALUE)
  const passwordHash = process.env.ADMIN_PASSWORD_HASH || ''
  const sessionSecret = process.env.SESSION_SECRET || (enforceProductionCredentials ? '' : 'dev-session-secret')
  const sessionMaxAgeSeconds = Number(process.env.ADMIN_SESSION_MAX_AGE_SECONDS || DEFAULT_SESSION_TTL_SECONDS)
  const hasBootstrapCredentials = Boolean(username && (password || passwordHash))
  const hasCredentials = Boolean(sessionSecret && (hasBootstrapCredentials || !enforceProductionCredentials))
  const usesUnsafePlaceholder = [password, sessionSecret].includes(PLACEHOLDER_VALUE)
  const enabled = hasCredentials && (!enforceProductionCredentials || !usesUnsafePlaceholder)

  return {
    enabled,
    production,
    localRequest,
    username,
    password,
    passwordHash,
    sessionSecret,
    sessionMaxAgeSeconds: Number.isFinite(sessionMaxAgeSeconds) ? sessionMaxAgeSeconds : DEFAULT_SESSION_TTL_SECONDS,
    reason: enabled
      ? ''
      : production
        ? 'Admin credentials are not configured for production.'
        : 'Admin credentials are not configured.'
  }
}

export async function verifyAdminCredentials(username: string, password: string, event?: H3Event) {
  const config = getAdminAuthConfig(event)

  if (!config.enabled) {
    return {
      ok: false,
      reason: config.reason
    }
  }

  const user = await findPasswordAdminUser(username)

  if (user) {
    const passwordOk = verifyAdminPassword(password, user.passwordHash)

    if (!passwordOk) {
      return {
        ok: false,
        reason: 'Invalid username or password.'
      }
    }

    const loggedInUser = await markAdminUserLogin(user.id) || user

    return {
      ok: true,
      reason: '',
      user: {
        id: loggedInUser.id,
        name: loggedInUser.name,
        email: loggedInUser.email,
        username: loggedInUser.username,
        authProvider: loggedInUser.authProvider
      }
    }
  }

  const usernameOk = safeEqual(username, config.username)
  const passwordOk = config.passwordHash
    ? safeEqual(sha256(password), config.passwordHash)
    : safeEqual(password, config.password)

  return {
    ok: usernameOk && passwordOk,
    reason: usernameOk && passwordOk ? '' : 'Invalid username or password.',
    user: usernameOk && passwordOk
      ? {
          id: 'env-admin',
          name: 'Environment Admin',
          email: '',
          username: config.username,
          authProvider: 'env' as const
        }
      : undefined
  }
}

export function createAdminSessionToken(user: Omit<AdminSessionPayload, 'exp'>, event?: H3Event) {
  const config = getAdminAuthConfig(event)
  const payload: AdminSessionPayload = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + config.sessionMaxAgeSeconds
  }
  const encodedPayload = base64Url(JSON.stringify(payload))
  const signature = signValue(encodedPayload, config.sessionSecret)

  return `${encodedPayload}.${signature}`
}

export function readAdminSession(event: H3Event) {
  const token = getCookie(event, ADMIN_SESSION_COOKIE)
  const config = getAdminAuthConfig(event)

  if (!token || !config.enabled) return null

  const [payloadPart, signaturePart] = token.split('.')
  if (!payloadPart || !signaturePart) return null

  const expectedSignature = signValue(payloadPart, config.sessionSecret)
  if (!safeEqual(signaturePart, expectedSignature)) return null

  try {
    const payload = JSON.parse(fromBase64Url(payloadPart)) as AdminSessionPayload
    if (!payload.username || payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

export function setAdminSessionCookie(event: H3Event, token: string) {
  const config = getAdminAuthConfig(event)
  setCookie(event, ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production' && !isLocalRequest(event),
    maxAge: config.sessionMaxAgeSeconds,
    path: '/'
  })
}

export function clearAdminSessionCookie(event: H3Event) {
  deleteCookie(event, ADMIN_SESSION_COOKIE, {
    path: '/'
  })
}

export function assertAdminAuthenticated(event: H3Event) {
  const session = readAdminSession(event)

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  return session
}
