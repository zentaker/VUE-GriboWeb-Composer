import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './TagPill-7BHTscNI.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BzjT64JD.mjs';
import { _ as __nuxt_component_0$2 } from './StatusBadge-uJBngqGU.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { u as useAsyncData } from './asyncData-BKyabxD9.mjs';
import { q as queryCollection } from './client-BeWG7WkH.mjs';
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
  __name: "LabCard",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {},
    status: {},
    accent: {},
    tags: {},
    to: {},
    counts: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_StatusBadge = __nuxt_component_0$2;
      const _component_TagPill = __nuxt_component_2;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        class: ["lab-card", `accent-${__props.accent}`],
        to: __props.to
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="lab-card__top" data-v-0653add3${_scopeId}><span class="lab-orb" data-v-0653add3${_scopeId}></span>`);
            _push2(ssrRenderComponent(_component_StatusBadge, { label: __props.status }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-0653add3${_scopeId}><p class="eyebrow" data-v-0653add3${_scopeId}>Research line</p><h2 data-v-0653add3${_scopeId}>${ssrInterpolate(__props.title)}</h2><p class="description" data-v-0653add3${_scopeId}>${ssrInterpolate(__props.description)}</p></div><div class="tag-row" data-v-0653add3${_scopeId}><!--[-->`);
            ssrRenderList(__props.tags.slice(0, 4), (tag) => {
              _push2(ssrRenderComponent(_component_TagPill, {
                key: tag,
                label: tag
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div><dl class="lab-stats" data-v-0653add3${_scopeId}><div data-v-0653add3${_scopeId}><dt data-v-0653add3${_scopeId}>Posts</dt><dd data-v-0653add3${_scopeId}>${ssrInterpolate(__props.counts.posts)}</dd></div><div data-v-0653add3${_scopeId}><dt data-v-0653add3${_scopeId}>Projects</dt><dd data-v-0653add3${_scopeId}>${ssrInterpolate(__props.counts.projects)}</dd></div><div data-v-0653add3${_scopeId}><dt data-v-0653add3${_scopeId}>Docs</dt><dd data-v-0653add3${_scopeId}>${ssrInterpolate(__props.counts.docs)}</dd></div></dl>`);
          } else {
            return [
              createVNode("div", { class: "lab-card__top" }, [
                createVNode("span", { class: "lab-orb" }),
                createVNode(_component_StatusBadge, { label: __props.status }, null, 8, ["label"])
              ]),
              createVNode("div", null, [
                createVNode("p", { class: "eyebrow" }, "Research line"),
                createVNode("h2", null, toDisplayString(__props.title), 1),
                createVNode("p", { class: "description" }, toDisplayString(__props.description), 1)
              ]),
              createVNode("div", { class: "tag-row" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.tags.slice(0, 4), (tag) => {
                  return openBlock(), createBlock(_component_TagPill, {
                    key: tag,
                    label: tag
                  }, null, 8, ["label"]);
                }), 128))
              ]),
              createVNode("dl", { class: "lab-stats" }, [
                createVNode("div", null, [
                  createVNode("dt", null, "Posts"),
                  createVNode("dd", null, toDisplayString(__props.counts.posts), 1)
                ]),
                createVNode("div", null, [
                  createVNode("dt", null, "Projects"),
                  createVNode("dd", null, toDisplayString(__props.counts.projects), 1)
                ]),
                createVNode("div", null, [
                  createVNode("dt", null, "Docs"),
                  createVNode("dd", null, toDisplayString(__props.counts.docs), 1)
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cards/LabCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-0653add3"]]), { __name: "LabCard" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: labs } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("labs-list", () => queryCollection("labs").order("order", "ASC").all())), __temp = await __temp, __restore(), __temp);
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("labs-blog-counts", () => queryCollection("blog").all())), __temp = await __temp, __restore(), __temp);
    const { data: projects } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("labs-project-counts", () => queryCollection("projects").all())), __temp = await __temp, __restore(), __temp);
    const { data: docs } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("labs-doc-counts", () => queryCollection("docs").all())), __temp = await __temp, __restore(), __temp);
    useGriboSeo({
      title: "Labs | Gribo Digital",
      description: "Editorial research lines for digital systems, cultural infrastructure, and living research.",
      ogTitle: "Gribo Labs",
      ogDescription: "Research lines that group Gribo projects, essays, documentation and open questions.",
      canonical: "https://gribo.digital/labs"
    });
    const labCounts = (slug) => ({
      posts: (posts.value ?? []).filter((post) => post.lab === slug).length,
      projects: (projects.value ?? []).filter((project) => project.lab === slug).length,
      docs: (docs.value ?? []).filter((doc) => doc.lab === slug).length
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LabHero = __nuxt_component_0;
      const _component_LabCard = __nuxt_component_1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "content-shell labs-page" }, _attrs))} data-v-38400b31>`);
      _push(ssrRenderComponent(_component_LabHero, {
        eyebrow: "Research map",
        title: "Gribo Labs",
        description: "Editorial research lines for digital systems, cultural infrastructure, and living research."
      }, null, _parent));
      _push(`<section class="labs-intro" data-v-38400b31><p data-v-38400b31> Labs are the living areas where Gribo groups projects, essays, documentation and open questions. Each lab works as a research line, not just a category. </p></section><section class="labs-grid" aria-label="Gribo research lines" data-v-38400b31><!--[-->`);
      ssrRenderList(unref(labs), (lab) => {
        _push(ssrRenderComponent(_component_LabCard, {
          key: lab.slug,
          title: lab.title,
          description: lab.description,
          status: lab.status,
          accent: lab.accent,
          tags: lab.relatedTags ?? [],
          to: `/labs/${lab.slug}`,
          counts: labCounts(lab.slug)
        }, null, _parent));
      });
      _push(`<!--]--></section><section class="why-labs" data-v-38400b31><p class="eyebrow" data-v-38400b31><span class="pulse" data-v-38400b31></span>Why labs?</p><h2 data-v-38400b31>Research lines keep Gribo from becoming a drawer of disconnected artifacts.</h2><p data-v-38400b31> Labs let projects, essays and technical documentation accumulate over time. A project can begin as a small experiment, produce a note, grow documentation, and later become part of a larger editorial memory. </p></section></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/labs/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-38400b31"]]);

export { index as default };
//# sourceMappingURL=index-D0FQAyoN.mjs.map
