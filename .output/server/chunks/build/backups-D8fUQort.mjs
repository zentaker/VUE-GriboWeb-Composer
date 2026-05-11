import { _ as __nuxt_component_0 } from './AdminHero-lJqa4kRI.mjs';
import { _ as __nuxt_component_2 } from './AdminPanel-CPS4BSK_.mjs';
import { defineComponent, withAsyncContext, ref, computed, watchEffect, mergeProps, unref, withCtx, createVNode, withDirectives, isRef, openBlock, createBlock, Fragment, renderList, toDisplayString, vModelSelect, vModelText, createCommentVNode, vModelRadio, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useFetch } from './fetch-DJtx6Rcc.mjs';
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
import '@vue/shared';
import './asyncData-BKyabxD9.mjs';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "backups",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: contentData, refresh: refreshContent } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/content/list",
      "$-ATClW5DDQ"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: snapshotData, refresh: refreshSnapshots } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/backups/snapshots",
      "$cep3gGog2Y"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const selectedProject = ref("");
    const selectedBlog = ref("");
    const packageText = ref("");
    const preview = ref(null);
    const importMode = ref("copy");
    const replaceConfirmation = ref("");
    const restoreConfirmation = ref("");
    const busy = ref(false);
    const message = ref("");
    const error = ref("");
    const projects = computed(() => (contentData.value?.items || []).filter((item) => item.contentType === "projects"));
    const blogPosts = computed(() => (contentData.value?.items || []).filter((item) => item.contentType === "blog"));
    const snapshots = computed(() => snapshotData.value?.snapshots || []);
    watchEffect(() => {
      if (!selectedProject.value && projects.value[0]) selectedProject.value = projects.value[0].slug;
      if (!selectedBlog.value && blogPosts.value[0]) selectedBlog.value = blogPosts.value[0].slug;
    });
    function downloadBlob(blob, filename) {
      const url = URL.createObjectURL(blob);
      const link = (void 0).createElement("a");
      link.href = url;
      link.download = filename;
      (void 0).body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    }
    async function downloadEndpoint(url, fallbackName) {
      error.value = "";
      message.value = "";
      busy.value = true;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(await response.text());
        const disposition = response.headers.get("content-disposition") || "";
        const filename = disposition.match(/filename="([^"]+)"/)?.[1] || fallbackName;
        downloadBlob(await response.blob(), filename);
        message.value = `Downloaded ${filename}.`;
      } catch (err) {
        error.value = err?.message || "Export failed.";
      } finally {
        busy.value = false;
      }
    }
    function exportFull() {
      return downloadEndpoint("/api/admin/backups/export-full", "gribo-backup.gribo.json");
    }
    function exportProject() {
      if (!selectedProject.value) return;
      return downloadEndpoint(`/api/admin/backups/export-project?slug=${encodeURIComponent(selectedProject.value)}`, `gribo-project-${selectedProject.value}.gribo.json`);
    }
    function exportBlog() {
      if (!selectedBlog.value) return;
      return downloadEndpoint(`/api/admin/backups/export-blog?slug=${encodeURIComponent(selectedBlog.value)}`, `gribo-blog-${selectedBlog.value}.gribo.json`);
    }
    async function loadPackageFromFile(event) {
      const file = event.target.files?.[0];
      if (!file) return;
      packageText.value = await file.text();
      preview.value = null;
    }
    function parsePackage() {
      try {
        return JSON.parse(packageText.value);
      } catch {
        throw new Error("Package JSON is invalid.");
      }
    }
    async function previewPackage() {
      error.value = "";
      message.value = "";
      preview.value = null;
      busy.value = true;
      try {
        const response = await $fetch("/api/admin/backups/preview", {
          method: "POST",
          body: {
            package: parsePackage()
          }
        });
        preview.value = response;
        message.value = "Package preview is ready. Nothing has been written yet.";
      } catch (err) {
        error.value = err?.data?.message || err?.message || "Preview failed.";
      } finally {
        busy.value = false;
      }
    }
    async function applyImport() {
      if (!preview.value) return;
      error.value = "";
      message.value = "";
      busy.value = true;
      try {
        const response = await $fetch("/api/admin/backups/import", {
          method: "POST",
          body: {
            package: parsePackage(),
            mode: importMode.value,
            confirmation: replaceConfirmation.value,
            restoreConfirmation: restoreConfirmation.value
          }
        });
        message.value = `Imported ${response.written.length} files. Safety snapshot: ${response.snapshot.filename} (${response.snapshot.fileCount} files).`;
        preview.value = null;
        packageText.value = "";
        replaceConfirmation.value = "";
        restoreConfirmation.value = "";
        await Promise.all([refreshContent(), refreshSnapshots()]);
      } catch (err) {
        error.value = err?.data?.message || err?.message || "Import failed.";
      } finally {
        busy.value = false;
      }
    }
    function downloadLatestSnapshot() {
      return downloadEndpoint("/api/admin/backups/latest-snapshot", "gribo-safety-snapshot.gribo.json");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminHero = __nuxt_component_0;
      const _component_AdminPanel = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "backups-page" }, _attrs))} data-v-96c20dff>`);
      _push(ssrRenderComponent(_component_AdminHero, {
        eyebrow: "Content Portability",
        title: "Backups, packages, and safety snapshots.",
        description: "Move Gribo content between local and hosted instances without rebuilding posts, projects, docs, labs, settings, or uploads by hand."
      }, null, _parent));
      if (unref(message) || unref(error)) {
        _push(`<div class="notice-stack" data-v-96c20dff>`);
        if (unref(message)) {
          _push(`<p class="notice success" data-v-96c20dff>${ssrInterpolate(unref(message))}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(error)) {
          _push(`<p class="notice danger" data-v-96c20dff>${ssrInterpolate(unref(error))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="backup-grid" data-v-96c20dff>`);
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Full-site backup",
        eyebrow: "Export"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="muted" data-v-96c20dff${_scopeId}>Exports approved content folders and existing uploads into one portable \`.gribo.json\` package.</p><button class="studio-btn primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""} data-v-96c20dff${_scopeId}>Export full backup</button>`);
          } else {
            return [
              createVNode("p", { class: "muted" }, "Exports approved content folders and existing uploads into one portable `.gribo.json` package."),
              createVNode("button", {
                class: "studio-btn primary",
                disabled: unref(busy),
                onClick: exportFull
              }, "Export full backup", 8, ["disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Package exports",
        eyebrow: "Single entity"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="field-row" data-v-96c20dff${_scopeId}><label data-v-96c20dff${_scopeId}><span data-v-96c20dff${_scopeId}>Project package</span><select data-v-96c20dff${_scopeId}><!--[-->`);
            ssrRenderList(unref(projects), (project) => {
              _push2(`<option${ssrRenderAttr("value", project.slug)} data-v-96c20dff${ssrIncludeBooleanAttr(Array.isArray(unref(selectedProject)) ? ssrLooseContain(unref(selectedProject), project.slug) : ssrLooseEqual(unref(selectedProject), project.slug)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(project.title)}</option>`);
            });
            _push2(`<!--]--></select></label><button class="studio-btn"${ssrIncludeBooleanAttr(unref(busy) || !unref(selectedProject)) ? " disabled" : ""} data-v-96c20dff${_scopeId}>Export project package</button></div><div class="field-row" data-v-96c20dff${_scopeId}><label data-v-96c20dff${_scopeId}><span data-v-96c20dff${_scopeId}>Blog package</span><select data-v-96c20dff${_scopeId}><!--[-->`);
            ssrRenderList(unref(blogPosts), (post) => {
              _push2(`<option${ssrRenderAttr("value", post.slug)} data-v-96c20dff${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBlog)) ? ssrLooseContain(unref(selectedBlog), post.slug) : ssrLooseEqual(unref(selectedBlog), post.slug)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(post.title)}</option>`);
            });
            _push2(`<!--]--></select></label><button class="studio-btn"${ssrIncludeBooleanAttr(unref(busy) || !unref(selectedBlog)) ? " disabled" : ""} data-v-96c20dff${_scopeId}>Export blog package</button></div>`);
          } else {
            return [
              createVNode("div", { class: "field-row" }, [
                createVNode("label", null, [
                  createVNode("span", null, "Project package"),
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => isRef(selectedProject) ? selectedProject.value = $event : null
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(projects), (project) => {
                      return openBlock(), createBlock("option", {
                        key: project.filePath,
                        value: project.slug
                      }, toDisplayString(project.title), 9, ["value"]);
                    }), 128))
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, unref(selectedProject)]
                  ])
                ]),
                createVNode("button", {
                  class: "studio-btn",
                  disabled: unref(busy) || !unref(selectedProject),
                  onClick: exportProject
                }, "Export project package", 8, ["disabled"])
              ]),
              createVNode("div", { class: "field-row" }, [
                createVNode("label", null, [
                  createVNode("span", null, "Blog package"),
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => isRef(selectedBlog) ? selectedBlog.value = $event : null
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(blogPosts), (post) => {
                      return openBlock(), createBlock("option", {
                        key: post.filePath,
                        value: post.slug
                      }, toDisplayString(post.title), 9, ["value"]);
                    }), 128))
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, unref(selectedBlog)]
                  ])
                ]),
                createVNode("button", {
                  class: "studio-btn",
                  disabled: unref(busy) || !unref(selectedBlog),
                  onClick: exportBlog
                }, "Export blog package", 8, ["disabled"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Import package",
        eyebrow: "Preview first"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="import-layout" data-v-96c20dff${_scopeId}><div class="import-inputs" data-v-96c20dff${_scopeId}><label class="file-picker" data-v-96c20dff${_scopeId}><span data-v-96c20dff${_scopeId}>Choose \`.gribo.json\` package</span><input type="file" accept=".json,.gribo.json,application/json" data-v-96c20dff${_scopeId}></label><label data-v-96c20dff${_scopeId}><span data-v-96c20dff${_scopeId}>Or paste package JSON</span><textarea rows="10" placeholder="{ &quot;manifest&quot;: ..., &quot;files&quot;: [...] }" data-v-96c20dff${_scopeId}>${ssrInterpolate(unref(packageText))}</textarea></label><button class="studio-btn primary"${ssrIncludeBooleanAttr(unref(busy) || !unref(packageText).trim()) ? " disabled" : ""} data-v-96c20dff${_scopeId}>Preview import</button></div><div class="preview-card" data-v-96c20dff${_scopeId}>`);
            if (unref(preview)) {
              _push2(`<!--[--><p class="panel-eyebrow" data-v-96c20dff${_scopeId}>Import preview</p><h3 data-v-96c20dff${_scopeId}>${ssrInterpolate(unref(preview).manifest.title)}</h3><p class="muted" data-v-96c20dff${_scopeId}>${ssrInterpolate(unref(preview).manifest.packageType)} · ${ssrInterpolate(unref(preview).manifest.slug)}</p><div class="preview-stats" data-v-96c20dff${_scopeId}><span data-v-96c20dff${_scopeId}>${ssrInterpolate(unref(preview).creates.length)} create</span><span data-v-96c20dff${_scopeId}>${ssrInterpolate(unref(preview).conflicts.length)} conflicts</span><span data-v-96c20dff${_scopeId}>${ssrInterpolate(unref(preview).files.length)} files</span></div>`);
              if (unref(preview).warnings.length) {
                _push2(`<div class="warning-list" data-v-96c20dff${_scopeId}><strong data-v-96c20dff${_scopeId}>Warnings</strong><!--[-->`);
                ssrRenderList(unref(preview).warnings, (warning) => {
                  _push2(`<p data-v-96c20dff${_scopeId}>${ssrInterpolate(warning)}</p>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="file-columns" data-v-96c20dff${_scopeId}><div data-v-96c20dff${_scopeId}><strong data-v-96c20dff${_scopeId}>Files to create</strong>`);
              if (!unref(preview).creates.length) {
                _push2(`<small data-v-96c20dff${_scopeId}>None</small>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(unref(preview).creates, (file) => {
                _push2(`<small data-v-96c20dff${_scopeId}>${ssrInterpolate(file)}</small>`);
              });
              _push2(`<!--]--></div><div data-v-96c20dff${_scopeId}><strong data-v-96c20dff${_scopeId}>Conflicts</strong>`);
              if (!unref(preview).conflicts.length) {
                _push2(`<small data-v-96c20dff${_scopeId}>None</small>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(unref(preview).conflicts, (file) => {
                _push2(`<small data-v-96c20dff${_scopeId}>${ssrInterpolate(file)}</small>`);
              });
              _push2(`<!--]--></div></div><div class="mode-box" data-v-96c20dff${_scopeId}><label data-v-96c20dff${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(importMode), "copy")) ? " checked" : ""} type="radio" value="copy" data-v-96c20dff${_scopeId}> Import as copy</label><label data-v-96c20dff${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(importMode), "replace")) ? " checked" : ""} type="radio" value="replace" data-v-96c20dff${_scopeId}> Replace existing</label></div>`);
              if (unref(importMode) === "replace" && unref(preview).conflicts.length) {
                _push2(`<label data-v-96c20dff${_scopeId}><span data-v-96c20dff${_scopeId}>Replace confirmation</span><input${ssrRenderAttr("value", unref(replaceConfirmation))} type="text" placeholder="REPLACE GRIBO CONTENT" data-v-96c20dff${_scopeId}></label>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(importMode) === "replace" && unref(preview).manifest.packageType === "full-site") {
                _push2(`<label data-v-96c20dff${_scopeId}><span data-v-96c20dff${_scopeId}>Restore confirmation</span><input${ssrRenderAttr("value", unref(restoreConfirmation))} type="text" placeholder="RESTORE GRIBO BACKUP" data-v-96c20dff${_scopeId}></label>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<button class="studio-btn primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""} data-v-96c20dff${_scopeId}>Apply import</button><!--]-->`);
            } else {
              _push2(`<!--[--><p class="panel-eyebrow" data-v-96c20dff${_scopeId}>No package preview</p><h3 data-v-96c20dff${_scopeId}>Nothing will be written until preview and confirmation.</h3><p class="muted" data-v-96c20dff${_scopeId}>Packages with unsafe paths such as \`../\`, absolute paths, \`app/\`, \`server/\`, \`.env\`, package files, or config files are rejected by the API.</p><!--]-->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "import-layout" }, [
                createVNode("div", { class: "import-inputs" }, [
                  createVNode("label", { class: "file-picker" }, [
                    createVNode("span", null, "Choose `.gribo.json` package"),
                    createVNode("input", {
                      type: "file",
                      accept: ".json,.gribo.json,application/json",
                      onChange: loadPackageFromFile
                    }, null, 32)
                  ]),
                  createVNode("label", null, [
                    createVNode("span", null, "Or paste package JSON"),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => isRef(packageText) ? packageText.value = $event : null,
                      rows: "10",
                      placeholder: '{ "manifest": ..., "files": [...] }'
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(packageText)]
                    ])
                  ]),
                  createVNode("button", {
                    class: "studio-btn primary",
                    disabled: unref(busy) || !unref(packageText).trim(),
                    onClick: previewPackage
                  }, "Preview import", 8, ["disabled"])
                ]),
                createVNode("div", { class: "preview-card" }, [
                  unref(preview) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode("p", { class: "panel-eyebrow" }, "Import preview"),
                    createVNode("h3", null, toDisplayString(unref(preview).manifest.title), 1),
                    createVNode("p", { class: "muted" }, toDisplayString(unref(preview).manifest.packageType) + " · " + toDisplayString(unref(preview).manifest.slug), 1),
                    createVNode("div", { class: "preview-stats" }, [
                      createVNode("span", null, toDisplayString(unref(preview).creates.length) + " create", 1),
                      createVNode("span", null, toDisplayString(unref(preview).conflicts.length) + " conflicts", 1),
                      createVNode("span", null, toDisplayString(unref(preview).files.length) + " files", 1)
                    ]),
                    unref(preview).warnings.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "warning-list"
                    }, [
                      createVNode("strong", null, "Warnings"),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(preview).warnings, (warning) => {
                        return openBlock(), createBlock("p", { key: warning }, toDisplayString(warning), 1);
                      }), 128))
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "file-columns" }, [
                      createVNode("div", null, [
                        createVNode("strong", null, "Files to create"),
                        !unref(preview).creates.length ? (openBlock(), createBlock("small", { key: 0 }, "None")) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(preview).creates, (file) => {
                          return openBlock(), createBlock("small", { key: file }, toDisplayString(file), 1);
                        }), 128))
                      ]),
                      createVNode("div", null, [
                        createVNode("strong", null, "Conflicts"),
                        !unref(preview).conflicts.length ? (openBlock(), createBlock("small", { key: 0 }, "None")) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(preview).conflicts, (file) => {
                          return openBlock(), createBlock("small", { key: file }, toDisplayString(file), 1);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", { class: "mode-box" }, [
                      createVNode("label", null, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => isRef(importMode) ? importMode.value = $event : null,
                          type: "radio",
                          value: "copy"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelRadio, unref(importMode)]
                        ]),
                        createTextVNode(" Import as copy")
                      ]),
                      createVNode("label", null, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => isRef(importMode) ? importMode.value = $event : null,
                          type: "radio",
                          value: "replace"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelRadio, unref(importMode)]
                        ]),
                        createTextVNode(" Replace existing")
                      ])
                    ]),
                    unref(importMode) === "replace" && unref(preview).conflicts.length ? (openBlock(), createBlock("label", { key: 1 }, [
                      createVNode("span", null, "Replace confirmation"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => isRef(replaceConfirmation) ? replaceConfirmation.value = $event : null,
                        type: "text",
                        placeholder: "REPLACE GRIBO CONTENT"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(replaceConfirmation)]
                      ])
                    ])) : createCommentVNode("", true),
                    unref(importMode) === "replace" && unref(preview).manifest.packageType === "full-site" ? (openBlock(), createBlock("label", { key: 2 }, [
                      createVNode("span", null, "Restore confirmation"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => isRef(restoreConfirmation) ? restoreConfirmation.value = $event : null,
                        type: "text",
                        placeholder: "RESTORE GRIBO BACKUP"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(restoreConfirmation)]
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("button", {
                      class: "studio-btn primary",
                      disabled: unref(busy),
                      onClick: applyImport
                    }, "Apply import", 8, ["disabled"])
                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createVNode("p", { class: "panel-eyebrow" }, "No package preview"),
                    createVNode("h3", null, "Nothing will be written until preview and confirmation."),
                    createVNode("p", { class: "muted" }, "Packages with unsafe paths such as `../`, absolute paths, `app/`, `server/`, `.env`, package files, or config files are rejected by the API.")
                  ], 64))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section class="backup-grid" data-v-96c20dff>`);
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Safety snapshots",
        eyebrow: "Automatic guardrail"
      }, {
        action: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="studio-btn"${ssrIncludeBooleanAttr(unref(busy) || !unref(snapshots).length) ? " disabled" : ""} data-v-96c20dff${_scopeId}>Download latest</button>`);
          } else {
            return [
              createVNode("button", {
                class: "studio-btn",
                disabled: unref(busy) || !unref(snapshots).length,
                onClick: downloadLatestSnapshot
              }, "Download latest", 8, ["disabled"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="muted" data-v-96c20dff${_scopeId}>Snapshots are created before imports or restores and stored outside public content.</p><div class="snapshot-list" data-v-96c20dff${_scopeId}><!--[-->`);
            ssrRenderList(unref(snapshots).slice(0, 6), (snapshot) => {
              _push2(`<article data-v-96c20dff${_scopeId}><strong data-v-96c20dff${_scopeId}>${ssrInterpolate(snapshot.filename)}</strong><span data-v-96c20dff${_scopeId}>${ssrInterpolate(new Date(snapshot.createdAt).toLocaleString())} · ${ssrInterpolate(Math.round(snapshot.size / 1024))} KB</span></article>`);
            });
            _push2(`<!--]-->`);
            if (!unref(snapshots).length) {
              _push2(`<p class="muted" data-v-96c20dff${_scopeId}>No safety snapshots yet.</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("p", { class: "muted" }, "Snapshots are created before imports or restores and stored outside public content."),
              createVNode("div", { class: "snapshot-list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(snapshots).slice(0, 6), (snapshot) => {
                  return openBlock(), createBlock("article", {
                    key: snapshot.filename
                  }, [
                    createVNode("strong", null, toDisplayString(snapshot.filename), 1),
                    createVNode("span", null, toDisplayString(new Date(snapshot.createdAt).toLocaleString()) + " · " + toDisplayString(Math.round(snapshot.size / 1024)) + " KB", 1)
                  ]);
                }), 128)),
                !unref(snapshots).length ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "muted"
                }, "No safety snapshots yet.")) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Danger zone",
        eyebrow: "Restore"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="muted" data-v-96c20dff${_scopeId}>Full restore can overwrite existing content. Preview the package first, choose Replace existing, and type both confirmation phrases when conflicts or full restore are involved.</p><ul class="danger-rules" data-v-96c20dff${_scopeId}><li data-v-96c20dff${_scopeId}>Do not restore untrusted packages.</li><li data-v-96c20dff${_scopeId}>Safety snapshot is created before writing.</li><li data-v-96c20dff${_scopeId}>Only approved content and upload paths can be written.</li></ul>`);
          } else {
            return [
              createVNode("p", { class: "muted" }, "Full restore can overwrite existing content. Preview the package first, choose Replace existing, and type both confirmation phrases when conflicts or full restore are involved."),
              createVNode("ul", { class: "danger-rules" }, [
                createVNode("li", null, "Do not restore untrusted packages."),
                createVNode("li", null, "Safety snapshot is created before writing."),
                createVNode("li", null, "Only approved content and upload paths can be written.")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/backups.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const backups = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-96c20dff"]]);

export { backups as default };
//# sourceMappingURL=backups-D8fUQort.mjs.map
