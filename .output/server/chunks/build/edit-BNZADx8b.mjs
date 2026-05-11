import { _ as __nuxt_component_1 } from './ArticleHero-Dixb1bez.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, withDirectives, vModelText, isRef, openBlock, createBlock, Fragment, renderList, vModelSelect, createCommentVNode, vModelCheckbox, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc, d as useRoute, u as useRouter } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BzjT64JD.mjs';
import { _ as __nuxt_component_2 } from './ContentBlockRenderer-k3SB9w23.mjs';
import { _ as __nuxt_component_0$2 } from './AdminHero-lJqa4kRI.mjs';
import { _ as __nuxt_component_2$1 } from './AdminPanel-CPS4BSK_.mjs';
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "blog-preview-surface" }, _attrs))} data-v-7379cacb><div class="blog-preview-scale" data-v-7379cacb>`);
      _push(ssrRenderComponent(_component_ArticleHero, {
        title: __props.title,
        description: __props.description,
        category: __props.category,
        date: __props.date,
        status: __props.status,
        "cover-style": __props.coverStyle,
        "accent-color": __props.accentColor
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/BlogComposerPreview.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-7379cacb"]]), { __name: "BlogComposerPreview" });
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
    const filePath = ref(String(route.query.file || ""));
    const { listContent, readContent, saveContent, archiveContent } = useAdminContent();
    const frontmatter = ref({});
    const markdownBody = ref("");
    const statusMessage = ref("");
    const saveState = ref("idle");
    let saveMessageTimer;
    const isSaving = ref(false);
    const isDeleting = ref(false);
    const deleteConfirmation = ref("");
    const slugManuallyEdited = ref(true);
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
      `editor-related-docs-${filePath.value}`,
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
        heading: "Heading Block",
        text: "Text Block",
        quote: "Quote Block",
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
    function blockDescription(type) {
      const descriptions = {
        heading: "Title + optional subheading",
        text: "Rich text body",
        quote: "Editorial quote / citation",
        image: "Media Library + caption",
        code: "Language + title",
        callout: "Info, warning, note",
        table: "Rows + columns",
        banner: "Color + message",
        steps: "Later",
        gallery: "Later",
        split: "Later"
      };
      return descriptions[type];
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
    const implementedBlockTypes = ["heading", "text", "quote", "image", "code", "callout", "table", "banner"];
    const laterBlockTypes = ["steps", "gallery", "split"];
    ref(null);
    ref(null);
    const uploadMessage = ref("");
    function blockUiTitle(block) {
      const title = String(block.title || "").trim();
      if (title) return title;
      if (block.type === "heading") {
        const heading = String(block.data?.heading || "").trim();
        if (heading) return heading;
      }
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
    function slugifyTitle(value, fallback = "") {
      const words = String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").split("-").filter(Boolean).slice(0, 8);
      const selected = [];
      for (const word of words) {
        const candidate = [...selected, word].join("-");
        if (candidate.length > 72) break;
        selected.push(word);
      }
      return selected.join("-") || fallback;
    }
    function isAutoGeneratedBlogSlug(value) {
      const slug = String(value || "").trim();
      return !slug || /^untitled-blog-entry-\d+$/.test(slug) || /^untitled-draft-\d+$/.test(slug) || /^draft-\d+$/.test(slug) || slug === "untitled-blog-entry" || slug === "untitled-draft" || slug === "untitled" || slug === "draft";
    }
    function hasRealBlogTitle(value) {
      const normalized = slugifyTitle(String(value || ""));
      return Boolean(normalized) && normalized !== "untitled-blog-entry" && normalized !== "untitled-draft" && normalized !== "untitled" && normalized !== "draft";
    }
    function syncBlogSlugFromTitle() {
      if (contentType !== "blog" || slugManuallyEdited.value || !hasRealBlogTitle(frontmatter.value.title)) return;
      const generated = slugifyTitle(String(frontmatter.value.title || ""));
      if (generated) frontmatter.value.slug = generated;
    }
    const slugInput = computed({
      get: () => String(frontmatter.value.slug || ""),
      set: (value) => {
        frontmatter.value.slug = contentType === "blog" ? slugifyTitle(value) : value;
        if (contentType === "blog") slugManuallyEdited.value = true;
      }
    });
    function previewPath() {
      const slug = String(frontmatter.value.slug || "").trim();
      if (!slug) return "";
      if (contentType === "blog") return `/blog/${slug}?preview=true`;
      if (contentType === "projects") return `/repository/${slug}?preview=true`;
      if (contentType === "docs") {
        const folder = String(frontmatter.value.docsFolder || filePath.value.replace(/^docs\//, "").split("/")[0]);
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
      if (contentType === "blog" && !slugManuallyEdited.value && hasRealBlogTitle(next.title)) {
        const generated = slugifyTitle(String(next.title || ""));
        if (generated && (!next.slug || isAutoGeneratedBlogSlug(String(next.slug)) || String(next.slug) !== generated)) {
          next.slug = generated;
          frontmatter.value.slug = generated;
        }
      }
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
    if (filePath.value) {
      const response = ([__temp, __restore] = withAsyncContext(() => readContent(contentType, filePath.value)), __temp = await __temp, __restore(), __temp);
      frontmatter.value = { ...response.item.frontmatter };
      if (contentType === "blog") {
        slugManuallyEdited.value = !isAutoGeneratedBlogSlug(String(frontmatter.value.slug || ""));
        syncBlogSlugFromTitle();
      }
      if (isRichComposer.value) {
        editableBlocks.value = normalizeBlocks(frontmatter.value.blocks);
        frontmatter.value.blocks = editableBlocks.value;
        selectedBlockId.value = editableBlocks.value[0]?.id || "";
      }
      markdownBody.value = response.item.body;
      syncTextFields();
    }
    watch(() => frontmatter.value.title, () => {
      syncBlogSlugFromTitle();
    });
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
        const response = await saveContent(contentType, filePath.value, normalizeFrontmatter(), markdownBody.value);
        if (response.item.filePath && response.item.filePath !== filePath.value) {
          filePath.value = response.item.filePath;
          await router.replace({
            path: "/admin/content/edit",
            query: { ...route.query, type: contentType, file: response.item.filePath }
          });
        }
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
      await archiveContent(contentType, filePath.value);
      statusMessage.value = "Content archived with status: archived.";
      frontmatter.value.status = "archived";
      frontmatter.value.archivedAt = (/* @__PURE__ */ new Date()).toISOString();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlogComposerPreview = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_ContentBlockRenderer = __nuxt_component_2;
      const _component_AdminHero = __nuxt_component_0$2;
      const _component_AdminPanel = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-81a2cd4d><input class="visually-hidden-file" type="file" accept="image/jpeg,image/png,image/webp" data-v-81a2cd4d><input class="visually-hidden-file" type="file" accept="image/jpeg,image/png,image/webp" data-v-81a2cd4d>`);
      if (unref(filePath) && unref(isRichComposer)) {
        _push(`<section class="composer-grid" data-v-81a2cd4d><div class="composer-main" data-v-81a2cd4d><section class="composer-hero" data-v-81a2cd4d><p class="eyebrow" data-v-81a2cd4d><span class="pulse" data-v-81a2cd4d></span>${ssrInterpolate(unref(contentLabel))} - CMS block composer</p><h1 data-v-81a2cd4d>${ssrInterpolate(unref(composerHeroTitle))}</h1><p class="subtitle" data-v-81a2cd4d>${ssrInterpolate(unref(composerHeroDescription))}</p>`);
        if (unref(statusMessage)) {
          _push(`<p class="status-copy"${ssrRenderAttr("data-state", unref(saveState))} data-v-81a2cd4d>${ssrInterpolate(unref(statusMessage))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section><nav class="composer-tabs" aria-label="Composer tabs" data-v-81a2cd4d><!--[-->`);
        ssrRenderList(blockTabs, (tab) => {
          _push(`<button type="button" class="${ssrRenderClass({ active: unref(activeTab) === tab.id })}" data-v-81a2cd4d>${ssrInterpolate(tab.label)}</button>`);
        });
        _push(`<!--]--></nav>`);
        if (unref(activeTab) === "content") {
          _push(`<!--[--><section class="setup-grid" data-v-81a2cd4d><div class="panel" data-v-81a2cd4d><div class="panel-head" data-v-81a2cd4d><h2 data-v-81a2cd4d>${ssrInterpolate(unref(contentType) === "projects" ? "Project basics" : unref(contentType) === "blog" ? "Entry basics" : "Docs basics")}</h2><span class="status-badge" data-v-81a2cd4d>${ssrInterpolate(unref(frontmatter).status || "Draft")}</span></div><div class="field-grid compact" data-v-81a2cd4d><label data-v-81a2cd4d> Title <input${ssrRenderAttr("value", unref(frontmatter).title)} type="text" data-v-81a2cd4d></label><label data-v-81a2cd4d> Slug <span class="slug-row" data-v-81a2cd4d><input${ssrRenderAttr("value", unref(slugInput))} type="text" data-v-81a2cd4d><button class="ghost-btn mini-action" type="button" data-v-81a2cd4d>Generate</button></span></label><label class="span-2" data-v-81a2cd4d>${ssrInterpolate(unref(contentType) === "projects" ? "Short description" : "Description")} `);
          if (unref(contentType) === "projects") {
            _push(`<textarea rows="3" data-v-81a2cd4d>${ssrInterpolate(unref(frontmatter).summary)}</textarea>`);
          } else {
            _push(`<textarea rows="3" data-v-81a2cd4d>${ssrInterpolate(unref(frontmatter).description)}</textarea>`);
          }
          _push(`</label></div></div><div class="panel" data-v-81a2cd4d><div class="panel-head" data-v-81a2cd4d><h2 data-v-81a2cd4d>Taxonomy</h2><span class="status-badge friction" data-v-81a2cd4d>${ssrInterpolate(unref(labDisplayName))}</span></div><div class="field-grid compact" data-v-81a2cd4d><label data-v-81a2cd4d> Status <select data-v-81a2cd4d><!--[-->`);
          ssrRenderList(unref(statusChoices), (status) => {
            _push(`<option${ssrRenderAttr("value", status)} data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).status) ? ssrLooseContain(unref(frontmatter).status, status) : ssrLooseEqual(unref(frontmatter).status, status)) ? " selected" : ""}>${ssrInterpolate(status)}</option>`);
          });
          _push(`<!--]--></select></label><label data-v-81a2cd4d> Track / Lab `);
          if (unref(labChoices).length) {
            _push(`<select data-v-81a2cd4d><option value="" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).lab) ? ssrLooseContain(unref(frontmatter).lab, "") : ssrLooseEqual(unref(frontmatter).lab, "")) ? " selected" : ""}>Unassigned</option><!--[-->`);
            ssrRenderList(unref(labSelectChoices), (lab) => {
              _push(`<option${ssrRenderAttr("value", lab.value)} data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).lab) ? ssrLooseContain(unref(frontmatter).lab, lab.value) : ssrLooseEqual(unref(frontmatter).lab, lab.value)) ? " selected" : ""}>${ssrInterpolate(lab.label)}</option>`);
            });
            _push(`<!--]--></select>`);
          } else {
            _push(`<select disabled data-v-81a2cd4d><option data-v-81a2cd4d>No labs available yet.</option></select>`);
          }
          _push(`</label>`);
          if (unref(contentType) === "projects") {
            _push(`<label data-v-81a2cd4d> Year <input${ssrRenderAttr("value", unref(frontmatter).year)} type="number" data-v-81a2cd4d></label>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(contentType) === "projects") {
            _push(`<label data-v-81a2cd4d> Stack <input${ssrRenderAttr("value", unref(stackText))} type="text" placeholder="Nuxt, Python" data-v-81a2cd4d></label>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<label class="span-2" data-v-81a2cd4d> Tags <input${ssrRenderAttr("value", unref(tagsText))} type="text" placeholder="ai, systems, research" data-v-81a2cd4d></label>`);
          if (unref(contentType) === "blog") {
            _push(`<button class="ghost-btn mini-action span-2" type="button" data-v-81a2cd4d> Generate tags </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></section><section class="builder-layout" data-v-81a2cd4d><aside class="block-library" data-v-81a2cd4d><!--[-->`);
          ssrRenderList(implementedBlockTypes, (type) => {
            _push(`<button class="block-button" type="button" data-v-81a2cd4d><span class="block-icon" data-v-81a2cd4d>${ssrInterpolate(defaultBlockTitle(type).charAt(0))}</span><span data-v-81a2cd4d><strong data-v-81a2cd4d>${ssrInterpolate(defaultBlockTitle(type))}</strong><small data-v-81a2cd4d>${ssrInterpolate(blockDescription(type))}</small></span></button>`);
          });
          _push(`<!--]--><!--[-->`);
          ssrRenderList(laterBlockTypes, (type) => {
            _push(`<button class="block-button disabled" type="button" disabled data-v-81a2cd4d><span class="block-icon" data-v-81a2cd4d>${ssrInterpolate(defaultBlockTitle(type).charAt(0))}</span><span data-v-81a2cd4d><strong data-v-81a2cd4d>${ssrInterpolate(defaultBlockTitle(type))}</strong><small data-v-81a2cd4d>Later</small></span></button>`);
          });
          _push(`<!--]--></aside><div class="canvas" data-v-81a2cd4d><div class="${ssrRenderClass([{ "blog-hero-options": unref(isBlogComposer) }, "project-form-top"])}" data-v-81a2cd4d>`);
          if (!unref(isBlogComposer)) {
            _push(`<div class="${ssrRenderClass([{ filled: unref(frontmatter).coverImage }, "cover-upload"])}" role="button" tabindex="0" data-v-81a2cd4d>`);
            if (unref(frontmatter).coverImage) {
              _push(`<img${ssrRenderAttr("src", unref(frontmatter).coverImage)}${ssrRenderAttr("alt", unref(frontmatter).coverAlt || "")} data-v-81a2cd4d>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="upload-inner" data-v-81a2cd4d><div class="upload-icon" data-v-81a2cd4d>+</div><strong data-v-81a2cd4d>${ssrInterpolate(unref(frontmatter).coverImage ? "Cover selected" : "Choose cover image")}</strong><p data-v-81a2cd4d>Choose from Media Library, upload from computer, or drop a JPG/PNG/WebP.</p><div class="media-choice-row" data-v-81a2cd4d><button class="mini-btn" type="button" data-v-81a2cd4d>Open Media Library</button><button class="mini-btn" type="button" data-v-81a2cd4d>Upload from computer</button></div>`);
            if (unref(uploadMessage)) {
              _push(`<small class="upload-message" data-v-81a2cd4d>${ssrInterpolate(unref(uploadMessage))}</small>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="panel visual-options" data-v-81a2cd4d><h2 data-v-81a2cd4d>${ssrInterpolate(unref(isBlogComposer) ? "Blog hero design" : "Cover design")}</h2><p class="muted" data-v-81a2cd4d>${ssrInterpolate(unref(isBlogComposer) ? "Blog entries use an editorial surface and accent color, not cover images." : "These controls update the Frontend Preview in the right inspector.")}</p><label data-v-81a2cd4d> Visual style <select data-v-81a2cd4d><!--[-->`);
          ssrRenderList(unref(isBlogComposer) ? blogHeroStyleOptions : coverStyleOptions, (option) => {
            _push(`<option${ssrRenderAttr("value", option.value)} data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).coverStyle) ? ssrLooseContain(unref(frontmatter).coverStyle, option.value) : ssrLooseEqual(unref(frontmatter).coverStyle, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
          });
          _push(`<!--]--></select></label>`);
          if (!unref(isBlogComposer)) {
            _push(`<label data-v-81a2cd4d> Image position <select data-v-81a2cd4d><!--[-->`);
            ssrRenderList(coverPositionOptions, (position) => {
              _push(`<option${ssrRenderAttr("value", position)} data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).coverPosition) ? ssrLooseContain(unref(frontmatter).coverPosition, position) : ssrLooseEqual(unref(frontmatter).coverPosition, position)) ? " selected" : ""}>${ssrInterpolate(position)}</option>`);
            });
            _push(`<!--]--></select></label>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<label data-v-81a2cd4d> Accent color <select data-v-81a2cd4d><!--[-->`);
          ssrRenderList(accentOptions, (option) => {
            _push(`<option${ssrRenderAttr("value", option.value)} data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).accentColor) ? ssrLooseContain(unref(frontmatter).accentColor, option.value) : ssrLooseEqual(unref(frontmatter).accentColor, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
          });
          _push(`<!--]--></select></label></div>`);
          if (unref(isBlogComposer)) {
            _push(`<div class="inspector-card blog-hero-preview-card" data-v-81a2cd4d><h3 data-v-81a2cd4d>Frontend preview</h3><div class="preview-card" data-v-81a2cd4d><div class="preview-header" data-v-81a2cd4d><span class="dot" data-v-81a2cd4d></span><span class="dot" data-v-81a2cd4d></span><span class="dot" data-v-81a2cd4d></span></div><div class="frontend-preview" data-v-81a2cd4d>`);
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
            _push(`</div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (!unref(editableBlocks).length) {
            _push(`<article class="empty-canvas" data-v-81a2cd4d><strong data-v-81a2cd4d>No blocks yet.</strong><p data-v-81a2cd4d>Add a Heading Block, Text Block, Quote Block, Image Block, Code Block, Callout, Table or Banner from the block library.</p></article>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(unref(editableBlocks), (block, index) => {
            _push(`<article class="${ssrRenderClass([{ selected: unref(selectedBlockId) === block.id, hidden: !block.visible }, "content-block"])}" data-v-81a2cd4d><div class="block-toolbar" data-v-81a2cd4d><div class="block-toolbar-left" data-v-81a2cd4d><button class="drag" type="button" aria-label="Select block" data-v-81a2cd4d>::</button><div class="block-title" data-v-81a2cd4d><strong data-v-81a2cd4d>${ssrInterpolate(blockUiTitle(block))}</strong><span data-v-81a2cd4d>${ssrInterpolate(block.type)} block - ${ssrInterpolate(block.visible ? "visible" : "hidden")}</span></div></div><div class="block-actions" data-v-81a2cd4d><button class="mini-btn" type="button" data-v-81a2cd4d>Edit</button><button class="mini-btn" type="button" data-v-81a2cd4d>Duplicate</button><button class="mini-btn" type="button" data-v-81a2cd4d>${ssrInterpolate(block.visible ? "Hide" : "Show")}</button><button class="mini-btn" type="button" data-v-81a2cd4d>Up</button><button class="mini-btn" type="button" data-v-81a2cd4d>Down</button><button class="mini-btn" type="button" data-v-81a2cd4d>Delete</button></div></div><div class="block-body" data-v-81a2cd4d><div class="field-grid compact" data-v-81a2cd4d><label data-v-81a2cd4d> Block title <input${ssrRenderAttr("value", block.title)} type="text" placeholder="Optional internal title" data-v-81a2cd4d></label>`);
            if (block.type === "heading") {
              _push(`<!--[--><label data-v-81a2cd4d> Kicker <input${ssrRenderAttr("value", block.data.kicker)} type="text" placeholder="Optional eyebrow" data-v-81a2cd4d></label><label data-v-81a2cd4d> Level <select data-v-81a2cd4d><option value="h2" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(block.data.level) ? ssrLooseContain(block.data.level, "h2") : ssrLooseEqual(block.data.level, "h2")) ? " selected" : ""}>H2</option><option value="h3" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(block.data.level) ? ssrLooseContain(block.data.level, "h3") : ssrLooseEqual(block.data.level, "h3")) ? " selected" : ""}>H3</option><option value="h4" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(block.data.level) ? ssrLooseContain(block.data.level, "h4") : ssrLooseEqual(block.data.level, "h4")) ? " selected" : ""}>H4</option></select></label><label class="span-2" data-v-81a2cd4d> Heading <input${ssrRenderAttr("value", block.data.heading)} type="text" placeholder="Visible heading" data-v-81a2cd4d></label><label class="span-2" data-v-81a2cd4d> Subheading <textarea rows="3" placeholder="Optional supporting text" data-v-81a2cd4d>${ssrInterpolate(block.data.subheading)}</textarea></label><!--]-->`);
            } else if (block.type === "text") {
              _push(`<!--[--><label data-v-81a2cd4d> Heading <small data-v-81a2cd4d>(optional legacy)</small><input${ssrRenderAttr("value", block.data.heading)} type="text" placeholder="Optional visible heading" data-v-81a2cd4d></label><label class="span-2" data-v-81a2cd4d> Body <textarea rows="6" data-v-81a2cd4d>${ssrInterpolate(block.data.body)}</textarea></label><!--]-->`);
            } else if (block.type === "quote") {
              _push(`<!--[--><label data-v-81a2cd4d> Variant <select data-v-81a2cd4d><option value="editorial" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "editorial") : ssrLooseEqual(block.data.variant, "editorial")) ? " selected" : ""}>Editorial</option><option value="subtle" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "subtle") : ssrLooseEqual(block.data.variant, "subtle")) ? " selected" : ""}>Subtle</option><option value="pullquote" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "pullquote") : ssrLooseEqual(block.data.variant, "pullquote")) ? " selected" : ""}>Pullquote</option></select></label><label class="span-2" data-v-81a2cd4d> Quote text <textarea rows="4" placeholder="Embed directly into business operations" data-v-81a2cd4d>${ssrInterpolate(block.data.quote)}</textarea></label><label class="span-2" data-v-81a2cd4d> Attribution <small data-v-81a2cd4d>(optional)</small><input${ssrRenderAttr("value", block.data.attribution)} type="text" placeholder="Gribo notes" data-v-81a2cd4d></label><!--]-->`);
            } else if (block.type === "image") {
              _push(`<div class="span-2 image-block-grid" data-v-81a2cd4d><div class="${ssrRenderClass([normalizeImageLayout(block.data.layout), "image-drop"])}" role="button" tabindex="0" data-v-81a2cd4d>`);
              if (block.data.imageUrl) {
                _push(`<img${ssrRenderAttr("src", block.data.imageUrl)}${ssrRenderAttr("alt", block.data.alt || "")} data-v-81a2cd4d>`);
              } else {
                _push(`<div data-v-81a2cd4d><div class="upload-icon" data-v-81a2cd4d>+</div><strong data-v-81a2cd4d>Choose or upload image</strong><p class="muted" data-v-81a2cd4d>Select from Media Library, upload from computer, or drop a JPG/PNG/WebP.</p></div>`);
              }
              _push(`</div><div class="image-settings" data-v-81a2cd4d><label data-v-81a2cd4d> Layout <select data-v-81a2cd4d><option value="full-width" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(block.data.layout) ? ssrLooseContain(block.data.layout, "full-width") : ssrLooseEqual(block.data.layout, "full-width")) ? " selected" : ""}>Full width</option><option value="contained" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(block.data.layout) ? ssrLooseContain(block.data.layout, "contained") : ssrLooseEqual(block.data.layout, "contained")) ? " selected" : ""}>Contained</option><option value="inline-medium" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(block.data.layout) ? ssrLooseContain(block.data.layout, "inline-medium") : ssrLooseEqual(block.data.layout, "inline-medium")) ? " selected" : ""}>Inline medium</option><option value="inline-small" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(block.data.layout) ? ssrLooseContain(block.data.layout, "inline-small") : ssrLooseEqual(block.data.layout, "inline-small")) ? " selected" : ""}>Inline small</option><option value="editorial-crop" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(block.data.layout) ? ssrLooseContain(block.data.layout, "editorial-crop") : ssrLooseEqual(block.data.layout, "editorial-crop")) ? " selected" : ""}>Editorial crop</option></select></label><label data-v-81a2cd4d> Alt text <input${ssrRenderAttr("value", block.data.alt)} type="text" data-v-81a2cd4d></label><label data-v-81a2cd4d> Caption <textarea rows="3" data-v-81a2cd4d>${ssrInterpolate(block.data.caption)}</textarea></label><div class="media-choice-row" data-v-81a2cd4d><button class="ghost-btn" type="button" data-v-81a2cd4d>Choose from Media Library</button><button class="ghost-btn" type="button" data-v-81a2cd4d>Upload from computer</button>`);
              if (block.data.imageUrl) {
                _push(`<button class="ghost-btn" type="button" data-v-81a2cd4d>Remove image</button>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div>`);
              if (block.data.imageUrl) {
                _push(`<div class="selected-asset-note" data-v-81a2cd4d><span data-v-81a2cd4d>Selected image</span><strong data-v-81a2cd4d>${ssrInterpolate(imageAssetLabel(block.data.imageUrl))}</strong></div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div></div>`);
            } else if (block.type === "code") {
              _push(`<!--[--><label data-v-81a2cd4d> Code title <input${ssrRenderAttr("value", block.data.title)} type="text" data-v-81a2cd4d></label><label data-v-81a2cd4d> Language <input${ssrRenderAttr("value", block.data.language)} type="text" placeholder="yaml" data-v-81a2cd4d></label><label class="check-row span-2" data-v-81a2cd4d><input${ssrIncludeBooleanAttr(Array.isArray(block.data.copyEnabled) ? ssrLooseContain(block.data.copyEnabled, null) : block.data.copyEnabled) ? " checked" : ""} type="checkbox" data-v-81a2cd4d> Copy enabled </label><label class="span-2" data-v-81a2cd4d> Code <textarea class="code-textarea" rows="9" data-v-81a2cd4d>${ssrInterpolate(block.data.code)}</textarea></label><!--]-->`);
            } else if (block.type === "callout") {
              _push(`<!--[--><label data-v-81a2cd4d> Variant <select data-v-81a2cd4d><option value="info" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "info") : ssrLooseEqual(block.data.variant, "info")) ? " selected" : ""}>Info / Blue</option><option value="warning" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "warning") : ssrLooseEqual(block.data.variant, "warning")) ? " selected" : ""}>Warning / Yellow</option><option value="friction" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "friction") : ssrLooseEqual(block.data.variant, "friction")) ? " selected" : ""}>Friction / Coral</option><option value="success" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "success") : ssrLooseEqual(block.data.variant, "success")) ? " selected" : ""}>Success / Green</option><option value="editorial" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "editorial") : ssrLooseEqual(block.data.variant, "editorial")) ? " selected" : ""}>Editorial / Lavender</option></select></label><label data-v-81a2cd4d> Icon <input${ssrRenderAttr("value", block.data.icon)} type="text" data-v-81a2cd4d></label><label data-v-81a2cd4d> Title <input${ssrRenderAttr("value", block.data.title)} type="text" data-v-81a2cd4d></label><label class="span-2" data-v-81a2cd4d> Body <textarea rows="4" data-v-81a2cd4d>${ssrInterpolate(block.data.body)}</textarea></label><!--]-->`);
            } else if (block.type === "table") {
              _push(`<!--[--><label class="span-2" data-v-81a2cd4d> Columns <input${ssrRenderAttr("value", block.data.columnsText)} type="text" placeholder="Signal, Observed state, Next action" data-v-81a2cd4d></label><label class="span-2" data-v-81a2cd4d> Rows <textarea rows="5" placeholder="Runtime | Draft | Document the path" data-v-81a2cd4d>${ssrInterpolate(block.data.rowsText)}</textarea></label><!--]-->`);
            } else if (block.type === "banner") {
              _push(`<!--[--><label data-v-81a2cd4d> Banner title <input${ssrRenderAttr("value", block.data.title)} type="text" data-v-81a2cd4d></label><label data-v-81a2cd4d> Accent <input${ssrRenderAttr("value", block.data.accent)} type="text" placeholder="coral" data-v-81a2cd4d></label><label class="span-2" data-v-81a2cd4d> Body <textarea rows="4" data-v-81a2cd4d>${ssrInterpolate(block.data.body)}</textarea></label><!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div></article>`);
          });
          _push(`<!--]--><div class="panel markdown-fallback" data-v-81a2cd4d><div class="panel-head" data-v-81a2cd4d><h2 data-v-81a2cd4d>Markdown fallback</h2><span class="status-badge" data-v-81a2cd4d>Legacy body</span></div><p class="muted" data-v-81a2cd4d>If no visible blocks are saved, the public page keeps rendering this markdown body.</p><textarea class="body-editor" data-v-81a2cd4d>${ssrInterpolate(unref(markdownBody))}</textarea></div></div></section><!--]-->`);
        } else if (unref(activeTab) === "metadata") {
          _push(`<!--[--><section class="panel" data-v-81a2cd4d><div class="panel-head" data-v-81a2cd4d><h2 data-v-81a2cd4d>Core metadata</h2><span class="status-badge" data-v-81a2cd4d>${ssrInterpolate(unref(contentType))}</span></div><div class="field-grid" data-v-81a2cd4d><label data-v-81a2cd4d> Title <input${ssrRenderAttr("value", unref(frontmatter).title)} type="text" data-v-81a2cd4d></label><label data-v-81a2cd4d> Slug <input${ssrRenderAttr("value", unref(slugInput))} type="text" data-v-81a2cd4d></label><label data-v-81a2cd4d> Status <select data-v-81a2cd4d><!--[-->`);
          ssrRenderList(unref(statusChoices), (status) => {
            _push(`<option${ssrRenderAttr("value", status)} data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).status) ? ssrLooseContain(unref(frontmatter).status, status) : ssrLooseEqual(unref(frontmatter).status, status)) ? " selected" : ""}>${ssrInterpolate(status)}</option>`);
          });
          _push(`<!--]--></select></label><label data-v-81a2cd4d> Lab `);
          if (unref(labChoices).length) {
            _push(`<select data-v-81a2cd4d><option value="" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).lab) ? ssrLooseContain(unref(frontmatter).lab, "") : ssrLooseEqual(unref(frontmatter).lab, "")) ? " selected" : ""}>Unassigned</option><!--[-->`);
            ssrRenderList(unref(labSelectChoices), (lab) => {
              _push(`<option${ssrRenderAttr("value", lab.value)} data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).lab) ? ssrLooseContain(unref(frontmatter).lab, lab.value) : ssrLooseEqual(unref(frontmatter).lab, lab.value)) ? " selected" : ""}>${ssrInterpolate(lab.label)}</option>`);
            });
            _push(`<!--]--></select>`);
          } else {
            _push(`<select disabled data-v-81a2cd4d><option data-v-81a2cd4d>No labs available yet.</option></select>`);
          }
          _push(`</label>`);
          if (unref(contentType) === "blog") {
            _push(`<label data-v-81a2cd4d> Excerpt <textarea rows="3" data-v-81a2cd4d>${ssrInterpolate(unref(frontmatter).excerpt)}</textarea></label>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(contentType) === "projects") {
            _push(`<label data-v-81a2cd4d> Summary <textarea rows="3" data-v-81a2cd4d>${ssrInterpolate(unref(frontmatter).summary)}</textarea></label>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<label data-v-81a2cd4d> Description <textarea rows="3" data-v-81a2cd4d>${ssrInterpolate(unref(frontmatter).description)}</textarea></label><label data-v-81a2cd4d> Tags <input${ssrRenderAttr("value", unref(tagsText))} type="text" placeholder="ai, systems, research" data-v-81a2cd4d></label>`);
          if (unref(contentType) === "blog") {
            _push(`<button class="ghost-btn mini-action span-2" type="button" data-v-81a2cd4d> Generate tags </button>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(contentType) === "projects") {
            _push(`<label data-v-81a2cd4d> Type <input${ssrRenderAttr("value", unref(frontmatter).type)} type="text" data-v-81a2cd4d></label>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(contentType) === "projects") {
            _push(`<label data-v-81a2cd4d> Stack <input${ssrRenderAttr("value", unref(stackText))} type="text" placeholder="Nuxt, Python" data-v-81a2cd4d></label>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></section>`);
          if (unref(contentType) === "blog") {
            _push(`<section class="panel danger-zone" data-v-81a2cd4d><div class="panel-head" data-v-81a2cd4d><div data-v-81a2cd4d><p class="eyebrow" data-v-81a2cd4d>Protected action</p><h2 data-v-81a2cd4d>Danger Zone</h2></div><span class="status-badge" data-v-81a2cd4d>Blog entry</span></div><p class="muted" data-v-81a2cd4d> Archive or permanently remove this blog entry. Use this only for drafts, tests, or content that should no longer appear in the archive. </p><div class="danger-summary" data-v-81a2cd4d><span data-v-81a2cd4d>Title</span><strong data-v-81a2cd4d>${ssrInterpolate(unref(frontmatter).title || "Untitled Blog Entry")}</strong><span data-v-81a2cd4d>Slug</span><strong data-v-81a2cd4d>${ssrInterpolate(unref(frontmatter).slug || "untitled")}</strong><span data-v-81a2cd4d>File</span><strong data-v-81a2cd4d>${ssrInterpolate(unref(filePath))}</strong></div><div class="danger-actions" data-v-81a2cd4d><button class="ghost-btn" type="button"${ssrIncludeBooleanAttr(unref(isSaving) || unref(frontmatter).status === "archived") ? " disabled" : ""} data-v-81a2cd4d>${ssrInterpolate(unref(frontmatter).status === "archived" ? "Entry archived" : "Archive entry")}</button></div><div class="delete-confirm" data-v-81a2cd4d><label data-v-81a2cd4d> Type DELETE BLOG ENTRY to permanently remove this file <input${ssrRenderAttr("value", unref(deleteConfirmation))} type="text" placeholder="DELETE BLOG ENTRY" data-v-81a2cd4d></label><button class="danger-btn" type="button"${ssrIncludeBooleanAttr(unref(isDeleting) || unref(deleteConfirmation) !== "DELETE BLOG ENTRY") ? " disabled" : ""} data-v-81a2cd4d>${ssrInterpolate(unref(isDeleting) ? "Deleting..." : "Delete entry")}</button></div></section>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(contentType) === "projects") {
            _push(`<section class="panel" data-v-81a2cd4d><div class="panel-head" data-v-81a2cd4d><h2 data-v-81a2cd4d>Documentation</h2><span class="status-badge" data-v-81a2cd4d>${ssrInterpolate(unref(attachedDocs).length ? `${unref(attachedDocs).length} docs` : "Empty")}</span></div>`);
            if (!unref(hasAttachedDocs)) {
              _push(`<div class="empty-doc-state" data-v-81a2cd4d><strong data-v-81a2cd4d>No documentation attached yet.</strong><p data-v-81a2cd4d>This project can stay as a standalone dossier, or you can connect existing docs / create the first docs page.</p></div>`);
            } else {
              _push(`<div class="attached-docs" data-v-81a2cd4d><!--[-->`);
              ssrRenderList(unref(attachedDocs), (doc) => {
                _push(`<article class="attached-doc-card" data-v-81a2cd4d><div data-v-81a2cd4d><strong data-v-81a2cd4d>${ssrInterpolate(doc.title)}</strong><small data-v-81a2cd4d>${ssrInterpolate(secondaryDocText(doc))}</small></div>`);
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
            _push(`<div class="doc-actions" data-v-81a2cd4d><button class="ghost-btn" type="button" data-v-81a2cd4d>Add existing documentation</button>`);
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
              _push(`<div class="attach-docs-panel" data-v-81a2cd4d><div data-v-81a2cd4d><h3 data-v-81a2cd4d>Attach existing documentation</h3><p data-v-81a2cd4d>Select one or more available documentation pages to attach to this project.</p></div><div class="doc-picker" data-v-81a2cd4d><p class="doc-section-title" data-v-81a2cd4d>Documentation pages</p>`);
              if (!unref(attachableDocs).length) {
                _push(`<p class="muted" data-v-81a2cd4d>No available documentation found.</p>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<!--[-->`);
              ssrRenderList(unref(attachableDocs), (doc) => {
                _push(`<label class="doc-choice" data-v-81a2cd4d><input${ssrIncludeBooleanAttr(Array.isArray(unref(selectedAttachmentDocs)) ? ssrLooseContain(unref(selectedAttachmentDocs), doc.publicPath) : unref(selectedAttachmentDocs)) ? " checked" : ""} type="checkbox"${ssrRenderAttr("value", doc.publicPath)} data-v-81a2cd4d><span data-v-81a2cd4d><strong data-v-81a2cd4d>${ssrInterpolate(doc.title)}</strong><small data-v-81a2cd4d>${ssrInterpolate(secondaryDocText(doc))}</small><small data-v-81a2cd4d>Status: ${ssrInterpolate(docAvailabilityLabel(doc))}</small></span></label>`);
              });
              _push(`<!--]--></div><div class="doc-actions" data-v-81a2cd4d><button class="studio-btn" type="button"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} data-v-81a2cd4d>Save attachment</button><button class="ghost-btn" type="button" data-v-81a2cd4d>Cancel</button></div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</section>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else if (unref(activeTab) === "seo") {
          _push(`<section class="panel" data-v-81a2cd4d><div class="panel-head" data-v-81a2cd4d><h2 data-v-81a2cd4d>SEO settings</h2><span class="status-badge" data-v-81a2cd4d>Snippet</span></div><div class="field-grid" data-v-81a2cd4d><label data-v-81a2cd4d> SEO title <input${ssrRenderAttr("value", unref(frontmatter).seoTitle)} type="text" data-v-81a2cd4d></label><label data-v-81a2cd4d> OG title <input${ssrRenderAttr("value", unref(frontmatter).ogTitle)} type="text" data-v-81a2cd4d></label><label class="span-2" data-v-81a2cd4d> SEO description <textarea rows="4" data-v-81a2cd4d>${ssrInterpolate(unref(frontmatter).seoDescription)}</textarea></label><label class="span-2" data-v-81a2cd4d> OG description <textarea rows="4" data-v-81a2cd4d>${ssrInterpolate(unref(frontmatter).ogDescription)}</textarea></label><label data-v-81a2cd4d> OG image <input${ssrRenderAttr("value", unref(frontmatter).ogImage)} type="text" data-v-81a2cd4d></label><label data-v-81a2cd4d> Canonical <input${ssrRenderAttr("value", unref(frontmatter).canonical)} type="text" data-v-81a2cd4d></label><label class="check-row" data-v-81a2cd4d><input${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).noindex) ? ssrLooseContain(unref(frontmatter).noindex, null) : unref(frontmatter).noindex) ? " checked" : ""} type="checkbox" data-v-81a2cd4d> Noindex </label></div></section>`);
        } else if (unref(activeTab) === "media") {
          _push(`<section class="panel" data-v-81a2cd4d><div class="panel-head" data-v-81a2cd4d><h2 data-v-81a2cd4d>Media attached</h2><span class="status-badge" data-v-81a2cd4d>${ssrInterpolate(unref(usedMediaAssets).length)} assets</span></div><div class="media-tab-grid" data-v-81a2cd4d><!--[-->`);
          ssrRenderList(unref(usedMediaAssets), (asset) => {
            _push(`<article class="media-card" data-v-81a2cd4d><img${ssrRenderAttr("src", asset.url)}${ssrRenderAttr("alt", asset.title)} data-v-81a2cd4d><strong data-v-81a2cd4d>${ssrInterpolate(asset.title)}</strong><span data-v-81a2cd4d>${ssrInterpolate(asset.filename)}</span></article>`);
          });
          _push(`<!--]--></div><div class="asset-list" data-v-81a2cd4d><!--[-->`);
          ssrRenderList(unref(mediaAssets), (asset) => {
            _push(`<button class="asset-button" type="button" data-v-81a2cd4d><img${ssrRenderAttr("src", asset.url)}${ssrRenderAttr("alt", asset.title)} data-v-81a2cd4d><span data-v-81a2cd4d>${ssrInterpolate(asset.title)}</span></button>`);
          });
          _push(`<!--]--></div></section>`);
        } else if (unref(activeTab) === "preview") {
          _push(`<section class="panel" data-v-81a2cd4d><div class="panel-head" data-v-81a2cd4d><h2 data-v-81a2cd4d>Frontend preview</h2>`);
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
          _push(`</div><div class="preview-surface" data-v-81a2cd4d>`);
          if (unref(visibleBlocks).length) {
            _push(ssrRenderComponent(_component_ContentBlockRenderer, {
              blocks: unref(visibleBlocks),
              context: unref(contentType) === "projects" ? "project" : unref(contentType) === "docs" ? "docs" : "blog"
            }, null, _parent));
          } else {
            _push(`<div class="content-prose" data-v-81a2cd4d><p class="muted" data-v-81a2cd4d>No visible blocks yet. Public rendering will use the markdown body fallback.</p><pre data-v-81a2cd4d>${ssrInterpolate(unref(markdownBody))}</pre></div>`);
          }
          _push(`</div></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><aside class="${ssrRenderClass([{ "blog-inspector-flow": unref(isBlogComposer) }, "composer-inspector"])}" data-v-81a2cd4d>`);
        if (!unref(isBlogComposer)) {
          _push(`<div class="inspector-card" data-v-81a2cd4d><h3 data-v-81a2cd4d>Block inspector</h3>`);
          if (unref(selectedBlock)) {
            _push(`<!--[--><p data-v-81a2cd4d>${ssrInterpolate(blockUiTitle(unref(selectedBlock)))} - ${ssrInterpolate(unref(selectedBlock).type)} - ${ssrInterpolate(unref(selectedBlock).visible ? "Visible" : "Hidden")}</p><label data-v-81a2cd4d> Selected block title <input${ssrRenderAttr("value", unref(selectedBlock).title)} type="text" data-v-81a2cd4d></label><!--]-->`);
          } else {
            _push(`<p data-v-81a2cd4d>Select a block to edit its properties, visibility and output mapping.</p>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(isBlogComposer)) {
          _push(`<div class="inspector-card" data-v-81a2cd4d><h3 data-v-81a2cd4d>Frontend preview</h3><div class="preview-card" data-v-81a2cd4d><div class="preview-header" data-v-81a2cd4d><span class="dot" data-v-81a2cd4d></span><span class="dot" data-v-81a2cd4d></span><span class="dot" data-v-81a2cd4d></span></div><div class="frontend-preview" data-v-81a2cd4d>`);
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
            _push(`<!--[--><div class="${ssrRenderClass([`style-${unref(frontmatter).coverStyle || "editorial-gradient"}`, "front-hero"])}" style="${ssrRenderStyle(coverPreviewStyle())}" data-v-81a2cd4d><span class="status-badge" data-v-81a2cd4d>${ssrInterpolate(unref(frontmatter).status || "Draft")}</span><h3 data-v-81a2cd4d>${ssrInterpolate(unref(frontmatter).title || "Untitled content")}</h3><p data-v-81a2cd4d>${ssrInterpolate(unref(frontmatter).description || unref(frontmatter).excerpt || unref(frontmatter).summary || "Editorial preview surface.")}</p></div><!--[-->`);
            ssrRenderList(unref(visibleBlocks).slice(0, 2), (block) => {
              _push(`<div class="front-section" data-v-81a2cd4d><strong data-v-81a2cd4d>${ssrInterpolate(blockUiTitle(block))}</strong><p data-v-81a2cd4d>${ssrInterpolate(block.type)} block rendered publicly.</p></div>`);
            });
            _push(`<!--]--><!--]-->`);
          }
          _push(`</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="inspector-card" data-v-81a2cd4d><h3 data-v-81a2cd4d>Page outline</h3><div class="outline-list" data-v-81a2cd4d><button class="outline-item" type="button" data-v-81a2cd4d><strong data-v-81a2cd4d>Cover</strong><span data-v-81a2cd4d>Hero</span></button><!--[-->`);
        ssrRenderList(unref(editableBlocks), (block) => {
          _push(`<button class="${ssrRenderClass([{ active: unref(selectedBlockId) === block.id }, "outline-item"])}" type="button" data-v-81a2cd4d><strong data-v-81a2cd4d>${ssrInterpolate(blockUiTitle(block))}</strong><span data-v-81a2cd4d>${ssrInterpolate(block.type)}</span></button>`);
        });
        _push(`<!--]--></div></div><div class="inspector-card" data-v-81a2cd4d><h3 data-v-81a2cd4d>Media uploaded</h3><div class="media-mini-grid" data-v-81a2cd4d><!--[-->`);
        ssrRenderList(unref(usedMediaAssets).slice(0, 6), (asset) => {
          _push(`<img class="media-mini"${ssrRenderAttr("src", asset.url)}${ssrRenderAttr("alt", asset.title)} data-v-81a2cd4d>`);
        });
        _push(`<!--]--></div><p data-v-81a2cd4d>${ssrInterpolate(unref(usedMediaAssets).length ? "Images are referenced by cover or content blocks." : "No media references yet.")}</p></div><div class="inspector-card" data-v-81a2cd4d><h3 data-v-81a2cd4d>Output mapping</h3><div class="component-note" data-v-81a2cd4d> Saves frontmatter, <code data-v-81a2cd4d>blocks</code>, cover fields and markdown fallback to <code data-v-81a2cd4d>content/${ssrInterpolate(unref(filePath))}</code>. </div></div></aside></section>`);
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
        _push(`<section class="editor-grid" data-v-81a2cd4d><div class="editor-main" data-v-81a2cd4d>`);
        _push(ssrRenderComponent(_component_AdminPanel, {
          title: "Core metadata",
          eyebrow: "Frontmatter"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="field-grid" data-v-81a2cd4d${_scopeId}><label data-v-81a2cd4d${_scopeId}> Title <input${ssrRenderAttr("value", unref(frontmatter).title)} type="text" data-v-81a2cd4d${_scopeId}></label><label data-v-81a2cd4d${_scopeId}> Slug <input${ssrRenderAttr("value", unref(slugInput))} type="text" data-v-81a2cd4d${_scopeId}></label><label data-v-81a2cd4d${_scopeId}> Status <select data-v-81a2cd4d${_scopeId}><!--[-->`);
              ssrRenderList(unref(statusChoices), (status) => {
                _push2(`<option${ssrRenderAttr("value", status)} data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).status) ? ssrLooseContain(unref(frontmatter).status, status) : ssrLooseEqual(unref(frontmatter).status, status)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(status)}</option>`);
              });
              _push2(`<!--]--></select></label><label data-v-81a2cd4d${_scopeId}> Lab `);
              if (unref(labChoices).length) {
                _push2(`<select data-v-81a2cd4d${_scopeId}><option value="" data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).lab) ? ssrLooseContain(unref(frontmatter).lab, "") : ssrLooseEqual(unref(frontmatter).lab, "")) ? " selected" : ""}${_scopeId}>Unassigned</option><!--[-->`);
                ssrRenderList(unref(labSelectChoices), (lab) => {
                  _push2(`<option${ssrRenderAttr("value", lab.value)} data-v-81a2cd4d${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).lab) ? ssrLooseContain(unref(frontmatter).lab, lab.value) : ssrLooseEqual(unref(frontmatter).lab, lab.value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(lab.label)}</option>`);
                });
                _push2(`<!--]--></select>`);
              } else {
                _push2(`<select disabled data-v-81a2cd4d${_scopeId}><option data-v-81a2cd4d${_scopeId}>No labs available yet.</option></select>`);
              }
              _push2(`</label>`);
              if (unref(contentType) === "blog") {
                _push2(`<label data-v-81a2cd4d${_scopeId}> Excerpt <textarea rows="3" data-v-81a2cd4d${_scopeId}>${ssrInterpolate(unref(frontmatter).excerpt)}</textarea></label>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(contentType) === "projects") {
                _push2(`<label data-v-81a2cd4d${_scopeId}> Summary <textarea rows="3" data-v-81a2cd4d${_scopeId}>${ssrInterpolate(unref(frontmatter).summary)}</textarea></label>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<label data-v-81a2cd4d${_scopeId}> Description <textarea rows="3" data-v-81a2cd4d${_scopeId}>${ssrInterpolate(unref(frontmatter).description)}</textarea></label><label data-v-81a2cd4d${_scopeId}> Tags <input${ssrRenderAttr("value", unref(tagsText))} type="text" placeholder="ai, systems, research" data-v-81a2cd4d${_scopeId}></label></div>`);
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
                      "onUpdate:modelValue": ($event) => isRef(slugInput) ? slugInput.value = $event : null,
                      type: "text"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(slugInput)]
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
                _push2(`<div class="field-grid" data-v-81a2cd4d${_scopeId}><label data-v-81a2cd4d${_scopeId}> Type <input${ssrRenderAttr("value", unref(frontmatter).type)} type="text" data-v-81a2cd4d${_scopeId}></label><label data-v-81a2cd4d${_scopeId}> Year <input${ssrRenderAttr("value", unref(frontmatter).year)} type="number" data-v-81a2cd4d${_scopeId}></label><label data-v-81a2cd4d${_scopeId}> Stack <input${ssrRenderAttr("value", unref(stackText))} type="text" placeholder="Nuxt, Python" data-v-81a2cd4d${_scopeId}></label></div>`);
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
                  _push2(`<div class="empty-doc-state" data-v-81a2cd4d${_scopeId}><strong data-v-81a2cd4d${_scopeId}>No documentation attached yet.</strong><p data-v-81a2cd4d${_scopeId}>This project can stay as a standalone dossier, or you can connect existing docs / create the first docs page.</p></div>`);
                } else {
                  _push2(`<div class="attached-docs" data-v-81a2cd4d${_scopeId}><div class="attached-section" data-v-81a2cd4d${_scopeId}><p class="doc-section-title" data-v-81a2cd4d${_scopeId}>Attached documentation</p><article class="attached-doc-card" data-v-81a2cd4d${_scopeId}><div data-v-81a2cd4d${_scopeId}><strong data-v-81a2cd4d${_scopeId}>${ssrInterpolate(unref(attachedDocs)[0]?.title || unref(frontmatter).docsPath)}</strong><small data-v-81a2cd4d${_scopeId}>${ssrInterpolate(unref(frontmatter).docsPath)} · folder: ${ssrInterpolate(unref(docsFolder))}</small></div>`);
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
                  _push2(`</article></div><div class="attached-section" data-v-81a2cd4d${_scopeId}><p class="doc-section-title" data-v-81a2cd4d${_scopeId}>Attached pages</p>`);
                  if (!unref(attachedDocs).length) {
                    _push2(`<p class="muted" data-v-81a2cd4d${_scopeId}>No documentation pages selected.</p>`);
                  } else {
                    _push2(`<!--[-->`);
                    ssrRenderList(unref(attachedDocs), (doc) => {
                      _push2(`<article class="attached-doc-card" data-v-81a2cd4d${_scopeId}><div data-v-81a2cd4d${_scopeId}><strong data-v-81a2cd4d${_scopeId}>${ssrInterpolate(doc.title)}</strong><small data-v-81a2cd4d${_scopeId}>${ssrInterpolate(secondaryDocText(doc))}</small></div>`);
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
                _push2(`<div class="doc-actions" data-v-81a2cd4d${_scopeId}>`);
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
                _push2(`<button class="ghost-btn" type="button" data-v-81a2cd4d${_scopeId}>Add existing documentation</button>`);
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
                  _push2(`<div class="attach-docs-panel" data-v-81a2cd4d${_scopeId}><div data-v-81a2cd4d${_scopeId}><h3 data-v-81a2cd4d${_scopeId}>Attach existing documentation</h3><p data-v-81a2cd4d${_scopeId}>Select one or more available documentation pages to attach to this project.</p></div><div class="doc-picker" data-v-81a2cd4d${_scopeId}><p class="doc-section-title" data-v-81a2cd4d${_scopeId}>Documentation pages</p>`);
                  if (!unref(attachableDocs).length) {
                    _push2(`<p class="muted" data-v-81a2cd4d${_scopeId}>No available documentation found.</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<!--[-->`);
                  ssrRenderList(unref(attachableDocs), (doc) => {
                    _push2(`<label class="doc-choice" data-v-81a2cd4d${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(selectedAttachmentDocs)) ? ssrLooseContain(unref(selectedAttachmentDocs), doc.publicPath) : unref(selectedAttachmentDocs)) ? " checked" : ""} type="checkbox"${ssrRenderAttr("value", doc.publicPath)} data-v-81a2cd4d${_scopeId}><span data-v-81a2cd4d${_scopeId}><strong data-v-81a2cd4d${_scopeId}>${ssrInterpolate(doc.title)}</strong><small data-v-81a2cd4d${_scopeId}>${ssrInterpolate(secondaryDocText(doc))}</small><small data-v-81a2cd4d${_scopeId}>Status: ${ssrInterpolate(docAvailabilityLabel(doc))}</small></span></label>`);
                  });
                  _push2(`<!--]--></div>`);
                  if (unref(attachedElsewhereDocs).length) {
                    _push2(`<details class="advanced-doc-fields" data-v-81a2cd4d${_scopeId}><summary data-v-81a2cd4d${_scopeId}>Already attached to another project</summary><!--[-->`);
                    ssrRenderList(unref(attachedElsewhereDocs), (doc) => {
                      _push2(`<article class="doc-choice disabled-doc" data-v-81a2cd4d${_scopeId}><span data-v-81a2cd4d${_scopeId}><strong data-v-81a2cd4d${_scopeId}>${ssrInterpolate(doc.title)}</strong><small data-v-81a2cd4d${_scopeId}>${ssrInterpolate(secondaryDocText(doc))}</small><small data-v-81a2cd4d${_scopeId}>Status: ${ssrInterpolate(docAvailabilityLabel(doc))}</small></span></article>`);
                    });
                    _push2(`<!--]--></details>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="doc-actions" data-v-81a2cd4d${_scopeId}><button class="studio-btn" type="button"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} data-v-81a2cd4d${_scopeId}>Save attachment</button><button class="ghost-btn" type="button" data-v-81a2cd4d${_scopeId}>Cancel</button></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<details class="advanced-doc-fields" data-v-81a2cd4d${_scopeId}><summary data-v-81a2cd4d${_scopeId}>Advanced documentation fields</summary><div class="field-grid" data-v-81a2cd4d${_scopeId}><label id="project-docs-path" data-v-81a2cd4d${_scopeId}> Docs path <input${ssrRenderAttr("value", unref(frontmatter).docsPath)} type="text" placeholder="/docs/tennis-ai-friction" data-v-81a2cd4d${_scopeId}></label><label data-v-81a2cd4d${_scopeId}> Docs folder <input${ssrRenderAttr("value", unref(frontmatter).docsFolder)} type="text" placeholder="tennis-ai-friction" data-v-81a2cd4d${_scopeId}></label><label data-v-81a2cd4d${_scopeId}> Related docs raw <input${ssrRenderAttr("value", unref(frontmatter).relatedDocs)} type="text" placeholder="/docs/tennis-ai-friction/setup" data-v-81a2cd4d${_scopeId}></label></div></details>`);
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
                _push2(`<div class="field-grid" data-v-81a2cd4d${_scopeId}><label data-v-81a2cd4d${_scopeId}> Project <input${ssrRenderAttr("value", unref(frontmatter).project)} type="text" data-v-81a2cd4d${_scopeId}></label><label data-v-81a2cd4d${_scopeId}> Project slug <input${ssrRenderAttr("value", unref(frontmatter).projectSlug)} type="text" data-v-81a2cd4d${_scopeId}></label><label data-v-81a2cd4d${_scopeId}> Docs folder <input${ssrRenderAttr("value", unref(frontmatter).docsFolder)} type="text" data-v-81a2cd4d${_scopeId}></label><label data-v-81a2cd4d${_scopeId}> Section <input${ssrRenderAttr("value", unref(frontmatter).section)} type="text" data-v-81a2cd4d${_scopeId}></label><label data-v-81a2cd4d${_scopeId}> Order <input${ssrRenderAttr("value", unref(frontmatter).order)} type="number" data-v-81a2cd4d${_scopeId}></label></div>`);
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
                _push2(`<div class="field-grid" data-v-81a2cd4d${_scopeId}><label data-v-81a2cd4d${_scopeId}> Short title <input${ssrRenderAttr("value", unref(frontmatter).shortTitle)} type="text" data-v-81a2cd4d${_scopeId}></label><label data-v-81a2cd4d${_scopeId}> Accent <input${ssrRenderAttr("value", unref(frontmatter).accent)} type="text" data-v-81a2cd4d${_scopeId}></label><label data-v-81a2cd4d${_scopeId}> Order <input${ssrRenderAttr("value", unref(frontmatter).order)} type="number" data-v-81a2cd4d${_scopeId}></label><label data-v-81a2cd4d${_scopeId}> Related tags <input${ssrRenderAttr("value", unref(relatedTagsText))} type="text" data-v-81a2cd4d${_scopeId}></label><label data-v-81a2cd4d${_scopeId}> Roadmap <textarea rows="4" data-v-81a2cd4d${_scopeId}>${ssrInterpolate(unref(roadmapText))}</textarea></label><label data-v-81a2cd4d${_scopeId}> Open questions <textarea rows="4" data-v-81a2cd4d${_scopeId}>${ssrInterpolate(unref(openQuestionsText))}</textarea></label></div>`);
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
              _push2(`<textarea class="body-editor" data-v-81a2cd4d${_scopeId}>${ssrInterpolate(unref(markdownBody))}</textarea>`);
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
        _push(`</div><aside class="editor-side" data-v-81a2cd4d>`);
        _push(ssrRenderComponent(_component_AdminPanel, {
          title: "Save",
          eyebrow: "Stage 4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="actions" data-v-81a2cd4d${_scopeId}><button class="studio-btn" type="button"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} data-v-81a2cd4d${_scopeId}>${ssrInterpolate(unref(isSaving) ? "Saving..." : "Save changes")}</button><button class="ghost-btn" type="button" data-v-81a2cd4d${_scopeId}>Archive</button></div>`);
              if (unref(statusMessage)) {
                _push2(`<p class="status-copy" data-v-81a2cd4d${_scopeId}>${ssrInterpolate(unref(statusMessage))}</p>`);
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
              _push2(`<div class="field-stack" data-v-81a2cd4d${_scopeId}><label data-v-81a2cd4d${_scopeId}> SEO title <input${ssrRenderAttr("value", unref(frontmatter).seoTitle)} type="text" data-v-81a2cd4d${_scopeId}></label><label data-v-81a2cd4d${_scopeId}> SEO description <textarea rows="4" data-v-81a2cd4d${_scopeId}>${ssrInterpolate(unref(frontmatter).seoDescription)}</textarea></label><label data-v-81a2cd4d${_scopeId}> OG title <input${ssrRenderAttr("value", unref(frontmatter).ogTitle)} type="text" data-v-81a2cd4d${_scopeId}></label><label data-v-81a2cd4d${_scopeId}> OG description <textarea rows="4" data-v-81a2cd4d${_scopeId}>${ssrInterpolate(unref(frontmatter).ogDescription)}</textarea></label><label data-v-81a2cd4d${_scopeId}> OG image <input${ssrRenderAttr("value", unref(frontmatter).ogImage)} type="text" data-v-81a2cd4d${_scopeId}></label><label data-v-81a2cd4d${_scopeId}> Canonical <input${ssrRenderAttr("value", unref(frontmatter).canonical)} type="text" data-v-81a2cd4d${_scopeId}></label><label class="check-row" data-v-81a2cd4d${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).noindex) ? ssrLooseContain(unref(frontmatter).noindex, null) : unref(frontmatter).noindex) ? " checked" : ""} type="checkbox" data-v-81a2cd4d${_scopeId}> Noindex </label></div>`);
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
              _push2(`<p class="muted" data-v-81a2cd4d${_scopeId}>Open a file from Blog, Projects, Docs, or Labs to edit it.</p><button class="ghost-btn" type="button" data-v-81a2cd4d${_scopeId}>Back to Studio</button>`);
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
        _push(`<div class="media-picker-backdrop" data-v-81a2cd4d><section class="media-picker-panel" data-v-81a2cd4d><div class="panel-head" data-v-81a2cd4d><div data-v-81a2cd4d><p class="eyebrow" data-v-81a2cd4d>Media Library</p><h2 data-v-81a2cd4d>${ssrInterpolate(unref(mediaPickerMode) === "cover" ? "Choose cover image" : "Choose block image")}</h2></div><div class="media-picker-actions" data-v-81a2cd4d><button class="ghost-btn" type="button" data-v-81a2cd4d>Upload image</button><button class="ghost-btn" type="button"${ssrIncludeBooleanAttr(unref(mediaPending)) ? " disabled" : ""} data-v-81a2cd4d>Refresh</button><button class="ghost-btn" type="button" data-v-81a2cd4d>Close</button></div></div>`);
        if (unref(uploadMessage)) {
          _push(`<p class="upload-message" data-v-81a2cd4d>${ssrInterpolate(unref(uploadMessage))}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(mediaError)) {
          _push(`<p class="muted" data-v-81a2cd4d>${ssrInterpolate(unref(mediaError))}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(mediaPending)) {
          _push(`<p class="muted" data-v-81a2cd4d>Reading media library...</p>`);
        } else if (unref(mediaAssets).length) {
          _push(`<div class="media-picker-grid" data-v-81a2cd4d><!--[-->`);
          ssrRenderList(unref(mediaAssets), (asset) => {
            _push(`<button class="media-picker-item" type="button" data-v-81a2cd4d><img${ssrRenderAttr("src", asset.url)}${ssrRenderAttr("alt", asset.title)} data-v-81a2cd4d><strong data-v-81a2cd4d>${ssrInterpolate(asset.title)}</strong><span data-v-81a2cd4d>${ssrInterpolate(asset.filename)}</span></button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="empty-canvas" data-v-81a2cd4d><strong data-v-81a2cd4d>No media available yet.</strong><p data-v-81a2cd4d>Upload a JPG, PNG or WebP image to start using real Media Library assets.</p><button class="studio-btn" type="button" data-v-81a2cd4d>Upload image</button></div>`);
        }
        _push(`</section></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(statusMessage)) {
        _push(`<div class="composer-toast"${ssrRenderAttr("data-state", unref(saveState))} data-v-81a2cd4d>${ssrInterpolate(unref(statusMessage))}</div>`);
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
const edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-81a2cd4d"]]);

export { edit as default };
//# sourceMappingURL=edit-BNZADx8b.mjs.map
