import { toRef, isRef } from 'vue';
import { f as useRequestHeaders, g as useRequestURL, a as useNuxtApp } from './server.mjs';

const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (init) {
    nuxtApp._state[key] ??= { _default: init };
  }
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useStudioMediaLibrary() {
  const assets = useState("studio-media-assets", () => []);
  const pending = useState("studio-media-assets-pending", () => false);
  const error = useState("studio-media-assets-error", () => "");
  const mediaFetchHeaders = useRequestHeaders(["cookie"]);
  const mediaApiBase = useRequestURL().origin;
  const findAsset = (url) => assets.value.find((asset) => asset.url === url || asset.filename === url);
  const refreshAssets = async () => {
    pending.value = true;
    error.value = "";
    try {
      const response = await $fetch(`${mediaApiBase}/api/admin/media/list`, {
        headers: mediaFetchHeaders
      });
      assets.value = response.assets ?? [];
    } catch (fetchError) {
      error.value = fetchError?.data?.statusMessage || fetchError?.message || "Could not read media library.";
      assets.value = [];
    } finally {
      pending.value = false;
    }
  };
  const uploadAsset = async (file) => {
    pending.value = true;
    error.value = "";
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await $fetch(`${mediaApiBase}/api/admin/media/upload`, {
        method: "POST",
        headers: mediaFetchHeaders,
        body: formData
      });
      await refreshAssets();
      if (!assets.value.some((asset) => asset.url === response.asset.url)) {
        assets.value = [response.asset, ...assets.value];
      }
      return response.asset;
    } catch (uploadError) {
      error.value = uploadError?.data?.statusMessage || uploadError?.message || "Upload failed.";
      throw uploadError;
    } finally {
      pending.value = false;
    }
  };
  return {
    assets,
    pending,
    error,
    findAsset,
    refreshAssets,
    uploadAsset
  };
}

export { useStudioMediaLibrary as u };
//# sourceMappingURL=useStudioMediaLibrary-D3ln06-l.mjs.map
