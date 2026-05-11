import { _ as __nuxt_component_0 } from './AdminHero-lJqa4kRI.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_2 } from './AdminPanel-CPS4BSK_.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BzjT64JD.mjs';
import { _ as __nuxt_component_4 } from './AdminInspector-CoNamQdx.mjs';
import { _ as __nuxt_component_5 } from './AdminPreviewPanel-C15Jt5ST.mjs';
import { u as useAdminContent } from './useAdminContent-DePtxANz.mjs';
import { u as useAsyncData } from './asyncData-BKyabxD9.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdminTabs",
  __ssrInlineRender: true,
  props: {
    tabs: {},
    active: {},
    disabledTabs: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "admin-tabs",
        role: "tablist",
        "aria-label": "Mock editor tabs"
      }, _attrs))} data-v-6c1fa281><!--[-->`);
      ssrRenderList(__props.tabs, (tab) => {
        _push(`<button type="button"${ssrIncludeBooleanAttr(__props.disabledTabs?.includes(tab)) ? " disabled" : ""} class="${ssrRenderClass({ active: tab === (__props.active ?? __props.tabs[0]), disabled: __props.disabledTabs?.includes(tab) })}" data-v-6c1fa281>${ssrInterpolate(tab)}`);
        if (__props.disabledTabs?.includes(tab)) {
          _push(`<span data-v-6c1fa281>Later</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminTabs.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-6c1fa281"]]), { __name: "AdminTabs" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const tabs = ["Content", "Metadata", "SEO", "Media", "Preview"];
    const { listContent } = useAdminContent();
    const { data, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-projects-list", () => listContent("projects"))), __temp = await __temp, __restore(), __temp);
    const projects = computed(() => data.value?.items ?? []);
    const editLink = (filePath) => `/admin/content/edit?type=projects&file=${encodeURIComponent(filePath)}`;
    const previewLink = (project) => project.status === "published" ? project.publicPath : `${project.publicPath}?preview=true`;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminHero = __nuxt_component_0;
      const _component_AdminTabs = __nuxt_component_1;
      const _component_AdminPanel = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AdminInspector = __nuxt_component_4;
      const _component_AdminPreviewPanel = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-18f87371><div class="page-head" data-v-18f87371>`);
      _push(ssrRenderComponent(_component_AdminHero, {
        eyebrow: "Repository Projects",
        title: "Create a living project repository.",
        description: "Functional minimum for editing project metadata, body markdown, SEO fields, and documentation links."
      }, null, _parent));
      _push(ssrRenderComponent(_component_AdminTabs, {
        tabs,
        active: "Content",
        "disabled-tabs": ["Media", "Preview"]
      }, null, _parent));
      _push(`</div><section class="editor-shell" data-v-18f87371><div class="form-stack" data-v-18f87371>`);
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Project files",
        eyebrow: "content/projects"
      }, {
        action: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              class: "studio-btn",
              to: "/admin/content/new?type=projects"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`New Project`);
                } else {
                  return [
                    createTextVNode("New Project")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                class: "studio-btn",
                to: "/admin/content/new?type=projects"
              }, {
                default: withCtx(() => [
                  createTextVNode("New Project")
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ghost-btn" type="button" data-v-18f87371${_scopeId}>Refresh list</button>`);
            if (unref(pending)) {
              _push2(`<p class="muted" data-v-18f87371${_scopeId}>Reading content/projects...</p>`);
            } else {
              _push2(`<div class="content-list" data-v-18f87371${_scopeId}><!--[-->`);
              ssrRenderList(unref(projects), (project) => {
                _push2(`<article class="content-row" data-v-18f87371${_scopeId}><div data-v-18f87371${_scopeId}><p class="eyebrow" data-v-18f87371${_scopeId}>${ssrInterpolate(project.lab || "unassigned")} / ${ssrInterpolate(project.status)}</p><h3 data-v-18f87371${_scopeId}>${ssrInterpolate(project.title)}</h3><p data-v-18f87371${_scopeId}>${ssrInterpolate(project.description || project.filePath)}</p></div><div class="row-actions" data-v-18f87371${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  class: "mini-link",
                  to: previewLink(project)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(project.status === "published" ? "View" : "Preview")}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(project.status === "published" ? "View" : "Preview"), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  class: "mini-link",
                  to: editLink(project.filePath)
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
              unref(pending) ? (openBlock(), createBlock("p", {
                key: 0,
                class: "muted"
              }, "Reading content/projects...")) : (openBlock(), createBlock("div", {
                key: 1,
                class: "content-list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(projects), (project) => {
                  return openBlock(), createBlock("article", {
                    key: project.filePath,
                    class: "content-row"
                  }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "eyebrow" }, toDisplayString(project.lab || "unassigned") + " / " + toDisplayString(project.status), 1),
                      createVNode("h3", null, toDisplayString(project.title), 1),
                      createVNode("p", null, toDisplayString(project.description || project.filePath), 1)
                    ]),
                    createVNode("div", { class: "row-actions" }, [
                      createVNode(_component_NuxtLink, {
                        class: "mini-link",
                        to: previewLink(project)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(project.status === "published" ? "View" : "Preview"), 1)
                        ]),
                        _: 2
                      }, 1032, ["to"]),
                      createVNode(_component_NuxtLink, {
                        class: "mini-link",
                        to: editLink(project.filePath)
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
      _push(`</div><aside class="metadata-panel" data-v-18f87371>`);
      _push(ssrRenderComponent(_component_AdminInspector, {
        title: "Project editor",
        items: [
          { label: "Collection", value: "content/projects" },
          { label: "Items", value: String(unref(projects).length) },
          { label: "Docs bridge", value: "docsPath field" },
          { label: "Delete", value: "Soft archive only" }
        ]
      }, null, _parent));
      _push(ssrRenderComponent(_component_AdminPreviewPanel, null, null, _parent));
      _push(`</aside></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/projects/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-18f87371"]]);

export { index as default };
//# sourceMappingURL=index-Ddx4RhwA.mjs.map
