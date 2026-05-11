import { _ as __nuxt_component_0$1 } from './nuxt-link-BzjT64JD.mjs';
import { _ as __nuxt_component_1$1 } from './BrandMark-zj6wDjnk.mjs';
import { mergeProps, withCtx, createVNode, createTextVNode, defineComponent, ref, withAsyncContext, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, d as useRoute } from './server.mjs';
import { _ as __nuxt_component_0$2 } from './StatusBadge-uJBngqGU.mjs';
import { _ as __nuxt_component_2 } from './ThemeToggle-CFtkI3XW.mjs';
import { u as useFetch } from './fetch-DJtx6Rcc.mjs';
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
import './asyncData-BKyabxD9.mjs';

const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$1;
  const _component_BrandMark = __nuxt_component_1$1;
  _push(`<aside${ssrRenderAttrs(mergeProps({ class: "studio-sidebar" }, _attrs))} data-v-2601b484>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "brand studio-brand",
    to: "/admin"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_BrandMark, null, null, _parent2, _scopeId));
        _push2(`<span data-v-2601b484${_scopeId}>Gribo<br data-v-2601b484${_scopeId}><small class="studio-label" data-v-2601b484${_scopeId}>Studio</small></span>`);
      } else {
        return [
          createVNode(_component_BrandMark),
          createVNode("span", null, [
            createTextVNode("Gribo"),
            createVNode("br"),
            createVNode("small", { class: "studio-label" }, "Studio")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<nav class="studio-nav" aria-label="Studio navigation" data-v-2601b484><p class="side-section-title" data-v-2601b484>Cockpit</p>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>O</span>Overview`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "O"),
          createTextVNode("Overview")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/home" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>H</span>Home Composer`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "H"),
          createTextVNode("Home Composer")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/queue" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>Q</span>Publish Queue`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "Q"),
          createTextVNode("Publish Queue")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p class="side-section-title" data-v-2601b484>Content</p>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/blog" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>B</span>Blog Entries`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "B"),
          createTextVNode("Blog Entries")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/projects" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>P</span>Repository Projects`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "P"),
          createTextVNode("Repository Projects")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/docs" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>D</span>Documentation`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "D"),
          createTextVNode("Documentation")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/labs" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>L</span>Labs`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "L"),
          createTextVNode("Labs")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/insights" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>I</span>Insights`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "I"),
          createTextVNode("Insights")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/media" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>M</span>Media Library`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "M"),
          createTextVNode("Media Library")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/backups" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>X</span>Backups`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "X"),
          createTextVNode("Backups")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/users" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>U</span>Admin Users`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "U"),
          createTextVNode("Admin Users")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p class="side-section-title" data-v-2601b484>Create / Composer</p>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/content/new?type=projects" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>P</span>New Project`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "P"),
          createTextVNode("New Project")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/content/new?type=blog&direct=true" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>B</span>New Blog Entry`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "B"),
          createTextVNode("New Blog Entry")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/content/new?type=docs" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>D</span>New Docs Page`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "D"),
          createTextVNode("New Docs Page")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/content/new?type=labs&direct=true" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>L</span>New Lab`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "L"),
          createTextVNode("New Lab")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/content/new?type=projects" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>C</span>Content Blocks`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "C"),
          createTextVNode("Content Blocks")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/media" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>M</span>Media Upload`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "M"),
          createTextVNode("Media Upload")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/content/new?type=projects" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>P</span>Preview`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "P"),
          createTextVNode("Preview")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/queue" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="nav-icon" data-v-2601b484${_scopeId}>↗</span>Publish Settings`);
      } else {
        return [
          createVNode("span", { class: "nav-icon" }, "↗"),
          createTextVNode("Publish Settings")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</nav><div class="side-card" data-v-2601b484><strong data-v-2601b484>ProjectComposer.vue</strong><p data-v-2601b484>Editing surface for content/projects/*.md, rich blocks, media references and markdown fallback.</p></div></aside>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminSidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-2601b484"]]), { __name: "AdminSidebar" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdminTopbar",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const isLoggingOut = ref(false);
    const route = useRoute();
    const { data: session } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/auth/session",
      "$Y0HEV7hJLW"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const composerSaveState = ref("idle");
    const composerTypeLabels = {
      blog: "Blog Composer",
      projects: "New Project Composer",
      project: "New Project Composer",
      docs: "Docs Composer",
      labs: "Lab Editor",
      lab: "Lab Editor"
    };
    const isComposerRoute = computed(() => route.path.startsWith("/admin/content/"));
    const composerType = computed(() => String(route.query.type || "projects"));
    const normalizedComposerType = computed(
      () => composerType.value === "project" ? "projects" : composerType.value === "lab" ? "labs" : composerType.value
    );
    const composerLabel = computed(() => composerTypeLabels[composerType.value] || "Content Composer");
    const isNewComposer = computed(() => route.path === "/admin/content/new");
    const isBlogEditComposer = computed(() => isComposerRoute.value && !isNewComposer.value && normalizedComposerType.value === "blog");
    const primaryActionLabel = computed(() => {
      if (isNewComposer.value && ["projects", "project"].includes(composerType.value)) return "Create project";
      if (isNewComposer.value) return "Create draft";
      return "Save changes";
    });
    const composerSaveLabel = computed(() => {
      if (composerSaveState.value === "saving") return "Saving...";
      if (composerSaveState.value === "saved") return "Saved";
      if (composerSaveState.value === "error") return "Save failed";
      return "Save draft";
    });
    const composerPrimaryActionLabel = computed(() => {
      if (composerSaveState.value === "saving") return "Saving...";
      if (composerSaveState.value === "saved") return "Saved";
      if (composerSaveState.value === "error") return "Try again";
      return primaryActionLabel.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StatusBadge = __nuxt_component_0$2;
      const _component_ThemeToggle = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "studio-topbar" }, _attrs))} data-v-e38081d0><div data-v-e38081d0><p class="crumbs" data-v-e38081d0><span data-v-e38081d0>Gribo Studio</span><span data-v-e38081d0>/</span><strong data-v-e38081d0>${ssrInterpolate(unref(isComposerRoute) ? unref(composerLabel) : "Admin Surface")}</strong></p></div><div class="studio-actions" data-v-e38081d0><button class="studio-button mobile-menu" type="button" data-v-e38081d0>Menu</button><div class="search" data-v-e38081d0><span data-v-e38081d0>${ssrInterpolate(unref(isComposerRoute) ? "Search blocks, media, snippets..." : "Search content, blocks, media...")}</span><span class="kbd" data-v-e38081d0>K</span></div>`);
      if (!unref(isComposerRoute)) {
        _push(ssrRenderComponent(_component_StatusBadge, { label: "Draft only" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(session)?.user) {
        _push(`<span class="session-pill" data-v-e38081d0>${ssrInterpolate(unref(session).user.name || unref(session).user.username)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ThemeToggle, null, null, _parent));
      if (unref(isComposerRoute)) {
        _push(`<!--[-->`);
        if (!unref(isBlogEditComposer)) {
          _push(`<button class="studio-button" type="button"${ssrIncludeBooleanAttr(unref(composerSaveState) === "saving") ? " disabled" : ""}${ssrRenderAttr("data-state", unref(composerSaveState))} data-v-e38081d0>${ssrInterpolate(unref(composerSaveLabel))}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="studio-button coral" type="button"${ssrIncludeBooleanAttr(unref(composerSaveState) === "saving") ? " disabled" : ""}${ssrRenderAttr("data-state", unref(composerSaveState))} data-v-e38081d0>${ssrInterpolate(unref(composerPrimaryActionLabel))}</button><!--]-->`);
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "studio-button primary",
          to: "/admin/content/new"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`New Draft`);
            } else {
              return [
                createTextVNode("New Draft")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`<button class="studio-button" type="button"${ssrIncludeBooleanAttr(unref(isLoggingOut)) ? " disabled" : ""} data-v-e38081d0>${ssrInterpolate(unref(isLoggingOut) ? "Logging out..." : "Logout")}</button></div></header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminTopbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-e38081d0"]]), { __name: "AdminTopbar" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AdminSidebar = __nuxt_component_0;
  const _component_AdminTopbar = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-shell" }, _attrs))} data-v-edd63569>`);
  _push(ssrRenderComponent(_component_AdminSidebar, null, null, _parent));
  _push(`<div class="studio-main" data-v-edd63569>`);
  _push(ssrRenderComponent(_component_AdminTopbar, null, null, _parent));
  _push(`<main data-v-edd63569>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-edd63569"]]);

export { admin as default };
//# sourceMappingURL=admin-DjcUabkv.mjs.map
