import { _ as __nuxt_component_0 } from './nuxt-link-BzjT64JD.mjs';
import { _ as __nuxt_component_2 } from './ContentBlockRenderer-BPhryi_i.mjs';
import { _ as __nuxt_component_3 } from './ContentRenderer-DNDxFx7I.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
    const displayProject = computed(() => project.value ?? previewProject.value?.frontmatter);
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
    const projectBlocks = computed(
      () => Array.isArray(displayProject.value?.blocks) ? displayProject.value.blocks.filter((block) => block?.visible !== false) : []
    );
    const stackLine = computed(() => {
      const stack = displayProject.value?.stack;
      if (Array.isArray(stack)) return stack.join(", ");
      return stack || "Not set";
    });
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
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ContentBlockRenderer = __nuxt_component_2;
      const _component_ContentRenderer = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "project-docs-shell" }, _attrs))} data-v-fe53837d>`);
      if (unref(displayProject)) {
        _push(`<div class="project-docs-layout" data-v-fe53837d><aside class="docs-sidebar" aria-label="Project documentation sidebar" data-v-fe53837d><div class="side-title" data-v-fe53837d>Start</div>`);
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
        _push(`<a class="side-link" href="#project-index" data-v-fe53837d>Project index</a><a class="side-link" href="#build-log" data-v-fe53837d>Build log</a><div class="side-title" data-v-fe53837d>Documentation</div><!--[-->`);
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
          _push(`<p class="side-note" data-v-fe53837d>No documentation attached yet.</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</aside><main class="project-docs-main" data-v-fe53837d><nav class="breadcrumb" aria-label="Breadcrumb" data-v-fe53837d>`);
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
        _push(`<span data-v-fe53837d>/</span><span data-v-fe53837d>${ssrInterpolate(unref(displayProject).title)}</span><span data-v-fe53837d>/</span><span data-v-fe53837d>Overview</span></nav><section class="hero-card" data-v-fe53837d><div class="hero-inner" data-v-fe53837d><p class="label" data-v-fe53837d><span class="pulse" data-v-fe53837d></span>Living project repository / ${ssrInterpolate(unref(displayProject).status ?? "draft")}</p><h1 data-v-fe53837d>${ssrInterpolate(unref(displayProject).title)}</h1><p class="lede" data-v-fe53837d>${ssrInterpolate(unref(projectDescription))}</p><div class="hero-actions" data-v-fe53837d><a class="pill-button" href="#project-memory" data-v-fe53837d>Start reading</a>`);
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
          _push(`<span class="docs-empty-pill" data-v-fe53837d>No documentation attached yet</span>`);
        }
        _push(`</div></div></section><section id="project-state" class="meta-grid" aria-label="Project metadata" data-v-fe53837d><!--[-->`);
        ssrRenderList(unref(metaItems), (item) => {
          _push(`<div class="meta-card" data-v-fe53837d><span data-v-fe53837d>${ssrInterpolate(item.label)}</span><strong data-v-fe53837d>${ssrInterpolate(item.value || "Not set")}</strong></div>`);
        });
        _push(`<!--]--></section><section class="callout" data-v-fe53837d><div class="callout-icon" data-v-fe53837d>i</div><div data-v-fe53837d><h3 data-v-fe53837d>Project overview</h3><p data-v-fe53837d> This overview is generated from the project record. Attached documentation appears as technical pages around it, using the same reading surface. </p></div></section><section id="project-memory" class="doc-section" data-v-fe53837d><h2 data-v-fe53837d>Project memory</h2><p data-v-fe53837d> The overview holds the public state of the project: what it is, what it is becoming, and which technical documents belong to it. </p><article class="doc-body-card" data-v-fe53837d>`);
        if (unref(projectBlocks).length) {
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
          _push(`<div id="content" class="content-prose" data-v-fe53837d>${unref(previewHtml) ?? ""}</div>`);
        }
        _push(`</article></section><section id="project-index" class="doc-section" data-v-fe53837d><h2 data-v-fe53837d>Project index</h2><p data-v-fe53837d>Signals, fields and decisions that make this project legible as a living dossier.</p><div class="cards-2" data-v-fe53837d><article class="info-card" data-v-fe53837d><h3 data-v-fe53837d>What this project holds</h3><p data-v-fe53837d>${ssrInterpolate(unref(displayProject).description ?? unref(displayProject).summary ?? "A repository entry for notes, decisions and technical direction.")}</p></article><article class="info-card" data-v-fe53837d><h3 data-v-fe53837d>Working stack</h3><p data-v-fe53837d>${ssrInterpolate(unref(stackLine))}</p></article></div></section><section id="documentation" class="doc-section" data-v-fe53837d><h2 data-v-fe53837d>Documentation</h2>`);
        if (unref(attachedDocs).length) {
          _push(`<p data-v-fe53837d>Technical pages attached to this project from Gribo Studio.</p>`);
        } else {
          _push(`<p data-v-fe53837d>No technical documentation is attached to this project yet.</p>`);
        }
        if (unref(attachedDocs).length) {
          _push(`<div class="cards-2" data-v-fe53837d><!--[-->`);
          ssrRenderList(unref(attachedDocs), (doc) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: docPath(doc),
              class: "info-card linked-card",
              to: docPath(doc)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<h3 data-v-fe53837d${_scopeId}>${ssrInterpolate(doc.title)}</h3><p data-v-fe53837d${_scopeId}>${ssrInterpolate(doc.description ?? docPath(doc))}</p><small data-v-fe53837d${_scopeId}>${ssrInterpolate(docPath(doc))}</small>`);
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
          _push(`<div class="info-card empty-docs" data-v-fe53837d><h3 data-v-fe53837d>No documentation attached yet</h3><p data-v-fe53837d>Technical pages can be connected later from Gribo Studio without changing the project overview.</p></div>`);
        }
        _push(`</section><section id="build-log" class="doc-section" data-v-fe53837d><h2 data-v-fe53837d>Build log</h2><p data-v-fe53837d>No explicit build log entries are attached to this project yet.</p><div class="cards-2" data-v-fe53837d><article class="info-card" data-v-fe53837d><h3 data-v-fe53837d>Decision trace</h3><p data-v-fe53837d>Use explicit project fields or related documents when this project needs a public build log.</p></article><article class="info-card" data-v-fe53837d><h3 data-v-fe53837d>Related articles</h3>`);
        if (!unref(explicitRelatedArticles).length) {
          _push(`<p data-v-fe53837d>No related articles are configured for this project.</p>`);
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
        _push(`</article></div></section><nav id="next" class="next-prev" aria-label="Project navigation" data-v-fe53837d>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/repository" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span data-v-fe53837d${_scopeId}>Repository</span><strong data-v-fe53837d${_scopeId}>Back to projects</strong>`);
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
                _push2(`<span data-v-fe53837d${_scopeId}>Documentation</span><strong data-v-fe53837d${_scopeId}>Read first attached page</strong>`);
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
          _push(`<div data-v-fe53837d><span data-v-fe53837d>Documentation</span><strong data-v-fe53837d>No attached docs yet</strong></div>`);
        }
        _push(`</nav></main><aside class="toc" aria-label="Project overview table of contents" data-v-fe53837d><h3 data-v-fe53837d>On this page</h3><a href="#project-state" data-v-fe53837d>Project state</a><a href="#project-memory" data-v-fe53837d>Project memory</a><a href="#project-index" data-v-fe53837d>Project index</a><a href="#documentation" data-v-fe53837d>Documentation</a><a href="#build-log" data-v-fe53837d>Build log</a><a href="#next" data-v-fe53837d>Next</a><div class="mini-card" data-v-fe53837d><strong data-v-fe53837d>Project status</strong><p data-v-fe53837d>${ssrInterpolate(unref(displayProject).status ?? "Draft")}</p></div><div class="mini-card" data-v-fe53837d><strong data-v-fe53837d>Docs pattern</strong><p data-v-fe53837d>Overview comes from the project. Attached pages come from docs.</p></div><div class="mini-card" data-v-fe53837d><strong data-v-fe53837d>Related metadata</strong><dl data-v-fe53837d><!--[-->`);
        ssrRenderList(unref(rightRailMeta), (item) => {
          _push(`<div data-v-fe53837d><dt data-v-fe53837d>${ssrInterpolate(item.label)}</dt><dd data-v-fe53837d>${ssrInterpolate(item.value)}</dd></div>`);
        });
        _push(`<!--]--></dl></div></aside></div>`);
      } else {
        _push(`<main class="project-docs-main missing-wrapper" data-v-fe53837d><section class="hero-card missing-card" data-v-fe53837d><p class="label" data-v-fe53837d><span class="pulse" data-v-fe53837d></span>Repository</p><h1 data-v-fe53837d>Project placeholder</h1><p class="lede" data-v-fe53837d>This repository route is ready for a Nuxt Content project entry.</p></section></main>`);
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
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fe53837d"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-CJHjx-3A.mjs.map
