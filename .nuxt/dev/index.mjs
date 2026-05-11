import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { Server } from 'node:http';
import { resolve, dirname, basename, relative, join, extname, isAbsolute as isAbsolute$1, sep } from 'node:path';
import nodeCrypto, { randomBytes, scryptSync, timingSafeEqual, createHmac, createHash, randomUUID } from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, createError, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, setCookie, deleteCookie, getCookie, getHeader, getQuery as getQuery$1, readBody, getRouterParam, setHeader, getResponseStatus, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, readMultipartFormData, getResponseStatusText } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/h3/dist/index.mjs';
import { escapeHtml } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/@vue/shared/dist/shared.cjs.js';
import viteNodeEntry_mjs from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/@nuxt/vite-builder/dist/vite-node-entry.mjs';
import { viteNodeFetch } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/@nuxt/vite-builder/dist/vite-node.mjs';
import { readFile, mkdir, writeFile, stat, readdir, access, rename } from 'node:fs/promises';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, encodePath, joinRelativeURL } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/ufo/dist/index.mjs';
import destr, { destr as destr$1 } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/destr/dist/index.mjs';
import { renderToString } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/vue/server-renderer/index.mjs';
import { klona } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/scule/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/unhead/dist/server.mjs';
import { stringify, uneval } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/devalue/index.js';
import { isVNode, isRef, toValue } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/vue/index.mjs';
import { createHooks } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/unstorage/drivers/fs.mjs';
import file_58_47_47_47C_58_47Users_47MSI_47Desktop_47GriboWeb_47node_modules_47_64nuxt_47nitro_45server_47dist_47runtime_47utils_47cache_45driver_46js from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js';
import { digest } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/ohash/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/radix3/dist/index.mjs';
import consola, { consola as consola$1 } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/youch-core/build/index.js';
import { Youch } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getContext } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/unctx/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/errx/dist/index.js';
import _wH6JrtIxmaSoA8lCPWFnE9z4lQeXW6H5z3l5aymEQw from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/@nuxt/vite-builder/dist/fix-stacktrace.mjs';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1, isAbsolute } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/pathe/dist/index.mjs';
import { walkResolver } from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/unhead/dist/utils.mjs';
import sqliteConnector from 'file://C:/Users/MSI/Desktop/GriboWeb/node_modules/db0/dist/connectors/node-sqlite.mjs';

const serverAssets = [{"baseName":"server","dir":"C:/Users/MSI/Desktop/GriboWeb/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('adminUsers', unstorage_47drivers_47fs({"driver":"fs","base":"./server/data"}));
storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/MSI/Desktop/GriboWeb","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/MSI/Desktop/GriboWeb/server","watchOptions":{"ignored":[null]}}));
storage.mount('cache:nuxt:payload', file_58_47_47_47C_58_47Users_47MSI_47Desktop_47GriboWeb_47node_modules_47_64nuxt_47nitro_45server_47dist_47runtime_47utils_47cache_45driver_46js({"driver":"file:///C:/Users/MSI/Desktop/GriboWeb/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js","base":"C:/Users/MSI/Desktop/GriboWeb/.nuxt/cache/nuxt/payload"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/MSI/Desktop/GriboWeb/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/MSI/Desktop/GriboWeb/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"C:/Users/MSI/Desktop/GriboWeb/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/__nuxt_content/**": {
        "robots": false,
        "cache": false
      },
      "/__nuxt_content/blog/sql_dump.txt": {
        "prerender": true
      },
      "/__nuxt_content/projects/sql_dump.txt": {
        "prerender": true
      },
      "/__nuxt_content/docs/sql_dump.txt": {
        "prerender": true
      },
      "/__nuxt_content/labs/sql_dump.txt": {
        "prerender": true
      },
      "/__nuxt_content/home/sql_dump.txt": {
        "prerender": true
      },
      "/__nuxt_content/settings/sql_dump.txt": {
        "prerender": true
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/__nuxt_content/blog/sql_dump.txt/_payload.json": {
        "prerender": true
      },
      "/__nuxt_content/projects/sql_dump.txt/_payload.json": {
        "prerender": true
      },
      "/__nuxt_content/docs/sql_dump.txt/_payload.json": {
        "prerender": true
      },
      "/__nuxt_content/labs/sql_dump.txt/_payload.json": {
        "prerender": true
      },
      "/__nuxt_content/home/sql_dump.txt/_payload.json": {
        "prerender": true
      },
      "/__nuxt_content/settings/sql_dump.txt/_payload.json": {
        "prerender": true
      }
    }
  },
  "public": {
    "mdc": {
      "components": {
        "prose": true,
        "map": {},
        "customElements": []
      },
      "headings": {
        "anchorLinks": {
          "h1": false,
          "h2": true,
          "h3": true,
          "h4": true,
          "h5": false,
          "h6": false
        }
      },
      "highlight": {
        "noApiRoute": true,
        "highlighter": "shiki",
        "theme": {
          "default": "github-light",
          "dark": "github-dark"
        },
        "shikiEngine": "oniguruma",
        "langs": [
          "js",
          "jsx",
          "json",
          "ts",
          "tsx",
          "vue",
          "css",
          "html",
          "bash",
          "md",
          "mdc",
          "yaml"
        ]
      }
    },
    "content": {
      "wsUrl": ""
    }
  },
  "content": {
    "databaseVersion": "v3.5.0",
    "version": "3.13.0",
    "database": {
      "type": "sqlite",
      "filename": "./contents.sqlite"
    },
    "localDatabase": {
      "type": "sqlite",
      "filename": "C:/Users/MSI/Desktop/GriboWeb/.data/content/contents.sqlite"
    },
    "integrityCheck": true
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function isPathInScope(pathname, base) {
  let canonical;
  try {
    const pre = pathname.replace(/%2f/gi, "/").replace(/%5c/gi, "\\");
    canonical = new URL(pre, "http://_").pathname;
  } catch {
    return false;
  }
  return !base || canonical === base || canonical.startsWith(base + "/");
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
	
	if (hasReqHeader(event, "accept", "text/html")) {
		return false;
	}
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader(event, name);
	return !!(value && typeof value === "string" && value.toLowerCase().includes(includes));
}

const iframeStorageBridge = (nonce) => `
(function () {
  const NONCE = ${JSON.stringify(nonce)};
  const memoryStore = Object.create(null);

  const post = (type, payload) => {
    window.parent.postMessage({ type, nonce: NONCE, ...payload }, '*');
  };

  const isValid = (data) => data && data.nonce === NONCE;

  const mockStorage = {
    getItem(key) {
      return Object.hasOwn(memoryStore, key)
        ? memoryStore[key]
        : null;
    },
    setItem(key, value) {
      const v = String(value);
      memoryStore[key] = v;
      post('storage-set', { key, value: v });
    },
    removeItem(key) {
      delete memoryStore[key];
      post('storage-remove', { key });
    },
    clear() {
      for (const key of Object.keys(memoryStore))
        delete memoryStore[key];
      post('storage-clear', {});
    },
    key(index) {
      const keys = Object.keys(memoryStore);
      return keys[index] ?? null;
    },
    get length() {
      return Object.keys(memoryStore).length;
    }
  };

  const defineLocalStorage = () => {
    try {
      Object.defineProperty(window, 'localStorage', {
        value: mockStorage,
        writable: false,
        configurable: true
      });
    } catch {
      window.localStorage = mockStorage;
    }
  };

  defineLocalStorage();

  window.addEventListener('message', (event) => {
    const data = event.data;
    if (!isValid(data) || data.type !== 'storage-sync-data') return;

    const incoming = data.data || {};
    for (const key of Object.keys(incoming))
      memoryStore[key] = incoming[key];

    if (typeof window.initTheme === 'function')
      window.initTheme();
    window.dispatchEvent(new Event('storage-ready'));
  });

  // Clipboard API is unavailable in data: URL iframe, so we use postMessage
  document.addEventListener('DOMContentLoaded', function() {
    window.copyErrorMessage = function(button) {
      post('clipboard-copy', { text: button.dataset.errorText });
      button.classList.add('copied');
      setTimeout(function() { button.classList.remove('copied'); }, 2000);
    };
  });

  post('storage-sync-request', {});
})();
`;
const parentStorageBridge = (nonce) => `
(function () {
  const host = document.querySelector('nuxt-error-overlay');
  if (!host) return;

  const NONCE = ${JSON.stringify(nonce)};
  const isValid = (data) => data && data.nonce === NONCE;

  // Handle clipboard copy from iframe
  window.addEventListener('message', function(e) {
    if (isValid(e) && e.data.type === 'clipboard-copy') {
      navigator.clipboard.writeText(e.data.text).catch(function() {});
    }
  });

  const collectLocalStorage = () => {
    const all = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k != null) all[k] = localStorage.getItem(k);
    }
    return all;
  };

  const attachWhenReady = () => {
    const root = host.shadowRoot;
    if (!root)
      return false;
    const iframe = root.getElementById('frame');
    if (!iframe || !iframe.contentWindow)
      return false;

    const handlers = {
      'storage-set': (d) => localStorage.setItem(d.key, d.value),
      'storage-remove': (d) => localStorage.removeItem(d.key),
      'storage-clear': () => localStorage.clear(),
      'storage-sync-request': () => {
        iframe.contentWindow.postMessage({
          type: 'storage-sync-data',
          data: collectLocalStorage(),
          nonce: NONCE
        }, '*');
      }
    };

    window.addEventListener('message', (event) => {
      const data = event.data;
      if (!isValid(data)) return;
      const fn = handlers[data.type];
      if (fn) fn(data);
    });

    return true;
  };

  if (attachWhenReady())
    return;

  const obs = new MutationObserver(() => {
    if (attachWhenReady())
      obs.disconnect();
  });

  obs.observe(host, { childList: true, subtree: true });
})();
`;
const errorCSS = `
:host {
  --preview-width: 240px;
  --preview-height: 180px;
  --base-width: 1200px;
  --base-height: 900px;
  --z-base: 999999998;
  --error-pip-left: auto;
  --error-pip-top: auto;
  --error-pip-right: 5px;
  --error-pip-bottom: 5px;
  --error-pip-origin: bottom right;
  --app-preview-left: auto;
  --app-preview-top: auto;
  --app-preview-right: 5px;
  --app-preview-bottom: 5px;
  all: initial;
  display: contents;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
#frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  z-index: var(--z-base);
}
#frame[inert] {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: var(--error-pip-right);
  bottom: var(--error-pip-bottom);
  width: var(--base-width);
  height: var(--base-height);
  transform: scale(calc(240 / 1200));
  transform-origin: var(--error-pip-origin);
  overflow: hidden;
  border-radius: calc(1200 * 8px / 240);
}
#preview {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: var(--app-preview-right);
  bottom: var(--app-preview-bottom);
  width: var(--preview-width);
  height: var(--preview-height);
  overflow: hidden;
  border-radius: 6px;
  pointer-events: none;
  z-index: var(--z-base);
  background: white;
  display: none;
}
#preview iframe {
  transform-origin: var(--error-pip-origin);
}
#frame:not([inert]) + #preview {
  display: block;
}
#toggle {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: calc(var(--app-preview-right) - 3px);
  bottom: calc(var(--app-preview-bottom) - 3px);
  width: var(--preview-width);
  height: var(--preview-height);
  background: none;
  border: 3px solid #00DC82;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s, box-shadow 0.2s;
  z-index: calc(var(--z-base) + 1);
  display: flex;
  align-items: center;
  justify-content: center;
}
#toggle:hover,
#toggle:focus {
  opacity: 1;
  box-shadow: 0 0 20px rgba(0, 220, 130, 0.6);
}
#toggle:focus-visible {
  outline: 3px solid #00DC82;
  outline-offset: 0;
  box-shadow: 0 0 24px rgba(0, 220, 130, 0.8);
}
#frame[inert] ~ #toggle {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: calc(var(--error-pip-right) - 3px);
  bottom: calc(var(--error-pip-bottom) - 3px);
  cursor: grab;
}
:host(.dragging) #frame[inert] ~ #toggle {
  cursor: grabbing;
}
#frame:not([inert]) ~ #toggle,
#frame:not([inert]) + #preview {
  cursor: grab;
}
:host(.dragging-preview) #frame:not([inert]) ~ #toggle,
:host(.dragging-preview) #frame:not([inert]) + #preview {
  cursor: grabbing;
}

#pip-close {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 16px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
}
#pip-close:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}

#pip-restore {
  position: fixed;
  right: 16px;
  bottom: 16px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 2px solid #00DC82;
  background: #111;
  color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  z-index: calc(var(--z-base) + 2);
  cursor: grab;
}
#pip-restore:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}
:host(.dragging-restore) #pip-restore {
  cursor: grabbing;
}

#frame[hidden],
#toggle[hidden],
#preview[hidden],
#pip-restore[hidden],
#pip-close[hidden] {
  display: none !important;
}

@media (prefers-reduced-motion: reduce) {
  #toggle {
    transition: none;
  }
}
`;
function webComponentScript(base64HTML, startMinimized) {
	return `
(function () {
  try {
    // =========================
    // Host + Shadow
    // =========================
    const host = document.querySelector('nuxt-error-overlay');
    if (!host)
      return;
    const shadow = host.attachShadow({ mode: 'open' });

    // =========================
    // DOM helpers
    // =========================
    const el = (tag) => document.createElement(tag);
    const on = (node, type, fn, opts) => node.addEventListener(type, fn, opts);
    const hide = (node, v) => node.toggleAttribute('hidden', !!v);
    const setVar = (name, value) => host.style.setProperty(name, value);
    const unsetVar = (name) => host.style.removeProperty(name);

    // =========================
    // Create DOM
    // =========================
    const style = el('style');
    style.textContent = ${JSON.stringify(errorCSS)};

    const iframe = el('iframe');
    iframe.id = 'frame';
    iframe.src = 'data:text/html;base64,${base64HTML}';
    iframe.title = 'Detailed error stack trace';
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-top-navigation-by-user-activation');

    const preview = el('div');
    preview.id = 'preview';

    const toggle = el('div');
    toggle.id = 'toggle';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    toggle.innerHTML = '<span class="sr-only">Toggle detailed error view</span>';

    const liveRegion = el('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';

    const pipCloseButton = el('button');
    pipCloseButton.id = 'pip-close';
    pipCloseButton.setAttribute('type', 'button');
    pipCloseButton.setAttribute('aria-label', 'Hide error preview overlay');
    pipCloseButton.innerHTML = '&times;';
    pipCloseButton.hidden = true;
    toggle.appendChild(pipCloseButton);

    const pipRestoreButton = el('button');
    pipRestoreButton.id = 'pip-restore';
    pipRestoreButton.setAttribute('type', 'button');
    pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
    pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
    pipRestoreButton.hidden = true;

    // Order matters: #frame + #preview adjacency
    shadow.appendChild(style);
    shadow.appendChild(liveRegion);
    shadow.appendChild(iframe);
    shadow.appendChild(preview);
    shadow.appendChild(toggle);
    shadow.appendChild(pipRestoreButton);

    // =========================
    // Constants / keys
    // =========================
    const POS_KEYS = {
      position: 'nuxt-error-overlay:position',
      hiddenPretty: 'nuxt-error-overlay:error-pip:hidden',
      hiddenPreview: 'nuxt-error-overlay:app-preview:hidden'
    };

    const CSS_VARS = {
      pip: {
        left: '--error-pip-left',
        top: '--error-pip-top',
        right: '--error-pip-right',
        bottom: '--error-pip-bottom'
      },
      preview: {
        left: '--app-preview-left',
        top: '--app-preview-top',
        right: '--app-preview-right',
        bottom: '--app-preview-bottom'
      }
    };

    const MIN_GAP = 5;
    const DRAG_THRESHOLD = 2;

    // =========================
    // Local storage safe access + state
    // =========================
    let storageReady = true;
    let isPrettyHidden = false;
    let isPreviewHidden = false;

    const safeGet = (k) => {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    };

    const safeSet = (k, v) => {
      if (!storageReady) 
        return;
      try {
        localStorage.setItem(k, v);
      } catch {}
    };

    // =========================
    // Sizing helpers
    // =========================
    const vvSize = () => {
      const v = window.visualViewport;
      return v ? { w: v.width, h: v.height } : { w: window.innerWidth, h: window.innerHeight };
    };

    const previewSize = () => {
      const styles = getComputedStyle(host);
      const w = parseFloat(styles.getPropertyValue('--preview-width')) || 240;
      const h = parseFloat(styles.getPropertyValue('--preview-height')) || 180;
      return { w, h };
    };

    const sizeForTarget = (target) => {
      if (!target)
        return previewSize();
      const rect = target.getBoundingClientRect();
      if (rect.width && rect.height)
        return { w: rect.width, h: rect.height };
      return previewSize();
    };

    // =========================
    // Dock model + offset/alignment calculations
    // =========================
    const dock = { edge: null, offset: null, align: null, gap: null };

    const maxOffsetFor = (edge, size) => {
      const vv = vvSize();
      if (edge === 'left' || edge === 'right')
        return Math.max(MIN_GAP, vv.h - size.h - MIN_GAP);
      return Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
    };

    const clampOffset = (edge, value, size) => {
      const max = maxOffsetFor(edge, size);
      return Math.min(Math.max(value, MIN_GAP), max);
    };

    const updateDockAlignment = (size) => {
      if (!dock.edge || dock.offset == null)
        return;
      const max = maxOffsetFor(dock.edge, size);
      if (dock.offset <= max / 2) {
        dock.align = 'start';
        dock.gap = dock.offset;
      } else {
        dock.align = 'end';
        dock.gap = Math.max(0, max - dock.offset);
      }
    };

    const appliedOffsetFor = (size) => {
      if (!dock.edge || dock.offset == null)
        return null;
      const max = maxOffsetFor(dock.edge, size);

      if (dock.align === 'end' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, max - dock.gap, size);
      }
      if (dock.align === 'start' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, dock.gap, size);
      }
      return clampOffset(dock.edge, dock.offset, size);
    };

    const nearestEdgeAt = (x, y) => {
      const { w, h } = vvSize();
      const d = { left: x, right: w - x, top: y, bottom: h - y };
      return Object.keys(d).reduce((a, b) => (d[a] < d[b] ? a : b));
    };

    const cornerDefaultDock = () => {
      const vv = vvSize();
      const size = previewSize();
      const offset = Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
      return { edge: 'bottom', offset };
    };

    const currentTransformOrigin = () => {
      if (!dock.edge) return null;
      if (dock.edge === 'left' || dock.edge === 'top')
        return 'top left';
      if (dock.edge === 'right')
        return 'top right';
      return 'bottom left';
    };

    // =========================
    // Persist / load dock
    // =========================
    const loadDock = () => {
      const raw = safeGet(POS_KEYS.position);
      if (!raw)
        return;
      try {
        const parsed = JSON.parse(raw);
        const { edge, offset, align, gap } = parsed || {};
        if (!['left', 'right', 'top', 'bottom'].includes(edge))
          return;
        if (typeof offset !== 'number')
          return;

        dock.edge = edge;
        dock.offset = clampOffset(edge, offset, previewSize());
        dock.align = align === 'start' || align === 'end' ? align : null;
        dock.gap = typeof gap === 'number' ? gap : null;

        if (!dock.align || dock.gap == null)
          updateDockAlignment(previewSize());
      } catch {}
    };

    const persistDock = () => {
      if (!dock.edge || dock.offset == null)
        return; 
      safeSet(POS_KEYS.position, JSON.stringify({
        edge: dock.edge,
        offset: dock.offset,
        align: dock.align,
        gap: dock.gap
      }));
    };

    // =========================
    // Apply dock
    // =========================
    const dockToVars = (vars) => ({
      set: (side, v) => host.style.setProperty(vars[side], v),
      clear: (side) => host.style.removeProperty(vars[side])
    });

    const dockToEl = (node) => ({
      set: (side, v) => { node.style[side] = v; },
      clear: (side) => { node.style[side] = ''; }
    });

    const applyDock = (target, size, opts) => {
      if (!dock.edge || dock.offset == null) {
        target.clear('left');
        target.clear('top');
        target.clear('right');
        target.clear('bottom');
        return;
      }

      target.set('left', 'auto');
      target.set('top', 'auto');
      target.set('right', 'auto');
      target.set('bottom', 'auto');

      const applied = appliedOffsetFor(size);

      if (dock.edge === 'left') {
        target.set('left', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'right') {
        target.set('right', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'top') {
        target.set('top', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      } else {
        target.set('bottom', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      }

      if (!opts || opts.persist !== false)
        persistDock();
    };

    const applyDockAll = (opts) => {
      applyDock(dockToVars(CSS_VARS.pip), previewSize(), opts);
      applyDock(dockToVars(CSS_VARS.preview), previewSize(), opts);
      applyDock(dockToEl(pipRestoreButton), sizeForTarget(pipRestoreButton), opts);
    };

    const repaintToDock = () => {
      if (!dock.edge || dock.offset == null)
        return;
      const origin = currentTransformOrigin();
      if (origin)
        setVar('--error-pip-origin', origin);
      else 
        unsetVar('--error-pip-origin');
      applyDockAll({ persist: false });
    };

    // =========================
    // Hidden state + UI
    // =========================
    const loadHidden = () => {
      const rawPretty = safeGet(POS_KEYS.hiddenPretty);
      if (rawPretty != null)
        isPrettyHidden = rawPretty === '1' || rawPretty === 'true';
      const rawPreview = safeGet(POS_KEYS.hiddenPreview);
      if (rawPreview != null)
        isPreviewHidden = rawPreview === '1' || rawPreview === 'true';
    };

    const setPrettyHidden = (v) => {
      isPrettyHidden = !!v;
      safeSet(POS_KEYS.hiddenPretty, isPrettyHidden ? '1' : '0');
      updateUI();
    };

    const setPreviewHidden = (v) => {
      isPreviewHidden = !!v;
      safeSet(POS_KEYS.hiddenPreview, isPreviewHidden ? '1' : '0');
      updateUI();
    };

    const isMinimized = () => iframe.hasAttribute('inert');

    const setMinimized = (v) => {
      if (v) {
        iframe.setAttribute('inert', '');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        iframe.removeAttribute('inert');
        toggle.setAttribute('aria-expanded', 'true');
      }
    };

    const setRestoreLabel = (kind) => {
      if (kind === 'pretty') {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
      } else {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error page</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error page');
      }
    };

    const updateUI = () => {
      const minimized = isMinimized();
      const showPiP = minimized && !isPrettyHidden;
      const showPreview = !minimized && !isPreviewHidden;
      const pipHiddenByUser = minimized && isPrettyHidden;
      const previewHiddenByUser = !minimized && isPreviewHidden;
      const showToggle = minimized ? showPiP : showPreview;
      const showRestore = pipHiddenByUser || previewHiddenByUser;

      hide(iframe, pipHiddenByUser);
      hide(preview, !showPreview);
      hide(toggle, !showToggle);
      hide(pipCloseButton, !showToggle);
      hide(pipRestoreButton, !showRestore);

      pipCloseButton.setAttribute('aria-label', minimized ? 'Hide error overlay' : 'Hide error page preview');

      if (pipHiddenByUser)
        setRestoreLabel('pretty');
      else if (previewHiddenByUser)
        setRestoreLabel('preview');

      host.classList.toggle('pip-hidden', isPrettyHidden);
      host.classList.toggle('preview-hidden', isPreviewHidden);
    };

    // =========================
    // Preview snapshot
    // =========================
    const updatePreview = () => {
      try {
        let previewIframe = preview.querySelector('iframe');
        if (!previewIframe) {
          previewIframe = el('iframe');
          previewIframe.style.cssText = 'width: 1200px; height: 900px; transform: scale(0.2); transform-origin: top left; border: none;';
          previewIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
          preview.appendChild(previewIframe);
        }

        const doctype = document.doctype ? '<!DOCTYPE ' + document.doctype.name + '>' : '';
        const cleanedHTML = document.documentElement.outerHTML
          .replace(/<nuxt-error-overlay[^>]*>.*?<\\/nuxt-error-overlay>/gs, '')
          .replace(/<script[^>]*>.*?<\\/script>/gs, '');

        const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(doctype + cleanedHTML);
        iframeDoc.close();
      } catch (err) {
        console.error('Failed to update preview:', err);
      }
    };

    // =========================
    // View toggling
    // =========================
    const toggleView = () => {
      if (isMinimized()) {
        updatePreview();
        setMinimized(false);
        liveRegion.textContent = 'Showing detailed error view';
        setTimeout(() => { 
          try { 
            iframe.contentWindow.focus();
          } catch {}
        }, 100);
      } else {
        setMinimized(true);
        liveRegion.textContent = 'Showing error page';
        repaintToDock();
        void iframe.offsetWidth;
      }
      updateUI();
    };

    // =========================
    // Dragging (unified, rAF throttled)
    // =========================
    let drag = null;
    let rafId = null;
    let suppressToggleClick = false;
    let suppressRestoreClick = false;

    const beginDrag = (e) => {
      if (drag) 
        return;

      if (!dock.edge || dock.offset == null) {
        const def = cornerDefaultDock();
        dock.edge = def.edge;
        dock.offset = def.offset;
        updateDockAlignment(previewSize());
      }

      const isRestoreTarget = e.currentTarget === pipRestoreButton;

      drag = {
        kind: isRestoreTarget ? 'restore' : (isMinimized() ? 'pip' : 'preview'),
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastY: e.clientY,
        moved: false,
        target: e.currentTarget
      };

      drag.target.setPointerCapture(e.pointerId);

      if (drag.kind === 'restore')
        host.classList.add('dragging-restore');
      else 
        host.classList.add(drag.kind === 'pip' ? 'dragging' : 'dragging-preview');

      e.preventDefault();
    };

    const moveDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      
      const dx = drag.lastX - drag.startX;
      const dy = drag.lastY - drag.startY;

      if (!drag.moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
        drag.moved = true;
      }

      if (!drag.moved)
        return;
      if (rafId)
        return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const edge = nearestEdgeAt(drag.lastX, drag.lastY);
        const size = sizeForTarget(drag.target);

        let offset;
        if (edge === 'left' || edge === 'right') {
          const top = drag.lastY - (size.h / 2);
          offset = clampOffset(edge, Math.round(top), size);
        } else {
          const left = drag.lastX - (size.w / 2);
          offset = clampOffset(edge, Math.round(left), size);
        }

        dock.edge = edge;
        dock.offset = offset;
        updateDockAlignment(size);

        const origin = currentTransformOrigin();
        setVar('--error-pip-origin', origin || 'bottom right');

        applyDockAll({ persist: false });
      });
    };

    const endDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      const endedKind = drag.kind;
      drag.target.releasePointerCapture(e.pointerId);

      if (endedKind === 'restore')
        host.classList.remove('dragging-restore');
      else 
        host.classList.remove(endedKind === 'pip' ? 'dragging' : 'dragging-preview');

      const didMove = drag.moved;
      drag = null;

      if (didMove) {
        persistDock();
        if (endedKind === 'restore')
          suppressRestoreClick = true;
        else 
          suppressToggleClick = true;
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const bindDragTarget = (node) => {
      on(node, 'pointerdown', beginDrag);
      on(node, 'pointermove', moveDrag);
      on(node, 'pointerup', endDrag);
      on(node, 'pointercancel', endDrag);
    };

    bindDragTarget(toggle);
    bindDragTarget(pipRestoreButton);

    // =========================
    // Events (toggle / close / restore)
    // =========================
    on(toggle, 'click', (e) => {
      if (suppressToggleClick) {
        e.preventDefault();
        suppressToggleClick = false;
        return;
      }
      toggleView();
    });

    on(toggle, 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleView();
      }
    });

    on(pipCloseButton, 'click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized())
        setPrettyHidden(true);
      else
        setPreviewHidden(true);
    });

    on(pipCloseButton, 'pointerdown', (e) => {
      e.stopPropagation();
    });

    on(pipRestoreButton, 'click', (e) => {
      if (suppressRestoreClick) {
        e.preventDefault();
        suppressRestoreClick = false;
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized()) 
        setPrettyHidden(false);
      else 
        setPreviewHidden(false);
    });

    // =========================
    // Lifecycle: load / sync / repaint
    // =========================
    const loadState = () => {
      loadDock();
      loadHidden();

      if (isPrettyHidden && !isMinimized())
        setMinimized(true);

      updateUI();
      repaintToDock();
    };

    loadState();

    on(window, 'storage-ready', () => {
      storageReady = true;
      loadState();
    });

    const onViewportChange = () => repaintToDock();

    on(window, 'resize', onViewportChange);

    if (window.visualViewport) {
      on(window.visualViewport, 'resize', onViewportChange);
      on(window.visualViewport, 'scroll', onViewportChange);
    }

    // initial preview
    setTimeout(updatePreview, 100);

    // initial minimized option
    if (${startMinimized}) {
      setMinimized(true);
      repaintToDock();
      void iframe.offsetWidth;
      updateUI();
    }
  } catch (err) {
    console.error('Failed to initialize Nuxt error overlay:', err);
  }
})();
`;
}
function generateErrorOverlayHTML(html, options) {
	const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
	const errorPage = html.replace("<head>", `<head><script>${iframeStorageBridge(nonce)}<\/script>`);
	const base64HTML = Buffer.from(errorPage, "utf8").toString("base64");
	return `
    <script>${parentStorageBridge(nonce)}<\/script>
    <nuxt-error-overlay></nuxt-error-overlay>
    <script>${webComponentScript(base64HTML, options?.startMinimized ?? false)}<\/script>
  `;
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) {
		
		return;
	}
	
	const defaultRes = await defaultHandler(error, event, { json: true });
	
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
		
		defaultRes.body.stack = defaultRes.body.stack.join("\n");
	}
	const errorObject = defaultRes.body;
	
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	
	const reqHeaders = getRequestHeaders(event);
	
	const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
	
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) {
		return;
	}
	
	if (!res) {
		const { template } = await Promise.resolve().then(function () { return error500; });
		{
			
			errorObject.description = errorObject.message;
		}
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		return send(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	if (!globalThis._importMeta_.test && typeof html === "string") {
		const prettyResponse = await defaultHandler(error, event, { json: false });
		if (typeof prettyResponse.body === "string") {
			return send(event, html.replace("</body>", `${generateErrorOverlayHTML(prettyResponse.body, { startMinimized: 300 <= status && status < 500 })}</body>`));
		}
	}
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json ?? !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _RcloYXUAtgsGENxKBmfWBElD0sdDiyYpUdECSUmh5E = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "C:/Users/MSI/Desktop/GriboWeb";

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"},{"name":"description","content":"Revista cultural, laboratorio editorial y repositorio tecnico."}],"link":[],"style":[],"script":[],"noscript":[],"htmlAttrs":{"data-theme":"dark"},"title":"Gribo Digital"};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appSpaLoaderTag = "div";

const appSpaLoaderAttrs = {"id":"__nuxt-loader"};

const appId = "nuxt-app";

const devReducers = {
	VNode: (data) => isVNode(data) ? {
		type: data.type,
		props: data.props
	} : undefined,
	URL: (data) => data instanceof URL ? data.toString() : undefined,
	Symbol: (data) => typeof data === "symbol" ? data.description ?? "" : undefined
};
const asyncContext = getContext("nuxt-dev", {
	asyncContext: true,
	AsyncLocalStorage
});
const _e5vYReqAi6vcqyQ4DzTe2IF8C36pmdhxwRdfq_2XBM = (nitroApp) => {
	const handler = nitroApp.h3App.handler;
	nitroApp.h3App.handler = (event) => {
		return asyncContext.callAsync({
			logs: [],
			event
		}, () => handler(event));
	};
	onConsoleLog((_log) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		const rawStack = captureRawStackTrace();
		if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
			return;
		}
		const trace = [];
		let filename = "";
		for (const entry of parseRawStackTrace(rawStack)) {
			if (entry.source === globalThis._importMeta_.url) {
				continue;
			}
			if (EXCLUDE_TRACE_RE.test(entry.source)) {
				continue;
			}
			filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
			trace.push({
				...entry,
				source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
			});
		}
		const log = {
			..._log,
			
			filename,
			
			stack: trace
		};
		
		ctx.logs.push(log);
	});
	nitroApp.hooks.hook("afterResponse", () => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		return nitroApp.hooks.callHook("dev:ssr-logs", {
			logs: ctx.logs,
			path: ctx.event.path
		});
	});
	
	nitroApp.hooks.hook("render:html", (htmlContext) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		try {
			const reducers = Object.assign(Object.create(null), devReducers, ctx.event.context["~payloadReducers"]);
			htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
		} catch (e) {
			const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
			console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/4.x/api/composables/use-nuxt-app#payload.`);
		}
	});
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
	consola$1.addReporter({ log(logObj) {
		callback(logObj);
	} });
	consola$1.wrapConsole();
}

