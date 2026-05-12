import { _ as __nuxt_component_0 } from './AdminHero-lJqa4kRI.mjs';
import { _ as __nuxt_component_2 } from './AdminPanel-CPS4BSK_.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BzjT64JD.mjs';
import { defineComponent, withAsyncContext, computed, ref, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, withDirectives, isRef, openBlock, createBlock, Fragment, renderList, vModelSelect, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useAdminContent } from './useAdminContent-EIopHvuo.mjs';
import { u as useAsyncData } from './asyncData-BKyabxD9.mjs';
import { _ as _export_sfc } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { listContent } = useAdminContent();
    const { data, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-docs-list", () => listContent("docs"))), __temp = await __temp, __restore(), __temp);
    const { data: projectsData } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-docs-projects-list", () => listContent("projects"))), __temp = await __temp, __restore(), __temp);
    const docs = computed(() => data.value?.items ?? []);
    const projects = computed(() => projectsData.value?.items ?? []);
    const selectedFolder = ref("all");
    const getDocFolder = (doc) => doc.docsFolder || doc.filePath.replace(/^docs\//, "").split("/")[0] || "not set";
    const folderOptions = computed(() => Array.from(new Set(docs.value.map(getDocFolder))).sort());
    const projectOwner = (doc) => {
      if (doc.projectSlug) return projects.value.find((project) => project.slug === doc.projectSlug) || { title: doc.project || doc.projectSlug, slug: doc.projectSlug };
      if (doc.project) return projects.value.find((project) => project.title === doc.project || project.slug === doc.project) || { title: doc.project, slug: doc.project };
      return projects.value.find((project) => {
        const explicit = [
          project.docsPath,
          ...project.docsPaths ?? [],
          ...project.relatedDocs ?? []
        ].map((item) => String(item)).filter(Boolean);
        return explicit.includes(doc.publicPath) || explicit.includes(doc.publicPath.replace(/^\/docs\//, ""));
      });
    };
    const availabilityLabel = (doc) => {
      if (doc.status === "archived") return "Archived";
      const owner = projectOwner(doc);
      if (owner) return `Attached to ${owner.title}`;
      return doc.status === "draft" ? "Available draft" : "Available";
    };
    const filteredDocs = computed(
      () => selectedFolder.value === "all" ? docs.value : docs.value.filter((doc) => getDocFolder(doc) === selectedFolder.value)
    );
    const editLink = (filePath) => `/admin/content/edit?type=docs&file=${encodeURIComponent(filePath)}`;
    const previewLink = (doc) => doc.status === "published" ? doc.publicPath : `${doc.publicPath}?preview=true`;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminHero = __nuxt_component_0;
      const _component_AdminPanel = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-17900396>`);
      _push(ssrRenderComponent(_component_AdminHero, {
        eyebrow: "Documentation Manager",
        title: "Technical pages as product interface.",
        description: "Functional minimum for editing docs markdown connected to project dossiers."
      }, null, _parent));
      _push(`<section class="docs-layout" data-v-17900396>`);
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Docs tree",
        eyebrow: "content/docs"
      }, {
        action: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              class: "studio-btn",
              to: "/admin/content/new?type=docs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`New Docs Page`);
                } else {
                  return [
                    createTextVNode("New Docs Page")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                class: "studio-btn",
                to: "/admin/content/new?type=docs"
              }, {
                default: withCtx(() => [
                  createTextVNode("New Docs Page")
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ghost-btn" type="button" data-v-17900396${_scopeId}>Refresh list</button><label class="folder-filter" data-v-17900396${_scopeId}> Filter by folder <select data-v-17900396${_scopeId}><option value="all" data-v-17900396${ssrIncludeBooleanAttr(Array.isArray(unref(selectedFolder)) ? ssrLooseContain(unref(selectedFolder), "all") : ssrLooseEqual(unref(selectedFolder), "all")) ? " selected" : ""}${_scopeId}>All folders</option><!--[-->`);
            ssrRenderList(unref(folderOptions), (folder) => {
              _push2(`<option${ssrRenderAttr("value", folder)} data-v-17900396${ssrIncludeBooleanAttr(Array.isArray(unref(selectedFolder)) ? ssrLooseContain(unref(selectedFolder), folder) : ssrLooseEqual(unref(selectedFolder), folder)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(folder)}</option>`);
            });
            _push2(`<!--]--></select></label>`);
            if (unref(pending)) {
              _push2(`<p class="muted" data-v-17900396${_scopeId}>Reading content/docs...</p>`);
            } else {
              _push2(`<div class="doc-tree" data-v-17900396${_scopeId}><!--[-->`);
              ssrRenderList(unref(filteredDocs), (doc) => {
                _push2(`<article class="tree-item" data-v-17900396${_scopeId}><span class="tree-icon" data-v-17900396${_scopeId}>D</span><div data-v-17900396${_scopeId}><strong data-v-17900396${_scopeId}>${ssrInterpolate(doc.title)}</strong><p data-v-17900396${_scopeId}>${ssrInterpolate(doc.publicPath)}</p><div class="doc-meta-line" data-v-17900396${_scopeId}><span data-v-17900396${_scopeId}>Folder: ${ssrInterpolate(getDocFolder(doc))}</span><span data-v-17900396${_scopeId}>${ssrInterpolate(availabilityLabel(doc))}</span><span data-v-17900396${_scopeId}>Editorial: ${ssrInterpolate(doc.status || "draft")}</span></div></div><div class="row-actions" data-v-17900396${_scopeId}><span class="status-badge" data-v-17900396${_scopeId}>${ssrInterpolate(doc.projectSlug || doc.project || "available")}</span>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  class: "mini-link",
                  to: previewLink(doc)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(doc.status === "published" ? "View" : "Preview")}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(doc.status === "published" ? "View" : "Preview"), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  class: "mini-link",
                  to: editLink(doc.filePath)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Edit`);
                    } else {
                      return [
                        createTextVNode("Edit")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></article>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              createVNode("button", {
                class: "ghost-btn",
                type: "button",
                onClick: unref(refresh)
              }, "Refresh list", 8, ["onClick"]),
              createVNode("label", { class: "folder-filter" }, [
                createTextVNode(" Filter by folder "),
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": ($event) => isRef(selectedFolder) ? selectedFolder.value = $event : null
                }, [
                  createVNode("option", { value: "all" }, "All folders"),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(folderOptions), (folder) => {
                    return openBlock(), createBlock("option", {
                      key: folder,
                      value: folder
                    }, toDisplayString(folder), 9, ["value"]);
                  }), 128))
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, unref(selectedFolder)]
                ])
              ]),
              unref(pending) ? (openBlock(), createBlock("p", {
                key: 0,
                class: "muted"
              }, "Reading content/docs...")) : (openBlock(), createBlock("div", {
                key: 1,
                class: "doc-tree"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredDocs), (doc) => {
                  return openBlock(), createBlock("article", {
                    key: doc.filePath,
                    class: "tree-item"
                  }, [
                    createVNode("span", { class: "tree-icon" }, "D"),
                    createVNode("div", null, [
                      createVNode("strong", null, toDisplayString(doc.title), 1),
                      createVNode("p", null, toDisplayString(doc.publicPath), 1),
                      createVNode("div", { class: "doc-meta-line" }, [
                        createVNode("span", null, "Folder: " + toDisplayString(getDocFolder(doc)), 1),
                        createVNode("span", null, toDisplayString(availabilityLabel(doc)), 1),
                        createVNode("span", null, "Editorial: " + toDisplayString(doc.status || "draft"), 1)
                      ])
                    ]),
                    createVNode("div", { class: "row-actions" }, [
                      createVNode("span", { class: "status-badge" }, toDisplayString(doc.projectSlug || doc.project || "available"), 1),
                      createVNode(_component_NuxtLink, {
                        class: "mini-link",
                        to: previewLink(doc)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(doc.status === "published" ? "View" : "Preview"), 1)
                        ]),
                        _: 2
                      }, 1032, ["to"]),
                      createVNode(_component_NuxtLink, {
                        class: "mini-link",
                        to: editLink(doc.filePath)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Edit")
                        ]),
                        _: 1
                      }, 8, ["to"])
                    ])
                  ]);
                }), 128))
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Editor scope",
        eyebrow: "Markdown"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="markdown-editor" data-v-17900396${_scopeId}><h3 data-v-17900396${_scopeId}>Docs editing is file-based.</h3><p data-v-17900396${_scopeId}>Select any docs page to edit frontmatter, project metadata, SEO fields, and markdown body.</p><p data-v-17900396${_scopeId}>Hierarchy management stays simple in Stage 4: new pages can be created inside a docs folder, but no drag tree or route designer exists yet.</p></div>`);
          } else {
            return [
              createVNode("div", { class: "markdown-editor" }, [
                createVNode("h3", null, "Docs editing is file-based."),
                createVNode("p", null, "Select any docs page to edit frontmatter, project metadata, SEO fields, and markdown body."),
                createVNode("p", null, "Hierarchy management stays simple in Stage 4: new pages can be created inside a docs folder, but no drag tree or route designer exists yet.")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Docs preview",
        eyebrow: "Frontend"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<article class="docs-preview" data-v-17900396${_scopeId}><p class="eyebrow" data-v-17900396${_scopeId}>Project documentation</p><h2 data-v-17900396${_scopeId}>Repository-linked technical memory</h2><p data-v-17900396${_scopeId}>Docs stay public, but they remain project documentation rather than a top-level public nav surface.</p></article>`);
          } else {
            return [
              createVNode("article", { class: "docs-preview" }, [
                createVNode("p", { class: "eyebrow" }, "Project documentation"),
                createVNode("h2", null, "Repository-linked technical memory"),
                createVNode("p", null, "Docs stay public, but they remain project documentation rather than a top-level public nav surface.")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/docs/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-17900396"]]);

export { index as default };
//# sourceMappingURL=index-C6N-Kzkx.mjs.map
