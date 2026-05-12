import { _ as __nuxt_component_0 } from './AdminHero-lJqa4kRI.mjs';
import { _ as __nuxt_component_2 } from './AdminPanel-CPS4BSK_.mjs';
import { _ as __nuxt_component_4 } from './AdminInspector-CoNamQdx.mjs';
import { defineComponent, computed, ref, withAsyncContext, watch, nextTick, mergeProps, unref, withCtx, createVNode, withModifiers, openBlock, createBlock, createTextVNode, withDirectives, isRef, vModelSelect, toDisplayString, vModelText, Fragment, vModelRadio, createCommentVNode, renderList, vModelCheckbox, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, d as useRoute, u as useRouter } from './server.mjs';
import { u as useAdminContent } from './useAdminContent-EIopHvuo.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "new",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const router = useRouter();
    const allowedTypes = ["blog", "projects", "docs", "labs"];
    const labels = {
      blog: "Blog post",
      projects: "Project",
      docs: "Docs page",
      labs: "Lab"
    };
    const normalizeType = (value) => {
      if (value === "project") return "projects";
      if (value === "lab") return "labs";
      return allowedTypes.includes(value) ? value : "";
    };
    const routeType = computed(() => normalizeType(String(route.query.type || "")));
    const hasContextualType = computed(() => allowedTypes.includes(routeType.value));
    const contentType = ref(hasContextualType.value ? routeType.value : "blog");
    const title = ref("");
    const slug = ref("");
    const docsFolder = ref(String(route.query.docsFolder || "tennis-ai-friction"));
    const projectSlug = ref(String(route.query.projectSlug || "tennis-image-analysis"));
    const projectTitle = ref(String(route.query.project || "Tennis Image Analysis Pipeline"));
    const summary = ref("");
    const status = ref("draft");
    const lab = ref(String(route.query.lab || "ai"));
    const year = ref(String((/* @__PURE__ */ new Date()).getFullYear()));
    const stackText = ref("");
    const tagsText = ref("");
    const docsMode = ref(String(route.query.docsMode || "none"));
    const firstDocsTitle = ref("Overview");
    const firstDocsSlug = ref("index");
    const docsFolderMode = ref("existing");
    const selectedExistingDocsFolder = ref(String(route.query.docsFolder || "tennis-ai-friction"));
    const selectedDocs = ref([]);
    const statusMessage = ref("");
    const isCreating = ref(false);
    const isDirect = computed(() => route.query.direct === "true");
    const directStartedFor = ref("");
    const { createContent, listContent } = useAdminContent();
    const { data: projectsData } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("new-content-project-options", () => listContent("projects"))), __temp = await __temp, __restore(), __temp);
    const projectOptions = computed(() => projectsData.value?.items ?? []);
    const { data: docsData } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("new-content-doc-options", () => listContent("docs"))), __temp = await __temp, __restore(), __temp);
    const docsOptions = computed(() => docsData.value?.items ?? []);
    const docsFolderOptions = computed(() => {
      const folders = docsOptions.value.map((item) => item.docsFolder || item.filePath.replace(/^docs\//, "").split("/")[0]).filter(Boolean);
      return Array.from(new Set(folders));
    });
    const docByPath = computed(() => new Map(docsOptions.value.map((doc) => [doc.publicPath, doc])));
    watch(contentType, (nextType) => {
      if (nextType === "docs" && !docsFolder.value) docsFolder.value = "tennis-ai-friction";
    });
    function applyProject(value) {
      const project = projectOptions.value.find((item) => item.slug === value);
      projectSlug.value = value;
      if (project) {
        projectTitle.value = project.title;
        docsFolder.value = project.slug === "tennis-image-analysis" ? "tennis-ai-friction" : project.slug;
      }
    }
    const panelTitle = computed(() => `${labels[contentType.value]} draft setup`);
    const heroTitle = computed(
      () => hasContextualType.value ? `Create a new ${labels[contentType.value].toLowerCase()}.` : "Create a draft in Nuxt Content."
    );
    const splitComma = (value) => value.split(",").map((item) => item.trim()).filter(Boolean);
    const getDocFolder = (doc) => doc?.docsFolder || doc?.filePath.replace(/^docs\//, "").split("/")[0] || "";
    const secondaryDocText = (doc) => `${doc.publicPath} · folder: ${getDocFolder(doc)}`;
    const currentProjectSlug = computed(() => slug.value || projectSlug.value);
    const activeDocsFolder = computed(() => docsFolderMode.value === "new" ? docsFolder.value : selectedExistingDocsFolder.value);
    const docOwner = (doc) => {
      if (doc.projectSlug) {
        return projectOptions.value.find((project) => project.slug === doc.projectSlug) || { slug: doc.projectSlug, title: doc.project || doc.projectSlug };
      }
      if (doc.project) {
        return projectOptions.value.find((project) => project.title === doc.project || project.slug === doc.project) || { slug: doc.project, title: doc.project };
      }
      return projectOptions.value.find((project) => {
        const explicit = [
          project.docsPath,
          ...project.docsPaths ?? [],
          ...project.relatedDocs ?? []
        ].map((item) => String(item)).filter(Boolean);
        return explicit.includes(doc.publicPath) || explicit.includes(doc.publicPath.replace(/^\/docs\//, ""));
      });
    };
    const isAvailableForCurrentProject = (doc) => {
      const owner = docOwner(doc);
      return !owner || owner.slug === currentProjectSlug.value;
    };
    const documentationOptions = computed(() => docsOptions.value.filter(isAvailableForCurrentProject));
    const attachedElsewhereDocs = computed(() => docsOptions.value.filter((doc) => !isAvailableForCurrentProject(doc)));
    const selectedDocItems = computed(() => docsOptions.value.filter((doc) => selectedDocs.value.includes(doc.publicPath)));
    const selectedPrimaryDoc = computed(() => selectedDocs.value[0] || "");
    const selectedPrimaryDocItem = computed(() => docByPath.value.get(selectedPrimaryDoc.value));
    const additionalDocItems = selectedDocItems;
    const docAvailabilityLabel = (doc) => {
      const owner = docOwner(doc);
      return owner ? `attached to ${owner.title}` : "available";
    };
    const createButtonLabel = computed(() => {
      if (contentType.value === "projects") return docsMode.value === "create" ? "Create project and first docs page" : "Create project";
      if (contentType.value === "docs") return "Create docs page";
      return "Create draft";
    });
    function resetForRoute() {
      const nextType = hasContextualType.value ? routeType.value : "blog";
      contentType.value = nextType;
      title.value = "";
      slug.value = "";
      summary.value = "";
      status.value = "draft";
      lab.value = String(route.query.lab || "ai");
      year.value = String((/* @__PURE__ */ new Date()).getFullYear());
      stackText.value = "";
      tagsText.value = "";
      docsMode.value = String(route.query.docsMode || "none");
      docsFolder.value = String(route.query.docsFolder || "tennis-ai-friction");
      selectedExistingDocsFolder.value = String(route.query.docsFolder || "tennis-ai-friction");
      docsFolderMode.value = "existing";
      projectSlug.value = String(route.query.projectSlug || "tennis-image-analysis");
      projectTitle.value = String(route.query.project || "Tennis Image Analysis Pipeline");
      firstDocsTitle.value = "Overview";
      firstDocsSlug.value = "index";
      selectedDocs.value = [];
      statusMessage.value = "";
      directStartedFor.value = "";
    }
    function maybeStartDirectCreate() {
      if (!isDirect.value || !hasContextualType.value || !["blog", "docs", "labs"].includes(contentType.value)) return;
      if (directStartedFor.value === route.fullPath) return;
      directStartedFor.value = route.fullPath;
      const stamp = (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/[-:T]/g, "");
      title.value = contentType.value === "blog" ? "Untitled Blog Entry" : contentType.value === "docs" ? "Untitled Docs Page" : "Untitled Lab";
      slug.value = `${contentType.value === "blog" ? "untitled-blog-entry" : contentType.value === "docs" ? "untitled-docs-page" : "untitled-lab"}-${stamp}`;
      createDraft();
    }
    async function createDraft() {
      isCreating.value = true;
      statusMessage.value = "";
      try {
        if (contentType.value === "projects" && docsMode.value === "attach" && selectedDocs.value.length === 0) {
          statusMessage.value = "Select at least one existing documentation page or choose No documentation yet.";
          return;
        }
        const firstSelectedDoc = docByPath.value.get(selectedDocs.value[0]);
        const resolvedDocsFolder = contentType.value === "projects" && docsMode.value === "attach" ? getDocFolder(firstSelectedDoc) || docsFolder.value : activeDocsFolder.value;
        const extra = contentType.value === "docs" ? {
          docsFolder: activeDocsFolder.value,
          projectSlug: projectSlug.value,
          project: projectTitle.value,
          relatedProject: projectSlug.value,
          lab: lab.value
        } : contentType.value === "projects" ? {
          summary: summary.value,
          description: summary.value,
          status: status.value,
          lab: lab.value,
          year: year.value,
          stack: stackText.value,
          tags: splitComma(tagsText.value),
          docsFolder: docsMode.value === "none" ? "" : resolvedDocsFolder,
          docsPath: docsMode.value === "none" ? "" : docsMode.value === "attach" ? selectedDocs.value[0] || "" : `/docs/${activeDocsFolder.value}`,
          docsPaths: docsMode.value === "attach" ? selectedDocs.value : [],
          relatedDocs: docsMode.value === "attach" ? selectedDocs.value : []
        } : { lab: lab.value, status: status.value };
        const response = await createContent(
          contentType.value,
          title.value || "Untitled draft",
          slug.value,
          activeDocsFolder.value,
          extra
        );
        if (contentType.value === "projects" && docsMode.value === "create") {
          const projectFile = response.item.frontmatter;
          const docsResponse = await createContent(
            "docs",
            firstDocsTitle.value || `${projectFile.title} documentation`,
            firstDocsSlug.value || "index",
            activeDocsFolder.value || String(projectFile.slug),
            {
              docsFolder: activeDocsFolder.value || String(projectFile.slug),
              projectSlug: String(projectFile.slug),
              project: String(projectFile.title),
              relatedProject: String(projectFile.slug),
              lab: String(projectFile.lab || lab.value)
            }
          );
          await router.push(`/admin/content/edit?type=docs&file=${encodeURIComponent(docsResponse.item.filePath)}`);
          return;
        }
        if (contentType.value === "projects") {
          await router.push("/admin/projects");
          return;
        }
        await router.push(`/admin/content/edit?type=${contentType.value}&file=${encodeURIComponent(response.item.filePath)}`);
      } catch (error) {
        statusMessage.value = error?.data?.statusMessage || error?.message || "Create failed.";
      } finally {
        isCreating.value = false;
      }
    }
    watch(() => route.fullPath, () => {
      resetForRoute();
      nextTick(maybeStartDirectCreate);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminHero = __nuxt_component_0;
      const _component_AdminPanel = __nuxt_component_2;
      const _component_AdminInspector = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-473bd2bc>`);
      _push(ssrRenderComponent(_component_AdminHero, {
        eyebrow: "New content",
        title: unref(heroTitle),
        description: "Create an editable draft in the current Nuxt Content structure."
      }, null, _parent));
      _push(`<section class="new-grid" data-v-473bd2bc>`);
      if (!unref(isDirect) || !["blog", "docs", "labs"].includes(unref(contentType))) {
        _push(ssrRenderComponent(_component_AdminPanel, {
          title: unref(panelTitle),
          eyebrow: "File creation"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<form class="new-form" data-v-473bd2bc${_scopeId}>`);
              if (!unref(hasContextualType)) {
                _push2(`<label data-v-473bd2bc${_scopeId}> Content type <select data-v-473bd2bc${_scopeId}><option value="blog" data-v-473bd2bc${ssrIncludeBooleanAttr(Array.isArray(unref(contentType)) ? ssrLooseContain(unref(contentType), "blog") : ssrLooseEqual(unref(contentType), "blog")) ? " selected" : ""}${_scopeId}>Blog post</option><option value="projects" data-v-473bd2bc${ssrIncludeBooleanAttr(Array.isArray(unref(contentType)) ? ssrLooseContain(unref(contentType), "projects") : ssrLooseEqual(unref(contentType), "projects")) ? " selected" : ""}${_scopeId}>Project</option><option value="docs" data-v-473bd2bc${ssrIncludeBooleanAttr(Array.isArray(unref(contentType)) ? ssrLooseContain(unref(contentType), "docs") : ssrLooseEqual(unref(contentType), "docs")) ? " selected" : ""}${_scopeId}>Docs page</option><option value="labs" data-v-473bd2bc${ssrIncludeBooleanAttr(Array.isArray(unref(contentType)) ? ssrLooseContain(unref(contentType), "labs") : ssrLooseEqual(unref(contentType), "labs")) ? " selected" : ""}${_scopeId}>Lab</option></select></label>`);
              } else {
                _push2(`<div class="fixed-type" data-v-473bd2bc${_scopeId}><span data-v-473bd2bc${_scopeId}>Content type</span><strong data-v-473bd2bc${_scopeId}>${ssrInterpolate(labels[unref(contentType)])}</strong></div>`);
              }
              _push2(`<label data-v-473bd2bc${_scopeId}> Title <input${ssrRenderAttr("value", unref(title))} type="text" required placeholder="A draft title" data-v-473bd2bc${_scopeId}></label><label data-v-473bd2bc${_scopeId}> Slug <input${ssrRenderAttr("value", unref(slug))} type="text" placeholder="generated-from-title" data-v-473bd2bc${_scopeId}></label>`);
              if (unref(contentType) === "projects") {
                _push2(`<!--[--><label data-v-473bd2bc${_scopeId}> Summary <textarea rows="3" placeholder="A short dossier description" data-v-473bd2bc${_scopeId}>${ssrInterpolate(unref(summary))}</textarea></label><label data-v-473bd2bc${_scopeId}> Lab <input${ssrRenderAttr("value", unref(lab))} type="text" placeholder="ai" data-v-473bd2bc${_scopeId}></label><label data-v-473bd2bc${_scopeId}> Status <input${ssrRenderAttr("value", unref(status))} type="text" placeholder="draft" data-v-473bd2bc${_scopeId}></label><label data-v-473bd2bc${_scopeId}> Year <input${ssrRenderAttr("value", unref(year))} type="number" data-v-473bd2bc${_scopeId}></label><label data-v-473bd2bc${_scopeId}> Stack <input${ssrRenderAttr("value", unref(stackText))} type="text" placeholder="Nuxt, Python" data-v-473bd2bc${_scopeId}></label><label data-v-473bd2bc${_scopeId}> Tags <input${ssrRenderAttr("value", unref(tagsText))} type="text" placeholder="ai, systems, archive" data-v-473bd2bc${_scopeId}></label><div class="documentation-setup" data-v-473bd2bc${_scopeId}><p class="setup-title" data-v-473bd2bc${_scopeId}>Documentation</p><label class="radio-row" data-v-473bd2bc${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(docsMode), "none")) ? " checked" : ""} type="radio" value="none" data-v-473bd2bc${_scopeId}> No documentation yet </label><label class="radio-row" data-v-473bd2bc${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(docsMode), "attach")) ? " checked" : ""} type="radio" value="attach" data-v-473bd2bc${_scopeId}> Attach existing documentation </label><label class="radio-row" data-v-473bd2bc${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(docsMode), "create")) ? " checked" : ""} type="radio" value="create" data-v-473bd2bc${_scopeId}> Create first docs page </label></div>`);
                if (unref(docsMode) === "attach") {
                  _push2(`<section class="attach-docs-panel" data-v-473bd2bc${_scopeId}><div data-v-473bd2bc${_scopeId}><h3 data-v-473bd2bc${_scopeId}>Attach existing documentation</h3><p data-v-473bd2bc${_scopeId}>Select one or more available documentation pages to attach to this project.</p></div>`);
                  {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="doc-picker" data-v-473bd2bc${_scopeId}><p class="picker-title" data-v-473bd2bc${_scopeId}>Documentation pages</p>`);
                  if (!unref(documentationOptions).length) {
                    _push2(`<p class="muted" data-v-473bd2bc${_scopeId}>No available documentation found. Use Create first docs page instead.</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<!--[-->`);
                  ssrRenderList(unref(documentationOptions), (doc) => {
                    _push2(`<label class="doc-choice" data-v-473bd2bc${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(selectedDocs)) ? ssrLooseContain(unref(selectedDocs), doc.publicPath) : unref(selectedDocs)) ? " checked" : ""} type="checkbox"${ssrRenderAttr("value", doc.publicPath)} data-v-473bd2bc${_scopeId}><span data-v-473bd2bc${_scopeId}><strong data-v-473bd2bc${_scopeId}>${ssrInterpolate(doc.title)}</strong><small data-v-473bd2bc${_scopeId}>${ssrInterpolate(secondaryDocText(doc))}</small><small data-v-473bd2bc${_scopeId}>Status: ${ssrInterpolate(docAvailabilityLabel(doc))}</small></span></label>`);
                  });
                  _push2(`<!--]--></div><div class="selected-summary" data-v-473bd2bc${_scopeId}><strong data-v-473bd2bc${_scopeId}>Selected documentation</strong>`);
                  if (!unref(selectedDocItems).length) {
                    _push2(`<p data-v-473bd2bc${_scopeId}>No documentation selected yet.</p>`);
                  } else {
                    _push2(`<p data-v-473bd2bc${_scopeId}>${ssrInterpolate(unref(selectedPrimaryDocItem)?.title || "Primary inferred from first selected page")} · ${ssrInterpolate(unref(additionalDocItems).length)} additional page${ssrInterpolate(unref(additionalDocItems).length === 1 ? "" : "s")}</p>`);
                  }
                  _push2(`</div><div class="docs-selected-summary" data-v-473bd2bc${_scopeId}><strong data-v-473bd2bc${_scopeId}>Selected documentation</strong>`);
                  if (!unref(selectedDocItems).length) {
                    _push2(`<p data-v-473bd2bc${_scopeId}>No documentation selected yet.</p>`);
                  } else {
                    _push2(`<p data-v-473bd2bc${_scopeId}>${ssrInterpolate(unref(selectedDocItems).length)} page${ssrInterpolate(unref(selectedDocItems).length === 1 ? "" : "s")} selected.</p>`);
                  }
                  _push2(`</div>`);
                  if (unref(attachedElsewhereDocs).length) {
                    _push2(`<details class="attached-elsewhere" data-v-473bd2bc${_scopeId}><summary data-v-473bd2bc${_scopeId}>Already attached to another project</summary><!--[-->`);
                    ssrRenderList(unref(attachedElsewhereDocs), (doc) => {
                      _push2(`<article class="disabled-doc" data-v-473bd2bc${_scopeId}><strong data-v-473bd2bc${_scopeId}>${ssrInterpolate(doc.title)}</strong><small data-v-473bd2bc${_scopeId}>${ssrInterpolate(secondaryDocText(doc))} - ${ssrInterpolate(docAvailabilityLabel(doc))}</small></article>`);
                    });
                    _push2(`<!--]--></details>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</section>`);
                } else {
                  _push2(`<!---->`);
                }
                if (unref(docsMode) === "create") {
                  _push2(`<!--[--><section class="folder-picker" data-v-473bd2bc${_scopeId}><p class="picker-title" data-v-473bd2bc${_scopeId}>Documentation folder</p><label class="radio-row" data-v-473bd2bc${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(docsFolderMode), "existing")) ? " checked" : ""} type="radio" value="existing" data-v-473bd2bc${_scopeId}> Select existing folder </label>`);
                  if (unref(docsFolderMode) === "existing") {
                    _push2(`<label data-v-473bd2bc${_scopeId}> Existing docs folder <select data-v-473bd2bc${_scopeId}><!--[-->`);
                    ssrRenderList(unref(docsFolderOptions), (folder) => {
                      _push2(`<option${ssrRenderAttr("value", folder)} data-v-473bd2bc${ssrIncludeBooleanAttr(Array.isArray(unref(selectedExistingDocsFolder)) ? ssrLooseContain(unref(selectedExistingDocsFolder), folder) : ssrLooseEqual(unref(selectedExistingDocsFolder), folder)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(folder)}</option>`);
                    });
                    _push2(`<!--]--></select></label>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<label class="radio-row" data-v-473bd2bc${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(docsFolderMode), "new")) ? " checked" : ""} type="radio" value="new" data-v-473bd2bc${_scopeId}> Create new folder </label>`);
                  if (unref(docsFolderMode) === "new") {
                    _push2(`<label data-v-473bd2bc${_scopeId}> New docs folder <input${ssrRenderAttr("value", unref(docsFolder))} type="text" placeholder="project-docs-folder" data-v-473bd2bc${_scopeId}></label>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</section><label data-v-473bd2bc${_scopeId}> First docs title <input${ssrRenderAttr("value", unref(firstDocsTitle))} type="text" placeholder="Overview" data-v-473bd2bc${_scopeId}></label><label data-v-473bd2bc${_scopeId}> First docs slug <input${ssrRenderAttr("value", unref(firstDocsSlug))} type="text" placeholder="index" data-v-473bd2bc${_scopeId}></label><!--]-->`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(contentType) === "docs") {
                _push2(`<!--[--><label data-v-473bd2bc${_scopeId}> Related project <select data-v-473bd2bc${_scopeId}><!--[-->`);
                ssrRenderList(unref(projectOptions), (project) => {
                  _push2(`<option${ssrRenderAttr("value", project.slug)} data-v-473bd2bc${ssrIncludeBooleanAttr(Array.isArray(unref(projectSlug)) ? ssrLooseContain(unref(projectSlug), project.slug) : ssrLooseEqual(unref(projectSlug), project.slug)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(project.title)}</option>`);
                });
                _push2(`<!--]--></select></label><label data-v-473bd2bc${_scopeId}> Project title <input${ssrRenderAttr("value", unref(projectTitle))} type="text" placeholder="Tennis Image Analysis Pipeline" data-v-473bd2bc${_scopeId}></label><label data-v-473bd2bc${_scopeId}> Project slug <input${ssrRenderAttr("value", unref(projectSlug))} type="text" required placeholder="tennis-image-analysis" data-v-473bd2bc${_scopeId}></label><section class="folder-picker" data-v-473bd2bc${_scopeId}><p class="picker-title" data-v-473bd2bc${_scopeId}>Documentation folder</p><label class="radio-row" data-v-473bd2bc${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(docsFolderMode), "existing")) ? " checked" : ""} type="radio" value="existing" data-v-473bd2bc${_scopeId}> Select existing folder </label>`);
                if (unref(docsFolderMode) === "existing") {
                  _push2(`<label data-v-473bd2bc${_scopeId}> Existing docs folder <select data-v-473bd2bc${_scopeId}><!--[-->`);
                  ssrRenderList(unref(docsFolderOptions), (folder) => {
                    _push2(`<option${ssrRenderAttr("value", folder)} data-v-473bd2bc${ssrIncludeBooleanAttr(Array.isArray(unref(selectedExistingDocsFolder)) ? ssrLooseContain(unref(selectedExistingDocsFolder), folder) : ssrLooseEqual(unref(selectedExistingDocsFolder), folder)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(folder)}</option>`);
                  });
                  _push2(`<!--]--></select></label>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<label class="radio-row" data-v-473bd2bc${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(docsFolderMode), "new")) ? " checked" : ""} type="radio" value="new" data-v-473bd2bc${_scopeId}> Create new folder </label>`);
                if (unref(docsFolderMode) === "new") {
                  _push2(`<label data-v-473bd2bc${_scopeId}> New docs folder <input${ssrRenderAttr("value", unref(docsFolder))} type="text" required placeholder="tennis-ai-friction" data-v-473bd2bc${_scopeId}></label>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</section><!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<button class="studio-btn" type="submit"${ssrIncludeBooleanAttr(unref(isCreating)) ? " disabled" : ""} data-v-473bd2bc${_scopeId}>${ssrInterpolate(unref(isCreating) ? "Creating..." : unref(createButtonLabel))}</button>`);
              if (unref(statusMessage)) {
                _push2(`<p class="muted" data-v-473bd2bc${_scopeId}>${ssrInterpolate(unref(statusMessage))}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</form>`);
            } else {
              return [
                createVNode("form", {
                  class: "new-form",
                  onSubmit: withModifiers(createDraft, ["prevent"])
                }, [
                  !unref(hasContextualType) ? (openBlock(), createBlock("label", { key: 0 }, [
                    createTextVNode(" Content type "),
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => isRef(contentType) ? contentType.value = $event : null
                    }, [
                      createVNode("option", { value: "blog" }, "Blog post"),
                      createVNode("option", { value: "projects" }, "Project"),
                      createVNode("option", { value: "docs" }, "Docs page"),
                      createVNode("option", { value: "labs" }, "Lab")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, unref(contentType)]
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "fixed-type"
                  }, [
                    createVNode("span", null, "Content type"),
                    createVNode("strong", null, toDisplayString(labels[unref(contentType)]), 1)
                  ])),
                  createVNode("label", null, [
                    createTextVNode(" Title "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => isRef(title) ? title.value = $event : null,
                      type: "text",
                      required: "",
                      placeholder: "A draft title"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(title)]
                    ])
                  ]),
                  createVNode("label", null, [
                    createTextVNode(" Slug "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => isRef(slug) ? slug.value = $event : null,
                      type: "text",
                      placeholder: "generated-from-title"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(slug)]
                    ])
                  ]),
                  unref(contentType) === "projects" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                    createVNode("label", null, [
                      createTextVNode(" Summary "),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => isRef(summary) ? summary.value = $event : null,
                        rows: "3",
                        placeholder: "A short dossier description"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(summary)]
                      ])
                    ]),
                    createVNode("label", null, [
                      createTextVNode(" Lab "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => isRef(lab) ? lab.value = $event : null,
                        type: "text",
                        placeholder: "ai"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(lab)]
                      ])
                    ]),
                    createVNode("label", null, [
                      createTextVNode(" Status "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => isRef(status) ? status.value = $event : null,
                        type: "text",
                        placeholder: "draft"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(status)]
                      ])
                    ]),
                    createVNode("label", null, [
                      createTextVNode(" Year "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => isRef(year) ? year.value = $event : null,
                        type: "number"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(year)]
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
                    ]),
                    createVNode("label", null, [
                      createTextVNode(" Tags "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => isRef(tagsText) ? tagsText.value = $event : null,
                        type: "text",
                        placeholder: "ai, systems, archive"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(tagsText)]
                      ])
                    ]),
                    createVNode("div", { class: "documentation-setup" }, [
                      createVNode("p", { class: "setup-title" }, "Documentation"),
                      createVNode("label", { class: "radio-row" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => isRef(docsMode) ? docsMode.value = $event : null,
                          type: "radio",
                          value: "none"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelRadio, unref(docsMode)]
                        ]),
                        createTextVNode(" No documentation yet ")
                      ]),
                      createVNode("label", { class: "radio-row" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => isRef(docsMode) ? docsMode.value = $event : null,
                          type: "radio",
                          value: "attach"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelRadio, unref(docsMode)]
                        ]),
                        createTextVNode(" Attach existing documentation ")
                      ]),
                      createVNode("label", { class: "radio-row" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => isRef(docsMode) ? docsMode.value = $event : null,
                          type: "radio",
                          value: "create"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelRadio, unref(docsMode)]
                        ]),
                        createTextVNode(" Create first docs page ")
                      ])
                    ]),
                    unref(docsMode) === "attach" ? (openBlock(), createBlock("section", {
                      key: 0,
                      class: "attach-docs-panel"
                    }, [
                      createVNode("div", null, [
                        createVNode("h3", null, "Attach existing documentation"),
                        createVNode("p", null, "Select one or more available documentation pages to attach to this project.")
                      ]),
                      createCommentVNode("", true),
                      createVNode("div", { class: "doc-picker" }, [
                        createVNode("p", { class: "picker-title" }, "Documentation pages"),
                        !unref(documentationOptions).length ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "muted"
                        }, "No available documentation found. Use Create first docs page instead.")) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(documentationOptions), (doc) => {
                          return openBlock(), createBlock("label", {
                            key: doc.filePath,
                            class: "doc-choice"
                          }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => isRef(selectedDocs) ? selectedDocs.value = $event : null,
                              type: "checkbox",
                              value: doc.publicPath
                            }, null, 8, ["onUpdate:modelValue", "value"]), [
                              [vModelCheckbox, unref(selectedDocs)]
                            ]),
                            createVNode("span", null, [
                              createVNode("strong", null, toDisplayString(doc.title), 1),
                              createVNode("small", null, toDisplayString(secondaryDocText(doc)), 1),
                              createVNode("small", null, "Status: " + toDisplayString(docAvailabilityLabel(doc)), 1)
                            ])
                          ]);
                        }), 128))
                      ]),
                      createVNode("div", { class: "selected-summary" }, [
                        createVNode("strong", null, "Selected documentation"),
                        !unref(selectedDocItems).length ? (openBlock(), createBlock("p", { key: 0 }, "No documentation selected yet.")) : (openBlock(), createBlock("p", { key: 1 }, toDisplayString(unref(selectedPrimaryDocItem)?.title || "Primary inferred from first selected page") + " · " + toDisplayString(unref(additionalDocItems).length) + " additional page" + toDisplayString(unref(additionalDocItems).length === 1 ? "" : "s"), 1))
                      ]),
                      createVNode("div", { class: "docs-selected-summary" }, [
                        createVNode("strong", null, "Selected documentation"),
                        !unref(selectedDocItems).length ? (openBlock(), createBlock("p", { key: 0 }, "No documentation selected yet.")) : (openBlock(), createBlock("p", { key: 1 }, toDisplayString(unref(selectedDocItems).length) + " page" + toDisplayString(unref(selectedDocItems).length === 1 ? "" : "s") + " selected.", 1))
                      ]),
                      unref(attachedElsewhereDocs).length ? (openBlock(), createBlock("details", {
                        key: 1,
                        class: "attached-elsewhere"
                      }, [
                        createVNode("summary", null, "Already attached to another project"),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(attachedElsewhereDocs), (doc) => {
                          return openBlock(), createBlock("article", {
                            key: doc.filePath,
                            class: "disabled-doc"
                          }, [
                            createVNode("strong", null, toDisplayString(doc.title), 1),
                            createVNode("small", null, toDisplayString(secondaryDocText(doc)) + " - " + toDisplayString(docAvailabilityLabel(doc)), 1)
                          ]);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true),
                    unref(docsMode) === "create" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createVNode("section", { class: "folder-picker" }, [
                        createVNode("p", { class: "picker-title" }, "Documentation folder"),
                        createVNode("label", { class: "radio-row" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => isRef(docsFolderMode) ? docsFolderMode.value = $event : null,
                            type: "radio",
                            value: "existing"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelRadio, unref(docsFolderMode)]
                          ]),
                          createTextVNode(" Select existing folder ")
                        ]),
                        unref(docsFolderMode) === "existing" ? (openBlock(), createBlock("label", { key: 0 }, [
                          createTextVNode(" Existing docs folder "),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => isRef(selectedExistingDocsFolder) ? selectedExistingDocsFolder.value = $event : null
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(docsFolderOptions), (folder) => {
                              return openBlock(), createBlock("option", {
                                key: folder,
                                value: folder
                              }, toDisplayString(folder), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(selectedExistingDocsFolder)]
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("label", { class: "radio-row" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => isRef(docsFolderMode) ? docsFolderMode.value = $event : null,
                            type: "radio",
                            value: "new"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelRadio, unref(docsFolderMode)]
                          ]),
                          createTextVNode(" Create new folder ")
                        ]),
                        unref(docsFolderMode) === "new" ? (openBlock(), createBlock("label", { key: 1 }, [
                          createTextVNode(" New docs folder "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => isRef(docsFolder) ? docsFolder.value = $event : null,
                            type: "text",
                            placeholder: "project-docs-folder"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(docsFolder)]
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("label", null, [
                        createTextVNode(" First docs title "),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => isRef(firstDocsTitle) ? firstDocsTitle.value = $event : null,
                          type: "text",
                          placeholder: "Overview"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(firstDocsTitle)]
                        ])
                      ]),
                      createVNode("label", null, [
                        createTextVNode(" First docs slug "),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => isRef(firstDocsSlug) ? firstDocsSlug.value = $event : null,
                          type: "text",
                          placeholder: "index"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(firstDocsSlug)]
                        ])
                      ])
                    ], 64)) : createCommentVNode("", true)
                  ], 64)) : createCommentVNode("", true),
                  unref(contentType) === "docs" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                    createVNode("label", null, [
                      createTextVNode(" Related project "),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => isRef(projectSlug) ? projectSlug.value = $event : null,
                        onChange: ($event) => applyProject(unref(projectSlug))
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(projectOptions), (project) => {
                          return openBlock(), createBlock("option", {
                            key: project.filePath,
                            value: project.slug
                          }, toDisplayString(project.title), 9, ["value"]);
                        }), 128))
                      ], 40, ["onUpdate:modelValue", "onChange"]), [
                        [vModelSelect, unref(projectSlug)]
                      ])
                    ]),
                    createVNode("label", null, [
                      createTextVNode(" Project title "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => isRef(projectTitle) ? projectTitle.value = $event : null,
                        type: "text",
                        placeholder: "Tennis Image Analysis Pipeline"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(projectTitle)]
                      ])
                    ]),
                    createVNode("label", null, [
                      createTextVNode(" Project slug "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => isRef(projectSlug) ? projectSlug.value = $event : null,
                        type: "text",
                        required: "",
                        placeholder: "tennis-image-analysis"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(projectSlug)]
                      ])
                    ]),
                    createVNode("section", { class: "folder-picker" }, [
                      createVNode("p", { class: "picker-title" }, "Documentation folder"),
                      createVNode("label", { class: "radio-row" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => isRef(docsFolderMode) ? docsFolderMode.value = $event : null,
                          type: "radio",
                          value: "existing"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelRadio, unref(docsFolderMode)]
                        ]),
                        createTextVNode(" Select existing folder ")
                      ]),
                      unref(docsFolderMode) === "existing" ? (openBlock(), createBlock("label", { key: 0 }, [
                        createTextVNode(" Existing docs folder "),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => isRef(selectedExistingDocsFolder) ? selectedExistingDocsFolder.value = $event : null
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(docsFolderOptions), (folder) => {
                            return openBlock(), createBlock("option", {
                              key: folder,
                              value: folder
                            }, toDisplayString(folder), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(selectedExistingDocsFolder)]
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("label", { class: "radio-row" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => isRef(docsFolderMode) ? docsFolderMode.value = $event : null,
                          type: "radio",
                          value: "new"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelRadio, unref(docsFolderMode)]
                        ]),
                        createTextVNode(" Create new folder ")
                      ]),
                      unref(docsFolderMode) === "new" ? (openBlock(), createBlock("label", { key: 1 }, [
                        createTextVNode(" New docs folder "),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => isRef(docsFolder) ? docsFolder.value = $event : null,
                          type: "text",
                          required: "",
                          placeholder: "tennis-ai-friction"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(docsFolder)]
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ], 64)) : createCommentVNode("", true),
                  createVNode("button", {
                    class: "studio-btn",
                    type: "submit",
                    disabled: unref(isCreating)
                  }, toDisplayString(unref(isCreating) ? "Creating..." : unref(createButtonLabel)), 9, ["disabled"]),
                  unref(statusMessage) ? (openBlock(), createBlock("p", {
                    key: 4,
                    class: "muted"
                  }, toDisplayString(unref(statusMessage)), 1)) : createCommentVNode("", true)
                ], 32)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_AdminPanel, {
          title: "Opening editor",
          eyebrow: "Direct flow"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p class="muted" data-v-473bd2bc${_scopeId}>Creating a draft and opening the editor directly...</p>`);
            } else {
              return [
                createVNode("p", { class: "muted" }, "Creating a draft and opening the editor directly...")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(ssrRenderComponent(_component_AdminInspector, {
        title: "Creation rules",
        items: [
          { label: "Mode", value: unref(hasContextualType) ? "Contextual" : "Global" },
          { label: "Type", value: labels[unref(contentType)] },
          { label: "Write scope", value: "content only" },
          { label: "Overwrite", value: "Blocked" },
          { label: "Status", value: "draft" }
        ]
      }, null, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/content/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _new = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-473bd2bc"]]);

export { _new as default };
//# sourceMappingURL=new-CVtKoTrF.mjs.map
