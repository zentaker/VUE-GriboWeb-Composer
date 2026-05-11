import { _ as __nuxt_component_0 } from './AdminHero-lJqa4kRI.mjs';
import { _ as __nuxt_component_2 } from './AdminPanel-CPS4BSK_.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BzjT64JD.mjs';
import { _ as __nuxt_component_4 } from './AdminInspector-CoNamQdx.mjs';
import { defineComponent, withAsyncContext, computed, ref, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { u as useAdminContent } from './useAdminContent-DePtxANz.mjs';
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
    const { data, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-blog-list", () => listContent("blog"))), __temp = await __temp, __restore(), __temp);
    const rows = computed(() => data.value?.items ?? []);
    const statusFilter = ref("All");
    const statusFilters = ["All", "Draft", "Review", "Published", "Archived"];
    const filteredRows = computed(() => {
      if (statusFilter.value === "All") return rows.value;
      return rows.value.filter((post) => String(post.status || "draft").toLowerCase() === statusFilter.value.toLowerCase());
    });
    const editLink = (filePath) => `/admin/content/edit?type=blog&file=${encodeURIComponent(filePath)}`;
    const previewLink = (post) => post.status === "published" ? post.publicPath : `${post.publicPath}?preview=true`;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminHero = __nuxt_component_0;
      const _component_AdminPanel = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AdminInspector = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-10ce2a74>`);
      _push(ssrRenderComponent(_component_AdminHero, {
        eyebrow: "Blog Entries",
        title: "Magazine drafts and published essays.",
        description: "Editorial surface for reading, editing, and creating Gribo article files inside content/blog."
      }, null, _parent));
      _push(`<section class="blog-layout" data-v-10ce2a74>`);
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Editorial entries",
        eyebrow: "Magazine queue"
      }, {
        action: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              class: "studio-btn",
              to: "/admin/content/new?type=blog&direct=true"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`New Blog Entry`);
                } else {
                  return [
                    createTextVNode("New Blog Entry")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                class: "studio-btn",
                to: "/admin/content/new?type=blog&direct=true"
              }, {
                default: withCtx(() => [
                  createTextVNode("New Blog Entry")
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="filters" data-v-10ce2a74${_scopeId}><!--[-->`);
            ssrRenderList(statusFilters, (filter) => {
              _push2(`<button class="${ssrRenderClass([{ active: unref(statusFilter) === filter }, "filter-pill"])}" type="button" data-v-10ce2a74${_scopeId}>${ssrInterpolate(filter)}</button>`);
            });
            _push2(`<!--]--><button class="ghost-btn" type="button" data-v-10ce2a74${_scopeId}>Refresh</button></div>`);
            if (unref(pending)) {
              _push2(`<p class="muted" data-v-10ce2a74${_scopeId}>Reading content/blog...</p>`);
            } else {
              _push2(`<div class="table-card" data-v-10ce2a74${_scopeId}>`);
              if (!unref(filteredRows).length) {
                _push2(`<div class="empty-row" data-v-10ce2a74${_scopeId}> No blog entries match this filter. </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(unref(filteredRows), (post) => {
                _push2(`<div class="table-row" data-v-10ce2a74${_scopeId}><div class="content-title" data-v-10ce2a74${_scopeId}><strong data-v-10ce2a74${_scopeId}>${ssrInterpolate(post.title)}</strong><span data-v-10ce2a74${_scopeId}>${ssrInterpolate(post.lab || "unassigned")} / ${ssrInterpolate(post.filePath)}</span></div><div class="row-actions" data-v-10ce2a74${_scopeId}><span class="status-badge" data-v-10ce2a74${_scopeId}>${ssrInterpolate(post.status)}</span>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  class: "mini-link",
                  to: previewLink(post)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(post.status === "published" ? "View" : "Preview")}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(post.status === "published" ? "View" : "Preview"), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  class: "mini-link",
                  to: editLink(post.filePath)
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
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              createVNode("div", { class: "filters" }, [
                (openBlock(), createBlock(Fragment, null, renderList(statusFilters, (filter) => {
                  return createVNode("button", {
                    key: filter,
                    class: ["filter-pill", { active: unref(statusFilter) === filter }],
                    type: "button",
                    onClick: ($event) => statusFilter.value = filter
                  }, toDisplayString(filter), 11, ["onClick"]);
                }), 64)),
                createVNode("button", {
                  class: "ghost-btn",
                  type: "button",
                  onClick: unref(refresh)
                }, "Refresh", 8, ["onClick"])
              ]),
              unref(pending) ? (openBlock(), createBlock("p", {
                key: 0,
                class: "muted"
              }, "Reading content/blog...")) : (openBlock(), createBlock("div", {
                key: 1,
                class: "table-card"
              }, [
                !unref(filteredRows).length ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "empty-row"
                }, " No blog entries match this filter. ")) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredRows), (post) => {
                  return openBlock(), createBlock("div", {
                    key: post.filePath,
                    class: "table-row"
                  }, [
                    createVNode("div", { class: "content-title" }, [
                      createVNode("strong", null, toDisplayString(post.title), 1),
                      createVNode("span", null, toDisplayString(post.lab || "unassigned") + " / " + toDisplayString(post.filePath), 1)
                    ]),
                    createVNode("div", { class: "row-actions" }, [
                      createVNode("span", { class: "status-badge" }, toDisplayString(post.status), 1),
                      createVNode(_component_NuxtLink, {
                        class: "mini-link",
                        to: previewLink(post)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(post.status === "published" ? "View" : "Preview"), 1)
                        ]),
                        _: 2
                      }, 1032, ["to"]),
                      createVNode(_component_NuxtLink, {
                        class: "mini-link",
                        to: editLink(post.filePath)
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
        title: "Entry metadata",
        items: [
          { label: "Collection", value: "content/blog" },
          { label: "Items", value: String(unref(rows).length) },
          { label: "Visible filter", value: unref(statusFilter) },
          { label: "Editor", value: "Markdown + frontmatter" },
          { label: "Delete", value: "Danger Zone only" }
        ]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="preview-copy" data-v-10ce2a74${_scopeId}><strong data-v-10ce2a74${_scopeId}>Stage 4 scope</strong><p data-v-10ce2a74${_scopeId}>Entries can now be created and saved as Nuxt Content markdown files. Auth and publishing workflow are still future stages.</p></div>`);
          } else {
            return [
              createVNode("div", { class: "preview-copy" }, [
                createVNode("strong", null, "Stage 4 scope"),
                createVNode("p", null, "Entries can now be created and saved as Nuxt Content markdown files. Auth and publishing workflow are still future stages.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-10ce2a74"]]);

export { index as default };
//# sourceMappingURL=index-BnJH1hqd.mjs.map
