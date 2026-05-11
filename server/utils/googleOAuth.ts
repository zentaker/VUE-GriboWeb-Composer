import { randomBytes } from 'node:crypto'
import type { H3Event } from 'h3'
import { createError, deleteCookie, getCookie, getHeader, getRequestURL, setCookie } from 'h3'

const GOOGLE_STATE_COOKIE = 'gribo_google_oauth_state'

function localRedirectUrl(event: H3Event) {
  const url = getRequestURL(event)
  return `${url.origin}/api/auth/google/callback`
}

export function getGoogleOAuthConfig(event: H3Event) {
  const clientId = process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID || ''
  const clientSecret = process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET || ''
  const redirectUrl = process.env.NUXT_OAUTH_GOOGLE_REDIRECT_URL || localRedirectUrl(event)

  return {
    enabled: Boolean(clientId && clientSecret && redirectUrl),
    clientId,
    clientSecret,
    redirectUrl
  }
}

export function createGoogleState(event: H3Event) {
  const state = randomBytes(24).toString('base64url')
  setCookie(event, GOOGLE_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production' && !String(getHeader(event, 'host') || '').startsWith('localhost'),
    maxAge: 60 * 10,
    path: '/'
  })
  return state
}

export function assertGoogleState(event: H3Event, state: string) {
  const stored = getCookie(event, GOOGLE_STATE_COOKIE)
  deleteCookie(event, GOOGLE_STATE_COOKIE, { path: '/' })
  if (!stored || !state || stored !== state) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Google login state.'
    })
  }
}

export async function exchangeGoogleCode(event: H3Event, code: string) {
  const config = getGoogleOAuthConfig(event)
  if (!config.enabled) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Google login is not configured.'
    })
  }

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      code,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: config.redirectUrl,
      grant_type: 'authorization_code'
    })
  })

  if (!tokenResponse.ok) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Google login token exchange failed.'
    })
  }

  return await tokenResponse.json() as { access_token?: string }
}

export async function fetchGoogleUser(accessToken: string) {
  const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  })

  if (!userResponse.ok) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Google user profile could not be read.'
    })
  }

  return await userResponse.json() as { email?: string, name?: string }
}

