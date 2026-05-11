import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminPanel",
  __ssrInlineRender: true,
  props: {
    title: {},
    eyebrow: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "admin-panel" }, _attrs))} data-v-de3dc279>`);
      if (__props.title || __props.eyebrow) {
        _push(`<div class="panel-head" data-v-de3dc279><div data-v-de3dc279>`);
        if (__props.eyebrow) {
          _push(`<p class="panel-eyebrow" data-v-de3dc279>${ssrInterpolate(__props.eyebrow)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.title) {
          _push(`<h2 data-v-de3dc279>${ssrInterpolate(__props.title)}</h2>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        ssrRenderSlot(_ctx.$slots, "action", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminPanel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-de3dc279"]]), { __name: "AdminPanel" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=AdminPanel-CPS4BSK_.mjs.map
