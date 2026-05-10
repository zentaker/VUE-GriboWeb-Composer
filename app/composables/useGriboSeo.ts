import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'

type GriboSeoInput = {
  title?: string
  description?: string
  excerpt?: string
  summary?: string
  seoTitle?: string
  seoDescription?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonical?: string
  noindex?: boolean
}

const defaultTitle = 'Gribo Digital'
const defaultDescription = 'Editorial laboratory for digital systems, cultural infrastructure, and living research.'
const defaultOgImage = '/og/gribo-digital.png'

export function useGriboSeo(input: MaybeRefOrGetter<GriboSeoInput | null | undefined>) {
  const seo = computed(() => {
    const data = toValue(input) ?? {}
    const title = data.seoTitle || data.title || defaultTitle
    const description = data.seoDescription || data.description || data.excerpt || data.summary || defaultDescription
    const ogTitle = data.ogTitle || title
    const ogDescription = data.ogDescription || description

    return {
      title,
      description,
      ogTitle,
      ogDescription,
      ogImage: data.ogImage || defaultOgImage,
      canonical: data.canonical,
      robots: data.noindex ? 'noindex, nofollow' : 'index, follow'
    }
  })

  useSeoMeta({
    title: () => seo.value.title,
    description: () => seo.value.description,
    ogTitle: () => seo.value.ogTitle,
    ogDescription: () => seo.value.ogDescription,
    ogImage: () => seo.value.ogImage,
    robots: () => seo.value.robots
  })

  useHead(() => ({
    link: seo.value.canonical
      ? [
          {
            rel: 'canonical',
            href: seo.value.canonical
          }
        ]
      : []
  }))
}
