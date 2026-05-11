import { _ as __nuxt_component_0 } from './nuxt-link-BzjT64JD.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RelatedContent",
  __ssrInlineRender: true,
  props: {
    title: {},
    items: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "related-content" }, _attrs))} data-v-b7179cb6><h2 data-v-b7179cb6>${ssrInterpolate(__props.title)}</h2><div class="related-grid" data-v-b7179cb6><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.title,
          class: "related-card",
          to: item.to
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span data-v-b7179cb6${_scopeId}>${ssrInterpolate(item.label)}</span><strong data-v-b7179cb6${_scopeId}>${ssrInterpolate(item.title)}</strong>`);
            } else {
              return [
                createVNode("span", null, toDisplayString(item.label), 1),
                createVNode("strong", null, toDisplayString(item.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/RelatedContent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-b7179cb6"]]), { __name: "RelatedContent" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=RelatedContent-BKp9xP-Z.mjs.map