const plugins = [
  _RcloYXUAtgsGENxKBmfWBElD0sdDiyYpUdECSUmh5E,
_e5vYReqAi6vcqyQ4DzTe2IF8C36pmdhxwRdfq_2XBM,
_wH6JrtIxmaSoA8lCPWFnE9z4lQeXW6H5z3l5aymEQw
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _VlNosn = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const USERS_KEY = "admin-users.json";
const SCRYPT_KEY_LENGTH = 64;
function now() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
function normalizeEmail(value) {
  return value.trim().toLowerCase();
}
function normalizeUsername(value) {
  return value.trim().toLowerCase();
}
async function readAdminUsers() {
  const storage = useStorage("adminUsers");
  try {
    const stored = await storage.getItem(USERS_KEY);
    if (Array.isArray(stored)) return stored;
    if (typeof stored === "string" && stored.trim()) return JSON.parse(stored);
    await storage.setItem(USERS_KEY, []);
    return [];
  } catch {
    return [];
  }
}
async function writeAdminUsers(users) {
  await useStorage("adminUsers").setItem(USERS_KEY, users);
}
function toPublicAdminUser(user) {
  const { passwordHash: _passwordHash, ...publicUser } = user;
  return publicUser;
}
function hashAdminPassword(password) {
  const salt = randomBytes(16).toString("base64url");
  const hash = scryptSync(password, salt, SCRYPT_KEY_LENGTH).toString("base64url");
  return `scrypt$${salt}$${hash}`;
}
function verifyAdminPassword(password, passwordHash = "") {
  const [scheme, salt, storedHash] = passwordHash.split("$");
  if (scheme !== "scrypt" || !salt || !storedHash) return false;
  const candidate = scryptSync(password, salt, SCRYPT_KEY_LENGTH);
  const stored = Buffer.from(storedHash, "base64url");
  return candidate.length === stored.length && timingSafeEqual(candidate, stored);
}
async function createAdminUser(input) {
  const users = await readAdminUsers();
  const email = normalizeEmail(input.email);
  const username = normalizeUsername(input.username);
  const googleEmail = input.googleEmail ? normalizeEmail(input.googleEmail) : "";
  if (!input.name.trim()) throw createError({ statusCode: 400, statusMessage: "Name is required." });
  if (!email) throw createError({ statusCode: 400, statusMessage: "Email is required." });
  if (!username) throw createError({ statusCode: 400, statusMessage: "Username is required." });
  if (!["password", "google"].includes(input.authProvider)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid auth provider." });
  }
  if (input.authProvider === "password" && (!input.password || input.password.length < 10)) {
    throw createError({ statusCode: 400, statusMessage: "Password must be at least 10 characters." });
  }
  if (users.some((user2) => normalizeEmail(user2.email) === email || user2.googleEmail && normalizeEmail(user2.googleEmail) === email)) {
    throw createError({ statusCode: 409, statusMessage: "Email is already used by another admin user." });
  }
  if (googleEmail && users.some((user2) => normalizeEmail(user2.email) === googleEmail || user2.googleEmail && normalizeEmail(user2.googleEmail) === googleEmail)) {
    throw createError({ statusCode: 409, statusMessage: "Google email is already used by another admin user." });
  }
  if (users.some((user2) => normalizeUsername(user2.username) === username)) {
    throw createError({ statusCode: 409, statusMessage: "Username is already used by another admin user." });
  }
  const timestamp = now();
  const user = {
    id: randomBytes(12).toString("base64url"),
    name: input.name.trim(),
    email,
    username,
    authProvider: input.authProvider,
    googleEmail: input.authProvider === "google" ? googleEmail || email : googleEmail || void 0,
    status: "active",
    passwordHash: input.authProvider === "password" ? hashAdminPassword(input.password || "") : void 0,
    createdAt: timestamp,
    updatedAt: timestamp
  };
  users.push(user);
  await writeAdminUsers(users);
  return user;
}
async function updateAdminUser(id, input) {
  const users = await readAdminUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) throw createError({ statusCode: 404, statusMessage: "Admin user not found." });
  const next = { ...users[index] };
  if (input.name !== void 0) next.name = input.name.trim();
  if (input.email !== void 0) next.email = normalizeEmail(input.email);
  if (input.username !== void 0) next.username = normalizeUsername(input.username);
  if (input.googleEmail !== void 0) next.googleEmail = input.googleEmail ? normalizeEmail(input.googleEmail) : void 0;
  if (input.authProvider !== void 0) next.authProvider = input.authProvider;
  if (!next.name) throw createError({ statusCode: 400, statusMessage: "Name is required." });
  if (!next.email) throw createError({ statusCode: 400, statusMessage: "Email is required." });
  if (!next.username) throw createError({ statusCode: 400, statusMessage: "Username is required." });
  if (!["password", "google"].includes(next.authProvider)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid auth provider." });
  }
  if (next.authProvider === "google" && !next.googleEmail) next.googleEmail = next.email;
  if (next.authProvider === "password" && !next.passwordHash) {
    throw createError({ statusCode: 400, statusMessage: "Password users require a password." });
  }
  if (users.some((user) => user.id !== id && normalizeUsername(user.username) === next.username)) {
    throw createError({ statusCode: 409, statusMessage: "Username is already used by another admin user." });
  }
  if (users.some((user) => user.id !== id && (normalizeEmail(user.email) === next.email || user.googleEmail && normalizeEmail(user.googleEmail) === next.email))) {
    throw createError({ statusCode: 409, statusMessage: "Email is already used by another admin user." });
  }
  next.updatedAt = now();
  users[index] = next;
  await writeAdminUsers(users);
  return next;
}
async function setAdminUserStatus(id, status) {
  const users = await readAdminUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) throw createError({ statusCode: 404, statusMessage: "Admin user not found." });
  users[index] = { ...users[index], status, updatedAt: now() };
  await writeAdminUsers(users);
  return users[index];
}
async function changeAdminUserPassword(id, password) {
  if (!password || password.length < 10) {
    throw createError({ statusCode: 400, statusMessage: "Password must be at least 10 characters." });
  }
  const users = await readAdminUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) throw createError({ statusCode: 404, statusMessage: "Admin user not found." });
  users[index] = {
    ...users[index],
    authProvider: "password",
    passwordHash: hashAdminPassword(password),
    updatedAt: now()
  };
  await writeAdminUsers(users);
  return users[index];
}
async function findPasswordAdminUser(usernameOrEmail) {
  const lookup = usernameOrEmail.trim().toLowerCase();
  return (await readAdminUsers()).find(
    (user) => user.status === "active" && user.authProvider === "password" && (normalizeUsername(user.username) === lookup || normalizeEmail(user.email) === lookup)
  );
}
async function findGoogleAdminUser(email) {
  const lookup = normalizeEmail(email);
  return (await readAdminUsers()).find(
    (user) => user.status === "active" && user.authProvider === "google" && (normalizeEmail(user.email) === lookup || user.googleEmail && normalizeEmail(user.googleEmail) === lookup)
  );
}
async function markAdminUserLogin(id) {
  const users = await readAdminUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return void 0;
  users[index] = { ...users[index], lastLoginAt: now(), updatedAt: now() };
  await writeAdminUsers(users);
  return users[index];
}

