import { _ as __nuxt_component_0 } from './AdminHero-lJqa4kRI.mjs';
import { _ as __nuxt_component_2 } from './AdminPanel-CPS4BSK_.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "queue",
  __ssrInlineRender: true,
  setup(__props) {
    const checks = [
      ["Metadata complete", "Ready", "Project title, excerpt, and status are present."],
      ["Social image", "Blocked", "Needs a later media-library selection."],
      ["Docs links", "Ready", "Setup and architecture pages are connected."],
      ["Editorial review", "Review", "Needs final copy pass before publish."],
      ["SEO fields", "Draft", "Stage 1.3 will define the content model."]
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminHero = __nuxt_component_0;
      const _component_AdminPanel = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-38df54e1>`);
      _push(ssrRenderComponent(_component_AdminHero, {
        eyebrow: "Publish Queue",
        title: "Final checks before content goes live.",
        description: "Placeholder for SEO, metadata, media, preview checks, and editorial warnings. Publishing remains mock-only."
      }, null, _parent));
      _push(`<section class="queue-layout" data-v-38df54e1>`);
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Editorial checklist",
        eyebrow: "Preflight"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="checklist" data-v-38df54e1${_scopeId}><!--[-->`);
            ssrRenderList(checks, (check) => {
              _push2(`<article class="check-item" data-v-38df54e1${_scopeId}><span class="check-dot" data-v-38df54e1${_scopeId}>✓</span><div data-v-38df54e1${_scopeId}><strong data-v-38df54e1${_scopeId}>${ssrInterpolate(check[0])}</strong><p data-v-38df54e1${_scopeId}>${ssrInterpolate(check[2])}</p></div><span class="status-badge" data-v-38df54e1${_scopeId}>${ssrInterpolate(check[1])}</span></article>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "checklist" }, [
                (openBlock(), createBlock(Fragment, null, renderList(checks, (check) => {
                  return createVNode("article", {
                    key: check[0],
                    class: "check-item"
                  }, [
                    createVNode("span", { class: "check-dot" }, "✓"),
                    createVNode("div", null, [
                      createVNode("strong", null, toDisplayString(check[0]), 1),
                      createVNode("p", null, toDisplayString(check[2]), 1)
                    ]),
                    createVNode("span", { class: "status-badge" }, toDisplayString(check[1]), 1)
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Queue warnings",
        eyebrow: "Mock status"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="warning-card" data-v-38df54e1${_scopeId}><strong data-v-38df54e1${_scopeId}>Publishing disabled</strong><p data-v-38df54e1${_scopeId}>No real publish, save, webhook, auth, or deployment action exists in this stage.</p></div><div class="warning-card soft" data-v-38df54e1${_scopeId}><strong data-v-38df54e1${_scopeId}>Next required model</strong><p data-v-38df54e1${_scopeId}>SEO metadata foundation should define canonical URLs, OG images, and excerpts before real queue work.</p></div>`);
          } else {
            return [
              createVNode("div", { class: "warning-card" }, [
                createVNode("strong", null, "Publishing disabled"),
                createVNode("p", null, "No real publish, save, webhook, auth, or deployment action exists in this stage.")
              ]),
              createVNode("div", { class: "warning-card soft" }, [
                createVNode("strong", null, "Next required model"),
                createVNode("p", null, "SEO metadata foundation should define canonical URLs, OG images, and excerpts before real queue work.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/queue.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const queue = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-38df54e1"]]);

export { queue as default };
//# sourceMappingURL=queue-Dec589IW.mjs.map
