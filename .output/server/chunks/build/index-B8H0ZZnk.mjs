import { _ as __nuxt_component_0 } from './SectionHero-YXkF734E.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BzjT64JD.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { u as useAsyncData } from './asyncData-BKyabxD9.mjs';
import { q as queryCollection } from './client-D0D57WrC.mjs';
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
  __name: "RepositoryCard",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {},
    status: {},
    to: {},
    stack: {},
    progress: {},
    type: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        class: "repository-card",
        to: __props.to
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="repo-visual" data-v-30b9074e${_scopeId}></div><div class="repo-body" data-v-30b9074e${_scopeId}><div class="repo-top" data-v-30b9074e${_scopeId}><span class="status-badge" data-v-30b9074e${_scopeId}>${ssrInterpolate(__props.status)}</span><span class="muted" data-v-30b9074e${_scopeId}>${ssrInterpolate(__props.type ?? "Living dossier")}</span></div><h2 data-v-30b9074e${_scopeId}>${ssrInterpolate(__props.title)}</h2><p data-v-30b9074e${_scopeId}>${ssrInterpolate(__props.description)}</p><div class="repo-footer" data-v-30b9074e${_scopeId}>`);
            if (__props.stack?.length) {
              _push2(`<div class="stack" data-v-30b9074e${_scopeId}><!--[-->`);
              ssrRenderList(__props.stack.slice(0, 3), (item) => {
                _push2(`<span class="tag" data-v-30b9074e${_scopeId}>${ssrInterpolate(item)}</span>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="progress"${ssrRenderAttr("aria-label", `${__props.progress ?? 35}% progress`)} data-v-30b9074e${_scopeId}><span style="${ssrRenderStyle({ width: `${__props.progress ?? 35}%` })}" data-v-30b9074e${_scopeId}></span></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "repo-visual" }),
              createVNode("div", { class: "repo-body" }, [
                createVNode("div", { class: "repo-top" }, [
                  createVNode("span", { class: "status-badge" }, toDisplayString(__props.status), 1),
                  createVNode("span", { class: "muted" }, toDisplayString(__props.type ?? "Living dossier"), 1)
                ]),
                createVNode("h2", null, toDisplayString(__props.title), 1),
                createVNode("p", null, toDisplayString(__props.description), 1),
                createVNode("div", { class: "repo-footer" }, [
                  __props.stack?.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "stack"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.stack.slice(0, 3), (item) => {
                      return openBlock(), createBlock("span", {
                        key: item,
                        class: "tag"
                      }, toDisplayString(item), 1);
                    }), 128))
                  ])) : createCommentVNode("", true),
                  createVNode("div", {
                    class: "progress",
                    "aria-label": `${__props.progress ?? 35}% progress`
                  }, [
                    createVNode("span", {
                      style: { width: `${__props.progress ?? 35}%` }
                    }, null, 4)
                  ], 8, ["aria-label"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cards/RepositoryCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-30b9074e"]]), { __name: "RepositoryCard" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: projects } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("projects-list", () => queryCollection("projects").all())), __temp = await __temp, __restore(), __temp);
    useGriboSeo({
      title: "Repository | Gribo Digital",
      description: "Living project repository from the Gribo Digital lab.",
      ogTitle: "Gribo Repository",
      ogDescription: "Projects, prototypes, experiments and technical dossiers from Gribo Digital.",
      canonical: "https://gribo.digital/repository"
    });
    const filters = ["All", "Active", "Prototype", "Archived", "Research"];
    const mappedProjects = computed(() => (projects.value ?? []).map((project, index2) => ({
      title: project.title,
      description: project.description,
      status: project.status,
      to: project.path.replace("/projects/", "/repository/"),
      stack: project.stack ?? [],
      progress: [58, 31, 44, 66][index2] ?? 35,
      type: project.stack?.[0] ?? "Living dossier"
    })));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SectionHero = __nuxt_component_0;
      const _component_RepositoryCard = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content-shell repository-page" }, _attrs))} data-v-683d761d>`);
      _push(ssrRenderComponent(_component_SectionHero, {
        eyebrow: "Repository",
        title: "Living project repository.",
        description: "Projects, prototypes, experiments and technical dossiers from the Gribo lab. Not portfolio cards: living records with status, decisions and links."
      }, null, _parent));
      _push(`<nav class="filter-row" aria-label="Project filters" data-v-683d761d><!--[-->`);
      ssrRenderList(filters, (filter) => {
        _push(`<button type="button" class="${ssrRenderClass({ active: filter === "All" })}" data-v-683d761d>${ssrInterpolate(filter)}</button>`);
      });
      _push(`<!--]--></nav><section class="repository-grid" aria-label="Project repository" data-v-683d761d><!--[-->`);
      ssrRenderList(unref(mappedProjects), (project) => {
        _push(ssrRenderComponent(_component_RepositoryCard, {
          key: project.to,
          title: project.title,
          description: project.description,
          status: project.status,
          to: project.to,
          stack: project.stack,
          progress: project.progress,
          type: project.type
        }, null, _parent));
      });
      _push(`<!--]--></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/repository/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-683d761d"]]);

export { index as default };
//# sourceMappingURL=index-B8H0ZZnk.mjs.map