const ADMIN_SESSION_COOKIE = "gribo_admin_session";
const DEFAULT_SESSION_TTL_SECONDS = 60 * 60 * 8;
const PLACEHOLDER_VALUE = "change-me-before-production";
function base64Url(input) {
  return Buffer.from(input, "utf8").toString("base64url");
}
function fromBase64Url(input) {
  return Buffer.from(input, "base64url").toString("utf8");
}
function safeEqual(a, b) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  return aBuffer.length === bBuffer.length && timingSafeEqual(aBuffer, bBuffer);
}
function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}
function signValue(value, secret) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}
function isLocalRequest(event) {
  const host = event ? getHeader(event, "host") || "" : "";
  const remoteAddress = (event == null ? void 0 : event.node.req.socket.remoteAddress) || "";
  const localHost = host.startsWith("localhost") || host.startsWith("127.0.0.1") || host.startsWith("[::1]");
  const localRemote = ["127.0.0.1", "::1", "::ffff:127.0.0.1"].includes(remoteAddress);
  return localHost && localRemote;
}
function getAdminAuthConfig(event) {
  const production = false;
  const localRequest = isLocalRequest(event);
  const username = process.env.ADMIN_USERNAME || ("admin");
  const password = process.env.ADMIN_PASSWORD || (PLACEHOLDER_VALUE);
  const passwordHash = process.env.ADMIN_PASSWORD_HASH || "";
  const sessionSecret = process.env.SESSION_SECRET || ("dev-session-secret");
  const sessionMaxAgeSeconds = Number(process.env.ADMIN_SESSION_MAX_AGE_SECONDS || DEFAULT_SESSION_TTL_SECONDS);
  const hasBootstrapCredentials = Boolean((password));
  const hasCredentials = Boolean((hasBootstrapCredentials || true));
  const enabled = hasCredentials && (true);
  return {
    enabled,
    production,
    localRequest,
    username,
    password,
    passwordHash,
    sessionSecret,
    sessionMaxAgeSeconds: Number.isFinite(sessionMaxAgeSeconds) ? sessionMaxAgeSeconds : DEFAULT_SESSION_TTL_SECONDS,
    reason: enabled ? "" : "Admin credentials are not configured."
  };
}
async function verifyAdminCredentials(username, password, event) {
  const config = getAdminAuthConfig(event);
  if (!config.enabled) {
    return {
      ok: false,
      reason: config.reason
    };
  }
  const user = await findPasswordAdminUser(username);
  if (user) {
    const passwordOk2 = verifyAdminPassword(password, user.passwordHash);
    if (!passwordOk2) {
      return {
        ok: false,
        reason: "Invalid username or password."
      };
    }
    const loggedInUser = await markAdminUserLogin(user.id) || user;
    return {
      ok: true,
      reason: "",
      user: {
        id: loggedInUser.id,
        name: loggedInUser.name,
        email: loggedInUser.email,
        username: loggedInUser.username,
        authProvider: loggedInUser.authProvider
      }
    };
  }
  const usernameOk = safeEqual(username, config.username);
  const passwordOk = config.passwordHash ? safeEqual(sha256(password), config.passwordHash) : safeEqual(password, config.password);
  return {
    ok: usernameOk && passwordOk,
    reason: usernameOk && passwordOk ? "" : "Invalid username or password.",
    user: usernameOk && passwordOk ? {
      id: "env-admin",
      name: "Environment Admin",
      email: "",
      username: config.username,
      authProvider: "env"
    } : void 0
  };
}
function createAdminSessionToken(user, event) {
  const config = getAdminAuthConfig(event);
  const payload = {
    ...user,
    exp: Math.floor(Date.now() / 1e3) + config.sessionMaxAgeSeconds
  };
  const encodedPayload = base64Url(JSON.stringify(payload));
  const signature = signValue(encodedPayload, config.sessionSecret);
  return `${encodedPayload}.${signature}`;
}
function readAdminSession(event) {
  const token = getCookie(event, ADMIN_SESSION_COOKIE);
  const config = getAdminAuthConfig(event);
  if (!token || !config.enabled) return null;
  const [payloadPart, signaturePart] = token.split(".");
  if (!payloadPart || !signaturePart) return null;
  const expectedSignature = signValue(payloadPart, config.sessionSecret);
  if (!safeEqual(signaturePart, expectedSignature)) return null;
  try {
    const payload = JSON.parse(fromBase64Url(payloadPart));
    if (!payload.username || payload.exp < Math.floor(Date.now() / 1e3)) return null;
    return payload;
  } catch {
    return null;
  }
}
function setAdminSessionCookie(event, token) {
  const config = getAdminAuthConfig(event);
  setCookie(event, ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: config.sessionMaxAgeSeconds,
    path: "/"
  });
}
function clearAdminSessionCookie(event) {
  deleteCookie(event, ADMIN_SESSION_COOKIE, {
    path: "/"
  });
}
function assertAdminAuthenticated(event) {
  const session = readAdminSession(event);
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  return session;
}

const _mzLafK = defineEventHandler((event) => {
  const path = getRequestURL(event).pathname;
  if (!path.startsWith("/api/admin/")) return;
  assertAdminAuthenticated(event);
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

const NUXT_PAYLOAD_INLINE = false;
const NUXT_RUNTIME_PAYLOAD_EXTRACTION = false;

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
};

function encodeEventPath(path) {
	const queryIndex = path.indexOf("?");
	if (queryIndex === -1) {
		return encodePath(path);
	}
	return encodePath(path.slice(0, queryIndex)) + path.slice(queryIndex);
}
function createSSRContext(event) {
	const url = encodeEventPath(event.path);
	const ssrContext = {
		url,
		event,
		runtimeConfig: useRuntimeConfig(event),
		noSSR: event.context.nuxt?.noSSR || (false),
		head: createHead(unheadOptions),
		error: false,
		nuxt: undefined,
		payload: {},
		["~payloadReducers"]: Object.create(null),
		modules: new Set()
	};
	return ssrContext;
}
function setSSRError(ssrContext, error) {
	ssrContext.error = true;
	ssrContext.payload = { error };
	ssrContext.url = error.url;
}

function buildAssetsDir() {
	
	return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	
	const app = useRuntimeConfig().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
// @ts-expect-error file will be produced after app build
const getServerEntry = () => Promise.resolve().then(function () { return server; }).then((r) => r.default || r);
// @ts-expect-error file will be produced after app build
const getClientManifest = () => Promise.resolve().then(function () { return client_manifest$1; }).then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);

const getSSRRenderer = lazyCachedFunction(async () => {
	
	const createSSRApp = await getServerEntry();
	if (!createSSRApp) {
		throw new Error("Server bundle is not available");
	}
	
	const precomputed = undefined ;
	
	const renderer = createRenderer(createSSRApp, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: renderToString$1,
		buildAssetsURL
	});
	async function renderToString$1(input, context) {
		const html = await renderToString(input, context);
		
		
		if (process.env.NUXT_VITE_NODE_OPTIONS) {
			renderer.rendererContext.updateManifest(await getClientManifest());
		}
		return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
	}
	return renderer;
});

const getSPARenderer = lazyCachedFunction(async () => {
	const precomputed = undefined ;
	// @ts-expect-error virtual file
	const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
		{
			const APP_SPA_LOADER_OPEN_TAG = `<${appSpaLoaderTag}${propsToString(appSpaLoaderAttrs)}>`;
			const APP_SPA_LOADER_CLOSE_TAG = `</${appSpaLoaderTag}>`;
			const appTemplate = APP_ROOT_OPEN_TAG + APP_ROOT_CLOSE_TAG;
			const loaderTemplate = r ? APP_SPA_LOADER_OPEN_TAG + r + APP_SPA_LOADER_CLOSE_TAG : "";
			return appTemplate + loaderTemplate;
		}
	});
	
	const renderer = createRenderer(() => () => {}, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: () => spaTemplate,
		buildAssetsURL
	});
	const result = await renderer.renderToString({});
	const renderToString = (ssrContext) => {
		const config = useRuntimeConfig(ssrContext.event);
		ssrContext.modules ||= new Set();
		ssrContext.payload.serverRendered = false;
		ssrContext.config = {
			public: config.public,
			app: config.app
		};
		return Promise.resolve(result);
	};
	return {
		rendererContext: renderer.rendererContext,
		renderToString
	};
});
function lazyCachedFunction(fn) {
	let res = null;
	return () => {
		if (res === null) {
			res = fn().catch((err) => {
				res = null;
				throw err;
			});
		}
		return res;
	};
}
function getRenderer(ssrContext) {
	return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
// @ts-expect-error file will be produced after app build
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
	const styleMap = await getSSRStyles();
	const inlinedStyles = new Set();
	for (const mod of usedModules) {
		if (mod in styleMap && styleMap[mod]) {
			for (const style of await styleMap[mod]()) {
				inlinedStyles.add(style);
			}
		}
	}
	return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

// @ts-expect-error virtual file
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);

function getServerComponentHTML(body) {
	const match = body.match(ROOT_NODE_REGEX);
	return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
		return undefined;
	}
	const response = {};
	for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
		response[name] = {
			...slot,
			fallback: ssrContext.teleports?.[`island-fallback=${name}`]
		};
	}
	return response;
}
function getClientIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
		return undefined;
	}
	const response = {};
	for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
		
		const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
		response[clientUid] = {
			...component,
			html,
			slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
		};
	}
	return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
	const entries = Object.entries(teleports);
	const slots = {};
	for (const [key, value] of entries) {
		const match = key.match(SSR_CLIENT_SLOT_MARKER);
		if (match) {
			const [, id, slot] = match;
			if (!slot || clientUid !== id) {
				continue;
			}
			slots[slot] = value;
		}
	}
	return slots;
}
function replaceIslandTeleports(ssrContext, html) {
	const { teleports, islandContext } = ssrContext;
	if (islandContext || !teleports) {
		return html;
	}
	for (const key in teleports) {
		const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
		if (matchClientComp) {
			const [, uid, clientId] = matchClientComp;
			if (!uid || !clientId) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
			continue;
		}
		const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
		if (matchSlot) {
			const [, uid, slot] = matchSlot;
			if (!uid || !slot) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
		}
	}
	return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const handler$1 = defineEventHandler(async (event) => {
	const nitroApp = useNitroApp();
	setResponseHeaders(event, {
		"content-type": "application/json;charset=utf-8",
		"x-powered-by": "Nuxt"
	});
	const islandContext = await getIslandContext(event);
	const ssrContext = {
		...createSSRContext(event),
		islandContext,
		noSSR: false,
		url: islandContext.url
	};
	
	const renderer = await getSSRRenderer();
	const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
		await ssrContext.nuxt?.hooks.callHook("app:error", err);
		throw err;
	});
	
	if (ssrContext.payload?.error) {
		throw ssrContext.payload.error;
	}
	const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult
	});
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	{
		const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
		const link = [];
		for (const resource of Object.values(styles)) {
			
			if ("inline" in getQuery(resource.file)) {
				continue;
			}
			
			
			if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
				link.push({
					rel: "stylesheet",
					href: renderer.rendererContext.buildAssetsURL(resource.file),
					crossorigin: ""
				});
			}
		}
		if (link.length) {
			ssrContext.head.push({ link }, { mode: "server" });
		}
	}
	const islandHead = {};
	for (const entry of ssrContext.head.entries.values()) {
		
		for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
			const currentValue = islandHead[key];
			if (Array.isArray(currentValue)) {
				currentValue.push(...value);
			} else {
				islandHead[key] = value;
			}
		}
	}
	const islandResponse = {
		id: islandContext.id,
		head: islandHead,
		html: getServerComponentHTML(renderResult.html),
		components: getClientIslandResponse(ssrContext),
		slots: getSlotIslandResponse(ssrContext)
	};
	await nitroApp.hooks.callHook("render:island", islandResponse, {
		event,
		islandContext
	});
	return islandResponse;
});
const ISLAND_PATH_PREFIX = "/__nuxt_island/";
const VALID_COMPONENT_NAME_RE = /^[a-z][\w.-]*$/i;
async function getIslandContext(event) {
	let url = event.path || "";
	if (!url.startsWith(ISLAND_PATH_PREFIX)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island request path"
		});
	}
	const componentParts = url.substring(ISLAND_PATH_PREFIX.length).replace(ISLAND_SUFFIX_RE, "").split("_");
	const hashId = componentParts.length > 1 ? componentParts.pop() : undefined;
	const componentName = componentParts.join("_");
	if (!componentName || !VALID_COMPONENT_NAME_RE.test(componentName)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island component name"
		});
	}
	const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
	
	return {
		url: typeof context?.url === "string" ? context.url : "/",
		id: hashId,
		name: componentName,
		props: destr$1(context.props) || {},
		slots: {},
		components: {}
	};
}

const _ZIkdk3 = eventHandler(async (event) => {
  const collection = getRouterParam(event, "collection") || event.path?.split("/")?.[2] || "";
  setHeader(event, "Content-Type", "text/plain");
  const data = await useStorage().getItem(`build:content:database.compressed.mjs`) || "";
  if (data) {
    const lineStart = `export const ${collection} = "`;
    const content = String(data).split("\n").find((line) => line.startsWith(lineStart));
    if (content) {
      return content.substring(lineStart.length, content.length - 1);
    }
  }
  return await import('file://C:/Users/MSI/Desktop/GriboWeb/.nuxt/content/database.compressed.mjs').then((m) => m[collection]);
});

async function decompressSQLDump(base64Str, compressionType = "gzip") {
  let binaryData;
  if (typeof Buffer !== "undefined") {
    const buffer = Buffer.from(base64Str, "base64");
    binaryData = Uint8Array.from(buffer);
  } else if (typeof atob !== "undefined") {
    binaryData = Uint8Array.from(atob(base64Str), (c) => c.charCodeAt(0));
  } else {
    throw new TypeError("No base64 decoding method available");
  }
  const response = new Response(new Blob([binaryData]));
  const decompressedStream = response.body?.pipeThrough(new DecompressionStream(compressionType));
  const text = await new Response(decompressedStream).text();
  return JSON.parse(text);
}

const checksums = {
  "blog": "v3.5.0--GteaSvwYHKyxD5EEDobClniGadVeIWaaOC1UrMqvbGI",
  "projects": "v3.5.0--K-_qTlYY7fs1cktyvhcWeTfJBkgvU4uwHC7ooe7F_TM",
  "docs": "v3.5.0--kZH6Mb4GN4oPi-f9PDiaWR6b3or89_H2-GGRJgvAjng",
  "labs": "v3.5.0--VWvAkOp_4kqF5bcNfOE9H0Wka9wlKvxhLz4sORA_iyE",
  "home": "v3.5.0--6rGrv_50488GBaS_204B3ISzDX9dQgleInb1ky9gRJo",
  "settings": "v3.5.0--7NdHW3U4wwSq3Ia4uCr0UVNrNwsOoJSUDSevpNoDzt0"
};
const checksumsStructure = {
  "blog": "HgiavfbRY-6HTrcyV6bFUbVpHh0Fu8-bBSQgJaL1Eok",
  "projects": "Ya1fIzksAjPnUJ5lymykYpfUYupMis1Zksv70SXpYiU",
  "docs": "ikhwkEO43qpXZKvFHiSSKrkBOvOqnzybQBnJjInMINk",
  "labs": "IA7318SIMAnuJVIwwKXY6-D649IlKXot3TzcLsBVdR8",
  "home": "mk-tLIReAPgs28M1s8MdR795Twcc4eXp3Dv3oYnGS4E",
  "settings": "HRPrPWOq90oDSymRhxY64nXZuq9JhSLBKqaYKakfBIo"
};
const tables = {
  "blog": "_content_blog",
  "projects": "_content_projects",
  "docs": "_content_docs",
  "labs": "_content_labs",
  "home": "_content_home",
  "settings": "_content_settings",
  "info": "_content_info"
};
const contentManifest = {
  "blog": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "accentColor": "string",
      "archivedAt": "string",
      "author": "string",
      "blocks": "json",
      "body": "json",
      "canonical": "string",
      "category": "string",
      "coverAlt": "string",
      "coverCaption": "string",
      "coverImage": "string",
      "coverPosition": "string",
      "coverStyle": "string",
      "date": "string",
      "description": "string",
      "excerpt": "string",
      "extension": "string",
      "lab": "string",
      "mediaRefs": "json",
      "meta": "json",
      "navigation": "json",
      "noindex": "boolean",
      "ogDescription": "string",
      "ogImage": "string",
      "ogTitle": "string",
      "path": "string",
      "readingTime": "string",
      "seo": "json",
      "seoDescription": "string",
      "seoTitle": "string",
      "slug": "string",
      "status": "string",
      "stem": "string",
      "tags": "json",
      "type": "string",
      "updatedAt": "string"
    }
  },
  "projects": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "accentColor": "string",
      "blocks": "json",
      "body": "json",
      "canonical": "string",
      "coverAlt": "string",
      "coverCaption": "string",
      "coverImage": "string",
      "coverPosition": "string",
      "coverStyle": "string",
      "date": "string",
      "description": "string",
      "docsFolder": "string",
      "docsPath": "string",
      "docsPaths": "json",
      "extension": "string",
      "lab": "string",
      "mediaRefs": "json",
      "meta": "json",
      "navigation": "json",
      "noindex": "boolean",
      "ogDescription": "string",
      "ogImage": "string",
      "ogTitle": "string",
      "path": "string",
      "relatedArticles": "json",
      "relatedBlogSlugs": "json",
      "relatedDocs": "json",
      "relatedPosts": "json",
      "seo": "json",
      "seoDescription": "string",
      "seoTitle": "string",
      "slug": "string",
      "stack": "json",
      "status": "string",
      "stem": "string",
      "summary": "string",
      "tags": "json",
      "type": "string",
      "updatedAt": "string",
      "year": "number"
    }
  },
  "docs": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "accentColor": "string",
      "blocks": "json",
      "body": "json",
      "canonical": "string",
      "coverAlt": "string",
      "coverCaption": "string",
      "coverImage": "string",
      "coverPosition": "string",
      "coverStyle": "string",
      "date": "string",
      "description": "string",
      "docsFolder": "string",
      "extension": "string",
      "lab": "string",
      "mediaRefs": "json",
      "meta": "json",
      "navigation": "json",
      "noindex": "boolean",
      "ogDescription": "string",
      "ogImage": "string",
      "ogTitle": "string",
      "order": "number",
      "path": "string",
      "project": "string",
      "projectSlug": "string",
      "section": "string",
      "seo": "json",
      "seoDescription": "string",
      "seoTitle": "string",
      "slug": "string",
      "status": "string",
      "stem": "string",
      "tags": "json",
      "updatedAt": "string"
    }
  },
  "labs": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "accent": "string",
      "body": "json",
      "canonical": "string",
      "description": "string",
      "extension": "string",
      "featured": "boolean",
      "meta": "json",
      "navigation": "json",
      "noindex": "boolean",
      "ogDescription": "string",
      "ogImage": "string",
      "ogTitle": "string",
      "openQuestions": "json",
      "order": "number",
      "path": "string",
      "relatedTags": "json",
      "roadmap": "json",
      "seo": "json",
      "seoDescription": "string",
      "seoTitle": "string",
      "shortTitle": "string",
      "slug": "string",
      "status": "string",
      "stem": "string"
    }
  },
  "home": {
    "type": "data",
    "fields": {
      "id": "string",
      "extension": "string",
      "meta": "json",
      "stem": "string"
    }
  },
  "settings": {
    "type": "data",
    "fields": {
      "id": "string",
      "extension": "string",
      "meta": "json",
      "stem": "string"
    }
  },
  "info": {
    "type": "data",
    "fields": {}
  }
};

async function fetchContent(event, collection, path, options) {
  const headers = event ? getRequestHeaders(event) : {};
  headers["accept-encoding"] = void 0;
  const url = `/__nuxt_content/${collection}/${path}`;
  const fetchOptions = {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    },
    query: { v: checksums[String(collection)], t: Date.now()  }
  };
  return event ? await event.$fetch(url, fetchOptions) : await $fetch(url, fetchOptions);
}
async function fetchDatabase(event, collection) {
  return fetchContent(event, collection, "sql_dump.txt", {
    responseType: "text",
    headers: {
      "content-type": "text/plain"
    }
  });
}

function refineContentFields(sql, doc) {
  const fields = findCollectionFields(sql);
  const item = { ...doc };
  for (const key in item) {
    if (fields[key] === "json" && item[key] && item[key] !== "undefined") {
      item[key] = JSON.parse(item[key]);
    }
    if (fields[key] === "boolean" && item[key] !== "undefined") {
      item[key] = Boolean(item[key]);
    }
  }
  for (const key in item) {
    if (item[key] === "NULL") {
      item[key] = void 0;
    }
  }
  return item;
}
function findCollectionFields(sql) {
  const table = sql.match(/FROM\s+(\w+)/);
  if (!table) {
    return {};
  }
  const info = contentManifest[getCollectionName(table[1])];
  return info?.fields || {};
}
function getCollectionName(table) {
  return table.replace(/^_content_/, "");
}

