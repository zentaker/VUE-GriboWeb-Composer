import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { createHash, randomBytes, scryptSync, timingSafeEqual, createHmac, randomUUID } from 'node:crypto';
import { mkdir, writeFile as writeFile$1, readFile as readFile$1, stat, readdir as readdir$1 } from 'node:fs/promises';
import { resolve as resolve$1, dirname as dirname$1, relative, join, basename, extname, isAbsolute as isAbsolute$1, sep } from 'node:path';
import http from 'node:http';
import https from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promises, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import anymatch from 'anymatch';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE = /%252f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    const nextChar = input[_base.length];
    if (!nextChar || nextChar === "/" || nextChar === "?") {
      return input;
    }
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const nextChar = input[_base.length];
  if (nextChar && nextChar !== "/" && nextChar !== "?") {
    return input;
  }
  const trimmed = input.slice(_base.length).replace(/^\/+/, "");
  return "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const NullObject = /* @__PURE__ */ (() => {
  const C = function() {
  };
  C.prototype = /* @__PURE__ */ Object.create(null);
  return C;
})();
function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = new NullObject();
  const opt = {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize$2(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

function parseSetCookie(setCookieValue, options) {
  const parts = (setCookieValue || "").split(";").filter((str) => typeof str === "string" && !!str.trim());
  const nameValuePairStr = parts.shift() || "";
  const parsed = _parseNameValuePair(nameValuePairStr);
  const name = parsed.name;
  let value = parsed.value;
  try {
    value = options?.decode === false ? value : (options?.decode || decodeURIComponent)(value);
  } catch {
  }
  const cookie = {
    name,
    value
  };
  for (const part of parts) {
    const sides = part.split("=");
    const partKey = (sides.shift() || "").trimStart().toLowerCase();
    const partValue = sides.join("=");
    switch (partKey) {
      case "expires": {
        cookie.expires = new Date(partValue);
        break;
      }
      case "max-age": {
        cookie.maxAge = Number.parseInt(partValue, 10);
        break;
      }
      case "secure": {
        cookie.secure = true;
        break;
      }
      case "httponly": {
        cookie.httpOnly = true;
        break;
      }
      case "samesite": {
        cookie.sameSite = partValue;
        break;
      }
      default: {
        cookie[partKey] = partValue;
      }
    }
  }
  return cookie;
}
function _parseNameValuePair(nameValuePairStr) {
  let name = "";
  let value = "";
  const nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name, value };
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = { ...defaults };
  for (const key of Object.keys(baseObject)) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function o(n){throw new Error(`${n} is not implemented yet!`)}let i$1 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o("Readable.asyncIterator")}iterator(e){throw o("Readable.iterator")}map(e,t){throw o("Readable.map")}filter(e,t){throw o("Readable.filter")}forEach(e,t){throw o("Readable.forEach")}reduce(e,t,r){throw o("Readable.reduce")}find(e,t){throw o("Readable.find")}findIndex(e,t){throw o("Readable.findIndex")}some(e,t){throw o("Readable.some")}toArray(e){throw o("Readable.toArray")}every(e,t){throw o("Readable.every")}flatMap(e,t){throw o("Readable.flatMap")}drop(e,t){throw o("Readable.drop")}take(e,t){throw o("Readable.take")}asIndexedPairs(e){throw o("Readable.asIndexedPairs")}};let l$1 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;writableAborted=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return Promise.resolve()}};const c$1=class c{allowHalfOpen=true;_destroy;constructor(e=new i$1,t=new l$1){Object.assign(this,e),Object.assign(this,t),this._destroy=m(e._destroy,t._destroy);}};function _(){return Object.assign(c$1.prototype,i$1.prototype),Object.assign(c$1.prototype,l$1.prototype),c$1}function m(...n){return function(...e){for(const t of n)t(...e);}}const g=_();class A extends g{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}}class y extends i$1{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}}function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$1{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R(n={}){const e=new E,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function v(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const S=new Set([101,204,205,304]);async function b(n,e){const t=new y,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(S.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function C(n,e,t={}){try{const r=await b(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:v(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function parse(multipartBodyBuffer, boundary) {
  let lastline = "";
  let state = 0 /* INIT */;
  let buffer = [];
  const allParts = [];
  let currentPartHeaders = [];
  for (let i = 0; i < multipartBodyBuffer.length; i++) {
    const prevByte = i > 0 ? multipartBodyBuffer[i - 1] : null;
    const currByte = multipartBodyBuffer[i];
    const newLineChar = currByte === 10 || currByte === 13;
    if (!newLineChar) {
      lastline += String.fromCodePoint(currByte);
    }
    const newLineDetected = currByte === 10 && prevByte === 13;
    if (0 /* INIT */ === state && newLineDetected) {
      if ("--" + boundary === lastline) {
        state = 1 /* READING_HEADERS */;
      }
      lastline = "";
    } else if (1 /* READING_HEADERS */ === state && newLineDetected) {
      if (lastline.length > 0) {
        const i2 = lastline.indexOf(":");
        if (i2 > 0) {
          const name = lastline.slice(0, i2).toLowerCase();
          const value = lastline.slice(i2 + 1).trim();
          currentPartHeaders.push([name, value]);
        }
      } else {
        state = 2 /* READING_DATA */;
        buffer = [];
      }
      lastline = "";
    } else if (2 /* READING_DATA */ === state) {
      if (lastline.length > boundary.length + 4) {
        lastline = "";
      }
      if ("--" + boundary === lastline) {
        const j = buffer.length - lastline.length;
        const part = buffer.slice(0, j - 1);
        allParts.push(process$1(part, currentPartHeaders));
        buffer = [];
        currentPartHeaders = [];
        lastline = "";
        state = 3 /* READING_PART_SEPARATOR */;
      } else {
        buffer.push(currByte);
      }
      if (newLineDetected) {
        lastline = "";
      }
    } else if (3 /* READING_PART_SEPARATOR */ === state && newLineDetected) {
      state = 1 /* READING_HEADERS */;
    }
  }
  return allParts;
}
function process$1(data, headers) {
  const dataObj = {};
  const contentDispositionHeader = headers.find((h) => h[0] === "content-disposition")?.[1] || "";
  for (const i of contentDispositionHeader.split(";")) {
    const s = i.split("=");
    if (s.length !== 2) {
      continue;
    }
    const key = (s[0] || "").trim();
    if (key === "name" || key === "filename") {
      const _value = (s[1] || "").trim().replace(/"/g, "");
      dataObj[key] = Buffer.from(_value, "latin1").toString("utf8");
    }
  }
  const contentType = headers.find((h) => h[0] === "content-type")?.[1] || "";
  if (contentType) {
    dataObj.type = contentType;
  }
  dataObj.data = Buffer.from(data);
  return dataObj;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function getRouterParams(event, opts = {}) {
  let params = event.context.params || {};
  if (opts.decode) {
    params = { ...params };
    for (const key in params) {
      params[key] = decode$1(params[key]);
    }
  }
  return params;
}
function getRouterParam(event, name, opts = {}) {
  const params = getRouterParams(event, opts);
  return params[name];
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
const getHeader = getRequestHeader;
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const _header = event.node.req.headers["x-forwarded-host"];
    const xForwardedHost = (_header || "").split(",").shift()?.trim();
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !/\bchunked\b/i.test(
    String(event.node.req.headers["transfer-encoding"] ?? "")
  )) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
async function readMultipartFormData(event) {
  const contentType = getRequestHeader(event, "content-type");
  if (!contentType || !contentType.startsWith("multipart/form-data")) {
    return;
  }
  const boundary = contentType.match(/boundary=([^;]*)(;|$)/i)?.[1];
  if (!boundary) {
    return;
  }
  const body = await readRawBody(event, false);
  if (!body) {
    return;
  }
  return parse(body, boundary);
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function getDistinctCookieKey(name, opts) {
  return [name, opts.domain || "", opts.path || "/"].join(";");
}

function parseCookies(event) {
  return parse$1(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions = {}) {
  if (!serializeOptions.path) {
    serializeOptions = { path: "/", ...serializeOptions };
  }
  const newCookie = serialize$2(name, value, serializeOptions);
  const currentCookies = splitCookiesString(
    event.node.res.getHeader("set-cookie")
  );
  if (currentCookies.length === 0) {
    event.node.res.setHeader("set-cookie", newCookie);
    return;
  }
  const newCookieKey = getDistinctCookieKey(name, serializeOptions);
  event.node.res.removeHeader("set-cookie");
  for (const cookie of currentCookies) {
    const parsed = parseSetCookie(cookie);
    const key = getDistinctCookieKey(parsed.name, parsed);
    if (key === newCookieKey) {
      continue;
    }
    event.node.res.appendHeader("set-cookie", cookie);
  }
  event.node.res.appendHeader("set-cookie", newCookie);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
const setHeader = setResponseHeader;
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
    for (const [key, value] of entries) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _rawReqUrl = event.node.req.url || "/";
    const _reqPath = _decodePath(event._path || _rawReqUrl);
    event._path = _reqPath;
    const _needsRawUrl = _reqPath !== _rawReqUrl;
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _needsRawUrl ? layer.route.length > 1 ? _rawReqUrl.slice(layer.route.length) || "/" : _rawReqUrl : _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function _decodePath(url) {
  const qIndex = url.indexOf("?");
  const path = qIndex === -1 ? url : url.slice(0, qIndex);
  const query = qIndex === -1 ? "" : url.slice(qIndex);
  const decodedPath = path.includes("%25") ? decodePath(path.replace(/%25/g, "%2525")) : decodePath(path);
  return decodedPath + query;
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s$1=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  if (value instanceof FormData || value instanceof URLSearchParams) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (contentType === "text/event-stream") {
    return "stream";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
      if (!(context.options.headers instanceof Headers)) {
        context.options.headers = new Headers(
          context.options.headers || {}
          /* compat */
        );
      }
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        const contentType = context.options.headers.get("content-type");
        if (typeof context.options.body !== "string") {
          context.options.body = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(
            context.options.body
          ).toString() : JSON.stringify(context.options.body);
        }
        if (!contentType) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch$1 = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s$1;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch({ fetch: fetch$1, Headers: Headers$1, AbortController });
const $fetch$1 = ofetch;

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  nsStorage.keys = nsStorage.getKeys;
  nsStorage.getItems = async (items, commonOptions) => {
    const prefixedItems = items.map(
      (item) => typeof item === "string" ? base + item : { ...item, key: base + item.key }
    );
    const results = await storage.getItems(prefixedItems, commonOptions);
    return results.map((entry) => ({
      key: entry.key.slice(base.length),
      value: entry.value
    }));
  };
  nsStorage.setItems = async (items, commonOptions) => {
    const prefixedItems = items.map((item) => ({
      key: base + item.key,
      value: item.value,
      options: item.options
    }));
    return storage.setItems(prefixedItems, commonOptions);
  };
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$2 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$2,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE$1 = /\.\.:|\.\.$/;
const DRIVER_NAME$1 = "fs";
const unstorage_47drivers_47fs = defineDriver((userOptions = {}) => {
  if (!userOptions.base) {
    throw createRequiredError(DRIVER_NAME$1, "base");
  }
  const base = resolve$1(userOptions.base);
  const ignore = anymatch(
    userOptions.ignore || ["**/node_modules/**", "**/.git/**"]
  );
  const r = (key) => {
    if (PATH_TRAVERSE_RE$1.test(key)) {
      throw createError(
        DRIVER_NAME$1,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(base, key.replace(/:/g, "/"));
    return resolved;
  };
  let _watcher;
  const _unwatch = async () => {
    if (_watcher) {
      await _watcher.close();
      _watcher = void 0;
    }
  };
  return {
    name: DRIVER_NAME$1,
    options: userOptions,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (userOptions.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (userOptions.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (userOptions.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), ignore, topts?.maxDepth);
    },
    async clear() {
      if (userOptions.readOnly || userOptions.noClear) {
        return;
      }
      await rmRecursive(r("."));
    },
    async dispose() {
      if (_watcher) {
        await _watcher.close();
      }
    },
    async watch(callback) {
      if (_watcher) {
        return _unwatch;
      }
      const { watch } = await import('chokidar');
      await new Promise((resolve2, reject) => {
        const watchOptions = {
          ignoreInitial: true,
          ...userOptions.watchOptions
        };
        if (!watchOptions.ignored) {
          watchOptions.ignored = [];
        } else if (Array.isArray(watchOptions.ignored)) {
          watchOptions.ignored = [...watchOptions.ignored];
        } else {
          watchOptions.ignored = [watchOptions.ignored];
        }
        watchOptions.ignored.push(ignore);
        _watcher = watch(base, watchOptions).on("ready", () => {
          resolve2();
        }).on("error", reject).on("all", (eventName, path) => {
          path = relative(base, path);
          if (eventName === "change" || eventName === "add") {
            callback("update", path);
          } else if (eventName === "unlink") {
            callback("remove", path);
          }
        });
      });
      return _unwatch;
    }
  };
});

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('adminUsers', unstorage_47drivers_47fs({"driver":"fs","base":"./server/data"}));
storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function serialize$1(o){return typeof o=="string"?`'${o}'`:new c().serialize(o)}const c=/*@__PURE__*/function(){class o{#t=new Map;compare(t,r){const e=typeof t,n=typeof r;return e==="string"&&n==="string"?t.localeCompare(r):e==="number"&&n==="number"?t-r:String.prototype.localeCompare.call(this.serialize(t,true),this.serialize(r,true))}serialize(t,r){if(t===null)return "null";switch(typeof t){case "string":return r?t:`'${t}'`;case "bigint":return `${t}n`;case "object":return this.$object(t);case "function":return this.$function(t)}return String(t)}serializeObject(t){const r=Object.prototype.toString.call(t);if(r!=="[object Object]")return this.serializeBuiltInType(r.length<10?`unknown:${r}`:r.slice(8,-1),t);const e=t.constructor,n=e===Object||e===void 0?"":e.name;if(n!==""&&globalThis[n]===e)return this.serializeBuiltInType(n,t);if(typeof t.toJSON=="function"){const i=t.toJSON();return n+(i!==null&&typeof i=="object"?this.$object(i):`(${this.serialize(i)})`)}return this.serializeObjectEntries(n,Object.entries(t))}serializeBuiltInType(t,r){const e=this["$"+t];if(e)return e.call(this,r);if(typeof r?.entries=="function")return this.serializeObjectEntries(t,r.entries());throw new Error(`Cannot serialize ${t}`)}serializeObjectEntries(t,r){const e=Array.from(r).sort((i,a)=>this.compare(i[0],a[0]));let n=`${t}{`;for(let i=0;i<e.length;i++){const[a,l]=e[i];n+=`${this.serialize(a,true)}:${this.serialize(l)}`,i<e.length-1&&(n+=",");}return n+"}"}$object(t){let r=this.#t.get(t);return r===void 0&&(this.#t.set(t,`#${this.#t.size}`),r=this.serializeObject(t),this.#t.set(t,r)),r}$function(t){const r=Function.prototype.toString.call(t);return r.slice(-15)==="[native code] }"?`${t.name||""}()[native]`:`${t.name}(${t.length})${r.replace(/\s*\n\s*/g,"")}`}$Array(t){let r="[";for(let e=0;e<t.length;e++)r+=this.serialize(t[e]),e<t.length-1&&(r+=",");return r+"]"}$Date(t){try{return `Date(${t.toISOString()})`}catch{return "Date(null)"}}$ArrayBuffer(t){return `ArrayBuffer[${new Uint8Array(t).join(",")}]`}$Set(t){return `Set${this.$Array(Array.from(t).sort((r,e)=>this.compare(r,e)))}`}$Map(t){return this.serializeObjectEntries("Map",t.entries())}}for(const s of ["Error","RegExp","URL"])o.prototype["$"+s]=function(t){return `${s}(${t})`};for(const s of ["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join(",")}]`};for(const s of ["BigInt64Array","BigUint64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join("n,")}${t.length>0?"n":""}]`};return o}();

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r="sha256",s="base64url";function digest(t){if(e)return e(r,t,s);const o=createHash(r).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

function hash$1(input) {
  return digest(serialize$1(input));
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

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function upperFirst(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function pascalCase(str, opts) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => upperFirst(p)).join("") : "";
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner ?? "-") : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

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
    "buildId": "4ecb1bdd-8a68-4aaf-9e9e-5a52dfb9909a",
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
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
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

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}

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
  createRouter$1({ routes: config.nitro.routeRules })
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
            throw createError$1({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
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
            throw createError$1({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
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
		const { template } = await import('./error-500.mjs');
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
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
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
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
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

const plugins = [
  
];

const assets = {
  "/uploads/.gitkeep": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1-rcg7GeeTSRscbqD9i0bNnzLlkvw\"",
    "mtime": "2026-05-08T02:41:00.937Z",
    "size": 1,
    "path": "../public/uploads/.gitkeep"
  },
  "/uploads/ai-docs-interface.svg": {
    "type": "image/svg+xml",
    "etag": "\"397-jnX/cRm1221P2KqkfAJV2IjEsqg\"",
    "mtime": "2026-05-10T22:13:09.606Z",
    "size": 919,
    "path": "../public/uploads/ai-docs-interface.svg"
  },
  "/uploads/gribo-park-night.svg": {
    "type": "image/svg+xml",
    "etag": "\"37d-B7mBANxhsZWwwfdq0SpQObIgKAo\"",
    "mtime": "2026-05-10T22:13:08.932Z",
    "size": 893,
    "path": "../public/uploads/gribo-park-night.svg"
  },
  "/uploads/digicore2-6e392119.webp": {
    "type": "image/webp",
    "etag": "\"4ba8-D2bekrzadVCFoZTZFToPp2tview\"",
    "mtime": "2026-05-11T21:22:53.793Z",
    "size": 19368,
    "path": "../public/uploads/digicore2-6e392119.webp"
  },
  "/uploads/digicore1-784852cf.webp": {
    "type": "image/webp",
    "etag": "\"9c6a-ksCrS82OCj9oB6trL6IeYOEKJqg\"",
    "mtime": "2026-05-11T06:14:47.329Z",
    "size": 40042,
    "path": "../public/uploads/digicore1-784852cf.webp"
  },
  "/uploads/lab-map-card.svg": {
    "type": "image/svg+xml",
    "etag": "\"330-mFOX1hLEoSQiGJjp8rCiUc3yZrI\"",
    "mtime": "2026-05-10T22:13:10.948Z",
    "size": 816,
    "path": "../public/uploads/lab-map-card.svg"
  },
  "/uploads/studio-preview.svg": {
    "type": "image/svg+xml",
    "etag": "\"337-dsQt/WziaUnn5wa+ALYP7jAXJ8w\"",
    "mtime": "2026-05-10T22:13:10.589Z",
    "size": 823,
    "path": "../public/uploads/studio-preview.svg"
  },
  "/uploads/openclaw-terminal.svg": {
    "type": "image/svg+xml",
    "etag": "\"4ca-UcFudFwJpsA6UrCryug3voPib+I\"",
    "mtime": "2026-05-10T22:13:08.187Z",
    "size": 1226,
    "path": "../public/uploads/openclaw-terminal.svg"
  },
  "/uploads/digicore1-60b82b69.webp": {
    "type": "image/webp",
    "etag": "\"9c6a-ksCrS82OCj9oB6trL6IeYOEKJqg\"",
    "mtime": "2026-05-11T06:15:10.443Z",
    "size": 40042,
    "path": "../public/uploads/digicore1-60b82b69.webp"
  },
  "/_nuxt/36JVGvi8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"71e-LHP3XXzcKzeW8jrh7EkNjUbDbF4\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 1822,
    "path": "../public/_nuxt/36JVGvi8.js"
  },
  "/uploads/tennis-analysis-card.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b2-4+igOLdYy7nT2D+EiEFG1lNKNTQ\"",
    "mtime": "2026-05-10T22:13:08.471Z",
    "size": 946,
    "path": "../public/uploads/tennis-analysis-card.svg"
  },
  "/_nuxt/753KyjS3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d2-EL8mMoBEM7Fb9vd2r0dHx1XQunc\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 466,
    "path": "../public/_nuxt/753KyjS3.js"
  },
  "/_nuxt/admin.CZMY-zGq.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1268-sPRbiXAs7RJjNrcmjLQrQZeV7zk\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 4712,
    "path": "../public/_nuxt/admin.CZMY-zGq.css"
  },
  "/_nuxt/AdminInspector.PChlyT7-.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1a7-mLjRxyA44NJJbaE7TuHaEUZugGE\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 423,
    "path": "../public/_nuxt/AdminInspector.PChlyT7-.css"
  },
  "/_nuxt/AdminPanel.C-gQ6PDc.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1d8-accPgugK1IaokfLPgL+lLDCg26M\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 472,
    "path": "../public/_nuxt/AdminPanel.C-gQ6PDc.css"
  },
  "/_nuxt/AdminPreviewPanel.lspptwf1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"65b-WVW7iSDgf2A+4BrG0tL+mwL+qZ4\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 1627,
    "path": "../public/_nuxt/AdminPreviewPanel.lspptwf1.css"
  },
  "/_nuxt/AdminHero.HbS6XPMD.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"350-3/THTeThDvU11biaokINxOnAX2s\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 848,
    "path": "../public/_nuxt/AdminHero.HbS6XPMD.css"
  },
  "/_nuxt/ArticleHero.BL2wxKFv.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"bea-czrHrAkYmfMn4wYNCFksfOSZ37Q\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 3050,
    "path": "../public/_nuxt/ArticleHero.BL2wxKFv.css"
  },
  "/_nuxt/B-hLI4E5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"58c-9LaARRtTGZ4lgAs6voboZ6QIVBQ\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 1420,
    "path": "../public/_nuxt/B-hLI4E5.js"
  },
  "/_nuxt/B-mUDTqW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"83e-n0Rk4SuxKYG2zSWv9yf4mSfY9+M\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 2110,
    "path": "../public/_nuxt/B-mUDTqW.js"
  },
  "/_nuxt/B0sd9C8o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"372-dpwArlMNmIDZpCRXUsLGJsPoR84\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 882,
    "path": "../public/_nuxt/B0sd9C8o.js"
  },
  "/_nuxt/B2zCnN1O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2f0-5CnPefB88TGGH2s96LJWry9VfVo\"",
    "mtime": "2026-05-11T21:26:42.775Z",
    "size": 752,
    "path": "../public/_nuxt/B2zCnN1O.js"
  },
  "/_nuxt/B3hRfWc_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1968-D6oaAYvWxAqLmdfq+Fi05L7JZ3E\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 6504,
    "path": "../public/_nuxt/B3hRfWc_.js"
  },
  "/_nuxt/backups.h31MPs6V.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e65-zEd8/J4TcAkYcNdVfjpEE+OqA84\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 3685,
    "path": "../public/_nuxt/backups.h31MPs6V.css"
  },
  "/_nuxt/B5TEo_Dk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b0b-hk0K9AoLwuEWAIAFvXvrt/SlsVc\"",
    "mtime": "2026-05-11T21:26:42.775Z",
    "size": 2827,
    "path": "../public/_nuxt/B5TEo_Dk.js"
  },
  "/_nuxt/BaPsi0Zz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"986-SQIrB8YcwW0EpmlssUhOzjmum98\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 2438,
    "path": "../public/_nuxt/BaPsi0Zz.js"
  },
  "/_nuxt/Bi5HG1y8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3a5d-LV0A53K6jAX8aiGfBAS9Um/y3bA\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 14941,
    "path": "../public/_nuxt/Bi5HG1y8.js"
  },
  "/_nuxt/BgkJSOS_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dc-BX/mG+h8B8tMj8MDST9ReBYYrQk\"",
    "mtime": "2026-05-11T21:26:42.775Z",
    "size": 220,
    "path": "../public/_nuxt/BgkJSOS_.js"
  },
  "/_nuxt/BjqegkAM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8c2-pZSVop+04ApbZI8GRQxEq55DC54\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 2242,
    "path": "../public/_nuxt/BjqegkAM.js"
  },
  "/_nuxt/BK-PDuov.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f0-ci1q+vjv5uaiAIwCapaOn4LXAHk\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 496,
    "path": "../public/_nuxt/BK-PDuov.js"
  },
  "/_nuxt/BnKF0Bbm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b34-uAFeagN3hotBc23HB+L8IPIVLYQ\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 2868,
    "path": "../public/_nuxt/BnKF0Bbm.js"
  },
  "/_nuxt/Bd7Tg5QI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2fa73-9tnGnqQ/bYEm4KOQHxehTQ0oYMg\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 195187,
    "path": "../public/_nuxt/Bd7Tg5QI.js"
  },
  "/_nuxt/BOVfqQPt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cf-+LU0ueI3m9T/fAih1hbWQV42l7U\"",
    "mtime": "2026-05-11T21:26:42.775Z",
    "size": 207,
    "path": "../public/_nuxt/BOVfqQPt.js"
  },
  "/_nuxt/BQlbiSJB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f0-e++Da5Rln9zF+LclQVbb3scQtXA\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 496,
    "path": "../public/_nuxt/BQlbiSJB.js"
  },
  "/_nuxt/C2UqM29Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f0-Sl8ivc4hrn0+JoR3SiNYl/dt2yE\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 496,
    "path": "../public/_nuxt/C2UqM29Y.js"
  },
  "/_nuxt/BJ-vc5JC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30c55-DKZ4pLkow4XRKpVtiBIBLa9Bjug\"",
    "mtime": "2026-05-11T21:26:42.775Z",
    "size": 199765,
    "path": "../public/_nuxt/BJ-vc5JC.js"
  },
  "/_nuxt/C3SZTlZm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1920-ska+/gq8Lb9TeCVeWphksspOIcc\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 6432,
    "path": "../public/_nuxt/C3SZTlZm.js"
  },
  "/_nuxt/Cb9jWSFW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c25-GP54USC0Cwhpqc7eRXw/panUFOQ\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 3109,
    "path": "../public/_nuxt/Cb9jWSFW.js"
  },
  "/_nuxt/BwYO5gIJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7173-FseWHdSrnXlFIt8XchQQFkouX1c\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 29043,
    "path": "../public/_nuxt/BwYO5gIJ.js"
  },
  "/_nuxt/CCyI3Mql.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ee8-gs2DKTq1FYr15+aQJJREuK7odSM\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 7912,
    "path": "../public/_nuxt/CCyI3Mql.js"
  },
  "/_nuxt/CNRfKROg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2bb-WgnG+wS6R8ezb74wY9VHN/uSKgE\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 699,
    "path": "../public/_nuxt/CNRfKROg.js"
  },
  "/_nuxt/CG-iZvk8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"147-s6/9IXeMsRBvbqAhBao6deTuZNs\"",
    "mtime": "2026-05-11T21:26:42.775Z",
    "size": 327,
    "path": "../public/_nuxt/CG-iZvk8.js"
  },
  "/_nuxt/CJ0ahix_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b11-UzRSyrfMPajj7+aLqT+wJCNMT5k\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 2833,
    "path": "../public/_nuxt/CJ0ahix_.js"
  },
  "/_nuxt/CJYVw9oD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"109b-P3KBQ1Sl14mm7DGyE2h77+PR1fU\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 4251,
    "path": "../public/_nuxt/CJYVw9oD.js"
  },
  "/_nuxt/CRhxXwCT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ff2-FJ9bG1JMSFVe4ezy020UDmEAbHg\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 4082,
    "path": "../public/_nuxt/CRhxXwCT.js"
  },
  "/_nuxt/ContentBlockRenderer.Dt3p0Osp.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1a91-t/OFUqqhEYdEGZulQfJPF1qAZLg\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 6801,
    "path": "../public/_nuxt/ContentBlockRenderer.Dt3p0Osp.css"
  },
  "/_nuxt/CsidT_4Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"28fc-/ZxrCLChQgyEp1avEl9QiuyoAwQ\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 10492,
    "path": "../public/_nuxt/CsidT_4Y.js"
  },
  "/_nuxt/CSjffPLn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14f4-OKf5hCdLw6o0eJN0z0RE8l/My4w\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 5364,
    "path": "../public/_nuxt/CSjffPLn.js"
  },
  "/_nuxt/CVxI4yEF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2254-NdqEJWLwxMy0J2zf4tfZMgj7rSs\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 8788,
    "path": "../public/_nuxt/CVxI4yEF.js"
  },
  "/_nuxt/CVocyJe_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d5f-woPexrXdCEj6voUqIZQ9KiD4TrE\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 7519,
    "path": "../public/_nuxt/CVocyJe_.js"
  },
  "/_nuxt/CxHaxCH0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19e-jeGR8AapMoel4XxYoTFrGls2XT4\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 414,
    "path": "../public/_nuxt/CxHaxCH0.js"
  },
  "/_nuxt/CyDGD6De.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"259-t/MeVoJtrwuL1IUgr6kJI0U1elY\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 601,
    "path": "../public/_nuxt/CyDGD6De.js"
  },
  "/_nuxt/D6sduEPl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ecf-dOFxKLx3kcuMCvou7efzqP6yyus\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 3791,
    "path": "../public/_nuxt/D6sduEPl.js"
  },
  "/_nuxt/DaKO6MBX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d1-45Bn5aFcPinsZk91f8xiArDU3QA\"",
    "mtime": "2026-05-11T21:26:42.775Z",
    "size": 209,
    "path": "../public/_nuxt/DaKO6MBX.js"
  },
  "/_nuxt/DD0O6iCF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"276-agYUhUNrE3eaPVVPdhHokuZ5v28\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 630,
    "path": "../public/_nuxt/DD0O6iCF.js"
  },
  "/_nuxt/DCMAtumI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d96-OoEF9nzNkMvV5ORY4RBtJ8REst4\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 3478,
    "path": "../public/_nuxt/DCMAtumI.js"
  },
  "/_nuxt/DF1_QmcS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"23f6-JLWin7WU5/aomDv4bOu9C0FR6RU\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 9206,
    "path": "../public/_nuxt/DF1_QmcS.js"
  },
  "/_nuxt/DMHnYO5u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dc-XbOCLS75wLMtKcd0CpkrwiSPHcE\"",
    "mtime": "2026-05-11T21:26:42.775Z",
    "size": 220,
    "path": "../public/_nuxt/DMHnYO5u.js"
  },
  "/_nuxt/DBiWdeGr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"edaa-0HtLCGINYlrJjXbtTs5raty9G9I\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 60842,
    "path": "../public/_nuxt/DBiWdeGr.js"
  },
  "/_nuxt/DMHyig_G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bc4-XjRS0Uiz/pV18905/HKK9UND9Y8\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 3012,
    "path": "../public/_nuxt/DMHyig_G.js"
  },
  "/_nuxt/DMZPs0w3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"199-6ycT3R9bMXCeQ4IjczD37klF5DU\"",
    "mtime": "2026-05-11T21:26:42.775Z",
    "size": 409,
    "path": "../public/_nuxt/DMZPs0w3.js"
  },
  "/_nuxt/DnSfXAOH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"295-MX4KSM+njMkKsVVbP5B76dwUgV4\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 661,
    "path": "../public/_nuxt/DnSfXAOH.js"
  },
  "/_nuxt/docs.CnEOVwZI.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"87b-eeatQw12/NaoXElK0pEdy3j9Afs\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 2171,
    "path": "../public/_nuxt/docs.CnEOVwZI.css"
  },
  "/_nuxt/DU980A_B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d1-inJVBapIW8rdfqMIpC7Nd4ts5NM\"",
    "mtime": "2026-05-11T21:26:42.775Z",
    "size": 209,
    "path": "../public/_nuxt/DU980A_B.js"
  },
  "/_nuxt/DqejwFdN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3af-b+PIGs6ErAFNmre/ZR7hXmv5J1E\"",
    "mtime": "2026-05-11T21:26:42.775Z",
    "size": 943,
    "path": "../public/_nuxt/DqejwFdN.js"
  },
  "/_nuxt/DV1H77cr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d1-nP38uZX1g0YylwsN88LyL2npQwo\"",
    "mtime": "2026-05-11T21:26:42.775Z",
    "size": 209,
    "path": "../public/_nuxt/DV1H77cr.js"
  },
  "/_nuxt/DycaLNwy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1163-W5F12X6HFYnBhMiA4dywpuo3FMU\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 4451,
    "path": "../public/_nuxt/DycaLNwy.js"
  },
  "/_nuxt/DYRdatds.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1024-Rs+SwyIUFn+/zZPVZ+hN6PCh2cI\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 4132,
    "path": "../public/_nuxt/DYRdatds.js"
  },
  "/_nuxt/D_yL2Lf2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b06-hkqOhbNfUevJkBHufKOAYnJACYg\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 2822,
    "path": "../public/_nuxt/D_yL2Lf2.js"
  },
  "/_nuxt/entry.DLpLkrXY.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1905-Hf1E8sc2Boz/qxfyPCY2O2rkNuo\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 6405,
    "path": "../public/_nuxt/entry.DLpLkrXY.css"
  },
  "/_nuxt/ereDzsSV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a4c-Kyw6Abbd7sWm9crKI2Ba2/ItCaM\"",
    "mtime": "2026-05-11T21:26:42.775Z",
    "size": 6732,
    "path": "../public/_nuxt/ereDzsSV.js"
  },
  "/_nuxt/error-500.DBWf9FGj.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"773-9MNIE+ztUss3x7HN62QKMFz0rhs\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 1907,
    "path": "../public/_nuxt/error-500.DBWf9FGj.css"
  },
  "/_nuxt/edit.B_wympqe.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"62eb-igsq8jZQF9a7jukx+qySGAlwFKk\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 25323,
    "path": "../public/_nuxt/edit.B_wympqe.css"
  },
  "/_nuxt/error-404.C-Ezrlz-.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"97e-YLcQ2HBNLea0KJoUeqSqSCendIU\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 2430,
    "path": "../public/_nuxt/error-404.C-Ezrlz-.css"
  },
  "/_nuxt/f4dmj7IE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e8-oXN/r+vaG0TXm5dfG/GtyXzKeec\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 488,
    "path": "../public/_nuxt/f4dmj7IE.js"
  },
  "/_nuxt/g5gg4hZH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ad-TFBZ8YGoDKvsZR22K7p91rJahho\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 173,
    "path": "../public/_nuxt/g5gg4hZH.js"
  },
  "/_nuxt/H1GrvlE9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f0-wOCXRgyfYrJfKKlLBSIXzV5fj9k\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 496,
    "path": "../public/_nuxt/H1GrvlE9.js"
  },
  "/_nuxt/H6uxeido.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d6-caJkRSPsHOkJfeI2V3JFlfkoOZk\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 214,
    "path": "../public/_nuxt/H6uxeido.js"
  },
  "/_nuxt/home.CVD-QIr-.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"fae-r+fqDUKLyc6d6MZQZGN8pLyi5Rc\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 4014,
    "path": "../public/_nuxt/home.CVD-QIr-.css"
  },
  "/_nuxt/HQoBwXVv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"de-qorLGyZvgXqTc8TKsCfbgCWfDLY\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 222,
    "path": "../public/_nuxt/HQoBwXVv.js"
  },
  "/_nuxt/iKzPCN8t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dc-SxCN6mEvkc2pfEafirLR51rWYwQ\"",
    "mtime": "2026-05-11T21:26:42.775Z",
    "size": 220,
    "path": "../public/_nuxt/iKzPCN8t.js"
  },
  "/_nuxt/index.BkhmTlTu.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"846-onVyqQEbOvH3kCBraMn79kVyIOw\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 2118,
    "path": "../public/_nuxt/index.BkhmTlTu.css"
  },
  "/_nuxt/i5gHNjCm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d1-m1+lYB34gbVazqB9DF06YIKr2LE\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 209,
    "path": "../public/_nuxt/i5gHNjCm.js"
  },
  "/_nuxt/index.BYG6ewLO.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2c4a-aEMYQdMuuGbN987Jaa5lpXLL7Bc\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 11338,
    "path": "../public/_nuxt/index.BYG6ewLO.css"
  },
  "/_nuxt/index.C2Zl4whs.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"75c-Wveyidv+tOCJ4/WJpGVxYc6IMYM\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 1884,
    "path": "../public/_nuxt/index.C2Zl4whs.css"
  },
  "/_nuxt/index.CuTMlp-2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"89c-oLUJXHNVSLkC5aYFyz/HlPvuZ70\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 2204,
    "path": "../public/_nuxt/index.CuTMlp-2.css"
  },
  "/_nuxt/index.DmnbbZpb.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"63e-bXXFfbi359LgNCqUFgMgjU+v51A\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 1598,
    "path": "../public/_nuxt/index.DmnbbZpb.css"
  },
  "/_nuxt/index.DVQ0auI7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c31-cbvkLp/joMJP6KE2M/kUAOPMY3U\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 3121,
    "path": "../public/_nuxt/index.DVQ0auI7.css"
  },
  "/_nuxt/index.ge-UQWte.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9b8-/qDJqZkOA3pJaxxzwg3gffVDlfY\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 2488,
    "path": "../public/_nuxt/index.ge-UQWte.css"
  },
  "/_nuxt/index.ooVU9wP5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"555-Uj1GY5Eyp508Uv0cPDQIAkPE8VU\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 1365,
    "path": "../public/_nuxt/index.ooVU9wP5.css"
  },
  "/_nuxt/index._2oh2sm7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5e3-sNYCnlMdS7FoCEeexVJ9NjCU7EU\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 1507,
    "path": "../public/_nuxt/index._2oh2sm7.css"
  },
  "/_nuxt/IRl8z_B4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17b-DLRe8M1aReHNRvyPhJizzXuy+8k\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 379,
    "path": "../public/_nuxt/IRl8z_B4.js"
  },
  "/_nuxt/insights.CCMIBzpX.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"baf-dJkq/fOXi9APDTLsE/yppp08gq0\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 2991,
    "path": "../public/_nuxt/insights.CCMIBzpX.css"
  },
  "/_nuxt/JJxwdyyd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d1-61Fvo+VxyyK17NO5M5mH8k//4Yk\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 209,
    "path": "../public/_nuxt/JJxwdyyd.js"
  },
  "/_nuxt/L5iU032b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dda-A7xccJF2v5XqyXWP+UGUKtWimY8\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 3546,
    "path": "../public/_nuxt/L5iU032b.js"
  },
  "/_nuxt/lC2XbMQ8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"da-CIWvIdv+78yEp08MrFTRvQfVEfg\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 218,
    "path": "../public/_nuxt/lC2XbMQ8.js"
  },
  "/_nuxt/login.C3tVgg1S.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"bf4-WU2LcfOl7IrU7VKqIKWua5B9Kr4\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 3060,
    "path": "../public/_nuxt/login.C3tVgg1S.css"
  },
  "/_nuxt/l7EAL5nh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f0-3CtTP89UGfBHsllYJmXIeJfQ4lE\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 496,
    "path": "../public/_nuxt/l7EAL5nh.js"
  },
  "/_nuxt/mrXZI8kG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ea-Ry5hScTnPzdZTKaEFNBJy838yQY\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 490,
    "path": "../public/_nuxt/mrXZI8kG.js"
  },
  "/_nuxt/media.DcdcA-Nz.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"78c-5Ais5RHx975I4qnCIpg1xGfCE8c\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 1932,
    "path": "../public/_nuxt/media.DcdcA-Nz.css"
  },
  "/_nuxt/new.B1Baa5sF.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"fa2-pZzcVpe0RpAyrhIwCTLwnhWM3hQ\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 4002,
    "path": "../public/_nuxt/new.B1Baa5sF.css"
  },
  "/_nuxt/NK4HgxCb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6dd-GISp4jgDprRoTDK0a6qLkge6FoY\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 1757,
    "path": "../public/_nuxt/NK4HgxCb.js"
  },
  "/_nuxt/o3OhJoo8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ff-uU9fwlrVORyw7R92jNTKCo/1QBM\"",
    "mtime": "2026-05-11T21:26:42.775Z",
    "size": 511,
    "path": "../public/_nuxt/o3OhJoo8.js"
  },
  "/_nuxt/oHnszCZX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"330d-s9m69kEpsRH0orIhxhiMeZVEz0U\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 13069,
    "path": "../public/_nuxt/oHnszCZX.js"
  },
  "/_nuxt/p9I4Mn1i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"33b-QFzv7MeaERgVJ0r/GrAzf6iTssw\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 827,
    "path": "../public/_nuxt/p9I4Mn1i.js"
  },
  "/_nuxt/ProsePre.D5orA6B_.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e-jczvRAVUXbzGL6yotozKFbyMO4s\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 30,
    "path": "../public/_nuxt/ProsePre.D5orA6B_.css"
  },
  "/_nuxt/q2qwdVor.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e1-y2b+bBlMIoF9AyedYUoEenWQ2UA\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 225,
    "path": "../public/_nuxt/q2qwdVor.js"
  },
  "/_nuxt/Qfrkt2pp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"44c-95qOTUVQYrf292Vphyq1rxlNMDA\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 1100,
    "path": "../public/_nuxt/Qfrkt2pp.js"
  },
  "/_nuxt/queue.CBqL_n8W.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"434-9neX+2svU0N+ZuNknJ89vCi1lNM\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 1076,
    "path": "../public/_nuxt/queue.CBqL_n8W.css"
  },
  "/_nuxt/r7fYHaHj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d6-fppM5eHuTz9fo3/MdbsSDhc1hyc\"",
    "mtime": "2026-05-11T21:26:42.775Z",
    "size": 214,
    "path": "../public/_nuxt/r7fYHaHj.js"
  },
  "/_nuxt/RelatedContent.DjoyoQBG.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"29e-9s06TlN1FfjvBjUlX6xiGMlrOgo\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 670,
    "path": "../public/_nuxt/RelatedContent.DjoyoQBG.css"
  },
  "/_nuxt/SaIxZmAb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ee-t5atco+cgrpeEEFfHW1pZZe1/x8\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 238,
    "path": "../public/_nuxt/SaIxZmAb.js"
  },
  "/_nuxt/S4oB7KgT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14f4-oq7u/yG73iTT8FC+PhT/iGZhW6Q\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 5364,
    "path": "../public/_nuxt/S4oB7KgT.js"
  },
  "/_nuxt/SectionHero.iEeqGGM1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"392-X1UXZx8brjy8I9xIA6JKFkJpWU4\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 914,
    "path": "../public/_nuxt/SectionHero.iEeqGGM1.css"
  },
  "/_nuxt/sqlite3-opfs-async-proxy-C_otN2ZJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24eb-/FBLK7guMdffqRNvJNbJgk4Zwss\"",
    "mtime": "2026-05-11T21:26:42.776Z",
    "size": 9451,
    "path": "../public/_nuxt/sqlite3-opfs-async-proxy-C_otN2ZJ.js"
  },
  "/_nuxt/TagPill.BKRTF5WN.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"466-LlMTYrh3rdIApLMt8wLFrsmziU4\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 1126,
    "path": "../public/_nuxt/TagPill.BKRTF5WN.css"
  },
  "/_nuxt/sqlite3-worker1-bundler-friendly-Bv6ABw9v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30103-GOxHNTh2sTNh/exLYlR0tZpazpY\"",
    "mtime": "2026-05-11T21:26:42.776Z",
    "size": 196867,
    "path": "../public/_nuxt/sqlite3-worker1-bundler-friendly-Bv6ABw9v.js"
  },
  "/_nuxt/ThemeToggle.3f2Fsrbn.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7d-ZMJLm89SKPIr+T3bfNSa0mFwTaw\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 125,
    "path": "../public/_nuxt/ThemeToggle.3f2Fsrbn.css"
  },
  "/_nuxt/users.CuRonam_.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"af5-YyoBUYUh3IPcjBWJe1OuuA9RkqE\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 2805,
    "path": "../public/_nuxt/users.CuRonam_.css"
  },
  "/_nuxt/Uwe6ZxJ_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"de-efP291V/VMHHGzREbldIZlkP2w0\"",
    "mtime": "2026-05-11T21:26:42.775Z",
    "size": 222,
    "path": "../public/_nuxt/Uwe6ZxJ_.js"
  },
  "/_nuxt/waWoqhI4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"362a-FBj685WycvE+sdxwvbEnyWL3Y0c\"",
    "mtime": "2026-05-11T21:26:42.773Z",
    "size": 13866,
    "path": "../public/_nuxt/waWoqhI4.js"
  },
  "/_nuxt/wZR65wl8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"25a-6klK7Q8Mi7HdOHBzVRiVdim0A94\"",
    "mtime": "2026-05-11T21:26:42.774Z",
    "size": 602,
    "path": "../public/_nuxt/wZR65wl8.js"
  },
  "/_nuxt/ZYBAoBxX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fdd-jOGMVz9SjlhBUz4uiWsikPYj+L4\"",
    "mtime": "2026-05-11T21:26:42.775Z",
    "size": 4061,
    "path": "../public/_nuxt/ZYBAoBxX.js"
  },
  "/_nuxt/sqlite3-DBpDb1lf.wasm": {
    "type": "application/wasm",
    "etag": "\"d117f-DZ/FD4oW3SqSLEuDOEQ4+vXRNGQ\"",
    "mtime": "2026-05-11T21:26:42.780Z",
    "size": 856447,
    "path": "../public/_nuxt/sqlite3-DBpDb1lf.wasm"
  },
  "/_nuxt/sqlite3.DBpDb1lf.wasm": {
    "type": "application/wasm",
    "etag": "\"d117f-DZ/FD4oW3SqSLEuDOEQ4+vXRNGQ\"",
    "mtime": "2026-05-11T21:26:42.770Z",
    "size": 856447,
    "path": "../public/_nuxt/sqlite3.DBpDb1lf.wasm"
  },
  "/_nuxt/_...C2Q7Z5vC.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a5a-s+Rnx4g4oAdtzTRZnXS7uWq0xys\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 2650,
    "path": "../public/_nuxt/_...C2Q7Z5vC.css"
  },
  "/_nuxt/_slug_.Cd1AvZqw.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"594-DSseSJxR9jieq0vGVgUX1IrkZKQ\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 1428,
    "path": "../public/_nuxt/_slug_.Cd1AvZqw.css"
  },
  "/_nuxt/_slug_.mo964AD3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"679-xFGPdeDJ09AbYqP9HePJ7rXGhY8\"",
    "mtime": "2026-05-11T21:26:42.771Z",
    "size": 1657,
    "path": "../public/_nuxt/_slug_.mo964AD3.css"
  },
  "/__nuxt_content/docs/sql_dump.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"17b8-s4OxZ0MJA6COaHwyXOnpCHnkftQ\"",
    "mtime": "2026-05-11T21:26:57.465Z",
    "size": 6072,
    "path": "../public/__nuxt_content/docs/sql_dump.txt"
  },
  "/_nuxt/_slug_.X2N1mMmR.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1c51-KIO568MrPkFAiDE9CzoVhD0jWFg\"",
    "mtime": "2026-05-11T21:26:42.772Z",
    "size": 7249,
    "path": "../public/_nuxt/_slug_.X2N1mMmR.css"
  },
  "/__nuxt_content/blog/sql_dump.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"139c-mror4Ms9u3qByXcEe/HxfvRn2iU\"",
    "mtime": "2026-05-11T21:26:57.465Z",
    "size": 5020,
    "path": "../public/__nuxt_content/blog/sql_dump.txt"
  },
  "/__nuxt_content/home/sql_dump.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"598-Dw8kNihBCyqE7tvqooDtfnlBTG8\"",
    "mtime": "2026-05-11T21:26:57.465Z",
    "size": 1432,
    "path": "../public/__nuxt_content/home/sql_dump.txt"
  },
  "/__nuxt_content/labs/sql_dump.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1468-S3dQIPgLwu4/e6sQWUAzyo/N0yo\"",
    "mtime": "2026-05-11T21:26:57.467Z",
    "size": 5224,
    "path": "../public/__nuxt_content/labs/sql_dump.txt"
  },
  "/__nuxt_content/projects/sql_dump.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"178c-hkyjAcxT7bUm8J98tR7iMWAUSzs\"",
    "mtime": "2026-05-11T21:26:57.465Z",
    "size": 6028,
    "path": "../public/__nuxt_content/projects/sql_dump.txt"
  },
  "/__nuxt_content/settings/sql_dump.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"434-LU/oP9NyVXcCF0vLcorecM6yyEU\"",
    "mtime": "2026-05-11T21:26:57.467Z",
    "size": 1076,
    "path": "../public/__nuxt_content/settings/sql_dump.txt"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-AJRct60vb7siiG0RnbW804ukyd8\"",
    "mtime": "2026-05-11T21:26:57.494Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/4ecb1bdd-8a68-4aaf-9e9e-5a52dfb9909a.json": {
    "type": "application/json",
    "etag": "\"58-EZ3ml4RAEDIYcAAn0FCDKpy9OPc\"",
    "mtime": "2026-05-11T21:26:57.494Z",
    "size": 88,
    "path": "../public/_nuxt/builds/meta/4ecb1bdd-8a68-4aaf-9e9e-5a52dfb9909a.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

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
      throw createError$1({ statusCode: 404 });
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
  if (!input.name.trim()) throw createError$1({ statusCode: 400, statusMessage: "Name is required." });
  if (!email) throw createError$1({ statusCode: 400, statusMessage: "Email is required." });
  if (!username) throw createError$1({ statusCode: 400, statusMessage: "Username is required." });
  if (!["password", "google"].includes(input.authProvider)) {
    throw createError$1({ statusCode: 400, statusMessage: "Invalid auth provider." });
  }
  if (input.authProvider === "password" && (!input.password || input.password.length < 10)) {
    throw createError$1({ statusCode: 400, statusMessage: "Password must be at least 10 characters." });
  }
  if (users.some((user2) => normalizeEmail(user2.email) === email || user2.googleEmail && normalizeEmail(user2.googleEmail) === email)) {
    throw createError$1({ statusCode: 409, statusMessage: "Email is already used by another admin user." });
  }
  if (googleEmail && users.some((user2) => normalizeEmail(user2.email) === googleEmail || user2.googleEmail && normalizeEmail(user2.googleEmail) === googleEmail)) {
    throw createError$1({ statusCode: 409, statusMessage: "Google email is already used by another admin user." });
  }
  if (users.some((user2) => normalizeUsername(user2.username) === username)) {
    throw createError$1({ statusCode: 409, statusMessage: "Username is already used by another admin user." });
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
  if (index === -1) throw createError$1({ statusCode: 404, statusMessage: "Admin user not found." });
  const next = { ...users[index] };
  if (input.name !== void 0) next.name = input.name.trim();
  if (input.email !== void 0) next.email = normalizeEmail(input.email);
  if (input.username !== void 0) next.username = normalizeUsername(input.username);
  if (input.googleEmail !== void 0) next.googleEmail = input.googleEmail ? normalizeEmail(input.googleEmail) : void 0;
  if (input.authProvider !== void 0) next.authProvider = input.authProvider;
  if (!next.name) throw createError$1({ statusCode: 400, statusMessage: "Name is required." });
  if (!next.email) throw createError$1({ statusCode: 400, statusMessage: "Email is required." });
  if (!next.username) throw createError$1({ statusCode: 400, statusMessage: "Username is required." });
  if (!["password", "google"].includes(next.authProvider)) {
    throw createError$1({ statusCode: 400, statusMessage: "Invalid auth provider." });
  }
  if (next.authProvider === "google" && !next.googleEmail) next.googleEmail = next.email;
  if (next.authProvider === "password" && !next.passwordHash) {
    throw createError$1({ statusCode: 400, statusMessage: "Password users require a password." });
  }
  if (users.some((user) => user.id !== id && normalizeUsername(user.username) === next.username)) {
    throw createError$1({ statusCode: 409, statusMessage: "Username is already used by another admin user." });
  }
  if (users.some((user) => user.id !== id && (normalizeEmail(user.email) === next.email || user.googleEmail && normalizeEmail(user.googleEmail) === next.email))) {
    throw createError$1({ statusCode: 409, statusMessage: "Email is already used by another admin user." });
  }
  next.updatedAt = now();
  users[index] = next;
  await writeAdminUsers(users);
  return next;
}
async function setAdminUserStatus(id, status) {
  const users = await readAdminUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) throw createError$1({ statusCode: 404, statusMessage: "Admin user not found." });
  users[index] = { ...users[index], status, updatedAt: now() };
  await writeAdminUsers(users);
  return users[index];
}
async function changeAdminUserPassword(id, password) {
  if (!password || password.length < 10) {
    throw createError$1({ statusCode: 400, statusMessage: "Password must be at least 10 characters." });
  }
  const users = await readAdminUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) throw createError$1({ statusCode: 404, statusMessage: "Admin user not found." });
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
  const production = true;
  const localRequest = isLocalRequest(event);
  const enforceProductionCredentials = !localRequest;
  const username = process.env.ADMIN_USERNAME || (enforceProductionCredentials ? "" : "admin");
  const password = process.env.ADMIN_PASSWORD || (enforceProductionCredentials ? "" : PLACEHOLDER_VALUE);
  const passwordHash = process.env.ADMIN_PASSWORD_HASH || "";
  const sessionSecret = process.env.SESSION_SECRET || (enforceProductionCredentials ? "" : "dev-session-secret");
  const sessionMaxAgeSeconds = Number(process.env.ADMIN_SESSION_MAX_AGE_SECONDS || DEFAULT_SESSION_TTL_SECONDS);
  const hasBootstrapCredentials = Boolean(username && (password || passwordHash));
  const hasCredentials = Boolean(sessionSecret && (hasBootstrapCredentials || !enforceProductionCredentials));
  const usesUnsafePlaceholder = [password, sessionSecret].includes(PLACEHOLDER_VALUE);
  const enabled = hasCredentials && (!enforceProductionCredentials || !usesUnsafePlaceholder);
  return {
    enabled,
    production,
    localRequest,
    username,
    password,
    passwordHash,
    sessionSecret,
    sessionMaxAgeSeconds: Number.isFinite(sessionMaxAgeSeconds) ? sessionMaxAgeSeconds : DEFAULT_SESSION_TTL_SECONDS,
    reason: enabled ? "" : "Admin credentials are not configured for production." 
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
    secure: !isLocalRequest(event),
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
    throw createError$1({
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

const _SxA8c9 = defineEventHandler(() => {});

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
  return await import('../build/database.compressed.mjs').then((m) => m[collection]);
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
  "blog": "v3.5.0--h2z3dg03q1Vnuzt1mf42Xh_kIUVA6aXKnscvbrK3crw",
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
    query: { v: checksums[String(collection)], t: void 0 }
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

class BoundableStatement {
	_statement;
	constructor(rawStmt) {
		this._statement = rawStmt;
	}
	bind(...params) {
		return new BoundStatement(this, params);
	}
}
class BoundStatement {
	#statement;
	#params;
	constructor(statement, params) {
		this.#statement = statement;
		this.#params = params;
	}
	bind(...params) {
		return new BoundStatement(this.#statement, params);
	}
	all() {
		return this.#statement.all(...this.#params);
	}
	run() {
		return this.#statement.run(...this.#params);
	}
	get() {
		return this.#statement.get(...this.#params);
	}
}

function nodeSqlite3Connector(opts) {
	let _db;
	const getDB = () => {
		if (_db) {
			return _db;
		}
		const nodeSqlite = globalThis.process?.getBuiltinModule?.("node:sqlite");
		if (!nodeSqlite) {
			throw new Error("`node:sqlite` module is not available. Please ensure you are running in Node.js >= 22.5 or Deno >= 2.2.");
		}
		if (opts.name === ":memory:") {
			_db = new nodeSqlite.DatabaseSync(":memory:");
			return _db;
		}
		const filePath = resolve$1(opts.cwd || ".", opts.path || `.data/${opts.name || "db"}.sqlite`);
		mkdirSync(dirname$1(filePath), { recursive: true });
		_db = new nodeSqlite.DatabaseSync(filePath);
		return _db;
	};
	return {
		name: "node-sqlite",
		dialect: "sqlite",
		getInstance: () => getDB(),
		exec(sql) {
			getDB().exec(sql);
			return { success: true };
		},
		prepare: (sql) => new StatementWrapper(() => getDB().prepare(sql)),
		dispose: () => {
			_db?.close?.();
			_db = undefined;
		}
	};
}
class StatementWrapper extends BoundableStatement {
	async all(...params) {
		const raws = this._statement().all(...params);
		return raws;
	}
	async run(...params) {
		const res = this._statement().run(...params);
		return {
			success: true,
			...res
		};
	}
	async get(...params) {
		const raw = this._statement().get(...params);
		return raw;
	}
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
    if (["nitro-prerender", "nitro-dev"].includes("node-server")) {
      db = nodeSqlite3Connector(refineDatabaseConfig(localDatabase));
    } else {
      db = nodeSqlite3Connector(refineDatabaseConfig(database));
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

function baseURL() {
	
	return useRuntimeConfig().app.baseURL;
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
  const raw = await readFile$1(absolutePath, "utf8");
  return parseMarkdownContent(raw);
}
async function writeMarkdownFile(absolutePath, frontmatter, body) {
  await mkdir(dirname$1(absolutePath), { recursive: true });
  await writeFile$1(absolutePath, stringifyMarkdownContent(frontmatter, body), "utf8");
}
function todayIsoDate() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}

const workspaceRoot$2 = resolve$1(process.cwd());
const analyticsRoot = resolve$1(workspaceRoot$2, "server/data/analytics");
const eventsPath = resolve$1(analyticsRoot, "events.jsonl");
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
  const absoluteRoot = resolve$1(workspaceRoot$2, root);
  const files = [];
  if (!await directoryExists$1(absoluteRoot)) return files;
  async function walk(current) {
    const entries = await readdir$1(current, { withFileTypes: true });
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
  const portable = relative(resolve$1(workspaceRoot$2, "content/docs"), absolutePath).replace(/\\/g, "/");
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
    const raw = await readFile$1(absolutePath, "utf8");
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
    const raw = await readFile$1(absolutePath, "utf8");
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
    const raw = await readFile$1(absolutePath, "utf8");
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
    const raw = await readFile$1(absolutePath, "utf8");
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
    throw createError$1({ statusCode: 429, statusMessage: "Too many analytics events." });
  }
}
async function recordAnalyticsEvent(event, input) {
  const route = normalizePath(input == null ? void 0 : input.route);
  if (route.startsWith("/admin") || route.startsWith("/api")) {
    throw createError$1({ statusCode: 400, statusMessage: "Admin and API routes are not tracked." });
  }
  if (JSON.stringify(input || {}).length > 4096) {
    throw createError$1({ statusCode: 413, statusMessage: "Analytics event is too large." });
  }
  const eventType = clampText(input == null ? void 0 : input.eventType);
  if (!allowedEventTypes.has(eventType)) {
    throw createError$1({ statusCode: 400, statusMessage: "Unsupported analytics event type." });
  }
  const inferredType = inferContentType(route);
  const requestedType = clampText(input == null ? void 0 : input.contentType);
  const contentType = allowedContentTypes.has(requestedType) ? requestedType : inferredType;
  if (!contentType) {
    throw createError$1({ statusCode: 400, statusMessage: "Unsupported analytics route." });
  }
  const sessionId = clampText(input == null ? void 0 : input.sessionId, "", 96);
  if (!/^[a-zA-Z0-9_-]{12,96}$/.test(sessionId)) {
    throw createError$1({ statusCode: 400, statusMessage: "Anonymous session id is required." });
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
  await writeFile$1(eventsPath, `${JSON.stringify(eventRecord)}
`, { flag: "a" });
  return {
    ok: true,
    eventId: eventRecord.eventId
  };
}
async function readAnalyticsEvents(limit) {
  if (!await fileExists$2(eventsPath)) return [];
  const raw = await readFile$1(eventsPath, "utf8");
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
    throw createError$1({ statusCode: 400, statusMessage: "Confirmation must be CLEAR ANALYTICS." });
  }
  await mkdir(analyticsRoot, { recursive: true });
  await writeFile$1(eventsPath, "", "utf8");
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
    secure: !String(getHeader(event, "host") || "").startsWith("localhost"),
    maxAge: 60 * 10,
    path: "/"
  });
  return state;
}
function assertGoogleState(event, state) {
  const stored = getCookie(event, GOOGLE_STATE_COOKIE);
  deleteCookie(event, GOOGLE_STATE_COOKIE, { path: "/" });
  if (!stored || !state || stored !== state) {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Invalid Google login state."
    });
  }
}
async function exchangeGoogleCode(event, code) {
  const config = getGoogleOAuthConfig(event);
  if (!config.enabled) {
    throw createError$1({
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
    throw createError$1({
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
    throw createError$1({
      statusCode: 401,
      statusMessage: "Google user profile could not be read."
    });
  }
  return await userResponse.json();
}

const workspaceRoot$1 = resolve$1(process.cwd());
const homeLayoutPath = resolve$1(workspaceRoot$1, "content/home/layout.json");
const snapshotsRoot$1 = resolve$1(workspaceRoot$1, "server/backups/snapshots");
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
    throw createError$1({ statusCode: 400, statusMessage: "Hero headline is required." });
  }
  if (layout.featuredProject.mode === "manual" && !layout.featuredProject.slug.trim()) {
    throw createError$1({ statusCode: 400, statusMessage: "Manual featured project requires a project slug." });
  }
  if (layout.buildLog.limit <= 0 || layout.feed.limit <= 0) {
    throw createError$1({ statusCode: 400, statusMessage: "Limits must be positive numbers." });
  }
  if (layout.feed.contentTypes.some((type) => !["blog", "projects", "labs"].includes(type))) {
    throw createError$1({ statusCode: 400, statusMessage: "Feed contains an invalid content type." });
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
  const content = await readFile$1(homeLayoutPath, "utf8");
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
  const absolutePath = resolve$1(snapshotsRoot$1, filename);
  await writeFile$1(absolutePath, JSON.stringify(snapshot, null, 2), "utf8");
  return {
    filename,
    path: relative(workspaceRoot$1, absolutePath).replace(/\\/g, "/"),
    createdAt: snapshot.manifest.exportedAt
  };
}
async function readHomeLayout() {
  try {
    const raw = await readFile$1(homeLayoutPath, "utf8");
    return normalizeHomeLayout(JSON.parse(raw));
  } catch {
    return defaultHomeLayout;
  }
}
async function writeHomeLayout(input) {
  const layout = normalizeHomeLayout(input);
  validateHomeLayout(layout);
  const snapshot = await createHomeLayoutSnapshot();
  await mkdir(dirname$1(homeLayoutPath), { recursive: true });
  await writeFile$1(homeLayoutPath, JSON.stringify(layout, null, 2), "utf8");
  return {
    layout,
    snapshot
  };
}

const workspaceRoot = resolve$1(process.cwd());
const snapshotsRoot = resolve$1(workspaceRoot, "server/backups/snapshots");
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
    throw createError$1({ statusCode: 400, statusMessage: `Unsafe portable path: ${path || "(empty)"}` });
  }
  if (!allowedRoots.some((root) => path.startsWith(root))) {
    throw createError$1({ statusCode: 400, statusMessage: `Portable path is outside approved areas: ${path}` });
  }
  if (path.startsWith("content/") && ![".md", ".json"].includes(extname(path))) {
    throw createError$1({ statusCode: 400, statusMessage: `Unsupported content file type: ${path}` });
  }
  const absolutePath = resolve$1(workspaceRoot, path);
  const relativePath = relative(workspaceRoot, absolutePath);
  if (relativePath.startsWith("..") || relativePath === ".." || isAbsolute$1(relativePath)) {
    throw createError$1({ statusCode: 400, statusMessage: `Unsafe portable path: ${path}` });
  }
  return {
    path,
    absolutePath
  };
}
function validatePackageManifest(manifest) {
  if (!manifest || typeof manifest !== "object") {
    throw createError$1({ statusCode: 400, statusMessage: "Package manifest is required." });
  }
  if (manifest.schemaVersion !== "1.0.0") {
    throw createError$1({ statusCode: 400, statusMessage: "Unsupported Gribo package schema version." });
  }
  if (!["full-site", "project", "blog", "docs", "lab"].includes(manifest.packageType)) {
    throw createError$1({ statusCode: 400, statusMessage: "Unsupported Gribo package type." });
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
      throw createError$1({ statusCode: 400, statusMessage: `Package file is not declared in manifest: ${path}` });
    }
    return {
      path,
      encoding,
      content: String((_a = file == null ? void 0 : file.content) != null ? _a : "")
    };
  });
  if (!normalizedFiles.length) {
    throw createError$1({ statusCode: 400, statusMessage: "Package contains no files." });
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
    throw createError$1({ statusCode: 400, statusMessage: `Portable path is outside approved areas: ${rootPath}` });
  }
  if (rootPath.includes("\0") || isAbsolute$1(rootPath) || rootPath.split("/").some((part) => part === "..")) {
    throw createError$1({ statusCode: 400, statusMessage: `Unsafe portable path: ${rootPath}` });
  }
  const root = resolve$1(workspaceRoot, rootPath);
  const relativeRoot = relative(workspaceRoot, root);
  if (relativeRoot.startsWith("..") || relativeRoot === ".." || isAbsolute$1(relativeRoot)) {
    throw createError$1({ statusCode: 400, statusMessage: `Unsafe portable path: ${rootPath}` });
  }
  const files = [];
  if (!await directoryExists(root)) return files;
  async function walk(current) {
    const entries = await readdir$1(current, { withFileTypes: true });
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
  const content = await readFile$1(absolutePath, encoding === "utf8" ? "utf8" : "base64");
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
    const raw = await readFile$1(absolutePath, "utf8");
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
    throw createError$1({ statusCode: 404, statusMessage: "Project not found." });
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
    throw createError$1({ statusCode: 404, statusMessage: "Blog entry not found." });
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
  const absolutePath = resolve$1(snapshotsRoot, filename);
  await writeFile$1(absolutePath, JSON.stringify(snapshot, null, 2), "utf8");
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
  await mkdir(dirname$1(absolutePath), { recursive: true });
  await writeFile$1(absolutePath, content);
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
  const entries = await readdir$1(snapshotsRoot, { withFileTypes: true });
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
const contentRoot = resolve$1(process.cwd(), "content");
function assertAdminContentType(value) {
  if (value === "project") return "projects";
  if (value === "lab") return "labs";
  if (value === "blog" || value === "projects" || value === "docs" || value === "labs") {
    return value;
  }
  throw createError$1({
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
    throw createError$1({
      statusCode: 400,
      statusMessage: "Unsafe content path"
    });
  }
}
function normalizePathSegment(value) {
  const normalized = value.replace(/\\/g, "/").replace(/^content\//, "");
  if (!normalized || isAbsolute$1(normalized) || normalized.includes("\0")) {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Unsafe content path"
    });
  }
  if (normalized.split("/").some((part) => part === ".." || part === "")) {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Unsafe content path"
    });
  }
  return normalized;
}
function resolveAdminContentFile(contentTypeInput, filePathInput) {
  const contentType = assertAdminContentType(contentTypeInput);
  const rootName = adminContentRoots[contentType];
  const typeRoot = resolve$1(contentRoot, rootName);
  const incoming = normalizePathSegment(String(filePathInput != null ? filePathInput : ""));
  const withoutType = incoming.startsWith(`${rootName}/`) ? incoming.slice(rootName.length + 1) : incoming;
  const relativeFile = withoutType.endsWith(".md") ? withoutType : `${withoutType}.md`;
  if (extname(relativeFile) !== ".md") {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Only markdown content can be edited in Stage 4"
    });
  }
  const absolutePath = resolve$1(typeRoot, relativeFile);
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
  const typeRoot = resolve$1(contentRoot, rootName);
  const files = [];
  async function walk(current) {
    const entries = await readdir$1(current, { withFileTypes: true });
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

const _lazy_s_f3df = () => import('../routes/api/admin/analytics/clear.post.mjs');
const _lazy_XIsTnd = () => import('../routes/api/admin/analytics/content.get.mjs');
const _lazy_tRY24e = () => import('../routes/api/admin/analytics/events.get.mjs');
const _lazy_KteOni = () => import('../routes/api/admin/analytics/export.get.mjs');
const _lazy_9E6syI = () => import('../routes/api/admin/analytics/labs.get.mjs');
const _lazy_xZ9C8G = () => import('../routes/api/admin/analytics/summary.get.mjs');
const _lazy_tWjB8H = () => import('../routes/api/admin/backups/export-blog.get.mjs');
const _lazy_hFvNC_ = () => import('../routes/api/admin/backups/export-full.get.mjs');
const _lazy_R_kEWh = () => import('../routes/api/admin/backups/export-project.get.mjs');
const _lazy_fpu5Tu = () => import('../routes/api/admin/backups/import.post.mjs');
const _lazy_nuUt7E = () => import('../routes/api/admin/backups/latest-snapshot.get.mjs');
const _lazy_rT2ebV = () => import('../routes/api/admin/backups/preview.post.mjs');
const _lazy_nHgelC = () => import('../routes/api/admin/backups/snapshots.get.mjs');
const _lazy_6Meu_V = () => import('../routes/api/admin/content/create.post.mjs');
const _lazy_ctiunc = () => import('../routes/api/admin/content/delete.post.mjs');
const _lazy_5Ot9ot = () => import('../routes/api/admin/content/list.get.mjs');
const _lazy_ZsQkjz = () => import('../routes/api/admin/content/read.post.mjs');
const _lazy_EwIuiz = () => import('../routes/api/admin/content/save.post.mjs');
const _lazy_A_Uxe0 = () => import('../routes/api/admin/home-layout.get.mjs');
const _lazy_Rj0kpN = () => import('../routes/api/admin/home-layout/save.post.mjs');
const _lazy_K1_nhV = () => import('../routes/api/admin/media/list.get.mjs');
const _lazy_MWbJgD = () => import('../routes/api/admin/media/upload.post.mjs');
const _lazy_eMuZ4k = () => import('../routes/api/admin/users/create.post.mjs');
const _lazy_8tjvtK = () => import('../routes/api/admin/users/list.get.mjs');
const _lazy_n4VGt0 = () => import('../routes/api/admin/users/password.post.mjs');
const _lazy_X8OGXD = () => import('../routes/api/admin/users/status.post.mjs');
const _lazy_JVRjmh = () => import('../routes/api/admin/users/update.post.mjs');
const _lazy_wTiCTk = () => import('../routes/api/analytics/event.post.mjs');
const _lazy_QtUYSl = () => import('../routes/api/auth/google.get.mjs');
const _lazy_7PjkMZ = () => import('../routes/api/auth/google/callback.get.mjs');
const _lazy_mxuvS2 = () => import('../routes/api/auth/login.post.mjs');
const _lazy_MWXgUT = () => import('../routes/api/auth/logout.post.mjs');
const _lazy_OJWNDK = () => import('../routes/api/auth/session.get.mjs');
const _lazy_DMt1dq = () => import('../routes/api/health.get.mjs');
const _lazy_x8G8ZJ = () => import('../routes/api/home-layout.get.mjs');
const _lazy__TJAIX = () => import('../routes/renderer.mjs').then(function (n) { return n.r; });

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
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
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
    debug: destr(false),
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
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return C(
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
const nitroApp = createNitroApp();
function useNitroApp() {
  return nitroApp;
}
runNitroPlugins(nitroApp);

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

export { createAdminSessionToken as $, assertAdminContentType as A, slugifyContentTitle as B, resolveAdminCreatePath as C, writeMarkdownFile as D, getContentPublicPath as E, todayIsoDate as F, resolveAdminContentFile as G, readMarkdownFile as H, listAdminMarkdownFiles as I, readHomeLayout as J, writeHomeLayout as K, readMultipartFormData as L, createAdminUser as M, toPublicAdminUser as N, readAdminUsers as O, changeAdminUserPassword as P, setAdminUserStatus as Q, updateAdminUser as R, recordAnalyticsEvent as S, getGoogleOAuthConfig as T, createGoogleState as U, sendRedirect as V, assertGoogleState as W, exchangeGoogleCode as X, fetchGoogleUser as Y, findGoogleAdminUser as Z, markAdminUserLogin as _, trapUnhandledNodeErrors as a, setAdminSessionCookie as a0, verifyAdminCredentials as a1, clearAdminSessionCookie as a2, getAdminAuthConfig as a3, readAdminSession as a4, buildAssetsURL as a5, publicAssetsURL as a6, getResponseStatusText as a7, getResponseStatus as a8, encodePath as a9, defineRenderHandler as aa, getRouteRules as ab, joinURL as ac, parseURL as ad, decodePath as ae, getRequestHeaders as af, getRequestURL as ag, hasProtocol as ah, isScriptProtocol as ai, withQuery as aj, sanitizeStatusCode as ak, getContext as al, $fetch$1 as am, baseURL as an, defu as ao, executeAsync as ap, parseQuery as aq, withTrailingSlash as ar, withoutTrailingSlash as as, hash$1 as at, pascalCase as au, kebabCase as av, withLeadingSlash as aw, useNitroApp as b, defineEventHandler as c, destr as d, clearAnalyticsData as e, aggregateAnalytics as f, getQuery as g, readAnalyticsEvents as h, exportAnalytics as i, createError$1 as j, collectBlogPackageFiles as k, createPortablePackage as l, createDownloadResponse as m, collectFullBackupFiles as n, collectProjectPackageFiles as o, detectImportConflicts as p, createSafetySnapshot as q, readBody as r, setupGracefulShutdown as s, toNodeListener as t, useRuntimeConfig as u, validatePortablePackage as v, applyImportReplace as w, applyImportAsCopy as x, listSafetySnapshots as y, setHeader as z };
//# sourceMappingURL=nitro.mjs.map
