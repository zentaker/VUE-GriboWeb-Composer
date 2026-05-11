import { defineComponent, computed, unref, mergeProps, createVNode, resolveDynamicComponent, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderVNode, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ContentBlockRenderer",
  __ssrInlineRender: true,
  props: {
    blocks: { default: () => [] },
    context: { default: "blog" }
  },
  setup(__props) {
    const props = __props;
    const visibleBlocks = computed(
      () => (Array.isArray(props.blocks) ? props.blocks : []).filter((block) => block && block.visible !== false)
    );
    function rowsFor(block) {
      const data = block.data ?? {};
      if (Array.isArray(data.rows)) return data.rows;
      return String(data.rowsText || "").split(/\r?\n/).map((row) => row.split("|").map((cell) => cell.trim()).filter(Boolean)).filter((row) => row.length);
    }
    function columnsFor(block) {
      const data = block.data ?? {};
      if (Array.isArray(data.columns)) return data.columns;
      return String(data.columnsText || "").split(",").map((column) => column.trim()).filter(Boolean);
    }
    function imageLayout(block) {
      const layout = String(block.data?.layout || "contained");
      if (layout === "full" || layout === "bleed") return "full-width";
      if (layout === "left" || layout === "right") return "inline-medium";
      if (["full-width", "contained", "inline-medium", "inline-small", "editorial-crop"].includes(layout)) return layout;
      return "contained";
    }
    function headingLevel(block) {
      const level = String(block.data?.level || "h2");
      return ["h2", "h3", "h4"].includes(level) ? level : "h2";
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(visibleBlocks).length) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "rich-blocks",
          "data-context": __props.context
        }, _attrs))} data-v-b6684aca><!--[-->`);
        ssrRenderList(unref(visibleBlocks), (block) => {
          _push(`<section class="${ssrRenderClass([`block-${block.type || "text"}`, "rich-block"])}" style="${ssrRenderStyle(block.type !== "quote" || block.data?.quote ? null : { display: "none" })}" data-v-b6684aca>`);
          if (block.type === "heading") {
            _push(`<div class="heading-block" data-v-b6684aca>`);
            if (block.data?.kicker) {
              _push(`<p class="block-kicker" data-v-b6684aca>${ssrInterpolate(block.data.kicker)}</p>`);
            } else {
              _push(`<!---->`);
            }
            if (block.data?.heading) {
              ssrRenderVNode(_push, createVNode(resolveDynamicComponent(headingLevel(block)), null, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(block.data.heading)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(block.data.heading), 1)
                    ];
                  }
                }),
                _: 2
              }), _parent);
            } else {
              _push(`<!---->`);
            }
            if (block.data?.subheading) {
              _push(`<p class="heading-subtitle" data-v-b6684aca>${ssrInterpolate(block.data.subheading)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else if ((block.type || "text") === "text") {
            _push(`<!--[-->`);
            if (block.data?.heading) {
              _push(`<h2 data-v-b6684aca>${ssrInterpolate(block.data.heading)}</h2>`);
            } else {
              _push(`<!---->`);
            }
            if (block.data?.body) {
              _push(`<p class="block-copy" data-v-b6684aca>${ssrInterpolate(block.data.body)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          } else if (block.type === "quote") {
            _push(`<!--[-->`);
            if (block.data?.quote) {
              _push(`<blockquote class="content-quote-block"${ssrRenderAttr("data-variant", block.data?.variant || "editorial")} data-v-b6684aca><p data-v-b6684aca>${ssrInterpolate(block.data.quote)}</p>`);
              if (block.data?.attribution) {
                _push(`<cite data-v-b6684aca>${ssrInterpolate(block.data.attribution)}</cite>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</blockquote>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          } else if (block.type === "image") {
            _push(`<figure class="${ssrRenderClass(["image-figure", imageLayout(block)])}" data-v-b6684aca>`);
            if (block.data?.imageUrl) {
              _push(`<img${ssrRenderAttr("src", block.data.imageUrl)}${ssrRenderAttr("alt", block.data?.alt || "")} data-v-b6684aca>`);
            } else {
              _push(`<div class="image-placeholder" data-v-b6684aca>Image block</div>`);
            }
            if (block.data?.caption) {
              _push(`<figcaption data-v-b6684aca>${ssrInterpolate(block.data.caption)}</figcaption>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</figure>`);
          } else if (block.type === "code") {
            _push(`<div class="code-panel" data-v-b6684aca><div class="code-head" data-v-b6684aca><span data-v-b6684aca>${ssrInterpolate(block.data?.title || block.title || "Code block")}</span>`);
            if (block.data?.copyEnabled) {
              _push(`<button type="button" data-v-b6684aca>Copy</button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><pre data-v-b6684aca><code data-v-b6684aca>${ssrInterpolate(block.data?.code)}</code></pre></div>`);
          } else if (block.type === "callout") {
            _push(`<aside class="callout-block"${ssrRenderAttr("data-variant", block.data?.variant || "info")} data-v-b6684aca><span class="callout-mark" data-v-b6684aca>${ssrInterpolate(block.data?.icon || "i")}</span><div data-v-b6684aca><h3 data-v-b6684aca>${ssrInterpolate(block.data?.title || block.title || "Callout")}</h3><p data-v-b6684aca>${ssrInterpolate(block.data?.body)}</p></div></aside>`);
          } else if (block.type === "table") {
            _push(`<div class="table-wrap" data-v-b6684aca><table data-v-b6684aca><thead data-v-b6684aca><tr data-v-b6684aca><!--[-->`);
            ssrRenderList(columnsFor(block), (column) => {
              _push(`<th data-v-b6684aca>${ssrInterpolate(column)}</th>`);
            });
            _push(`<!--]--></tr></thead><tbody data-v-b6684aca><!--[-->`);
            ssrRenderList(rowsFor(block), (row, rowIndex) => {
              _push(`<tr data-v-b6684aca><!--[-->`);
              ssrRenderList(row, (cell, cellIndex) => {
                _push(`<td data-v-b6684aca>${ssrInterpolate(cell)}</td>`);
              });
              _push(`<!--]--></tr>`);
            });
            _push(`<!--]--></tbody></table></div>`);
          } else if (block.type === "banner") {
            _push(`<aside class="banner-block"${ssrRenderAttr("data-accent", block.data?.accent || "coral")} data-v-b6684aca><h2 data-v-b6684aca>${ssrInterpolate(block.data?.title || block.title)}</h2><p data-v-b6684aca>${ssrInterpolate(block.data?.body)}</p></aside>`);
          } else if (block.type === "steps") {
            _push(`<ol class="steps-block" data-v-b6684aca><!--[-->`);
            ssrRenderList(block.data?.items || [], (item, index) => {
              _push(`<li data-v-b6684aca><strong data-v-b6684aca>${ssrInterpolate(item.title || `Step ${index + 1}`)}</strong><span data-v-b6684aca>${ssrInterpolate(item.body)}</span></li>`);
            });
            _push(`<!--]--></ol>`);
          } else if (block.type === "gallery") {
            _push(`<div class="gallery-block" data-v-b6684aca><!--[-->`);
            ssrRenderList(block.data?.images || [], (image, index) => {
              _push(`<figure data-v-b6684aca><img${ssrRenderAttr("src", image.url)}${ssrRenderAttr("alt", image.alt || "")} data-v-b6684aca>`);
              if (image.caption) {
                _push(`<figcaption data-v-b6684aca>${ssrInterpolate(image.caption)}</figcaption>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</figure>`);
            });
            _push(`<!--]--></div>`);
          } else if (block.type === "split") {
            _push(`<div class="split-block" data-v-b6684aca><div data-v-b6684aca>${ssrInterpolate(block.data?.leftContent)}</div><div data-v-b6684aca>${ssrInterpolate(block.data?.rightContent)}</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</section>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/ContentBlockRenderer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-b6684aca"]]), { __name: "ContentBlockRenderer" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=ContentBlockRenderer-k3SB9w23.mjs.map