const originalEmit = process.emit;
process.emit = function(...args) {
  const name = args[0];
  const data = args[1];
  if (name === `warning` && typeof data === `object` && data.name === `ExperimentalWarning` && data.message.includes(`SQLite is an experimental feature`)) {
    return false;
  }
  return originalEmit.apply(process, args);
};

let db;
function loadDatabaseAdapter(config) {
  const { database, localDatabase } = config;
  if (!db) {
    {
      db = sqliteConnector(refineDatabaseConfig(localDatabase));
    }
  }
  return {
    all: async (sql, params = []) => {
      return db.prepare(sql).all(...params).then((result) => (result || []).map((item) => refineContentFields(sql, item)));
    },
    first: async (sql, params = []) => {
      return db.prepare(sql).get(...params).then((item) => item ? refineContentFields(sql, item) : item);
    },
    exec: async (sql, params = []) => {
      return db.prepare(sql).run(...params);
    }
  };
}
const checkDatabaseIntegrity = /* @__PURE__ */ new Map();
const integrityCheckPromise = /* @__PURE__ */ new Map();
async function checkAndImportDatabaseIntegrity(event, collection, config) {
  if (checkDatabaseIntegrity.get(collection) !== false) {
    checkDatabaseIntegrity.set(collection, false);
    if (!integrityCheckPromise.has(collection)) {
      const _integrityCheck = _checkAndImportDatabaseIntegrity(event, collection, checksums[collection], checksumsStructure[collection], config).then((isValid) => {
        checkDatabaseIntegrity.set(collection, !isValid);
      }).catch((error) => {
        console.error("Database integrity check failed", error);
        checkDatabaseIntegrity.set(collection, true);
        integrityCheckPromise.delete(collection);
      });
      integrityCheckPromise.set(collection, _integrityCheck);
    }
  }
  if (integrityCheckPromise.has(collection)) {
    await integrityCheckPromise.get(collection);
  }
}
async function _checkAndImportDatabaseIntegrity(event, collection, integrityVersion, structureIntegrityVersion, config) {
  const db2 = loadDatabaseAdapter(config);
  const before = await db2.first(`SELECT * FROM ${tables.info} WHERE id = ?`, [`checksum_${collection}`]).catch(() => null);
  if (before?.version && !String(before.version)?.startsWith(`${config.databaseVersion}--`)) {
    await db2.exec(`DROP TABLE IF EXISTS ${tables.info}`);
    before.version = "";
  }
  const unchangedStructure = before?.structureVersion === structureIntegrityVersion;
  if (before?.version) {
    if (before.version === integrityVersion) {
      if (before.ready) {
        return true;
      }
      await waitUntilDatabaseIsReady(db2, collection);
      return true;
    }
    await db2.exec(`DELETE FROM ${tables.info} WHERE id = ?`, [`checksum_${collection}`]);
    if (!unchangedStructure) {
      await db2.exec(`DROP TABLE IF EXISTS ${tables[collection]}`);
    }
  }
  const dump = await loadDatabaseDump(event, collection).then(decompressSQLDump);
  const dumpLinesHash = dump.map((row) => row.split(" -- ").pop());
  let hashesInDb = /* @__PURE__ */ new Set();
  if (unchangedStructure) {
    const hashListFromTheDump = new Set(dumpLinesHash);
    const hashesInDbRecords = await db2.all(`SELECT __hash__ FROM ${tables[collection]}`).catch(() => []);
    hashesInDb = new Set(hashesInDbRecords.map((r) => r.__hash__));
    const hashesToDelete = hashesInDb.difference(hashListFromTheDump);
    if (hashesToDelete.size) {
      await db2.exec(`DELETE FROM ${tables[collection]} WHERE __hash__ IN (${Array(hashesToDelete.size).fill("?").join(",")})`, Array.from(hashesToDelete));
    }
  }
  await dump.reduce(async (prev, sql, index) => {
    await prev;
    const hash = dumpLinesHash[index];
    const statement = sql.substring(0, sql.length - hash.length - 4);
    if (unchangedStructure) {
      if (hash === "structure") {
        return Promise.resolve();
      }
      if (hashesInDb.has(hash)) {
        return Promise.resolve();
      }
    }
    await db2.exec(statement).catch((err) => {
      const message = err.message || "Unknown error";
      console.error(`Failed to execute SQL ${sql}: ${message}`);
    });
  }, Promise.resolve());
  const after = await db2.first(`SELECT version FROM ${tables.info} WHERE id = ?`, [`checksum_${collection}`]).catch(() => ({ version: "" }));
  return after?.version === integrityVersion;
}
const REQUEST_TIMEOUT = 90;
async function waitUntilDatabaseIsReady(db2, collection) {
  let iterationCount = 0;
  let interval;
  await new Promise((resolve, reject) => {
    interval = setInterval(async () => {
      const row = await db2.first(`SELECT ready FROM ${tables.info} WHERE id = ?`, [`checksum_${collection}`]).catch(() => ({ ready: true }));
      if (row?.ready) {
        clearInterval(interval);
        resolve(0);
      }
      if (iterationCount++ > REQUEST_TIMEOUT) {
        clearInterval(interval);
        reject(new Error("Waiting for another database initialization timed out"));
      }
    }, 1e3);
  }).catch((e) => {
    throw e;
  }).finally(() => {
    if (interval) {
      clearInterval(interval);
    }
  });
}
async function loadDatabaseDump(event, collection) {
  return await fetchDatabase(event, collection).catch((e) => {
    console.error("Failed to fetch compressed dump", e);
    return "";
  });
}
function refineDatabaseConfig(config) {
  if (config.type === "d1") {
    return { ...config, bindingName: config.bindingName || config.binding };
  }
  if (config.type === "sqlite") {
    const _config = { ...config };
    if (config.filename === ":memory:") {
      return { name: ":memory:" };
    }
    if ("filename" in config) {
      const filename = isAbsolute(config?.filename || "") || config?.filename === ":memory:" ? config?.filename : new URL(config.filename, globalThis._importMeta_.url).pathname;
      _config.path = process.platform === "win32" && filename.startsWith("/") ? filename.slice(1) : filename;
    }
    return _config;
  }
  if (config.type === "pglite") {
    return {
      dataDir: config.dataDir,
      // Pass through any other PGlite-specific options
      ...config
    };
  }
  return config;
}

const SQL_COMMANDS = /SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|\$/i;
const SQL_COUNT_REGEX = /^COUNT\((DISTINCT )?([a-z_]\w+|\*)\) as count$/i;
const SQL_SELECT_REGEX = /^SELECT (.*) FROM (\w+)( WHERE .*)? ORDER BY (["\w,\s]+) (ASC|DESC)( LIMIT \d+)?( OFFSET \d+)?$/;
function assertSafeQuery(sql, collection) {
  if (!sql) {
    throw new Error("Invalid query: Query cannot be empty");
  }
  const cleanedupQuery = cleanupQuery(sql);
  if (cleanedupQuery !== sql) {
    throw new Error("Invalid query: SQL comments are not allowed");
  }
  const match = sql.match(SQL_SELECT_REGEX);
  if (!match) {
    throw new Error("Invalid query: Query must be a valid SELECT statement with proper syntax");
  }
  const [_, select, from, where, orderBy, order, limit, offset] = match;
  const columns = select?.trim().split(", ") || [];
  if (columns.length === 1) {
    if (columns[0] !== "*" && !columns[0]?.match(SQL_COUNT_REGEX) && !columns[0]?.match(/^"[a-z_]\w+"$/i)) {
      throw new Error(`Invalid query: Column '${columns[0]}' has invalid format. Expected *, COUNT(), or a quoted column name`);
    }
  } else if (!columns.every((column) => column.match(/^"[a-z_]\w+"$/i))) {
    throw new Error("Invalid query: Multiple columns must be properly quoted and alphanumeric");
  }
  if (from !== `_content_${collection}`) {
    const collection2 = String(from || "").replace(/^_content_/, "");
    throw new Error(`Invalid query: Collection '${collection2}' does not exist`);
  }
  if (where) {
    if (!where.startsWith(" WHERE (") || !where.endsWith(")")) {
      throw new Error("Invalid query: WHERE clause must be properly enclosed in parentheses");
    }
    const noString = cleanupQuery(where, { removeString: true });
    if (noString.match(SQL_COMMANDS)) {
      throw new Error("Invalid query: WHERE clause contains unsafe SQL commands");
    }
  }
  const _order = (orderBy + " " + order).split(", ");
  if (!_order.every((column) => column.match(/^("[a-zA-Z_]+"|[a-zA-Z_]+) (ASC|DESC)$/))) {
    throw new Error("Invalid query: ORDER BY clause must contain valid column names followed by ASC or DESC");
  }
  if (limit !== void 0 && !limit.match(/^ LIMIT \d+$/)) {
    throw new Error("Invalid query: LIMIT clause must be a positive number");
  }
  if (offset !== void 0 && !offset.match(/^ OFFSET \d+$/)) {
    throw new Error("Invalid query: OFFSET clause must be a positive number");
  }
  return true;
}
function cleanupQuery(query, options = { removeString: false }) {
  let inString = false;
  let stringFence = "";
  let result = "";
  for (let i = 0; i < query.length; i++) {
    const char = query[i];
    const prevChar = query[i - 1];
    const nextChar = query[i + 1];
    if (char === "'" || char === '"') {
      if (!options?.removeString) {
        result += char;
        continue;
      }
      if (inString) {
        if (char !== stringFence || nextChar === stringFence || prevChar === stringFence) {
          continue;
        }
        inString = false;
        stringFence = "";
        continue;
      } else {
        inString = true;
        stringFence = char;
        continue;
      }
    }
    if (!inString) {
      if (char === "-" && nextChar === "-") {
        return result;
      }
      if (char === "/" && nextChar === "*") {
        i += 2;
        while (i < query.length && !(query[i] === "*" && query[i + 1] === "/")) {
          i += 1;
        }
        i += 2;
        continue;
      }
      result += char;
    }
  }
  return result;
}

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

const frontmatterOrder = [
  "title",
  "slug",
  "shortTitle",
  "excerpt",
  "summary",
  "description",
  "date",
  "updatedAt",
  "archivedAt",
  "author",
  "category",
  "type",
  "status",
  "year",
  "project",
  "projectSlug",
  "section",
  "lab",
  "accent",
  "order",
  "featured",
  "tags",
  "relatedTags",
  "stack",
  "coverImage",
  "coverAlt",
  "coverCaption",
  "coverStyle",
  "coverPosition",
  "accentColor",
  "mediaRefs",
  "blocks",
  "roadmap",
  "openQuestions",
  "docsPath",
  "docsFolder",
  "docsPaths",
  "relatedDocs",
  "readingTime",
  "seoTitle",
  "seoDescription",
  "ogTitle",
  "ogDescription",
  "ogImage",
  "canonical",
  "noindex"
];
function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed === "") return "";
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null") return null;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if (trimmed.startsWith('"') && trimmed.endsWith('"') || trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1);
  }
  if (trimmed.startsWith("[") && trimmed.endsWith("]") || trimmed.startsWith("{") && trimmed.endsWith("}")) {
    try {
      const parsed = JSON.parse(trimmed);
      return parsed;
    } catch {
      try {
        const parsed = JSON.parse(trimmed.replace(/'/g, '"'));
        return parsed;
      } catch {
        return trimmed;
      }
    }
  }
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed = JSON.parse(trimmed.replace(/'/g, '"'));
      return parsed;
    } catch {
      return trimmed;
    }
  }
  return trimmed;
}
function parseMarkdownContent(raw) {
  var _a;
  const normalized = raw.replace(/^\uFEFF/, "");
  if (!normalized.startsWith("---")) {
    return {
      frontmatter: {},
      body: normalized
    };
  }
  const closing = normalized.indexOf("\n---", 3);
  if (closing === -1) {
    return {
      frontmatter: {},
      body: normalized
    };
  }
  const yaml = normalized.slice(3, closing).trim();
  const body = normalized.slice(closing + 4).replace(/^\r?\n/, "");
  const frontmatter = {};
  const lines = yaml.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const match = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
    if (!match) continue;
    const key = match[1];
    const rawValue = (_a = match[2]) != null ? _a : "";
    const values = [];
    if (rawValue === "") {
      let cursor = index + 1;
      while (cursor < lines.length) {
        const listMatch = lines[cursor].match(/^\s*-\s*(.*)$/);
        if (!listMatch) break;
        values.push(String(parseScalar(listMatch[1])));
        cursor += 1;
      }
      if (values.length) {
        frontmatter[key] = values;
        index = cursor - 1;
      } else {
        frontmatter[key] = "";
      }
      continue;
    }
    frontmatter[key] = parseScalar(rawValue);
  }
  return { frontmatter, body };
}
function needsQuotes(value) {
  return value === "" || value.includes(":") || value.includes("#") || value.includes("{") || value.includes("}") || value.includes("[") || value.includes("]") || value.startsWith("@") || value.startsWith("!");
}
function stringifyScalar(value) {
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  if (value === null || value === void 0) return "null";
  if (typeof value === "object") return JSON.stringify(value);
  const text = String(value);
  return needsQuotes(text) ? JSON.stringify(text) : text;
}
function stringifyMarkdownContent(frontmatter, body) {
  const keys = [
    ...frontmatterOrder.filter((key) => Object.prototype.hasOwnProperty.call(frontmatter, key)),
    ...Object.keys(frontmatter).filter((key) => !frontmatterOrder.includes(key)).sort()
  ];
  const yaml = keys.flatMap((key) => {
    const value = frontmatter[key];
    if (value === void 0) return [];
    if (Array.isArray(value)) {
      if (!value.length) return [`${key}: []`];
      if (value.some((item) => typeof item === "object" && item !== null)) {
        return [`${key}: ${JSON.stringify(value)}`];
      }
      return [`${key}:`, ...value.map((item) => `  - ${stringifyScalar(item)}`)];
    }
    return [`${key}: ${stringifyScalar(value)}`];
  });
  return `---
${yaml.join("\n")}
---

${body.trim()}
`;
}
async function readMarkdownFile(absolutePath) {
  const raw = await readFile(absolutePath, "utf8");
  return parseMarkdownContent(raw);
}
async function writeMarkdownFile(absolutePath, frontmatter, body) {
  await mkdir(dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, stringifyMarkdownContent(frontmatter, body), "utf8");
}
function todayIsoDate() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}

