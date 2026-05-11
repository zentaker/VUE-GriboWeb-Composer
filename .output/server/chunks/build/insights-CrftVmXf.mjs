import { _ as __nuxt_component_0 } from './AdminHero-lJqa4kRI.mjs';
import { _ as __nuxt_component_2 } from './AdminPanel-CPS4BSK_.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, createTextVNode, withDirectives, isRef, vModelText, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, f as useRequestHeaders } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "insights",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const requestHeaders = useRequestHeaders(["cookie"]);
    const confirmation = ref("");
    const statusMessage = ref("");
    const isClearing = ref(false);
    const { data: summary, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-analytics-summary", () => $fetch("/api/admin/analytics/summary", {
      headers: requestHeaders
    }))), __temp = await __temp, __restore(), __temp);
    const overviewCards = computed(() => [
      { label: "Total views", value: summary.value?.overview.totalViews ?? 0 },
      { label: "Total reads", value: summary.value?.overview.totalReads ?? 0 },
      { label: "Completion rate", value: `${summary.value?.overview.completionRate ?? 0}%` },
      { label: "CTA clicks", value: summary.value?.overview.ctaClicks ?? 0 }
    ]);
    function formatDate(value) {
      if (!value) return "No views yet";
      return new Date(value).toLocaleString("en", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    async function clearAnalytics() {
      statusMessage.value = "";
      if (confirmation.value !== "CLEAR ANALYTICS") {
        statusMessage.value = "Type CLEAR ANALYTICS to clear anonymous events.";
        return;
      }
      isClearing.value = true;
      try {
        await $fetch("/api/admin/analytics/clear", {
          method: "POST",
          body: {
            confirmation: confirmation.value
          }
        });
        statusMessage.value = "Analytics data cleared.";
        confirmation.value = "";
        await refresh();
      } catch (error) {
        statusMessage.value = error?.statusMessage || "Analytics data could not be cleared.";
      } finally {
        isClearing.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminHero = __nuxt_component_0;
      const _component_AdminPanel = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-3673c2eb>`);
      _push(ssrRenderComponent(_component_AdminHero, {
        eyebrow: "Insights",
        title: "Anonymous signals from the public archive.",
        description: "Stage 8 tracks page views, reading progress and CTA clicks without storing raw IP addresses or reader accounts."
      }, null, _parent));
      _push(`<section class="privacy-note" data-v-3673c2eb><strong data-v-3673c2eb>Privacy note</strong><p data-v-3673c2eb>Analytics are anonymous and do not require public user accounts. Stage 8 tracks page views, reading progress and CTA clicks without storing raw IP addresses.</p></section><section class="stat-grid" aria-label="Analytics overview" data-v-3673c2eb><!--[-->`);
      ssrRenderList(unref(overviewCards), (card) => {
        _push(`<article class="stat-card" data-v-3673c2eb><span data-v-3673c2eb>${ssrInterpolate(card.label)}</span><strong data-v-3673c2eb>${ssrInterpolate(card.value)}</strong></article>`);
      });
      _push(`<!--]--></section><div class="insights-actions" data-v-3673c2eb><button class="studio-btn"${ssrIncludeBooleanAttr(unref(pending)) ? " disabled" : ""} type="button" data-v-3673c2eb>Refresh metrics</button><button class="studio-btn" type="button" data-v-3673c2eb>Export analytics JSON</button></div><section class="insights-grid" data-v-3673c2eb>`);
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Top content",
        eyebrow: "By route"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="table-wrap" data-v-3673c2eb${_scopeId}><table data-v-3673c2eb${_scopeId}><thead data-v-3673c2eb${_scopeId}><tr data-v-3673c2eb${_scopeId}><th data-v-3673c2eb${_scopeId}>Title</th><th data-v-3673c2eb${_scopeId}>Type</th><th data-v-3673c2eb${_scopeId}>Lab</th><th data-v-3673c2eb${_scopeId}>Views</th><th data-v-3673c2eb${_scopeId}>Reads</th><th data-v-3673c2eb${_scopeId}>Completion</th><th data-v-3673c2eb${_scopeId}>Last viewed</th></tr></thead><tbody data-v-3673c2eb${_scopeId}><!--[-->`);
            ssrRenderList(unref(summary)?.content ?? [], (item) => {
              _push2(`<tr data-v-3673c2eb${_scopeId}><td data-v-3673c2eb${_scopeId}><strong data-v-3673c2eb${_scopeId}>${ssrInterpolate(item.title)}</strong><small data-v-3673c2eb${_scopeId}>${ssrInterpolate(item.route)}</small></td><td data-v-3673c2eb${_scopeId}>${ssrInterpolate(item.contentType)}</td><td data-v-3673c2eb${_scopeId}>${ssrInterpolate(item.lab || "unassigned")}</td><td data-v-3673c2eb${_scopeId}>${ssrInterpolate(item.views)}</td><td data-v-3673c2eb${_scopeId}>${ssrInterpolate(item.readStarts)}</td><td data-v-3673c2eb${_scopeId}>${ssrInterpolate(item.completionRate)}%</td><td data-v-3673c2eb${_scopeId}>${ssrInterpolate(formatDate(item.lastViewedAt))}</td></tr>`);
            });
            _push2(`<!--]-->`);
            if (!unref(summary)?.content.length) {
              _push2(`<tr data-v-3673c2eb${_scopeId}><td colspan="7" data-v-3673c2eb${_scopeId}>No analytics events yet. Open a public page to record the first anonymous view.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
          } else {
            return [
              createVNode("div", { class: "table-wrap" }, [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Title"),
                      createVNode("th", null, "Type"),
                      createVNode("th", null, "Lab"),
                      createVNode("th", null, "Views"),
                      createVNode("th", null, "Reads"),
                      createVNode("th", null, "Completion"),
                      createVNode("th", null, "Last viewed")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(summary)?.content ?? [], (item) => {
                      return openBlock(), createBlock("tr", {
                        key: item.route
                      }, [
                        createVNode("td", null, [
                          createVNode("strong", null, toDisplayString(item.title), 1),
                          createVNode("small", null, toDisplayString(item.route), 1)
                        ]),
                        createVNode("td", null, toDisplayString(item.contentType), 1),
                        createVNode("td", null, toDisplayString(item.lab || "unassigned"), 1),
                        createVNode("td", null, toDisplayString(item.views), 1),
                        createVNode("td", null, toDisplayString(item.readStarts), 1),
                        createVNode("td", null, toDisplayString(item.completionRate) + "%", 1),
                        createVNode("td", null, toDisplayString(formatDate(item.lastViewedAt)), 1)
                      ]);
                    }), 128)),
                    !unref(summary)?.content.length ? (openBlock(), createBlock("tr", { key: 0 }, [
                      createVNode("td", { colspan: "7" }, "No analytics events yet. Open a public page to record the first anonymous view.")
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="side-stack" data-v-3673c2eb>`);
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Metrics by lab",
        eyebrow: "Editorial line"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mini-list" data-v-3673c2eb${_scopeId}><!--[-->`);
            ssrRenderList(unref(summary)?.labs ?? [], (lab) => {
              _push2(`<div class="mini-row" data-v-3673c2eb${_scopeId}><strong data-v-3673c2eb${_scopeId}>${ssrInterpolate(lab.lab)}</strong><span data-v-3673c2eb${_scopeId}>${ssrInterpolate(lab.views)} views · ${ssrInterpolate(lab.reads)} reads · ${ssrInterpolate(lab.completions)} complete</span></div>`);
            });
            _push2(`<!--]-->`);
            if (!unref(summary)?.labs.length) {
              _push2(`<p class="muted" data-v-3673c2eb${_scopeId}>No lab metrics yet.</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mini-list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(summary)?.labs ?? [], (lab) => {
                  return openBlock(), createBlock("div", {
                    key: lab.lab,
                    class: "mini-row"
                  }, [
                    createVNode("strong", null, toDisplayString(lab.lab), 1),
                    createVNode("span", null, toDisplayString(lab.views) + " views · " + toDisplayString(lab.reads) + " reads · " + toDisplayString(lab.completions) + " complete", 1)
                  ]);
                }), 128)),
                !unref(summary)?.labs.length ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "muted"
                }, "No lab metrics yet.")) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Metrics by type",
        eyebrow: "Content model"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mini-list" data-v-3673c2eb${_scopeId}><!--[-->`);
            ssrRenderList(unref(summary)?.types ?? [], (type) => {
              _push2(`<div class="mini-row" data-v-3673c2eb${_scopeId}><strong data-v-3673c2eb${_scopeId}>${ssrInterpolate(type.contentType)}</strong><span data-v-3673c2eb${_scopeId}>${ssrInterpolate(type.views)} views · ${ssrInterpolate(type.reads)} reads · ${ssrInterpolate(type.ctaClicks)} CTA</span></div>`);
            });
            _push2(`<!--]-->`);
            if (!unref(summary)?.types.length) {
              _push2(`<p class="muted" data-v-3673c2eb${_scopeId}>No type metrics yet.</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mini-list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(summary)?.types ?? [], (type) => {
                  return openBlock(), createBlock("div", {
                    key: type.contentType,
                    class: "mini-row"
                  }, [
                    createVNode("strong", null, toDisplayString(type.contentType), 1),
                    createVNode("span", null, toDisplayString(type.views) + " views · " + toDisplayString(type.reads) + " reads · " + toDisplayString(type.ctaClicks) + " CTA", 1)
                  ]);
                }), 128)),
                !unref(summary)?.types.length ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "muted"
                }, "No type metrics yet.")) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="insights-grid" data-v-3673c2eb>`);
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Recent anonymous events",
        eyebrow: "Debug surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="event-list" data-v-3673c2eb${_scopeId}><!--[-->`);
            ssrRenderList(unref(summary)?.recentEvents ?? [], (event) => {
              _push2(`<div class="event-row" data-v-3673c2eb${_scopeId}><span data-v-3673c2eb${_scopeId}>${ssrInterpolate(event.eventType)}</span><strong data-v-3673c2eb${_scopeId}>${ssrInterpolate(event.title)}</strong><small data-v-3673c2eb${_scopeId}>${ssrInterpolate(event.route)} · ${ssrInterpolate(formatDate(event.timestamp))}</small></div>`);
            });
            _push2(`<!--]-->`);
            if (!unref(summary)?.recentEvents.length) {
              _push2(`<p class="muted" data-v-3673c2eb${_scopeId}>No recent events yet.</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "event-list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(summary)?.recentEvents ?? [], (event) => {
                  return openBlock(), createBlock("div", {
                    key: event.eventId,
                    class: "event-row"
                  }, [
                    createVNode("span", null, toDisplayString(event.eventType), 1),
                    createVNode("strong", null, toDisplayString(event.title), 1),
                    createVNode("small", null, toDisplayString(event.route) + " · " + toDisplayString(formatDate(event.timestamp)), 1)
                  ]);
                }), 128)),
                !unref(summary)?.recentEvents.length ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "muted"
                }, "No recent events yet.")) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Danger Zone",
        eyebrow: "Data management"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="muted" data-v-3673c2eb${_scopeId}>Clear removes local anonymous analytics events. It does not touch editorial content, users, backups or Home Composer data.</p><label class="danger-label" data-v-3673c2eb${_scopeId}> Confirmation <input${ssrRenderAttr("value", unref(confirmation))} type="text" placeholder="CLEAR ANALYTICS" data-v-3673c2eb${_scopeId}></label><button class="danger-btn"${ssrIncludeBooleanAttr(unref(isClearing)) ? " disabled" : ""} type="button" data-v-3673c2eb${_scopeId}>${ssrInterpolate(unref(isClearing) ? "Clearing..." : "Clear analytics data")}</button>`);
            if (unref(statusMessage)) {
              _push2(`<p class="status-message" data-v-3673c2eb${_scopeId}>${ssrInterpolate(unref(statusMessage))}</p>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("p", { class: "muted" }, "Clear removes local anonymous analytics events. It does not touch editorial content, users, backups or Home Composer data."),
              createVNode("label", { class: "danger-label" }, [
                createTextVNode(" Confirmation "),
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => isRef(confirmation) ? confirmation.value = $event : null,
                  type: "text",
                  placeholder: "CLEAR ANALYTICS"
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelText, unref(confirmation)]
                ])
              ]),
              createVNode("button", {
                class: "danger-btn",
                disabled: unref(isClearing),
                type: "button",
                onClick: clearAnalytics
              }, toDisplayString(unref(isClearing) ? "Clearing..." : "Clear analytics data"), 9, ["disabled"]),
              unref(statusMessage) ? (openBlock(), createBlock("p", {
                key: 0,
                class: "status-message"
              }, toDisplayString(unref(statusMessage)), 1)) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/insights.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const insights = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3673c2eb"]]);

export { insights as default };
//# sourceMappingURL=insights-CrftVmXf.mjs.map
