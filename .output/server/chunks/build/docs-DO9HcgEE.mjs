import { _ as __nuxt_component_0 } from './PublicNav-DWZRNGW3.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BzjT64JD.mjs';
import { mergeProps, defineComponent, computed, withAsyncContext, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, d as useRoute } from './server.mjs';
import { u as useAsyncData } from './asyncData-BKyabxD9.mjs';
import { q as queryCollection } from './client-DE2-8xp2.mjs';
import './BrandMark-zj6wDjnk.mjs';
import './ThemeToggle-CFtkI3XW.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DocsSidebar",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = computed(() => {
      const value = route.params.slug;
      return Array.isArray(value) ? value.join("/") : String(value || "");
    });
    const docsFolder = computed(() => slug.value.split("/")[0] || "");
    const currentPath = computed(() => `/docs/${slug.value}`.replace(/\/index$/, ""));
    const { data: docs2 } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`docs-sidebar-${docsFolder.value}`, async () => {
      return await queryCollection("docs").all();
    })), __temp = await __temp, __restore(), __temp);
    const { data: projects } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`docs-sidebar-projects-${docsFolder.value}`, async () => {
      return await queryCollection("projects").all();
    })), __temp = await __temp, __restore(), __temp);
    const docPath = (doc) => doc.path || `/${doc.stem || ""}`.replace(/\/index$/, "");
    const normalizeDocRef = (value) => {
      const ref = String(value || "").trim();
      if (!ref) return "";
      return ref.startsWith("/docs/") ? ref.replace(/\/index$/, "") : `/docs/${ref}`.replace(/\/index$/, "");
    };
    const currentDoc = computed(() => (docs2.value ?? []).find((doc) => docPath(doc) === currentPath.value));
    const explicitProject = computed(() => {
      const current = currentPath.value;
      const candidates = projects.value ?? [];
      return candidates.find((project2) => {
        const refs = [
          ...Array.isArray(project2.relatedDocs) ? project2.relatedDocs : [],
          ...Array.isArray(project2.docsPaths) ? project2.docsPaths : [],
          project2.docsPath
        ].map(normalizeDocRef).filter(Boolean);
        return refs.includes(current);
      });
    });
    const fallbackProject = computed(() => {
      if (explicitProject.value) return explicitProject.value;
      const docProjectSlug = currentDoc.value?.projectSlug;
      if (docProjectSlug) {
        const bySlug = (projects.value ?? []).find((project2) => project2.slug === docProjectSlug);
        if (bySlug) return bySlug;
      }
      return (projects.value ?? []).find((project2) => project2.docsFolder && project2.docsFolder === docsFolder.value);
    });
    const project = computed(() => explicitProject.value ?? fallbackProject.value);
    const attachedDocRefs = computed(() => {
      const projectValue = project.value;
      if (!projectValue) return [];
      return [
        ...Array.isArray(projectValue.relatedDocs) ? projectValue.relatedDocs : [],
        ...Array.isArray(projectValue.docsPaths) ? projectValue.docsPaths : [],
        projectValue.docsPath
      ].map(normalizeDocRef).filter((item, index, list) => item && list.indexOf(item) === index);
    });
    const folderDocs = computed(
      () => (docs2.value ?? []).filter((doc) => {
        const path = docPath(doc);
        if (attachedDocRefs.value.length) return attachedDocRefs.value.includes(path);
        return path.startsWith(`/docs/${docsFolder.value}`);
      }).sort((a, b) => Number(a.order ?? 99) - Number(b.order ?? 99) || docPath(a).localeCompare(docPath(b)))
    );
    const projectSlug = computed(() => project.value?.slug || currentDoc.value?.projectSlug || "");
    const projectRoute = computed(() => projectSlug.value ? `/repository/${projectSlug.value}` : "/repository");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<aside${ssrRenderAttrs(mergeProps({
        class: "docs-sidebar",
        "aria-label": "Docs sidebar"
      }, _attrs))} data-v-3c42c38b><div class="side-title" data-v-3c42c38b>Start</div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "side-link",
        to: `/docs/${unref(docsFolder)}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Docs overview`);
          } else {
            return [
              createTextVNode("Docs overview")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "side-link",
        to: unref(projectRoute)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Project overview`);
          } else {
            return [
              createTextVNode("Project overview")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a class="side-link" href="#next" data-v-3c42c38b>Next steps</a><div class="side-title" data-v-3c42c38b>Documentation</div><!--[-->`);
      ssrRenderList(unref(folderDocs), (doc) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: docPath(doc),
          class: "side-link",
          to: docPath(doc)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(doc.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(doc.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (!unref(folderDocs).length) {
        _push(`<p class="side-note" data-v-3c42c38b>No docs found for this folder.</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="side-title" data-v-3c42c38b>Reference</div><a class="side-link" href="#content" data-v-3c42c38b>Content</a><a class="side-link" href="#next" data-v-3c42c38b>Next steps</a></aside>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/docs/DocsSidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-3c42c38b"]]), { __name: "DocsSidebar" });
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<aside${ssrRenderAttrs(mergeProps({
    class: "docs-toc",
    "aria-label": "On this page"
  }, _attrs))} data-v-2121aea7><h3 data-v-2121aea7>On this page</h3><a href="#content" data-v-2121aea7>Content</a><a href="#project-state" data-v-2121aea7>Project state</a><a href="#notes" data-v-2121aea7>Notes</a><a href="#next" data-v-2121aea7>Next steps</a><div class="mini-card" data-v-2121aea7><strong data-v-2121aea7>Project status</strong><p data-v-2121aea7>Active research. Public docs remain read-only in this stage.</p></div><div class="mini-card" data-v-2121aea7><strong data-v-2121aea7>Docs pattern</strong><p data-v-2121aea7>Technical documentation with Gribo&#39;s magazine-lab identity.</p></div></aside>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/docs/DocsToc.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-2121aea7"]]), { __name: "DocsToc" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_PublicNav = __nuxt_component_0;
  const _component_DocsSidebar = __nuxt_component_1;
  const _component_DocsToc = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "docs-shell" }, _attrs))} data-v-5829e9ea>`);
  _push(ssrRenderComponent(_component_PublicNav, null, null, _parent));
  _push(`<div class="docs-layout" data-v-5829e9ea>`);
  _push(ssrRenderComponent(_component_DocsSidebar, null, null, _parent));
  _push(`<main class="docs-main" data-v-5829e9ea>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_DocsToc, null, null, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/docs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const docs = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-5829e9ea"]]);

export { docs as default };
//# sourceMappingURL=docs-DO9HcgEE.mjs.map