const workspaceRoot$2 = resolve(process.cwd());
const analyticsRoot = resolve(workspaceRoot$2, "server/data/analytics");
const eventsPath = resolve(analyticsRoot, "events.jsonl");
const allowedEventTypes = /* @__PURE__ */ new Set(["view", "read_start", "read_progress", "read_complete", "cta_click"]);
const allowedContentTypes = /* @__PURE__ */ new Set(["home", "blog", "project", "docs", "lab"]);
const rateWindowMs = 1e4;
const maxEventsPerWindow = 40;
const rateMemory = /* @__PURE__ */ new Map();
function clampText(value, fallback = "", max = 240) {
  return String(value != null ? value : fallback).replace(/\s+/g, " ").trim().slice(0, max);
}
function normalizePath(value) {
  const route = String(value || "/").split("#")[0].split("?")[0].trim() || "/";
  return route.startsWith("/") ? route : `/${route}`;
}
function inferContentType(route) {
  if (route === "/") return "home";
  if (route === "/blog" || route.startsWith("/blog/")) return "blog";
  if (route === "/repository" || route.startsWith("/repository/")) return "project";
  if (route === "/docs" || route.startsWith("/docs/")) return "docs";
  if (route === "/labs" || route.startsWith("/labs/")) return "lab";
  return "";
}
function inferSlug(route, contentType) {
  if (contentType === "home") return "home";
  const parts = route.split("/").filter(Boolean);
  if (contentType === "docs") return parts.slice(1).join("/") || "docs-index";
  return parts[1] || "index";
}
function safeMetadata(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const output = {};
  for (const [key, raw] of Object.entries(value).slice(0, 12)) {
    const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48);
    if (!safeKey) continue;
    if (typeof raw === "boolean" || typeof raw === "number") {
      output[safeKey] = raw;
    } else {
      output[safeKey] = clampText(raw, "", 220);
    }
  }
  return output;
}
function hashUserAgent(value) {
  if (!value) return "";
  return createHash("sha256").update(`gribo-ua:${value}`).digest("hex");
}
async function fileExists$2(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}
async function directoryExists$1(path) {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
}
async function walkMarkdown(root) {
  const absoluteRoot = resolve(workspaceRoot$2, root);
  const files = [];
  if (!await directoryExists$1(absoluteRoot)) return files;
  async function walk(current) {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const absolute = join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(absolute);
      } else if (entry.isFile() && extname(entry.name) === ".md") {
        files.push(absolute);
      }
    }
  }
  await walk(absoluteRoot);
  return files;
}
function publicDocRoute(absolutePath) {
  const portable = relative(resolve(workspaceRoot$2, "content/docs"), absolutePath).replace(/\\/g, "/");
  return `/docs/${portable.replace(/\.md$/, "").replace(/\/index$/, "")}`;
}
async function readContentMeta() {
  const items = [
    {
      contentType: "home",
      slug: "home",
      route: "/",
      title: "Gribo Digital",
      lab: ""
    }
  ];
  const blogFiles = await walkMarkdown("content/blog");
  const projectFiles = await walkMarkdown("content/projects");
  const docsFiles = await walkMarkdown("content/docs");
  const labFiles = await walkMarkdown("content/labs");
  for (const absolutePath of blogFiles) {
    const raw = await readFile(absolutePath, "utf8");
    const { frontmatter } = parseMarkdownContent(raw);
    const slug = String(frontmatter.slug || basename(absolutePath, ".md"));
    items.push({
      contentType: "blog",
      slug,
      route: `/blog/${slug}`,
      title: String(frontmatter.title || slug),
      lab: String(frontmatter.lab || "")
    });
  }
  for (const absolutePath of projectFiles) {
    const raw = await readFile(absolutePath, "utf8");
    const { frontmatter } = parseMarkdownContent(raw);
    const slug = String(frontmatter.slug || basename(absolutePath, ".md"));
    items.push({
      contentType: "project",
      slug,
      route: `/repository/${slug}`,
      title: String(frontmatter.title || slug),
      lab: String(frontmatter.lab || "")
    });
  }
  for (const absolutePath of docsFiles) {
    const raw = await readFile(absolutePath, "utf8");
    const { frontmatter } = parseMarkdownContent(raw);
    const route = publicDocRoute(absolutePath);
    items.push({
      contentType: "docs",
      slug: route.replace(/^\/docs\//, ""),
      route,
      title: String(frontmatter.title || route),
      lab: String(frontmatter.lab || "")
    });
  }
  for (const absolutePath of labFiles) {
    const raw = await readFile(absolutePath, "utf8");
    const { frontmatter } = parseMarkdownContent(raw);
    const slug = String(frontmatter.slug || basename(absolutePath, ".md"));
    items.push({
      contentType: "lab",
      slug,
      route: `/labs/${slug}`,
      title: String(frontmatter.title || slug),
      lab: slug
    });
  }
  return items;
}
async function resolveContentMeta(route, contentType, slug) {
  const content = await readContentMeta();
  return content.find((item) => item.route === route) || content.find((item) => item.contentType === contentType && item.slug === slug);
}
function checkRateLimit(sessionId) {
  const now = Date.now();
  const current = rateMemory.get(sessionId);
  if (!current || current.resetAt < now) {
    rateMemory.set(sessionId, { count: 1, resetAt: now + rateWindowMs });
    return;
  }
  current.count += 1;
  if (current.count > maxEventsPerWindow) {
    throw createError({ statusCode: 429, statusMessage: "Too many analytics events." });
  }
}
async function recordAnalyticsEvent(event, input) {
  const route = normalizePath(input == null ? void 0 : input.route);
  if (route.startsWith("/admin") || route.startsWith("/api")) {
    throw createError({ statusCode: 400, statusMessage: "Admin and API routes are not tracked." });
  }
  if (JSON.stringify(input || {}).length > 4096) {
    throw createError({ statusCode: 413, statusMessage: "Analytics event is too large." });
  }
  const eventType = clampText(input == null ? void 0 : input.eventType);
  if (!allowedEventTypes.has(eventType)) {
    throw createError({ statusCode: 400, statusMessage: "Unsupported analytics event type." });
  }
  const inferredType = inferContentType(route);
  const requestedType = clampText(input == null ? void 0 : input.contentType);
  const contentType = allowedContentTypes.has(requestedType) ? requestedType : inferredType;
  if (!contentType) {
    throw createError({ statusCode: 400, statusMessage: "Unsupported analytics route." });
  }
  const sessionId = clampText(input == null ? void 0 : input.sessionId, "", 96);
  if (!/^[a-zA-Z0-9_-]{12,96}$/.test(sessionId)) {
    throw createError({ statusCode: 400, statusMessage: "Anonymous session id is required." });
  }
  checkRateLimit(sessionId);
  const slug = clampText(input == null ? void 0 : input.slug, inferSlug(route, contentType), 220);
  const meta = await resolveContentMeta(route, contentType, slug);
  const eventRecord = {
    eventId: randomUUID(),
    eventType,
    contentType,
    slug: (meta == null ? void 0 : meta.slug) || slug,
    lab: (meta == null ? void 0 : meta.lab) || clampText(input == null ? void 0 : input.lab, "", 120),
    title: (meta == null ? void 0 : meta.title) || clampText(input == null ? void 0 : input.title, route, 220),
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    sessionId,
    referrer: clampText(input == null ? void 0 : input.referrer, "", 500),
    userAgentHash: hashUserAgent(getHeader(event, "user-agent") || ""),
    route,
    metadata: safeMetadata(input == null ? void 0 : input.metadata)
  };
  await mkdir(analyticsRoot, { recursive: true });
  await writeFile(eventsPath, `${JSON.stringify(eventRecord)}
`, { flag: "a" });
  return {
    ok: true,
    eventId: eventRecord.eventId
  };
}
async function readAnalyticsEvents(limit) {
  if (!await fileExists$2(eventsPath)) return [];
  const raw = await readFile(eventsPath, "utf8");
  const events = raw.split(/\r?\n/).filter(Boolean).map((line) => {
    try {
      return JSON.parse(line);
    } catch {
      return null;
    }
  }).filter((event) => Boolean(event)).sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  return limit ? events.slice(0, limit) : events;
}
function createEmptyContentSummary(event) {
  return {
    title: event.title,
    contentType: event.contentType,
    slug: event.slug,
    route: event.route,
    lab: event.lab,
    views: 0,
    readStarts: 0,
    readCompletes: 0,
    ctaClicks: 0,
    maxProgress: 0,
    completionRate: 0,
    lastViewedAt: ""
  };
}
async function aggregateAnalytics() {
  var _a;
  const events = await readAnalyticsEvents();
  const byContent = /* @__PURE__ */ new Map();
  const byLab = /* @__PURE__ */ new Map();
  const byType = /* @__PURE__ */ new Map();
  let totalViews = 0;
  let totalReads = 0;
  let totalCompletions = 0;
  let totalCtaClicks = 0;
  for (const event of events) {
    const key = `${event.contentType}:${event.route}`;
    if (!byContent.has(key)) byContent.set(key, createEmptyContentSummary(event));
    const content = byContent.get(key);
    content.title = event.title || content.title;
    content.lab = event.lab || content.lab;
    content.lastViewedAt = content.lastViewedAt && content.lastViewedAt > event.timestamp ? content.lastViewedAt : event.timestamp;
    if (!byType.has(event.contentType)) {
      byType.set(event.contentType, { contentType: event.contentType, views: 0, reads: 0, completions: 0, ctaClicks: 0 });
    }
    const labKey = event.lab || "unassigned";
    if (!byLab.has(labKey)) byLab.set(labKey, { lab: labKey, views: 0, reads: 0, completions: 0 });
    const type = byType.get(event.contentType);
    const lab = byLab.get(labKey);
    if (event.eventType === "view") {
      totalViews += 1;
      content.views += 1;
      type.views += 1;
      lab.views += 1;
    }
    if (event.eventType === "read_start") {
      totalReads += 1;
      content.readStarts += 1;
      type.reads += 1;
      lab.reads += 1;
    }
    if (event.eventType === "read_complete") {
      totalCompletions += 1;
      content.readCompletes += 1;
      type.completions += 1;
      lab.completions += 1;
    }
    if (event.eventType === "cta_click") {
      totalCtaClicks += 1;
      content.ctaClicks += 1;
      type.ctaClicks += 1;
    }
    if (event.eventType === "read_progress") {
      const progress = Number(((_a = event.metadata) == null ? void 0 : _a.progress) || 0);
      if (Number.isFinite(progress)) content.maxProgress = Math.max(content.maxProgress, progress);
    }
  }
  const contentRows = Array.from(byContent.values()).map((item) => ({
    ...item,
    completionRate: item.readStarts ? Math.round(item.readCompletes / item.readStarts * 100) : 0
  }));
  return {
    overview: {
      totalViews,
      totalReads,
      readCompletions: totalCompletions,
      ctaClicks: totalCtaClicks,
      completionRate: totalReads ? Math.round(totalCompletions / totalReads * 100) : 0
    },
    content: contentRows.sort((a, b) => b.views - a.views || b.readStarts - a.readStarts).slice(0, 50),
    labs: Array.from(byLab.values()).sort((a, b) => b.views - a.views),
    types: Array.from(byType.values()).sort((a, b) => b.views - a.views),
    recentEvents: events.slice(0, 40)
  };
}
async function exportAnalytics(event) {
  const payload = {
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    source: "gribo-digital",
    privacy: "Anonymous analytics export. No raw IP addresses are stored.",
    events: await readAnalyticsEvents()
  };
  setHeader(event, "content-type", "application/json; charset=utf-8");
  setHeader(event, "content-disposition", `attachment; filename="gribo-analytics-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json"`);
  return JSON.stringify(payload, null, 2);
}
async function clearAnalyticsData(confirmation) {
  if (confirmation !== "CLEAR ANALYTICS") {
    throw createError({ statusCode: 400, statusMessage: "Confirmation must be CLEAR ANALYTICS." });
  }
  await mkdir(analyticsRoot, { recursive: true });
  await writeFile(eventsPath, "", "utf8");
  return {
    ok: true
  };
}

const GOOGLE_STATE_COOKIE = "gribo_google_oauth_state";
function localRedirectUrl(event) {
  const url = getRequestURL(event);
  return `${url.origin}/api/auth/google/callback`;
}
function getGoogleOAuthConfig(event) {
  const clientId = process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID || "";
  const clientSecret = process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET || "";
  const redirectUrl = process.env.NUXT_OAUTH_GOOGLE_REDIRECT_URL || localRedirectUrl(event);
  return {
    enabled: Boolean(clientId && clientSecret && redirectUrl),
    clientId,
    clientSecret,
    redirectUrl
  };
}
function createGoogleState(event) {
  const state = randomBytes(24).toString("base64url");
  setCookie(event, GOOGLE_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 10,
    path: "/"
  });
  return state;
}
function assertGoogleState(event, state) {
  const stored = getCookie(event, GOOGLE_STATE_COOKIE);
  deleteCookie(event, GOOGLE_STATE_COOKIE, { path: "/" });
  if (!stored || !state || stored !== state) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid Google login state."
    });
  }
}
async function exchangeGoogleCode(event, code) {
  const config = getGoogleOAuthConfig(event);
  if (!config.enabled) {
    throw createError({
      statusCode: 503,
      statusMessage: "Google login is not configured."
    });
  }
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      code,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: config.redirectUrl,
      grant_type: "authorization_code"
    })
  });
  if (!tokenResponse.ok) {
    throw createError({
      statusCode: 401,
      statusMessage: "Google login token exchange failed."
    });
  }
  return await tokenResponse.json();
}
async function fetchGoogleUser(accessToken) {
  const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });
  if (!userResponse.ok) {
    throw createError({
      statusCode: 401,
      statusMessage: "Google user profile could not be read."
    });
  }
  return await userResponse.json();
}

const workspaceRoot$1 = resolve(process.cwd());
const homeLayoutPath = resolve(workspaceRoot$1, "content/home/layout.json");
const snapshotsRoot$1 = resolve(workspaceRoot$1, "server/backups/snapshots");
const defaultHomeLayout = {
  hero: {
    label: "Digital systems magazine-lab",
    headline: "Ideas that become systems.",
    description: "Gribo Digital documents systems, prototypes, research notes and cultural infrastructure through a living editorial archive.",
    primaryCta: {
      label: "Explore projects",
      to: "/repository"
    },
    secondaryCta: {
      label: "Explore labs",
      to: "/labs"
    }
  },
  featuredProject: {
    mode: "manual",
    slug: "tennis-image-analysis"
  },
  buildLog: {
    mode: "manual",
    limit: 3,
    manualItems: []
  },
  feed: {
    mode: "mixed",
    limit: 4,
    contentTypes: ["blog", "projects"],
    manualItems: []
  },
  identity: {
    enabled: true,
    headline: "Build, reflect, archive, evolve.",
    description: "Gribo works like external memory: it records what is being built, what breaks, what changes and what eventually becomes a system.",
    ctaLabel: "Explore labs",
    ctaTarget: "/labs"
  },
  sections: []
};
function safeString(value, fallback) {
  const text = typeof value === "string" ? value.trim() : "";
  return text || fallback;
}
function safeMode(value, fallback) {
  return value === "manual" || value === "latest" || value === "mixed" ? value : fallback;
}
function positiveLimit(value, fallback) {
  const limit = Number(value);
  return Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 12) : fallback;
}
function parseManualFeedItems(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => ({
    type: (item == null ? void 0 : item.type) === "blog" || (item == null ? void 0 : item.type) === "projects" || (item == null ? void 0 : item.type) === "labs" ? item.type : "blog",
    slug: safeString(item == null ? void 0 : item.slug, "")
  })).filter((item) => item.slug);
}
function parseBuildItems(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => ({
    date: safeString(item == null ? void 0 : item.date, "Now"),
    title: safeString(item == null ? void 0 : item.title, "Untitled build note"),
    meta: safeString(item == null ? void 0 : item.meta, "A short note from the Gribo build log.")
  })).filter((item) => item.title);
}
function normalizeHomeLayout(input) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  const hero = (_a = input == null ? void 0 : input.hero) != null ? _a : {};
  const spotlight = (_b = input == null ? void 0 : input.spotlight) != null ? _b : {};
  const featuredProject = (_c = input == null ? void 0 : input.featuredProject) != null ? _c : {};
  const buildLog = (_d = input == null ? void 0 : input.buildLog) != null ? _d : {};
  const feed = (_e = input == null ? void 0 : input.feed) != null ? _e : {};
  const identity = (_f = input == null ? void 0 : input.identity) != null ? _f : {};
  return {
    hero: {
      label: safeString((_g = hero.label) != null ? _g : hero.eyebrow, defaultHomeLayout.hero.label),
      headline: safeString((_h = hero.headline) != null ? _h : hero.title, defaultHomeLayout.hero.headline),
      description: safeString(hero.description, defaultHomeLayout.hero.description),
      primaryCta: {
        label: safeString((_i = hero.primaryCta) == null ? void 0 : _i.label, defaultHomeLayout.hero.primaryCta.label),
        to: safeString((_j = hero.primaryCta) == null ? void 0 : _j.to, defaultHomeLayout.hero.primaryCta.to)
      },
      secondaryCta: {
        label: safeString((_k = hero.secondaryCta) == null ? void 0 : _k.label, defaultHomeLayout.hero.secondaryCta.label),
        to: safeString((_l = hero.secondaryCta) == null ? void 0 : _l.to, defaultHomeLayout.hero.secondaryCta.to)
      }
    },
    featuredProject: {
      mode: featuredProject.mode === "latest" ? "latest" : "manual",
      slug: safeString((_m = featuredProject.slug) != null ? _m : spotlight.slug, defaultHomeLayout.featuredProject.slug)
    },
    buildLog: {
      mode: buildLog.mode === "latest" ? "latest" : "manual",
      limit: positiveLimit(buildLog.limit, defaultHomeLayout.buildLog.limit),
      manualItems: parseBuildItems(buildLog.manualItems)
    },
    feed: {
      mode: safeMode(feed.mode, defaultHomeLayout.feed.mode),
      limit: positiveLimit(feed.limit, defaultHomeLayout.feed.limit),
      contentTypes: Array.isArray(feed.contentTypes) ? feed.contentTypes.filter((type) => ["blog", "projects", "labs"].includes(String(type))).map(String) : defaultHomeLayout.feed.contentTypes,
      manualItems: parseManualFeedItems(feed.manualItems)
    },
    identity: {
      enabled: identity.enabled !== false,
      headline: safeString(identity.headline, defaultHomeLayout.identity.headline),
      description: safeString(identity.description, defaultHomeLayout.identity.description),
      ctaLabel: safeString(identity.ctaLabel, defaultHomeLayout.identity.ctaLabel),
      ctaTarget: safeString(identity.ctaTarget, defaultHomeLayout.identity.ctaTarget)
    },
    sections: Array.isArray(input == null ? void 0 : input.sections) ? input.sections : []
  };
}
function validateHomeLayout(layout) {
  if (!layout.hero.headline.trim()) {
    throw createError({ statusCode: 400, statusMessage: "Hero headline is required." });
  }
  if (layout.featuredProject.mode === "manual" && !layout.featuredProject.slug.trim()) {
    throw createError({ statusCode: 400, statusMessage: "Manual featured project requires a project slug." });
  }
  if (layout.buildLog.limit <= 0 || layout.feed.limit <= 0) {
    throw createError({ statusCode: 400, statusMessage: "Limits must be positive numbers." });
  }
  if (layout.feed.contentTypes.some((type) => !["blog", "projects", "labs"].includes(type))) {
    throw createError({ statusCode: 400, statusMessage: "Feed contains an invalid content type." });
  }
}
async function fileExists$1(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}
function timestampSlug$1(date = /* @__PURE__ */ new Date()) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z").replace("T", "-");
}
async function createHomeLayoutSnapshot() {
  if (!await fileExists$1(homeLayoutPath)) return null;
  const content = await readFile(homeLayoutPath, "utf8");
  await mkdir(snapshotsRoot$1, { recursive: true });
  const snapshot = {
    manifest: {
      schemaVersion: "1.0.0",
      packageType: "full-site",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      source: "gribo-digital",
      title: "Home layout safety snapshot",
      slug: `home-layout-snapshot-${timestampSlug$1()}`,
      contentFiles: ["content/home/layout.json"],
      uploadFiles: [],
      notes: "Automatic safety snapshot before saving Home Composer layout."
    },
    files: [
      {
        path: "content/home/layout.json",
        encoding: "utf8",
        content
      }
    ]
  };
  const filename = `${snapshot.manifest.slug}.gribo.json`;
  const absolutePath = resolve(snapshotsRoot$1, filename);
  await writeFile(absolutePath, JSON.stringify(snapshot, null, 2), "utf8");
  return {
    filename,
    path: relative(workspaceRoot$1, absolutePath).replace(/\\/g, "/"),
    createdAt: snapshot.manifest.exportedAt
  };
}
async function readHomeLayout() {
  try {
    const raw = await readFile(homeLayoutPath, "utf8");
    return normalizeHomeLayout(JSON.parse(raw));
  } catch {
    return defaultHomeLayout;
  }
}
async function writeHomeLayout(input) {
  const layout = normalizeHomeLayout(input);
  validateHomeLayout(layout);
  const snapshot = await createHomeLayoutSnapshot();
  await mkdir(dirname(homeLayoutPath), { recursive: true });
  await writeFile(homeLayoutPath, JSON.stringify(layout, null, 2), "utf8");
  return {
    layout,
    snapshot
  };
}

