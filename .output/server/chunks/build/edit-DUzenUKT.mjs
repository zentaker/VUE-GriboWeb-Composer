import { _ as __nuxt_component_1 } from './ArticleHero-Dixb1bez.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, withDirectives, vModelText, isRef, openBlock, createBlock, Fragment, renderList, vModelSelect, createCommentVNode, vModelCheckbox, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc, d as useRoute, u as useRouter } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BzjT64JD.mjs';
import { _ as __nuxt_component_2 } from './ContentBlockRenderer-DijUswS0.mjs';
import { _ as __nuxt_component_0$2 } from './AdminHero-lJqa4kRI.mjs';
import { _ as __nuxt_component_2$1 } from './AdminPanel-CPS4BSK_.mjs';
import { u as useAdminContent } from './useAdminContent-EIopHvuo.mjs';
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
    const { listContent, readContent, saveContent, archiveContent, deleteProjectContent } = useAdminContent();
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
    const isRichComposer = computed(() => ["blog", "docs"].includes(contentType));
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
    async function deleteProjectEntry() {
      if (contentType !== "projects") return;
      isDeleting.value = true;
      statusMessage.value = "";
      try {
        const response = await deleteProjectContent(filePath.value, deleteConfirmation.value);
        statusMessage.value = `Project moved to ${response.item.trashPath}.`;
        await router.push("/admin/projects");
      } catch (error) {
        statusMessage.value = error?.data?.statusMessage || error?.message || "Delete failed.";
      } finally {
        isDeleting.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlogComposerPreview = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_ContentBlockRenderer = __nuxt_component_2;
      const _component_AdminHero = __nuxt_component_0$2;
      const _component_AdminPanel = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-bdf46aea><input class="visually-hidden-file" type="file" accept="image/jpeg,image/png,image/webp" data-v-bdf46aea><input class="visually-hidden-file" type="file" accept="image/jpeg,image/png,image/webp" data-v-bdf46aea>`);
      if (unref(filePath) && unref(isRichComposer)) {
        _push(`<section class="composer-grid" data-v-bdf46aea><div class="composer-main" data-v-bdf46aea><section class="composer-hero" data-v-bdf46aea><p class="eyebrow" data-v-bdf46aea><span class="pulse" data-v-bdf46aea></span>${ssrInterpolate(unref(contentLabel))} - CMS block composer</p><h1 data-v-bdf46aea>${ssrInterpolate(unref(composerHeroTitle))}</h1><p class="subtitle" data-v-bdf46aea>${ssrInterpolate(unref(composerHeroDescription))}</p>`);
        if (unref(statusMessage)) {
          _push(`<p class="status-copy"${ssrRenderAttr("data-state", unref(saveState))} data-v-bdf46aea>${ssrInterpolate(unref(statusMessage))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section><nav class="composer-tabs" aria-label="Composer tabs" data-v-bdf46aea><!--[-->`);
        ssrRenderList(blockTabs, (tab) => {
          _push(`<button type="button" class="${ssrRenderClass({ active: unref(activeTab) === tab.id })}" data-v-bdf46aea>${ssrInterpolate(tab.label)}</button>`);
        });
        _push(`<!--]--></nav>`);
        if (unref(activeTab) === "content") {
          _push(`<!--[--><section class="setup-grid" data-v-bdf46aea><div class="panel" data-v-bdf46aea><div class="panel-head" data-v-bdf46aea><h2 data-v-bdf46aea>${ssrInterpolate(unref(contentType) === "projects" ? "Project basics" : unref(contentType) === "blog" ? "Entry basics" : "Docs basics")}</h2><span class="status-badge" data-v-bdf46aea>${ssrInterpolate(unref(frontmatter).status || "Draft")}</span></div><div class="field-grid compact" data-v-bdf46aea><label data-v-bdf46aea> Title <input${ssrRenderAttr("value", unref(frontmatter).title)} type="text" data-v-bdf46aea></label><label data-v-bdf46aea> Slug <span class="slug-row" data-v-bdf46aea><input${ssrRenderAttr("value", unref(slugInput))} type="text" data-v-bdf46aea><button class="ghost-btn mini-action" type="button" data-v-bdf46aea>Generate</button></span></label><label class="span-2" data-v-bdf46aea>${ssrInterpolate(unref(contentType) === "projects" ? "Short description" : "Description")} `);
          if (unref(contentType) === "projects") {
            _push(`<textarea rows="3" data-v-bdf46aea>${ssrInterpolate(unref(frontmatter).summary)}</textarea>`);
          } else {
            _push(`<textarea rows="3" data-v-bdf46aea>${ssrInterpolate(unref(frontmatter).description)}</textarea>`);
          }
          _push(`</label></div></div><div class="panel" data-v-bdf46aea><div class="panel-head" data-v-bdf46aea><h2 data-v-bdf46aea>Taxonomy</h2><span class="status-badge friction" data-v-bdf46aea>${ssrInterpolate(unref(labDisplayName))}</span></div><div class="field-grid compact" data-v-bdf46aea><label data-v-bdf46aea> Status <select data-v-bdf46aea><!--[-->`);
          ssrRenderList(unref(statusChoices), (status) => {
            _push(`<option${ssrRenderAttr("value", status)} data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).status) ? ssrLooseContain(unref(frontmatter).status, status) : ssrLooseEqual(unref(frontmatter).status, status)) ? " selected" : ""}>${ssrInterpolate(status)}</option>`);
          });
          _push(`<!--]--></select></label><label data-v-bdf46aea> Track / Lab `);
          if (unref(labChoices).length) {
            _push(`<select data-v-bdf46aea><option value="" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).lab) ? ssrLooseContain(unref(frontmatter).lab, "") : ssrLooseEqual(unref(frontmatter).lab, "")) ? " selected" : ""}>Unassigned</option><!--[-->`);
            ssrRenderList(unref(labSelectChoices), (lab) => {
              _push(`<option${ssrRenderAttr("value", lab.value)} data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).lab) ? ssrLooseContain(unref(frontmatter).lab, lab.value) : ssrLooseEqual(unref(frontmatter).lab, lab.value)) ? " selected" : ""}>${ssrInterpolate(lab.label)}</option>`);
            });
            _push(`<!--]--></select>`);
          } else {
            _push(`<select disabled data-v-bdf46aea><option data-v-bdf46aea>No labs available yet.</option></select>`);
          }
          _push(`</label>`);
          if (unref(contentType) === "projects") {
            _push(`<label data-v-bdf46aea> Year <input${ssrRenderAttr("value", unref(frontmatter).year)} type="number" data-v-bdf46aea></label>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(contentType) === "projects") {
            _push(`<label data-v-bdf46aea> Stack <input${ssrRenderAttr("value", unref(stackText))} type="text" placeholder="Nuxt, Python" data-v-bdf46aea></label>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<label class="span-2" data-v-bdf46aea> Tags <input${ssrRenderAttr("value", unref(tagsText))} type="text" placeholder="ai, systems, research" data-v-bdf46aea></label>`);
          if (unref(contentType) === "blog") {
            _push(`<button class="ghost-btn mini-action span-2" type="button" data-v-bdf46aea> Generate tags </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></section><section class="builder-layout" data-v-bdf46aea><aside class="block-library" data-v-bdf46aea><!--[-->`);
          ssrRenderList(implementedBlockTypes, (type) => {
            _push(`<button class="block-button" type="button" data-v-bdf46aea><span class="block-icon" data-v-bdf46aea>${ssrInterpolate(defaultBlockTitle(type).charAt(0))}</span><span data-v-bdf46aea><strong data-v-bdf46aea>${ssrInterpolate(defaultBlockTitle(type))}</strong><small data-v-bdf46aea>${ssrInterpolate(blockDescription(type))}</small></span></button>`);
          });
          _push(`<!--]--><!--[-->`);
          ssrRenderList(laterBlockTypes, (type) => {
            _push(`<button class="block-button disabled" type="button" disabled data-v-bdf46aea><span class="block-icon" data-v-bdf46aea>${ssrInterpolate(defaultBlockTitle(type).charAt(0))}</span><span data-v-bdf46aea><strong data-v-bdf46aea>${ssrInterpolate(defaultBlockTitle(type))}</strong><small data-v-bdf46aea>Later</small></span></button>`);
          });
          _push(`<!--]--></aside><div class="canvas" data-v-bdf46aea><div class="${ssrRenderClass([{ "blog-hero-options": unref(isBlogComposer) }, "project-form-top"])}" data-v-bdf46aea>`);
          if (!unref(isBlogComposer)) {
            _push(`<div class="${ssrRenderClass([{ filled: unref(frontmatter).coverImage }, "cover-upload"])}" role="button" tabindex="0" data-v-bdf46aea>`);
            if (unref(frontmatter).coverImage) {
              _push(`<img${ssrRenderAttr("src", unref(frontmatter).coverImage)}${ssrRenderAttr("alt", unref(frontmatter).coverAlt || "")} data-v-bdf46aea>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="upload-inner" data-v-bdf46aea><div class="upload-icon" data-v-bdf46aea>+</div><strong data-v-bdf46aea>${ssrInterpolate(unref(frontmatter).coverImage ? "Cover selected" : "Choose cover image")}</strong><p data-v-bdf46aea>Choose from Media Library, upload from computer, or drop a JPG/PNG/WebP.</p><div class="media-choice-row" data-v-bdf46aea><button class="mini-btn" type="button" data-v-bdf46aea>Open Media Library</button><button class="mini-btn" type="button" data-v-bdf46aea>Upload from computer</button></div>`);
            if (unref(uploadMessage)) {
              _push(`<small class="upload-message" data-v-bdf46aea>${ssrInterpolate(unref(uploadMessage))}</small>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="panel visual-options" data-v-bdf46aea><h2 data-v-bdf46aea>${ssrInterpolate(unref(isBlogComposer) ? "Blog hero design" : "Cover design")}</h2><p class="muted" data-v-bdf46aea>${ssrInterpolate(unref(isBlogComposer) ? "Blog entries use an editorial surface and accent color, not cover images." : "These controls update the Frontend Preview in the right inspector.")}</p><label data-v-bdf46aea> Visual style <select data-v-bdf46aea><!--[-->`);
          ssrRenderList(unref(isBlogComposer) ? blogHeroStyleOptions : coverStyleOptions, (option) => {
            _push(`<option${ssrRenderAttr("value", option.value)} data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).coverStyle) ? ssrLooseContain(unref(frontmatter).coverStyle, option.value) : ssrLooseEqual(unref(frontmatter).coverStyle, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
          });
          _push(`<!--]--></select></label>`);
          if (!unref(isBlogComposer)) {
            _push(`<label data-v-bdf46aea> Image position <select data-v-bdf46aea><!--[-->`);
            ssrRenderList(coverPositionOptions, (position) => {
              _push(`<option${ssrRenderAttr("value", position)} data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).coverPosition) ? ssrLooseContain(unref(frontmatter).coverPosition, position) : ssrLooseEqual(unref(frontmatter).coverPosition, position)) ? " selected" : ""}>${ssrInterpolate(position)}</option>`);
            });
            _push(`<!--]--></select></label>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<label data-v-bdf46aea> Accent color <select data-v-bdf46aea><!--[-->`);
          ssrRenderList(accentOptions, (option) => {
            _push(`<option${ssrRenderAttr("value", option.value)} data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).accentColor) ? ssrLooseContain(unref(frontmatter).accentColor, option.value) : ssrLooseEqual(unref(frontmatter).accentColor, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
          });
          _push(`<!--]--></select></label></div>`);
          if (unref(isBlogComposer)) {
            _push(`<div class="inspector-card blog-hero-preview-card" data-v-bdf46aea><h3 data-v-bdf46aea>Frontend preview</h3><div class="preview-card" data-v-bdf46aea><div class="preview-header" data-v-bdf46aea><span class="dot" data-v-bdf46aea></span><span class="dot" data-v-bdf46aea></span><span class="dot" data-v-bdf46aea></span></div><div class="frontend-preview" data-v-bdf46aea>`);
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
            _push(`<article class="empty-canvas" data-v-bdf46aea><strong data-v-bdf46aea>No blocks yet.</strong><p data-v-bdf46aea>Add a Heading Block, Text Block, Quote Block, Image Block, Code Block, Callout, Table or Banner from the block library.</p></article>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(unref(editableBlocks), (block, index) => {
            _push(`<article class="${ssrRenderClass([{ selected: unref(selectedBlockId) === block.id, hidden: !block.visible }, "content-block"])}" data-v-bdf46aea><div class="block-toolbar" data-v-bdf46aea><div class="block-toolbar-left" data-v-bdf46aea><button class="drag" type="button" aria-label="Select block" data-v-bdf46aea>::</button><div class="block-title" data-v-bdf46aea><strong data-v-bdf46aea>${ssrInterpolate(blockUiTitle(block))}</strong><span data-v-bdf46aea>${ssrInterpolate(block.type)} block - ${ssrInterpolate(block.visible ? "visible" : "hidden")}</span></div></div><div class="block-actions" data-v-bdf46aea><button class="mini-btn" type="button" data-v-bdf46aea>Edit</button><button class="mini-btn" type="button" data-v-bdf46aea>Duplicate</button><button class="mini-btn" type="button" data-v-bdf46aea>${ssrInterpolate(block.visible ? "Hide" : "Show")}</button><button class="mini-btn" type="button" data-v-bdf46aea>Up</button><button class="mini-btn" type="button" data-v-bdf46aea>Down</button><button class="mini-btn" type="button" data-v-bdf46aea>Delete</button></div></div><div class="block-body" data-v-bdf46aea><div class="field-grid compact" data-v-bdf46aea><label data-v-bdf46aea> Block title <input${ssrRenderAttr("value", block.title)} type="text" placeholder="Optional internal title" data-v-bdf46aea></label>`);
            if (block.type === "heading") {
              _push(`<!--[--><label data-v-bdf46aea> Kicker <input${ssrRenderAttr("value", block.data.kicker)} type="text" placeholder="Optional eyebrow" data-v-bdf46aea></label><label data-v-bdf46aea> Level <select data-v-bdf46aea><option value="h2" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(block.data.level) ? ssrLooseContain(block.data.level, "h2") : ssrLooseEqual(block.data.level, "h2")) ? " selected" : ""}>H2</option><option value="h3" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(block.data.level) ? ssrLooseContain(block.data.level, "h3") : ssrLooseEqual(block.data.level, "h3")) ? " selected" : ""}>H3</option><option value="h4" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(block.data.level) ? ssrLooseContain(block.data.level, "h4") : ssrLooseEqual(block.data.level, "h4")) ? " selected" : ""}>H4</option></select></label><label class="span-2" data-v-bdf46aea> Heading <input${ssrRenderAttr("value", block.data.heading)} type="text" placeholder="Visible heading" data-v-bdf46aea></label><label class="span-2" data-v-bdf46aea> Subheading <textarea rows="3" placeholder="Optional supporting text" data-v-bdf46aea>${ssrInterpolate(block.data.subheading)}</textarea></label><!--]-->`);
            } else if (block.type === "text") {
              _push(`<!--[--><label data-v-bdf46aea> Heading <small data-v-bdf46aea>(optional legacy)</small><input${ssrRenderAttr("value", block.data.heading)} type="text" placeholder="Optional visible heading" data-v-bdf46aea></label><label class="span-2" data-v-bdf46aea> Body <textarea rows="6" data-v-bdf46aea>${ssrInterpolate(block.data.body)}</textarea></label><!--]-->`);
            } else if (block.type === "quote") {
              _push(`<!--[--><label data-v-bdf46aea> Variant <select data-v-bdf46aea><option value="editorial" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "editorial") : ssrLooseEqual(block.data.variant, "editorial")) ? " selected" : ""}>Editorial</option><option value="subtle" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "subtle") : ssrLooseEqual(block.data.variant, "subtle")) ? " selected" : ""}>Subtle</option><option value="pullquote" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "pullquote") : ssrLooseEqual(block.data.variant, "pullquote")) ? " selected" : ""}>Pullquote</option></select></label><label class="span-2" data-v-bdf46aea> Quote text <textarea rows="4" placeholder="Embed directly into business operations" data-v-bdf46aea>${ssrInterpolate(block.data.quote)}</textarea></label><label class="span-2" data-v-bdf46aea> Attribution <small data-v-bdf46aea>(optional)</small><input${ssrRenderAttr("value", block.data.attribution)} type="text" placeholder="Gribo notes" data-v-bdf46aea></label><!--]-->`);
            } else if (block.type === "image") {
              _push(`<div class="span-2 image-block-grid" data-v-bdf46aea><div class="${ssrRenderClass([normalizeImageLayout(block.data.layout), "image-drop"])}" role="button" tabindex="0" data-v-bdf46aea>`);
              if (block.data.imageUrl) {
                _push(`<img${ssrRenderAttr("src", block.data.imageUrl)}${ssrRenderAttr("alt", block.data.alt || "")} data-v-bdf46aea>`);
              } else {
                _push(`<div data-v-bdf46aea><div class="upload-icon" data-v-bdf46aea>+</div><strong data-v-bdf46aea>Choose or upload image</strong><p class="muted" data-v-bdf46aea>Select from Media Library, upload from computer, or drop a JPG/PNG/WebP.</p></div>`);
              }
              _push(`</div><div class="image-settings" data-v-bdf46aea><label data-v-bdf46aea> Layout <select data-v-bdf46aea><option value="full-width" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(block.data.layout) ? ssrLooseContain(block.data.layout, "full-width") : ssrLooseEqual(block.data.layout, "full-width")) ? " selected" : ""}>Full width</option><option value="contained" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(block.data.layout) ? ssrLooseContain(block.data.layout, "contained") : ssrLooseEqual(block.data.layout, "contained")) ? " selected" : ""}>Contained</option><option value="inline-medium" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(block.data.layout) ? ssrLooseContain(block.data.layout, "inline-medium") : ssrLooseEqual(block.data.layout, "inline-medium")) ? " selected" : ""}>Inline medium</option><option value="inline-small" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(block.data.layout) ? ssrLooseContain(block.data.layout, "inline-small") : ssrLooseEqual(block.data.layout, "inline-small")) ? " selected" : ""}>Inline small</option><option value="editorial-crop" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(block.data.layout) ? ssrLooseContain(block.data.layout, "editorial-crop") : ssrLooseEqual(block.data.layout, "editorial-crop")) ? " selected" : ""}>Editorial crop</option></select></label><label data-v-bdf46aea> Alt text <input${ssrRenderAttr("value", block.data.alt)} type="text" data-v-bdf46aea></label><label data-v-bdf46aea> Caption <textarea rows="3" data-v-bdf46aea>${ssrInterpolate(block.data.caption)}</textarea></label><div class="media-choice-row" data-v-bdf46aea><button class="ghost-btn" type="button" data-v-bdf46aea>Choose from Media Library</button><button class="ghost-btn" type="button" data-v-bdf46aea>Upload from computer</button>`);
              if (block.data.imageUrl) {
                _push(`<button class="ghost-btn" type="button" data-v-bdf46aea>Remove image</button>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div>`);
              if (block.data.imageUrl) {
                _push(`<div class="selected-asset-note" data-v-bdf46aea><span data-v-bdf46aea>Selected image</span><strong data-v-bdf46aea>${ssrInterpolate(imageAssetLabel(block.data.imageUrl))}</strong></div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div></div>`);
            } else if (block.type === "code") {
              _push(`<!--[--><label data-v-bdf46aea> Code title <input${ssrRenderAttr("value", block.data.title)} type="text" data-v-bdf46aea></label><label data-v-bdf46aea> Language <input${ssrRenderAttr("value", block.data.language)} type="text" placeholder="yaml" data-v-bdf46aea></label><label class="check-row span-2" data-v-bdf46aea><input${ssrIncludeBooleanAttr(Array.isArray(block.data.copyEnabled) ? ssrLooseContain(block.data.copyEnabled, null) : block.data.copyEnabled) ? " checked" : ""} type="checkbox" data-v-bdf46aea> Copy enabled </label><label class="span-2" data-v-bdf46aea> Code <textarea class="code-textarea" rows="9" data-v-bdf46aea>${ssrInterpolate(block.data.code)}</textarea></label><!--]-->`);
            } else if (block.type === "callout") {
              _push(`<!--[--><label data-v-bdf46aea> Variant <select data-v-bdf46aea><option value="info" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "info") : ssrLooseEqual(block.data.variant, "info")) ? " selected" : ""}>Info / Blue</option><option value="warning" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "warning") : ssrLooseEqual(block.data.variant, "warning")) ? " selected" : ""}>Warning / Yellow</option><option value="friction" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "friction") : ssrLooseEqual(block.data.variant, "friction")) ? " selected" : ""}>Friction / Coral</option><option value="success" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "success") : ssrLooseEqual(block.data.variant, "success")) ? " selected" : ""}>Success / Green</option><option value="editorial" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(block.data.variant) ? ssrLooseContain(block.data.variant, "editorial") : ssrLooseEqual(block.data.variant, "editorial")) ? " selected" : ""}>Editorial / Lavender</option></select></label><label data-v-bdf46aea> Icon <input${ssrRenderAttr("value", block.data.icon)} type="text" data-v-bdf46aea></label><label data-v-bdf46aea> Title <input${ssrRenderAttr("value", block.data.title)} type="text" data-v-bdf46aea></label><label class="span-2" data-v-bdf46aea> Body <textarea rows="4" data-v-bdf46aea>${ssrInterpolate(block.data.body)}</textarea></label><!--]-->`);
            } else if (block.type === "table") {
              _push(`<!--[--><label class="span-2" data-v-bdf46aea> Columns <input${ssrRenderAttr("value", block.data.columnsText)} type="text" placeholder="Signal, Observed state, Next action" data-v-bdf46aea></label><label class="span-2" data-v-bdf46aea> Rows <textarea rows="5" placeholder="Runtime | Draft | Document the path" data-v-bdf46aea>${ssrInterpolate(block.data.rowsText)}</textarea></label><!--]-->`);
            } else if (block.type === "banner") {
              _push(`<!--[--><label data-v-bdf46aea> Banner title <input${ssrRenderAttr("value", block.data.title)} type="text" data-v-bdf46aea></label><label data-v-bdf46aea> Accent <input${ssrRenderAttr("value", block.data.accent)} type="text" placeholder="coral" data-v-bdf46aea></label><label class="span-2" data-v-bdf46aea> Body <textarea rows="4" data-v-bdf46aea>${ssrInterpolate(block.data.body)}</textarea></label><!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div></article>`);
          });
          _push(`<!--]--><div class="panel markdown-fallback" data-v-bdf46aea><div class="panel-head" data-v-bdf46aea><h2 data-v-bdf46aea>Markdown fallback</h2><span class="status-badge" data-v-bdf46aea>Legacy body</span></div><p class="muted" data-v-bdf46aea>If no visible blocks are saved, the public page keeps rendering this markdown body.</p><textarea class="body-editor" data-v-bdf46aea>${ssrInterpolate(unref(markdownBody))}</textarea></div></div></section><!--]-->`);
        } else if (unref(activeTab) === "metadata") {
          _push(`<!--[--><section class="panel" data-v-bdf46aea><div class="panel-head" data-v-bdf46aea><h2 data-v-bdf46aea>Core metadata</h2><span class="status-badge" data-v-bdf46aea>${ssrInterpolate(unref(contentType))}</span></div><div class="field-grid" data-v-bdf46aea><label data-v-bdf46aea> Title <input${ssrRenderAttr("value", unref(frontmatter).title)} type="text" data-v-bdf46aea></label><label data-v-bdf46aea> Slug <input${ssrRenderAttr("value", unref(slugInput))} type="text" data-v-bdf46aea></label><label data-v-bdf46aea> Status <select data-v-bdf46aea><!--[-->`);
          ssrRenderList(unref(statusChoices), (status) => {
            _push(`<option${ssrRenderAttr("value", status)} data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).status) ? ssrLooseContain(unref(frontmatter).status, status) : ssrLooseEqual(unref(frontmatter).status, status)) ? " selected" : ""}>${ssrInterpolate(status)}</option>`);
          });
          _push(`<!--]--></select></label><label data-v-bdf46aea> Lab `);
          if (unref(labChoices).length) {
            _push(`<select data-v-bdf46aea><option value="" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).lab) ? ssrLooseContain(unref(frontmatter).lab, "") : ssrLooseEqual(unref(frontmatter).lab, "")) ? " selected" : ""}>Unassigned</option><!--[-->`);
            ssrRenderList(unref(labSelectChoices), (lab) => {
              _push(`<option${ssrRenderAttr("value", lab.value)} data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).lab) ? ssrLooseContain(unref(frontmatter).lab, lab.value) : ssrLooseEqual(unref(frontmatter).lab, lab.value)) ? " selected" : ""}>${ssrInterpolate(lab.label)}</option>`);
            });
            _push(`<!--]--></select>`);
          } else {
            _push(`<select disabled data-v-bdf46aea><option data-v-bdf46aea>No labs available yet.</option></select>`);
          }
          _push(`</label>`);
          if (unref(contentType) === "blog") {
            _push(`<label data-v-bdf46aea> Excerpt <textarea rows="3" data-v-bdf46aea>${ssrInterpolate(unref(frontmatter).excerpt)}</textarea></label>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(contentType) === "projects") {
            _push(`<label data-v-bdf46aea> Summary <textarea rows="3" data-v-bdf46aea>${ssrInterpolate(unref(frontmatter).summary)}</textarea></label>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<label data-v-bdf46aea> Description <textarea rows="3" data-v-bdf46aea>${ssrInterpolate(unref(frontmatter).description)}</textarea></label><label data-v-bdf46aea> Tags <input${ssrRenderAttr("value", unref(tagsText))} type="text" placeholder="ai, systems, research" data-v-bdf46aea></label>`);
          if (unref(contentType) === "blog") {
            _push(`<button class="ghost-btn mini-action span-2" type="button" data-v-bdf46aea> Generate tags </button>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(contentType) === "projects") {
            _push(`<label data-v-bdf46aea> Type <input${ssrRenderAttr("value", unref(frontmatter).type)} type="text" data-v-bdf46aea></label>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(contentType) === "projects") {
            _push(`<label data-v-bdf46aea> Stack <input${ssrRenderAttr("value", unref(stackText))} type="text" placeholder="Nuxt, Python" data-v-bdf46aea></label>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></section>`);
          if (unref(contentType) === "blog") {
            _push(`<section class="panel danger-zone" data-v-bdf46aea><div class="panel-head" data-v-bdf46aea><div data-v-bdf46aea><p class="eyebrow" data-v-bdf46aea>Protected action</p><h2 data-v-bdf46aea>Danger Zone</h2></div><span class="status-badge" data-v-bdf46aea>Blog entry</span></div><p class="muted" data-v-bdf46aea> Archive or permanently remove this blog entry. Use this only for drafts, tests, or content that should no longer appear in the archive. </p><div class="danger-summary" data-v-bdf46aea><span data-v-bdf46aea>Title</span><strong data-v-bdf46aea>${ssrInterpolate(unref(frontmatter).title || "Untitled Blog Entry")}</strong><span data-v-bdf46aea>Slug</span><strong data-v-bdf46aea>${ssrInterpolate(unref(frontmatter).slug || "untitled")}</strong><span data-v-bdf46aea>File</span><strong data-v-bdf46aea>${ssrInterpolate(unref(filePath))}</strong></div><div class="danger-actions" data-v-bdf46aea><button class="ghost-btn" type="button"${ssrIncludeBooleanAttr(unref(isSaving) || unref(frontmatter).status === "archived") ? " disabled" : ""} data-v-bdf46aea>${ssrInterpolate(unref(frontmatter).status === "archived" ? "Entry archived" : "Archive entry")}</button></div><div class="delete-confirm" data-v-bdf46aea><label data-v-bdf46aea> Type DELETE BLOG ENTRY to permanently remove this file <input${ssrRenderAttr("value", unref(deleteConfirmation))} type="text" placeholder="DELETE BLOG ENTRY" data-v-bdf46aea></label><button class="danger-btn" type="button"${ssrIncludeBooleanAttr(unref(isDeleting) || unref(deleteConfirmation) !== "DELETE BLOG ENTRY") ? " disabled" : ""} data-v-bdf46aea>${ssrInterpolate(unref(isDeleting) ? "Deleting..." : "Delete entry")}</button></div></section>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(contentType) === "projects") {
            _push(`<section class="panel" data-v-bdf46aea><div class="panel-head" data-v-bdf46aea><h2 data-v-bdf46aea>Documentation</h2><span class="status-badge" data-v-bdf46aea>${ssrInterpolate(unref(attachedDocs).length ? `${unref(attachedDocs).length} docs` : "Empty")}</span></div>`);
            if (!unref(hasAttachedDocs)) {
              _push(`<div class="empty-doc-state" data-v-bdf46aea><strong data-v-bdf46aea>No documentation attached yet.</strong><p data-v-bdf46aea>This project can stay as a standalone dossier, or you can connect existing docs / create the first docs page.</p></div>`);
            } else {
              _push(`<div class="attached-docs" data-v-bdf46aea><!--[-->`);
              ssrRenderList(unref(attachedDocs), (doc) => {
                _push(`<article class="attached-doc-card" data-v-bdf46aea><div data-v-bdf46aea><strong data-v-bdf46aea>${ssrInterpolate(doc.title)}</strong><small data-v-bdf46aea>${ssrInterpolate(secondaryDocText(doc))}</small></div>`);
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
            _push(`<div class="doc-actions" data-v-bdf46aea><button class="ghost-btn" type="button" data-v-bdf46aea>Add existing documentation</button>`);
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
              _push(`<div class="attach-docs-panel" data-v-bdf46aea><div data-v-bdf46aea><h3 data-v-bdf46aea>Attach existing documentation</h3><p data-v-bdf46aea>Select one or more available documentation pages to attach to this project.</p></div><div class="doc-picker" data-v-bdf46aea><p class="doc-section-title" data-v-bdf46aea>Documentation pages</p>`);
              if (!unref(attachableDocs).length) {
                _push(`<p class="muted" data-v-bdf46aea>No available documentation found.</p>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<!--[-->`);
              ssrRenderList(unref(attachableDocs), (doc) => {
                _push(`<label class="doc-choice" data-v-bdf46aea><input${ssrIncludeBooleanAttr(Array.isArray(unref(selectedAttachmentDocs)) ? ssrLooseContain(unref(selectedAttachmentDocs), doc.publicPath) : unref(selectedAttachmentDocs)) ? " checked" : ""} type="checkbox"${ssrRenderAttr("value", doc.publicPath)} data-v-bdf46aea><span data-v-bdf46aea><strong data-v-bdf46aea>${ssrInterpolate(doc.title)}</strong><small data-v-bdf46aea>${ssrInterpolate(secondaryDocText(doc))}</small><small data-v-bdf46aea>Status: ${ssrInterpolate(docAvailabilityLabel(doc))}</small></span></label>`);
              });
              _push(`<!--]--></div><div class="doc-actions" data-v-bdf46aea><button class="studio-btn" type="button"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} data-v-bdf46aea>Save attachment</button><button class="ghost-btn" type="button" data-v-bdf46aea>Cancel</button></div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</section>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(contentType) === "projects") {
            _push(`<section class="panel danger-zone" data-v-bdf46aea><div class="panel-head" data-v-bdf46aea><div data-v-bdf46aea><p class="eyebrow" data-v-bdf46aea>Protected action</p><h2 data-v-bdf46aea>Danger Zone</h2></div><span class="status-badge" data-v-bdf46aea>Repository project</span></div><p class="muted" data-v-bdf46aea> Permanently remove this project file from <code data-v-bdf46aea>content/projects</code>. This does not delete attached docs, media, blogs or labs. </p><div class="danger-summary" data-v-bdf46aea><span data-v-bdf46aea>Title</span><strong data-v-bdf46aea>${ssrInterpolate(unref(frontmatter).title || "Untitled Project")}</strong><span data-v-bdf46aea>Slug</span><strong data-v-bdf46aea>${ssrInterpolate(unref(frontmatter).slug || "untitled")}</strong><span data-v-bdf46aea>File</span><strong data-v-bdf46aea>${ssrInterpolate(unref(filePath))}</strong></div><div class="delete-confirm" data-v-bdf46aea><label data-v-bdf46aea> Type DELETE PROJECT to remove this project file <input${ssrRenderAttr("value", unref(deleteConfirmation))} type="text" placeholder="DELETE PROJECT" data-v-bdf46aea></label><button class="danger-btn" type="button"${ssrIncludeBooleanAttr(unref(isDeleting) || unref(deleteConfirmation) !== "DELETE PROJECT") ? " disabled" : ""} data-v-bdf46aea>${ssrInterpolate(unref(isDeleting) ? "Deleting..." : "Delete project")}</button></div></section>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else if (unref(activeTab) === "seo") {
          _push(`<section class="panel" data-v-bdf46aea><div class="panel-head" data-v-bdf46aea><h2 data-v-bdf46aea>SEO settings</h2><span class="status-badge" data-v-bdf46aea>Snippet</span></div><div class="field-grid" data-v-bdf46aea><label data-v-bdf46aea> SEO title <input${ssrRenderAttr("value", unref(frontmatter).seoTitle)} type="text" data-v-bdf46aea></label><label data-v-bdf46aea> OG title <input${ssrRenderAttr("value", unref(frontmatter).ogTitle)} type="text" data-v-bdf46aea></label><label class="span-2" data-v-bdf46aea> SEO description <textarea rows="4" data-v-bdf46aea>${ssrInterpolate(unref(frontmatter).seoDescription)}</textarea></label><label class="span-2" data-v-bdf46aea> OG description <textarea rows="4" data-v-bdf46aea>${ssrInterpolate(unref(frontmatter).ogDescription)}</textarea></label><label data-v-bdf46aea> OG image <input${ssrRenderAttr("value", unref(frontmatter).ogImage)} type="text" data-v-bdf46aea></label><label data-v-bdf46aea> Canonical <input${ssrRenderAttr("value", unref(frontmatter).canonical)} type="text" data-v-bdf46aea></label><label class="check-row" data-v-bdf46aea><input${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).noindex) ? ssrLooseContain(unref(frontmatter).noindex, null) : unref(frontmatter).noindex) ? " checked" : ""} type="checkbox" data-v-bdf46aea> Noindex </label></div></section>`);
        } else if (unref(activeTab) === "media") {
          _push(`<section class="panel" data-v-bdf46aea><div class="panel-head" data-v-bdf46aea><h2 data-v-bdf46aea>Media attached</h2><span class="status-badge" data-v-bdf46aea>${ssrInterpolate(unref(usedMediaAssets).length)} assets</span></div><div class="media-tab-grid" data-v-bdf46aea><!--[-->`);
          ssrRenderList(unref(usedMediaAssets), (asset) => {
            _push(`<article class="media-card" data-v-bdf46aea><img${ssrRenderAttr("src", asset.url)}${ssrRenderAttr("alt", asset.title)} data-v-bdf46aea><strong data-v-bdf46aea>${ssrInterpolate(asset.title)}</strong><span data-v-bdf46aea>${ssrInterpolate(asset.filename)}</span></article>`);
          });
          _push(`<!--]--></div><div class="asset-list" data-v-bdf46aea><!--[-->`);
          ssrRenderList(unref(mediaAssets), (asset) => {
            _push(`<button class="asset-button" type="button" data-v-bdf46aea><img${ssrRenderAttr("src", asset.url)}${ssrRenderAttr("alt", asset.title)} data-v-bdf46aea><span data-v-bdf46aea>${ssrInterpolate(asset.title)}</span></button>`);
          });
          _push(`<!--]--></div></section>`);
        } else if (unref(activeTab) === "preview") {
          _push(`<section class="panel" data-v-bdf46aea><div class="panel-head" data-v-bdf46aea><h2 data-v-bdf46aea>Frontend preview</h2>`);
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
          _push(`</div><div class="preview-surface" data-v-bdf46aea>`);
          if (unref(visibleBlocks).length) {
            _push(ssrRenderComponent(_component_ContentBlockRenderer, {
              blocks: unref(visibleBlocks),
              context: unref(contentType) === "projects" ? "project" : unref(contentType) === "docs" ? "docs" : "blog"
            }, null, _parent));
          } else {
            _push(`<div class="content-prose" data-v-bdf46aea><p class="muted" data-v-bdf46aea>No visible blocks yet. Public rendering will use the markdown body fallback.</p><pre data-v-bdf46aea>${ssrInterpolate(unref(markdownBody))}</pre></div>`);
          }
          _push(`</div></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><aside class="${ssrRenderClass([{ "blog-inspector-flow": unref(isBlogComposer) }, "composer-inspector"])}" data-v-bdf46aea>`);
        if (!unref(isBlogComposer)) {
          _push(`<div class="inspector-card" data-v-bdf46aea><h3 data-v-bdf46aea>Block inspector</h3>`);
          if (unref(selectedBlock)) {
            _push(`<!--[--><p data-v-bdf46aea>${ssrInterpolate(blockUiTitle(unref(selectedBlock)))} - ${ssrInterpolate(unref(selectedBlock).type)} - ${ssrInterpolate(unref(selectedBlock).visible ? "Visible" : "Hidden")}</p><label data-v-bdf46aea> Selected block title <input${ssrRenderAttr("value", unref(selectedBlock).title)} type="text" data-v-bdf46aea></label><!--]-->`);
          } else {
            _push(`<p data-v-bdf46aea>Select a block to edit its properties, visibility and output mapping.</p>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(isBlogComposer)) {
          _push(`<div class="inspector-card" data-v-bdf46aea><h3 data-v-bdf46aea>Frontend preview</h3><div class="preview-card" data-v-bdf46aea><div class="preview-header" data-v-bdf46aea><span class="dot" data-v-bdf46aea></span><span class="dot" data-v-bdf46aea></span><span class="dot" data-v-bdf46aea></span></div><div class="frontend-preview" data-v-bdf46aea>`);
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
            _push(`<!--[--><div class="${ssrRenderClass([`style-${unref(frontmatter).coverStyle || "editorial-gradient"}`, "front-hero"])}" style="${ssrRenderStyle(coverPreviewStyle())}" data-v-bdf46aea><span class="status-badge" data-v-bdf46aea>${ssrInterpolate(unref(frontmatter).status || "Draft")}</span><h3 data-v-bdf46aea>${ssrInterpolate(unref(frontmatter).title || "Untitled content")}</h3><p data-v-bdf46aea>${ssrInterpolate(unref(frontmatter).description || unref(frontmatter).excerpt || unref(frontmatter).summary || "Editorial preview surface.")}</p></div><!--[-->`);
            ssrRenderList(unref(visibleBlocks).slice(0, 2), (block) => {
              _push(`<div class="front-section" data-v-bdf46aea><strong data-v-bdf46aea>${ssrInterpolate(blockUiTitle(block))}</strong><p data-v-bdf46aea>${ssrInterpolate(block.type)} block rendered publicly.</p></div>`);
            });
            _push(`<!--]--><!--]-->`);
          }
          _push(`</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="inspector-card" data-v-bdf46aea><h3 data-v-bdf46aea>Page outline</h3><div class="outline-list" data-v-bdf46aea><button class="outline-item" type="button" data-v-bdf46aea><strong data-v-bdf46aea>Cover</strong><span data-v-bdf46aea>Hero</span></button><!--[-->`);
        ssrRenderList(unref(editableBlocks), (block) => {
          _push(`<button class="${ssrRenderClass([{ active: unref(selectedBlockId) === block.id }, "outline-item"])}" type="button" data-v-bdf46aea><strong data-v-bdf46aea>${ssrInterpolate(blockUiTitle(block))}</strong><span data-v-bdf46aea>${ssrInterpolate(block.type)}</span></button>`);
        });
        _push(`<!--]--></div></div><div class="inspector-card" data-v-bdf46aea><h3 data-v-bdf46aea>Media uploaded</h3><div class="media-mini-grid" data-v-bdf46aea><!--[-->`);
        ssrRenderList(unref(usedMediaAssets).slice(0, 6), (asset) => {
          _push(`<img class="media-mini"${ssrRenderAttr("src", asset.url)}${ssrRenderAttr("alt", asset.title)} data-v-bdf46aea>`);
        });
        _push(`<!--]--></div><p data-v-bdf46aea>${ssrInterpolate(unref(usedMediaAssets).length ? "Images are referenced by cover or content blocks." : "No media references yet.")}</p></div><div class="inspector-card" data-v-bdf46aea><h3 data-v-bdf46aea>Output mapping</h3><div class="component-note" data-v-bdf46aea> Saves frontmatter, <code data-v-bdf46aea>blocks</code>, cover fields and markdown fallback to <code data-v-bdf46aea>content/${ssrInterpolate(unref(filePath))}</code>. </div></div></aside></section>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(filePath) || !unref(isRichComposer)) {
        _push(ssrRenderComponent(_component_AdminHero, {
          eyebrow: "Content Editor",
          title: unref(contentType) === "projects" ? unref(frontmatter).title || "Project dossier editor" : unref(frontmatter).title || "Missing content file",
          description: unref(contentType) === "projects" ? `Editing structured repository fields for ${unref(filePath) || "no file selected"}.` : `Editing ${unref(filePath) || "no file selected"} inside Nuxt Content.`
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(filePath) && !unref(isRichComposer)) {
        _push(`<section class="editor-grid" data-v-bdf46aea><div class="editor-main" data-v-bdf46aea>`);
        _push(ssrRenderComponent(_component_AdminPanel, {
          title: unref(contentType) === "projects" ? "Project basics" : "Core metadata",
          eyebrow: "Frontmatter"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="field-grid" data-v-bdf46aea${_scopeId}><label data-v-bdf46aea${_scopeId}> Title <input${ssrRenderAttr("value", unref(frontmatter).title)} type="text" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> Slug <input${ssrRenderAttr("value", unref(slugInput))} type="text" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> Status <select data-v-bdf46aea${_scopeId}><!--[-->`);
              ssrRenderList(unref(statusChoices), (status) => {
                _push2(`<option${ssrRenderAttr("value", status)} data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).status) ? ssrLooseContain(unref(frontmatter).status, status) : ssrLooseEqual(unref(frontmatter).status, status)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(status)}</option>`);
              });
              _push2(`<!--]--></select></label><label data-v-bdf46aea${_scopeId}> Lab `);
              if (unref(labChoices).length) {
                _push2(`<select data-v-bdf46aea${_scopeId}><option value="" data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).lab) ? ssrLooseContain(unref(frontmatter).lab, "") : ssrLooseEqual(unref(frontmatter).lab, "")) ? " selected" : ""}${_scopeId}>Unassigned</option><!--[-->`);
                ssrRenderList(unref(labSelectChoices), (lab) => {
                  _push2(`<option${ssrRenderAttr("value", lab.value)} data-v-bdf46aea${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).lab) ? ssrLooseContain(unref(frontmatter).lab, lab.value) : ssrLooseEqual(unref(frontmatter).lab, lab.value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(lab.label)}</option>`);
                });
                _push2(`<!--]--></select>`);
              } else {
                _push2(`<select disabled data-v-bdf46aea${_scopeId}><option data-v-bdf46aea${_scopeId}>No labs available yet.</option></select>`);
              }
              _push2(`</label>`);
              if (unref(contentType) === "blog") {
                _push2(`<label data-v-bdf46aea${_scopeId}> Excerpt <textarea rows="3" data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).excerpt)}</textarea></label>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(contentType) === "projects") {
                _push2(`<label data-v-bdf46aea${_scopeId}> Summary <textarea rows="3" data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).summary)}</textarea></label>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<label data-v-bdf46aea${_scopeId}> Description <textarea rows="3" data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).description)}</textarea></label><label data-v-bdf46aea${_scopeId}> Tags <input${ssrRenderAttr("value", unref(tagsText))} type="text" placeholder="ai, systems, research" data-v-bdf46aea${_scopeId}></label></div>`);
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
            title: "Taxonomy and stack",
            eyebrow: "Repository"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="field-grid" data-v-bdf46aea${_scopeId}><label data-v-bdf46aea${_scopeId}> Type <input${ssrRenderAttr("value", unref(frontmatter).type)} type="text" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> Year <input${ssrRenderAttr("value", unref(frontmatter).year)} type="number" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> Stack <input${ssrRenderAttr("value", unref(stackText))} type="text" placeholder="Nuxt, Python" data-v-bdf46aea${_scopeId}></label></div>`);
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
            title: "Project dossier fields",
            eyebrow: "Structured overview"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="field-grid" data-v-bdf46aea${_scopeId}><label class="span-2" data-v-bdf46aea${_scopeId}> Project overview title <input${ssrRenderAttr("value", unref(frontmatter).projectOverviewTitle)} type="text" placeholder="Project overview" data-v-bdf46aea${_scopeId}></label><label class="span-2" data-v-bdf46aea${_scopeId}> Project overview body <textarea rows="4" placeholder="Short note for the Project overview callout." data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).projectOverviewBody)}</textarea></label></div><details class="advanced-doc-fields" open data-v-bdf46aea${_scopeId}><summary data-v-bdf46aea${_scopeId}>Project memory</summary><div class="field-grid" data-v-bdf46aea${_scopeId}><label class="span-2" data-v-bdf46aea${_scopeId}> Memory intro <textarea rows="3" placeholder="Intro copy for the Project memory section." data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).projectMemoryIntro)}</textarea></label><label class="span-2" data-v-bdf46aea${_scopeId}> Memory title <input${ssrRenderAttr("value", unref(frontmatter).projectMemoryTitle)} type="text" placeholder="Project memory title" data-v-bdf46aea${_scopeId}></label><label class="span-2" data-v-bdf46aea${_scopeId}> Memory body <textarea rows="5" placeholder="What should the overview remember about this project?" data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).projectMemoryBody)}</textarea></label></div></details><details class="advanced-doc-fields" open data-v-bdf46aea${_scopeId}><summary data-v-bdf46aea${_scopeId}>Project index</summary><div class="field-grid" data-v-bdf46aea${_scopeId}><label class="span-2" data-v-bdf46aea${_scopeId}> Index intro <textarea rows="3" placeholder="Intro copy for the Project index section." data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).projectIndexIntro)}</textarea></label><label data-v-bdf46aea${_scopeId}> What this project holds - title <input${ssrRenderAttr("value", unref(frontmatter).projectHoldsTitle)} type="text" placeholder="What this project holds" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> Working stack note <textarea rows="3" placeholder="How should the stack be described publicly?" data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).workingStackNote)}</textarea></label><label class="span-2" data-v-bdf46aea${_scopeId}> What this project holds - body <textarea rows="4" placeholder="Structured project map or dossier explanation." data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).projectHoldsBody)}</textarea></label></div></details><details class="advanced-doc-fields" data-v-bdf46aea${_scopeId}><summary data-v-bdf46aea${_scopeId}>Documentation and build log copy</summary><div class="field-grid" data-v-bdf46aea${_scopeId}><label class="span-2" data-v-bdf46aea${_scopeId}> Documentation intro <textarea rows="3" placeholder="Shown above attached docs or the empty documentation state." data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).documentationIntro)}</textarea></label><label data-v-bdf46aea${_scopeId}> Empty documentation title <input${ssrRenderAttr("value", unref(frontmatter).emptyDocumentationTitle)} type="text" placeholder="No documentation attached yet" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> Decision trace title <input${ssrRenderAttr("value", unref(frontmatter).decisionTraceTitle)} type="text" placeholder="Decision trace" data-v-bdf46aea${_scopeId}></label><label class="span-2" data-v-bdf46aea${_scopeId}> Empty documentation body <textarea rows="3" placeholder="What should visitors see when this project has no docs yet?" data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).emptyDocumentationBody)}</textarea></label><label class="span-2" data-v-bdf46aea${_scopeId}> Build log intro <textarea rows="3" placeholder="Intro copy for the Build log section." data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).buildLogIntro)}</textarea></label><label class="span-2" data-v-bdf46aea${_scopeId}> Decision trace body <textarea rows="3" placeholder="Short note about decisions or build history." data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).decisionTraceBody)}</textarea></label><label class="span-2" data-v-bdf46aea${_scopeId}> Related articles note <textarea rows="3" placeholder="Shown when there are no related articles." data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).relatedArticlesNote)}</textarea></label></div></details>`);
                if (Array.isArray(unref(frontmatter).blocks) && unref(frontmatter).blocks.length) {
                  _push2(`<div class="legacy-block-note" data-v-bdf46aea${_scopeId}><strong data-v-bdf46aea${_scopeId}>Legacy project body preserved</strong><p data-v-bdf46aea${_scopeId}>This project has ${ssrInterpolate(unref(frontmatter).blocks.length)} saved rich blocks. They are preserved in frontmatter, but the Project Composer now prioritizes structured dossier fields.</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (unref(markdownBody)) {
                  _push2(`<details class="advanced-doc-fields" data-v-bdf46aea${_scopeId}><summary data-v-bdf46aea${_scopeId}>Advanced legacy markdown body</summary><p class="muted" data-v-bdf46aea${_scopeId}>This markdown body is preserved for compatibility, but it is no longer the main Project Composer surface.</p><textarea class="body-editor legacy-body-editor" data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(markdownBody))}</textarea></details>`);
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  createVNode("div", { class: "field-grid" }, [
                    createVNode("label", { class: "span-2" }, [
                      createTextVNode(" Project overview title "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(frontmatter).projectOverviewTitle = $event,
                        type: "text",
                        placeholder: "Project overview"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(frontmatter).projectOverviewTitle]
                      ])
                    ]),
                    createVNode("label", { class: "span-2" }, [
                      createTextVNode(" Project overview body "),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(frontmatter).projectOverviewBody = $event,
                        rows: "4",
                        placeholder: "Short note for the Project overview callout."
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(frontmatter).projectOverviewBody]
                      ])
                    ])
                  ]),
                  createVNode("details", {
                    class: "advanced-doc-fields",
                    open: ""
                  }, [
                    createVNode("summary", null, "Project memory"),
                    createVNode("div", { class: "field-grid" }, [
                      createVNode("label", { class: "span-2" }, [
                        createTextVNode(" Memory intro "),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(frontmatter).projectMemoryIntro = $event,
                          rows: "3",
                          placeholder: "Intro copy for the Project memory section."
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(frontmatter).projectMemoryIntro]
                        ])
                      ]),
                      createVNode("label", { class: "span-2" }, [
                        createTextVNode(" Memory title "),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(frontmatter).projectMemoryTitle = $event,
                          type: "text",
                          placeholder: "Project memory title"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(frontmatter).projectMemoryTitle]
                        ])
                      ]),
                      createVNode("label", { class: "span-2" }, [
                        createTextVNode(" Memory body "),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(frontmatter).projectMemoryBody = $event,
                          rows: "5",
                          placeholder: "What should the overview remember about this project?"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(frontmatter).projectMemoryBody]
                        ])
                      ])
                    ])
                  ]),
                  createVNode("details", {
                    class: "advanced-doc-fields",
                    open: ""
                  }, [
                    createVNode("summary", null, "Project index"),
                    createVNode("div", { class: "field-grid" }, [
                      createVNode("label", { class: "span-2" }, [
                        createTextVNode(" Index intro "),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(frontmatter).projectIndexIntro = $event,
                          rows: "3",
                          placeholder: "Intro copy for the Project index section."
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(frontmatter).projectIndexIntro]
                        ])
                      ]),
                      createVNode("label", null, [
                        createTextVNode(" What this project holds - title "),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(frontmatter).projectHoldsTitle = $event,
                          type: "text",
                          placeholder: "What this project holds"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(frontmatter).projectHoldsTitle]
                        ])
                      ]),
                      createVNode("label", null, [
                        createTextVNode(" Working stack note "),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(frontmatter).workingStackNote = $event,
                          rows: "3",
                          placeholder: "How should the stack be described publicly?"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(frontmatter).workingStackNote]
                        ])
                      ]),
                      createVNode("label", { class: "span-2" }, [
                        createTextVNode(" What this project holds - body "),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(frontmatter).projectHoldsBody = $event,
                          rows: "4",
                          placeholder: "Structured project map or dossier explanation."
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(frontmatter).projectHoldsBody]
                        ])
                      ])
                    ])
                  ]),
                  createVNode("details", { class: "advanced-doc-fields" }, [
                    createVNode("summary", null, "Documentation and build log copy"),
                    createVNode("div", { class: "field-grid" }, [
                      createVNode("label", { class: "span-2" }, [
                        createTextVNode(" Documentation intro "),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(frontmatter).documentationIntro = $event,
                          rows: "3",
                          placeholder: "Shown above attached docs or the empty documentation state."
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(frontmatter).documentationIntro]
                        ])
                      ]),
                      createVNode("label", null, [
                        createTextVNode(" Empty documentation title "),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(frontmatter).emptyDocumentationTitle = $event,
                          type: "text",
                          placeholder: "No documentation attached yet"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(frontmatter).emptyDocumentationTitle]
                        ])
                      ]),
                      createVNode("label", null, [
                        createTextVNode(" Decision trace title "),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(frontmatter).decisionTraceTitle = $event,
                          type: "text",
                          placeholder: "Decision trace"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(frontmatter).decisionTraceTitle]
                        ])
                      ]),
                      createVNode("label", { class: "span-2" }, [
                        createTextVNode(" Empty documentation body "),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(frontmatter).emptyDocumentationBody = $event,
                          rows: "3",
                          placeholder: "What should visitors see when this project has no docs yet?"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(frontmatter).emptyDocumentationBody]
                        ])
                      ]),
                      createVNode("label", { class: "span-2" }, [
                        createTextVNode(" Build log intro "),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(frontmatter).buildLogIntro = $event,
                          rows: "3",
                          placeholder: "Intro copy for the Build log section."
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(frontmatter).buildLogIntro]
                        ])
                      ]),
                      createVNode("label", { class: "span-2" }, [
                        createTextVNode(" Decision trace body "),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(frontmatter).decisionTraceBody = $event,
                          rows: "3",
                          placeholder: "Short note about decisions or build history."
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(frontmatter).decisionTraceBody]
                        ])
                      ]),
                      createVNode("label", { class: "span-2" }, [
                        createTextVNode(" Related articles note "),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(frontmatter).relatedArticlesNote = $event,
                          rows: "3",
                          placeholder: "Shown when there are no related articles."
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(frontmatter).relatedArticlesNote]
                        ])
                      ])
                    ])
                  ]),
                  Array.isArray(unref(frontmatter).blocks) && unref(frontmatter).blocks.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "legacy-block-note"
                  }, [
                    createVNode("strong", null, "Legacy project body preserved"),
                    createVNode("p", null, "This project has " + toDisplayString(unref(frontmatter).blocks.length) + " saved rich blocks. They are preserved in frontmatter, but the Project Composer now prioritizes structured dossier fields.", 1)
                  ])) : createCommentVNode("", true),
                  unref(markdownBody) ? (openBlock(), createBlock("details", {
                    key: 1,
                    class: "advanced-doc-fields"
                  }, [
                    createVNode("summary", null, "Advanced legacy markdown body"),
                    createVNode("p", { class: "muted" }, "This markdown body is preserved for compatibility, but it is no longer the main Project Composer surface."),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => isRef(markdownBody) ? markdownBody.value = $event : null,
                      class: "body-editor legacy-body-editor"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(markdownBody)]
                    ])
                  ])) : createCommentVNode("", true)
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
                  _push2(`<div class="empty-doc-state" data-v-bdf46aea${_scopeId}><strong data-v-bdf46aea${_scopeId}>No documentation attached yet.</strong><p data-v-bdf46aea${_scopeId}>This project can stay as a standalone dossier, or you can connect existing docs / create the first docs page.</p></div>`);
                } else {
                  _push2(`<div class="attached-docs" data-v-bdf46aea${_scopeId}><div class="attached-section" data-v-bdf46aea${_scopeId}><p class="doc-section-title" data-v-bdf46aea${_scopeId}>Attached documentation</p><article class="attached-doc-card" data-v-bdf46aea${_scopeId}><div data-v-bdf46aea${_scopeId}><strong data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(attachedDocs)[0]?.title || unref(frontmatter).docsPath)}</strong><small data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).docsPath)} · folder: ${ssrInterpolate(unref(docsFolder))}</small></div>`);
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
                  _push2(`</article></div><div class="attached-section" data-v-bdf46aea${_scopeId}><p class="doc-section-title" data-v-bdf46aea${_scopeId}>Attached pages</p>`);
                  if (!unref(attachedDocs).length) {
                    _push2(`<p class="muted" data-v-bdf46aea${_scopeId}>No documentation pages selected.</p>`);
                  } else {
                    _push2(`<!--[-->`);
                    ssrRenderList(unref(attachedDocs), (doc) => {
                      _push2(`<article class="attached-doc-card" data-v-bdf46aea${_scopeId}><div data-v-bdf46aea${_scopeId}><strong data-v-bdf46aea${_scopeId}>${ssrInterpolate(doc.title)}</strong><small data-v-bdf46aea${_scopeId}>${ssrInterpolate(secondaryDocText(doc))}</small></div>`);
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
                _push2(`<div class="doc-actions" data-v-bdf46aea${_scopeId}>`);
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
                _push2(`<button class="ghost-btn" type="button" data-v-bdf46aea${_scopeId}>Add existing documentation</button>`);
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
                  _push2(`<div class="attach-docs-panel" data-v-bdf46aea${_scopeId}><div data-v-bdf46aea${_scopeId}><h3 data-v-bdf46aea${_scopeId}>Attach existing documentation</h3><p data-v-bdf46aea${_scopeId}>Select one or more available documentation pages to attach to this project.</p></div><div class="doc-picker" data-v-bdf46aea${_scopeId}><p class="doc-section-title" data-v-bdf46aea${_scopeId}>Documentation pages</p>`);
                  if (!unref(attachableDocs).length) {
                    _push2(`<p class="muted" data-v-bdf46aea${_scopeId}>No available documentation found.</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<!--[-->`);
                  ssrRenderList(unref(attachableDocs), (doc) => {
                    _push2(`<label class="doc-choice" data-v-bdf46aea${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(selectedAttachmentDocs)) ? ssrLooseContain(unref(selectedAttachmentDocs), doc.publicPath) : unref(selectedAttachmentDocs)) ? " checked" : ""} type="checkbox"${ssrRenderAttr("value", doc.publicPath)} data-v-bdf46aea${_scopeId}><span data-v-bdf46aea${_scopeId}><strong data-v-bdf46aea${_scopeId}>${ssrInterpolate(doc.title)}</strong><small data-v-bdf46aea${_scopeId}>${ssrInterpolate(secondaryDocText(doc))}</small><small data-v-bdf46aea${_scopeId}>Status: ${ssrInterpolate(docAvailabilityLabel(doc))}</small></span></label>`);
                  });
                  _push2(`<!--]--></div>`);
                  if (unref(attachedElsewhereDocs).length) {
                    _push2(`<details class="advanced-doc-fields" data-v-bdf46aea${_scopeId}><summary data-v-bdf46aea${_scopeId}>Already attached to another project</summary><!--[-->`);
                    ssrRenderList(unref(attachedElsewhereDocs), (doc) => {
                      _push2(`<article class="doc-choice disabled-doc" data-v-bdf46aea${_scopeId}><span data-v-bdf46aea${_scopeId}><strong data-v-bdf46aea${_scopeId}>${ssrInterpolate(doc.title)}</strong><small data-v-bdf46aea${_scopeId}>${ssrInterpolate(secondaryDocText(doc))}</small><small data-v-bdf46aea${_scopeId}>Status: ${ssrInterpolate(docAvailabilityLabel(doc))}</small></span></article>`);
                    });
                    _push2(`<!--]--></details>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="doc-actions" data-v-bdf46aea${_scopeId}><button class="studio-btn" type="button"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} data-v-bdf46aea${_scopeId}>Save attachment</button><button class="ghost-btn" type="button" data-v-bdf46aea${_scopeId}>Cancel</button></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<details class="advanced-doc-fields" data-v-bdf46aea${_scopeId}><summary data-v-bdf46aea${_scopeId}>Advanced documentation fields</summary><div class="field-grid" data-v-bdf46aea${_scopeId}><label id="project-docs-path" data-v-bdf46aea${_scopeId}> Docs path <input${ssrRenderAttr("value", unref(frontmatter).docsPath)} type="text" placeholder="/docs/tennis-ai-friction" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> Docs folder <input${ssrRenderAttr("value", unref(frontmatter).docsFolder)} type="text" placeholder="tennis-ai-friction" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> Related docs raw <input${ssrRenderAttr("value", unref(frontmatter).relatedDocs)} type="text" placeholder="/docs/tennis-ai-friction/setup" data-v-bdf46aea${_scopeId}></label></div></details>`);
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
        if (unref(contentType) === "projects") {
          _push(ssrRenderComponent(_component_AdminPanel, {
            title: "Danger Zone",
            eyebrow: "Protected action"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="danger-zone compact-danger" data-v-bdf46aea${_scopeId}><p class="muted" data-v-bdf46aea${_scopeId}> Permanently remove this project file from <code data-v-bdf46aea${_scopeId}>content/projects</code>. This does not delete attached docs, media, blogs or labs. </p><div class="danger-summary" data-v-bdf46aea${_scopeId}><span data-v-bdf46aea${_scopeId}>Title</span><strong data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).title || "Untitled Project")}</strong><span data-v-bdf46aea${_scopeId}>Slug</span><strong data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).slug || "untitled")}</strong><span data-v-bdf46aea${_scopeId}>File</span><strong data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(filePath))}</strong></div><div class="delete-confirm" data-v-bdf46aea${_scopeId}><label data-v-bdf46aea${_scopeId}> Type DELETE PROJECT to remove this project file <input${ssrRenderAttr("value", unref(deleteConfirmation))} type="text" placeholder="DELETE PROJECT" data-v-bdf46aea${_scopeId}></label><button class="danger-btn" type="button"${ssrIncludeBooleanAttr(unref(isDeleting) || unref(deleteConfirmation) !== "DELETE PROJECT") ? " disabled" : ""} data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(isDeleting) ? "Deleting..." : "Delete project")}</button></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "danger-zone compact-danger" }, [
                    createVNode("p", { class: "muted" }, [
                      createTextVNode(" Permanently remove this project file from "),
                      createVNode("code", null, "content/projects"),
                      createTextVNode(". This does not delete attached docs, media, blogs or labs. ")
                    ]),
                    createVNode("div", { class: "danger-summary" }, [
                      createVNode("span", null, "Title"),
                      createVNode("strong", null, toDisplayString(unref(frontmatter).title || "Untitled Project"), 1),
                      createVNode("span", null, "Slug"),
                      createVNode("strong", null, toDisplayString(unref(frontmatter).slug || "untitled"), 1),
                      createVNode("span", null, "File"),
                      createVNode("strong", null, toDisplayString(unref(filePath)), 1)
                    ]),
                    createVNode("div", { class: "delete-confirm" }, [
                      createVNode("label", null, [
                        createTextVNode(" Type DELETE PROJECT to remove this project file "),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => isRef(deleteConfirmation) ? deleteConfirmation.value = $event : null,
                          type: "text",
                          placeholder: "DELETE PROJECT"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(deleteConfirmation)]
                        ])
                      ]),
                      createVNode("button", {
                        class: "danger-btn",
                        type: "button",
                        disabled: unref(isDeleting) || unref(deleteConfirmation) !== "DELETE PROJECT",
                        onClick: deleteProjectEntry
                      }, toDisplayString(unref(isDeleting) ? "Deleting..." : "Delete project"), 9, ["disabled"])
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
                _push2(`<div class="field-grid" data-v-bdf46aea${_scopeId}><label data-v-bdf46aea${_scopeId}> Project <input${ssrRenderAttr("value", unref(frontmatter).project)} type="text" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> Project slug <input${ssrRenderAttr("value", unref(frontmatter).projectSlug)} type="text" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> Docs folder <input${ssrRenderAttr("value", unref(frontmatter).docsFolder)} type="text" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> Section <input${ssrRenderAttr("value", unref(frontmatter).section)} type="text" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> Order <input${ssrRenderAttr("value", unref(frontmatter).order)} type="number" data-v-bdf46aea${_scopeId}></label></div>`);
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
                _push2(`<div class="field-grid" data-v-bdf46aea${_scopeId}><label data-v-bdf46aea${_scopeId}> Short title <input${ssrRenderAttr("value", unref(frontmatter).shortTitle)} type="text" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> Accent <input${ssrRenderAttr("value", unref(frontmatter).accent)} type="text" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> Order <input${ssrRenderAttr("value", unref(frontmatter).order)} type="number" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> Related tags <input${ssrRenderAttr("value", unref(relatedTagsText))} type="text" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> Roadmap <textarea rows="4" data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(roadmapText))}</textarea></label><label data-v-bdf46aea${_scopeId}> Open questions <textarea rows="4" data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(openQuestionsText))}</textarea></label></div>`);
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
        if (unref(contentType) !== "projects") {
          _push(ssrRenderComponent(_component_AdminPanel, {
            title: "Markdown body",
            eyebrow: "Content"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<textarea class="body-editor" data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(markdownBody))}</textarea>`);
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
        } else {
          _push(`<!---->`);
        }
        _push(`</div><aside class="editor-side" data-v-bdf46aea>`);
        if (unref(contentType) === "projects") {
          _push(ssrRenderComponent(_component_AdminPanel, {
            title: "Project outline",
            eyebrow: "Dossier"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="outline-list structured-outline" data-v-bdf46aea${_scopeId}><div class="outline-item" data-v-bdf46aea${_scopeId}><strong data-v-bdf46aea${_scopeId}>Project basics</strong><span data-v-bdf46aea${_scopeId}>Title, summary, lab, status</span></div><div class="outline-item" data-v-bdf46aea${_scopeId}><strong data-v-bdf46aea${_scopeId}>Project memory</strong><span data-v-bdf46aea${_scopeId}>Structured dossier field</span></div><div class="outline-item" data-v-bdf46aea${_scopeId}><strong data-v-bdf46aea${_scopeId}>Project index</strong><span data-v-bdf46aea${_scopeId}>Public overview map</span></div><div class="outline-item" data-v-bdf46aea${_scopeId}><strong data-v-bdf46aea${_scopeId}>Documentation</strong><span data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(attachedDocs).length ? `${unref(attachedDocs).length} attached` : "No docs attached")}</span></div><div class="outline-item" data-v-bdf46aea${_scopeId}><strong data-v-bdf46aea${_scopeId}>Build log</strong><span data-v-bdf46aea${_scopeId}>Summary note</span></div><div class="outline-item" data-v-bdf46aea${_scopeId}><strong data-v-bdf46aea${_scopeId}>Danger Zone</strong><span data-v-bdf46aea${_scopeId}>Protected delete flow</span></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "outline-list structured-outline" }, [
                    createVNode("div", { class: "outline-item" }, [
                      createVNode("strong", null, "Project basics"),
                      createVNode("span", null, "Title, summary, lab, status")
                    ]),
                    createVNode("div", { class: "outline-item" }, [
                      createVNode("strong", null, "Project memory"),
                      createVNode("span", null, "Structured dossier field")
                    ]),
                    createVNode("div", { class: "outline-item" }, [
                      createVNode("strong", null, "Project index"),
                      createVNode("span", null, "Public overview map")
                    ]),
                    createVNode("div", { class: "outline-item" }, [
                      createVNode("strong", null, "Documentation"),
                      createVNode("span", null, toDisplayString(unref(attachedDocs).length ? `${unref(attachedDocs).length} attached` : "No docs attached"), 1)
                    ]),
                    createVNode("div", { class: "outline-item" }, [
                      createVNode("strong", null, "Build log"),
                      createVNode("span", null, "Summary note")
                    ]),
                    createVNode("div", { class: "outline-item" }, [
                      createVNode("strong", null, "Danger Zone"),
                      createVNode("span", null, "Protected delete flow")
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
          title: "Save",
          eyebrow: "Stage 4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="actions" data-v-bdf46aea${_scopeId}><button class="studio-btn" type="button"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(isSaving) ? "Saving..." : "Save changes")}</button><button class="ghost-btn" type="button" data-v-bdf46aea${_scopeId}>Archive</button></div>`);
              if (unref(statusMessage)) {
                _push2(`<p class="status-copy" data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(statusMessage))}</p>`);
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
              _push2(`<div class="field-stack" data-v-bdf46aea${_scopeId}><label data-v-bdf46aea${_scopeId}> SEO title <input${ssrRenderAttr("value", unref(frontmatter).seoTitle)} type="text" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> SEO description <textarea rows="4" data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).seoDescription)}</textarea></label><label data-v-bdf46aea${_scopeId}> OG title <input${ssrRenderAttr("value", unref(frontmatter).ogTitle)} type="text" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> OG description <textarea rows="4" data-v-bdf46aea${_scopeId}>${ssrInterpolate(unref(frontmatter).ogDescription)}</textarea></label><label data-v-bdf46aea${_scopeId}> OG image <input${ssrRenderAttr("value", unref(frontmatter).ogImage)} type="text" data-v-bdf46aea${_scopeId}></label><label data-v-bdf46aea${_scopeId}> Canonical <input${ssrRenderAttr("value", unref(frontmatter).canonical)} type="text" data-v-bdf46aea${_scopeId}></label><label class="check-row" data-v-bdf46aea${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(frontmatter).noindex) ? ssrLooseContain(unref(frontmatter).noindex, null) : unref(frontmatter).noindex) ? " checked" : ""} type="checkbox" data-v-bdf46aea${_scopeId}> Noindex </label></div>`);
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
              _push2(`<p class="muted" data-v-bdf46aea${_scopeId}>Open a file from Blog, Projects, Docs, or Labs to edit it.</p><button class="ghost-btn" type="button" data-v-bdf46aea${_scopeId}>Back to Studio</button>`);
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
        _push(`<div class="media-picker-backdrop" data-v-bdf46aea><section class="media-picker-panel" data-v-bdf46aea><div class="panel-head" data-v-bdf46aea><div data-v-bdf46aea><p class="eyebrow" data-v-bdf46aea>Media Library</p><h2 data-v-bdf46aea>${ssrInterpolate(unref(mediaPickerMode) === "cover" ? "Choose cover image" : "Choose block image")}</h2></div><div class="media-picker-actions" data-v-bdf46aea><button class="ghost-btn" type="button" data-v-bdf46aea>Upload image</button><button class="ghost-btn" type="button"${ssrIncludeBooleanAttr(unref(mediaPending)) ? " disabled" : ""} data-v-bdf46aea>Refresh</button><button class="ghost-btn" type="button" data-v-bdf46aea>Close</button></div></div>`);
        if (unref(uploadMessage)) {
          _push(`<p class="upload-message" data-v-bdf46aea>${ssrInterpolate(unref(uploadMessage))}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(mediaError)) {
          _push(`<p class="muted" data-v-bdf46aea>${ssrInterpolate(unref(mediaError))}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(mediaPending)) {
          _push(`<p class="muted" data-v-bdf46aea>Reading media library...</p>`);
        } else if (unref(mediaAssets).length) {
          _push(`<div class="media-picker-grid" data-v-bdf46aea><!--[-->`);
          ssrRenderList(unref(mediaAssets), (asset) => {
            _push(`<button class="media-picker-item" type="button" data-v-bdf46aea><img${ssrRenderAttr("src", asset.url)}${ssrRenderAttr("alt", asset.title)} data-v-bdf46aea><strong data-v-bdf46aea>${ssrInterpolate(asset.title)}</strong><span data-v-bdf46aea>${ssrInterpolate(asset.filename)}</span></button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="empty-canvas" data-v-bdf46aea><strong data-v-bdf46aea>No media available yet.</strong><p data-v-bdf46aea>Upload a JPG, PNG or WebP image to start using real Media Library assets.</p><button class="studio-btn" type="button" data-v-bdf46aea>Upload image</button></div>`);
        }
        _push(`</section></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(statusMessage)) {
        _push(`<div class="composer-toast"${ssrRenderAttr("data-state", unref(saveState))} data-v-bdf46aea>${ssrInterpolate(unref(statusMessage))}</div>`);
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
const edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bdf46aea"]]);

export { edit as default };
//# sourceMappingURL=edit-DUzenUKT.mjs.map
