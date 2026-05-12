import { _ as __nuxt_component_0 } from './SectionHero-YXkF734E.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BzjT64JD.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { u as useAsyncData } from './asyncData-BKyabxD9.mjs';
import { q as queryCollection } from './client-B3SbGRe7.mjs';
import { u as useGriboSeo } from './useGriboSeo-VrGf0HFJ.mjs';
import '../_/nitro.mjs';
import 'node:crypto';
import 'node:fs/promises';
import 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import 'anymatch';
import 'vue-router';
import './composables-DkjhwBzb.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ArticleCard",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {},
    to: {},
    date: {},
    category: {},
    tags: {},
    readingTime: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        class: "article-card",
        to: __props.to
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="article-card-top" data-v-6403ab8c${_scopeId}><span class="status-badge" data-v-6403ab8c${_scopeId}>${ssrInterpolate(__props.category ?? "Field note")}</span><span class="muted" data-v-6403ab8c${_scopeId}>${ssrInterpolate(__props.readingTime ?? "4 min read")}</span></div><h2 data-v-6403ab8c${_scopeId}>${ssrInterpolate(__props.title)}</h2><p data-v-6403ab8c${_scopeId}>${ssrInterpolate(__props.description)}</p><div class="article-card-footer" data-v-6403ab8c${_scopeId}><span class="muted" data-v-6403ab8c${_scopeId}>${ssrInterpolate(__props.date ?? "Draft")}</span>`);
            if (__props.tags?.length) {
              _push2(`<div class="tags" data-v-6403ab8c${_scopeId}><!--[-->`);
              ssrRenderList(__props.tags.slice(0, 3), (tag) => {
                _push2(`<span class="tag" data-v-6403ab8c${_scopeId}>${ssrInterpolate(tag)}</span>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "article-card-top" }, [
                createVNode("span", { class: "status-badge" }, toDisplayString(__props.category ?? "Field note"), 1),
                createVNode("span", { class: "muted" }, toDisplayString(__props.readingTime ?? "4 min read"), 1)
              ]),
              createVNode("h2", null, toDisplayString(__props.title), 1),
              createVNode("p", null, toDisplayString(__props.description), 1),
              createVNode("div", { class: "article-card-footer" }, [
                createVNode("span", { class: "muted" }, toDisplayString(__props.date ?? "Draft"), 1),
                __props.tags?.length ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "tags"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.tags.slice(0, 3), (tag) => {
                    return openBlock(), createBlock("span", {
                      key: tag,
                      class: "tag"
                    }, toDisplayString(tag), 1);
                  }), 128))
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cards/ArticleCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-6403ab8c"]]), { __name: "ArticleCard" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("blog-list", () => queryCollection("blog").order("date", "DESC").all())), __temp = await __temp, __restore(), __temp);
    useGriboSeo({
      title: "Blog | Gribo Digital",
      description: "Editorial essays and research notes from Gribo Digital.",
      ogTitle: "Gribo Digital Blog",
      ogDescription: "Essays and research notes from the Gribo Digital editorial laboratory.",
      canonical: "https://gribo.digital/blog"
    });
    const filters = ["All", "AI Systems", "SysArchitecture", "Data Science", "Physics", "SysSecurity"];
    const formattedPosts = computed(() => (posts.value ?? []).filter((post) => String(post.status || "").toLowerCase() !== "archived").map((post) => ({
      title: post.title,
      description: post.description,
      to: post.path,
      date: post.date ? new Date(post.date).toLocaleDateString("en", { month: "short", day: "2-digit", year: "numeric" }) : "Draft",
      category: post.category ?? "Field note",
      tags: post.tags ?? [],
      readingTime: `${Math.max(3, Math.ceil((post.description?.length ?? 160) / 120))} min read`
    })));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SectionHero = __nuxt_component_0;
      const _component_ArticleCard = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content-shell blog-page" }, _attrs))} data-v-514f6f34>`);
      _push(ssrRenderComponent(_component_SectionHero, {
        eyebrow: "Magazine",
        title: "Essays from the editorial lab.",
        description: "Critical notes on software, culture, autonomy, interfaces, and the small frictions that shape digital systems."
      }, null, _parent));
      _push(`<nav class="filter-row" aria-label="Editorial tracks" data-v-514f6f34><!--[-->`);
      ssrRenderList(filters, (filter) => {
        _push(`<button type="button" class="${ssrRenderClass({ active: filter === "All" })}" data-v-514f6f34>${ssrInterpolate(filter)}</button>`);
      });
      _push(`<!--]--></nav><section class="article-grid" aria-label="Magazine articles" data-v-514f6f34><!--[-->`);
      ssrRenderList(unref(formattedPosts), (post) => {
        _push(ssrRenderComponent(_component_ArticleCard, {
          key: post.to,
          title: post.title,
          description: post.description,
          to: post.to,
          date: post.date,
          category: post.category,
          tags: post.tags,
          "reading-time": post.readingTime
        }, null, _parent));
      });
      _push(`<!--]--></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-514f6f34"]]);

export { index as default };
//# sourceMappingURL=index-Ct3fjKR1.mjs.map
