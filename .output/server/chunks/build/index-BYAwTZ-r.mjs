import { _ as __nuxt_component_0 } from './AdminHero-lJqa4kRI.mjs';
import { _ as __nuxt_component_2 } from './AdminPanel-CPS4BSK_.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BzjT64JD.mjs';
import { _ as __nuxt_component_4 } from './AdminInspector-CoNamQdx.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
    const { data, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-labs-list", () => listContent("labs"))), __temp = await __temp, __restore(), __temp);
    const labs = computed(() => data.value?.items ?? []);
    const editLink = (filePath) => `/admin/content/edit?type=labs&file=${encodeURIComponent(filePath)}`;
    const previewLink = (lab) => lab.status === "published" ? lab.publicPath : `${lab.publicPath}?preview=true`;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminHero = __nuxt_component_0;
      const _component_AdminPanel = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AdminInspector = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-c3af09d1>`);
      _push(ssrRenderComponent(_component_AdminHero, {
        eyebrow: "Labs",
        title: "Editorial research lines.",
        description: "Edit the living areas that group Gribo essays, projects, documentation, and open questions."
      }, null, _parent));
      _push(`<section class="labs-layout" data-v-c3af09d1>`);
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Research lines",
        eyebrow: "content/labs"
      }, {
        action: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              class: "studio-btn",
              to: "/admin/content/new?type=labs&direct=true"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`New Lab`);
                } else {
                  return [
                    createTextVNode("New Lab")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                class: "studio-btn",
                to: "/admin/content/new?type=labs&direct=true"
              }, {
                default: withCtx(() => [
                  createTextVNode("New Lab")
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ghost-btn" type="button" data-v-c3af09d1${_scopeId}>Refresh list</button>`);
            if (unref(pending)) {
              _push2(`<p class="muted" data-v-c3af09d1${_scopeId}>Reading content/labs...</p>`);
            } else {
              _push2(`<div class="labs-grid" data-v-c3af09d1${_scopeId}><!--[-->`);
              ssrRenderList(unref(labs), (lab) => {
                _push2(`<article class="lab-row" data-v-c3af09d1${_scopeId}><div data-v-c3af09d1${_scopeId}><p class="eyebrow" data-v-c3af09d1${_scopeId}>${ssrInterpolate(lab.slug)} / ${ssrInterpolate(lab.status)}</p><h3 data-v-c3af09d1${_scopeId}>${ssrInterpolate(lab.title)}</h3><p data-v-c3af09d1${_scopeId}>${ssrInterpolate(lab.description)}</p><div class="tag-list" data-v-c3af09d1${_scopeId}><!--[-->`);
                ssrRenderList(lab.tags, (tag) => {
                  _push2(`<span class="tag" data-v-c3af09d1${_scopeId}>${ssrInterpolate(tag)}</span>`);
                });
                _push2(`<!--]--></div></div><div class="row-actions" data-v-c3af09d1${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  class: "mini-link",
                  to: previewLink(lab)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(lab.status === "published" ? "View" : "Preview")}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(lab.status === "published" ? "View" : "Preview"), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  class: "mini-link",
                  to: editLink(lab.filePath)
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
              }, "Reading content/labs...")) : (openBlock(), createBlock("div", {
                key: 1,
                class: "labs-grid"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(labs), (lab) => {
                  return openBlock(), createBlock("article", {
                    key: lab.filePath,
                    class: "lab-row"
                  }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "eyebrow" }, toDisplayString(lab.slug) + " / " + toDisplayString(lab.status), 1),
                      createVNode("h3", null, toDisplayString(lab.title), 1),
                      createVNode("p", null, toDisplayString(lab.description), 1),
                      createVNode("div", { class: "tag-list" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(lab.tags, (tag) => {
                          return openBlock(), createBlock("span", {
                            key: tag,
                            class: "tag"
                          }, toDisplayString(tag), 1);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", { class: "row-actions" }, [
                      createVNode(_component_NuxtLink, {
                        class: "mini-link",
                        to: previewLink(lab)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(lab.status === "published" ? "View" : "Preview"), 1)
                        ]),
                        _: 2
                      }, 1032, ["to"]),
                      createVNode(_component_NuxtLink, {
                        class: "mini-link",
                        to: editLink(lab.filePath)
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
      _push(ssrRenderComponent(_component_AdminInspector, {
        title: "Lab fields",
        items: [
          { label: "Description", value: "Editable" },
          { label: "Related tags", value: "Editable" },
          { label: "Roadmap", value: "Editable" },
          { label: "Open questions", value: "Editable" }
        ]
      }, null, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/labs/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c3af09d1"]]);

export { index as default };
//# sourceMappingURL=index-BYAwTZ-r.mjs.map
