export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  let cleanup: (() => void) | null = null

  function getSessionId() {
    const key = 'gribo.analytics.sessionId'
    const existing = sessionStorage.getItem(key)
    if (existing) return existing

    const generated = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`
    const safe = generated.replace(/[^a-zA-Z0-9_-]/g, '')
    sessionStorage.setItem(key, safe)
    return safe
  }

  function isPublicRoute(path: string) {
    return !path.startsWith('/admin') && !path.startsWith('/api')
  }

  function inferContentType(path: string) {
    if (path === '/') return 'home'
    if (path === '/blog' || path.startsWith('/blog/')) return 'blog'
    if (path === '/repository' || path.startsWith('/repository/')) return 'project'
    if (path === '/docs' || path.startsWith('/docs/')) return 'docs'
    if (path === '/labs' || path.startsWith('/labs/')) return 'lab'
    return ''
  }

  function inferSlug(path: string, contentType: string) {
    if (contentType === 'home') return 'home'
    const parts = path.split('/').filter(Boolean)
    if (contentType === 'docs') return parts.slice(1).join('/') || 'docs-index'
    return parts[1] || 'index'
  }

  function isReadingRoute(path: string) {
    return /^\/blog\/[^/]+/.test(path)
      || /^\/repository\/[^/]+/.test(path)
      || /^\/docs\/.+/.test(path)
      || /^\/labs\/[^/]+/.test(path)
  }

  function sentKey(path: string, eventType: string, detail = '') {
    return `gribo.analytics.sent:${path}:${eventType}:${detail}`
  }

  async function sendEvent(eventType: string, metadata: Record<string, string | number | boolean> = {}) {
    const path = window.location.pathname
    if (!isPublicRoute(path)) return

    const contentType = inferContentType(path)
    if (!contentType) return

    try {
      await $fetch('/api/analytics/event', {
        method: 'POST',
        body: {
          eventType,
          contentType,
          slug: inferSlug(path, contentType),
          title: document.title.replace(/\s+-\s+Gribo Digital$/, ''),
          route: path,
          referrer: document.referrer,
          sessionId: getSessionId(),
          metadata
        }
      })
    } catch {
      // Analytics must never interrupt public reading.
    }
  }

  function sendOnce(path: string, eventType: string, detail = '', metadata: Record<string, string | number | boolean> = {}) {
    const key = sentKey(path, eventType, detail)
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
    void sendEvent(eventType, metadata)
  }

  function progressPercent() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const viewport = window.innerHeight
    const height = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      viewport
    )
    const total = Math.max(height - viewport, 1)

    return Math.min(100, Math.round((scrollTop / total) * 100))
  }

  function setupReadingTracking(path: string) {
    if (!isReadingRoute(path)) return () => {}

    let started = false
    const startReading = () => {
      if (started) return
      started = true
      sendOnce(path, 'read_start')
    }
    const timer = window.setTimeout(startReading, 5000)
    const thresholds = [25, 50, 75, 90]

    const onScroll = () => {
      startReading()
      const progress = progressPercent()

      for (const threshold of thresholds) {
        if (progress >= threshold) {
          if (threshold === 90) {
            sendOnce(path, 'read_complete', '90', { progress: threshold })
          } else {
            sendOnce(path, 'read_progress', String(threshold), { progress: threshold })
          }
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }

  function trackRoute() {
    const path = window.location.pathname
    if (!isPublicRoute(path)) return

    void sendEvent('view')
    cleanup?.()
    cleanup = setupReadingTracking(path)
  }

  nuxtApp.hook('app:mounted', () => {
    trackRoute()

    document.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target.closest('a,button') : null
      if (!target || !isPublicRoute(window.location.pathname)) return

      const label = (target.textContent || '').replace(/\s+/g, ' ').trim()
      const trackedLabels = ['Read documentation', 'View project', 'Open public home', 'Subscribe', 'Explore projects', 'Explore labs', 'Start reading']
      const explicitId = target.getAttribute('data-analytics-cta')
      const shouldTrack = explicitId || trackedLabels.some((item) => label.includes(item))

      if (!shouldTrack) return

      const href = target instanceof HTMLAnchorElement ? target.getAttribute('href') || '' : ''
      void sendEvent('cta_click', {
        ctaId: explicitId || label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        label,
        target: href
      })
    })
  })

  router.afterEach(() => {
    window.setTimeout(trackRoute, 0)
  })
})
