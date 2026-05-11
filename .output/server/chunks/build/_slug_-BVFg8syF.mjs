import { _ as __nuxt_component_0 } from './nuxt-link-BzjT64JD.mjs';
import { _ as __nuxt_component_0$1, a as __nuxt_component_2$1 } from './TagPill-7BHTscNI.mjs';
import { _ as __nuxt_component_2 } from './RelatedContent-BKp9xP-Z.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, d as useRoute } from './server.mjs';
import { u as useAsyncData } from './asyncData-BKyabxD9.mjs';
import { q as queryCollection } from './client-BeWG7WkH.mjs';
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
    const { data: lab } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`lab-${slug.value}`, () => queryCollection("labs").where("slug", "=", slug.value).first())), __temp = await __temp, __restore(), __temp);
    const { data: previewLab } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`lab-preview-${slug.value}`, async () => {
      if (route.query.preview !== "true") return null;
      try {
        const response = await $fetch("/api/admin/content/read", {
          method: "POST",
          body: {
            contentType: "labs",
            filePath: `labs/${slug.value}.md`
          }
        });
        return response.item.frontmatter;
      } catch {
        return null;
      }
    })), __temp = await __temp, __restore(), __temp);
    const displayLab = computed(() => lab.value ?? previewLab.value);
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`lab-posts-${slug.value}`, () => queryCollection("blog").where("lab", "=", slug.value).order("date", "DESC").all())), __temp = await __temp, __restore(), __temp);
    const { data: projects } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`lab-projects-${slug.value}`, () => queryCollection("projects").where("lab", "=", slug.value).all())), __temp = await __temp, __restore(), __temp);
    const { data: docs } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`lab-docs-${slug.value}`, () => queryCollection("docs").where("lab", "=", slug.value).order("order", "ASC").all())), __temp = await __temp, __restore(), __temp);
    useGriboSeo(() => ({
      title: displayLab.value?.title ? `${displayLab.value.title} Lab | Gribo Digital` : void 0,
      description: displayLab.value?.description,
      seoTitle: displayLab.value?.seoTitle,
      seoDescription: displayLab.value?.seoDescription,
      ogTitle: displayLab.value?.ogTitle,
      ogDescription: displayLab.value?.ogDescription,
      ogImage: displayLab.value?.ogImage,
      canonical: displayLab.value?.canonical,
      noindex: displayLab.value?.noindex
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_LabHero = __nuxt_component_0$1;
      const _component_RelatedContent = __nuxt_component_2;
      const _component_TagPill = __nuxt_component_2$1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "content-shell lab-page" }, _attrs))} data-v-3cfa13b5>`);
      if (unref(displayLab)) {
        _push(`<!--[--><nav class="breadcrumb" aria-label="Breadcrumb" data-v-3cfa13b5>`);
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
        _push(`<span data-v-3cfa13b5>/</span>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/labs" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Labs`);
            } else {
              return [
                createTextVNode("Labs")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span data-v-3cfa13b5>/</span><span data-v-3cfa13b5>${ssrInterpolate(unref(displayLab).title)}</span></nav>`);
        _push(ssrRenderComponent(_component_LabHero, {
          eyebrow: `${unref(displayLab).status} research line`,
          title: unref(displayLab).title,
          description: unref(displayLab).description,
          accent: unref(displayLab).accent
        }, null, _parent));
        _push(`<section class="lab-layout" data-v-3cfa13b5><article class="lab-main" data-v-3cfa13b5><section class="lab-panel" data-v-3cfa13b5><p class="eyebrow" data-v-3cfa13b5><span class="pulse" data-v-3cfa13b5></span>Open questions</p><ul class="question-list" data-v-3cfa13b5><!--[-->`);
        ssrRenderList(unref(displayLab).openQuestions, (question) => {
          _push(`<li data-v-3cfa13b5>${ssrInterpolate(question)}</li>`);
        });
        _push(`<!--]--></ul></section><section class="lab-panel" data-v-3cfa13b5><p class="eyebrow" data-v-3cfa13b5>Roadmap</p><ol class="roadmap-list" data-v-3cfa13b5><!--[-->`);
        ssrRenderList(unref(displayLab).roadmap, (item) => {
          _push(`<li data-v-3cfa13b5>${ssrInterpolate(item)}</li>`);
        });
        _push(`<!--]--></ol></section>`);
        _push(ssrRenderComponent(_component_RelatedContent, {
          title: "Related posts",
          items: (unref(posts) ?? []).map((post) => ({
            label: post.category ?? "Article",
            title: post.title,
            to: post.path
          }))
        }, null, _parent));
        _push(ssrRenderComponent(_component_RelatedContent, {
          title: "Related projects",
          items: (unref(projects) ?? []).map((project) => ({
            label: project.status ?? "Project",
            title: project.title,
            to: project.path.replace("/projects/", "/repository/")
          }))
        }, null, _parent));
        _push(ssrRenderComponent(_component_RelatedContent, {
          title: "Related documentation",
          items: (unref(docs) ?? []).map((doc) => ({
            label: doc.section ?? "Docs",
            title: doc.title,
            to: doc.path
          }))
        }, null, _parent));
        _push(`</article><aside class="lab-aside" data-v-3cfa13b5><div class="aside-card" data-v-3cfa13b5><span data-v-3cfa13b5>Status</span><strong data-v-3cfa13b5>${ssrInterpolate(unref(displayLab).status)}</strong></div><div class="aside-card" data-v-3cfa13b5><span data-v-3cfa13b5>Related tags</span><div class="tag-row" data-v-3cfa13b5><!--[-->`);
        ssrRenderList(unref(displayLab).relatedTags, (tag) => {
          _push(ssrRenderComponent(_component_TagPill, {
            key: tag,
            label: tag
          }, null, _parent));
        });
        _push(`<!--]--></div></div><div class="aside-card" data-v-3cfa13b5><span data-v-3cfa13b5>Counts</span><dl data-v-3cfa13b5><div data-v-3cfa13b5><dt data-v-3cfa13b5>Posts</dt><dd data-v-3cfa13b5>${ssrInterpolate(unref(posts)?.length ?? 0)}</dd></div><div data-v-3cfa13b5><dt data-v-3cfa13b5>Projects</dt><dd data-v-3cfa13b5>${ssrInterpolate(unref(projects)?.length ?? 0)}</dd></div><div data-v-3cfa13b5><dt data-v-3cfa13b5>Docs</dt><dd data-v-3cfa13b5>${ssrInterpolate(unref(docs)?.length ?? 0)}</dd></div></dl></div></aside></section><!--]-->`);
      } else {
        _push(`<section class="missing-card" data-v-3cfa13b5><h1 data-v-3cfa13b5>Lab not found</h1><p class="muted" data-v-3cfa13b5>This research line is not defined in Nuxt Content yet.</p></section>`);
      }
      _push(`</main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/labs/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3cfa13b5"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-BVFg8syF.mjs.map
