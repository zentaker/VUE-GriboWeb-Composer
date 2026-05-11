import { _ as __nuxt_component_0 } from './nuxt-link-BzjT64JD.mjs';
import { _ as __nuxt_component_2$1 } from './ContentBlockRenderer-D2CSYyNT.mjs';
import { _ as __nuxt_component_1 } from './ArticleHero-Dixb1bez.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, withDirectives, vModelText, openBlock, createBlock, Fragment, renderList, vModelSelect, createCommentVNode, isRef, vModelCheckbox, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc, d as useRoute, u as useRouter } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './AdminHero-lJqa4kRI.mjs';
import { _ as __nuxt_component_2$2 } from './AdminPanel-CPS4BSK_.mjs';
import { u as useAdminContent } from './useAdminContent-DePtxANz.mjs';
import { u as useStudioMediaLibrary } from './useStudioMediaLibrary-D3ln06-l.mjs';
import { u as useAsyncData } from './asyncData-BKyabxD9.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BlogComposerPreview",
  __ssrInlineRender: true,
  props: {
    title: { default: "Untitled content" },
    description: { default: "Editorial preview surface." },
    category: { default: "Field note" },
    date: { default: "Draft" },
    status: { default: "draft" },
    coverStyle: { default: "editorial-gradient" },
    accentColor: { default: "coral" },
    blocks: { default: () => [] }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ArticleHero = __nuxt_component_1;
      const _component_ContentBlockRenderer = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "blog-preview-surface" }, _attrs))} data-v-20fd6a1d>`);
      _push(ssrRenderComponent(_component_ArticleHero, {
        title: __props.title,
        description: __props.description,
        category: __props.category,
        date: __props.date,
        status: __props.status,
        "cover-style": __props.coverStyle,
        "accent-color": __props.accentColor
      }, null, _parent));
      if (__props.blocks.length) {
        _push(`<div class="blog-preview-blocks" data-v-20fd6a1d>`);
        _push(ssrRenderComponent(_component_ContentBlockRenderer, {
          blocks: __props.blocks.slice(0, 2),
          context: "blog"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<p class="blog-preview-empty" data-v-20fd6a1d>No visible blocks yet. The public article will use the markdown fallback until blocks are added.</p>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/BlogComposerPreview.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-20fd6a1d"]]), { __name: "BlogComposerPreview" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "edit",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const router = useRouter();
    const allowedTypes = ["blog", "projects", "docs", "labs"];
    const normalizeType = (value) => {
      if (value === "project") return "projects";
      if (value === "lab") return "labs";
      return allowedTypes.includes(value) ? value : "";
    };
    const routeType = normalizeType(String(route.query.type || ""));
    const contentType = allowedTypes.includes(routeType) ? routeType : "blog";
    const filePath = String(route.query.file || "");
    const { listContent, readContent, saveContent, archiveContent } = useAdminContent();
    const frontmatter = ref({});
    const markdownBody = ref("");
    const statusMessage = ref("");
    const saveState = ref("idle");
    let saveMessageTimer;
    const isSaving = ref(false);
    const isDeleting = ref(false);
    const deleteConfirmation = ref("");
    const tagsText = ref("");
    const stackText = ref("");
    const relatedTagsText = ref("");
    const roadmapText = ref("");
    const openQuestionsText = ref("");
    const isAttachingDocs = ref(false);
    const selectedAttachmentDocs = ref([]);
    const activeTab = ref("content");
    const selectedBlockId = ref("");
    const mediaPickerMode = ref("");
    ref("");
    const blockTabs = [
      { id: "content", label: "Content" },
      { id: "metadata", label: "Metadata" },
      { id: "seo", label: "SEO" },
      { id: "media", label: "Media" },
      { id: "preview", label: "Preview" }
    ];
    const { assets: mediaAssets, pending: mediaPending, error: mediaError, refreshAssets } = useStudioMediaLibrary();
    [__temp, __restore] = withAsyncContext(() => useAsyncData("composer-media-assets", () => refreshAssets().then(() => true))), await __temp, __restore();
    const { data: docsData } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `editor-related-docs-${filePath}`,
      () => contentType === "projects" ? listContent("docs") : Promise.resolve({ items: [] })
    )), __temp = await __temp, __restore(), __temp);
    const { data: labsData } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("editor-labs-list", () => listContent("labs"))), __temp = await __temp, __restore(), __temp);
    const splitComma = (value) => value.split(",").map((item) => item.trim()).filter(Boolean);
    const splitLines = (value) => value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
    const toText = (value) => Array.isArray(value) ? value.join(", ") : "";
    const toLines = (value) => Array.isArray(value) ? value.join("\n") : "";
    const docsOptions = computed(() => docsData.value?.items ?? []);
    const labsOptions = computed(() => labsData.value?.items ?? []);
    const statusOptions = ["draft", "review", "published", "archived"];
    const currentStatus = computed(() => String(frontmatter.value.status || "draft"));
    const statusChoices = computed(
      () => statusOptions.includes(currentStatus.value) ? statusOptions : [currentStatus.value, ...statusOptions]
    );
    const labChoices = computed(() => labsOptions.value.map((lab) => ({
      label: lab.title,
      value: lab.slug || lab.filePath.replace(/^labs\//, "").replace(/\.md$/, "")
    })));
    const labSelectChoices = computed(() => {
      const current = String(frontmatter.value.lab || "");
      if (!current || labChoices.value.some((lab) => lab.value === current)) return labChoices.value;
      return [{ label: current, value: current }, ...labChoices.value];
    });
    const labDisplayName = computed(() => labChoices.value.find((lab) => lab.value === frontmatter.value.lab)?.label || frontmatter.value.lab || "Unassigned");
    const isBlogComposer = computed(() => contentType === "blog");
    const coverStyleOptions = [
      { value: "terminal-dark", label: "Terminal dark" },
      { value: "editorial-card", label: "Editorial card" },
      { value: "gradient-surface", label: "Gradient surface" },
      { value: "minimal-cover", label: "Minimal cover" },
      { value: "editorial-gradient", label: "Editorial gradient" },
      { value: "soft-image-overlay", label: "Soft image overlay" },
      { value: "minimal-documentation", label: "Minimal documentation" }
    ];
    const blogHeroStyleOptions = [
      { value: "editorial-gradient", label: "Editorial gradient" },
      { value: "terminal-dark", label: "Terminal dark" },
      { value: "soft-magazine", label: "Soft magazine" },
      { value: "minimal-dark", label: "Minimal dark" }
    ];
    const coverPositionOptions = ["center", "left", "right", "top", "bottom"];
    const accentOptions = [
      { value: "coral", label: "Coral" },
      { value: "lavender", label: "Lavender" },
      { value: "cream", label: "Cream" },
      { value: "graphite", label: "Graphite" },
      { value: "soft-red", label: "Soft red" },
      { value: "muted-violet", label: "Muted violet" }
    ];
    const docByPath = computed(() => new Map(docsOptions.value.map((doc) => [doc.publicPath, doc])));
    const getDocFolder = (doc) => doc?.docsFolder || doc?.filePath.replace(/^docs\//, "").split("/")[0] || "";
    const contentLabel = computed(
      () => contentType === "projects" ? "Project Composer" : contentType === "blog" ? "Blog Composer" : contentType === "docs" ? "Docs Composer" : "Lab Editor"
    );
    const composerTitle = computed(
      () => contentType === "projects" ? "Create a living project repository." : contentType === "blog" ? "Create an editorial entry." : contentType === "docs" ? "Create a technical documentation page." : "Edit a research line."
    );
    const composerDescription = computed(
      () => contentType === "projects" ? "Upload or select images, write text, add code blocks, tables, callouts, banners and arrange the public dossier before publishing to the Gribo frontend." : contentType === "blog" ? "Shape the article with text, images, code, callouts and editorial sections while keeping the markdown body available as a fallback." : contentType === "docs" ? "Compose technical documentation with reusable blocks while preserving clear project metadata and markdown compatibility." : "Update the lab metadata and editorial seed copy."
    );
    const composerHeroTitle = computed(
      () => contentType === "blog" ? String(frontmatter.value.title || "").trim() || composerTitle.value : composerTitle.value
    );
    const composerHeroDescription = computed(
      () => contentType === "blog" ? String(frontmatter.value.description || frontmatter.value.excerpt || "").trim() || composerDescription.value : composerDescription.value
    );
    const composerPreviewDate = computed(() => {
      const value = frontmatter.value.updatedAt || frontmatter.value.date;
      return value ? new Date(value).toLocaleDateString("en", { month: "long", day: "2-digit", year: "numeric" }) : "Draft";
    });
    const isRichComposer = computed(() => contentType !== "labs");
    const secondaryDocText = (doc) => `${doc.publicPath} · folder: ${getDocFolder(doc)}`;
    function blockId() {
      return `block-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    }
    function defaultBlockTitle(type) {
      const titles = {
        text: "Text Section",
        image: "Image Block",
        code: "Code Block",
        callout: "Callout Block",
        table: "Table Block",
        banner: "Banner Block",
        steps: "Steps Block",
        gallery: "Gallery Block",
        split: "Split Layout"
      };
      return titles[type];
    }
    function normalizeBlocks(value) {
      if (!Array.isArray(value)) return [];
      return value.filter((block) => block && typeof block === "object").map((block) => ({
        id: String(block.id || blockId()),
        type: String(block.type || "text"),
        title: typeof block.title === "string" ? block.title : "",
        visible: block.visible !== false,
        data: block.data && typeof block.data === "object" ? {
          ...block.data,
          layout: String(block.type || "") === "image" ? normalizeImageLayout(block.data.layout) : block.data.layout
        } : {}
      }));
    }
    function normalizeImageLayout(value) {
      const layout = String(value || "contained");
      if (layout === "full") return "full-width";
      if (layout === "bleed") return "full-width";
      if (layout === "left" || layout === "right") return "inline-medium";
      if (["full-width", "contained", "inline-medium", "inline-small", "editorial-crop"].includes(layout)) return layout;
      return "contained";
    }
    const editableBlocks = ref([]);
    const visibleBlocks = computed(() => editableBlocks.value.filter((block) => block.visible !== false));
    const selectedBlock = computed(() => editableBlocks.value.find((block) => block.id === selectedBlockId.value));
    const implementedBlockTypes = ["text", "image", "code", "callout", "table", "banner"];
    const laterBlockTypes = ["steps", "gallery", "split"];
    ref(null);
    ref(null);
    const uploadMessage = ref("");
    function blockUiTitle(block) {
      const title = String(block.title || "").trim();
      if (title) return title;
      return `Untitled ${block.type} block`;
    }
    function imageAssetLabel(url) {
      if (!url) return "";
      const asset = mediaAssets.value.find((item) => item.url === url);
      return asset?.filename || asset?.title || url.split("/").pop() || url;
    }
    function coverPreviewStyle() {
      const accent = String(frontmatter.value.accentColor || "coral");
      const style = String(frontmatter.value.coverStyle || "editorial-gradient");
      const position = String(frontmatter.value.coverPosition || "center");
      const image = contentType === "blog" ? "" : frontmatter.value.coverImage;
      return {
        "--cover-preview-image": image ? `url(${image})` : "none",
        "--cover-preview-position": position,
        "--cover-preview-accent": `var(--accent-${accent}, var(--${accent}, var(--coral)))`,
        "--cover-preview-style": style
      };
    }
    function collectMediaRefs(frontmatterValue) {
      const refs = /* @__PURE__ */ new Set();
      if (contentType !== "blog" && frontmatterValue.coverImage) refs.add(String(frontmatterValue.coverImage));
      for (const block of normalizeBlocks(frontmatterValue.blocks)) {
        if (block.type === "image" && block.data.imageUrl) refs.add(String(block.data.imageUrl));
        if (block.type === "gallery" && Array.isArray(block.data.images)) {
          for (const image of block.data.images) if (image?.url) refs.add(String(image.url));
        }
      }
      return [...refs];
    }
    const usedMediaRefs = computed(() => collectMediaRefs({ ...frontmatter.value, blocks: editableBlocks.value }));
    const usedMediaAssets = computed(() => usedMediaRefs.value.map((url) => mediaAssets.value.find((asset) => asset.url === url) || {
      id: url,
      title: url,
      filename: url.split("/").pop() || url,
      url,
      type: "External",
      usage: "Content",
      description: "Referenced by this content."
    }));
    function previewPath() {
      const slug = String(frontmatter.value.slug || "").trim();
      if (!slug) return "";
      if (contentType === "blog") return `/blog/${slug}?preview=true`;
      if (contentType === "projects") return `/repository/${slug}?preview=true`;
      if (contentType === "docs") {
        const folder = String(frontmatter.value.docsFolder || filePath.replace(/^docs\//, "").split("/")[0]);
        return `/docs/${folder}/${slug === "index" ? "" : slug}`.replace(/\/$/, "") + "?preview=true";
      }
      if (contentType === "labs") return `/labs/${slug}?preview=true`;
      return "";
    }
    function syncTextFields() {
      tagsText.value = toText(frontmatter.value.tags);
      stackText.value = toText(frontmatter.value.stack);
      relatedTagsText.value = toText(frontmatter.value.relatedTags);
      roadmapText.value = toLines(frontmatter.value.roadmap);
      openQuestionsText.value = toLines(frontmatter.value.openQuestions);
      selectedAttachmentDocs.value = [
        frontmatter.value.docsPath,
        ...Array.isArray(frontmatter.value.relatedDocs) ? frontmatter.value.relatedDocs : [],
        ...Array.isArray(frontmatter.value.docsPaths) ? frontmatter.value.docsPaths : []
      ].map((item) => String(item)).filter((item, index, list) => item && list.indexOf(item) === index);
    }
    function normalizeFrontmatter() {
      const next = { ...frontmatter.value };
      next.tags = splitComma(tagsText.value);
      if (contentType === "projects") {
        next.stack = splitComma(stackText.value);
        if (typeof next.relatedDocs === "string") next.relatedDocs = splitComma(next.relatedDocs);
        if (typeof next.docsPaths === "string") next.docsPaths = splitComma(next.docsPaths);
      }
      if (contentType === "labs") {
        next.relatedTags = splitComma(relatedTagsText.value);
        next.roadmap = splitLines(roadmapText.value);
        next.openQuestions = splitLines(openQuestionsText.value);
      }
      if (next.order !== void 0 && next.order !== "") next.order = Number(next.order);
      if (next.year !== void 0 && next.year !== "") next.year = Number(next.year);
      next.noindex = Boolean(next.noindex);
      if (isRichComposer.value) {
        if (contentType === "blog") {
          delete next.coverImage;
          delete next.coverAlt;
          delete next.coverCaption;
          delete next.coverPosition;
        }
        next.blocks = normalizeBlocks(editableBlocks.value);
        next.mediaRefs = collectMediaRefs(next);
      }
      return next;
    }
    if (filePath) {
      const response = ([__temp, __restore] = withAsyncContext(() => readContent(contentType, filePath)), __temp = await __temp, __restore(), __temp);
      frontmatter.value = { ...response.item.frontmatter };
      if (isRichComposer.value) {
        editableBlocks.value = normalizeBlocks(frontmatter.value.blocks);
        frontmatter.value.blocks = editableBlocks.value;
        selectedBlockId.value = editableBlocks.value[0]?.id || "";
      }
      markdownBody.value = response.item.body;
      syncTextFields();
    }
    const docsFolder = computed(() => {
      if (frontmatter.value.docsFolder) return String(frontmatter.value.docsFolder);
      if (frontmatter.value.docsPath) return String(frontmatter.value.docsPath).replace(/^\/docs\//, "").split("/")[0];
      return String(frontmatter.value.slug || "").replace(/-project$/, "");
    });
    const relatedDocs = computed(() => (docsData.value?.items ?? []).filter((doc) => {
      const projectSlug = String(frontmatter.value.slug || "");
      const explicit = [
        ...Array.isArray(frontmatter.value.relatedDocs) ? frontmatter.value.relatedDocs : [],
        ...Array.isArray(frontmatter.value.docsPaths) ? frontmatter.value.docsPaths : []
      ].map((item) => String(item));
      return doc.projectSlug === projectSlug || doc.docsFolder === docsFolder.value || doc.filePath.includes(`docs/${docsFolder.value}/`) || explicit.includes(doc.publicPath) || explicit.includes(doc.publicPath.replace(/^\/docs\//, ""));
    }));
    const explicitDocPaths = computed(() => [
      frontmatter.value.docsPath,
      ...Array.isArray(frontmatter.value.relatedDocs) ? frontmatter.value.relatedDocs : [],
      ...Array.isArray(frontmatter.value.docsPaths) ? frontmatter.value.docsPaths : []
    ].map((item) => String(item)).filter((item, index, list) => item && list.indexOf(item) === index));
    const attachedDocs = computed(() => {
      const explicit = [
        ...explicitDocPaths.value
      ];
      return docsOptions.value.filter((doc) => explicit.includes(doc.publicPath) || explicit.includes(doc.publicPath.replace(/^\/docs\//, "")));
    });
    const hasAttachedDocs = computed(() => attachedDocs.value.length > 0 || Boolean(frontmatter.value.docsPath));
    const docOwner = (doc) => {
      if (doc.projectSlug) return { slug: doc.projectSlug, title: doc.project || doc.projectSlug };
      if (doc.project) return { slug: doc.project, title: doc.project };
      return void 0;
    };
    const isAvailableForProject = (doc) => {
      const projectSlug = String(frontmatter.value.slug || "");
      const owner = docOwner(doc);
      const alreadySelected = selectedAttachmentDocs.value.includes(doc.publicPath) || explicitDocPaths.value.includes(doc.publicPath);
      return alreadySelected || !owner || owner.slug === projectSlug;
    };
    const attachableDocs = computed(() => docsOptions.value.filter(isAvailableForProject));
    const attachedElsewhereDocs = computed(() => docsOptions.value.filter((doc) => !isAvailableForProject(doc)));
    const docAvailabilityLabel = (doc) => {
      const owner = docOwner(doc);
      return owner ? `attached to ${owner.title}` : "available";
    };
    const newDocsForProjectLink = computed(() => {
      const query = new URLSearchParams({
        type: "docs",
        direct: "true",
        projectSlug: String(frontmatter.value.slug || ""),
        project: String(frontmatter.value.title || ""),
        docsFolder: docsFolder.value
      });
      return `/admin/content/new?${query.toString()}`;
    });
    async function save() {
      isSaving.value = true;
      statusMessage.value = "";
      saveState.value = "saving";
      if (saveMessageTimer) clearTimeout(saveMessageTimer);
      try {
        const response = await saveContent(contentType, filePath, normalizeFrontmatter(), markdownBody.value);
        frontmatter.value = { ...response.item.frontmatter };
        if (isRichComposer.value) {
          editableBlocks.value = normalizeBlocks(frontmatter.value.blocks);
          frontmatter.value.blocks = editableBlocks.value;
        }
        syncTextFields();
        saveState.value = "saved";
        statusMessage.value = "Changes saved successfully.";
        if (false) ;
        saveMessageTimer = setTimeout(() => {
          if (saveState.value === "saved") {
            saveState.value = "idle";
            statusMessage.value = "";
          }
          if (false) ;
        }, 3200);
      } catch (error) {
        saveState.value = "error";
        statusMessage.value = error?.data?.statusMessage || error?.message || "Save failed.";
      } finally {
        isSaving.value = false;
      }
    }
    async function saveDocumentationAttachments() {
      if (selectedAttachmentDocs.value.length === 0) {
        statusMessage.value = "Select at least one existing documentation page before saving attachments.";
        return;
      }
      const primary = selectedAttachmentDocs.value[0];
      const primaryItem = docByPath.value.get(primary);
      frontmatter.value.docsPath = primary;
      frontmatter.value.docsFolder = getDocFolder(primaryItem) || primary.replace(/^\/docs\//, "").split("/")[0];
      frontmatter.value.docsPaths = selectedAttachmentDocs.value;
      frontmatter.value.relatedDocs = selectedAttachmentDocs.value;
      await save();
      isAttachingDocs.value = false;
    }
    async function archive() {
      if (!confirm("Archive this content file? The file will stay in place and status will become archived.")) return;
      await archiveContent(contentType, filePath);
      statusMessage.value = "Content archived with status: archived.";
      frontmatter.value.status = "archived";
      frontmatter.value.archivedAt = (/* @__PURE__ */ new Date()).toISOString();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ContentBlockRenderer = __nuxt_component_2$1;
      const _component_BlogComposerPreview = __nuxt_component_2;
      const _component_AdminHero = __nuxt_component_0$1;
      const _component_AdminPanel = __nuxt_component_2$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-2211ecb0><input class="visually-hidden-file" type="file" accept="image/jpeg,image/png,image/webp" data-v-2211ecb0><input class="visually-hidden-file" type="file" accept="image/jpeg,image/png,image/webp" data-v-2211ecb0>`);
      if (unref(filePath) && unref(isRichComposer)) {
        _push(`<section class="composer-grid" data-v-2211ecb0><div class="composer-main" data-v-2211ecb0><section class="composer-hero" data-v-2211ecb0><p class="eyebrow" data-v-2211ecb0><span class="pulse" data-v-2211ecb0></span>${ssrInterpolate(unref(contentLabel))} - CMS block composer</p><h1 data-v-2211ecb0>${ssrInterpolate(unref(composerHeroTitle))}</h1><p class="subtitle" data-v-2211ecb0>${ssrInterpolate(unref(composerHeroDescription))}</p>`);
        if (unref(statusMessage)) {
          _push(`<p class="status-copy"${ssrRenderAttr("data-state", unref(saveState))} data-v-2211ecb0>${ssrInterpolate(unref(statusMessage))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section><nav class="composer-tabs" aria-label="Composer tabs" data-v-2211ecb0><!--[-->`);
        ssrRenderList(blockTabs, (tab) => {
          _push(`<button type="button" class="${ssrRenderClass({ active: unref(activeTab) === tab.id })}" data-v-2211ecb0>${ssrInterpolate(tab.label)}</button>`);
        });
        _push(`<!--]--></nav>`);
        if (unref(activeTab) === "content") {
          _push(`<!--[--><section class="setup-grid" data-v-2211ecb0><div class="panel" data-v-2211ecb0><div class="panel-head" data-v-2211ecb0><h2 data-v-2211ecb0>${ssrInterpolate(unref(contentType) === "projects" ? "Project basics" : unref(contentType) === "blog" ? "Entry basics" : "Docs basics")}</h2><span class="status-badge" data-v-2211ecb0>${ssrInterpolate(unref(frontmatter).status || "Draft")}</span></div><div class="field-grid compact" data-v-2211ecb0><label data-v-2211ecb0> Title <input${ssrRenderAttr("value", unref(frontmatter).title)} type="text" data-v-2211ecb0></label><label data-v-2211ecb0> Slug <span class="slug-row" data-v-2211ecb0><input${ssrRenderAttr("value", unref(frontmatter).slug)} type="text" data-v-2211ecb0><button class="ghost-btn mini-action" type="button" data-v-2211ecb0>Generate</button></span></label><label class="span-2" data-v-2211ecb0>${ssrInterpolate(unref(contentType) === "projects" ? "Short description" : "Description")} `);
          if (unref(contentType) === "projects") {
            _push(`<textarea rows="3" data-v-2211ecb0>${ssrInterpolate(unref(frontmatter).summary)}</textarea>`);
          } else {
            _push(`<textarea rows="3" data-v-2211ecb0>${ssrInterpolate(unref(frontmatter).description)}</textarea>`);
          }
          _push(`</label></div></div><div class="panel" data-v-2211ecb0><div class="panel-head" data-v-2211ecb0><h2 data-v-2211ecb0>Taxonomy</h2><span class="status-badge friction" data-v-2211ecb0>${ssrInterpolate(unref(labDisplayName))}</span></div><div class="field-grid compact" data-v-2211ecb0><label data-v-2211ecb0> Status <select data-v-2211ecb0><!--[-->`);
          ssrRenderList(unref(statusChoices), (status) => {
            _push(`<option${ssrRenderAttr("value", status)} data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).status) ? ssrLooseContain(unref(frontmatter).status, status) : ssrLooseEqual(unref(frontmatter).status, status)) ? " selected" : ""}>${ssrInterpolate(status)}</option>`);
          });
          _push(`<!--]--></select></label><label data-v-2211ecb0> Track / Lab `);
          if (unref(labChoices).length) {
            _push(`<select data-v-2211ecb0><option value="" data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).lab) ? ssrLooseContain(unref(frontmatter).lab, "") : ssrLooseEqual(unref(frontmatter).lab, "")) ? " selected" : ""}>Unassigned</option><!--[-->`);
            ssrRenderList(unref(labSelectChoices), (lab) => {
              _push(`<option${ssrRenderAttr("value", lab.value)} data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).lab) ? ssrLooseContain(unref(frontmatter).lab, lab.value) : ssrLooseEqual(unref(frontmatter).lab, lab.value)) ? " selected" : ""}>${ssrInterpolate(lab.label)}</option>`);
            });
            _push(`<!--]--></select>`);
          } else {
            _push(`<select disabled data-v-2211ecb0><option data-v-2211ecb0>No labs available yet.</option></select>`);
          }
          _push(`</label>`);
          if (unref(contentType) === "projects") {
            _push(`<label data-v-2211ecb0> Year <input${ssrRenderAttr("value", unref(frontmatter).year)} type="number" data-v-2211ecb0></label>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(contentType) === "projects") {
            _push(`<label data-v-2211ecb0> Stack <input${ssrRenderAttr("value", unref(stackText))} type="text" placeholder="Nuxt, Python" data-v-2211ecb0></label>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<label class="span-2" data-v-2211ecb0> Tags <input${ssrRenderAttr("value", unref(tagsText))} type="text" placeholder="ai, systems, research" data-v-2211ecb0></label>`);
          if (unref(contentType) === "blog") {
            _push(`<button class="ghost-btn mini-action span-2" type="button" data-v-2211ecb0> Generate tags </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></section><section class="builder-layout" data-v-2211ecb0><aside class="block-library" data-v-2211ecb0><!--[-->`);
          ssrRenderList(implementedBlockTypes, (type) => {
            _push(`<button class="block-button" type="button" data-v-2211ecb0><span class="block-icon" data-v-2211ecb0>${ssrInterpolate(defaultBlockTitle(type).charAt(0))}</span><span data-v-2211ecb0><strong data-v-2211ecb0>${ssrInterpolate(defaultBlockTitle(type))}</strong><small data-v-2211ecb0>${ssrInterpolate(type === "text" ? "Heading + rich text" : type === "image" ? "Media Library + caption" : type === "code" ? "Language + title" : type === "callout" ? "Info, warning, note" : type === "table" ? "Rows + columns" : "Color + message")}</small></span></button>`);
          });
          _push(`<!--]--><!--[-->`);
          ssrRenderList(laterBlockTypes, (type) => {
            _push(`<button class="block-button disabled" type="button" disabled data-v-2211ecb0><span class="block-icon" data-v-2211ecb0>${ssrInterpolate(defaultBlockTitle(type).charAt(0))}</span><span data-v-2211ecb0><strong data-v-2211ecb0>${ssrInterpolate(defaultBlockTitle(type))}</strong><small data-v-2211ecb0>Later</small></span></button>`);
          });
          _push(`<!--]--></aside><div class="canvas" data-v-2211ecb0><div class="${ssrRenderClass([{ "blog-hero-options": unref(isBlogComposer) }, "project-form-top"])}" data-v-2211ecb0>`);
          if (!unref(isBlogComposer)) {
            _push(`<div class="${ssrRenderClass([{ filled: unref(frontmatter).coverImage }, "cover-upload"])}" role="button" tabindex="0" data-v-2211ecb0>`);
            if (unref(frontmatter).coverImage) {
              _push(`<img${ssrRenderAttr("src", unref(frontmatter).coverImage)}${ssrRenderAttr("alt", unref(frontmatter).coverAlt || "")} data-v-2211ecb0>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="upload-inner" data-v-2211ecb0><div class="upload-icon" data-v-2211ecb0>+</div><strong data-v-2211ecb0>${ssrInterpolate(unref(frontmatter).coverImage ? "Cover selected" : "Choose cover image")}</strong><p data-v-2211ecb0>Choose from Media Library, upload from computer, or drop a JPG/PNG/WebP.</p><div class="media-choice-row" data-v-2211ecb0><button class="mini-btn" type="button" data-v-2211ecb0>Open Media Library</button><button class="mini-btn" type="button" data-v-2211ecb0>Upload from computer</button></div>`);
            if (unref(uploadMessage)) {
              _push(`<small class="upload-message" data-v-2211ecb0>${ssrInterpolate(unref(uploadMessage))}</small>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="panel visual-options" data-v-2211ecb0><h2 data-v-2211ecb0>${ssrInterpolate(unref(isBlogComposer) ? "Blog hero design" : "Cover design")}</h2><p class="muted" data-v-2211ecb0>${ssrInterpolate(unref(isBlogComposer) ? "Blog entries use an editorial surface and accent color, not cover images." : "These controls update the Frontend Preview in the right inspector.")}</p><label data-v-2211ecb0> Visual style <select data-v-2211ecb0><!--[-->`);
          ssrRenderList(unref(isBlogComposer) ? blogHeroStyleOptions : coverStyleOptions, (option) => {
            _push(`<option${ssrRenderAttr("value", option.value)} data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).coverStyle) ? ssrLooseContain(unref(frontmatter).coverStyle, option.value) : ssrLooseEqual(unref(frontmatter).coverStyle, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
          });
          _push(`<!--]--></select></label>`);
          if (!unref(isBlogComposer)) {
            _push(`<label data-v-2211ecb0> Image position <select data-v-2211ecb0><!--[-->`);
            ssrRenderList(coverPositionOptions, (position) => {
              _push(`<option${ssrRenderAttr("value", position)} data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).coverPosition) ? ssrLooseContain(unref(frontmatter).coverPosition, position) : ssrLooseEqual(unref(frontmatter).coverPosition, position)) ? " selected" : ""}>${ssrInterpolate(position)}</option>`);
            });
            _push(`<!--]--></select></label>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<label data-v-2211ecb0> Accent color <select data-v-2211ecb0><!--[-->`);
          ssrRenderList(accentOptions, (option) => {
            _push(`<option${ssrRenderAttr("value", option.value)} data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).accentColor) ? ssrLooseContain(unref(frontmatter).accentColor, option.value) : ssrLooseEqual(unref(frontmatter).accentColor, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
          });
          _push(`<!--]--></select></label></div></div>`);
          if (!unref(editableBlocks).length) {
            _push(`<article class="empty-canvas" data-v-2211ecb0><strong data-v-2211ecb0>No blocks yet.</strong><p data-v-2211ecb0>Add a Text Section, Image Block, Code Block, Callout, Table or Banner from the block library.</p></article>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(unref(editableBlocks), (block, index) => {
            _push(`<article class="${ssrRenderClass([{ selected: unref(selectedBlockId) === block.id, hidden: !block.visible }, "content-block"])}" data-v-2211ecb0><div class="block-toolbar" data-v-2211ecb0><div class="block-toolbar-left" data-v-2211ecb0><button class="drag" type="button" aria-label="Select block" data-v-2211ecb0>::</button><div class="block-title" data-v-2211ecb0><strong data-v-2211ecb0>${ssrInterpolate(blockUiTitle(block))}</strong><span data-v-2211ecb0>${ssrInterpolate(block.type)} block - ${ssrInterpolate(block.visible ? "visible" : "hidden")}</span></div></div><div class="block-actions" data-v-2211ecb0><button class="mini-btn" type="button" data-v-2211ecb0>Edit</button><button class="mini-btn" type="button" data-v-2211ecb0>Duplicate</button><button class="mini-btn" type="button" data-v-2211ecb0>${ssrInterpolate(block.visible ? "Hide" : "Show")}</button><button class="mini-btn" type="button" data-v-2211ecb0>Up</button><button class="mini-btn" type="button" data-v-2211ecb0>Down</button><button class="mini-btn" type="button" data-v-2211ecb0>Delete</button></div></div><div class="block-body" data-v-2211ecb0><div class="field-grid compact" data-v-2211ecb0><label data-v-2211ecb0> Block title <input${ssrRenderAttr("value", block.title)} type="text" placeholder="Optional internal title" data-v-2211ecb0></label>`);
            if (block.type === "text") {
              _push(`<!--[--><label data-v-2211ecb0> Heading <input${ssrRenderAttr("value", block.data.heading)} type="text" data-v-2211ecb0></label><label class="span-2" data-v-2211ecb0> Body <textarea rows="6" data-v-2211ecb0>${ssrInterpolate(block.data.body)}</textarea></label><!--]-->`);
            } else if (block.type === "image") {
              _push(`<div class="span-2 image-block-grid" data-v-2211ecb0><div class="${ssrRenderClass([normalizeImageLayout(block.data.layout), "image-drop"])}" role="button" tabindex="0" data-v-2211ecb0>`);
              if (block.data.imageUrl) {
                _push(`<img${ssrRenderAttr("src", block.data.imageUrl)}${ssrRenderAttr("alt", block.data.alt || "")} data-v-2211ecb0>`);
              } else {
                _push(`<div data-v-2211ecb0><div class="upload-icon" data-v-2211ecb0>+</div><strong data-v-2211ecb0>Choose or upload image</strong><p class="muted" data-v-2211ecb0>Select from Media Library, upload from computer, or drop a JPG/PNG/WebP.</p></div>`);
              }
              _push(`</div><div class="image-settings" data-v-2211ecb0><label data-v-2211ecb0> Layout <select data-v-2211ecb0><option value="full-width" data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(block.data.layout) ? ssrLooseContain(block.data.layout, "full-width") : ssrLooseEqual(block.data.layout, "full-width")) ? " selected" : ""}>Full width</option><option value="contained" data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(block.data.layout) ? ssrLooseContain(block.data.layout, "contained") : ssrLooseEqual(block.data.layout, "contained")) ? " selected" : ""}>Contained</option><option value="inline-medium" data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(block.data.layout) ? ssrLooseContain(block.data.layout, "inline-medium") : ssrLooseEqual(block.data.layout, "inline-medium")) ? " selected" : ""}>Inline medium</option><option value="inline-small" data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(block.data.layout) ? ssrLooseContain(block.data.layout, "inline-small") : ssrLooseEqual(block.data.layout, "inline-small")) ? " selected" : ""}>Inline small</option><option value="editorial-crop" data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(block.data.layout) ? ssrLooseContain(block.data.layout, "editorial-crop") : ssrLooseEqual(block.data.layout, "editorial-crop")) ? " selected" : ""}>Editorial crop</option></select></label><label data-v-2211ecb0> Alt text <input${ssrRenderAttr("value", block.data.alt)} type="text" data-v-2211ecb0></label><label data-v-2211ecb0> Caption <textarea rows="3" data-v-2211ecb0>${ssrInterpolate(block.data.caption)}</textarea></label><div class="media-choice-row" data-v-2211ecb0><button class="ghost-btn" type="button" data-v-2211ecb0>Choose from Media Library</button><button class="ghost-btn" type="button" data-v-2211ecb0>Upload from computer</button>`);
              if (block.data.imageUrl) {
                _push(`<button class="ghost-btn" type="button" data-v-2211ecb0>Remove image</button>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div>`);
              if (block.data.imageUrl) {
                _push(`<div class="selected-asset-note" data-v-2211ecb0><span data-v-2211ecb0>Selected image</span><strong data-v-2211ecb0>${ssrInterpolate(imageAssetLabel(block.data.imageUrl))}</strong></div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div></div>`);
            } else if (block.type === "code") {
              _push(`<!--[--><label data-v-2211ecb0> Code title <input${ssrRenderAttr("value", block.data.title)} type="text" data-v-2211ecb0></label><label data-v-2211ecb0> Language <input${ssrRenderAttr("value", block.data.language)} type="text" placeholder="yaml" data-v-2211ecb0></label><label class="check-row span-2" data-v-2211ecb0><input${ssrIncludeBooleanAttr(Array.isArray(block.data.copyEnabled) ? ssrLooseContain(block.data.copyEnabled, null) : block.data.copyEnabled) ? " checked" : ""} type="checkbox" data-v-2211ecb0> Copy enabled </label><label class="span-2" data-v-2211ecb0> Code <textarea class="code-textarea" rows="9" data-v-2211ecb0>${ssrInterpolate(block.data.code)}</textarea></label><!--]-->`);
            } else if (block.type === "callout") {
              _push(`<!--[--><label data-v-2211ecb0> Variant <select data-v-2211ecb0><option value="info" data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "info") : ssrLooseEqual(block.data.variant, "info")) ? " selected" : ""}>Info / Blue</option><option value="warning" data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "warning") : ssrLooseEqual(block.data.variant, "warning")) ? " selected" : ""}>Warning / Yellow</option><option value="friction" data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "friction") : ssrLooseEqual(block.data.variant, "friction")) ? " selected" : ""}>Friction / Coral</option><option value="success" data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "success") : ssrLooseEqual(block.data.variant, "success")) ? " selected" : ""}>Success / Green</option><option value="editorial" data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "editorial") : ssrLooseEqual(block.data.variant, "editorial")) ? " selected" : ""}>Editorial / Lavender</option></select></label><label data-v-2211ecb0> Icon <input${ssrRenderAttr("value", block.data.icon)} type="text" data-v-2211ecb0></label><label data-v-2211ecb0> Title <input${ssrRenderAttr("value", block.data.title)} type="text" data-v-2211ecb0></label><label class="span-2" data-v-2211ecb0> Body <textarea rows="4" data-v-2211ecb0>${ssrInterpolate(block.data.body)}</textarea></label><!--]-->`);
            } else if (block.type === "table") {
              _push(`<!--[--><label class="span-2" data-v-2211ecb0> Columns <input${ssrRenderAttr("value", block.data.columnsText)} type="text" placeholder="Signal, Observed state, Next action" data-v-2211ecb0></label><label class="span-2" data-v-2211ecb0> Rows <textarea rows="5" placeholder="Runtime | Draft | Document the path" data-v-2211ecb0>${ssrInterpolate(block.data.rowsText)}</textarea></label><!--]-->`);
            } else if (block.type === "banner") {
              _push(`<!--[--><label data-v-2211ecb0> Banner title <input${ssrRenderAttr("value", block.data.title)} type="text" data-v-2211ecb0></label><label data-v-2211ecb0> Accent <input${ssrRenderAttr("value", block.data.accent)} type="text" placeholder="coral" data-v-2211ecb0></label><label class="span-2" data-v-2211ecb0> Body <textarea rows="4" data-v-2211ecb0>${ssrInterpolate(block.data.body)}</textarea></label><!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div></article>`);
          });
          _push(`<!--]--><div class="panel markdown-fallback" data-v-2211ecb0><div class="panel-head" data-v-2211ecb0><h2 data-v-2211ecb0>Markdown fallback</h2><span class="status-badge" data-v-2211ecb0>Legacy body</span></div><p class="muted" data-v-2211ecb0>If no visible blocks are saved, the public page keeps rendering this markdown body.</p><textarea class="body-editor" data-v-2211ecb0>${ssrInterpolate(unref(markdownBody))}</textarea></div></div></section><!--]-->`);
        } else if (unref(activeTab) === "metadata") {
          _push(`<!--[--><section class="panel" data-v-2211ecb0><div class="panel-head" data-v-2211ecb0><h2 data-v-2211ecb0>Core metadata</h2><span class="status-badge" data-v-2211ecb0>${ssrInterpolate(unref(contentType))}</span></div><div class="field-grid" data-v-2211ecb0><label data-v-2211ecb0> Title <input${ssrRenderAttr("value", unref(frontmatter).title)} type="text" data-v-2211ecb0></label><label data-v-2211ecb0> Slug <input${ssrRenderAttr("value", unref(frontmatter).slug)} type="text" data-v-2211ecb0></label><label data-v-2211ecb0> Status <select data-v-2211ecb0><!--[-->`);
          ssrRenderList(unref(statusChoices), (status) => {
            _push(`<option${ssrRenderAttr("value", status)} data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).status) ? ssrLooseContain(unref(frontmatter).status, status) : ssrLooseEqual(unref(frontmatter).status, status)) ? " selected" : ""}>${ssrInterpolate(status)}</option>`);
          });
          _push(`<!--]--></select></label><label data-v-2211ecb0> Lab `);
          if (unref(labChoices).length) {
            _push(`<select data-v-2211ecb0><option value="" data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).lab) ? ssrLooseContain(unref(frontmatter).lab, "") : ssrLooseEqual(unref(frontmatter).lab, "")) ? " selected" : ""}>Unassigned</option><!--[-->`);
            ssrRenderList(unref(labSelectChoices), (lab) => {
              _push(`<option${ssrRenderAttr("value", lab.value)} data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).lab) ? ssrLooseContain(unref(frontmatter).lab, lab.value) : ssrLooseEqual(unref(frontmatter).lab, lab.value)) ? " selected" : ""}>${ssrInterpolate(lab.label)}</option>`);
            });
            _push(`<!--]--></select>`);
          } else {
            _push(`<select disabled data-v-2211ecb0><option data-v-2211ecb0>No labs available yet.</option></select>`);
          }
          _push(`</label>`);
          if (unref(contentType) === "blog") {
            _push(`<label data-v-2211ecb0> Excerpt <textarea rows="3" data-v-2211ecb0>${ssrInterpolate(unref(frontmatter).excerpt)}</textarea></label>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(contentType) === "projects") {
            _push(`<label data-v-2211ecb0> Summary <textarea rows="3" data-v-2211ecb0>${ssrInterpolate(unref(frontmatter).summary)}</textarea></label>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<label data-v-2211ecb0> Description <textarea rows="3" data-v-2211ecb0>${ssrInterpolate(unref(frontmatter).description)}</textarea></label><label data-v-2211ecb0> Tags <input${ssrRenderAttr("value", unref(tagsText))} type="text" placeholder="ai, systems, research" data-v-2211ecb0></label>`);
          if (unref(contentType) === "blog") {
            _push(`<button class="ghost-btn mini-action span-2" type="button" data-v-2211ecb0> Generate tags </button>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(contentType) === "projects") {
            _push(`<label data-v-2211ecb0> Type <input${ssrRenderAttr("value", unref(frontmatter).type)} type="text" data-v-2211ecb0></label>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(contentType) === "projects") {
            _push(`<label data-v-2211ecb0> Stack <input${ssrRenderAttr("value", unref(stackText))} type="text" placeholder="Nuxt, Python" data-v-2211ecb0></label>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></section>`);
          if (unref(contentType) === "blog") {
            _push(`<section class="panel danger-zone" data-v-2211ecb0><div class="panel-head" data-v-2211ecb0><div data-v-2211ecb0><p class="eyebrow" data-v-2211ecb0>Protected action</p><h2 data-v-2211ecb0>Danger Zone</h2></div><span class="status-badge" data-v-2211ecb0>Blog entry</span></div><p class="muted" data-v-2211ecb0> Archive or permanently remove this blog entry. Use this only for drafts, tests, or content that should no longer appear in the archive. </p><div class="danger-summary" data-v-2211ecb0><span data-v-2211ecb0>Title</span><strong data-v-2211ecb0>${ssrInterpolate(unref(frontmatter).title || "Untitled Blog Entry")}</strong><span data-v-2211ecb0>Slug</span><strong data-v-2211ecb0>${ssrInterpolate(unref(frontmatter).slug || "untitled")}</strong><span data-v-2211ecb0>File</span><strong data-v-2211ecb0>${ssrInterpolate(unref(filePath))}</strong></div><div class="danger-actions" data-v-2211ecb0><button class="ghost-btn" type="button"${ssrIncludeBooleanAttr(unref(isSaving) || unref(frontmatter).status === "archived") ? " disabled" : ""} data-v-2211ecb0>${ssrInterpolate(unref(frontmatter).status === "archived" ? "Entry archived" : "Archive entry")}</button></div><div class="delete-confirm" data-v-2211ecb0><label data-v-2211ecb0> Type DELETE BLOG ENTRY to permanently remove this file <input${ssrRenderAttr("value", unref(deleteConfirmation))} type="text" placeholder="DELETE BLOG ENTRY" data-v-2211ecb0></label><button class="danger-btn" type="button"${ssrIncludeBooleanAttr(unref(isDeleting) || unref(deleteConfirmation) !== "DELETE BLOG ENTRY") ? " disabled" : ""} data-v-2211ecb0>${ssrInterpolate(unref(isDeleting) ? "Deleting..." : "Delete entry")}</button></div></section>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(contentType) === "projects") {
            _push(`<section class="panel" data-v-2211ecb0><div class="panel-head" data-v-2211ecb0><h2 data-v-2211ecb0>Documentation</h2><span class="status-badge" data-v-2211ecb0>${ssrInterpolate(unref(attachedDocs).length ? `${unref(attachedDocs).length} docs` : "Empty")}</span></div>`);
            if (!unref(hasAttachedDocs)) {
              _push(`<div class="empty-doc-state" data-v-2211ecb0><strong data-v-2211ecb0>No documentation attached yet.</strong><p data-v-2211ecb0>This project can stay as a standalone dossier, or you can connect existing docs / create the first docs page.</p></div>`);
            } else {
              _push(`<div class="attached-docs" data-v-2211ecb0><!--[-->`);
              ssrRenderList(unref(attachedDocs), (doc) => {
                _push(`<article class="attached-doc-card" data-v-2211ecb0><div data-v-2211ecb0><strong data-v-2211ecb0>${ssrInterpolate(doc.title)}</strong><small data-v-2211ecb0>${ssrInterpolate(secondaryDocText(doc))}</small></div>`);
                _push(ssrRenderComponent(_component_NuxtLink, {
                  class: "mini-doc-link",
                  to: doc.publicPath
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`View`);
                    } else {
                      return [
                        createTextVNode("View")
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
                _push(`</article>`);
              });
              _push(`<!--]--></div>`);
            }
            _push(`<div class="doc-actions" data-v-2211ecb0><button class="ghost-btn" type="button" data-v-2211ecb0>Add existing documentation</button>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              class: "studio-btn",
              to: unref(newDocsForProjectLink)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(unref(relatedDocs).length ? "New Docs Page for this project" : "Create first docs page")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(relatedDocs).length ? "New Docs Page for this project" : "Create first docs page"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</div>`);
            if (unref(isAttachingDocs)) {
              _push(`<div class="attach-docs-panel" data-v-2211ecb0><div data-v-2211ecb0><h3 data-v-2211ecb0>Attach existing documentation</h3><p data-v-2211ecb0>Select one or more available documentation pages to attach to this project.</p></div><div class="doc-picker" data-v-2211ecb0><p class="doc-section-title" data-v-2211ecb0>Documentation pages</p>`);
              if (!unref(attachableDocs).length) {
                _push(`<p class="muted" data-v-2211ecb0>No available documentation found.</p>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<!--[-->`);
              ssrRenderList(unref(attachableDocs), (doc) => {
                _push(`<label class="doc-choice" data-v-2211ecb0><input${ssrIncludeBooleanAttr(Array.isArray(unref(selectedAttachmentDocs)) ? ssrLooseContain(unref(selectedAttachmentDocs), doc.publicPath) : unref(selectedAttachmentDocs)) ? " checked" : ""} type="checkbox"${ssrRenderAttr("value", doc.publicPath)} data-v-2211ecb0><span data-v-2211ecb0><strong data-v-2211ecb0>${ssrInterpolate(doc.title)}</strong><small data-v-2211ecb0>${ssrInterpolate(secondaryDocText(doc))}</small><small data-v-2211ecb0>Status: ${ssrInterpolate(docAvailabilityLabel(doc))}</small></span></label>`);
              });
              _push(`<!--]--></div><div class="doc-actions" data-v-2211ecb0><button class="studio-btn" type="button"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} data-v-2211ecb0>Save attachment</button><button class="ghost-btn" type="button" data-v-2211ecb0>Cancel</button></div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</section>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else if (unref(activeTab) === "seo") {
          _push(`<section class="panel" data-v-2211ecb0><div class="panel-head" data-v-2211ecb0><h2 data-v-2211ecb0>SEO settings</h2><span class="status-badge" data-v-2211ecb0>Snippet</span></div><div class="field-grid" data-v-2211ecb0><label data-v-2211ecb0> SEO title <input${ssrRenderAttr("value", unref(frontmatter).seoTitle)} type="text" data-v-2211ecb0></label><label data-v-2211ecb0> OG title <input${ssrRenderAttr("value", unref(frontmatter).ogTitle)} type="text" data-v-2211ecb0></label><label class="span-2" data-v-2211ecb0> SEO description <textarea rows="4" data-v-2211ecb0>${ssrInterpolate(unref(frontmatter).seoDescription)}</textarea></label><label class="span-2" data-v-2211ecb0> OG description <textarea rows="4" data-v-2211ecb0>${ssrInterpolate(unref(frontmatter).ogDescription)}</textarea></label><label data-v-2211ecb0> OG image <input${ssrRenderAttr("value", unref(frontmatter).ogImage)} type="text" data-v-2211ecb0></label><label data-v-2211ecb0> Canonical <input${ssrRenderAttr("value", unref(frontmatter).canonical)} type="text" data-v-2211ecb0></label><label class="check-row" data-v-2211ecb0><input${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).noindex) ? ssrLooseContain(unref(frontmatter).noindex, null) : unref(frontmatter).noindex) ? " checked" : ""} type="checkbox" data-v-2211ecb0> Noindex </label></div></section>`);
        } else if (unref(activeTab) === "media") {
          _push(`<section class="panel" data-v-2211ecb0><div class="panel-head" data-v-2211ecb0><h2 data-v-2211ecb0>Media attached</h2><span class="status-badge" data-v-2211ecb0>${ssrInterpolate(unref(usedMediaAssets).length)} assets</span></div><div class="media-tab-grid" data-v-2211ecb0><!--[-->`);
          ssrRenderList(unref(usedMediaAssets), (asset) => {
            _push(`<article class="media-card" data-v-2211ecb0><img${ssrRenderAttr("src", asset.url)}${ssrRenderAttr("alt", asset.title)} data-v-2211ecb0><strong data-v-2211ecb0>${ssrInterpolate(asset.title)}</strong><span data-v-2211ecb0>${ssrInterpolate(asset.filename)}</span></article>`);
          });
          _push(`<!--]--></div><div class="asset-list" data-v-2211ecb0><!--[-->`);
          ssrRenderList(unref(mediaAssets), (asset) => {
            _push(`<button class="asset-button" type="button" data-v-2211ecb0><img${ssrRenderAttr("src", asset.url)}${ssrRenderAttr("alt", asset.title)} data-v-2211ecb0><span data-v-2211ecb0>${ssrInterpolate(asset.title)}</span></button>`);
          });
          _push(`<!--]--></div></section>`);
        } else if (unref(activeTab) === "preview") {
          _push(`<section class="panel" data-v-2211ecb0><div class="panel-head" data-v-2211ecb0><h2 data-v-2211ecb0>Frontend preview</h2>`);
          if (previewPath()) {
            _push(ssrRenderComponent(_component_NuxtLink, {
              class: "ghost-btn mini-action",
              to: previewPath()
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Open route`);
                } else {
                  return [
                    createTextVNode("Open route")
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="preview-surface" data-v-2211ecb0>`);
          if (unref(visibleBlocks).length) {
            _push(ssrRenderComponent(_component_ContentBlockRenderer, {
              blocks: unref(visibleBlocks),
              context: unref(contentType) === "projects" ? "project" : unref(contentType) === "docs" ? "docs" : "blog"
            }, null, _parent));
          } else {
            _push(`<div class="content-prose" data-v-2211ecb0><p class="muted" data-v-2211ecb0>No visible blocks yet. Public rendering will use the markdown body fallback.</p><pre data-v-2211ecb0>${ssrInterpolate(unref(markdownBody))}</pre></div>`);
          }
          _push(`</div></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><aside class="composer-inspector" data-v-2211ecb0><div class="inspector-card" data-v-2211ecb0><h3 data-v-2211ecb0>Block inspector</h3>`);
        if (unref(selectedBlock)) {
          _push(`<!--[--><p data-v-2211ecb0>${ssrInterpolate(blockUiTitle(unref(selectedBlock)))} - ${ssrInterpolate(unref(selectedBlock).type)} - ${ssrInterpolate(unref(selectedBlock).visible ? "Visible" : "Hidden")}</p><label data-v-2211ecb0> Selected block title <input${ssrRenderAttr("value", unref(selectedBlock).title)} type="text" data-v-2211ecb0></label><!--]-->`);
        } else {
          _push(`<p data-v-2211ecb0>Select a block to edit its properties, visibility and output mapping.</p>`);
        }
        _push(`</div><div class="inspector-card" data-v-2211ecb0><h3 data-v-2211ecb0>Frontend preview</h3><div class="preview-card" data-v-2211ecb0><div class="preview-header" data-v-2211ecb0><span class="dot" data-v-2211ecb0></span><span class="dot" data-v-2211ecb0></span><span class="dot" data-v-2211ecb0></span></div><div class="frontend-preview" data-v-2211ecb0>`);
        if (unref(isBlogComposer)) {
          _push(ssrRenderComponent(_component_BlogComposerPreview, {
            title: unref(frontmatter).title || "Untitled content",
            description: unref(frontmatter).description || unref(frontmatter).excerpt || "Editorial preview surface.",
            category: unref(frontmatter).category || "Field note",
            date: unref(composerPreviewDate),
            status: unref(frontmatter).status || "draft",
            "cover-style": unref(frontmatter).coverStyle || "editorial-gradient",
            "accent-color": unref(frontmatter).accentColor || "coral",
            blocks: unref(visibleBlocks)
          }, null, _parent));
        } else {
          _push(`<!--[--><div class="${ssrRenderClass([`style-${unref(frontmatter).coverStyle || "editorial-gradient"}`, "front-hero"])}" style="${ssrRenderStyle(coverPreviewStyle())}" data-v-2211ecb0><span class="status-badge" data-v-2211ecb0>${ssrInterpolate(unref(frontmatter).status || "Draft")}</span><h3 data-v-2211ecb0>${ssrInterpolate(unref(frontmatter).title || "Untitled content")}</h3><p data-v-2211ecb0>${ssrInterpolate(unref(frontmatter).description || unref(frontmatter).excerpt || unref(frontmatter).summary || "Editorial preview surface.")}</p></div><!--[-->`);
          ssrRenderList(unref(visibleBlocks).slice(0, 2), (block) => {
            _push(`<div class="front-section" data-v-2211ecb0><strong data-v-2211ecb0>${ssrInterpolate(blockUiTitle(block))}</strong><p data-v-2211ecb0>${ssrInterpolate(block.type)} block rendered publicly.</p></div>`);
          });
          _push(`<!--]--><!--]-->`);
        }
        _push(`</div></div></div><div class="inspector-card" data-v-2211ecb0><h3 data-v-2211ecb0>Page outline</h3><div class="outline-list" data-v-2211ecb0><button class="outline-item" type="button" data-v-2211ecb0><strong data-v-2211ecb0>Cover</strong><span data-v-2211ecb0>Hero</span></button><!--[-->`);
        ssrRenderList(unref(editableBlocks), (block) => {
          _push(`<button class="${ssrRenderClass([{ active: unref(selectedBlockId) === block.id }, "outline-item"])}" type="button" data-v-2211ecb0><strong data-v-2211ecb0>${ssrInterpolate(blockUiTitle(block))}</strong><span data-v-2211ecb0>${ssrInterpolate(block.type)}</span></button>`);
        });
        _push(`<!--]--></div></div><div class="inspector-card" data-v-2211ecb0><h3 data-v-2211ecb0>Media uploaded</h3><div class="media-mini-grid" data-v-2211ecb0><!--[-->`);
        ssrRenderList(unref(usedMediaAssets).slice(0, 6), (asset) => {
          _push(`<img class="media-mini"${ssrRenderAttr("src", asset.url)}${ssrRenderAttr("alt", asset.title)} data-v-2211ecb0>`);
        });
        _push(`<!--]--></div><p data-v-2211ecb0>${ssrInterpolate(unref(usedMediaAssets).length ? "Images are referenced by cover or content blocks." : "No media references yet.")}</p></div><div class="inspector-card" data-v-2211ecb0><h3 data-v-2211ecb0>Output mapping</h3><div class="component-note" data-v-2211ecb0> Saves frontmatter, <code data-v-2211ecb0>blocks</code>, cover fields and markdown fallback to <code data-v-2211ecb0>content/${ssrInterpolate(unref(filePath))}</code>. </div></div></aside></section>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(filePath) || !unref(isRichComposer)) {
        _push(ssrRenderComponent(_component_AdminHero, {
          eyebrow: "Content Editor",
          title: unref(frontmatter).title || "Missing content file",
          description: `Editing ${unref(filePath) || "no file selected"} inside Nuxt Content.`
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(filePath) && !unref(isRichComposer)) {
        _push(`<section class="editor-grid" data-v-2211ecb0><div class="editor-main" data-v-2211ecb0>`);
        _push(ssrRenderComponent(_component_AdminPanel, {
          title: "Core metadata",
          eyebrow: "Frontmatter"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="field-grid" data-v-2211ecb0${_scopeId}><label data-v-2211ecb0${_scopeId}> Title <input${ssrRenderAttr("value", unref(frontmatter).title)} type="text" data-v-2211ecb0${_scopeId}></label><label data-v-2211ecb0${_scopeId}> Slug <input${ssrRenderAttr("value", unref(frontmatter).slug)} type="text" data-v-2211ecb0${_scopeId}></label><label data-v-2211ecb0${_scopeId}> Status <select data-v-2211ecb0${_scopeId}><!--[-->`);
              ssrRenderList(unref(statusChoices), (status) => {
                _push2(`<option${ssrRenderAttr("value", status)} data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).status) ? ssrLooseContain(unref(frontmatter).status, status) : ssrLooseEqual(unref(frontmatter).status, status)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(status)}</option>`);
              });
              _push2(`<!--]--></select></label><label data-v-2211ecb0${_scopeId}> Lab `);
              if (unref(labChoices).length) {
                _push2(`<select data-v-2211ecb0${_scopeId}><option value="" data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).lab) ? ssrLooseContain(unref(frontmatter).lab, "") : ssrLooseEqual(unref(frontmatter).lab, "")) ? " selected" : ""}${_scopeId}>Unassigned</option><!--[-->`);
                ssrRenderList(unref(labSelectChoices), (lab) => {
                  _push2(`<option${ssrRenderAttr("value", lab.value)} data-v-2211ecb0${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).lab) ? ssrLooseContain(unref(frontmatter).lab, lab.value) : ssrLooseEqual(unref(frontmatter).lab, lab.value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(lab.label)}</option>`);
                });
                _push2(`<!--]--></select>`);
              } else {
                _push2(`<select disabled data-v-2211ecb0${_scopeId}><option data-v-2211ecb0${_scopeId}>No labs available yet.</option></select>`);
              }
              _push2(`</label>`);
              if (unref(contentType) === "blog") {
                _push2(`<label data-v-2211ecb0${_scopeId}> Excerpt <textarea rows="3" data-v-2211ecb0${_scopeId}>${ssrInterpolate(unref(frontmatter).excerpt)}</textarea></label>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(contentType) === "projects") {
                _push2(`<label data-v-2211ecb0${_scopeId}> Summary <textarea rows="3" data-v-2211ecb0${_scopeId}>${ssrInterpolate(unref(frontmatter).summary)}</textarea></label>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<label data-v-2211ecb0${_scopeId}> Description <textarea rows="3" data-v-2211ecb0${_scopeId}>${ssrInterpolate(unref(frontmatter).description)}</textarea></label><label data-v-2211ecb0${_scopeId}> Tags <input${ssrRenderAttr("value", unref(tagsText))} type="text" placeholder="ai, systems, research" data-v-2211ecb0${_scopeId}></label></div>`);
            } else {
              return [
                createVNode("div", { class: "field-grid" }, [
                  createVNode("label", null, [
                    createTextVNode(" Title "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(frontmatter).title = $event,
                      type: "text"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(frontmatter).title]
                    ])
                  ]),
                  createVNode("label", null, [
                    createTextVNode(" Slug "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(frontmatter).slug = $event,
                      type: "text"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(frontmatter).slug]
                    ])
                  ]),
                  createVNode("label", null, [
                    createTextVNode(" Status "),
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => unref(frontmatter).status = $event
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(statusChoices), (status) => {
                        return openBlock(), createBlock("option", {
                          key: status,
                          value: status
                        }, toDisplayString(status), 9, ["value"]);
                      }), 128))
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, unref(frontmatter).status]
                    ])
                  ]),
                  createVNode("label", null, [
                    createTextVNode(" Lab "),
                    unref(labChoices).length ? withDirectives((openBlock(), createBlock("select", {
                      key: 0,
                      "onUpdate:modelValue": ($event) => unref(frontmatter).lab = $event
                    }, [
                      createVNode("option", { value: "" }, "Unassigned"),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(labSelectChoices), (lab) => {
                        return openBlock(), createBlock("option", {
                          key: lab.value,
                          value: lab.value
                        }, toDisplayString(lab.label), 9, ["value"]);
                      }), 128))
                    ], 8, ["onUpdate:modelValue"])), [
                      [vModelSelect, unref(frontmatter).lab]
                    ]) : (openBlock(), createBlock("select", {
                      key: 1,
                      disabled: ""
                    }, [
                      createVNode("option", null, "No labs available yet.")
                    ]))
                  ]),
                  unref(contentType) === "blog" ? (openBlock(), createBlock("label", { key: 0 }, [
                    createTextVNode(" Excerpt "),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => unref(frontmatter).excerpt = $event,
                      rows: "3"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(frontmatter).excerpt]
                    ])
                  ])) : createCommentVNode("", true),
                  unref(contentType) === "projects" ? (openBlock(), createBlock("label", { key: 1 }, [
                    createTextVNode(" Summary "),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => unref(frontmatter).summary = $event,
                      rows: "3"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(frontmatter).summary]
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("label", null, [
                    createTextVNode(" Description "),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => unref(frontmatter).description = $event,
                      rows: "3"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(frontmatter).description]
                    ])
                  ]),
                  createVNode("label", null, [
                    createTextVNode(" Tags "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => isRef(tagsText) ? tagsText.value = $event : null,
                      type: "text",
                      placeholder: "ai, systems, research"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(tagsText)]
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(contentType) === "projects") {
          _push(ssrRenderComponent(_component_AdminPanel, {
            title: "Project fields",
            eyebrow: "Repository"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="field-grid" data-v-2211ecb0${_scopeId}><label data-v-2211ecb0${_scopeId}> Type <input${ssrRenderAttr("value", unref(frontmatter).type)} type="text" data-v-2211ecb0${_scopeId}></label><label data-v-2211ecb0${_scopeId}> Year <input${ssrRenderAttr("value", unref(frontmatter).year)} type="number" data-v-2211ecb0${_scopeId}></label><label data-v-2211ecb0${_scopeId}> Stack <input${ssrRenderAttr("value", unref(stackText))} type="text" placeholder="Nuxt, Python" data-v-2211ecb0${_scopeId}></label></div>`);
              } else {
                return [
                  createVNode("div", { class: "field-grid" }, [
                    createVNode("label", null, [
                      createTextVNode(" Type "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(frontmatter).type = $event,
                        type: "text"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(frontmatter).type]
                      ])
                    ]),
                    createVNode("label", null, [
                      createTextVNode(" Year "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(frontmatter).year = $event,
                        type: "number"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(frontmatter).year]
                      ])
                    ]),
                    createVNode("label", null, [
                      createTextVNode(" Stack "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => isRef(stackText) ? stackText.value = $event : null,
                        type: "text",
                        placeholder: "Nuxt, Python"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(stackText)]
                      ])
                    ])
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(contentType) === "projects") {
          _push(ssrRenderComponent(_component_AdminPanel, {
            title: "Documentation",
            eyebrow: "Project docs"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (!unref(hasAttachedDocs)) {
                  _push2(`<div class="empty-doc-state" data-v-2211ecb0${_scopeId}><strong data-v-2211ecb0${_scopeId}>No documentation attached yet.</strong><p data-v-2211ecb0${_scopeId}>This project can stay as a standalone dossier, or you can connect existing docs / create the first docs page.</p></div>`);
                } else {
                  _push2(`<div class="attached-docs" data-v-2211ecb0${_scopeId}><div class="attached-section" data-v-2211ecb0${_scopeId}><p class="doc-section-title" data-v-2211ecb0${_scopeId}>Attached documentation</p><article class="attached-doc-card" data-v-2211ecb0${_scopeId}><div data-v-2211ecb0${_scopeId}><strong data-v-2211ecb0${_scopeId}>${ssrInterpolate(unref(attachedDocs)[0]?.title || unref(frontmatter).docsPath)}</strong><small data-v-2211ecb0${_scopeId}>${ssrInterpolate(unref(frontmatter).docsPath)} · folder: ${ssrInterpolate(unref(docsFolder))}</small></div>`);
                  if (unref(frontmatter).docsPath) {
                    _push2(ssrRenderComponent(_component_NuxtLink, {
                      class: "mini-doc-link",
                      to: unref(frontmatter).docsPath
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`View documentation`);
                        } else {
                          return [
                            createTextVNode("View documentation")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</article></div><div class="attached-section" data-v-2211ecb0${_scopeId}><p class="doc-section-title" data-v-2211ecb0${_scopeId}>Attached pages</p>`);
                  if (!unref(attachedDocs).length) {
                    _push2(`<p class="muted" data-v-2211ecb0${_scopeId}>No documentation pages selected.</p>`);
                  } else {
                    _push2(`<!--[-->`);
                    ssrRenderList(unref(attachedDocs), (doc) => {
                      _push2(`<article class="attached-doc-card" data-v-2211ecb0${_scopeId}><div data-v-2211ecb0${_scopeId}><strong data-v-2211ecb0${_scopeId}>${ssrInterpolate(doc.title)}</strong><small data-v-2211ecb0${_scopeId}>${ssrInterpolate(secondaryDocText(doc))}</small></div>`);
                      _push2(ssrRenderComponent(_component_NuxtLink, {
                        class: "mini-doc-link",
                        to: doc.publicPath
                      }, {
                        default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                          if (_push3) {
                            _push3(`View`);
                          } else {
                            return [
                              createTextVNode("View")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent2, _scopeId));
                      _push2(`</article>`);
                    });
                    _push2(`<!--]-->`);
                  }
                  _push2(`</div></div>`);
                }
                _push2(`<div class="doc-actions" data-v-2211ecb0${_scopeId}>`);
                if (unref(frontmatter).docsPath) {
                  _push2(ssrRenderComponent(_component_NuxtLink, {
                    class: "ghost-btn",
                    to: unref(frontmatter).docsPath
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`View documentation`);
                      } else {
                        return [
                          createTextVNode("View documentation")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<button class="ghost-btn" type="button" data-v-2211ecb0${_scopeId}>Add existing documentation</button>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  class: "studio-btn",
                  to: unref(newDocsForProjectLink)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(unref(relatedDocs).length ? "New Docs Page for this project" : "Create first docs page")}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(unref(relatedDocs).length ? "New Docs Page for this project" : "Create first docs page"), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
                if (unref(isAttachingDocs)) {
                  _push2(`<div class="attach-docs-panel" data-v-2211ecb0${_scopeId}><div data-v-2211ecb0${_scopeId}><h3 data-v-2211ecb0${_scopeId}>Attach existing documentation</h3><p data-v-2211ecb0${_scopeId}>Select one or more available documentation pages to attach to this project.</p></div><div class="doc-picker" data-v-2211ecb0${_scopeId}><p class="doc-section-title" data-v-2211ecb0${_scopeId}>Documentation pages</p>`);
                  if (!unref(attachableDocs).length) {
                    _push2(`<p class="muted" data-v-2211ecb0${_scopeId}>No available documentation found.</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<!--[-->`);
                  ssrRenderList(unref(attachableDocs), (doc) => {
                    _push2(`<label class="doc-choice" data-v-2211ecb0${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(selectedAttachmentDocs)) ? ssrLooseContain(unref(selectedAttachmentDocs), doc.publicPath) : unref(selectedAttachmentDocs)) ? " checked" : ""} type="checkbox"${ssrRenderAttr("value", doc.publicPath)} data-v-2211ecb0${_scopeId}><span data-v-2211ecb0${_scopeId}><strong data-v-2211ecb0${_scopeId}>${ssrInterpolate(doc.title)}</strong><small data-v-2211ecb0${_scopeId}>${ssrInterpolate(secondaryDocText(doc))}</small><small data-v-2211ecb0${_scopeId}>Status: ${ssrInterpolate(docAvailabilityLabel(doc))}</small></span></label>`);
                  });
                  _push2(`<!--]--></div>`);
                  if (unref(attachedElsewhereDocs).length) {
                    _push2(`<details class="advanced-doc-fields" data-v-2211ecb0${_scopeId}><summary data-v-2211ecb0${_scopeId}>Already attached to another project</summary><!--[-->`);
                    ssrRenderList(unref(attachedElsewhereDocs), (doc) => {
                      _push2(`<article class="doc-choice disabled-doc" data-v-2211ecb0${_scopeId}><span data-v-2211ecb0${_scopeId}><strong data-v-2211ecb0${_scopeId}>${ssrInterpolate(doc.title)}</strong><small data-v-2211ecb0${_scopeId}>${ssrInterpolate(secondaryDocText(doc))}</small><small data-v-2211ecb0${_scopeId}>Status: ${ssrInterpolate(docAvailabilityLabel(doc))}</small></span></article>`);
                    });
                    _push2(`<!--]--></details>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="doc-actions" data-v-2211ecb0${_scopeId}><button class="studio-btn" type="button"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} data-v-2211ecb0${_scopeId}>Save attachment</button><button class="ghost-btn" type="button" data-v-2211ecb0${_scopeId}>Cancel</button></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<details class="advanced-doc-fields" data-v-2211ecb0${_scopeId}><summary data-v-2211ecb0${_scopeId}>Advanced documentation fields</summary><div class="field-grid" data-v-2211ecb0${_scopeId}><label id="project-docs-path" data-v-2211ecb0${_scopeId}> Docs path <input${ssrRenderAttr("value", unref(frontmatter).docsPath)} type="text" placeholder="/docs/tennis-ai-friction" data-v-2211ecb0${_scopeId}></label><label data-v-2211ecb0${_scopeId}> Docs folder <input${ssrRenderAttr("value", unref(frontmatter).docsFolder)} type="text" placeholder="tennis-ai-friction" data-v-2211ecb0${_scopeId}></label><label data-v-2211ecb0${_scopeId}> Related docs raw <input${ssrRenderAttr("value", unref(frontmatter).relatedDocs)} type="text" placeholder="/docs/tennis-ai-friction/setup" data-v-2211ecb0${_scopeId}></label></div></details>`);
              } else {
                return [
                  !unref(hasAttachedDocs) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "empty-doc-state"
                  }, [
                    createVNode("strong", null, "No documentation attached yet."),
                    createVNode("p", null, "This project can stay as a standalone dossier, or you can connect existing docs / create the first docs page.")
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "attached-docs"
                  }, [
                    createVNode("div", { class: "attached-section" }, [
                      createVNode("p", { class: "doc-section-title" }, "Attached documentation"),
                      createVNode("article", { class: "attached-doc-card" }, [
                        createVNode("div", null, [
                          createVNode("strong", null, toDisplayString(unref(attachedDocs)[0]?.title || unref(frontmatter).docsPath), 1),
                          createVNode("small", null, toDisplayString(unref(frontmatter).docsPath) + " · folder: " + toDisplayString(unref(docsFolder)), 1)
                        ]),
                        unref(frontmatter).docsPath ? (openBlock(), createBlock(_component_NuxtLink, {
                          key: 0,
                          class: "mini-doc-link",
                          to: unref(frontmatter).docsPath
                        }, {
                          default: withCtx(() => [
                            createTextVNode("View documentation")
                          ]),
                          _: 1
                        }, 8, ["to"])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "attached-section" }, [
                      createVNode("p", { class: "doc-section-title" }, "Attached pages"),
                      !unref(attachedDocs).length ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "muted"
                      }, "No documentation pages selected.")) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(attachedDocs), (doc) => {
                        return openBlock(), createBlock("article", {
                          key: doc.filePath,
                          class: "attached-doc-card"
                        }, [
                          createVNode("div", null, [
                            createVNode("strong", null, toDisplayString(doc.title), 1),
                            createVNode("small", null, toDisplayString(secondaryDocText(doc)), 1)
                          ]),
                          createVNode(_component_NuxtLink, {
                            class: "mini-doc-link",
                            to: doc.publicPath
                          }, {
                            default: withCtx(() => [
                              createTextVNode("View")
                            ]),
                            _: 1
                          }, 8, ["to"])
                        ]);
                      }), 128))
                    ])
                  ])),
                  createVNode("div", { class: "doc-actions" }, [
                    unref(frontmatter).docsPath ? (openBlock(), createBlock(_component_NuxtLink, {
                      key: 0,
                      class: "ghost-btn",
                      to: unref(frontmatter).docsPath
                    }, {
                      default: withCtx(() => [
                        createTextVNode("View documentation")
                      ]),
                      _: 1
                    }, 8, ["to"])) : createCommentVNode("", true),
                    createVNode("button", {
                      class: "ghost-btn",
                      type: "button",
                      onClick: ($event) => isAttachingDocs.value = !unref(isAttachingDocs)
                    }, "Add existing documentation", 8, ["onClick"]),
                    createVNode(_component_NuxtLink, {
                      class: "studio-btn",
                      to: unref(newDocsForProjectLink)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(relatedDocs).length ? "New Docs Page for this project" : "Create first docs page"), 1)
                      ]),
                      _: 1
                    }, 8, ["to"])
                  ]),
                  unref(isAttachingDocs) ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "attach-docs-panel"
                  }, [
                    createVNode("div", null, [
                      createVNode("h3", null, "Attach existing documentation"),
                      createVNode("p", null, "Select one or more available documentation pages to attach to this project.")
                    ]),
                    createVNode("div", { class: "doc-picker" }, [
                      createVNode("p", { class: "doc-section-title" }, "Documentation pages"),
                      !unref(attachableDocs).length ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "muted"
                      }, "No available documentation found.")) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(attachableDocs), (doc) => {
                        return openBlock(), createBlock("label", {
                          key: doc.filePath,
                          class: "doc-choice"
                        }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => isRef(selectedAttachmentDocs) ? selectedAttachmentDocs.value = $event : null,
                            type: "checkbox",
                            value: doc.publicPath
                          }, null, 8, ["onUpdate:modelValue", "value"]), [
                            [vModelCheckbox, unref(selectedAttachmentDocs)]
                          ]),
                          createVNode("span", null, [
                            createVNode("strong", null, toDisplayString(doc.title), 1),
                            createVNode("small", null, toDisplayString(secondaryDocText(doc)), 1),
                            createVNode("small", null, "Status: " + toDisplayString(docAvailabilityLabel(doc)), 1)
                          ])
                        ]);
                      }), 128))
                    ]),
                    unref(attachedElsewhereDocs).length ? (openBlock(), createBlock("details", {
                      key: 0,
                      class: "advanced-doc-fields"
                    }, [
                      createVNode("summary", null, "Already attached to another project"),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(attachedElsewhereDocs), (doc) => {
                        return openBlock(), createBlock("article", {
                          key: doc.filePath,
                          class: "doc-choice disabled-doc"
                        }, [
                          createVNode("span", null, [
                            createVNode("strong", null, toDisplayString(doc.title), 1),
                            createVNode("small", null, toDisplayString(secondaryDocText(doc)), 1),
                            createVNode("small", null, "Status: " + toDisplayString(docAvailabilityLabel(doc)), 1)
                          ])
                        ]);
                      }), 128))
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "doc-actions" }, [
                      createVNode("button", {
                        class: "studio-btn",
                        type: "button",
                        disabled: unref(isSaving),
                        onClick: saveDocumentationAttachments
                      }, "Save attachment", 8, ["disabled"]),
                      createVNode("button", {
                        class: "ghost-btn",
                        type: "button",
                        onClick: ($event) => isAttachingDocs.value = false
                      }, "Cancel", 8, ["onClick"])
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("details", { class: "advanced-doc-fields" }, [
                    createVNode("summary", null, "Advanced documentation fields"),
                    createVNode("div", { class: "field-grid" }, [
                      createVNode("label", { id: "project-docs-path" }, [
                        createTextVNode(" Docs path "),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(frontmatter).docsPath = $event,
                          type: "text",
                          placeholder: "/docs/tennis-ai-friction"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(frontmatter).docsPath]
                        ])
                      ]),
                      createVNode("label", null, [
                        createTextVNode(" Docs folder "),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(frontmatter).docsFolder = $event,
                          type: "text",
                          placeholder: "tennis-ai-friction"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(frontmatter).docsFolder]
                        ])
                      ]),
                      createVNode("label", null, [
                        createTextVNode(" Related docs raw "),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(frontmatter).relatedDocs = $event,
                          type: "text",
                          placeholder: "/docs/tennis-ai-friction/setup"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(frontmatter).relatedDocs]
                        ])
                      ])
                    ])
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(contentType) === "docs") {
          _push(ssrRenderComponent(_component_AdminPanel, {
            title: "Docs fields",
            eyebrow: "Project documentation"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="field-grid" data-v-2211ecb0${_scopeId}><label data-v-2211ecb0${_scopeId}> Project <input${ssrRenderAttr("value", unref(frontmatter).project)} type="text" data-v-2211ecb0${_scopeId}></label><label data-v-2211ecb0${_scopeId}> Project slug <input${ssrRenderAttr("value", unref(frontmatter).projectSlug)} type="text" data-v-2211ecb0${_scopeId}></label><label data-v-2211ecb0${_scopeId}> Docs folder <input${ssrRenderAttr("value", unref(frontmatter).docsFolder)} type="text" data-v-2211ecb0${_scopeId}></label><label data-v-2211ecb0${_scopeId}> Section <input${ssrRenderAttr("value", unref(frontmatter).section)} type="text" data-v-2211ecb0${_scopeId}></label><label data-v-2211ecb0${_scopeId}> Order <input${ssrRenderAttr("value", unref(frontmatter).order)} type="number" data-v-2211ecb0${_scopeId}></label></div>`);
              } else {
                return [
                  createVNode("div", { class: "field-grid" }, [
                    createVNode("label", null, [
                      createTextVNode(" Project "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(frontmatter).project = $event,
                        type: "text"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(frontmatter).project]
                      ])
                    ]),
                    createVNode("label", null, [
                      createTextVNode(" Project slug "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(frontmatter).projectSlug = $event,
                        type: "text"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(frontmatter).projectSlug]
                      ])
                    ]),
                    createVNode("label", null, [
                      createTextVNode(" Docs folder "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(frontmatter).docsFolder = $event,
                        type: "text"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(frontmatter).docsFolder]
                      ])
                    ]),
                    createVNode("label", null, [
                      createTextVNode(" Section "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(frontmatter).section = $event,
                        type: "text"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(frontmatter).section]
                      ])
                    ]),
                    createVNode("label", null, [
                      createTextVNode(" Order "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(frontmatter).order = $event,
                        type: "number"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(frontmatter).order]
                      ])
                    ])
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(contentType) === "labs") {
          _push(ssrRenderComponent(_component_AdminPanel, {
            title: "Lab fields",
            eyebrow: "Research line"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="field-grid" data-v-2211ecb0${_scopeId}><label data-v-2211ecb0${_scopeId}> Short title <input${ssrRenderAttr("value", unref(frontmatter).shortTitle)} type="text" data-v-2211ecb0${_scopeId}></label><label data-v-2211ecb0${_scopeId}> Accent <input${ssrRenderAttr("value", unref(frontmatter).accent)} type="text" data-v-2211ecb0${_scopeId}></label><label data-v-2211ecb0${_scopeId}> Order <input${ssrRenderAttr("value", unref(frontmatter).order)} type="number" data-v-2211ecb0${_scopeId}></label><label data-v-2211ecb0${_scopeId}> Related tags <input${ssrRenderAttr("value", unref(relatedTagsText))} type="text" data-v-2211ecb0${_scopeId}></label><label data-v-2211ecb0${_scopeId}> Roadmap <textarea rows="4" data-v-2211ecb0${_scopeId}>${ssrInterpolate(unref(roadmapText))}</textarea></label><label data-v-2211ecb0${_scopeId}> Open questions <textarea rows="4" data-v-2211ecb0${_scopeId}>${ssrInterpolate(unref(openQuestionsText))}</textarea></label></div>`);
              } else {
                return [
                  createVNode("div", { class: "field-grid" }, [
                    createVNode("label", null, [
                      createTextVNode(" Short title "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(frontmatter).shortTitle = $event,
                        type: "text"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(frontmatter).shortTitle]
                      ])
                    ]),
                    createVNode("label", null, [
                      createTextVNode(" Accent "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(frontmatter).accent = $event,
                        type: "text"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(frontmatter).accent]
                      ])
                    ]),
                    createVNode("label", null, [
                      createTextVNode(" Order "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(frontmatter).order = $event,
                        type: "number"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(frontmatter).order]
                      ])
                    ]),
                    createVNode("label", null, [
                      createTextVNode(" Related tags "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => isRef(relatedTagsText) ? relatedTagsText.value = $event : null,
                        type: "text"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(relatedTagsText)]
                      ])
                    ]),
                    createVNode("label", null, [
                      createTextVNode(" Roadmap "),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => isRef(roadmapText) ? roadmapText.value = $event : null,
                        rows: "4"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(roadmapText)]
                      ])
                    ]),
                    createVNode("label", null, [
                      createTextVNode(" Open questions "),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => isRef(openQuestionsText) ? openQuestionsText.value = $event : null,
                        rows: "4"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(openQuestionsText)]
                      ])
                    ])
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_AdminPanel, {
          title: "Markdown body",
          eyebrow: "Content"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<textarea class="body-editor" data-v-2211ecb0${_scopeId}>${ssrInterpolate(unref(markdownBody))}</textarea>`);
            } else {
              return [
                withDirectives(createVNode("textarea", {
                  "onUpdate:modelValue": ($event) => isRef(markdownBody) ? markdownBody.value = $event : null,
                  class: "body-editor"
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelText, unref(markdownBody)]
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><aside class="editor-side" data-v-2211ecb0>`);
        _push(ssrRenderComponent(_component_AdminPanel, {
          title: "Save",
          eyebrow: "Stage 4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="actions" data-v-2211ecb0${_scopeId}><button class="studio-btn" type="button"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} data-v-2211ecb0${_scopeId}>${ssrInterpolate(unref(isSaving) ? "Saving..." : "Save changes")}</button><button class="ghost-btn" type="button" data-v-2211ecb0${_scopeId}>Archive</button></div>`);
              if (unref(statusMessage)) {
                _push2(`<p class="status-copy" data-v-2211ecb0${_scopeId}>${ssrInterpolate(unref(statusMessage))}</p>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("div", { class: "actions" }, [
                  createVNode("button", {
                    class: "studio-btn",
                    type: "button",
                    disabled: unref(isSaving),
                    onClick: save
                  }, toDisplayString(unref(isSaving) ? "Saving..." : "Save changes"), 9, ["disabled"]),
                  createVNode("button", {
                    class: "ghost-btn",
                    type: "button",
                    onClick: archive
                  }, "Archive")
                ]),
                unref(statusMessage) ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "status-copy"
                }, toDisplayString(unref(statusMessage)), 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_AdminPanel, {
          title: "SEO settings",
          eyebrow: "Metadata"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="field-stack" data-v-2211ecb0${_scopeId}><label data-v-2211ecb0${_scopeId}> SEO title <input${ssrRenderAttr("value", unref(frontmatter).seoTitle)} type="text" data-v-2211ecb0${_scopeId}></label><label data-v-2211ecb0${_scopeId}> SEO description <textarea rows="4" data-v-2211ecb0${_scopeId}>${ssrInterpolate(unref(frontmatter).seoDescription)}</textarea></label><label data-v-2211ecb0${_scopeId}> OG title <input${ssrRenderAttr("value", unref(frontmatter).ogTitle)} type="text" data-v-2211ecb0${_scopeId}></label><label data-v-2211ecb0${_scopeId}> OG description <textarea rows="4" data-v-2211ecb0${_scopeId}>${ssrInterpolate(unref(frontmatter).ogDescription)}</textarea></label><label data-v-2211ecb0${_scopeId}> OG image <input${ssrRenderAttr("value", unref(frontmatter).ogImage)} type="text" data-v-2211ecb0${_scopeId}></label><label data-v-2211ecb0${_scopeId}> Canonical <input${ssrRenderAttr("value", unref(frontmatter).canonical)} type="text" data-v-2211ecb0${_scopeId}></label><label class="check-row" data-v-2211ecb0${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).noindex) ? ssrLooseContain(unref(frontmatter).noindex, null) : unref(frontmatter).noindex) ? " checked" : ""} type="checkbox" data-v-2211ecb0${_scopeId}> Noindex </label></div>`);
            } else {
              return [
                createVNode("div", { class: "field-stack" }, [
                  createVNode("label", null, [
                    createTextVNode(" SEO title "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(frontmatter).seoTitle = $event,
                      type: "text"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(frontmatter).seoTitle]
                    ])
                  ]),
                  createVNode("label", null, [
                    createTextVNode(" SEO description "),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => unref(frontmatter).seoDescription = $event,
                      rows: "4"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(frontmatter).seoDescription]
                    ])
                  ]),
                  createVNode("label", null, [
                    createTextVNode(" OG title "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(frontmatter).ogTitle = $event,
                      type: "text"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(frontmatter).ogTitle]
                    ])
                  ]),
                  createVNode("label", null, [
                    createTextVNode(" OG description "),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => unref(frontmatter).ogDescription = $event,
                      rows: "4"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(frontmatter).ogDescription]
                    ])
                  ]),
                  createVNode("label", null, [
                    createTextVNode(" OG image "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(frontmatter).ogImage = $event,
                      type: "text"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(frontmatter).ogImage]
                    ])
                  ]),
                  createVNode("label", null, [
                    createTextVNode(" Canonical "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(frontmatter).canonical = $event,
                      type: "text"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(frontmatter).canonical]
                    ])
                  ]),
                  createVNode("label", { class: "check-row" }, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(frontmatter).noindex = $event,
                      type: "checkbox"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelCheckbox, unref(frontmatter).noindex]
                    ]),
                    createTextVNode(" Noindex ")
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</aside></section>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(filePath)) {
        _push(ssrRenderComponent(_component_AdminPanel, {
          title: "No file selected",
          eyebrow: "Editor"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p class="muted" data-v-2211ecb0${_scopeId}>Open a file from Blog, Projects, Docs, or Labs to edit it.</p><button class="ghost-btn" type="button" data-v-2211ecb0${_scopeId}>Back to Studio</button>`);
            } else {
              return [
                createVNode("p", { class: "muted" }, "Open a file from Blog, Projects, Docs, or Labs to edit it."),
                createVNode("button", {
                  class: "ghost-btn",
                  type: "button",
                  onClick: ($event) => unref(router).push("/admin")
                }, "Back to Studio", 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(mediaPickerMode)) {
        _push(`<div class="media-picker-backdrop" data-v-2211ecb0><section class="media-picker-panel" data-v-2211ecb0><div class="panel-head" data-v-2211ecb0><div data-v-2211ecb0><p class="eyebrow" data-v-2211ecb0>Media Library</p><h2 data-v-2211ecb0>${ssrInterpolate(unref(mediaPickerMode) === "cover" ? "Choose cover image" : "Choose block image")}</h2></div><div class="media-picker-actions" data-v-2211ecb0><button class="ghost-btn" type="button" data-v-2211ecb0>Upload image</button><button class="ghost-btn" type="button"${ssrIncludeBooleanAttr(unref(mediaPending)) ? " disabled" : ""} data-v-2211ecb0>Refresh</button><button class="ghost-btn" type="button" data-v-2211ecb0>Close</button></div></div>`);
        if (unref(uploadMessage)) {
          _push(`<p class="upload-message" data-v-2211ecb0>${ssrInterpolate(unref(uploadMessage))}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(mediaError)) {
          _push(`<p class="muted" data-v-2211ecb0>${ssrInterpolate(unref(mediaError))}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(mediaPending)) {
          _push(`<p class="muted" data-v-2211ecb0>Reading media library...</p>`);
        } else if (unref(mediaAssets).length) {
          _push(`<div class="media-picker-grid" data-v-2211ecb0><!--[-->`);
          ssrRenderList(unref(mediaAssets), (asset) => {
            _push(`<button class="media-picker-item" type="button" data-v-2211ecb0><img${ssrRenderAttr("src", asset.url)}${ssrRenderAttr("alt", asset.title)} data-v-2211ecb0><strong data-v-2211ecb0>${ssrInterpolate(asset.title)}</strong><span data-v-2211ecb0>${ssrInterpolate(asset.filename)}</span></button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="empty-canvas" data-v-2211ecb0><strong data-v-2211ecb0>No media available yet.</strong><p data-v-2211ecb0>Upload a JPG, PNG or WebP image to start using real Media Library assets.</p><button class="studio-btn" type="button" data-v-2211ecb0>Upload image</button></div>`);
        }
        _push(`</section></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(statusMessage)) {
        _push(`<div class="composer-toast"${ssrRenderAttr("data-state", unref(saveState))} data-v-2211ecb0>${ssrInterpolate(unref(statusMessage))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/content/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2211ecb0"]]);

export { edit as default };
//# sourceMappingURL=edit-B6F0f3xu.mjs.map
