declare global {
  const H3Error: typeof import('../../node_modules/h3').H3Error
  const H3Event: typeof import('../../node_modules/h3').H3Event
  const __buildAssetsURL: typeof import('../../node_modules/@nuxt/nitro-server/dist/runtime/utils/paths').buildAssetsURL
  const __publicAssetsURL: typeof import('../../node_modules/@nuxt/nitro-server/dist/runtime/utils/paths').publicAssetsURL
  const adminContentRoots: typeof import('../../server/utils/safeContentPaths').adminContentRoots
  const aggregateAnalytics: typeof import('../../server/utils/analytics').aggregateAnalytics
  const appendCorsHeaders: typeof import('../../node_modules/h3').appendCorsHeaders
  const appendCorsPreflightHeaders: typeof import('../../node_modules/h3').appendCorsPreflightHeaders
  const appendHeader: typeof import('../../node_modules/h3').appendHeader
  const appendHeaders: typeof import('../../node_modules/h3').appendHeaders
  const appendResponseHeader: typeof import('../../node_modules/h3').appendResponseHeader
  const appendResponseHeaders: typeof import('../../node_modules/h3').appendResponseHeaders
  const applyImportAsCopy: typeof import('../../server/utils/portableBackups').applyImportAsCopy
  const applyImportReplace: typeof import('../../server/utils/portableBackups').applyImportReplace
  const assertAdminAuthenticated: typeof import('../../server/utils/adminAuth').assertAdminAuthenticated
  const assertAdminContentType: typeof import('../../server/utils/safeContentPaths').assertAdminContentType
  const assertGoogleState: typeof import('../../server/utils/googleOAuth').assertGoogleState
  const assertMethod: typeof import('../../node_modules/h3').assertMethod
  const cachedEventHandler: typeof import('../../node_modules/nitropack/dist/runtime/internal/cache').cachedEventHandler
  const cachedFunction: typeof import('../../node_modules/nitropack/dist/runtime/internal/cache').cachedFunction
  const callNodeListener: typeof import('../../node_modules/h3').callNodeListener
  const changeAdminUserPassword: typeof import('../../server/utils/adminUsers').changeAdminUserPassword
  const clearAdminSessionCookie: typeof import('../../server/utils/adminAuth').clearAdminSessionCookie
  const clearAnalyticsData: typeof import('../../server/utils/analytics').clearAnalyticsData
  const clearResponseHeaders: typeof import('../../node_modules/h3').clearResponseHeaders
  const clearSession: typeof import('../../node_modules/h3').clearSession
  const collectBlogPackageFiles: typeof import('../../server/utils/portableBackups').collectBlogPackageFiles
  const collectFullBackupFiles: typeof import('../../server/utils/portableBackups').collectFullBackupFiles
  const collectProjectPackageFiles: typeof import('../../server/utils/portableBackups').collectProjectPackageFiles
  const createAdminSessionToken: typeof import('../../server/utils/adminAuth').createAdminSessionToken
  const createAdminUser: typeof import('../../server/utils/adminUsers').createAdminUser
  const createApp: typeof import('../../node_modules/h3').createApp
  const createAppEventHandler: typeof import('../../node_modules/h3').createAppEventHandler
  const createDownloadResponse: typeof import('../../server/utils/portableBackups').createDownloadResponse
  const createError: typeof import('../../node_modules/h3').createError
  const createEvent: typeof import('../../node_modules/h3').createEvent
  const createEventStream: typeof import('../../node_modules/h3').createEventStream
  const createGoogleState: typeof import('../../server/utils/googleOAuth').createGoogleState
  const createPortablePackage: typeof import('../../server/utils/portableBackups').createPortablePackage
  const createRouter: typeof import('../../node_modules/h3').createRouter
  const createSafetySnapshot: typeof import('../../server/utils/portableBackups').createSafetySnapshot
  const defaultContentType: typeof import('../../node_modules/h3').defaultContentType
  const defineAppConfig: typeof import('../../node_modules/@nuxt/nitro-server/dist/runtime/utils/config').defineAppConfig
  const defineCachedEventHandler: typeof import('../../node_modules/nitropack/dist/runtime/internal/cache').defineCachedEventHandler
  const defineCachedFunction: typeof import('../../node_modules/nitropack/dist/runtime/internal/cache').defineCachedFunction
  const defineEventHandler: typeof import('../../node_modules/h3').defineEventHandler
  const defineLazyEventHandler: typeof import('../../node_modules/h3').defineLazyEventHandler
  const defineNitroErrorHandler: typeof import('../../node_modules/nitropack/dist/runtime/internal/error/utils').defineNitroErrorHandler
  const defineNitroPlugin: typeof import('../../node_modules/nitropack/dist/runtime/internal/plugin').defineNitroPlugin
  const defineNodeListener: typeof import('../../node_modules/h3').defineNodeListener
  const defineNodeMiddleware: typeof import('../../node_modules/h3').defineNodeMiddleware
  const defineRenderHandler: typeof import('../../node_modules/nitropack/dist/runtime/internal/renderer').defineRenderHandler
  const defineRequestMiddleware: typeof import('../../node_modules/h3').defineRequestMiddleware
  const defineResponseMiddleware: typeof import('../../node_modules/h3').defineResponseMiddleware
  const defineRouteMeta: typeof import('../../node_modules/nitropack/dist/runtime/internal/meta').defineRouteMeta
  const defineTask: typeof import('../../node_modules/nitropack/dist/runtime/internal/task').defineTask
  const defineWebSocket: typeof import('../../node_modules/h3').defineWebSocket
  const defineWebSocketHandler: typeof import('../../node_modules/h3').defineWebSocketHandler
  const deleteCookie: typeof import('../../node_modules/h3').deleteCookie
  const detectImportConflicts: typeof import('../../server/utils/portableBackups').detectImportConflicts
  const dynamicEventHandler: typeof import('../../node_modules/h3').dynamicEventHandler
  const eventHandler: typeof import('../../node_modules/h3').eventHandler
  const exchangeGoogleCode: typeof import('../../server/utils/googleOAuth').exchangeGoogleCode
  const exportAnalytics: typeof import('../../server/utils/analytics').exportAnalytics
  const fetchGoogleUser: typeof import('../../server/utils/googleOAuth').fetchGoogleUser
  const fetchWithEvent: typeof import('../../node_modules/h3').fetchWithEvent
  const findGoogleAdminUser: typeof import('../../server/utils/adminUsers').findGoogleAdminUser
  const findPasswordAdminUser: typeof import('../../server/utils/adminUsers').findPasswordAdminUser
  const fromNodeMiddleware: typeof import('../../node_modules/h3').fromNodeMiddleware
  const fromPlainHandler: typeof import('../../node_modules/h3').fromPlainHandler
  const fromWebHandler: typeof import('../../node_modules/h3').fromWebHandler
  const getAdminAuthConfig: typeof import('../../server/utils/adminAuth').getAdminAuthConfig
  const getContentDirectory: typeof import('../../server/utils/safeContentPaths').getContentDirectory
  const getContentPublicPath: typeof import('../../server/utils/safeContentPaths').getContentPublicPath
  const getCookie: typeof import('../../node_modules/h3').getCookie
  const getGoogleOAuthConfig: typeof import('../../server/utils/googleOAuth').getGoogleOAuthConfig
  const getHeader: typeof import('../../node_modules/h3').getHeader
  const getHeaders: typeof import('../../node_modules/h3').getHeaders
  const getMethod: typeof import('../../node_modules/h3').getMethod
  const getProxyRequestHeaders: typeof import('../../node_modules/h3').getProxyRequestHeaders
  const getQuery: typeof import('../../node_modules/h3').getQuery
  const getRequestFingerprint: typeof import('../../node_modules/h3').getRequestFingerprint
  const getRequestHeader: typeof import('../../node_modules/h3').getRequestHeader
  const getRequestHeaders: typeof import('../../node_modules/h3').getRequestHeaders
  const getRequestHost: typeof import('../../node_modules/h3').getRequestHost
  const getRequestIP: typeof import('../../node_modules/h3').getRequestIP
  const getRequestPath: typeof import('../../node_modules/h3').getRequestPath
  const getRequestProtocol: typeof import('../../node_modules/h3').getRequestProtocol
  const getRequestURL: typeof import('../../node_modules/h3').getRequestURL
  const getRequestWebStream: typeof import('../../node_modules/h3').getRequestWebStream
  const getResponseHeader: typeof import('../../node_modules/h3').getResponseHeader
  const getResponseHeaders: typeof import('../../node_modules/h3').getResponseHeaders
  const getResponseStatus: typeof import('../../node_modules/h3').getResponseStatus
  const getResponseStatusText: typeof import('../../node_modules/h3').getResponseStatusText
  const getRouteRules: typeof import('../../node_modules/nitropack/dist/runtime/internal/route-rules').getRouteRules
  const getRouterParam: typeof import('../../node_modules/h3').getRouterParam
  const getRouterParams: typeof import('../../node_modules/h3').getRouterParams
  const getSession: typeof import('../../node_modules/h3').getSession
  const getValidatedQuery: typeof import('../../node_modules/h3').getValidatedQuery
  const getValidatedRouterParams: typeof import('../../node_modules/h3').getValidatedRouterParams
  const handleCacheHeaders: typeof import('../../node_modules/h3').handleCacheHeaders
  const handleCors: typeof import('../../node_modules/h3').handleCors
  const hashAdminPassword: typeof import('../../server/utils/adminUsers').hashAdminPassword
  const isCorsOriginAllowed: typeof import('../../node_modules/h3').isCorsOriginAllowed
  const isError: typeof import('../../node_modules/h3').isError
  const isEvent: typeof import('../../node_modules/h3').isEvent
  const isEventHandler: typeof import('../../node_modules/h3').isEventHandler
  const isMethod: typeof import('../../node_modules/h3').isMethod
  const isPreflightRequest: typeof import('../../node_modules/h3').isPreflightRequest
  const isStream: typeof import('../../node_modules/h3').isStream
  const isWebResponse: typeof import('../../node_modules/h3').isWebResponse
  const lazyEventHandler: typeof import('../../node_modules/h3').lazyEventHandler
  const listAdminMarkdownFiles: typeof import('../../server/utils/safeContentPaths').listAdminMarkdownFiles
  const listSafetySnapshots: typeof import('../../server/utils/portableBackups').listSafetySnapshots
  const markAdminUserLogin: typeof import('../../server/utils/adminUsers').markAdminUserLogin
  const nitroPlugin: typeof import('../../node_modules/nitropack/dist/runtime/internal/plugin').nitroPlugin
  const normalizeHomeLayout: typeof import('../../server/utils/homeLayout').normalizeHomeLayout
  const parseCookies: typeof import('../../node_modules/h3').parseCookies
  const parseMarkdown: typeof import('../../node_modules/@nuxtjs/mdc/dist/runtime/parser').parseMarkdown
  const parseMarkdownContent: typeof import('../../server/utils/markdownContent').parseMarkdownContent
  const promisifyNodeListener: typeof import('../../node_modules/h3').promisifyNodeListener
  const proxyRequest: typeof import('../../node_modules/h3').proxyRequest
  const queryCollection: typeof import('../../node_modules/@nuxt/content/dist/runtime/nitro').queryCollection
  const queryCollectionItemSurroundings: typeof import('../../node_modules/@nuxt/content/dist/runtime/nitro').queryCollectionItemSurroundings
  const queryCollectionNavigation: typeof import('../../node_modules/@nuxt/content/dist/runtime/nitro').queryCollectionNavigation
  const queryCollectionSearchSections: typeof import('../../node_modules/@nuxt/content/dist/runtime/nitro').queryCollectionSearchSections
  const readAdminSession: typeof import('../../server/utils/adminAuth').readAdminSession
  const readAdminUsers: typeof import('../../server/utils/adminUsers').readAdminUsers
  const readAnalyticsEvents: typeof import('../../server/utils/analytics').readAnalyticsEvents
  const readBody: typeof import('../../node_modules/h3').readBody
  const readFormData: typeof import('../../node_modules/h3').readFormData
  const readHomeLayout: typeof import('../../server/utils/homeLayout').readHomeLayout
  const readMarkdownFile: typeof import('../../server/utils/markdownContent').readMarkdownFile
  const readMultipartFormData: typeof import('../../node_modules/h3').readMultipartFormData
  const readRawBody: typeof import('../../node_modules/h3').readRawBody
  const readValidatedBody: typeof import('../../node_modules/h3').readValidatedBody
  const recordAnalyticsEvent: typeof import('../../server/utils/analytics').recordAnalyticsEvent
  const removeResponseHeader: typeof import('../../node_modules/h3').removeResponseHeader
  const resolveAdminContentFile: typeof import('../../server/utils/safeContentPaths').resolveAdminContentFile
  const resolveAdminCreatePath: typeof import('../../server/utils/safeContentPaths').resolveAdminCreatePath
  const runTask: typeof import('../../node_modules/nitropack/dist/runtime/internal/task').runTask
  const sanitizeStatusCode: typeof import('../../node_modules/h3').sanitizeStatusCode
  const sanitizeStatusMessage: typeof import('../../node_modules/h3').sanitizeStatusMessage
  const sealSession: typeof import('../../node_modules/h3').sealSession
  const send: typeof import('../../node_modules/h3').send
  const sendError: typeof import('../../node_modules/h3').sendError
  const sendIterable: typeof import('../../node_modules/h3').sendIterable
  const sendNoContent: typeof import('../../node_modules/h3').sendNoContent
  const sendProxy: typeof import('../../node_modules/h3').sendProxy
  const sendRedirect: typeof import('../../node_modules/h3').sendRedirect
  const sendStream: typeof import('../../node_modules/h3').sendStream
  const sendWebResponse: typeof import('../../node_modules/h3').sendWebResponse
  const serveStatic: typeof import('../../node_modules/h3').serveStatic
  const setAdminSessionCookie: typeof import('../../server/utils/adminAuth').setAdminSessionCookie
  const setAdminUserStatus: typeof import('../../server/utils/adminUsers').setAdminUserStatus
  const setCookie: typeof import('../../node_modules/h3').setCookie
  const setHeader: typeof import('../../node_modules/h3').setHeader
  const setHeaders: typeof import('../../node_modules/h3').setHeaders
  const setResponseHeader: typeof import('../../node_modules/h3').setResponseHeader
  const setResponseHeaders: typeof import('../../node_modules/h3').setResponseHeaders
  const setResponseStatus: typeof import('../../node_modules/h3').setResponseStatus
  const slugifyContentTitle: typeof import('../../server/utils/safeContentPaths').slugifyContentTitle
  const splitCookiesString: typeof import('../../node_modules/h3').splitCookiesString
  const stringifyMarkdown: typeof import('../../node_modules/@nuxtjs/mdc/dist/runtime/stringify').stringifyMarkdown
  const stringifyMarkdownContent: typeof import('../../server/utils/markdownContent').stringifyMarkdownContent
  const toEventHandler: typeof import('../../node_modules/h3').toEventHandler
  const toNodeListener: typeof import('../../node_modules/h3').toNodeListener
  const toPlainHandler: typeof import('../../node_modules/h3').toPlainHandler
  const toPublicAdminUser: typeof import('../../server/utils/adminUsers').toPublicAdminUser
  const toWebHandler: typeof import('../../node_modules/h3').toWebHandler
  const toWebRequest: typeof import('../../node_modules/h3').toWebRequest
  const todayIsoDate: typeof import('../../server/utils/markdownContent').todayIsoDate
  const unsealSession: typeof import('../../node_modules/h3').unsealSession
  const updateAdminUser: typeof import('../../server/utils/adminUsers').updateAdminUser
  const updateSession: typeof import('../../node_modules/h3').updateSession
  const useAppConfig: typeof import('../../node_modules/nitropack/dist/runtime/internal/config').useAppConfig
  const useBase: typeof import('../../node_modules/h3').useBase
  const useEvent: typeof import('../../node_modules/nitropack/dist/runtime/internal/context').useEvent
  const useNitroApp: typeof import('../../node_modules/nitropack/dist/runtime/internal/app').useNitroApp
  const useRuntimeConfig: typeof import('../../node_modules/nitropack/dist/runtime/internal/config').useRuntimeConfig
  const useSession: typeof import('../../node_modules/h3').useSession
  const useStorage: typeof import('../../node_modules/nitropack/dist/runtime/internal/storage').useStorage
  const validateHomeLayout: typeof import('../../server/utils/homeLayout').validateHomeLayout
  const validatePackageManifest: typeof import('../../server/utils/portableBackups').validatePackageManifest
  const validatePortablePackage: typeof import('../../server/utils/portableBackups').validatePortablePackage
  const validatePortablePath: typeof import('../../server/utils/portableBackups').validatePortablePath
  const verifyAdminCredentials: typeof import('../../server/utils/adminAuth').verifyAdminCredentials
  const verifyAdminPassword: typeof import('../../server/utils/adminUsers').verifyAdminPassword
  const writeAdminUsers: typeof import('../../server/utils/adminUsers').writeAdminUsers
  const writeEarlyHints: typeof import('../../node_modules/h3').writeEarlyHints
  const writeHomeLayout: typeof import('../../server/utils/homeLayout').writeHomeLayout
  const writeMarkdownFile: typeof import('../../server/utils/markdownContent').writeMarkdownFile
}
// for type re-export
declare global {
  // @ts-ignore
  export type { EventHandler, EventHandlerRequest, EventHandlerResponse, EventHandlerObject, H3EventContext } from '../../node_modules/h3'
  import('../../node_modules/h3')
  // @ts-ignore
  export type { AdminUserProvider, AdminUserStatus, AdminUser, PublicAdminUser } from '../../server/utils/adminUsers'
  import('../../server/utils/adminUsers')
  // @ts-ignore
  export type { AnalyticsEventType, AnalyticsContentType, AnalyticsEvent } from '../../server/utils/analytics'
  import('../../server/utils/analytics')
  // @ts-ignore
  export type { HomeLayoutMode, HomeLayout } from '../../server/utils/homeLayout'
  import('../../server/utils/homeLayout')
  // @ts-ignore
  export type { MarkdownFrontmatter } from '../../server/utils/markdownContent'
  import('../../server/utils/markdownContent')
  // @ts-ignore
  export type { GriboPackageType, GriboFileEncoding, GriboImportMode, GriboPortableFile, GriboPortableManifest, GriboPortablePackage } from '../../server/utils/portableBackups'
  import('../../server/utils/portableBackups')
  // @ts-ignore
  export type { AdminContentType } from '../../server/utils/safeContentPaths'
  import('../../server/utils/safeContentPaths')
}
export { H3Event, H3Error, appendCorsHeaders, appendCorsPreflightHeaders, appendHeader, appendHeaders, appendResponseHeader, appendResponseHeaders, assertMethod, callNodeListener, clearResponseHeaders, clearSession, createApp, createAppEventHandler, createError, createEvent, createEventStream, createRouter, defaultContentType, defineEventHandler, defineLazyEventHandler, defineNodeListener, defineNodeMiddleware, defineRequestMiddleware, defineResponseMiddleware, defineWebSocket, defineWebSocketHandler, deleteCookie, dynamicEventHandler, eventHandler, fetchWithEvent, fromNodeMiddleware, fromPlainHandler, fromWebHandler, getCookie, getHeader, getHeaders, getMethod, getProxyRequestHeaders, getQuery, getRequestFingerprint, getRequestHeader, getRequestHeaders, getRequestHost, getRequestIP, getRequestPath, getRequestProtocol, getRequestURL, getRequestWebStream, getResponseHeader, getResponseHeaders, getResponseStatus, getResponseStatusText, getRouterParam, getRouterParams, getSession, getValidatedQuery, getValidatedRouterParams, handleCacheHeaders, handleCors, isCorsOriginAllowed, isError, isEvent, isEventHandler, isMethod, isPreflightRequest, isStream, isWebResponse, lazyEventHandler, parseCookies, promisifyNodeListener, proxyRequest, readBody, readFormData, readMultipartFormData, readRawBody, readValidatedBody, removeResponseHeader, sanitizeStatusCode, sanitizeStatusMessage, sealSession, send, sendError, sendIterable, sendNoContent, sendProxy, sendRedirect, sendStream, sendWebResponse, serveStatic, setCookie, setHeader, setHeaders, setResponseHeader, setResponseHeaders, setResponseStatus, splitCookiesString, toEventHandler, toNodeListener, toPlainHandler, toWebHandler, toWebRequest, unsealSession, updateSession, useBase, useSession, writeEarlyHints } from 'h3';
export { useNitroApp } from 'nitropack/runtime/internal/app';
export { useRuntimeConfig, useAppConfig } from 'nitropack/runtime/internal/config';
export { defineNitroPlugin, nitroPlugin } from 'nitropack/runtime/internal/plugin';
export { defineCachedFunction, defineCachedEventHandler, cachedFunction, cachedEventHandler } from 'nitropack/runtime/internal/cache';
export { useStorage } from 'nitropack/runtime/internal/storage';
export { defineRenderHandler } from 'nitropack/runtime/internal/renderer';
export { defineRouteMeta } from 'nitropack/runtime/internal/meta';
export { getRouteRules } from 'nitropack/runtime/internal/route-rules';
export { useEvent } from 'nitropack/runtime/internal/context';
export { defineTask, runTask } from 'nitropack/runtime/internal/task';
export { defineNitroErrorHandler } from 'nitropack/runtime/internal/error/utils';
export { buildAssetsURL as __buildAssetsURL, publicAssetsURL as __publicAssetsURL } from 'C:/Users/MSI/Desktop/GriboWeb/node_modules/@nuxt/nitro-server/dist/runtime/utils/paths';
export { defineAppConfig } from 'C:/Users/MSI/Desktop/GriboWeb/node_modules/@nuxt/nitro-server/dist/runtime/utils/config';
export { queryCollection, queryCollectionSearchSections, queryCollectionNavigation, queryCollectionItemSurroundings } from 'C:/Users/MSI/Desktop/GriboWeb/node_modules/@nuxt/content/dist/runtime/nitro';
export { parseMarkdown } from 'C:/Users/MSI/Desktop/GriboWeb/node_modules/@nuxtjs/mdc/dist/runtime/parser';
export { stringifyMarkdown } from 'C:/Users/MSI/Desktop/GriboWeb/node_modules/@nuxtjs/mdc/dist/runtime/stringify';
export { getAdminAuthConfig, verifyAdminCredentials, createAdminSessionToken, readAdminSession, setAdminSessionCookie, clearAdminSessionCookie, assertAdminAuthenticated } from 'C:/Users/MSI/Desktop/GriboWeb/server/utils/adminAuth';
export { readAdminUsers, writeAdminUsers, toPublicAdminUser, hashAdminPassword, verifyAdminPassword, createAdminUser, updateAdminUser, setAdminUserStatus, changeAdminUserPassword, findPasswordAdminUser, findGoogleAdminUser, markAdminUserLogin } from 'C:/Users/MSI/Desktop/GriboWeb/server/utils/adminUsers';
export { recordAnalyticsEvent, readAnalyticsEvents, aggregateAnalytics, exportAnalytics, clearAnalyticsData } from 'C:/Users/MSI/Desktop/GriboWeb/server/utils/analytics';
export { getGoogleOAuthConfig, createGoogleState, assertGoogleState, exchangeGoogleCode, fetchGoogleUser } from 'C:/Users/MSI/Desktop/GriboWeb/server/utils/googleOAuth';
export { normalizeHomeLayout, validateHomeLayout, readHomeLayout, writeHomeLayout } from 'C:/Users/MSI/Desktop/GriboWeb/server/utils/homeLayout';
export { parseMarkdownContent, stringifyMarkdownContent, readMarkdownFile, writeMarkdownFile, todayIsoDate } from 'C:/Users/MSI/Desktop/GriboWeb/server/utils/markdownContent';
export { validatePortablePath, validatePackageManifest, validatePortablePackage, collectFullBackupFiles, collectProjectPackageFiles, collectBlogPackageFiles, createPortablePackage, createDownloadResponse, detectImportConflicts, createSafetySnapshot, applyImportAsCopy, applyImportReplace, listSafetySnapshots } from 'C:/Users/MSI/Desktop/GriboWeb/server/utils/portableBackups';
export { adminContentRoots, assertAdminContentType, slugifyContentTitle, resolveAdminContentFile, resolveAdminCreatePath, listAdminMarkdownFiles, getContentPublicPath, getContentDirectory } from 'C:/Users/MSI/Desktop/GriboWeb/server/utils/safeContentPaths';