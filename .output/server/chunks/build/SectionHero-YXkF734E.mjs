import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SectionHero",
  __ssrInlineRender: true,
  props: {
    eyebrow: {},
    title: {},
    description: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-hero" }, _attrs))} data-v-2c32b3f3><div data-v-2c32b3f3><p class="eyebrow" data-v-2c32b3f3><span class="pulse" data-v-2c32b3f3></span>${ssrInterpolate(__props.eyebrow)}</p><h1 data-v-2c32b3f3>${ssrInterpolate(__props.title)}</h1><p data-v-2c32b3f3>${ssrInterpolate(__props.description)}</p></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/SectionHero.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-2c32b3f3"]]), { __name: "SectionHero" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=SectionHero-YXkF734E.mjs.map
