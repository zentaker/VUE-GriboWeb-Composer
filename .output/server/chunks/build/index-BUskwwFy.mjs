import { _ as __nuxt_component_0 } from './AdminHero-lJqa4kRI.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_2 } from './AdminPanel-CPS4BSK_.mjs';
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
  __name: "AdminStatCard",
  __ssrInlineRender: true,
  props: {
    label: {},
    value: {},
    detail: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "stat-card" }, _attrs))} data-v-bd92fc5b><span data-v-bd92fc5b>${ssrInterpolate(__props.label)}</span><strong data-v-bd92fc5b>${ssrInterpolate(__props.value)}</strong><p data-v-bd92fc5b>${ssrInterpolate(__props.detail)}</p></article>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminStatCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-bd92fc5b"]]), { __name: "AdminStatCard" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const queueItems = [
      { title: "When Agents Promise Autonomy but Deliver Friction", type: "Essay", status: "Draft" },
      { title: "Tennis Image Analysis Pipeline", type: "Project", status: "Review" },
      { title: "AI Documentation as Product Interface", type: "Docs", status: "Scheduled" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminHero = __nuxt_component_0;
      const _component_AdminStatCard = __nuxt_component_1;
      const _component_AdminPanel = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-efde3d9b>`);
      _push(ssrRenderComponent(_component_AdminHero, {
        eyebrow: "Overview",
        title: "Editorial cockpit for Gribo Digital.",
        description: "Mock surface for planning home modules, articles, projects, docs, media, and publishing queues."
      }, null, _parent));
      _push(`<section class="stats-grid" data-v-efde3d9b>`);
      _push(ssrRenderComponent(_component_AdminStatCard, {
        label: "Magazine queue",
        value: "12",
        detail: "Drafts, essays, and editorial fragments."
      }, null, _parent));
      _push(ssrRenderComponent(_component_AdminStatCard, {
        label: "Repository shelf",
        value: "04",
        detail: "Living project records staged for metadata."
      }, null, _parent));
      _push(ssrRenderComponent(_component_AdminStatCard, {
        label: "Labs map",
        value: "05",
        detail: "Research tracks prepared for Stage 1.2."
      }, null, _parent));
      _push(ssrRenderComponent(_component_AdminStatCard, {
        label: "Publish queue",
        value: "03",
        detail: "Mock checks waiting for editorial review."
      }, null, _parent));
      _push(`</section><section class="grid-2" data-v-efde3d9b>`);
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Editorial queue",
        eyebrow: "Magazine"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="content-rows" data-v-efde3d9b${_scopeId}><!--[-->`);
            ssrRenderList(queueItems, (item) => {
              _push2(`<article class="content-row" data-v-efde3d9b${_scopeId}><div class="content-title" data-v-efde3d9b${_scopeId}><strong data-v-efde3d9b${_scopeId}>${ssrInterpolate(item.title)}</strong><span data-v-efde3d9b${_scopeId}>${ssrInterpolate(item.type)} / Gribo Digital</span></div><span class="status-badge" data-v-efde3d9b${_scopeId}>${ssrInterpolate(item.status)}</span></article>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "content-rows" }, [
                (openBlock(), createBlock(Fragment, null, renderList(queueItems, (item) => {
                  return createVNode("article", {
                    key: item.title,
                    class: "content-row"
                  }, [
                    createVNode("div", { class: "content-title" }, [
                      createVNode("strong", null, toDisplayString(item.title), 1),
                      createVNode("span", null, toDisplayString(item.type) + " / Gribo Digital", 1)
                    ]),
                    createVNode("span", { class: "status-badge" }, toDisplayString(item.status), 1)
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Studio map",
        eyebrow: "Infrastructure"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="path-card" data-v-efde3d9b${_scopeId}>content/ blog/ projects/ docs/ home/ settings/ admin/ home composer editorial queue repository manager publish checks</div>`);
          } else {
            return [
              createVNode("div", { class: "path-card" }, "content/ blog/ projects/ docs/ home/ settings/ admin/ home composer editorial queue repository manager publish checks")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-efde3d9b"]]);

export { index as default };
//# sourceMappingURL=index-BUskwwFy.mjs.map