const workspaceRoot = resolve(process.cwd());
const snapshotsRoot = resolve(workspaceRoot, "server/backups/snapshots");
const allowedContentRoots = [
  "content/blog/",
  "content/projects/",
  "content/docs/",
  "content/labs/",
  "content/home/",
  "content/settings/"
];
const allowedRoots = [...allowedContentRoots, "public/uploads/"];
const textExtensions = /* @__PURE__ */ new Set([".md", ".json", ".txt", ".csv", ".svg"]);
function toPortablePath(value) {
  return value.replace(/\\/g, "/").replace(/^\/+/, "");
}
function timestampSlug(date = /* @__PURE__ */ new Date()) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z").replace("T", "-");
}
function normalizeMaybePublicDocPath(value) {
  const clean = toPortablePath(value.trim());
  if (!clean) return "";
  if (clean.startsWith("content/docs/")) return clean;
  if (clean.startsWith("docs/")) return `content/${clean}`;
  if (clean.startsWith("/docs/")) return `content/${clean.slice(1)}`;
  return clean;
}
function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}
function slugWithCopySuffix(slug, suffix) {
  return slug.endsWith(suffix) ? slug : `${slug}${suffix}`;
}
function validatePortablePath(pathInput) {
  const path = toPortablePath(String(pathInput || ""));
  if (!path || path.includes("\0") || isAbsolute$1(path) || path.split("/").some((part) => part === ".." || part === "")) {
    throw createError({ statusCode: 400, statusMessage: `Unsafe portable path: ${path || "(empty)"}` });
  }
  if (!allowedRoots.some((root) => path.startsWith(root))) {
    throw createError({ statusCode: 400, statusMessage: `Portable path is outside approved areas: ${path}` });
  }
  if (path.startsWith("content/") && ![".md", ".json"].includes(extname(path))) {
    throw createError({ statusCode: 400, statusMessage: `Unsupported content file type: ${path}` });
  }
  const absolutePath = resolve(workspaceRoot, path);
  const relativePath = relative(workspaceRoot, absolutePath);
  if (relativePath.startsWith("..") || relativePath === ".." || isAbsolute$1(relativePath)) {
    throw createError({ statusCode: 400, statusMessage: `Unsafe portable path: ${path}` });
  }
  return {
    path,
    absolutePath
  };
}
function validatePackageManifest(manifest) {
  if (!manifest || typeof manifest !== "object") {
    throw createError({ statusCode: 400, statusMessage: "Package manifest is required." });
  }
  if (manifest.schemaVersion !== "1.0.0") {
    throw createError({ statusCode: 400, statusMessage: "Unsupported Gribo package schema version." });
  }
  if (!["full-site", "project", "blog", "docs", "lab"].includes(manifest.packageType)) {
    throw createError({ statusCode: 400, statusMessage: "Unsupported Gribo package type." });
  }
  const contentFiles = Array.isArray(manifest.contentFiles) ? manifest.contentFiles.map(String) : [];
  const uploadFiles = Array.isArray(manifest.uploadFiles) ? manifest.uploadFiles.map(String) : [];
  for (const file of [...contentFiles, ...uploadFiles]) {
    validatePortablePath(file);
  }
  return {
    schemaVersion: "1.0.0",
    packageType: manifest.packageType,
    exportedAt: String(manifest.exportedAt || (/* @__PURE__ */ new Date()).toISOString()),
    source: "gribo-digital",
    title: String(manifest.title || "Gribo package"),
    slug: String(manifest.slug || "gribo-package"),
    contentFiles,
    uploadFiles,
    checksum: manifest.checksum ? String(manifest.checksum) : void 0,
    notes: manifest.notes ? String(manifest.notes) : void 0
  };
}
function validatePortablePackage(input) {
  const manifest = validatePackageManifest(input == null ? void 0 : input.manifest);
  const files = Array.isArray(input == null ? void 0 : input.files) ? input.files : [];
  const manifestPaths = /* @__PURE__ */ new Set([...manifest.contentFiles, ...manifest.uploadFiles]);
  const normalizedFiles = files.map((file) => {
    var _a;
    const { path } = validatePortablePath(file == null ? void 0 : file.path);
    const encoding = (file == null ? void 0 : file.encoding) === "base64" ? "base64" : "utf8";
    if (!manifestPaths.has(path)) {
      throw createError({ statusCode: 400, statusMessage: `Package file is not declared in manifest: ${path}` });
    }
    return {
      path,
      encoding,
      content: String((_a = file == null ? void 0 : file.content) != null ? _a : "")
    };
  });
  if (!normalizedFiles.length) {
    throw createError({ statusCode: 400, statusMessage: "Package contains no files." });
  }
  return {
    manifest,
    files: normalizedFiles
  };
}
async function fileExists(absolutePath) {
  try {
    return (await stat(absolutePath)).isFile();
  } catch {
    return false;
  }
}
async function directoryExists(absolutePath) {
  try {
    return (await stat(absolutePath)).isDirectory();
  } catch {
    return false;
  }
}
async function walkFiles(rootPortablePath) {
  const rootPath = toPortablePath(rootPortablePath).replace(/\/?$/, "/");
  if (!allowedRoots.some((root2) => rootPath.startsWith(root2))) {
    throw createError({ statusCode: 400, statusMessage: `Portable path is outside approved areas: ${rootPath}` });
  }
  if (rootPath.includes("\0") || isAbsolute$1(rootPath) || rootPath.split("/").some((part) => part === "..")) {
    throw createError({ statusCode: 400, statusMessage: `Unsafe portable path: ${rootPath}` });
  }
  const root = resolve(workspaceRoot, rootPath);
  const relativeRoot = relative(workspaceRoot, root);
  if (relativeRoot.startsWith("..") || relativeRoot === ".." || isAbsolute$1(relativeRoot)) {
    throw createError({ statusCode: 400, statusMessage: `Unsafe portable path: ${rootPath}` });
  }
  const files = [];
  if (!await directoryExists(root)) return files;
  async function walk(current) {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const absolute = join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(absolute);
        continue;
      }
      if (entry.isFile()) {
        files.push(toPortablePath(relative(workspaceRoot, absolute)));
      }
    }
  }
  await walk(root);
  return files.sort();
}
async function readPortableFile(path) {
  const { absolutePath } = validatePortablePath(path);
  if (!await fileExists(absolutePath)) return null;
  const extension = extname(path).toLowerCase();
  const encoding = textExtensions.has(extension) ? "utf8" : "base64";
  const content = await readFile(absolutePath, encoding === "utf8" ? "utf8" : "base64");
  return {
    path,
    encoding,
    content
  };
}
async function readPackageFiles(paths) {
  const files = [];
  for (const path of unique(paths)) {
    const file = await readPortableFile(path);
    if (file) files.push(file);
  }
  return files.sort((a, b) => a.path.localeCompare(b.path));
}
function checksumPackage(files) {
  const hash = createHash("sha256");
  for (const file of files) {
    hash.update(file.path);
    hash.update(file.encoding);
    hash.update(file.content);
  }
  return hash.digest("hex");
}
async function findMarkdownBySlug(root, slug) {
  const rootPath = `content/${root}/`;
  const files = (await walkFiles(rootPath)).filter((path) => path.endsWith(".md"));
  for (const path of files) {
    const { absolutePath } = validatePortablePath(path);
    const raw = await readFile(absolutePath, "utf8");
    const { frontmatter } = parseMarkdownContent(raw);
    const fileSlug = basename(path, ".md");
    if (String(frontmatter.slug || fileSlug) === slug || fileSlug === slug) {
      return {
        path,
        frontmatter
      };
    }
  }
  return null;
}
async function resolveDocPath(input) {
  const normalized = normalizeMaybePublicDocPath(input).replace(/\.md$/, "");
  const candidates = normalized.endsWith("/index") ? [`${normalized}.md`] : [`${normalized}.md`, `${normalized}/index.md`];
  for (const candidate of candidates) {
    const { absolutePath, path } = validatePortablePath(candidate);
    if (await fileExists(absolutePath)) return path;
  }
  return "";
}
async function collectDocsFromProject(frontmatter) {
  const direct = [
    ...Array.isArray(frontmatter.relatedDocs) ? frontmatter.relatedDocs.map(String) : [],
    ...Array.isArray(frontmatter.docsPaths) ? frontmatter.docsPaths.map(String) : [],
    frontmatter.docsPath ? String(frontmatter.docsPath) : ""
  ];
  const docs = [];
  for (const item of direct) {
    const resolved = await resolveDocPath(item);
    if (resolved) docs.push(resolved);
  }
  if (docs.length) return unique(docs);
  const docsFolder = String(frontmatter.docsFolder || "").trim();
  if (docsFolder) {
    return (await walkFiles(`content/docs/${docsFolder}/`)).filter((path) => path.endsWith(".md"));
  }
  return [];
}
async function collectFullBackupFiles() {
  const contentFiles = [
    ...await walkFiles("content/blog/"),
    ...await walkFiles("content/projects/"),
    ...await walkFiles("content/docs/"),
    ...await walkFiles("content/labs/"),
    ...await walkFiles("content/home/"),
    ...await walkFiles("content/settings/")
  ].filter((path) => [".md", ".json"].includes(extname(path)));
  const uploadFiles = await walkFiles("public/uploads/");
  return {
    contentFiles: unique(contentFiles),
    uploadFiles: unique(uploadFiles)
  };
}
async function collectProjectPackageFiles(slug) {
  const project = await findMarkdownBySlug("projects", slug);
  if (!project) {
    throw createError({ statusCode: 404, statusMessage: "Project not found." });
  }
  const docs = await collectDocsFromProject(project.frontmatter);
  return {
    source: project,
    contentFiles: unique([project.path, ...docs]),
    uploadFiles: []
  };
}
async function collectBlogPackageFiles(slug) {
  const blog = await findMarkdownBySlug("blog", slug);
  if (!blog) {
    throw createError({ statusCode: 404, statusMessage: "Blog entry not found." });
  }
  return {
    source: blog,
    contentFiles: [blog.path],
    uploadFiles: []
  };
}
async function createPortablePackage(input) {
  const files = await readPackageFiles([...input.contentFiles, ...input.uploadFiles || []]);
  const contentFiles = files.filter((file) => file.path.startsWith("content/")).map((file) => file.path);
  const uploadFiles = files.filter((file) => file.path.startsWith("public/uploads/")).map((file) => file.path);
  const manifest = {
    schemaVersion: "1.0.0",
    packageType: input.packageType,
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    source: "gribo-digital",
    title: input.title,
    slug: input.slug,
    contentFiles,
    uploadFiles,
    notes: input.notes,
    checksum: checksumPackage(files)
  };
  return {
    manifest,
    files
  };
}
function createDownloadResponse(event, pkg, filename) {
  setHeader(event, "content-type", "application/vnd.gribo.package+json; charset=utf-8");
  setHeader(event, "content-disposition", `attachment; filename="${filename}"`);
  return JSON.stringify(pkg, null, 2);
}
async function detectImportConflicts(pkg) {
  const conflicts = [];
  const creates = [];
  for (const file of pkg.files) {
    const { absolutePath, path } = validatePortablePath(file.path);
    if (await fileExists(absolutePath)) conflicts.push(path);
    else creates.push(path);
  }
  return {
    conflicts,
    creates
  };
}
async function createSnapshotFromPaths(paths, notes) {
  const existingFiles = [];
  for (const path of unique(paths)) {
    const file = await readPortableFile(path);
    if (file) existingFiles.push(file);
  }
  await mkdir(snapshotsRoot, { recursive: true });
  const snapshot = {
    manifest: {
      schemaVersion: "1.0.0",
      packageType: "full-site",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      source: "gribo-digital",
      title: "Safety snapshot",
      slug: `safety-snapshot-${timestampSlug()}`,
      contentFiles: existingFiles.filter((file) => file.path.startsWith("content/")).map((file) => file.path),
      uploadFiles: existingFiles.filter((file) => file.path.startsWith("public/uploads/")).map((file) => file.path),
      notes,
      checksum: checksumPackage(existingFiles)
    },
    files: existingFiles
  };
  const filename = `${snapshot.manifest.slug}.gribo.json`;
  const absolutePath = resolve(snapshotsRoot, filename);
  await writeFile(absolutePath, JSON.stringify(snapshot, null, 2), "utf8");
  return {
    filename,
    path: toPortablePath(relative(workspaceRoot, absolutePath)),
    fileCount: existingFiles.length,
    createdAt: snapshot.manifest.exportedAt
  };
}
async function createSafetySnapshot(pkg, mode) {
  if (pkg.manifest.packageType === "full-site" && mode === "replace") {
    const all = await collectFullBackupFiles();
    return createSnapshotFromPaths([...all.contentFiles, ...all.uploadFiles], "Automatic full-site safety snapshot before restore.");
  }
  return createSnapshotFromPaths(pkg.files.map((file) => file.path), `Automatic safety snapshot before ${mode} import of ${pkg.manifest.packageType}.`);
}
async function nextAvailableCopyPath(path) {
  const extension = extname(path);
  const withoutExtension = path.slice(0, -extension.length);
  const copyBase = `${withoutExtension}-copy`;
  let candidate = `${copyBase}${extension}`;
  let counter = 2;
  while (await fileExists(validatePortablePath(candidate).absolutePath)) {
    candidate = `${copyBase}-${counter}${extension}`;
    counter += 1;
  }
  return candidate;
}
function rewriteMarkdownSlug(content, path) {
  if (!path.endsWith(".md")) return content;
  const parsed = parseMarkdownContent(content);
  const fileSlug = basename(path, ".md");
  if (!parsed.frontmatter.slug || path.startsWith("content/blog/") || path.startsWith("content/projects/") || path.startsWith("content/labs/")) {
    parsed.frontmatter.slug = slugWithCopySuffix(fileSlug, "");
  }
  return stringifyMarkdownContent(parsed.frontmatter, parsed.body);
}
async function writePortableFile(file, targetPath) {
  const { absolutePath } = validatePortablePath(targetPath);
  const content = file.encoding === "base64" ? Buffer.from(file.content, "base64") : rewriteMarkdownSlug(file.content, targetPath);
  await mkdir(dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, content);
}
async function applyImportAsCopy(pkg) {
  const written = [];
  for (const file of pkg.files) {
    const { absolutePath } = validatePortablePath(file.path);
    const targetPath = await fileExists(absolutePath) ? await nextAvailableCopyPath(file.path) : file.path;
    await writePortableFile(file, targetPath);
    written.push(targetPath);
  }
  return written;
}
async function applyImportReplace(pkg) {
  const written = [];
  for (const file of pkg.files) {
    await writePortableFile(file, file.path);
    written.push(file.path);
  }
  return written;
}
async function listSafetySnapshots() {
  if (!await directoryExists(snapshotsRoot)) return [];
  const entries = await readdir(snapshotsRoot, { withFileTypes: true });
  const snapshots = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".gribo.json")) continue;
    const absolutePath = join(snapshotsRoot, entry.name);
    const info = await stat(absolutePath);
    snapshots.push({
      filename: entry.name,
      path: toPortablePath(relative(workspaceRoot, absolutePath)),
      createdAt: info.mtime.toISOString(),
      size: info.size
    });
  }
  return snapshots.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

const adminContentRoots = {
  blog: "blog",
  projects: "projects",
  docs: "docs",
  labs: "labs"
};
const contentRoot = resolve(process.cwd(), "content");
function assertAdminContentType(value) {
  if (value === "project") return "projects";
  if (value === "lab") return "labs";
  if (value === "blog" || value === "projects" || value === "docs" || value === "labs") {
    return value;
  }
  throw createError({
    statusCode: 400,
    statusMessage: "Unsupported content type"
  });
}
function slugifyContentTitle(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96) || "untitled";
}
function assertInside(base, target) {
  const rel = relative(base, target);
  if (rel.startsWith("..") || rel === ".." || isAbsolute$1(rel)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Unsafe content path"
    });
  }
}
function normalizePathSegment(value) {
  const normalized = value.replace(/\\/g, "/").replace(/^content\//, "");
  if (!normalized || isAbsolute$1(normalized) || normalized.includes("\0")) {
    throw createError({
      statusCode: 400,
      statusMessage: "Unsafe content path"
    });
  }
  if (normalized.split("/").some((part) => part === ".." || part === "")) {
    throw createError({
      statusCode: 400,
      statusMessage: "Unsafe content path"
    });
  }
  return normalized;
}
function resolveAdminContentFile(contentTypeInput, filePathInput) {
  const contentType = assertAdminContentType(contentTypeInput);
  const rootName = adminContentRoots[contentType];
  const typeRoot = resolve(contentRoot, rootName);
  const incoming = normalizePathSegment(String(filePathInput != null ? filePathInput : ""));
  const withoutType = incoming.startsWith(`${rootName}/`) ? incoming.slice(rootName.length + 1) : incoming;
  const relativeFile = withoutType.endsWith(".md") ? withoutType : `${withoutType}.md`;
  if (extname(relativeFile) !== ".md") {
    throw createError({
      statusCode: 400,
      statusMessage: "Only markdown content can be edited in Stage 4"
    });
  }
  const absolutePath = resolve(typeRoot, relativeFile);
  assertInside(typeRoot, absolutePath);
  return {
    contentType,
    absolutePath,
    typeRoot,
    filePath: `${rootName}/${relative(typeRoot, absolutePath).split(sep).join("/")}`
  };
}
function resolveAdminCreatePath(contentTypeInput, slugInput, folderInput) {
  const contentType = assertAdminContentType(contentTypeInput);
  const slug = slugifyContentTitle(String(slugInput != null ? slugInput : "untitled"));
  const folder = contentType === "docs" && folderInput ? normalizePathSegment(String(folderInput)).replace(/\.md$/, "") : "";
  const relativeFile = contentType === "docs" && folder ? `${folder}/${slug}.md` : `${slug}.md`;
  return resolveAdminContentFile(contentType, relativeFile);
}
async function listAdminMarkdownFiles(contentTypeInput) {
  const contentType = assertAdminContentType(contentTypeInput);
  const rootName = adminContentRoots[contentType];
  const typeRoot = resolve(contentRoot, rootName);
  const files = [];
  async function walk(current) {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const absolute = join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(absolute);
        continue;
      }
      if (entry.isFile() && extname(entry.name) === ".md") {
        files.push(`${rootName}/${relative(typeRoot, absolute).split(sep).join("/")}`);
      }
    }
  }
  try {
    const rootStat = await stat(typeRoot);
    if (!rootStat.isDirectory()) {
      return [];
    }
    await walk(typeRoot);
    return files.sort();
  } catch {
    return [];
  }
}
function getContentPublicPath(contentType, frontmatter, filePath) {
  const slugFromFile = filePath.replace(new RegExp(`^${adminContentRoots[contentType]}/`), "").replace(/\.md$/, "").replace(/\/index$/, "");
  const slug = String(frontmatter.slug || slugFromFile.split("/").pop() || slugFromFile);
  if (contentType === "blog") return `/blog/${slug}`;
  if (contentType === "projects") return `/repository/${slug}`;
  if (contentType === "labs") return `/labs/${slug}`;
  return `/docs/${slugFromFile}`;
}

const _kECPLV = eventHandler(async (event) => {
  const { sql } = await readBody(event);
  const collection = getRouterParam(event, "collection") || event.path?.split("/")?.[2] || "";
  assertSafeQuery(sql, collection);
  const conf = useRuntimeConfig().content;
  if (conf.integrityCheck) {
    await checkAndImportDatabaseIntegrity(event, collection, conf);
  }
  return loadDatabaseAdapter(conf).all(sql);
});

const _lazy_s_f3df = () => Promise.resolve().then(function () { return clear_post$1; });
const _lazy_XIsTnd = () => Promise.resolve().then(function () { return content_get$1; });
const _lazy_tRY24e = () => Promise.resolve().then(function () { return events_get$1; });
const _lazy_KteOni = () => Promise.resolve().then(function () { return export_get$1; });
const _lazy_9E6syI = () => Promise.resolve().then(function () { return labs_get$1; });
const _lazy_xZ9C8G = () => Promise.resolve().then(function () { return summary_get$1; });
const _lazy_tWjB8H = () => Promise.resolve().then(function () { return exportBlog_get$1; });
const _lazy_hFvNC_ = () => Promise.resolve().then(function () { return exportFull_get$1; });
const _lazy_R_kEWh = () => Promise.resolve().then(function () { return exportProject_get$1; });
const _lazy_fpu5Tu = () => Promise.resolve().then(function () { return import_post$1; });
const _lazy_nuUt7E = () => Promise.resolve().then(function () { return latestSnapshot_get$1; });
const _lazy_rT2ebV = () => Promise.resolve().then(function () { return preview_post$1; });
const _lazy_nHgelC = () => Promise.resolve().then(function () { return snapshots_get$1; });
const _lazy_6Meu_V = () => Promise.resolve().then(function () { return create_post$3; });
const _lazy_ctiunc = () => Promise.resolve().then(function () { return delete_post$1; });
const _lazy_5Ot9ot = () => Promise.resolve().then(function () { return list_get$5; });
const _lazy_ZsQkjz = () => Promise.resolve().then(function () { return read_post$1; });
const _lazy_EwIuiz = () => Promise.resolve().then(function () { return save_post$3; });
const _lazy_A_Uxe0 = () => Promise.resolve().then(function () { return homeLayout_get$3; });
const _lazy_Rj0kpN = () => Promise.resolve().then(function () { return save_post$1; });
const _lazy_K1_nhV = () => Promise.resolve().then(function () { return list_get$3; });
const _lazy_MWbJgD = () => Promise.resolve().then(function () { return upload_post$1; });
const _lazy_eMuZ4k = () => Promise.resolve().then(function () { return create_post$1; });
const _lazy_8tjvtK = () => Promise.resolve().then(function () { return list_get$1; });
const _lazy_n4VGt0 = () => Promise.resolve().then(function () { return password_post$1; });
const _lazy_X8OGXD = () => Promise.resolve().then(function () { return status_post$1; });
const _lazy_JVRjmh = () => Promise.resolve().then(function () { return update_post$1; });
const _lazy_wTiCTk = () => Promise.resolve().then(function () { return event_post$1; });
const _lazy_QtUYSl = () => Promise.resolve().then(function () { return google_get$1; });
const _lazy_7PjkMZ = () => Promise.resolve().then(function () { return callback_get$1; });
const _lazy_mxuvS2 = () => Promise.resolve().then(function () { return login_post$1; });
const _lazy_MWXgUT = () => Promise.resolve().then(function () { return logout_post$1; });
const _lazy_OJWNDK = () => Promise.resolve().then(function () { return session_get$1; });
const _lazy_DMt1dq = () => Promise.resolve().then(function () { return health_get$1; });
const _lazy_x8G8ZJ = () => Promise.resolve().then(function () { return homeLayout_get$1; });
const _lazy__TJAIX = () => Promise.resolve().then(function () { return renderer; });

