import { defineComponent, computed, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, d as useRoute } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BzjT64JD.mjs';
import { _ as __nuxt_component_2 } from './ContentBlockRenderer-DijUswS0.mjs';
import { _ as __nuxt_component_3 } from './ContentRenderer-DNDxFx7I.mjs';
import { u as useAsyncData } from './asyncData-BKyabxD9.mjs';
import { q as queryCollection } from './client-D49IuaH2.mjs';
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
  __name: "ProjectOverviewRenderer",
  __ssrInlineRender: true,
  props: {
    project: {},
    payload: {},
    docLinks: {}
  },
  setup(__props) {
    const props = __props;
    const theme = computed(() => props.payload.theme || {});
    const hero = computed(() => props.payload.hero || {});
    const sections = computed(() => Array.isArray(props.payload.sections) ? props.payload.sections : []);
    const meta = computed(() => Array.isArray(props.payload.meta) ? props.payload.meta : []);
    const sidebar = computed(() => Array.isArray(props.payload.sidebar) ? props.payload.sidebar : []);
    const rail = computed(() => Array.isArray(props.payload.rail) ? props.payload.rail : []);
    const shellStyle = computed(() => ({
      "--pov-accent": accentValue(props.project.overviewAccentColor || theme.value.accentColor || "coral"),
      "--pov-secondary": accentValue(props.project.overviewSecondaryAccent || theme.value.secondaryAccent || "lavender")
    }));
    const heroTitle = computed(() => hero.value.title || props.project.title);
    const heroSubtitle = computed(() => hero.value.subtitle || props.project.summary || props.project.description);
    const heroEyebrow = computed(() => hero.value.eyebrow || `Living project repository / ${props.project.status || "draft"}`);
    const leftLinks = computed(() => {
      const docs = (props.docLinks || []).map((doc) => ({
        label: doc.label || doc.title,
        to: doc.to || doc.href
      }));
      return {
        start: sidebar.value.length ? sidebar.value : [
          { label: "Overview", to: "#overview", active: true },
          { label: "Project memory", to: "#memory" },
          { label: "Project index", to: "#index" },
          { label: "Documentation", to: "#documentation" },
          { label: "Build log", to: "#build-log" }
        ],
        docs
      };
    });
    function accentValue(value) {
      const colors = {
        coral: "#ff796d",
        lavender: "#7767c9",
        cream: "#fff7ee",
        graphite: "#38332e",
        "soft-red": "#f5b8c5",
        "muted-violet": "#8f7fe8",
        blue: "#5e86b7",
        mint: "#6ca47a",
        yellow: "#c9a84d"
      };
      return colors[value] || value || colors.coral;
    }
    function sectionId(section, index) {
      return section.id || `section-${index + 1}`;
    }
    function items(value) {
      return Array.isArray(value) ? value : [];
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "pov-shell",
        style: unref(shellStyle)
      }, _attrs))} data-v-bef87032><div class="pov-layout" data-v-bef87032><aside class="pov-sidebar" aria-label="Project navigation" data-v-bef87032><div class="pov-side-title" data-v-bef87032>Start</div><!--[-->`);
      ssrRenderList(unref(leftLinks).start, (link) => {
        _push(`<a class="${ssrRenderClass([{ active: link.active }, "pov-side-link"])}"${ssrRenderAttr("href", link.to || "#overview")} data-v-bef87032>${ssrInterpolate(link.label || link.title)}</a>`);
      });
      _push(`<!--]--><div class="pov-side-title" data-v-bef87032>Documentation</div><!--[-->`);
      ssrRenderList(unref(leftLinks).docs, (link) => {
        _push(`<a class="pov-side-link"${ssrRenderAttr("href", link.to || "#documentation")} data-v-bef87032>${ssrInterpolate(link.label || link.title)}</a>`);
      });
      _push(`<!--]-->`);
      if (!unref(leftLinks).docs.length) {
        _push(`<p class="pov-side-note" data-v-bef87032>No documentation attached yet.</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="pov-note" data-v-bef87032><strong data-v-bef87032>${ssrInterpolate(__props.payload.sidebarNote?.title || "Overview behavior")}</strong><p data-v-bef87032>${ssrInterpolate(__props.payload.sidebarNote?.body || "This overview is rendered from a structured project payload, not raw HTML.")}</p></div></aside><main class="pov-content" data-v-bef87032><article class="pov-doc" data-v-bef87032><div class="pov-breadcrumb" data-v-bef87032><span data-v-bef87032>Repository</span><span data-v-bef87032>/</span><span data-v-bef87032>${ssrInterpolate(__props.project.title)}</span><span data-v-bef87032>/</span><span data-v-bef87032>Overview</span></div><section id="overview" class="pov-hero" data-v-bef87032><div class="pov-eyebrow" data-v-bef87032><span class="pov-pulse" data-v-bef87032></span>${ssrInterpolate(unref(heroEyebrow))}</div><h1 data-v-bef87032>${ssrInterpolate(unref(heroTitle))}</h1><p class="pov-hero-subtitle" data-v-bef87032>${ssrInterpolate(unref(heroSubtitle))}</p>`);
      if (items(unref(hero).actions).length) {
        _push(`<div class="pov-actions" data-v-bef87032><!--[-->`);
        ssrRenderList(unref(hero).actions, (action) => {
          _push(`<a class="${ssrRenderClass([{ primary: action.primary }, "pov-pill"])}"${ssrRenderAttr("href", action.to || "#overview")} data-v-bef87032>${ssrInterpolate(action.label)}</a>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
      if (unref(meta).length) {
        _push(`<div id="project-state" class="pov-meta-grid" data-v-bef87032><!--[-->`);
        ssrRenderList(unref(meta), (item) => {
          _push(`<div class="pov-meta-card" data-v-bef87032><span data-v-bef87032>${ssrInterpolate(item.label)}</span><strong data-v-bef87032>${ssrInterpolate(item.value)}</strong></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(sections), (section, index) => {
        _push(`<!--[-->`);
        if (section.type === "memory") {
          _push(`<section${ssrRenderAttr("id", sectionId(section, index))} class="pov-section" data-v-bef87032><div class="pov-section-head" data-v-bef87032><div class="pov-section-label" data-v-bef87032>${ssrInterpolate(section.label)}</div><h2 data-v-bef87032>${ssrInterpolate(section.title)}</h2><p class="pov-section-intro" data-v-bef87032>${ssrInterpolate(section.intro)}</p></div><div class="pov-grid-2" data-v-bef87032><!--[-->`);
          ssrRenderList(items(section.cards), (card) => {
            _push(`<article class="${ssrRenderClass([{ "accent-card": card.variant === "accent", "warning-card": card.variant === "warning" }, "pov-card pov-big-card"])}" data-v-bef87032><h3 data-v-bef87032>${ssrInterpolate(card.title)}</h3><p data-v-bef87032>${ssrInterpolate(card.body)}</p>`);
            if (items(card.items).length) {
              _push(`<ul data-v-bef87032><!--[-->`);
              ssrRenderList(card.items, (item) => {
                _push(`<li data-v-bef87032>${ssrInterpolate(item)}</li>`);
              });
              _push(`<!--]--></ul>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</article>`);
          });
          _push(`<!--]--></div>`);
          if (section.callout) {
            _push(`<div class="pov-callout" data-v-bef87032><div class="pov-callout-icon" data-v-bef87032>${ssrInterpolate(section.callout.icon || "!")}</div><div data-v-bef87032><h3 data-v-bef87032>${ssrInterpolate(section.callout.title)}</h3><p data-v-bef87032>${ssrInterpolate(section.callout.body)}</p></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</section>`);
        } else if (section.type === "cards") {
          _push(`<section${ssrRenderAttr("id", sectionId(section, index))} class="pov-section" data-v-bef87032><div class="pov-section-head" data-v-bef87032><div class="pov-section-label" data-v-bef87032>${ssrInterpolate(section.label)}</div><h2 data-v-bef87032>${ssrInterpolate(section.title)}</h2><p class="pov-section-intro" data-v-bef87032>${ssrInterpolate(section.intro)}</p></div><div class="${ssrRenderClass(section.columns === 2 ? "pov-grid-2" : "pov-grid-3")}" data-v-bef87032><!--[-->`);
          ssrRenderList(items(section.cards), (card) => {
            _push(`<article class="pov-card" data-v-bef87032><h3 data-v-bef87032>${ssrInterpolate(card.title)}</h3><p data-v-bef87032>${ssrInterpolate(card.body)}</p>`);
            if (items(card.items).length) {
              _push(`<ul data-v-bef87032><!--[-->`);
              ssrRenderList(card.items, (item) => {
                _push(`<li data-v-bef87032>${ssrInterpolate(item)}</li>`);
              });
              _push(`<!--]--></ul>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</article>`);
          });
          _push(`<!--]--></div></section>`);
        } else if (section.type === "lenses") {
          _push(`<section${ssrRenderAttr("id", sectionId(section, index))} class="pov-section" data-v-bef87032><div class="pov-section-head" data-v-bef87032><div class="pov-section-label" data-v-bef87032>${ssrInterpolate(section.label)}</div><h2 data-v-bef87032>${ssrInterpolate(section.title)}</h2><p class="pov-section-intro" data-v-bef87032>${ssrInterpolate(section.intro)}</p></div><div class="pov-lens-grid" data-v-bef87032><!--[-->`);
          ssrRenderList(items(section.items), (lens, lensIndex) => {
            _push(`<article class="pov-lens" data-v-bef87032><div class="pov-lens-number" data-v-bef87032>${ssrInterpolate(String(lensIndex + 1).padStart(2, "0"))}</div><div data-v-bef87032><h3 data-v-bef87032>${ssrInterpolate(lens.title)}</h3><p data-v-bef87032>${ssrInterpolate(lens.body)}</p></div></article>`);
          });
          _push(`<!--]--></div></section>`);
        } else if (section.type === "index") {
          _push(`<section${ssrRenderAttr("id", sectionId(section, index))} class="pov-section" data-v-bef87032><div class="pov-section-head" data-v-bef87032><div class="pov-section-label" data-v-bef87032>${ssrInterpolate(section.label)}</div><h2 data-v-bef87032>${ssrInterpolate(section.title)}</h2><p class="pov-section-intro" data-v-bef87032>${ssrInterpolate(section.intro)}</p></div><div class="pov-index-grid" data-v-bef87032><!--[-->`);
          ssrRenderList(items(section.items), (item, itemIndex) => {
            _push(`<a class="pov-index-item"${ssrRenderAttr("href", item.to || "#")} data-v-bef87032><div class="pov-index-num" data-v-bef87032>${ssrInterpolate(String(itemIndex + 1).padStart(2, "0"))}</div><div data-v-bef87032><h3 data-v-bef87032>${ssrInterpolate(item.title)}</h3><p data-v-bef87032>${ssrInterpolate(item.body)}</p></div><div class="pov-index-arrow" data-v-bef87032>-&gt;</div></a>`);
          });
          _push(`<!--]--></div></section>`);
        } else if (section.type === "flow" || section.type === "buildLog") {
          _push(`<section${ssrRenderAttr("id", sectionId(section, index))} class="pov-section" data-v-bef87032><div class="pov-section-head" data-v-bef87032><div class="pov-section-label" data-v-bef87032>${ssrInterpolate(section.label)}</div><h2 data-v-bef87032>${ssrInterpolate(section.title)}</h2><p class="pov-section-intro" data-v-bef87032>${ssrInterpolate(section.intro)}</p></div><div class="pov-flow" data-v-bef87032><!--[-->`);
          ssrRenderList(items(section.steps || section.items), (step, stepIndex) => {
            _push(`<article class="pov-flow-step" data-v-bef87032><span data-v-bef87032>${ssrInterpolate(step.number || stepIndex + 1)}</span><div data-v-bef87032><h3 data-v-bef87032>${ssrInterpolate(step.title)}</h3><p data-v-bef87032>${ssrInterpolate(step.body)}</p></div></article>`);
          });
          _push(`<!--]--></div></section>`);
        } else if (section.type === "doDont") {
          _push(`<section${ssrRenderAttr("id", sectionId(section, index))} class="pov-section" data-v-bef87032><div class="pov-section-head" data-v-bef87032><div class="pov-section-label" data-v-bef87032>${ssrInterpolate(section.label)}</div><h2 data-v-bef87032>${ssrInterpolate(section.title)}</h2><p class="pov-section-intro" data-v-bef87032>${ssrInterpolate(section.intro)}</p></div><div class="pov-do-dont" data-v-bef87032><!--[-->`);
          ssrRenderList(items(section.cards), (card) => {
            _push(`<article class="pov-card" data-v-bef87032><h3 data-v-bef87032>${ssrInterpolate(card.title)}</h3><ul data-v-bef87032><!--[-->`);
            ssrRenderList(items(card.items), (item) => {
              _push(`<li data-v-bef87032>${ssrInterpolate(item)}</li>`);
            });
            _push(`<!--]--></ul></article>`);
          });
          _push(`<!--]--></div></section>`);
        } else if (section.type === "paths") {
          _push(`<section${ssrRenderAttr("id", sectionId(section, index))} class="pov-section" data-v-bef87032><div class="pov-section-head" data-v-bef87032><div class="pov-section-label" data-v-bef87032>${ssrInterpolate(section.label)}</div><h2 data-v-bef87032>${ssrInterpolate(section.title)}</h2><p class="pov-section-intro" data-v-bef87032>${ssrInterpolate(section.intro)}</p></div><div class="pov-path-grid" data-v-bef87032><!--[-->`);
          ssrRenderList(items(section.paths), (path) => {
            _push(`<article class="pov-path-card" data-v-bef87032><div data-v-bef87032><h3 data-v-bef87032>${ssrInterpolate(path.title)}</h3><p data-v-bef87032>${ssrInterpolate(path.body)}</p></div><a class="pov-pill"${ssrRenderAttr("href", path.to || "#documentation")} data-v-bef87032>${ssrInterpolate(path.label || "Open")}</a></article>`);
          });
          _push(`<!--]--></div></section>`);
        } else if (section.type === "code") {
          _push(`<section${ssrRenderAttr("id", sectionId(section, index))} class="pov-section" data-v-bef87032><div class="pov-section-head" data-v-bef87032><div class="pov-section-label" data-v-bef87032>${ssrInterpolate(section.label)}</div><h2 data-v-bef87032>${ssrInterpolate(section.title)}</h2><p class="pov-section-intro" data-v-bef87032>${ssrInterpolate(section.intro)}</p></div><div class="pov-code-box" data-v-bef87032><div class="pov-code-head" data-v-bef87032><span data-v-bef87032>${ssrInterpolate(section.filename)}</span><span data-v-bef87032>${ssrInterpolate(section.badge)}</span></div><pre data-v-bef87032><code data-v-bef87032>${ssrInterpolate(section.code)}</code></pre></div></section>`);
        } else if (section.type === "cta") {
          _push(`<section class="pov-next-card" data-v-bef87032><h2 data-v-bef87032>${ssrInterpolate(section.title)}</h2><p data-v-bef87032>${ssrInterpolate(section.body)}</p><div class="pov-actions" data-v-bef87032><!--[-->`);
          ssrRenderList(items(section.actions), (action) => {
            _push(`<a class="${ssrRenderClass([{ primary: action.primary }, "pov-pill"])}"${ssrRenderAttr("href", action.to || "#overview")} data-v-bef87032>${ssrInterpolate(action.label)}</a>`);
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></article></main><aside class="pov-rail" aria-label="Project overview table of contents" data-v-bef87032><div class="pov-rail-title" data-v-bef87032>On this page</div><!--[-->`);
      ssrRenderList(unref(rail), (link) => {
        _push(`<a class="pov-rail-link"${ssrRenderAttr("href", link.to || "#overview")} data-v-bef87032>${ssrInterpolate(link.label || link.title)}</a>`);
      });
      _push(`<!--]--><div class="pov-rail-card" data-v-bef87032><strong data-v-bef87032>Project status</strong><p data-v-bef87032>${ssrInterpolate(__props.project.status || "draft")}</p></div><div class="pov-rail-card" data-v-bef87032><strong data-v-bef87032>Overview pattern</strong><p data-v-bef87032>${ssrInterpolate(__props.payload.railNote || "Reusable project summary: memory, boundaries, lenses, index, reading guide, docs paths and limitations.")}</p></div><div class="pov-rail-card" data-v-bef87032><strong data-v-bef87032>Related metadata</strong><div class="pov-meta-mini" data-v-bef87032><div data-v-bef87032><span data-v-bef87032>Status</span><b data-v-bef87032>${ssrInterpolate(__props.project.status || "draft")}</b></div><div data-v-bef87032><span data-v-bef87032>Docs</span><b data-v-bef87032>${ssrInterpolate(__props.docLinks?.length ? `${__props.docLinks.length} attached` : "Not attached")}</b></div><div data-v-bef87032><span data-v-bef87032>Folder</span><b data-v-bef87032>${ssrInterpolate(__props.project.docsFolder || "Not set")}</b></div></div></div></aside></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/projects/ProjectOverviewRenderer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-bef87032"]]), { __name: "ProjectOverviewRenderer" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = computed(() => String(route.params.slug));
    const path = computed(() => `/projects/${route.params.slug}`);
    const { data: project } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`project-${path.value}`, async () => {
      const byPath = await queryCollection("projects").path(path.value).first();
      return byPath ?? await queryCollection("projects").where("slug", "=", slug.value).first();
    })), __temp = await __temp, __restore(), __temp);
    const { data: previewProject } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`project-preview-${slug.value}`, async () => {
      if (route.query.preview !== "true") return null;
      try {
        const response = await $fetch("/api/admin/content/read", {
          method: "POST",
          body: {
            contentType: "projects",
            filePath: `projects/${slug.value}.md`
          }
        });
        return response.item;
      } catch {
        return null;
      }
    })), __temp = await __temp, __restore(), __temp);
    const displayProject = computed(
      () => route.query.preview === "true" ? previewProject.value?.frontmatter ?? project.value : project.value ?? previewProject.value?.frontmatter
    );
    const previewBody = computed(() => previewProject.value?.body ?? "");
    const previewHtml = computed(
      () => previewBody.value.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean).map((block) => {
        if (block.startsWith("# ")) return `<h1>${block.slice(2)}</h1>`;
        if (block.startsWith("## ")) return `<h2>${block.slice(3)}</h2>`;
        return `<p>${block.replace(/\n/g, "<br>")}</p>`;
      }).join("")
    );
    const { data: allDocs } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`project-docs-${slug.value}`, async () => {
      return await queryCollection("docs").all();
    })), __temp = await __temp, __restore(), __temp);
    const docPath = (doc) => doc.path || `/${doc.stem || ""}`.replace(/\/index$/, "");
    const docsFolder = computed(() => {
      const projectValue = displayProject.value;
      if (!projectValue) return "";
      if (projectValue.docsFolder) return String(projectValue.docsFolder);
      if (projectValue.docsPath) return String(projectValue.docsPath).replace(/^\/docs\//, "").split("/")[0];
      return "";
    });
    const explicitDocPaths = computed(() => {
      const projectValue = displayProject.value;
      if (!projectValue) return [];
      return [
        ...Array.isArray(projectValue.relatedDocs) ? projectValue.relatedDocs : [],
        ...Array.isArray(projectValue.docsPaths) ? projectValue.docsPaths : [],
        projectValue.docsPath
      ].map((item) => String(item || "")).filter((item, index, list) => item && item !== "/docs/" && list.indexOf(item) === index);
    });
    const attachedDocs = computed(() => {
      const docs = allDocs.value ?? [];
      const explicit = explicitDocPaths.value;
      const folder = docsFolder.value;
      return docs.filter((doc) => {
        const path2 = docPath(doc);
        if (explicit.includes(path2)) return true;
        if (explicit.includes(path2.replace(/^\/docs\//, ""))) return true;
        if (!explicit.length && folder && path2.startsWith(`/docs/${folder}`)) return true;
        return false;
      }).sort((a, b) => Number(a.order ?? 99) - Number(b.order ?? 99) || docPath(a).localeCompare(docPath(b)));
    });
    const firstDocPath = computed(() => attachedDocs.value[0] ? docPath(attachedDocs.value[0]) : explicitDocPaths.value[0] || "");
    const attachedDocLinks = computed(() => attachedDocs.value.map((doc) => ({
      label: doc.title || docPath(doc),
      title: doc.title || docPath(doc),
      to: docPath(doc)
    })));
    function parseRichOverviewPayload(value) {
      if (!value) return null;
      try {
        const payload = typeof value === "string" ? JSON.parse(value) : value;
        if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;
        const typedPayload = payload;
        return typedPayload.template === "rich-project-overview-v1" ? typedPayload : null;
      } catch {
        return null;
      }
    }
    const richOverviewPayload = computed(() => parseRichOverviewPayload(displayProject.value?.overviewPayload));
    const explicitRelatedArticles = computed(() => {
      const projectValue = displayProject.value;
      if (!projectValue) return [];
      const posts = [
        ...Array.isArray(projectValue.relatedPosts) ? projectValue.relatedPosts : [],
        ...Array.isArray(projectValue.relatedArticles) ? projectValue.relatedArticles : [],
        ...Array.isArray(projectValue.relatedBlogSlugs) ? projectValue.relatedBlogSlugs : []
      ].map((item) => String(item)).filter(Boolean);
      return posts.map((item) => ({
        title: item.replace(/^\/blog\//, "").replace(/-/g, " "),
        to: item.startsWith("/blog/") ? item : `/blog/${item}`
      }));
    });
    const projectDescription = computed(() => displayProject.value?.summary ?? displayProject.value?.description ?? "A living project dossier from the Gribo repository.");
    const projectField = (key, fallback = "") => {
      const value = displayProject.value?.[key];
      return typeof value === "string" && value.trim() ? value.trim() : fallback;
    };
    const stackLine = computed(() => {
      const stack = displayProject.value?.stack;
      if (Array.isArray(stack)) return stack.join(", ");
      return stack || "Not set";
    });
    const projectOverviewTitle = computed(() => projectField("projectOverviewTitle", "Project overview"));
    const projectOverviewBody = computed(() => projectField(
      "projectOverviewBody",
      "This overview is generated from the project record. Attached documentation appears as technical pages around it, using the same reading surface."
    ));
    const projectMemoryIntro = computed(() => projectField(
      "projectMemoryIntro",
      "The overview holds the public state of the project: what it is, what it is becoming, and which technical documents belong to it."
    ));
    const projectMemoryTitle = computed(() => projectField("projectMemoryTitle", displayProject.value?.title ?? "Project memory"));
    const projectMemoryBody = computed(() => projectField("projectMemoryBody", projectField("projectMemory", "")));
    const hasStructuredProjectMemory = computed(() => Boolean(projectMemoryBody.value || projectField("projectMemoryTitle", "")));
    const projectIndexIntro = computed(() => projectField(
      "projectIndexIntro",
      "Signals, fields and decisions that make this project legible as a living dossier."
    ));
    const projectHoldsTitle = computed(() => projectField("projectHoldsTitle", "What this project holds"));
    const projectHoldsBody = computed(() => projectField(
      "projectHoldsBody",
      projectField("projectIndex", displayProject.value?.description ?? displayProject.value?.summary ?? "A repository entry for notes, decisions and technical direction.")
    ));
    const workingStackNote = computed(() => projectField("workingStackNote", stackLine.value));
    const documentationIntro = computed(() => projectField(
      "documentationIntro",
      attachedDocs.value.length ? "Technical pages attached to this project from Gribo Studio." : "No technical documentation is attached to this project yet."
    ));
    const emptyDocumentationTitle = computed(() => projectField("emptyDocumentationTitle", "No documentation attached yet"));
    const emptyDocumentationBody = computed(() => projectField(
      "emptyDocumentationBody",
      "Technical pages can be connected later from Gribo Studio without changing the project overview."
    ));
    const buildLogIntro = computed(() => projectField("buildLogIntro", projectField("buildLogNote", "No explicit build log entries are attached to this project yet.")));
    const decisionTraceTitle = computed(() => projectField("decisionTraceTitle", "Decision trace"));
    const decisionTraceBody = computed(() => projectField(
      "decisionTraceBody",
      "Use explicit project fields or related documents when this project needs a public build log."
    ));
    const relatedArticlesNote = computed(() => projectField("relatedArticlesNote", "No related articles are configured for this project."));
    const projectBlocks = computed(
      () => Array.isArray(displayProject.value?.blocks) ? displayProject.value.blocks.filter((block) => block?.visible !== false) : []
    );
    const metaItems = computed(() => [
      { label: "Status", value: displayProject.value?.status ?? "Draft" },
      { label: "Lab / Track", value: displayProject.value?.lab ?? "Unassigned" },
      { label: "Last update", value: displayProject.value?.updatedAt ?? displayProject.value?.date ?? "Not set" },
      { label: "Type / Year", value: [displayProject.value?.type ?? "Project dossier", displayProject.value?.year].filter(Boolean).join(" / ") }
    ]);
    const rightRailMeta = computed(() => [
      { label: "Status", value: displayProject.value?.status ?? "Draft" },
      { label: "Docs", value: attachedDocs.value.length ? `${attachedDocs.value.length} attached` : "Not attached" },
      { label: "Folder", value: docsFolder.value || "Not set" },
      { label: "Stack", value: stackLine.value }
    ]);
    useGriboSeo(() => ({
      title: displayProject.value?.title,
      description: displayProject.value?.description,
      summary: displayProject.value?.summary,
      seoTitle: displayProject.value?.seoTitle,
      seoDescription: displayProject.value?.seoDescription,
      ogTitle: displayProject.value?.ogTitle,
      ogDescription: displayProject.value?.ogDescription,
      ogImage: displayProject.value?.ogImage,
      canonical: displayProject.value?.canonical,
      noindex: displayProject.value?.noindex
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProjectOverviewRenderer = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_ContentBlockRenderer = __nuxt_component_2;
      const _component_ContentRenderer = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "project-docs-shell" }, _attrs))} data-v-0ce5f9df>`);
      if (unref(displayProject)) {
        _push(`<!--[-->`);
        if (unref(richOverviewPayload)) {
          _push(ssrRenderComponent(_component_ProjectOverviewRenderer, {
            project: unref(displayProject),
            payload: unref(richOverviewPayload),
            "doc-links": unref(attachedDocLinks)
          }, null, _parent));
        } else {
          _push(`<div class="project-docs-layout" data-v-0ce5f9df><aside class="docs-sidebar" aria-label="Project documentation sidebar" data-v-0ce5f9df><div class="side-title" data-v-0ce5f9df>Start</div>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            class: "side-link active",
            to: `/repository/${unref(displayProject).slug}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Overview`);
              } else {
                return [
                  createTextVNode("Overview")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<a class="side-link" href="#project-index" data-v-0ce5f9df>Project index</a><a class="side-link" href="#build-log" data-v-0ce5f9df>Build log</a><div class="side-title" data-v-0ce5f9df>Documentation</div><!--[-->`);
          ssrRenderList(unref(attachedDocs), (doc) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: docPath(doc),
              class: "side-link",
              to: docPath(doc)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(doc.title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(doc.title), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]-->`);
          if (!unref(attachedDocs).length) {
            _push(`<p class="side-note" data-v-0ce5f9df>No documentation attached yet.</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</aside><main class="project-docs-main" data-v-0ce5f9df><nav class="breadcrumb" aria-label="Breadcrumb" data-v-0ce5f9df>`);
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
          _push(`<span data-v-0ce5f9df>/</span><span data-v-0ce5f9df>${ssrInterpolate(unref(displayProject).title)}</span><span data-v-0ce5f9df>/</span><span data-v-0ce5f9df>Overview</span></nav><section class="hero-card" data-v-0ce5f9df><div class="hero-inner" data-v-0ce5f9df><p class="label" data-v-0ce5f9df><span class="pulse" data-v-0ce5f9df></span>Living project repository / ${ssrInterpolate(unref(displayProject).status ?? "draft")}</p><h1 data-v-0ce5f9df>${ssrInterpolate(unref(displayProject).title)}</h1><p class="lede" data-v-0ce5f9df>${ssrInterpolate(unref(projectDescription))}</p><div class="hero-actions" data-v-0ce5f9df><a class="pill-button" href="#project-memory" data-v-0ce5f9df>Start reading</a>`);
          if (unref(firstDocPath)) {
            _push(ssrRenderComponent(_component_NuxtLink, {
              class: "pill-button primary",
              to: unref(firstDocPath)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Read documentation`);
                } else {
                  return [
                    createTextVNode("Read documentation")
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<span class="docs-empty-pill" data-v-0ce5f9df>No documentation attached yet</span>`);
          }
          _push(`</div></div></section><section id="project-state" class="meta-grid" aria-label="Project metadata" data-v-0ce5f9df><!--[-->`);
          ssrRenderList(unref(metaItems), (item) => {
            _push(`<div class="meta-card" data-v-0ce5f9df><span data-v-0ce5f9df>${ssrInterpolate(item.label)}</span><strong data-v-0ce5f9df>${ssrInterpolate(item.value || "Not set")}</strong></div>`);
          });
          _push(`<!--]--></section><section class="callout" data-v-0ce5f9df><div class="callout-icon" data-v-0ce5f9df>i</div><div data-v-0ce5f9df><h3 data-v-0ce5f9df>${ssrInterpolate(unref(projectOverviewTitle))}</h3><p data-v-0ce5f9df>${ssrInterpolate(unref(projectOverviewBody))}</p></div></section><section id="project-memory" class="doc-section" data-v-0ce5f9df><h2 data-v-0ce5f9df>Project memory</h2><p data-v-0ce5f9df>${ssrInterpolate(unref(projectMemoryIntro))}</p><article class="doc-body-card" data-v-0ce5f9df>`);
          if (unref(hasStructuredProjectMemory)) {
            _push(`<div id="content" class="content-prose structured-project-copy" data-v-0ce5f9df>`);
            if (unref(projectMemoryTitle)) {
              _push(`<h3 data-v-0ce5f9df>${ssrInterpolate(unref(projectMemoryTitle))}</h3>`);
            } else {
              _push(`<!---->`);
            }
            if (unref(projectMemoryBody)) {
              _push(`<p data-v-0ce5f9df>${ssrInterpolate(unref(projectMemoryBody))}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else if (unref(projectBlocks).length) {
            _push(ssrRenderComponent(_component_ContentBlockRenderer, {
              id: "content",
              blocks: unref(projectBlocks),
              context: "project"
            }, null, _parent));
          } else if (unref(project)) {
            _push(ssrRenderComponent(_component_ContentRenderer, {
              id: "content",
              class: "content-prose",
              value: unref(project)
            }, null, _parent));
          } else {
            _push(`<div id="content" class="content-prose" data-v-0ce5f9df>${unref(previewHtml) ?? ""}</div>`);
          }
          _push(`</article></section><section id="project-index" class="doc-section" data-v-0ce5f9df><h2 data-v-0ce5f9df>Project index</h2><p data-v-0ce5f9df>${ssrInterpolate(unref(projectIndexIntro))}</p><div class="cards-2" data-v-0ce5f9df><article class="info-card" data-v-0ce5f9df><h3 data-v-0ce5f9df>${ssrInterpolate(unref(projectHoldsTitle))}</h3><p data-v-0ce5f9df>${ssrInterpolate(unref(projectHoldsBody))}</p></article><article class="info-card" data-v-0ce5f9df><h3 data-v-0ce5f9df>Working stack</h3><p data-v-0ce5f9df>${ssrInterpolate(unref(workingStackNote))}</p></article></div></section><section id="documentation" class="doc-section" data-v-0ce5f9df><h2 data-v-0ce5f9df>Documentation</h2><p data-v-0ce5f9df>${ssrInterpolate(unref(documentationIntro))}</p>`);
          if (unref(attachedDocs).length) {
            _push(`<div class="cards-2" data-v-0ce5f9df><!--[-->`);
            ssrRenderList(unref(attachedDocs), (doc) => {
              _push(ssrRenderComponent(_component_NuxtLink, {
                key: docPath(doc),
                class: "info-card linked-card",
                to: docPath(doc)
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<h3 data-v-0ce5f9df${_scopeId}>${ssrInterpolate(doc.title)}</h3><p data-v-0ce5f9df${_scopeId}>${ssrInterpolate(doc.description ?? docPath(doc))}</p><small data-v-0ce5f9df${_scopeId}>${ssrInterpolate(docPath(doc))}</small>`);
                  } else {
                    return [
                      createVNode("h3", null, toDisplayString(doc.title), 1),
                      createVNode("p", null, toDisplayString(doc.description ?? docPath(doc)), 1),
                      createVNode("small", null, toDisplayString(docPath(doc)), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<div class="info-card empty-docs" data-v-0ce5f9df><h3 data-v-0ce5f9df>${ssrInterpolate(unref(emptyDocumentationTitle))}</h3><p data-v-0ce5f9df>${ssrInterpolate(unref(emptyDocumentationBody))}</p></div>`);
          }
          _push(`</section><section id="build-log" class="doc-section" data-v-0ce5f9df><h2 data-v-0ce5f9df>Build log</h2><p data-v-0ce5f9df>${ssrInterpolate(unref(buildLogIntro))}</p><div class="cards-2" data-v-0ce5f9df><article class="info-card" data-v-0ce5f9df><h3 data-v-0ce5f9df>${ssrInterpolate(unref(decisionTraceTitle))}</h3><p data-v-0ce5f9df>${ssrInterpolate(unref(decisionTraceBody))}</p></article><article class="info-card" data-v-0ce5f9df><h3 data-v-0ce5f9df>Related articles</h3>`);
          if (!unref(explicitRelatedArticles).length) {
            _push(`<p data-v-0ce5f9df>${ssrInterpolate(unref(relatedArticlesNote))}</p>`);
          } else {
            _push(`<!--[-->`);
            ssrRenderList(unref(explicitRelatedArticles), (article) => {
              _push(ssrRenderComponent(_component_NuxtLink, {
                key: article.to,
                to: article.to
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(article.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(article.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            });
            _push(`<!--]-->`);
          }
          _push(`</article></div></section><nav id="next" class="next-prev" aria-label="Project navigation" data-v-0ce5f9df>`);
          _push(ssrRenderComponent(_component_NuxtLink, { to: "/repository" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span data-v-0ce5f9df${_scopeId}>Repository</span><strong data-v-0ce5f9df${_scopeId}>Back to projects</strong>`);
              } else {
                return [
                  createVNode("span", null, "Repository"),
                  createVNode("strong", null, "Back to projects")
                ];
              }
            }),
            _: 1
          }, _parent));
          if (unref(firstDocPath)) {
            _push(ssrRenderComponent(_component_NuxtLink, { to: unref(firstDocPath) }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span data-v-0ce5f9df${_scopeId}>Documentation</span><strong data-v-0ce5f9df${_scopeId}>Read first attached page</strong>`);
                } else {
                  return [
                    createVNode("span", null, "Documentation"),
                    createVNode("strong", null, "Read first attached page")
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<div data-v-0ce5f9df><span data-v-0ce5f9df>Documentation</span><strong data-v-0ce5f9df>No attached docs yet</strong></div>`);
          }
          _push(`</nav></main><aside class="toc" aria-label="Project overview table of contents" data-v-0ce5f9df><h3 data-v-0ce5f9df>On this page</h3><a href="#project-state" data-v-0ce5f9df>Project state</a><a href="#project-memory" data-v-0ce5f9df>Project memory</a><a href="#project-index" data-v-0ce5f9df>Project index</a><a href="#documentation" data-v-0ce5f9df>Documentation</a><a href="#build-log" data-v-0ce5f9df>Build log</a><a href="#next" data-v-0ce5f9df>Next</a><div class="mini-card" data-v-0ce5f9df><strong data-v-0ce5f9df>Project status</strong><p data-v-0ce5f9df>${ssrInterpolate(unref(displayProject).status ?? "Draft")}</p></div><div class="mini-card" data-v-0ce5f9df><strong data-v-0ce5f9df>Docs pattern</strong><p data-v-0ce5f9df>Overview comes from the project. Attached pages come from docs.</p></div><div class="mini-card" data-v-0ce5f9df><strong data-v-0ce5f9df>Related metadata</strong><dl data-v-0ce5f9df><!--[-->`);
          ssrRenderList(unref(rightRailMeta), (item) => {
            _push(`<div data-v-0ce5f9df><dt data-v-0ce5f9df>${ssrInterpolate(item.label)}</dt><dd data-v-0ce5f9df>${ssrInterpolate(item.value)}</dd></div>`);
          });
          _push(`<!--]--></dl></div></aside></div>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<main class="project-docs-main missing-wrapper" data-v-0ce5f9df><section class="hero-card missing-card" data-v-0ce5f9df><p class="label" data-v-0ce5f9df><span class="pulse" data-v-0ce5f9df></span>Repository</p><h1 data-v-0ce5f9df>Project placeholder</h1><p class="lede" data-v-0ce5f9df>This repository route is ready for a Nuxt Content project entry.</p></section></main>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/repository/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0ce5f9df"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-_kBinmAo.mjs.map
