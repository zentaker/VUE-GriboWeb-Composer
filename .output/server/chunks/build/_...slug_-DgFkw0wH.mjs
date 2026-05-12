import { _ as __nuxt_component_0 } from './nuxt-link-BzjT64JD.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, withCtx, createTextVNode, unref, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, d as useRoute } from './server.mjs';
import { _ as __nuxt_component_2 } from './ContentBlockRenderer-DijUswS0.mjs';
import { _ as __nuxt_component_3 } from './ContentRenderer-DNDxFx7I.mjs';
import { u as useAsyncData } from './asyncData-BKyabxD9.mjs';
import { q as queryCollection } from './client-B3SbGRe7.mjs';
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
import 'property-information';
import 'minimark/hast';
import './composables-DkjhwBzb.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DocsHero",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {},
    section: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "docs-hero" }, _attrs))} data-v-6865b766><p class="eyebrow" data-v-6865b766><span class="pulse" data-v-6865b766></span>${ssrInterpolate(__props.section ?? "Research documentation")}</p><h1 data-v-6865b766>${ssrInterpolate(__props.title)}</h1><p class="lede" data-v-6865b766>${ssrInterpolate(__props.description)}</p><div class="hero-actions" data-v-6865b766><a class="pill-button" href="#content" data-v-6865b766>Start reading</a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "pill-button",
        to: "/repository/tennis-image-analysis"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View project`);
          } else {
            return [
              createTextVNode("View project")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/DocsHero.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-6865b766"]]), { __name: "DocsHero" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = computed(() => {
      const value = route.params.slug;
      return Array.isArray(value) ? value.join("/") : value;
    });
    const path = computed(() => `/docs/${slug.value}`);
    const pageSlug = computed(() => slug.value.split("/").pop() || slug.value);
    const { data: doc } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`docs-${path.value}`, async () => {
      const byPath = await queryCollection("docs").path(path.value).first();
      return byPath ?? await queryCollection("docs").where("slug", "=", pageSlug.value).first();
    })), __temp = await __temp, __restore(), __temp);
    const { data: previewDoc } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`docs-preview-${slug.value}`, async () => {
      if (route.query.preview !== "true") return null;
      try {
        const response = await $fetch("/api/admin/content/read", {
          method: "POST",
          body: {
            contentType: "docs",
            filePath: `docs/${slug.value}.md`
          }
        });
        return response.item;
      } catch {
        return null;
      }
    })), __temp = await __temp, __restore(), __temp);
    const displayDoc = computed(() => doc.value ?? previewDoc.value?.frontmatter);
    const previewBody = computed(() => previewDoc.value?.body ?? "");
    const previewHtml = computed(
      () => previewBody.value.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean).map((block) => {
        if (block.startsWith("# ")) return `<h1>${block.slice(2)}</h1>`;
        if (block.startsWith("## ")) return `<h2>${block.slice(3)}</h2>`;
        return `<p>${block.replace(/\n/g, "<br>")}</p>`;
      }).join("")
    );
    const title = computed(() => displayDoc.value?.title ?? "Docs placeholder");
    const description = computed(() => displayDoc.value?.description ?? "This route is wired for Nuxt Content documentation pages.");
    const docBlocks = computed(
      () => Array.isArray(displayDoc.value?.blocks) ? displayDoc.value.blocks.filter((block) => block?.visible !== false) : []
    );
    const docsFolder = computed(() => displayDoc.value?.docsFolder || slug.value.split("/")[0]);
    const { data: siblingDocs } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`docs-siblings-${slug.value}`, async () => {
      return await queryCollection("docs").all();
    })), __temp = await __temp, __restore(), __temp);
    const { data: projects } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`docs-project-context-${slug.value}`, async () => {
      return await queryCollection("projects").all();
    })), __temp = await __temp, __restore(), __temp);
    const docPath = (item) => item.path || `/${item.stem || ""}`.replace(/\/index$/, "");
    const normalizeDocRef = (value) => {
      const ref = String(value || "").trim();
      if (!ref) return "";
      return ref.startsWith("/docs/") ? ref.replace(/\/index$/, "") : `/docs/${ref}`.replace(/\/index$/, "");
    };
    const explicitProject = computed(() => {
      const current = path.value.replace(/\/index$/, "");
      return (projects.value ?? []).find((project) => {
        const refs = [
          ...Array.isArray(project.relatedDocs) ? project.relatedDocs : [],
          ...Array.isArray(project.docsPaths) ? project.docsPaths : [],
          project.docsPath
        ].map(normalizeDocRef).filter(Boolean);
        return refs.includes(current);
      });
    });
    const projectContext = computed(() => {
      if (explicitProject.value) return explicitProject.value;
      const docProjectSlug = displayDoc.value?.projectSlug;
      if (docProjectSlug) {
        const bySlug = (projects.value ?? []).find((project) => project.slug === docProjectSlug);
        if (bySlug) return bySlug;
      }
      return (projects.value ?? []).find((project) => project.docsFolder && project.docsFolder === docsFolder.value);
    });
    const projectSlug = computed(() => projectContext.value?.slug || displayDoc.value?.projectSlug || "");
    const projectTitle = computed(() => projectContext.value?.title || displayDoc.value?.project || "Project documentation");
    const projectRoute = computed(() => projectSlug.value ? `/repository/${projectSlug.value}` : "/repository");
    const attachedDocRefs = computed(() => {
      const projectValue = projectContext.value;
      if (!projectValue) return [];
      return [
        ...Array.isArray(projectValue.relatedDocs) ? projectValue.relatedDocs : [],
        ...Array.isArray(projectValue.docsPaths) ? projectValue.docsPaths : [],
        projectValue.docsPath
      ].map(normalizeDocRef).filter((item, index, list) => item && list.indexOf(item) === index);
    });
    const nextDocs = computed(
      () => (siblingDocs.value ?? []).filter((item) => {
        const itemPath = docPath(item);
        if (itemPath === path.value.replace(/\/index$/, "")) return false;
        if (attachedDocRefs.value.length) return attachedDocRefs.value.includes(itemPath);
        return itemPath.startsWith(`/docs/${docsFolder.value}`);
      }).sort((a, b) => Number(a.order ?? 99) - Number(b.order ?? 99)).slice(0, 2)
    );
    useGriboSeo(() => ({
      title: title.value ? `${title.value} - Gribo Digital` : void 0,
      description: description.value,
      seoTitle: displayDoc.value?.seoTitle,
      seoDescription: displayDoc.value?.seoDescription,
      ogTitle: displayDoc.value?.ogTitle,
      ogDescription: displayDoc.value?.ogDescription,
      ogImage: displayDoc.value?.ogImage,
      canonical: displayDoc.value?.canonical,
      noindex: displayDoc.value?.noindex
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_DocsHero = __nuxt_component_1;
      const _component_ContentBlockRenderer = __nuxt_component_2;
      const _component_ContentRenderer = __nuxt_component_3;
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "docs-page" }, _attrs))} data-v-930fe95e><nav class="crumbs" aria-label="Breadcrumb" data-v-930fe95e>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/repository" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Repository`);
          } else {
            return [
              createTextVNode("Repository")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span data-v-930fe95e>/</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: unref(projectRoute) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(projectTitle))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(projectTitle)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span data-v-930fe95e>/</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/docs/${unref(docsFolder)}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Documentation`);
          } else {
            return [
              createTextVNode("Documentation")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span data-v-930fe95e>/</span><span data-v-930fe95e>${ssrInterpolate(unref(title))}</span></nav>`);
      if (unref(displayDoc)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_DocsHero, {
          title: unref(displayDoc).title,
          description: unref(displayDoc).description ?? "",
          section: unref(displayDoc).section ?? "Research documentation"
        }, null, _parent));
        _push(`<section id="project-state" class="docs-meta-grid" aria-label="Documentation metadata" data-v-930fe95e><div class="meta-card" data-v-930fe95e><span data-v-930fe95e>System</span><strong data-v-930fe95e>${ssrInterpolate(unref(displayDoc).project ?? "Project documentation")}</strong></div><div class="meta-card" data-v-930fe95e><span data-v-930fe95e>Mode</span><strong data-v-930fe95e>${ssrInterpolate(unref(displayDoc).section ?? "Documentation")}</strong></div><div class="meta-card" data-v-930fe95e><span data-v-930fe95e>Status</span><strong data-v-930fe95e>Living draft</strong></div></section><section class="docs-callout" data-v-930fe95e><p class="eyebrow" data-v-930fe95e><span class="pulse" data-v-930fe95e></span>Technical note</p><p data-v-930fe95e> These docs are public reading surfaces in Stage 2B. They model the future project documentation experience without adding admin editing or persistence. </p></section><section id="content" class="docs-content-card" data-v-930fe95e>`);
        if (unref(docBlocks).length) {
          _push(ssrRenderComponent(_component_ContentBlockRenderer, {
            blocks: unref(docBlocks),
            context: "docs"
          }, null, _parent));
        } else if (unref(doc)) {
          _push(ssrRenderComponent(_component_ContentRenderer, {
            class: "content-prose",
            value: unref(doc)
          }, null, _parent));
        } else {
          _push(`<div class="content-prose" data-v-930fe95e>${unref(previewHtml) ?? ""}</div>`);
        }
        _push(`</section><section id="next" class="docs-next" data-v-930fe95e><!--[-->`);
        ssrRenderList(unref(nextDocs), (nextDoc) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: docPath(nextDoc),
            class: "next-card",
            to: docPath(nextDoc)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span data-v-930fe95e${_scopeId}>Related document</span><strong data-v-930fe95e${_scopeId}>${ssrInterpolate(nextDoc.title)}</strong>`);
              } else {
                return [
                  createVNode("span", null, "Related document"),
                  createVNode("strong", null, toDisplayString(nextDoc.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]-->`);
        if (!unref(nextDocs).length) {
          _push(`<div class="next-card" data-v-930fe95e><span data-v-930fe95e>Next document</span><strong data-v-930fe95e>No sibling docs yet</strong></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section><!--]-->`);
      } else {
        _push(`<section class="missing-doc card" data-v-930fe95e><p class="eyebrow" data-v-930fe95e>Documentation</p><h1 data-v-930fe95e>Docs placeholder</h1><p class="muted" data-v-930fe95e>This route is wired for Nuxt Content documentation pages.</p></section>`);
      }
      _push(`</article>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/docs/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-930fe95e"]]);

export { ____slug_ as default };
//# sourceMappingURL=_...slug_-DgFkw0wH.mjs.map