const handlers = [
  { route: '', handler: _VlNosn, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _mzLafK, lazy: false, middleware: true, method: undefined },
  { route: '/api/admin/analytics/clear', handler: _lazy_s_f3df, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/analytics/content', handler: _lazy_XIsTnd, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/analytics/events', handler: _lazy_tRY24e, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/analytics/export', handler: _lazy_KteOni, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/analytics/labs', handler: _lazy_9E6syI, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/analytics/summary', handler: _lazy_xZ9C8G, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/backups/export-blog', handler: _lazy_tWjB8H, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/backups/export-full', handler: _lazy_hFvNC_, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/backups/export-project', handler: _lazy_R_kEWh, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/backups/import', handler: _lazy_fpu5Tu, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/backups/latest-snapshot', handler: _lazy_nuUt7E, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/backups/preview', handler: _lazy_rT2ebV, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/backups/snapshots', handler: _lazy_nHgelC, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/content/create', handler: _lazy_6Meu_V, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/content/delete', handler: _lazy_ctiunc, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/content/list', handler: _lazy_5Ot9ot, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/content/read', handler: _lazy_ZsQkjz, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/content/save', handler: _lazy_EwIuiz, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/home-layout', handler: _lazy_A_Uxe0, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/home-layout/save', handler: _lazy_Rj0kpN, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/media/list', handler: _lazy_K1_nhV, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/media/upload', handler: _lazy_MWbJgD, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/users/create', handler: _lazy_eMuZ4k, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/users/list', handler: _lazy_8tjvtK, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/users/password', handler: _lazy_n4VGt0, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/users/status', handler: _lazy_X8OGXD, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/users/update', handler: _lazy_JVRjmh, lazy: true, middleware: false, method: "post" },
  { route: '/api/analytics/event', handler: _lazy_wTiCTk, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/google', handler: _lazy_QtUYSl, lazy: true, middleware: false, method: "get" },
  { route: '/api/auth/google/callback', handler: _lazy_7PjkMZ, lazy: true, middleware: false, method: "get" },
  { route: '/api/auth/login', handler: _lazy_mxuvS2, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/logout', handler: _lazy_MWXgUT, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/session', handler: _lazy_OJWNDK, lazy: true, middleware: false, method: "get" },
  { route: '/api/health', handler: _lazy_DMt1dq, lazy: true, middleware: false, method: "get" },
  { route: '/api/home-layout', handler: _lazy_x8G8ZJ, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy__TJAIX, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: handler$1, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/blog/sql_dump.txt', handler: _ZIkdk3, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/projects/sql_dump.txt', handler: _ZIkdk3, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/docs/sql_dump.txt', handler: _ZIkdk3, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/labs/sql_dump.txt', handler: _ZIkdk3, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/home/sql_dump.txt', handler: _ZIkdk3, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/settings/sql_dump.txt', handler: _ZIkdk3, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/info/sql_dump.txt', handler: _ZIkdk3, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/blog/query', handler: _kECPLV, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/projects/query', handler: _kECPLV, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/docs/query', handler: _kECPLV, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/labs/query', handler: _kECPLV, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/home/query', handler: _kECPLV, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/settings/query', handler: _kECPLV, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/info/query', handler: _kECPLV, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy__TJAIX, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto.webcrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server$1 = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server$1.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server$1.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server$1.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = {
	"appName": "Nuxt",
	"status": 500,
	"statusText": "Internal server error",
	"description": "This page is temporarily unavailable.",
	"refresh": "Refresh this page"
};
const template$1 = (messages) => {
	messages = {
		..._messages,
		...messages
	};
	return "<!DOCTYPE html><html lang=\"en\"><head><title>" + escapeHtml(messages.status) + " - " + escapeHtml(messages.statusText) + " | " + escapeHtml(messages.appName) + "</title><meta charset=\"utf-8\"><meta content=\"width=device-width,initial-scale=1.0,minimum-scale=1.0\" name=\"viewport\"><script>!function(){const e=document.createElement(\"link\").relList;if(!(e&&e.supports&&e.supports(\"modulepreload\"))){for(const e of document.querySelectorAll('link[rel=\"modulepreload\"]'))r(e);new MutationObserver(e=>{for(const o of e)if(\"childList\"===o.type)for(const e of o.addedNodes)\"LINK\"===e.tagName&&\"modulepreload\"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),\"use-credentials\"===e.crossOrigin?r.credentials=\"include\":\"anonymous\"===e.crossOrigin?r.credentials=\"omit\":r.credentials=\"same-origin\",r}(e);fetch(e.href,r)}}();<\/script><style>*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:\"\"}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.grid{display:grid}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2{padding-left:.5rem;padding-right:.5rem}.text-center{text-align:center}.text-\\[80px\\]{font-size:80px}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold{font-weight:600}.leading-none{line-height:1}.tracking-wide{letter-spacing:.025em}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\]{font-size:110px}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}</style></head><body class=\"antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide\"><div class=\"max-w-520px text-center\"><h1 class=\"font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]\">" + escapeHtml(messages.status) + "</h1><h2 class=\"font-semibold mb-2 sm:text-3xl text-2xl\">" + escapeHtml(messages.statusText) + "</h2><p class=\"mb-4 px-2 text-[#64748B] text-md\">" + escapeHtml(messages.description) + "</p></div></body></html>";
};

const error500 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const server = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: viteNodeEntry_mjs
}, Symbol.toStringTag, { value: 'Module' }));

const client_manifest = () => viteNodeFetch.getManifest();

const client_manifest$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: client_manifest
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

const clear_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await clearAnalyticsData(String((body == null ? void 0 : body.confirmation) || ""));
});

const clear_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: clear_post
}, Symbol.toStringTag, { value: 'Module' }));

const content_get = defineEventHandler(async () => {
  const summary = await aggregateAnalytics();
  return {
    items: summary.content
  };
});

const content_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: content_get
}, Symbol.toStringTag, { value: 'Module' }));

const events_get = defineEventHandler(async (event) => {
  const query = getQuery$1(event);
  const limit = Math.min(Math.max(Number(query.limit || 40), 1), 200);
  return {
    items: await readAnalyticsEvents(limit)
  };
});

const events_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: events_get
}, Symbol.toStringTag, { value: 'Module' }));

const export_get = defineEventHandler(async (event) => {
  return await exportAnalytics(event);
});

const export_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: export_get
}, Symbol.toStringTag, { value: 'Module' }));

const labs_get = defineEventHandler(async () => {
  const summary = await aggregateAnalytics();
  return {
    items: summary.labs
  };
});

const labs_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: labs_get
}, Symbol.toStringTag, { value: 'Module' }));

const summary_get = defineEventHandler(async () => {
  return await aggregateAnalytics();
});

const summary_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: summary_get
}, Symbol.toStringTag, { value: 'Module' }));

const exportBlog_get = defineEventHandler(async (event) => {
  const query = getQuery$1(event);
  const slug = String(query.slug || "");
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Blog slug is required." });
  }
  const collected = await collectBlogPackageFiles(slug);
  const title = String(collected.source.frontmatter.title || slug);
  const pkg = await createPortablePackage({
    packageType: "blog",
    title,
    slug,
    contentFiles: collected.contentFiles,
    uploadFiles: collected.uploadFiles,
    notes: "Portable Gribo blog package."
  });
  return createDownloadResponse(event, pkg, `gribo-blog-${slug}.gribo.json`);
});

const exportBlog_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: exportBlog_get
}, Symbol.toStringTag, { value: 'Module' }));

const exportFull_get = defineEventHandler(async (event) => {
  const files = await collectFullBackupFiles();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[-:T]/g, "");
  const pkg = await createPortablePackage({
    packageType: "full-site",
    title: "Gribo Digital full-site backup",
    slug: `gribo-backup-${timestamp}`,
    contentFiles: files.contentFiles,
    uploadFiles: files.uploadFiles,
    notes: "Full backup of approved Gribo content and uploads folders."
  });
  return createDownloadResponse(event, pkg, `gribo-backup-${timestamp}.gribo.json`);
});

const exportFull_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: exportFull_get
}, Symbol.toStringTag, { value: 'Module' }));

const exportProject_get = defineEventHandler(async (event) => {
  const query = getQuery$1(event);
  const slug = String(query.slug || "");
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Project slug is required." });
  }
  const collected = await collectProjectPackageFiles(slug);
  const title = String(collected.source.frontmatter.title || slug);
  const pkg = await createPortablePackage({
    packageType: "project",
    title,
    slug,
    contentFiles: collected.contentFiles,
    uploadFiles: collected.uploadFiles,
    notes: "Project package with associated documentation detected from project frontmatter."
  });
  return createDownloadResponse(event, pkg, `gribo-project-${slug}.gribo.json`);
});

const exportProject_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: exportProject_get
}, Symbol.toStringTag, { value: 'Module' }));

const import_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const pkg = validatePortablePackage(body.package);
  const mode = body.mode === "replace" ? "replace" : "copy";
  const conflicts = await detectImportConflicts(pkg);
  if (mode === "replace" && conflicts.conflicts.length && body.confirmation !== "REPLACE GRIBO CONTENT") {
    throw createError({
      statusCode: 400,
      statusMessage: "Replace existing requires confirmation: REPLACE GRIBO CONTENT"
    });
  }
  if (pkg.manifest.packageType === "full-site" && mode === "replace" && body.restoreConfirmation !== "RESTORE GRIBO BACKUP") {
    throw createError({
      statusCode: 400,
      statusMessage: "Full restore requires confirmation: RESTORE GRIBO BACKUP"
    });
  }
  const snapshot = await createSafetySnapshot(pkg, mode);
  const written = mode === "replace" ? await applyImportReplace(pkg) : await applyImportAsCopy(pkg);
  return {
    ok: true,
    mode,
    manifest: pkg.manifest,
    snapshot,
    written
  };
});

const import_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: import_post
}, Symbol.toStringTag, { value: 'Module' }));

const latestSnapshot_get = defineEventHandler(async (event) => {
  const snapshots = await listSafetySnapshots();
  const latest = snapshots[0];
  if (!latest) {
    throw createError({ statusCode: 404, statusMessage: "No safety snapshots found." });
  }
  setHeader(event, "content-type", "application/vnd.gribo.package+json; charset=utf-8");
  setHeader(event, "content-disposition", `attachment; filename="${latest.filename}"`);
  return await readFile(resolve(process.cwd(), latest.path), "utf8");
});

const latestSnapshot_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: latestSnapshot_get
}, Symbol.toStringTag, { value: 'Module' }));

const preview_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const pkg = validatePortablePackage(body.package);
  const conflicts = await detectImportConflicts(pkg);
  return {
    ok: true,
    manifest: pkg.manifest,
    files: pkg.files.map((file) => ({
      path: file.path,
      encoding: file.encoding,
      size: file.content.length
    })),
    creates: conflicts.creates,
    conflicts: conflicts.conflicts,
    warnings: [
      ...pkg.files.some((file) => file.path.startsWith("public/uploads/")) ? ["Uploads are included as portable file payloads. Media upload management is still future work."] : [],
      ...conflicts.conflicts.length ? ["Conflicting files already exist. Use Import as copy or confirm Replace existing."] : []
    ]
  };
});

const preview_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: preview_post
}, Symbol.toStringTag, { value: 'Module' }));

const snapshots_get = defineEventHandler(async () => {
  return {
    snapshots: await listSafetySnapshots()
  };
});

const snapshots_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: snapshots_get
}, Symbol.toStringTag, { value: 'Module' }));

function createBaseFrontmatter(contentType, title, slug, body) {
  const today = todayIsoDate();
  const base = {
    title,
    slug,
    date: today,
    updatedAt: today,
    status: String(body.status || "draft"),
    lab: String(body.lab || "ai"),
    tags: splitInputList(body.tags),
    seoTitle: `${title} | Gribo Digital`,
    seoDescription: "Draft editorial note from the Gribo Digital archive.",
    ogImage: "/og/gribo-digital.png",
    canonical: "",
    noindex: true,
    coverImage: "",
    coverAlt: "",
    coverCaption: "",
    coverStyle: "editorial-gradient",
    coverPosition: "center",
    accentColor: "coral",
    mediaRefs: [],
    blocks: []
  };
  if (contentType === "blog") {
    return {
      ...base,
      excerpt: "A draft essay for the Gribo magazine archive.",
      description: "A draft essay for the Gribo magazine archive.",
      author: "Gribo Digital",
      category: "Draft",
      type: "blog",
      readingTime: "3 min read"
    };
  }
  if (contentType === "projects") {
    const docsFolder = body.docsFolder ? slugifyContentTitle(String(body.docsFolder)) : "";
    const docsPath = String(body.docsPath || (docsFolder ? `/docs/${docsFolder}` : ""));
    const docsPaths = splitInputList(body.docsPaths);
    const relatedDocs = splitInputList(body.relatedDocs);
    return {
      ...base,
      summary: String(body.summary || "A draft project dossier for an unfinished system."),
      description: String(body.description || body.summary || "A draft project dossier for an unfinished system."),
      type: "project",
      year: Number(body.year || (/* @__PURE__ */ new Date()).getFullYear()),
      stack: Array.isArray(body.stack) ? body.stack : splitInputList(body.stack),
      docsFolder,
      docsPath,
      docsPaths,
      relatedDocs
    };
  }
  if (contentType === "docs") {
    const docsFolder = slugifyContentTitle(String(body.docsFolder || body.folder || "project-docs"));
    const projectSlug = slugifyContentTitle(String(body.projectSlug || body.relatedProject || docsFolder));
    const project = String(body.project || body.relatedProject || projectSlug);
    return {
      ...base,
      description: "A draft technical page connected to a project dossier.",
      project,
      projectSlug,
      docsFolder,
      section: "Draft",
      order: 99
    };
  }
  return {
    ...base,
    shortTitle: title,
    description: "A draft research line for grouping essays, projects, docs, and open questions.",
    accent: "coral",
    order: 99,
    featured: false,
    relatedTags: [],
    roadmap: [],
    openQuestions: []
  };
}
function splitInputList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return String(value).split(",").map((item) => item.trim()).filter(Boolean);
}
function createSeedBody(contentType, title) {
  if (contentType === "docs") {
    return `# ${title}

This draft page should explain the technical context first: setup, decisions, constraints, and the part of the system it helps remember.
`;
  }
  if (contentType === "projects") {
    return `# ${title}

Before this becomes a finished system, this dossier keeps track of what is being built, what is still uncertain, and which decisions leave a trace.
`;
  }
  if (contentType === "labs") {
    return `# ${title}

A research line for gathering the essays, prototypes, documentation, and questions that continue to move through Gribo.
`;
  }
  return `# ${title}

A draft note for the Gribo archive. Shape the argument, keep the friction visible, and let the system explain what it is becoming.
`;
}
function isStaleBlogSlug$1(value) {
  const slug = String(value || "").trim();
  return !slug || /^untitled-blog-entry-\d+$/.test(slug) || /^untitled-draft-\d+$/.test(slug) || /^draft-\d+$/.test(slug) || slug === "untitled-blog-entry" || slug === "untitled-draft" || slug === "untitled" || slug === "draft";
}
function hasRealBlogTitle$1(value) {
  const slug = slugifyBlogTitle$1(String(value || ""));
  return Boolean(slug) && slug !== "untitled-blog-entry" && slug !== "untitled-draft" && slug !== "untitled" && slug !== "draft";
}
function slugTimestamp$1() {
  return (/* @__PURE__ */ new Date()).toISOString().replace(/\D/g, "").slice(0, 14);
}
function slugifyBlogTitle$1(value, fallback = "") {
  const words = String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").split("-").filter(Boolean).slice(0, 8);
  const selected = [];
  for (const word of words) {
    const candidate = [...selected, word].join("-");
    if (candidate.length > 72) break;
    selected.push(word);
  }
  return selected.join("-") || fallback;
}
function resolveBlogCreateSlug(providedSlug, title) {
  if (providedSlug && !isStaleBlogSlug$1(providedSlug)) return slugifyBlogTitle$1(providedSlug);
  if (hasRealBlogTitle$1(title)) return slugifyBlogTitle$1(title);
  return `untitled-blog-entry-${slugTimestamp$1()}`;
}
const create_post$2 = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const contentType = assertAdminContentType(body.contentType);
  const title = String(body.title || "Untitled draft");
  const providedSlug = contentType === "blog" ? slugifyBlogTitle$1(String(body.slug || "")) : slugifyContentTitle(String(body.slug || title));
  const slug = contentType === "blog" ? resolveBlogCreateSlug(providedSlug, title) : providedSlug;
  const resolved = resolveAdminCreatePath(contentType, slug, body.docsFolder || body.folder);
  try {
    await access(resolved.absolutePath);
    throw createError({
      statusCode: 409,
      statusMessage: "A content file with this slug already exists"
    });
  } catch (error) {
    if ((error == null ? void 0 : error.statusCode) === 409) throw error;
  }
  const frontmatter = createBaseFrontmatter(contentType, title, slug, body);
  const markdownBody = createSeedBody(contentType, title);
  await writeMarkdownFile(resolved.absolutePath, frontmatter, markdownBody);
  return {
    ok: true,
    item: {
      contentType,
      filePath: resolved.filePath,
      publicPath: getContentPublicPath(contentType, frontmatter, resolved.filePath),
      frontmatter,
      body: markdownBody
    }
  };
});

const create_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: create_post$2
}, Symbol.toStringTag, { value: 'Module' }));

const delete_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const mode = String(body.mode || "archive");
  if (!["archive", "delete"].includes(mode)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Unsupported delete mode."
    });
  }
  const resolved = resolveAdminContentFile(body.contentType, body.filePath);
  if (mode === "delete") {
    if (resolved.contentType !== "blog") {
      throw createError({
        statusCode: 400,
        statusMessage: "Physical delete is only enabled for blog entries."
      });
    }
    if (String(body.confirmation || "") !== "DELETE BLOG ENTRY") {
      throw createError({
        statusCode: 400,
        statusMessage: "Type DELETE BLOG ENTRY to confirm permanent removal."
      });
    }
    const trashRoot = resolve(process.cwd(), "server/data/trash/blog");
    const filename = resolved.filePath.replace(/^blog\//, "").replace(/\//g, "__");
    const trashName = `${(/* @__PURE__ */ new Date()).toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z")}-${filename}`;
    const trashPath = resolve(trashRoot, trashName);
    await mkdir(trashRoot, { recursive: true });
    await rename(resolved.absolutePath, trashPath);
    return {
      ok: true,
      deleted: true,
      softDeleted: false,
      item: {
        contentType: resolved.contentType,
        filePath: resolved.filePath,
        trashPath: `server/data/trash/blog/${trashName}`
      }
    };
  }
  const content = await readMarkdownFile(resolved.absolutePath);
  const frontmatter = {
    ...content.frontmatter,
    status: "archived",
    archivedAt: (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: todayIsoDate(),
    noindex: true
  };
  await writeMarkdownFile(resolved.absolutePath, frontmatter, content.body);
  return {
    ok: true,
    softDeleted: true,
    item: {
      contentType: resolved.contentType,
      filePath: resolved.filePath,
      frontmatter
    }
  };
});

const delete_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: delete_post
}, Symbol.toStringTag, { value: 'Module' }));

const list_get$4 = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  const query = getQuery$1(event);
  const requestedTypes = query.contentType ? [assertAdminContentType(query.contentType)] : ["blog", "projects", "docs", "labs"];
  const items = [];
  for (const contentType of requestedTypes) {
    const files = await listAdminMarkdownFiles(contentType);
    for (const filePath of files) {
      const resolved = resolveAdminContentFile(contentType, filePath);
      const { frontmatter } = await readMarkdownFile(resolved.absolutePath);
      const publicPath = getContentPublicPath(contentType, frontmatter, filePath);
      items.push({
        contentType,
        filePath,
        publicPath,
        title: (_a = frontmatter.title) != null ? _a : filePath,
        slug: (_b = frontmatter.slug) != null ? _b : publicPath.split("/").pop(),
        status: (_c = frontmatter.status) != null ? _c : "draft",
        lab: (_d = frontmatter.lab) != null ? _d : "",
        date: (_e = frontmatter.date) != null ? _e : "",
        updatedAt: (_f = frontmatter.updatedAt) != null ? _f : "",
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : Array.isArray(frontmatter.relatedTags) ? frontmatter.relatedTags : [],
        description: (_i = (_h = (_g = frontmatter.description) != null ? _g : frontmatter.excerpt) != null ? _h : frontmatter.summary) != null ? _i : "",
        project: (_j = frontmatter.project) != null ? _j : "",
        projectSlug: (_k = frontmatter.projectSlug) != null ? _k : "",
        docsFolder: (_l = frontmatter.docsFolder) != null ? _l : "",
        docsPath: (_m = frontmatter.docsPath) != null ? _m : "",
        docsPaths: Array.isArray(frontmatter.docsPaths) ? frontmatter.docsPaths : [],
        relatedDocs: Array.isArray(frontmatter.relatedDocs) ? frontmatter.relatedDocs : []
      });
    }
  }
  return {
    items: items.sort((a, b) => {
      const aDate = String(a.updatedAt || a.date || "");
      const bDate = String(b.updatedAt || b.date || "");
      return bDate.localeCompare(aDate) || String(a.title).localeCompare(String(b.title));
    })
  };
});

const list_get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: list_get$4
}, Symbol.toStringTag, { value: 'Module' }));

const read_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const resolved = resolveAdminContentFile(body.contentType, body.filePath);
  const content = await readMarkdownFile(resolved.absolutePath);
  return {
    item: {
      contentType: resolved.contentType,
      filePath: resolved.filePath,
      publicPath: getContentPublicPath(resolved.contentType, content.frontmatter, resolved.filePath),
      frontmatter: content.frontmatter,
      body: content.body
    }
  };
});

const read_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: read_post
}, Symbol.toStringTag, { value: 'Module' }));

