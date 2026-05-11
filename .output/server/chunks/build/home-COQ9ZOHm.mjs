import { _ as __nuxt_component_0 } from './AdminHero-lJqa4kRI.mjs';
import { _ as __nuxt_component_2 } from './AdminPanel-CPS4BSK_.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BzjT64JD.mjs';
import { _ as __nuxt_component_5 } from './AdminPreviewPanel-C15Jt5ST.mjs';
import { defineComponent, ref, reactive, withAsyncContext, watch, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, withDirectives, vModelText, vModelRadio, openBlock, createBlock, Fragment, renderList, toDisplayString, vModelSelect, createCommentVNode, vModelCheckbox, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseEqual, ssrLooseContain, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, f as useRequestHeaders } from './server.mjs';
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
  __name: "home",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const requestHeaders = useRequestHeaders(["cookie"]);
    const isSaving = ref(false);
    const statusMessage = ref("");
    const selectedFeedType = ref("blog");
    const selectedFeedSlug = ref("");
    const emptyLayout = () => ({
      hero: {
        label: "Digital systems magazine-lab",
        headline: "Ideas that become systems.",
        description: "Gribo Digital documents systems, prototypes, research notes and cultural infrastructure through a living editorial archive.",
        primaryCta: { label: "Explore projects", to: "/repository" },
        secondaryCta: { label: "Explore labs", to: "/labs" }
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
    });
    const editor = reactive(emptyLayout());
    const { data: layoutResponse, refresh: refreshLayout } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-home-layout", () => $fetch("/api/admin/home-layout", {
      headers: requestHeaders
    }))), __temp = await __temp, __restore(), __temp);
    const { data: contentResponse, refresh: refreshContent } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-home-content-list", () => $fetch("/api/admin/content/list", {
      headers: requestHeaders
    }))), __temp = await __temp, __restore(), __temp);
    function cloneLayout(layout) {
      return JSON.parse(JSON.stringify(layout));
    }
    function applyLayout(layout) {
      Object.assign(editor, cloneLayout(layout));
    }
    watch(layoutResponse, (response) => {
      if (response?.layout) applyLayout(response.layout);
    }, { immediate: true });
    const contentItems = computed(() => contentResponse.value?.items ?? []);
    const projects = computed(() => contentItems.value.filter((item) => item.contentType === "projects"));
    const blogPosts = computed(() => contentItems.value.filter((item) => item.contentType === "blog"));
    const labs = computed(() => contentItems.value.filter((item) => item.contentType === "labs"));
    const selectableContent = computed(() => ({
      blog: blogPosts.value,
      projects: projects.value,
      labs: labs.value
    }));
    const featuredProject = computed(() => projects.value.find((project) => project.slug === editor.featuredProject.slug));
    const previewFeedItems = computed(() => {
      const manual = editor.feed.manualItems.map((item) => selectableContent.value[item.type].find((entry) => entry.slug === item.slug)).filter((item) => Boolean(item));
      const latest = [
        ...editor.feed.contentTypes.includes("blog") ? blogPosts.value : [],
        ...editor.feed.contentTypes.includes("projects") ? projects.value : [],
        ...editor.feed.contentTypes.includes("labs") ? labs.value : []
      ];
      const source = editor.feed.mode === "manual" ? manual : editor.feed.mode === "mixed" ? [...manual, ...latest] : latest;
      return source.filter((item, index, list) => list.findIndex((entry) => entry.publicPath === item.publicPath) === index).slice(0, editor.feed.limit);
    });
    const validationErrors = computed(() => {
      const errors = [];
      if (!editor.hero.headline.trim()) errors.push("Hero headline is required.");
      if (editor.featuredProject.mode === "manual" && !featuredProject.value) errors.push("Choose an existing featured project.");
      if (!Number.isFinite(Number(editor.buildLog.limit)) || Number(editor.buildLog.limit) < 1) errors.push("Build log limit must be a positive number.");
      if (!Number.isFinite(Number(editor.feed.limit)) || Number(editor.feed.limit) < 1) errors.push("Feed limit must be a positive number.");
      const missingManualItems = editor.feed.manualItems.filter((item) => !selectableContent.value[item.type].some((entry) => entry.slug === item.slug));
      if (missingManualItems.length) errors.push("One or more manual feed items no longer exist.");
      return errors;
    });
    function addBuildItem() {
      editor.buildLog.manualItems.push({
        date: "Now",
        title: "New build note",
        meta: "A short progress note from the Gribo build."
      });
    }
    function removeBuildItem(index) {
      editor.buildLog.manualItems.splice(index, 1);
    }
    function addFeedItem() {
      if (!selectedFeedSlug.value) return;
      const exists = editor.feed.manualItems.some((item) => item.type === selectedFeedType.value && item.slug === selectedFeedSlug.value);
      if (!exists) {
        editor.feed.manualItems.push({
          type: selectedFeedType.value,
          slug: selectedFeedSlug.value
        });
      }
    }
    function removeFeedItem(index) {
      editor.feed.manualItems.splice(index, 1);
    }
    function getContentLabel(item) {
      return selectableContent.value[item.type].find((entry) => entry.slug === item.slug)?.title ?? item.slug;
    }
    async function reloadComposer() {
      statusMessage.value = "Reloading Home layout...";
      await Promise.all([refreshLayout(), refreshContent()]);
      if (layoutResponse.value?.layout) applyLayout(layoutResponse.value.layout);
      statusMessage.value = "Home layout reloaded.";
    }
    async function saveLayout() {
      statusMessage.value = "";
      if (validationErrors.value.length) {
        statusMessage.value = validationErrors.value[0];
        return;
      }
      isSaving.value = true;
      try {
        const response = await $fetch("/api/admin/home-layout/save", {
          method: "POST",
          body: {
            layout: cloneLayout(editor)
          }
        });
        applyLayout(response.layout);
        statusMessage.value = "Home layout saved. The public home will use these values.";
        await refreshLayout();
      } catch (error) {
        statusMessage.value = error?.statusMessage || "Home layout could not be saved.";
      } finally {
        isSaving.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminHero = __nuxt_component_0;
      const _component_AdminPanel = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AdminPreviewPanel = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-2251dd47>`);
      _push(ssrRenderComponent(_component_AdminHero, {
        eyebrow: "Home Composer",
        title: "Edit the public front page.",
        description: "Functional editor for the hero, featured project, build log and editorial feed stored in content/home/layout.json."
      }, null, _parent));
      _push(`<section class="composer-layout" data-v-2251dd47><div class="composer-stack" data-v-2251dd47>`);
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Hero",
        eyebrow: "Public identity"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="form-grid" data-v-2251dd47${_scopeId}><label data-v-2251dd47${_scopeId}> Label <input${ssrRenderAttr("value", unref(editor).hero.label)} type="text" data-v-2251dd47${_scopeId}></label><label data-v-2251dd47${_scopeId}> Headline <textarea rows="2" data-v-2251dd47${_scopeId}>${ssrInterpolate(unref(editor).hero.headline)}</textarea></label><label class="wide" data-v-2251dd47${_scopeId}> Description <textarea rows="3" data-v-2251dd47${_scopeId}>${ssrInterpolate(unref(editor).hero.description)}</textarea></label><label data-v-2251dd47${_scopeId}> Primary CTA label <input${ssrRenderAttr("value", unref(editor).hero.primaryCta.label)} type="text" data-v-2251dd47${_scopeId}></label><label data-v-2251dd47${_scopeId}> Primary CTA target <input${ssrRenderAttr("value", unref(editor).hero.primaryCta.to)} type="text" data-v-2251dd47${_scopeId}></label><label data-v-2251dd47${_scopeId}> Secondary CTA label <input${ssrRenderAttr("value", unref(editor).hero.secondaryCta.label)} type="text" data-v-2251dd47${_scopeId}></label><label data-v-2251dd47${_scopeId}> Secondary CTA target <input${ssrRenderAttr("value", unref(editor).hero.secondaryCta.to)} type="text" data-v-2251dd47${_scopeId}></label></div>`);
          } else {
            return [
              createVNode("div", { class: "form-grid" }, [
                createVNode("label", null, [
                  createTextVNode(" Label "),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(editor).hero.label = $event,
                    type: "text"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(editor).hero.label]
                  ])
                ]),
                createVNode("label", null, [
                  createTextVNode(" Headline "),
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => unref(editor).hero.headline = $event,
                    rows: "2"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(editor).hero.headline]
                  ])
                ]),
                createVNode("label", { class: "wide" }, [
                  createTextVNode(" Description "),
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => unref(editor).hero.description = $event,
                    rows: "3"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(editor).hero.description]
                  ])
                ]),
                createVNode("label", null, [
                  createTextVNode(" Primary CTA label "),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(editor).hero.primaryCta.label = $event,
                    type: "text"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(editor).hero.primaryCta.label]
                  ])
                ]),
                createVNode("label", null, [
                  createTextVNode(" Primary CTA target "),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(editor).hero.primaryCta.to = $event,
                    type: "text"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(editor).hero.primaryCta.to]
                  ])
                ]),
                createVNode("label", null, [
                  createTextVNode(" Secondary CTA label "),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(editor).hero.secondaryCta.label = $event,
                    type: "text"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(editor).hero.secondaryCta.label]
                  ])
                ]),
                createVNode("label", null, [
                  createTextVNode(" Secondary CTA target "),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(editor).hero.secondaryCta.to = $event,
                    type: "text"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(editor).hero.secondaryCta.to]
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Featured Project",
        eyebrow: "Spotlight card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mode-row" data-v-2251dd47${_scopeId}><label data-v-2251dd47${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(editor).featuredProject.mode, "manual")) ? " checked" : ""} type="radio" value="manual" data-v-2251dd47${_scopeId}> Manual</label><label data-v-2251dd47${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(editor).featuredProject.mode, "latest")) ? " checked" : ""} type="radio" value="latest" data-v-2251dd47${_scopeId}> Latest</label></div>`);
            if (unref(editor).featuredProject.mode === "manual") {
              _push2(`<label class="field-block" data-v-2251dd47${_scopeId}> Project <select data-v-2251dd47${_scopeId}><option value="" data-v-2251dd47${ssrIncludeBooleanAttr(Array.isArray(unref(editor).featuredProject.slug) ? ssrLooseContain(unref(editor).featuredProject.slug, "") : ssrLooseEqual(unref(editor).featuredProject.slug, "")) ? " selected" : ""}${_scopeId}>Choose a project</option><!--[-->`);
              ssrRenderList(unref(projects), (project) => {
                _push2(`<option${ssrRenderAttr("value", project.slug)} data-v-2251dd47${ssrIncludeBooleanAttr(Array.isArray(unref(editor).featuredProject.slug) ? ssrLooseContain(unref(editor).featuredProject.slug, project.slug) : ssrLooseEqual(unref(editor).featuredProject.slug, project.slug)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(project.title)} · ${ssrInterpolate(project.slug)}</option>`);
              });
              _push2(`<!--]--></select></label>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="preview-card" data-v-2251dd47${_scopeId}><span class="status-badge" data-v-2251dd47${_scopeId}>${ssrInterpolate(unref(editor).featuredProject.mode)}</span><strong data-v-2251dd47${_scopeId}>${ssrInterpolate(unref(featuredProject)?.title || "Latest project will be selected on the public home")}</strong><p data-v-2251dd47${_scopeId}>${ssrInterpolate(unref(featuredProject)?.description || "The public home falls back to the newest available project.")}</p></div>`);
          } else {
            return [
              createVNode("div", { class: "mode-row" }, [
                createVNode("label", null, [
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(editor).featuredProject.mode = $event,
                    type: "radio",
                    value: "manual"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelRadio, unref(editor).featuredProject.mode]
                  ]),
                  createTextVNode(" Manual")
                ]),
                createVNode("label", null, [
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(editor).featuredProject.mode = $event,
                    type: "radio",
                    value: "latest"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelRadio, unref(editor).featuredProject.mode]
                  ]),
                  createTextVNode(" Latest")
                ])
              ]),
              unref(editor).featuredProject.mode === "manual" ? (openBlock(), createBlock("label", {
                key: 0,
                class: "field-block"
              }, [
                createTextVNode(" Project "),
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": ($event) => unref(editor).featuredProject.slug = $event
                }, [
                  createVNode("option", { value: "" }, "Choose a project"),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(projects), (project) => {
                    return openBlock(), createBlock("option", {
                      key: project.publicPath,
                      value: project.slug
                    }, toDisplayString(project.title) + " · " + toDisplayString(project.slug), 9, ["value"]);
                  }), 128))
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, unref(editor).featuredProject.slug]
                ])
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "preview-card" }, [
                createVNode("span", { class: "status-badge" }, toDisplayString(unref(editor).featuredProject.mode), 1),
                createVNode("strong", null, toDisplayString(unref(featuredProject)?.title || "Latest project will be selected on the public home"), 1),
                createVNode("p", null, toDisplayString(unref(featuredProject)?.description || "The public home falls back to the newest available project."), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Latest Build Log",
        eyebrow: "Progress notes"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="form-row" data-v-2251dd47${_scopeId}><div class="mode-row" data-v-2251dd47${_scopeId}><label data-v-2251dd47${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(editor).buildLog.mode, "manual")) ? " checked" : ""} type="radio" value="manual" data-v-2251dd47${_scopeId}> Manual</label><label data-v-2251dd47${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(editor).buildLog.mode, "latest")) ? " checked" : ""} type="radio" value="latest" data-v-2251dd47${_scopeId}> Latest</label></div><label data-v-2251dd47${_scopeId}> Limit <input${ssrRenderAttr("value", unref(editor).buildLog.limit)} min="1" max="12" type="number" data-v-2251dd47${_scopeId}></label></div>`);
            if (unref(editor).buildLog.mode === "manual") {
              _push2(`<div class="editable-list" data-v-2251dd47${_scopeId}><!--[-->`);
              ssrRenderList(unref(editor).buildLog.manualItems, (item, index) => {
                _push2(`<div class="editable-item" data-v-2251dd47${_scopeId}><input${ssrRenderAttr("value", item.date)} type="text" placeholder="May 07" data-v-2251dd47${_scopeId}><input${ssrRenderAttr("value", item.title)} type="text" placeholder="Build note title" data-v-2251dd47${_scopeId}><textarea rows="2" placeholder="Short context" data-v-2251dd47${_scopeId}>${ssrInterpolate(item.meta)}</textarea><button class="text-btn" type="button" data-v-2251dd47${_scopeId}>Remove</button></div>`);
              });
              _push2(`<!--]--><button class="studio-btn" type="button" data-v-2251dd47${_scopeId}>Add build note</button></div>`);
            } else {
              _push2(`<p class="muted" data-v-2251dd47${_scopeId}>Latest mode derives this block from recent editorial entries.</p>`);
            }
          } else {
            return [
              createVNode("div", { class: "form-row" }, [
                createVNode("div", { class: "mode-row" }, [
                  createVNode("label", null, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(editor).buildLog.mode = $event,
                      type: "radio",
                      value: "manual"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelRadio, unref(editor).buildLog.mode]
                    ]),
                    createTextVNode(" Manual")
                  ]),
                  createVNode("label", null, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(editor).buildLog.mode = $event,
                      type: "radio",
                      value: "latest"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelRadio, unref(editor).buildLog.mode]
                    ]),
                    createTextVNode(" Latest")
                  ])
                ]),
                createVNode("label", null, [
                  createTextVNode(" Limit "),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(editor).buildLog.limit = $event,
                    min: "1",
                    max: "12",
                    type: "number"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [
                      vModelText,
                      unref(editor).buildLog.limit,
                      void 0,
                      { number: true }
                    ]
                  ])
                ])
              ]),
              unref(editor).buildLog.mode === "manual" ? (openBlock(), createBlock("div", {
                key: 0,
                class: "editable-list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(editor).buildLog.manualItems, (item, index) => {
                  return openBlock(), createBlock("div", {
                    key: index,
                    class: "editable-item"
                  }, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => item.date = $event,
                      type: "text",
                      placeholder: "May 07"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, item.date]
                    ]),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => item.title = $event,
                      type: "text",
                      placeholder: "Build note title"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, item.title]
                    ]),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => item.meta = $event,
                      rows: "2",
                      placeholder: "Short context"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, item.meta]
                    ]),
                    createVNode("button", {
                      class: "text-btn",
                      type: "button",
                      onClick: ($event) => removeBuildItem(index)
                    }, "Remove", 8, ["onClick"])
                  ]);
                }), 128)),
                createVNode("button", {
                  class: "studio-btn",
                  type: "button",
                  onClick: addBuildItem
                }, "Add build note")
              ])) : (openBlock(), createBlock("p", {
                key: 1,
                class: "muted"
              }, "Latest mode derives this block from recent editorial entries."))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Editorial Feed",
        eyebrow: "Magazine surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="form-row" data-v-2251dd47${_scopeId}><div class="mode-row" data-v-2251dd47${_scopeId}><label data-v-2251dd47${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(editor).feed.mode, "latest")) ? " checked" : ""} type="radio" value="latest" data-v-2251dd47${_scopeId}> Latest</label><label data-v-2251dd47${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(editor).feed.mode, "manual")) ? " checked" : ""} type="radio" value="manual" data-v-2251dd47${_scopeId}> Manual</label><label data-v-2251dd47${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(editor).feed.mode, "mixed")) ? " checked" : ""} type="radio" value="mixed" data-v-2251dd47${_scopeId}> Mixed</label></div><label data-v-2251dd47${_scopeId}> Limit <input${ssrRenderAttr("value", unref(editor).feed.limit)} min="1" max="12" type="number" data-v-2251dd47${_scopeId}></label></div><div class="type-toggles" data-v-2251dd47${_scopeId}><label data-v-2251dd47${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(editor).feed.contentTypes) ? ssrLooseContain(unref(editor).feed.contentTypes, "blog") : unref(editor).feed.contentTypes) ? " checked" : ""} type="checkbox" value="blog" data-v-2251dd47${_scopeId}> Blog</label><label data-v-2251dd47${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(editor).feed.contentTypes) ? ssrLooseContain(unref(editor).feed.contentTypes, "projects") : unref(editor).feed.contentTypes) ? " checked" : ""} type="checkbox" value="projects" data-v-2251dd47${_scopeId}> Projects</label><label data-v-2251dd47${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(editor).feed.contentTypes) ? ssrLooseContain(unref(editor).feed.contentTypes, "labs") : unref(editor).feed.contentTypes) ? " checked" : ""} type="checkbox" value="labs" data-v-2251dd47${_scopeId}> Labs</label></div>`);
            if (unref(editor).feed.mode !== "latest") {
              _push2(`<div class="feed-picker" data-v-2251dd47${_scopeId}><select data-v-2251dd47${_scopeId}><option value="blog" data-v-2251dd47${ssrIncludeBooleanAttr(Array.isArray(unref(selectedFeedType)) ? ssrLooseContain(unref(selectedFeedType), "blog") : ssrLooseEqual(unref(selectedFeedType), "blog")) ? " selected" : ""}${_scopeId}>Blog entry</option><option value="projects" data-v-2251dd47${ssrIncludeBooleanAttr(Array.isArray(unref(selectedFeedType)) ? ssrLooseContain(unref(selectedFeedType), "projects") : ssrLooseEqual(unref(selectedFeedType), "projects")) ? " selected" : ""}${_scopeId}>Project</option><option value="labs" data-v-2251dd47${ssrIncludeBooleanAttr(Array.isArray(unref(selectedFeedType)) ? ssrLooseContain(unref(selectedFeedType), "labs") : ssrLooseEqual(unref(selectedFeedType), "labs")) ? " selected" : ""}${_scopeId}>Lab</option></select><select data-v-2251dd47${_scopeId}><option value="" data-v-2251dd47${ssrIncludeBooleanAttr(Array.isArray(unref(selectedFeedSlug)) ? ssrLooseContain(unref(selectedFeedSlug), "") : ssrLooseEqual(unref(selectedFeedSlug), "")) ? " selected" : ""}${_scopeId}>Choose content</option><!--[-->`);
              ssrRenderList(unref(selectableContent)[unref(selectedFeedType)], (item) => {
                _push2(`<option${ssrRenderAttr("value", item.slug)} data-v-2251dd47${ssrIncludeBooleanAttr(Array.isArray(unref(selectedFeedSlug)) ? ssrLooseContain(unref(selectedFeedSlug), item.slug) : ssrLooseEqual(unref(selectedFeedSlug), item.slug)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.title)} · ${ssrInterpolate(item.slug)}</option>`);
              });
              _push2(`<!--]--></select><button class="studio-btn" type="button" data-v-2251dd47${_scopeId}>Add item</button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="selected-list" data-v-2251dd47${_scopeId}><!--[-->`);
            ssrRenderList(unref(editor).feed.manualItems, (item, index) => {
              _push2(`<div class="selected-row" data-v-2251dd47${_scopeId}><span data-v-2251dd47${_scopeId}>${ssrInterpolate(item.type)}</span><strong data-v-2251dd47${_scopeId}>${ssrInterpolate(getContentLabel(item))}</strong><button class="text-btn" type="button" data-v-2251dd47${_scopeId}>Remove</button></div>`);
            });
            _push2(`<!--]-->`);
            if (!unref(editor).feed.manualItems.length) {
              _push2(`<p class="muted" data-v-2251dd47${_scopeId}>No manual feed items selected yet.</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "form-row" }, [
                createVNode("div", { class: "mode-row" }, [
                  createVNode("label", null, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(editor).feed.mode = $event,
                      type: "radio",
                      value: "latest"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelRadio, unref(editor).feed.mode]
                    ]),
                    createTextVNode(" Latest")
                  ]),
                  createVNode("label", null, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(editor).feed.mode = $event,
                      type: "radio",
                      value: "manual"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelRadio, unref(editor).feed.mode]
                    ]),
                    createTextVNode(" Manual")
                  ]),
                  createVNode("label", null, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(editor).feed.mode = $event,
                      type: "radio",
                      value: "mixed"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelRadio, unref(editor).feed.mode]
                    ]),
                    createTextVNode(" Mixed")
                  ])
                ]),
                createVNode("label", null, [
                  createTextVNode(" Limit "),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(editor).feed.limit = $event,
                    min: "1",
                    max: "12",
                    type: "number"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [
                      vModelText,
                      unref(editor).feed.limit,
                      void 0,
                      { number: true }
                    ]
                  ])
                ])
              ]),
              createVNode("div", { class: "type-toggles" }, [
                createVNode("label", null, [
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(editor).feed.contentTypes = $event,
                    type: "checkbox",
                    value: "blog"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelCheckbox, unref(editor).feed.contentTypes]
                  ]),
                  createTextVNode(" Blog")
                ]),
                createVNode("label", null, [
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(editor).feed.contentTypes = $event,
                    type: "checkbox",
                    value: "projects"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelCheckbox, unref(editor).feed.contentTypes]
                  ]),
                  createTextVNode(" Projects")
                ]),
                createVNode("label", null, [
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(editor).feed.contentTypes = $event,
                    type: "checkbox",
                    value: "labs"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelCheckbox, unref(editor).feed.contentTypes]
                  ]),
                  createTextVNode(" Labs")
                ])
              ]),
              unref(editor).feed.mode !== "latest" ? (openBlock(), createBlock("div", {
                key: 0,
                class: "feed-picker"
              }, [
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": ($event) => isRef(selectedFeedType) ? selectedFeedType.value = $event : null
                }, [
                  createVNode("option", { value: "blog" }, "Blog entry"),
                  createVNode("option", { value: "projects" }, "Project"),
                  createVNode("option", { value: "labs" }, "Lab")
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, unref(selectedFeedType)]
                ]),
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": ($event) => isRef(selectedFeedSlug) ? selectedFeedSlug.value = $event : null
                }, [
                  createVNode("option", { value: "" }, "Choose content"),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(selectableContent)[unref(selectedFeedType)], (item) => {
                    return openBlock(), createBlock("option", {
                      key: item.publicPath,
                      value: item.slug
                    }, toDisplayString(item.title) + " · " + toDisplayString(item.slug), 9, ["value"]);
                  }), 128))
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, unref(selectedFeedSlug)]
                ]),
                createVNode("button", {
                  class: "studio-btn",
                  type: "button",
                  onClick: addFeedItem
                }, "Add item")
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "selected-list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(editor).feed.manualItems, (item, index) => {
                  return openBlock(), createBlock("div", {
                    key: `${item.type}-${item.slug}`,
                    class: "selected-row"
                  }, [
                    createVNode("span", null, toDisplayString(item.type), 1),
                    createVNode("strong", null, toDisplayString(getContentLabel(item)), 1),
                    createVNode("button", {
                      class: "text-btn",
                      type: "button",
                      onClick: ($event) => removeFeedItem(index)
                    }, "Remove", 8, ["onClick"])
                  ]);
                }), 128)),
                !unref(editor).feed.manualItems.length ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "muted"
                }, "No manual feed items selected yet.")) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Institutional Block",
        eyebrow: "Lab identity"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="form-grid" data-v-2251dd47${_scopeId}><label class="check-row wide" data-v-2251dd47${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(editor).identity.enabled) ? ssrLooseContain(unref(editor).identity.enabled, null) : unref(editor).identity.enabled) ? " checked" : ""} type="checkbox" data-v-2251dd47${_scopeId}> Enabled on public home </label><label data-v-2251dd47${_scopeId}> Headline <textarea rows="2" data-v-2251dd47${_scopeId}>${ssrInterpolate(unref(editor).identity.headline)}</textarea></label><label class="wide" data-v-2251dd47${_scopeId}> Description <textarea rows="3" data-v-2251dd47${_scopeId}>${ssrInterpolate(unref(editor).identity.description)}</textarea></label><label data-v-2251dd47${_scopeId}> CTA label <input${ssrRenderAttr("value", unref(editor).identity.ctaLabel)} type="text" data-v-2251dd47${_scopeId}></label><label data-v-2251dd47${_scopeId}> CTA target <input${ssrRenderAttr("value", unref(editor).identity.ctaTarget)} type="text" data-v-2251dd47${_scopeId}></label></div>`);
          } else {
            return [
              createVNode("div", { class: "form-grid" }, [
                createVNode("label", { class: "check-row wide" }, [
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(editor).identity.enabled = $event,
                    type: "checkbox"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelCheckbox, unref(editor).identity.enabled]
                  ]),
                  createTextVNode(" Enabled on public home ")
                ]),
                createVNode("label", null, [
                  createTextVNode(" Headline "),
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => unref(editor).identity.headline = $event,
                    rows: "2"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(editor).identity.headline]
                  ])
                ]),
                createVNode("label", { class: "wide" }, [
                  createTextVNode(" Description "),
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => unref(editor).identity.description = $event,
                    rows: "3"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(editor).identity.description]
                  ])
                ]),
                createVNode("label", null, [
                  createTextVNode(" CTA label "),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(editor).identity.ctaLabel = $event,
                    type: "text"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(editor).identity.ctaLabel]
                  ])
                ]),
                createVNode("label", null, [
                  createTextVNode(" CTA target "),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(editor).identity.ctaTarget = $event,
                    type: "text"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(editor).identity.ctaTarget]
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Save Home Layout",
        eyebrow: "Protected write"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(validationErrors).length) {
              _push2(`<div class="validation-box" data-v-2251dd47${_scopeId}><strong data-v-2251dd47${_scopeId}>Before saving</strong><!--[-->`);
              ssrRenderList(unref(validationErrors), (error) => {
                _push2(`<p data-v-2251dd47${_scopeId}>${ssrInterpolate(error)}</p>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="action-row" data-v-2251dd47${_scopeId}><button class="studio-btn primary"${ssrIncludeBooleanAttr(unref(isSaving) || unref(validationErrors).length > 0) ? " disabled" : ""} type="button" data-v-2251dd47${_scopeId}>${ssrInterpolate(unref(isSaving) ? "Saving..." : "Save Home Layout")}</button><button class="studio-btn" type="button" data-v-2251dd47${_scopeId}>Reset / Reload</button>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              class: "studio-btn ghost",
              to: "/",
              target: "_blank"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Open public home`);
                } else {
                  return [
                    createTextVNode("Open public home")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (unref(statusMessage)) {
              _push2(`<p class="status-message" data-v-2251dd47${_scopeId}>${ssrInterpolate(unref(statusMessage))}</p>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(validationErrors).length ? (openBlock(), createBlock("div", {
                key: 0,
                class: "validation-box"
              }, [
                createVNode("strong", null, "Before saving"),
                (openBlock(true), createBlock(Fragment, null, renderList(unref(validationErrors), (error) => {
                  return openBlock(), createBlock("p", { key: error }, toDisplayString(error), 1);
                }), 128))
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "action-row" }, [
                createVNode("button", {
                  class: "studio-btn primary",
                  disabled: unref(isSaving) || unref(validationErrors).length > 0,
                  type: "button",
                  onClick: saveLayout
                }, toDisplayString(unref(isSaving) ? "Saving..." : "Save Home Layout"), 9, ["disabled"]),
                createVNode("button", {
                  class: "studio-btn",
                  type: "button",
                  onClick: reloadComposer
                }, "Reset / Reload"),
                createVNode(_component_NuxtLink, {
                  class: "studio-btn ghost",
                  to: "/",
                  target: "_blank"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Open public home")
                  ]),
                  _: 1
                })
              ]),
              unref(statusMessage) ? (openBlock(), createBlock("p", {
                key: 1,
                class: "status-message"
              }, toDisplayString(unref(statusMessage)), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><aside class="preview-stack" data-v-2251dd47>`);
      _push(ssrRenderComponent(_component_AdminPreviewPanel, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="preview-copy" data-v-2251dd47${_scopeId}><p class="eyebrow" data-v-2251dd47${_scopeId}>${ssrInterpolate(unref(editor).hero.label)}</p><h3 data-v-2251dd47${_scopeId}>${ssrInterpolate(unref(editor).hero.headline)}</h3><p data-v-2251dd47${_scopeId}>${ssrInterpolate(unref(editor).hero.description)}</p></div>`);
          } else {
            return [
              createVNode("div", { class: "preview-copy" }, [
                createVNode("p", { class: "eyebrow" }, toDisplayString(unref(editor).hero.label), 1),
                createVNode("h3", null, toDisplayString(unref(editor).hero.headline), 1),
                createVNode("p", null, toDisplayString(unref(editor).hero.description), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Composer preview",
        eyebrow: "Selected content"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="preview-list" data-v-2251dd47${_scopeId}><div data-v-2251dd47${_scopeId}><span data-v-2251dd47${_scopeId}>Featured project</span><strong data-v-2251dd47${_scopeId}>${ssrInterpolate(unref(featuredProject)?.title || "Latest available project")}</strong></div><div data-v-2251dd47${_scopeId}><span data-v-2251dd47${_scopeId}>Build log</span><strong data-v-2251dd47${_scopeId}>${ssrInterpolate(unref(editor).buildLog.mode)} · ${ssrInterpolate(unref(editor).buildLog.limit)} items</strong></div><div data-v-2251dd47${_scopeId}><span data-v-2251dd47${_scopeId}>Feed</span><strong data-v-2251dd47${_scopeId}>${ssrInterpolate(unref(editor).feed.mode)} · ${ssrInterpolate(unref(previewFeedItems).length)} preview items</strong></div></div>`);
          } else {
            return [
              createVNode("div", { class: "preview-list" }, [
                createVNode("div", null, [
                  createVNode("span", null, "Featured project"),
                  createVNode("strong", null, toDisplayString(unref(featuredProject)?.title || "Latest available project"), 1)
                ]),
                createVNode("div", null, [
                  createVNode("span", null, "Build log"),
                  createVNode("strong", null, toDisplayString(unref(editor).buildLog.mode) + " · " + toDisplayString(unref(editor).buildLog.limit) + " items", 1)
                ]),
                createVNode("div", null, [
                  createVNode("span", null, "Feed"),
                  createVNode("strong", null, toDisplayString(unref(editor).feed.mode) + " · " + toDisplayString(unref(previewFeedItems).length) + " preview items", 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</aside></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2251dd47"]]);

export { home as default };
//# sourceMappingURL=home-COQ9ZOHm.mjs.map
