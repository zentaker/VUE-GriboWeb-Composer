import { _ as __nuxt_component_0 } from './nuxt-link-BzjT64JD.mjs';
import { _ as __nuxt_component_1 } from './BrandMark-zj6wDjnk.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc, d as useRoute, n as navigateTo } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const username = ref("");
    const password = ref("");
    const initialError = String(route.query.error || "");
    const errorMessage = ref(
      initialError === "google_unauthorized" ? "This Google account is not authorized for Gribo Studio." : initialError
    );
    const isLoading = ref(false);
    const { data: session } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/auth/session",
      "$HF2gy7zWiZ"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const redirectPath = computed(() => {
      const value = route.query.redirect;
      return typeof value === "string" && value.startsWith("/admin") && value !== "/admin/login" ? value : "/admin";
    });
    if (session.value?.authenticated) {
      [__temp, __restore] = withAsyncContext(() => navigateTo(redirectPath.value)), await __temp, __restore();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_BrandMark = __nuxt_component_1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "login-shell" }, _attrs))} data-v-807dc8d3><section class="login-card" data-v-807dc8d3>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "brand login-brand",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_BrandMark, null, null, _parent2, _scopeId));
            _push2(`<span data-v-807dc8d3${_scopeId}>Gribo<br data-v-807dc8d3${_scopeId}><small data-v-807dc8d3${_scopeId}>Studio</small></span>`);
          } else {
            return [
              createVNode(_component_BrandMark),
              createVNode("span", null, [
                createTextVNode("Gribo"),
                createVNode("br"),
                createVNode("small", null, "Studio")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="login-copy" data-v-807dc8d3><p class="eyebrow" data-v-807dc8d3><span class="pulse" data-v-807dc8d3></span>Admin safety gate</p><h1 data-v-807dc8d3>Sign in to Gribo Studio.</h1><p data-v-807dc8d3> The public archive remains open. Editing surfaces and admin APIs require a valid session. </p></div><form class="login-form" data-v-807dc8d3><label data-v-807dc8d3><span data-v-807dc8d3>Username</span><input${ssrRenderAttr("value", unref(username))} autocomplete="username" name="username" required type="text" data-v-807dc8d3></label><label data-v-807dc8d3><span data-v-807dc8d3>Password</span><input${ssrRenderAttr("value", unref(password))} autocomplete="current-password" name="password" required type="password" data-v-807dc8d3></label>`);
      if (unref(session) && !unref(session).loginEnabled) {
        _push(`<p class="login-error" data-v-807dc8d3>${ssrInterpolate(unref(session).reason || "Admin login is not configured.")}</p>`);
      } else if (unref(errorMessage)) {
        _push(`<p class="login-error" data-v-807dc8d3>${ssrInterpolate(unref(errorMessage))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="studio-button primary"${ssrIncludeBooleanAttr(unref(isLoading) || unref(session) && !unref(session).loginEnabled) ? " disabled" : ""} type="submit" data-v-807dc8d3>${ssrInterpolate(unref(isLoading) ? "Signing in..." : "Login")}</button><div class="login-divider" data-v-807dc8d3><span data-v-807dc8d3>or</span></div><a class="${ssrRenderClass([{ disabled: unref(session) && !unref(session).googleLoginEnabled }, "studio-button google"])}" href="/api/auth/google" data-v-807dc8d3> Continue with Google </a>`);
      if (unref(session) && !unref(session).googleLoginEnabled) {
        _push(`<p class="login-hint" data-v-807dc8d3> Google login is available after OAuth variables are configured. </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></section></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-807dc8d3"]]);

export { login as default };
//# sourceMappingURL=login-aIjIfmDb.mjs.map
