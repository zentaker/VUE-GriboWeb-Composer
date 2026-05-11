import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminHero",
  __ssrInlineRender: true,
  props: {
    eyebrow: {},
    title: {},
    description: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "admin-hero" }, _attrs))} data-v-7c576395><p class="eyebrow" data-v-7c576395><span class="pulse" data-v-7c576395></span>${ssrInterpolate(__props.eyebrow)}</p><h1 data-v-7c576395>${ssrInterpolate(__props.title)}</h1><p data-v-7c576395>${ssrInterpolate(__props.description)}</p></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminHero.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-7c576395"]]), { __name: "AdminHero" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=AdminHero-lJqa4kRI.mjs.map
