import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ArticleHero",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {},
    category: {},
    date: {},
    status: {},
    coverStyle: {},
    accentColor: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "article-hero" }, _attrs))} data-v-9ce963e4><div class="article-hero-grid" data-v-9ce963e4><div class="hero-copy" data-v-9ce963e4><div data-v-9ce963e4><p class="eyebrow" data-v-9ce963e4><span class="pulse" data-v-9ce963e4></span>${ssrInterpolate(__props.category ?? "Field note")}</p><h1 data-v-9ce963e4>${ssrInterpolate(__props.title)}</h1><p class="dek" data-v-9ce963e4>${ssrInterpolate(__props.description)}</p></div><div class="byline" data-v-9ce963e4><div data-v-9ce963e4><strong data-v-9ce963e4>Gribo Digital</strong><span data-v-9ce963e4>Editorial laboratory</span></div><div data-v-9ce963e4><strong data-v-9ce963e4>${ssrInterpolate(__props.date ?? "Draft")}</strong><span data-v-9ce963e4>${ssrInterpolate(__props.status ?? "working note")}</span></div></div></div><div class="${ssrRenderClass([`style-${__props.coverStyle || "editorial-gradient"}`, "hero-art"])}" style="${ssrRenderStyle({ "--cover-accent": `var(--${__props.accentColor || "coral"}, var(--coral))` })}" data-v-9ce963e4><div class="terminal-window" data-v-9ce963e4><div class="terminal-header" data-v-9ce963e4><span data-v-9ce963e4></span><span data-v-9ce963e4></span><span data-v-9ce963e4></span></div><div class="terminal-body" data-v-9ce963e4><div data-v-9ce963e4><b data-v-9ce963e4>$</b> gribo story inspect</div><div data-v-9ce963e4><em data-v-9ce963e4>✓</em> content: loaded</div><div data-v-9ce963e4><em data-v-9ce963e4>✓</em> archive: living</div><div data-v-9ce963e4><i data-v-9ce963e4>!</i> friction: visible</div><div data-v-9ce963e4><b data-v-9ce963e4>→</b> publish mode: editorial draft</div></div></div><div class="floating-note" data-v-9ce963e4>Systems become visible where promises meet setup, latency, interfaces, and maintenance.</div></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/ArticleHero.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-9ce963e4"]]), { __name: "ArticleHero" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=ArticleHero-Dixb1bez.mjs.map
