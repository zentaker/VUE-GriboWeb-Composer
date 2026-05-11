import { _ as __nuxt_component_2 } from './AdminPanel-CPS4BSK_.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminInspector",
  __ssrInlineRender: true,
  props: {
    title: {},
    items: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminPanel = __nuxt_component_2;
      _push(ssrRenderComponent(_component_AdminPanel, mergeProps({
        title: __props.title ?? "Block inspector",
        eyebrow: "Inspector"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="inspector-list" data-v-b5929258${_scopeId}><!--[-->`);
            ssrRenderList(__props.items ?? [], (item) => {
              _push2(`<div class="inspector-row" data-v-b5929258${_scopeId}><span data-v-b5929258${_scopeId}>${ssrInterpolate(item.label)}</span><strong data-v-b5929258${_scopeId}>${ssrInterpolate(item.value)}</strong></div>`);
            });
            _push2(`<!--]--></div>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode("div", { class: "inspector-list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.items ?? [], (item) => {
                  return openBlock(), createBlock("div", {
                    key: item.label,
                    class: "inspector-row"
                  }, [
                    createVNode("span", null, toDisplayString(item.label), 1),
                    createVNode("strong", null, toDisplayString(item.value), 1)
                  ]);
                }), 128))
              ]),
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminInspector.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-b5929258"]]), { __name: "AdminInspector" });

export { __nuxt_component_4 as _ };
//# sourceMappingURL=AdminInspector-CoNamQdx.mjs.map
