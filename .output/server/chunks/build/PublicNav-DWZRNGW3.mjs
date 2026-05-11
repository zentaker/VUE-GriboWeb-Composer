import { _ as __nuxt_component_0$1 } from './nuxt-link-BzjT64JD.mjs';
import { _ as __nuxt_component_1 } from './BrandMark-zj6wDjnk.mjs';
import { _ as __nuxt_component_2 } from './ThemeToggle-CFtkI3XW.mjs';
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$1;
  const _component_BrandMark = __nuxt_component_1;
  const _component_ThemeToggle = __nuxt_component_2;
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "nav" }, _attrs))}><div class="nav-inner">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "brand",
    to: "/"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_BrandMark, null, null, _parent2, _scopeId));
        _push2(`<span${_scopeId}>Gribo Digital</span>`);
      } else {
        return [
          createVNode(_component_BrandMark),
          createVNode("span", null, "Gribo Digital")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<nav class="nav-links" aria-label="Public navigation">`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Home`);
      } else {
        return [
          createTextVNode("Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Blog`);
      } else {
        return [
          createTextVNode("Blog")
        ];
      }
    }),
    _: 1
  }, _parent));
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
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/labs" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Labs`);
      } else {
        return [
          createTextVNode("Labs")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "pill-button",
    to: "/admin"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Studio`);
      } else {
        return [
          createTextVNode("Studio")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_ThemeToggle, null, null, _parent));
  _push(`</nav></div></header>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/PublicNav.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "PublicNav" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=PublicNav-DWZRNGW3.mjs.map
