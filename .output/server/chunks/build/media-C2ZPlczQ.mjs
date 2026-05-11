import { _ as __nuxt_component_0 } from './AdminHero-lJqa4kRI.mjs';
import { defineComponent, ref, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useStudioMediaLibrary } from './useStudioMediaLibrary-D3ln06-l.mjs';
import { u as useAsyncData } from './asyncData-BKyabxD9.mjs';
import { _ as _export_sfc } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "media",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { assets, pending, error, refreshAssets } = useStudioMediaLibrary();
    ref(null);
    const uploadMessage = ref("");
    [__temp, __restore] = withAsyncContext(() => useAsyncData("admin-media-library-assets", () => refreshAssets().then(() => true))), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminHero = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-c4ae7af6><input class="visually-hidden-file" type="file" accept="image/jpeg,image/png,image/webp" data-v-c4ae7af6>`);
      _push(ssrRenderComponent(_component_AdminHero, {
        eyebrow: "Media Library",
        title: "Images, mockups, and visual references.",
        description: "Reusable visual assets from public/uploads for covers and image blocks. Upload JPG, PNG or WebP files and select them from the content composer."
      }, null, _parent));
      _push(`<div class="media-toolbar" data-v-c4ae7af6><button class="studio-btn" type="button" data-v-c4ae7af6>Upload image</button><button class="ghost-btn" type="button"${ssrIncludeBooleanAttr(unref(pending)) ? " disabled" : ""} data-v-c4ae7af6>${ssrInterpolate(unref(pending) ? "Reading media..." : "Refresh media")}</button>`);
      if (unref(uploadMessage)) {
        _push(`<p class="muted" data-v-c4ae7af6>${ssrInterpolate(unref(uploadMessage))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(error)) {
        _push(`<p class="muted" data-v-c4ae7af6>${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><section class="media-grid" data-v-c4ae7af6>`);
      if (!unref(assets).length) {
        _push(`<div class="empty-media" data-v-c4ae7af6><strong data-v-c4ae7af6>No media uploaded yet.</strong><p data-v-c4ae7af6>Upload a JPG, PNG or WebP image to make it available for covers and image blocks.</p><button class="studio-btn" type="button" data-v-c4ae7af6>Upload image</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(assets), (item) => {
        _push(`<article class="media-item" data-v-c4ae7af6><div class="media-thumb" data-v-c4ae7af6><img${ssrRenderAttr("src", item.url)}${ssrRenderAttr("alt", item.title)} data-v-c4ae7af6></div><div class="media-meta" data-v-c4ae7af6><strong data-v-c4ae7af6>${ssrInterpolate(item.title)}</strong><span data-v-c4ae7af6>${ssrInterpolate(item.filename)} · ${ssrInterpolate(item.usage)}</span></div></article>`);
      });
      _push(`<!--]--></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/media.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const media = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c4ae7af6"]]);

export { media as default };
//# sourceMappingURL=media-C2ZPlczQ.mjs.map
