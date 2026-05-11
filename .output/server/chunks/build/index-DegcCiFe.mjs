import { _ as __nuxt_component_0$1 } from './nuxt-link-BzjT64JD.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { u as useFetch } from './fetch-DJtx6Rcc.mjs';
import { u as useAsyncData } from './asyncData-BKyabxD9.mjs';
import { q as queryCollection } from './client-WuVt3baQ.mjs';
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
import '@vue/shared';
import './composables-DkjhwBzb.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "HeroIntroBlock",
  __ssrInlineRender: true,
  props: {
    eyebrow: { default: "Digital systems magazine-lab" },
    title: { default: "Ideas that become systems." },
    subtitle: { default: "Gribo Digital documents systems, prototypes, research notes and cultural infrastructure through a living editorial archive." },
    primaryCtaLabel: { default: "Explore projects" },
    primaryCtaTo: { default: "/repository" },
    secondaryCtaLabel: { default: "Explore labs" },
    secondaryCtaTo: { default: "/labs" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "home-hero" }, _attrs))} data-v-5cd3ae7a><div class="hero-copy" data-v-5cd3ae7a><div data-v-5cd3ae7a><p class="eyebrow" data-v-5cd3ae7a><span class="pulse" data-v-5cd3ae7a></span>${ssrInterpolate(__props.eyebrow)}</p><h1 data-v-5cd3ae7a>${ssrInterpolate(__props.title)}</h1><p class="hero-subtitle" data-v-5cd3ae7a>${ssrInterpolate(__props.subtitle)}</p><div class="hero-actions" data-v-5cd3ae7a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "home-button primary",
        to: __props.primaryCtaTo
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.primaryCtaLabel)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.primaryCtaLabel), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "home-button secondary",
        to: __props.secondaryCtaTo
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.secondaryCtaLabel)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.secondaryCtaLabel), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="hero-side" data-v-5cd3ae7a>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/HeroIntroBlock.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$9, [["__scopeId", "data-v-5cd3ae7a"]]), { __name: "HeroIntroBlock" });
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "FeaturedProjectBlock",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {},
    tags: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "spotlight-card" }, _attrs))} data-v-6dd5c28a><div data-v-6dd5c28a><div class="card-label" data-v-6dd5c28a>Featured project</div><h2 data-v-6dd5c28a>${ssrInterpolate(__props.title)}</h2><p data-v-6dd5c28a>${ssrInterpolate(__props.description)}</p></div><div class="status-row" data-v-6dd5c28a><!--[-->`);
      ssrRenderList(__props.tags, (tag) => {
        _push(`<span class="tag" data-v-6dd5c28a>${ssrInterpolate(tag)}</span>`);
      });
      _push(`<!--]--></div></article>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/FeaturedProjectBlock.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$8, [["__scopeId", "data-v-6dd5c28a"]]), { __name: "FeaturedProjectBlock" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "BuildLogBlock",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({
        id: "log",
        class: "build-card"
      }, _attrs))} data-v-df3b9e46><h2 data-v-df3b9e46>Latest build log</h2><div class="build-list" data-v-df3b9e46><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<div class="build-item" data-v-df3b9e46><div class="build-date" data-v-df3b9e46>${ssrInterpolate(item.date)}</div><div data-v-df3b9e46><div class="build-title" data-v-df3b9e46>${ssrInterpolate(item.title)}</div><div class="build-meta" data-v-df3b9e46>${ssrInterpolate(item.meta)}</div></div></div>`);
      });
      _push(`<!--]--></div></article>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/BuildLogBlock.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$7, [["__scopeId", "data-v-df3b9e46"]]), { __name: "BuildLogBlock" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "LabsTracksBlock",
  __ssrInlineRender: true,
  props: {
    labs: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "tracks",
        class: "home-section"
      }, _attrs))} data-v-5ab93cb9><div class="section-title" data-v-5ab93cb9><h2 data-v-5ab93cb9>Project tracks</h2><p data-v-5ab93cb9>Living lines of research and development. Each track groups projects, notes, technical decisions, progress updates and editorial pieces.</p></div><div class="tracks" data-v-5ab93cb9><!--[-->`);
      ssrRenderList(__props.labs, (lab) => {
        _push(`<a class="track" href="#" data-v-5ab93cb9><div class="track-icon" data-v-5ab93cb9></div><div data-v-5ab93cb9><h3 data-v-5ab93cb9>${ssrInterpolate(lab.title)}</h3><p data-v-5ab93cb9>${ssrInterpolate(lab.description)}</p></div></a>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/LabsTracksBlock.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["__scopeId", "data-v-5ab93cb9"]]), { __name: "LabsTracksBlock" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ActiveProjectsBlock",
  __ssrInlineRender: true,
  props: {
    projects: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "projects",
        class: "home-section"
      }, _attrs))} data-v-ba61438e><div class="section-title" data-v-ba61438e><h2 data-v-ba61438e>Active projects</h2><p data-v-ba61438e>These are not portfolio cards. They are living dossiers: each project has a status, progress, decisions, links and a build log.</p></div><div class="project-grid" data-v-ba61438e><!--[-->`);
      ssrRenderList(__props.projects, (project, index2) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: project.title,
          class: ["home-project-card", { large: index2 === 0 }],
          to: project.to
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="visual" data-v-ba61438e${_scopeId}></div><div class="project-body" data-v-ba61438e${_scopeId}><div class="project-type" data-v-ba61438e${_scopeId}>${ssrInterpolate(project.type)}</div><h3 data-v-ba61438e${_scopeId}>${ssrInterpolate(project.title)}</h3><p data-v-ba61438e${_scopeId}>${ssrInterpolate(project.description)}</p><div class="project-footer" data-v-ba61438e${_scopeId}><span data-v-ba61438e${_scopeId}>Status: ${ssrInterpolate(project.status)}</span><div class="progress"${ssrRenderAttr("aria-label", `${project.progress}% progress`)} data-v-ba61438e${_scopeId}><span style="${ssrRenderStyle({ width: `${project.progress}%` })}" data-v-ba61438e${_scopeId}></span></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "visual" }),
                createVNode("div", { class: "project-body" }, [
                  createVNode("div", { class: "project-type" }, toDisplayString(project.type), 1),
                  createVNode("h3", null, toDisplayString(project.title), 1),
                  createVNode("p", null, toDisplayString(project.description), 1),
                  createVNode("div", { class: "project-footer" }, [
                    createVNode("span", null, "Status: " + toDisplayString(project.status), 1),
                    createVNode("div", {
                      class: "progress",
                      "aria-label": `${project.progress}% progress`
                    }, [
                      createVNode("span", {
                        style: { width: `${project.progress}%` }
                      }, null, 4)
                    ], 8, ["aria-label"])
                  ])
                ])
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/ActiveProjectsBlock.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$5, [["__scopeId", "data-v-ba61438e"]]), { __name: "ActiveProjectsBlock" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ManifestoBlock",
  __ssrInlineRender: true,
  props: {
    headline: { default: "Build, reflect, archive, evolve." },
    description: { default: "Gribo works like external memory: it records what is being built, what breaks, what changes and what eventually becomes a system." },
    ctaLabel: { default: "Explore labs" },
    ctaTarget: { default: "/labs" },
    showCta: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "thinking",
        class: "home-section thinking"
      }, _attrs))} data-v-a232e06e><div class="manifesto" data-v-a232e06e><h2 data-v-a232e06e>${ssrInterpolate(__props.headline)}</h2><div data-v-a232e06e><p data-v-a232e06e>${ssrInterpolate(__props.description)}</p>`);
      if (__props.showCta) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "manifesto-link",
          to: __props.ctaTarget
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.ctaLabel)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.ctaLabel), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/ManifestoBlock.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["__scopeId", "data-v-a232e06e"]]), { __name: "ManifestoBlock" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ThinkingArticlesBlock",
  __ssrInlineRender: true,
  props: {
    articles: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "articles" }, _attrs))} data-v-7acde0ef><!--[-->`);
      ssrRenderList(__props.articles, (article) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: article.title,
          class: "article",
          to: article.to
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="article-kicker" data-v-7acde0ef${_scopeId}>${ssrInterpolate(article.kicker)}</div><h3 data-v-7acde0ef${_scopeId}>${ssrInterpolate(article.title)}</h3><div class="article-arrow" data-v-7acde0ef${_scopeId}>-&gt;</div>`);
            } else {
              return [
                createVNode("div", { class: "article-kicker" }, toDisplayString(article.kicker), 1),
                createVNode("h3", null, toDisplayString(article.title), 1),
                createVNode("div", { class: "article-arrow" }, "->")
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/ThinkingArticlesBlock.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["__scopeId", "data-v-7acde0ef"]]), { __name: "ThinkingArticlesBlock" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NewsletterBlock",
  __ssrInlineRender: true,
  setup(__props) {
    const submitted = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "newsletter",
        class: "newsletter"
      }, _attrs))} data-v-74718aa0><div class="newsletter-inner" data-v-74718aa0><div data-v-74718aa0><h2 data-v-74718aa0>Follow the build.</h2><p data-v-74718aa0>Get progress notes, prototypes, essays and technical decisions from Gribo Digital.</p></div><form class="signup" data-v-74718aa0><input type="email" placeholder="you@email.com" aria-label="Email" disabled data-v-74718aa0><button type="submit" data-v-74718aa0>Subscribe</button>`);
      if (unref(submitted)) {
        _push(`<span class="mock-message" data-v-74718aa0>Subscription flow is a visual mock for now.</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/NewsletterBlock.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-74718aa0"]]), { __name: "NewsletterBlock" });
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "site-footer" }, _attrs))} data-v-dffc434e><p data-v-dffc434e>© 2026 Gribo Digital</p><nav aria-label="Footer navigation" data-v-dffc434e>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/repository" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Projects`);
      } else {
        return [
          createTextVNode("Projects")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/labs" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Labs`);
      } else {
        return [
          createTextVNode("Labs")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Blog`);
      } else {
        return [
          createTextVNode("Blog")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Studio`);
      } else {
        return [
          createTextVNode("Studio")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</nav></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/SiteFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_8 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-dffc434e"]]), { __name: "SiteFooter" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: homeLayoutResponse } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/home-layout",
      "$e2JrK9ON4p"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("home-blog", () => queryCollection("blog").order("date", "DESC").limit(4).all())), __temp = await __temp, __restore(), __temp);
    const { data: projects } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("home-projects", () => queryCollection("projects").limit(4).all())), __temp = await __temp, __restore(), __temp);
    const { data: contentLabs } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("home-labs", () => queryCollection("labs").order("order", "ASC").limit(5).all())), __temp = await __temp, __restore(), __temp);
    useGriboSeo({
      title: "Gribo Digital",
      description: "Editorial laboratory for digital systems, cultural infrastructure, and living research.",
      ogTitle: "Gribo Digital",
      ogDescription: "Systems, prototypes, research notes and cultural infrastructure through a living editorial archive.",
      canonical: "https://gribo.digital"
    });
    const fallbackBuildLogItems = [
      {
        date: "May 07",
        title: "Codex as an initial sandbox",
        meta: "Testing feasibility without starting from a cloud VM."
      },
      {
        date: "May 05",
        title: "Friction in autonomous agents",
        meta: "Editorial notes for a Gribo Digital post."
      },
      {
        date: "Apr 25",
        title: "Internet and server proximity",
        meta: "An essay about regional infrastructure and latency."
      }
    ];
    const fallbackLabs = [
      {
        title: "SysSecurity",
        description: "Security systems, threat models, operational trust, and defensive culture."
      },
      {
        title: "AI Systems",
        description: "Agents, model workflows, reasoning surfaces, and applied AI tooling."
      },
      {
        title: "Physics",
        description: "Physical intuition, simulation notes, measurement, and technical imagination."
      },
      {
        title: "SysArchitecture",
        description: "Infrastructure, product systems, event flows, and durable technical memory."
      },
      {
        title: "Data Science",
        description: "Signals, metrics, analysis pipelines, and interpretable research records."
      }
    ];
    const fallbackProjects = [
      {
        title: "Tennis Image Analysis Pipeline",
        description: "A technical repository for extracting court state, player posture, and tactical events from tennis image sequences.",
        status: "prototype",
        to: "/repository/tennis-image-analysis",
        progress: 58,
        type: "Computer vision / Research"
      },
      {
        title: "Gribo Park Concept Repository",
        description: "A concept archive for a spatial, playful way to browse cultural fragments, essays, and project artifacts.",
        status: "concept",
        to: "/repository/gribo-park",
        progress: 31,
        type: "Cultural infrastructure"
      },
      {
        title: "AI Agent Sandbox",
        description: "An exploration of how to test autonomous agents quickly, measurably, and cheaply before scaling to cloud infrastructure.",
        status: "active research",
        to: "/repository",
        progress: 35,
        type: "Developer tools"
      }
    ];
    const fallbackArticles = [
      {
        title: "The friction problem behind autonomous agent implementation",
        kicker: "Deep dive / AI Systems",
        to: "/blog/openclaw-friction"
      },
      {
        title: "Internet is not speed. It is server proximity.",
        kicker: "Essay / Infrastructure",
        to: "/blog/internet-proximity"
      },
      {
        title: "Why AI-native documentation is no longer a wiki",
        kicker: "Notes / Documentation",
        to: "/docs/tennis-ai-friction"
      }
    ];
    const layout = computed(() => homeLayoutResponse.value?.layout);
    const activeProjects = computed(() => {
      const contentProjects = (projects.value ?? []).map((project, index2) => ({
        title: project.title,
        description: project.description || project.summary || "A living project dossier from the Gribo archive.",
        status: project.status,
        to: `/repository/${project.slug}`,
        progress: [58, 31, 44, 63][index2] ?? 35,
        type: project.stack?.[0] ?? "Living research"
      }));
      return [...contentProjects, ...fallbackProjects].filter((project, index2, list) => list.findIndex((item) => item.title === project.title) === index2).slice(0, 4);
    });
    const labs = computed(() => {
      const mappedLabs = (contentLabs.value ?? []).map((lab) => ({
        title: lab.title,
        description: lab.description
      }));
      return mappedLabs.length ? mappedLabs : fallbackLabs;
    });
    const featuredProject = computed(() => {
      const configured = layout.value?.featuredProject;
      if (configured?.mode === "manual") {
        const selected = activeProjects.value.find((project) => project.to.endsWith(`/${configured.slug}`));
        if (selected) return selected;
      }
      return activeProjects.value[0] ?? fallbackProjects[0];
    });
    const buildLogItems = computed(() => {
      const configured = layout.value?.buildLog;
      const limit = configured?.limit ?? 3;
      if (configured?.mode === "manual" && configured.manualItems.length) {
        return configured.manualItems.slice(0, limit);
      }
      const latestPosts = (posts.value ?? []).map((post) => ({
        date: post.date ? new Date(post.date).toLocaleDateString("en", { month: "short", day: "2-digit" }) : "Now",
        title: post.title,
        meta: post.excerpt || post.description || "Editorial note from the Gribo archive."
      }));
      return [...latestPosts, ...fallbackBuildLogItems].slice(0, limit);
    });
    const thinkingArticles = computed(() => {
      const contentPosts = (posts.value ?? []).map((post) => ({
        title: post.title,
        kicker: `${post.category} / ${post.status ?? "draft"}`,
        to: post.path
      }));
      const contentProjects = activeProjects.value.map((project) => ({
        title: project.title,
        kicker: `Repository / ${project.status}`,
        to: project.to
      }));
      const contentLabItems = (contentLabs.value ?? []).map((lab) => ({
        title: lab.title,
        kicker: `Lab / ${lab.status}`,
        to: `/labs/${lab.slug}`
      }));
      const manualItems = layout.value?.feed?.manualItems ?? [];
      const manualResolved = manualItems.map((item) => {
        if (item.type === "blog") {
          const post = (posts.value ?? []).find((entry) => entry.slug === item.slug);
          return post ? { title: post.title, kicker: `Blog / ${post.status ?? "draft"}`, to: post.path } : null;
        }
        if (item.type === "projects") {
          const project = activeProjects.value.find((entry) => entry.to.endsWith(`/${item.slug}`));
          return project ? { title: project.title, kicker: `Repository / ${project.status}`, to: project.to } : null;
        }
        const lab = (contentLabs.value ?? []).find((entry) => entry.slug === item.slug);
        return lab ? { title: lab.title, kicker: `Lab / ${lab.status}`, to: `/labs/${lab.slug}` } : null;
      }).filter((item) => Boolean(item));
      const configured = layout.value?.feed;
      const limit = configured?.limit ?? 4;
      const allowedTypes = configured?.contentTypes?.length ? configured.contentTypes : ["blog", "projects"];
      const latestItems = [
        ...allowedTypes.includes("blog") ? contentPosts : [],
        ...allowedTypes.includes("projects") ? contentProjects : [],
        ...allowedTypes.includes("labs") ? contentLabItems : []
      ];
      const source = configured?.mode === "manual" ? manualResolved : configured?.mode === "mixed" ? [...manualResolved, ...latestItems] : latestItems;
      return [...source, ...fallbackArticles].filter((article, index2, list) => list.findIndex((item) => item.title === article.title) === index2).slice(0, limit);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeroIntroBlock = __nuxt_component_0;
      const _component_FeaturedProjectBlock = __nuxt_component_1;
      const _component_BuildLogBlock = __nuxt_component_2;
      const _component_LabsTracksBlock = __nuxt_component_3;
      const _component_ActiveProjectsBlock = __nuxt_component_4;
      const _component_ManifestoBlock = __nuxt_component_5;
      const _component_ThinkingArticlesBlock = __nuxt_component_6;
      const _component_NewsletterBlock = __nuxt_component_7;
      const _component_SiteFooter = __nuxt_component_8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content-shell home-page" }, _attrs))} data-v-9b4ab0db>`);
      _push(ssrRenderComponent(_component_HeroIntroBlock, {
        eyebrow: unref(layout)?.hero.label,
        title: unref(layout)?.hero.headline,
        subtitle: unref(layout)?.hero.description,
        "primary-cta-label": unref(layout)?.hero.primaryCta.label,
        "primary-cta-to": unref(layout)?.hero.primaryCta.to,
        "secondary-cta-label": unref(layout)?.hero.secondaryCta.label,
        "secondary-cta-to": unref(layout)?.hero.secondaryCta.to
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_FeaturedProjectBlock, {
              title: unref(featuredProject).title,
              description: unref(featuredProject).description,
              tags: [unref(featuredProject).status, unref(featuredProject).type, "Living research"]
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BuildLogBlock, { items: unref(buildLogItems) }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_FeaturedProjectBlock, {
                title: unref(featuredProject).title,
                description: unref(featuredProject).description,
                tags: [unref(featuredProject).status, unref(featuredProject).type, "Living research"]
              }, null, 8, ["title", "description", "tags"]),
              createVNode(_component_BuildLogBlock, { items: unref(buildLogItems) }, null, 8, ["items"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_LabsTracksBlock, { labs: unref(labs) }, null, _parent));
      _push(ssrRenderComponent(_component_ActiveProjectsBlock, { projects: unref(activeProjects) }, null, _parent));
      if (unref(layout)?.identity.enabled !== false) {
        _push(ssrRenderComponent(_component_ManifestoBlock, {
          headline: unref(layout)?.identity.headline,
          description: unref(layout)?.identity.description,
          "cta-label": unref(layout)?.identity.ctaLabel,
          "cta-target": unref(layout)?.identity.ctaTarget,
          "show-cta": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_ThinkingArticlesBlock, { articles: unref(thinkingArticles) }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_ThinkingArticlesBlock, { articles: unref(thinkingArticles) }, null, 8, ["articles"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NewsletterBlock, null, null, _parent));
      _push(ssrRenderComponent(_component_SiteFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9b4ab0db"]]);

export { index as default };
//# sourceMappingURL=index-DegcCiFe.mjs.map
