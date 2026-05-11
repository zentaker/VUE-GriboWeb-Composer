import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LabHero",
  __ssrInlineRender: true,
  props: {
    eyebrow: {},
    title: {},
    description: {},
    accent: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: ["lab-hero", __props.accent ? `accent-${__props.accent}` : "accent-coral"]
      }, _attrs))} data-v-3cb1a35a><div data-v-3cb1a35a><p class="eyebrow" data-v-3cb1a35a><span class="pulse" data-v-3cb1a35a></span>${ssrInterpolate(__props.eyebrow ?? "Editorial research line")}</p><h1 data-v-3cb1a35a>${ssrInterpolate(__props.title)}</h1></div><p data-v-3cb1a35a>${ssrInterpolate(__props.description)}</p></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/LabHero.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-3cb1a35a"]]), { __name: "LabHero" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TagPill",
  __ssrInlineRender: true,
  props: {
    label: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({ class: "tag" }, _attrs))}>${ssrInterpolate(__props.label)}</span>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/TagPill.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main, { __name: "TagPill" });

export { __nuxt_component_0 as _, __nuxt_component_2 as a };
//# sourceMappingURL=TagPill-7BHTscNI.mjs.map