const save_post$2 = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const body = await readBody(event);
  const resolved = resolveAdminContentFile(body.contentType, body.filePath);
  const incomingFrontmatter = { ...(_a = body.frontmatter) != null ? _a : {} };
  const title = String((_b = incomingFrontmatter.title) != null ? _b : "Untitled");
  let targetResolved = resolved;
  incomingFrontmatter.title = title;
  const incomingSlug = String(incomingFrontmatter.slug || "");
  incomingFrontmatter.slug = resolved.contentType === "blog" ? resolveBlogSaveSlug(incomingSlug, title) : incomingSlug || slugifyContentTitle(title);
  incomingFrontmatter.updatedAt = todayIsoDate();
  if (resolved.contentType === "blog") {
    const desiredSlug = String(incomingFrontmatter.slug || "");
    const currentSlug = resolved.filePath.replace(/^blog\//, "").replace(/\.md$/, "").split("/").pop() || "";
    if (desiredSlug && desiredSlug !== currentSlug) {
      targetResolved = resolveAdminContentFile("blog", `${desiredSlug}.md`);
      try {
        await access(targetResolved.absolutePath);
        if (targetResolved.absolutePath !== resolved.absolutePath) {
          throw createError({
            statusCode: 409,
            statusMessage: "A blog entry with this slug already exists"
          });
        }
      } catch (error) {
        if ((error == null ? void 0 : error.statusCode) === 409) throw error;
      }
      await rename(resolved.absolutePath, targetResolved.absolutePath);
    }
  }
  await writeMarkdownFile(targetResolved.absolutePath, incomingFrontmatter, String((_c = body.body) != null ? _c : ""));
  return {
    ok: true,
    item: {
      contentType: targetResolved.contentType,
      filePath: targetResolved.filePath,
      publicPath: getContentPublicPath(targetResolved.contentType, incomingFrontmatter, targetResolved.filePath),
      frontmatter: incomingFrontmatter
    }
  };
});
function slugTimestamp() {
  return (/* @__PURE__ */ new Date()).toISOString().replace(/\D/g, "").slice(0, 14);
}
function slugifyBlogTitle(value, fallback = "") {
  const words = String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").split("-").filter(Boolean).slice(0, 8);
  const selected = [];
  for (const word of words) {
    const candidate = [...selected, word].join("-");
    if (candidate.length > 72) break;
    selected.push(word);
  }
  return selected.join("-") || fallback;
}
function resolveBlogSaveSlug(incomingSlug, title) {
  if (isStaleBlogSlug(incomingSlug) && hasRealBlogTitle(title)) return slugifyBlogTitle(title);
  if (incomingSlug) return slugifyBlogTitle(incomingSlug);
  return slugifyBlogTitle(title) || `draft-${slugTimestamp()}`;
}
function isStaleBlogSlug(value) {
  const slug = String(value || "").trim();
  return !slug || /^untitled-blog-entry-\d+$/.test(slug) || /^untitled-draft-\d+$/.test(slug) || /^draft-\d+$/.test(slug) || slug === "untitled-blog-entry" || slug === "untitled-draft" || slug === "untitled" || slug === "draft";
}
function hasRealBlogTitle(value) {
  const slug = slugifyBlogTitle(String(value || ""));
  return Boolean(slug) && slug !== "untitled-blog-entry" && slug !== "untitled-draft" && slug !== "untitled" && slug !== "draft";
}

const save_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: save_post$2
}, Symbol.toStringTag, { value: 'Module' }));

const homeLayout_get$2 = defineEventHandler(async () => {
  const layout = await readHomeLayout();
  return {
    layout
  };
});

const homeLayout_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: homeLayout_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const save_post = defineEventHandler(async (event) => {
  var _a;
  const body = await readBody(event);
  const result = await writeHomeLayout((_a = body == null ? void 0 : body.layout) != null ? _a : body);
  return {
    ok: true,
    ...result
  };
});

const save_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: save_post
}, Symbol.toStringTag, { value: 'Module' }));

const allowedImageExtensions = /* @__PURE__ */ new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);
function titleFromFilename$1(filename) {
  return filename.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
const list_get$2 = defineEventHandler(async () => {
  const uploadsRoot = resolve(process.cwd(), "public/uploads");
  const assets = [];
  async function walk(current) {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const absolutePath = join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(absolutePath);
        continue;
      }
      if (!entry.isFile()) continue;
      const extension = extname(entry.name).toLowerCase();
      if (!allowedImageExtensions.has(extension)) continue;
      const relativePath = relative(uploadsRoot, absolutePath).split(sep).join("/");
      const info = await stat(absolutePath);
      const filename = relativePath.split("/").pop() || relativePath;
      assets.push({
        id: relativePath.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase(),
        title: titleFromFilename$1(filename),
        filename,
        url: `/uploads/${relativePath}`,
        type: extension.replace(".", "").toUpperCase(),
        usage: "Media Library",
        description: "Image available from public/uploads.",
        size: info.size,
        updatedAt: info.mtime.toISOString()
      });
    }
  }
  try {
    await mkdir(uploadsRoot, { recursive: true });
    await walk(uploadsRoot);
  } catch {
    return { assets: [] };
  }
  return {
    assets: assets.sort((a, b) => a.title.localeCompare(b.title))
  };
});

const list_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: list_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const maxUploadBytes = 5 * 1024 * 1024;
const allowedExtensions = /* @__PURE__ */ new Set([".jpg", ".jpeg", ".png", ".webp"]);
const allowedMimeTypes = /* @__PURE__ */ new Set(["image/jpeg", "image/png", "image/webp"]);
function titleFromFilename(filename) {
  return filename.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
function safeFilename(filename) {
  const extension = extname(filename).toLowerCase();
  const base = filename.replace(/\.[a-z0-9]+$/i, "").normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-").toLowerCase().replace(/^-+|-+$/g, "");
  return `${base || "gribo-image"}-${randomUUID().slice(0, 8)}${extension}`;
}
const upload_post = defineEventHandler(async (event) => {
  var _a;
  const parts = await readMultipartFormData(event);
  const file = parts == null ? void 0 : parts.find((part) => part.name === "file");
  if (!file || !file.filename || !((_a = file.data) == null ? void 0 : _a.length)) {
    throw createError({ statusCode: 400, statusMessage: "Upload failed." });
  }
  const extension = extname(file.filename).toLowerCase();
  const mimeType = String(file.type || "").toLowerCase();
  if (!allowedExtensions.has(extension) || !allowedMimeTypes.has(mimeType)) {
    throw createError({ statusCode: 400, statusMessage: "File type not allowed." });
  }
  if (file.data.length > maxUploadBytes) {
    throw createError({ statusCode: 400, statusMessage: "File is too large." });
  }
  const uploadsRoot = resolve(process.cwd(), "public/uploads");
  await mkdir(uploadsRoot, { recursive: true });
  const filename = safeFilename(file.filename);
  const absolutePath = resolve(uploadsRoot, filename);
  if (!absolutePath.startsWith(uploadsRoot)) {
    throw createError({ statusCode: 400, statusMessage: "Upload path is not allowed." });
  }
  await writeFile(absolutePath, file.data);
  const asset = {
    id: filename.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase(),
    title: titleFromFilename(filename),
    filename,
    url: `/uploads/${filename}`,
    type: extension.replace(".", "").toUpperCase(),
    usage: "Media Library",
    description: "Uploaded from Gribo Studio.",
    size: file.data.length,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  return {
    ok: true,
    asset
  };
});

const upload_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: upload_post
}, Symbol.toStringTag, { value: 'Module' }));

const create_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const password = String(body.password || "");
  const confirmPassword = String(body.confirmPassword || "");
  if (body.authProvider === "password" && password !== confirmPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "Password confirmation does not match."
    });
  }
  const user = await createAdminUser({
    name: String(body.name || ""),
    email: String(body.email || ""),
    username: String(body.username || ""),
    authProvider: body.authProvider === "google" ? "google" : "password",
    password,
    googleEmail: body.authProvider === "google" ? String(body.googleEmail || body.email || "") : String(body.googleEmail || "")
  });
  return {
    ok: true,
    user: toPublicAdminUser(user)
  };
});

const create_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: create_post
}, Symbol.toStringTag, { value: 'Module' }));

const list_get = defineEventHandler(async () => {
  const users = (await readAdminUsers()).map(toPublicAdminUser);
  return {
    users
  };
});

const list_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: list_get
}, Symbol.toStringTag, { value: 'Module' }));

const password_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const password = String(body.password || "");
  const confirmPassword = String(body.confirmPassword || "");
  if (password !== confirmPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "Password confirmation does not match."
    });
  }
  const user = await changeAdminUserPassword(String(body.id || ""), password);
  return {
    ok: true,
    user: toPublicAdminUser(user)
  };
});

const password_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: password_post
}, Symbol.toStringTag, { value: 'Module' }));

const status_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const status = body.status === "disabled" ? "disabled" : "active";
  const user = await setAdminUserStatus(String(body.id || ""), status);
  return {
    ok: true,
    user: toPublicAdminUser(user)
  };
});

const status_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: status_post
}, Symbol.toStringTag, { value: 'Module' }));

const update_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await updateAdminUser(String(body.id || ""), {
    name: String(body.name || ""),
    email: String(body.email || ""),
    username: String(body.username || ""),
    googleEmail: String(body.googleEmail || ""),
    authProvider: body.authProvider === "google" ? "google" : "password"
  });
  return {
    ok: true,
    user: toPublicAdminUser(user)
  };
});

const update_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: update_post
}, Symbol.toStringTag, { value: 'Module' }));

const event_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await recordAnalyticsEvent(event, body);
});

const event_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: event_post
}, Symbol.toStringTag, { value: 'Module' }));

const google_get = defineEventHandler((event) => {
  const config = getGoogleOAuthConfig(event);
  if (!config.enabled) {
    throw createError({
      statusCode: 503,
      statusMessage: "Google login is not configured."
    });
  }
  const state = createGoogleState(event);
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", config.clientId);
  url.searchParams.set("redirect_uri", config.redirectUrl);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("state", state);
  url.searchParams.set("prompt", "select_account");
  return sendRedirect(event, url.toString());
});

const google_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: google_get
}, Symbol.toStringTag, { value: 'Module' }));

const callback_get = defineEventHandler(async (event) => {
  const query = getQuery$1(event);
  const code = String(query.code || "");
  const state = String(query.state || "");
  try {
    assertGoogleState(event, state);
    if (!code) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing Google authorization code."
      });
    }
    const token = await exchangeGoogleCode(event, code);
    if (!token.access_token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Google access token was not returned."
      });
    }
    const googleUser = await fetchGoogleUser(token.access_token);
    const email = String(googleUser.email || "").toLowerCase();
    const adminUser = await findGoogleAdminUser(email);
    if (!adminUser) {
      return sendRedirect(event, "/admin/login?error=google_unauthorized");
    }
    const loggedInUser = await markAdminUserLogin(adminUser.id) || adminUser;
    const sessionToken = createAdminSessionToken({
      id: loggedInUser.id,
      name: loggedInUser.name || googleUser.name || loggedInUser.email,
      email: loggedInUser.email,
      username: loggedInUser.username,
      authProvider: "google"
    }, event);
    setAdminSessionCookie(event, sessionToken);
    return sendRedirect(event, "/admin");
  } catch (error) {
    const message = encodeURIComponent((error == null ? void 0 : error.statusMessage) || (error == null ? void 0 : error.message) || "Google login failed.");
    return sendRedirect(event, `/admin/login?error=${message}`);
  }
});

const callback_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: callback_get
}, Symbol.toStringTag, { value: 'Module' }));

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const username = String(body.username || "");
  const password = String(body.password || "");
  const result = await verifyAdminCredentials(username, password, event);
  if (!result.ok) {
    throw createError({
      statusCode: result.reason.includes("configured") ? 503 : 401,
      statusMessage: result.reason
    });
  }
  const token = createAdminSessionToken(result.user, event);
  setAdminSessionCookie(event, token);
  return {
    ok: true,
    user: result.user
  };
});

const login_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: login_post
}, Symbol.toStringTag, { value: 'Module' }));

const logout_post = defineEventHandler((event) => {
  clearAdminSessionCookie(event);
  return {
    ok: true
  };
});

const logout_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: logout_post
}, Symbol.toStringTag, { value: 'Module' }));

const session_get = defineEventHandler((event) => {
  const config = getAdminAuthConfig(event);
  const googleConfig = getGoogleOAuthConfig(event);
  const session = readAdminSession(event);
  return {
    authenticated: Boolean(session),
    loginEnabled: config.enabled,
    googleLoginEnabled: googleConfig.enabled,
    production: config.production,
    reason: config.enabled ? "" : config.reason,
    user: session ? {
      id: session.id,
      name: session.name,
      email: session.email,
      authProvider: session.authProvider,
      username: session.username
    } : null
  };
});

const session_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: session_get
}, Symbol.toStringTag, { value: 'Module' }));

const health_get = defineEventHandler(() => ({
  ok: true,
  name: "Gribo Digital",
  stage: "foundation"
}));

const health_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: health_get
}, Symbol.toStringTag, { value: 'Module' }));

const homeLayout_get = defineEventHandler(async () => {
  const layout = await readHomeLayout();
  return {
    layout
  };
});

const homeLayout_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: homeLayout_get
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
	return {
		body: encodeForwardSlashes(stringify(splitPayload(ssrContext).payload, ssrContext["~payloadReducers"])) ,
		statusCode: getResponseStatus(ssrContext.event),
		statusMessage: getResponseStatusText(ssrContext.event),
		headers: {
			"content-type": "application/json;charset=utf-8" ,
			"x-powered-by": "Nuxt"
		}
	};
}
function renderPayloadJsonScript(opts) {
	const contents = opts.data ? encodeForwardSlashes(stringify(opts.data, opts.ssrContext["~payloadReducers"])) : "";
	const payload = {
		"type": "application/json",
		"innerHTML": contents,
		"data-nuxt-data": appId,
		"data-ssr": !(opts.ssrContext.noSSR)
	};
	{
		payload.id = "__NUXT_DATA__";
	}
	if (opts.src) {
		payload["data-src"] = opts.src;
	}
	const config = uneval(opts.ssrContext.config);
	return [payload, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}` }];
}

function encodeForwardSlashes(str) {
	return str.replaceAll("/", "\\u002F");
}
function splitPayload(ssrContext) {
	const { data, prerenderedAt, ...initial } = ssrContext.payload;
	return {
		initial: {
			...initial,
			prerenderedAt
		},
		payload: {
			data,
			prerenderedAt
		}
	};
}

const renderSSRHeadOptions = {"omitLineBreaks":true};

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const PAYLOAD_FILENAME = "_payload.json" ;
const handler = defineRenderHandler(async (event) => {
	const nitroApp = useNitroApp();
	
	const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
	if (ssrError && !("__unenv__" in event.node.req)) {
		throw createError({
			status: 404,
			statusText: "Page Not Found: /__nuxt_error",
			message: "Page Not Found: /__nuxt_error"
		});
	}
	
	const ssrContext = createSSRContext(event);
	
	const headEntryOptions = { mode: "server" };
	ssrContext.head.push(appHead, headEntryOptions);
	if (ssrError) {
		
		const status = ssrError.status || ssrError.statusCode;
		if (status) {
			
			ssrError.status = ssrError.statusCode = Number.parseInt(status);
		}
		if (typeof ssrError.data === "string") {
			try {
				ssrError.data = destr(ssrError.data);
			} catch {}
		}
		setSSRError(ssrContext, ssrError);
	}
	
	const routeOptions = getRouteRules(event);
	
	const _PAYLOAD_EXTRACTION = !ssrContext.noSSR && (NUXT_RUNTIME_PAYLOAD_EXTRACTION);
	
	
	
	const _PAYLOAD_INLINE = !_PAYLOAD_EXTRACTION || NUXT_PAYLOAD_INLINE;
	const isRenderingPayload = (_PAYLOAD_EXTRACTION || routeOptions.prerender) && PAYLOAD_URL_RE.test(ssrContext.url);
	if (isRenderingPayload) {
		const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
		ssrContext.url = url;
		event._path = event.node.req.url = url;
	}
	if (routeOptions.ssr === false) {
		ssrContext.noSSR = true;
	}
	const payloadURL = _PAYLOAD_EXTRACTION ? joinURL(ssrContext.runtimeConfig.app.cdnURL || ssrContext.runtimeConfig.app.baseURL, ssrContext.url.replace(/\?.*$/, ""), PAYLOAD_FILENAME) + "?" + ssrContext.runtimeConfig.app.buildId : undefined;
	
	const renderer = await getRenderer(ssrContext);
	const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
		
		
		if ((ssrContext["~renderResponse"] || ssrContext._renderResponse) && error.message === "skipping render") {
			return {};
		}
		
		const _err = !ssrError && ssrContext.payload?.error || error;
		await ssrContext.nuxt?.hooks.callHook("app:error", _err);
		throw _err;
	});
	
	
	const inlinedStyles = [];
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult: _rendered
	});
	if (ssrContext["~renderResponse"] || ssrContext._renderResponse) {
		
		return ssrContext["~renderResponse"] || ssrContext._renderResponse;
	}
	
	if (ssrContext.payload?.error && !ssrError) {
		throw ssrContext.payload.error;
	}
	
	if (isRenderingPayload) {
		const response = renderPayloadResponse(ssrContext);
		return response;
	}
	const NO_SCRIPTS = routeOptions.noScripts;
	
	const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
	
	
	if (_PAYLOAD_EXTRACTION && !_PAYLOAD_INLINE && !NO_SCRIPTS) {
		ssrContext.head.push({ link: [{
			rel: "preload",
			as: "fetch",
			crossorigin: "anonymous",
			href: payloadURL
		} ] }, headEntryOptions);
	}
	
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	const link = [];
	for (const resource of Object.values(styles)) {
		
		if ("inline" in getQuery(resource.file)) {
			continue;
		}
		
		
		
		link.push({
			rel: "stylesheet",
			href: renderer.rendererContext.buildAssetsURL(resource.file),
			crossorigin: ""
		});
	}
	if (link.length) {
		ssrContext.head.push({ link }, headEntryOptions);
	}
	if (!NO_SCRIPTS) {
		
		
		
		if (ssrContext["~lazyHydratedModules"]) {
			for (const id of ssrContext["~lazyHydratedModules"]) {
				ssrContext.modules?.delete(id);
			}
		}
		ssrContext.head.push({ link: getPreloadLinks(ssrContext, renderer.rendererContext) }, headEntryOptions);
		ssrContext.head.push({ link: getPrefetchLinks(ssrContext, renderer.rendererContext) }, headEntryOptions);
		
		ssrContext.head.push({ script: _PAYLOAD_INLINE ? renderPayloadJsonScript({
			ssrContext,
			data: ssrContext.payload
		})  : renderPayloadJsonScript({
			ssrContext,
			data: splitPayload(ssrContext).initial,
			src: payloadURL
		})  }, {
			...headEntryOptions,
			
			tagPosition: "bodyClose",
			tagPriority: "high"
		});
	}
	
	if (!routeOptions.noScripts) {
		const tagPosition = "head";
		ssrContext.head.push({ script: Object.values(scripts).map((resource) => ({
			type: resource.module ? "module" : null,
			src: renderer.rendererContext.buildAssetsURL(resource.file),
			defer: resource.module ? null : true,
			
			
			tagPosition,
			crossorigin: ""
		})) }, headEntryOptions);
	}
	const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
	
	const htmlContext = {
		htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
		head: normalizeChunks([headTags]),
		bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
		bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
		body: [replaceIslandTeleports(ssrContext, _rendered.html) , APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG],
		bodyAppend: [bodyTags]
	};
	
	await nitroApp.hooks.callHook("render:html", htmlContext, { event });
	
	return {
		body: renderHTMLDocument(htmlContext),
		statusCode: getResponseStatus(event),
		statusMessage: getResponseStatusText(event),
		headers: {
			"content-type": "text/html;charset=utf-8",
			"x-powered-by": "Nuxt"
		}
	};
});
function normalizeChunks(chunks) {
	const result = [];
	for (const _chunk of chunks) {
		const chunk = _chunk?.trim();
		if (chunk) {
			result.push(chunk);
		}
	}
	return result;
}
function joinTags(tags) {
	return tags.join("");
}
function joinAttrs(chunks) {
	if (chunks.length === 0) {
		return "";
	}
	return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
	return "<!DOCTYPE html>" + `<html${joinAttrs(html.htmlAttrs)}>` + `<head>${joinTags(html.head)}</head>` + `<body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body>` + "</html>";
}

const renderer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handler
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
