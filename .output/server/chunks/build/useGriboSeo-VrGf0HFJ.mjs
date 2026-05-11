import { computed, toValue } from 'vue';
import { u as useSeoMeta, a as useHead } from './composables-DkjhwBzb.mjs';

const defaultTitle = "Gribo Digital";
const defaultDescription = "Editorial laboratory for digital systems, cultural infrastructure, and living research.";
const defaultOgImage = "/og/gribo-digital.png";
function useGriboSeo(input) {
  const seo = computed(() => {
    const data = toValue(input) ?? {};
    const title = data.seoTitle || data.title || defaultTitle;
    const description = data.seoDescription || data.description || data.excerpt || data.summary || defaultDescription;
    const ogTitle = data.ogTitle || title;
    const ogDescription = data.ogDescription || description;
    return {
      title,
      description,
      ogTitle,
      ogDescription,
      ogImage: data.ogImage || defaultOgImage,
      canonical: data.canonical,
      robots: data.noindex ? "noindex, nofollow" : "index, follow"
    };
  });
  useSeoMeta({
    title: () => seo.value.title,
    description: () => seo.value.description,
    ogTitle: () => seo.value.ogTitle,
    ogDescription: () => seo.value.ogDescription,
    ogImage: () => seo.value.ogImage,
    robots: () => seo.value.robots
  });
  useHead(() => ({
    link: seo.value.canonical ? [
      {
        rel: "canonical",
        href: seo.value.canonical
      }
    ] : []
  }));
}

export { useGriboSeo as u };
//# sourceMappingURL=useGriboSeo-VrGf0HFJ.mjs.map
