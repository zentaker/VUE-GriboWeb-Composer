import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<aside${ssrRenderAttrs(mergeProps({ class: "block-preview-panel" }, _attrs))} data-v-bccb8641><div class="preview-top" data-v-bccb8641><strong data-v-bccb8641>Frontend preview</strong><span class="status-badge" data-v-bccb8641>Mock</span></div><div class="mini-browser" data-v-bccb8641><div class="browser-bar" data-v-bccb8641><span class="browser-dot" data-v-bccb8641></span><span class="browser-dot" data-v-bccb8641></span><span class="browser-dot" data-v-bccb8641></span></div><div class="browser-preview" data-v-bccb8641><div class="preview-hero" data-v-bccb8641><h3 data-v-bccb8641>Ideas that become systems.</h3></div><div class="preview-grid" data-v-bccb8641><div class="preview-tile" data-v-bccb8641><strong data-v-bccb8641>Featured project</strong></div><div class="preview-tile" data-v-bccb8641><strong data-v-bccb8641>Build log</strong></div></div></div></div>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</aside>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminPreviewPanel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-bccb8641"]]), { __name: "AdminPreviewPanel" });

export { __nuxt_component_5 as _ };
//# sourceMappingURL=AdminPreviewPanel-C15Jt5ST.mjs.map
