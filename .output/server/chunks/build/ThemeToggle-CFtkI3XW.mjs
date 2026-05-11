import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ThemeToggle",
  __ssrInlineRender: true,
  setup(__props) {
    const theme = ref("dark");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: "theme-toggle",
        type: "button",
        "aria-label": `Switch to ${unref(theme) === "dark" ? "light" : "dark"} theme`
      }, _attrs))} data-v-d5036295><span class="theme-dot" aria-hidden="true" data-v-d5036295></span> ${ssrInterpolate(unref(theme) === "dark" ? "Dark" : "Light")}</button>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/ThemeToggle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-d5036295"]]), { __name: "ThemeToggle" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=ThemeToggle-CFtkI3XW.mjs.map
