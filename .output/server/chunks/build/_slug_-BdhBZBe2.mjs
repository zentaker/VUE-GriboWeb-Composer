import { _ as __nuxt_component_0 } from './nuxt-link-BzjT64JD.mjs';
import { _ as __nuxt_component_1 } from './ArticleHero-Dixb1bez.mjs';
import { _ as __nuxt_component_2 } from './ContentBlockRenderer-BPhryi_i.mjs';
import { _ as __nuxt_component_3 } from './ContentRenderer-DNDxFx7I.mjs';
import { _ as __nuxt_component_2$1 } from './RelatedContent-BKp9xP-Z.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, d as useRoute } from './server.mjs';
import { u as useAsyncData } from './asyncData-BKyabxD9.mjs';
import { q as queryCollection } from './client-DE2-8xp2.mjs';
import { u as useGriboSeo } from './useGriboSeo-VrGf0HFJ.mjs';
import '../_/nitro.mjs';
import 'node:crypto';
import 'node:fs/promises';
import 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import 'anymatch';
import 'property-information';
import 'minimark/hast';
import 'vue-router';
import './composables-DkjhwBzb.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = computed(() => String(route.params.slug));
    const path = computed(() => `/blog/${route.params.slug}`);
    const { data: post } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`blog-${path.value}`, async () => {
      const byPath = await queryCollection("blog").path(path.value).first();
      const resolved = byPath ?? await queryCollection("blog").where("slug", "=", slug.value).first();
      if (String(resolved?.status || "").toLowerCase() === "archived" && route.query.preview !== "true") {
        return null;
      }
      return resolved;
    })), __temp = await __temp, __restore(), __temp);
    const dateLabel = computed(() => post.value?.date ? new Date(post.value.date).toLocaleDateString("en", { month: "long", day: "2-digit", year: "numeric" }) : "Draft");
    const postBlocks = computed(
      () => Array.isArray(post.value?.blocks) ? post.value.blocks.filter((block) => block?.visible !== false) : []
    );
    const explicitRelatedItems = computed(() => {
      const items = [];
      const relatedProjects = Array.isArray(post.value?.relatedProjects) ? post.value.relatedProjects : [];
      const relatedDocs = Array.isArray(post.value?.relatedDocs) ? post.value.relatedDocs : [];
      const relatedPosts = Array.isArray(post.value?.relatedPosts) ? post.value.relatedPosts : [];
      for (const item of relatedProjects) {
        const slug2 = typeof item === "string" ? item : item.slug;
        const title = typeof item === "string" ? item : item.title;
        if (slug2) items.push({ label: "Repository", title: title || slug2, to: `/repository/${slug2}` });
      }
      for (const item of relatedDocs) {
        const path2 = typeof item === "string" ? item : item.path;
        const title = typeof item === "string" ? item : item.title;
        if (path2) items.push({ label: "Docs", title: title || path2, to: path2.startsWith("/") ? path2 : `/docs/${path2}` });
      }
      for (const item of relatedPosts) {
        const slug2 = typeof item === "string" ? item : item.slug;
        const title = typeof item === "string" ? item : item.title;
        if (slug2) items.push({ label: "Magazine", title: title || slug2, to: `/blog/${slug2}` });
      }
      return items;
    });
    useGriboSeo(() => ({
      title: post.value?.title,
      description: post.value?.description,
      excerpt: post.value?.excerpt,
      seoTitle: post.value?.seoTitle,
      seoDescription: post.value?.seoDescription,
      ogTitle: post.value?.ogTitle,
      ogDescription: post.value?.ogDescription,
      ogImage: post.value?.ogImage,
      canonical: post.value?.canonical,
      noindex: post.value?.noindex
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ArticleHero = __nuxt_component_1;
      const _component_ContentBlockRenderer = __nuxt_component_2;
      const _component_ContentRenderer = __nuxt_component_3;
      const _component_RelatedContent = __nuxt_component_2$1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "blog-story-shell" }, _attrs))} data-v-90033eff><nav class="breadcrumb" aria-label="Breadcrumb" data-v-90033eff>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span data-v-90033eff>/</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Magazine`);
          } else {
            return [
              createTextVNode("Magazine")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span data-v-90033eff>/</span><span data-v-90033eff>${ssrInterpolate(unref(post)?.title ?? "Article")}</span></nav>`);
      if (unref(post)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_ArticleHero, {
          title: unref(post).title,
          description: unref(post).description,
          category: unref(post).category,
          date: unref(dateLabel),
          status: unref(post).status,
          "cover-style": unref(post).coverStyle,
          "accent-color": unref(post).accentColor
        }, null, _parent));
        _push(`<div class="article-wrap" data-v-90033eff><article class="article" data-v-90033eff><div class="article-meta-row" data-v-90033eff><!--[-->`);
        ssrRenderList(unref(post).tags ?? [], (tag) => {
          _push(`<span class="tag" data-v-90033eff>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--><span class="tag" data-v-90033eff>${ssrInterpolate(unref(post).category)}</span></div>`);
        if (unref(postBlocks).length) {
          _push(ssrRenderComponent(_component_ContentBlockRenderer, {
            id: "content",
            blocks: unref(postBlocks),
            context: "blog"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_ContentRenderer, {
            id: "content",
            class: "content-prose",
            value: unref(post)
          }, null, _parent));
        }
        if (unref(explicitRelatedItems).length) {
          _push(ssrRenderComponent(_component_RelatedContent, {
            title: "Related notes",
            items: unref(explicitRelatedItems)
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</article><aside class="article-aside" data-v-90033eff><div class="aside-card toc" data-v-90033eff><h3 data-v-90033eff>In this story</h3><a href="#content" data-v-90033eff>Opening note</a><a href="#content" data-v-90033eff>Friction signal</a><a href="#content" data-v-90033eff>System memory</a></div><div class="aside-card" data-v-90033eff><h3 data-v-90033eff>Post status</h3><p data-v-90033eff>${ssrInterpolate(unref(post).status ?? "Draft")} concept for the Gribo Digital magazine system.</p></div><div class="aside-card" data-v-90033eff><h3 data-v-90033eff>Reference pattern</h3><p data-v-90033eff>Long-form institutional blog style: human title, field story, tags, and reflective closing.</p></div><div class="aside-card" data-v-90033eff><h3 data-v-90033eff>Project links</h3><p data-v-90033eff>AI Systems · Codex Local Workflow · Gribo Docs System</p></div></aside></div><!--]-->`);
      } else {
        _push(`<section class="missing-card" data-v-90033eff><p class="eyebrow" data-v-90033eff>Draft gap</p><h1 data-v-90033eff>Article placeholder</h1><p class="muted" data-v-90033eff>This route is ready for Nuxt Content entries.</p></section>`);
      }
      _push(`</main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-90033eff"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-BdhBZBe2.mjs.map
