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
        }, _attrs))} data-v-94bf6e5f><!--[-->`);
        ssrRenderList(unref(visibleBlocks), (block) => {
          _push(`<section class="${ssrRenderClass([`block-${block.type || "text"}`, "rich-block"])}" style="${ssrRenderStyle(block.type !== "quote" || block.data?.quote ? null : { display: "none" })}" data-v-94bf6e5f>`);
          if (block.type === "heading") {
            _push(`<div class="heading-block" data-v-94bf6e5f>`);
            if (block.data?.kicker) {
              _push(`<p class="block-kicker" data-v-94bf6e5f>${ssrInterpolate(block.data.kicker)}</p>`);
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
              _push(`<p class="heading-subtitle" data-v-94bf6e5f>${ssrInterpolate(block.data.subheading)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else if ((block.type || "text") === "text") {
            _push(`<!--[-->`);
            if (block.data?.heading) {
              _push(`<h2 data-v-94bf6e5f>${ssrInterpolate(block.data.heading)}</h2>`);
            } else {
              _push(`<!---->`);
            }
            if (block.data?.body) {
              _push(`<p class="block-copy" data-v-94bf6e5f>${ssrInterpolate(block.data.body)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          } else if (block.type === "quote") {
            _push(`<!--[-->`);
            if (block.data?.quote) {
              _push(`<blockquote class="content-quote-block"${ssrRenderAttr("data-variant", block.data?.variant || "editorial")} data-v-94bf6e5f><p data-v-94bf6e5f>${ssrInterpolate(block.data.quote)}</p>`);
              if (block.data?.attribution) {
                _push(`<cite data-v-94bf6e5f>${ssrInterpolate(block.data.attribution)}</cite>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</blockquote>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          } else if (block.type === "image") {
            _push(`<figure class="${ssrRenderClass(["image-figure", imageLayout(block)])}" data-v-94bf6e5f>`);
            if (block.data?.imageUrl) {
              _push(`<img${ssrRenderAttr("src", block.data.imageUrl)}${ssrRenderAttr("alt", block.data?.alt || "")} data-v-94bf6e5f>`);
            } else {
              _push(`<div class="image-placeholder" data-v-94bf6e5f>Image block</div>`);
            }
            if (block.data?.caption) {
              _push(`<figcaption data-v-94bf6e5f>${ssrInterpolate(block.data.caption)}</figcaption>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</figure>`);
          } else if (block.type === "code") {
            _push(`<div class="code-panel" data-v-94bf6e5f><div class="code-head" data-v-94bf6e5f><span data-v-94bf6e5f>${ssrInterpolate(block.data?.title || "Code block")}</span>`);
            if (block.data?.copyEnabled) {
              _push(`<button type="button" data-v-94bf6e5f>Copy</button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><pre data-v-94bf6e5f><code data-v-94bf6e5f>${ssrInterpolate(block.data?.code)}</code></pre></div>`);
          } else if (block.type === "callout") {
            _push(`<aside class="callout-block"${ssrRenderAttr("data-variant", block.data?.variant || "info")} data-v-94bf6e5f><span class="callout-mark" data-v-94bf6e5f>${ssrInterpolate(block.data?.icon || "i")}</span><div data-v-94bf6e5f>`);
            if (block.data?.title) {
              _push(`<h3 data-v-94bf6e5f>${ssrInterpolate(block.data.title)}</h3>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<p data-v-94bf6e5f>${ssrInterpolate(block.data?.body)}</p></div></aside>`);
          } else if (block.type === "table") {
            _push(`<div class="table-wrap" data-v-94bf6e5f><table data-v-94bf6e5f><thead data-v-94bf6e5f><tr data-v-94bf6e5f><!--[-->`);
            ssrRenderList(columnsFor(block), (column) => {
              _push(`<th data-v-94bf6e5f>${ssrInterpolate(column)}</th>`);
            });
            _push(`<!--]--></tr></thead><tbody data-v-94bf6e5f><!--[-->`);
            ssrRenderList(rowsFor(block), (row, rowIndex) => {
              _push(`<tr data-v-94bf6e5f><!--[-->`);
              ssrRenderList(row, (cell, cellIndex) => {
                _push(`<td data-v-94bf6e5f>${ssrInterpolate(cell)}</td>`);
              });
              _push(`<!--]--></tr>`);
            });
            _push(`<!--]--></tbody></table></div>`);
          } else if (block.type === "banner") {
            _push(`<aside class="banner-block"${ssrRenderAttr("data-accent", block.data?.accent || "coral")} data-v-94bf6e5f>`);
            if (block.data?.title) {
              _push(`<h2 data-v-94bf6e5f>${ssrInterpolate(block.data.title)}</h2>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<p data-v-94bf6e5f>${ssrInterpolate(block.data?.body)}</p></aside>`);
          } else if (block.type === "steps") {
            _push(`<ol class="steps-block" data-v-94bf6e5f><!--[-->`);
            ssrRenderList(block.data?.items || [], (item, index) => {
              _push(`<li data-v-94bf6e5f><strong data-v-94bf6e5f>${ssrInterpolate(item.title || `Step ${index + 1}`)}</strong><span data-v-94bf6e5f>${ssrInterpolate(item.body)}</span></li>`);
            });
            _push(`<!--]--></ol>`);
          } else if (block.type === "gallery") {
            _push(`<div class="gallery-block" data-v-94bf6e5f><!--[-->`);
            ssrRenderList(block.data?.images || [], (image, index) => {
              _push(`<figure data-v-94bf6e5f><img${ssrRenderAttr("src", image.url)}${ssrRenderAttr("alt", image.alt || "")} data-v-94bf6e5f>`);
              if (image.caption) {
                _push(`<figcaption data-v-94bf6e5f>${ssrInterpolate(image.caption)}</figcaption>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</figure>`);
            });
            _push(`<!--]--></div>`);
          } else if (block.type === "split") {
            _push(`<div class="split-block" data-v-94bf6e5f><div data-v-94bf6e5f>${ssrInterpolate(block.data?.leftContent)}</div><div data-v-94bf6e5f>${ssrInterpolate(block.data?.rightContent)}</div></div>`);
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
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-94bf6e5f"]]), { __name: "ContentBlockRenderer" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=ContentBlockRenderer-DijUswS0.mjs.map
