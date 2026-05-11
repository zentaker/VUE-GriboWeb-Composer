import { _ as __nuxt_component_0 } from './AdminHero-lJqa4kRI.mjs';
import { _ as __nuxt_component_2 } from './AdminPanel-CPS4BSK_.mjs';
import { defineComponent, withAsyncContext, computed, ref, reactive, mergeProps, withCtx, unref, openBlock, createBlock, createVNode, createCommentVNode, Fragment, renderList, toDisplayString, withModifiers, createTextVNode, withDirectives, vModelSelect, vModelText, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-BKyabxD9.mjs';
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
import 'vue-router';

function useAdminUsers() {
  const listUsers = () => $fetch("/api/admin/users/list");
  const createUser = (payload) => $fetch("/api/admin/users/create", {
    method: "POST",
    body: payload
  });
  const updateUser = (payload) => $fetch("/api/admin/users/update", {
    method: "POST",
    body: payload
  });
  const setUserStatus = (id, status) => $fetch("/api/admin/users/status", {
    method: "POST",
    body: { id, status }
  });
  const changePassword = (id, password, confirmPassword) => $fetch("/api/admin/users/password", {
    method: "POST",
    body: { id, password, confirmPassword }
  });
  return {
    listUsers,
    createUser,
    updateUser,
    setUserStatus,
    changePassword
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "users",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { listUsers, createUser, updateUser, setUserStatus, changePassword } = useAdminUsers();
    const { data, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-users-list", listUsers)), __temp = await __temp, __restore(), __temp);
    const users2 = computed(() => data.value?.users ?? []);
    const statusMessage = ref("");
    const errorMessage = ref("");
    const isSaving = ref(false);
    const editingUserId = ref("");
    const passwordUserId = ref("");
    const newUser = reactive({
      name: "",
      email: "",
      username: "",
      authProvider: "password",
      googleEmail: "",
      password: "",
      confirmPassword: ""
    });
    const editForm = reactive({
      name: "",
      email: "",
      username: "",
      authProvider: "password",
      googleEmail: ""
    });
    const passwordForm = reactive({
      password: "",
      confirmPassword: ""
    });
    function resetMessages() {
      statusMessage.value = "";
      errorMessage.value = "";
    }
    function providerLabel(provider) {
      return provider === "google" ? "Google" : "Password";
    }
    function startEdit(user) {
      editingUserId.value = user.id;
      passwordUserId.value = "";
      editForm.name = user.name;
      editForm.email = user.email;
      editForm.username = user.username;
      editForm.authProvider = user.authProvider;
      editForm.googleEmail = user.googleEmail || "";
      resetMessages();
    }
    function cancelEdit() {
      editingUserId.value = "";
    }
    function startPassword(user) {
      passwordUserId.value = user.id;
      editingUserId.value = "";
      passwordForm.password = "";
      passwordForm.confirmPassword = "";
      resetMessages();
    }
    function cancelPassword() {
      passwordUserId.value = "";
    }
    async function handleCreateUser() {
      resetMessages();
      isSaving.value = true;
      try {
        await createUser({ ...newUser });
        statusMessage.value = "Admin user created.";
        newUser.name = "";
        newUser.email = "";
        newUser.username = "";
        newUser.googleEmail = "";
        newUser.password = "";
        newUser.confirmPassword = "";
        await refresh();
      } catch (error) {
        errorMessage.value = error?.data?.statusMessage || error?.message || "User creation failed.";
      } finally {
        isSaving.value = false;
      }
    }
    async function handleUpdateUser() {
      resetMessages();
      isSaving.value = true;
      try {
        await updateUser({
          id: editingUserId.value,
          ...editForm
        });
        statusMessage.value = "Admin user updated.";
        editingUserId.value = "";
        await refresh();
      } catch (error) {
        errorMessage.value = error?.data?.statusMessage || error?.message || "User update failed.";
      } finally {
        isSaving.value = false;
      }
    }
    async function handleStatus(user) {
      resetMessages();
      isSaving.value = true;
      try {
        await setUserStatus(user.id, user.status === "active" ? "disabled" : "active");
        statusMessage.value = user.status === "active" ? "Admin user disabled." : "Admin user enabled.";
        await refresh();
      } catch (error) {
        errorMessage.value = error?.data?.statusMessage || error?.message || "Status update failed.";
      } finally {
        isSaving.value = false;
      }
    }
    async function handlePasswordChange() {
      resetMessages();
      isSaving.value = true;
      try {
        await changePassword(passwordUserId.value, passwordForm.password, passwordForm.confirmPassword);
        statusMessage.value = "Password changed.";
        passwordUserId.value = "";
        passwordForm.password = "";
        passwordForm.confirmPassword = "";
        await refresh();
      } catch (error) {
        errorMessage.value = error?.data?.statusMessage || error?.message || "Password change failed.";
      } finally {
        isSaving.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminHero = __nuxt_component_0;
      const _component_AdminPanel = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-84e00cae>`);
      _push(ssrRenderComponent(_component_AdminHero, {
        eyebrow: "Admin Users",
        title: "People allowed into Gribo Studio.",
        description: "Minimal Stage 5.1 surface for password and Google-based administrators. Disable users instead of deleting them."
      }, null, _parent));
      _push(`<section class="users-layout" data-v-84e00cae>`);
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "Admin users",
        eyebrow: "Access list"
      }, {
        action: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ghost-btn" type="button" data-v-84e00cae${_scopeId}>Refresh</button>`);
          } else {
            return [
              createVNode("button", {
                class: "ghost-btn",
                type: "button",
                onClick: unref(refresh)
              }, "Refresh", 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(pending)) {
              _push2(`<p class="muted" data-v-84e00cae${_scopeId}>Reading server/data/admin-users.json...</p>`);
            } else {
              _push2(`<div class="users-list" data-v-84e00cae${_scopeId}>`);
              if (!unref(users2).length) {
                _push2(`<article class="empty-state" data-v-84e00cae${_scopeId}><strong data-v-84e00cae${_scopeId}>No file-based admin users yet.</strong><p data-v-84e00cae${_scopeId}>The current login can still use the environment bootstrap. Create the first admin user here before production.</p></article>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(unref(users2), (user) => {
                _push2(`<article class="user-card" data-v-84e00cae${_scopeId}><div class="user-main" data-v-84e00cae${_scopeId}><div data-v-84e00cae${_scopeId}><strong data-v-84e00cae${_scopeId}>${ssrInterpolate(user.name)}</strong><span data-v-84e00cae${_scopeId}>${ssrInterpolate(user.email)}</span><small data-v-84e00cae${_scopeId}>@${ssrInterpolate(user.username)} · ${ssrInterpolate(providerLabel(user.authProvider))}</small></div><div class="user-badges" data-v-84e00cae${_scopeId}><span class="status-badge" data-v-84e00cae${_scopeId}>${ssrInterpolate(user.status)}</span><span class="status-badge" data-v-84e00cae${_scopeId}>${ssrInterpolate(providerLabel(user.authProvider))}</span></div></div><dl class="user-meta" data-v-84e00cae${_scopeId}><div data-v-84e00cae${_scopeId}><dt data-v-84e00cae${_scopeId}>Created</dt><dd data-v-84e00cae${_scopeId}>${ssrInterpolate(user.createdAt || "not set")}</dd></div><div data-v-84e00cae${_scopeId}><dt data-v-84e00cae${_scopeId}>Updated</dt><dd data-v-84e00cae${_scopeId}>${ssrInterpolate(user.updatedAt || "not set")}</dd></div><div data-v-84e00cae${_scopeId}><dt data-v-84e00cae${_scopeId}>Last login</dt><dd data-v-84e00cae${_scopeId}>${ssrInterpolate(user.lastLoginAt || "never")}</dd></div><div data-v-84e00cae${_scopeId}><dt data-v-84e00cae${_scopeId}>Google email</dt><dd data-v-84e00cae${_scopeId}>${ssrInterpolate(user.googleEmail || "not set")}</dd></div></dl><div class="actions" data-v-84e00cae${_scopeId}><button class="mini-link" type="button" data-v-84e00cae${_scopeId}>Edit</button><button class="mini-link" type="button" data-v-84e00cae${_scopeId}>Change password</button><button class="mini-link" type="button" data-v-84e00cae${_scopeId}>${ssrInterpolate(user.status === "active" ? "Disable" : "Enable")}</button></div></article>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              unref(pending) ? (openBlock(), createBlock("p", {
                key: 0,
                class: "muted"
              }, "Reading server/data/admin-users.json...")) : (openBlock(), createBlock("div", {
                key: 1,
                class: "users-list"
              }, [
                !unref(users2).length ? (openBlock(), createBlock("article", {
                  key: 0,
                  class: "empty-state"
                }, [
                  createVNode("strong", null, "No file-based admin users yet."),
                  createVNode("p", null, "The current login can still use the environment bootstrap. Create the first admin user here before production.")
                ])) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(unref(users2), (user) => {
                  return openBlock(), createBlock("article", {
                    key: user.id,
                    class: "user-card"
                  }, [
                    createVNode("div", { class: "user-main" }, [
                      createVNode("div", null, [
                        createVNode("strong", null, toDisplayString(user.name), 1),
                        createVNode("span", null, toDisplayString(user.email), 1),
                        createVNode("small", null, "@" + toDisplayString(user.username) + " · " + toDisplayString(providerLabel(user.authProvider)), 1)
                      ]),
                      createVNode("div", { class: "user-badges" }, [
                        createVNode("span", { class: "status-badge" }, toDisplayString(user.status), 1),
                        createVNode("span", { class: "status-badge" }, toDisplayString(providerLabel(user.authProvider)), 1)
                      ])
                    ]),
                    createVNode("dl", { class: "user-meta" }, [
                      createVNode("div", null, [
                        createVNode("dt", null, "Created"),
                        createVNode("dd", null, toDisplayString(user.createdAt || "not set"), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("dt", null, "Updated"),
                        createVNode("dd", null, toDisplayString(user.updatedAt || "not set"), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("dt", null, "Last login"),
                        createVNode("dd", null, toDisplayString(user.lastLoginAt || "never"), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("dt", null, "Google email"),
                        createVNode("dd", null, toDisplayString(user.googleEmail || "not set"), 1)
                      ])
                    ]),
                    createVNode("div", { class: "actions" }, [
                      createVNode("button", {
                        class: "mini-link",
                        type: "button",
                        onClick: ($event) => startEdit(user)
                      }, "Edit", 8, ["onClick"]),
                      createVNode("button", {
                        class: "mini-link",
                        type: "button",
                        onClick: ($event) => startPassword(user)
                      }, "Change password", 8, ["onClick"]),
                      createVNode("button", {
                        class: "mini-link",
                        type: "button",
                        onClick: ($event) => handleStatus(user)
                      }, toDisplayString(user.status === "active" ? "Disable" : "Enable"), 9, ["onClick"])
                    ])
                  ]);
                }), 128))
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<aside class="users-side" data-v-84e00cae>`);
      _push(ssrRenderComponent(_component_AdminPanel, {
        title: "New user",
        eyebrow: "Create admin"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="user-form" data-v-84e00cae${_scopeId}><label data-v-84e00cae${_scopeId}> Provider <select data-v-84e00cae${_scopeId}><option value="password" data-v-84e00cae${ssrIncludeBooleanAttr(Array.isArray(unref(newUser).authProvider) ? ssrLooseContain(unref(newUser).authProvider, "password") : ssrLooseEqual(unref(newUser).authProvider, "password")) ? " selected" : ""}${_scopeId}>Password</option><option value="google" data-v-84e00cae${ssrIncludeBooleanAttr(Array.isArray(unref(newUser).authProvider) ? ssrLooseContain(unref(newUser).authProvider, "google") : ssrLooseEqual(unref(newUser).authProvider, "google")) ? " selected" : ""}${_scopeId}>Google</option></select></label><label data-v-84e00cae${_scopeId}> Name <input${ssrRenderAttr("value", unref(newUser).name)} type="text" required data-v-84e00cae${_scopeId}></label><label data-v-84e00cae${_scopeId}> Email <input${ssrRenderAttr("value", unref(newUser).email)} type="email" required data-v-84e00cae${_scopeId}></label><label data-v-84e00cae${_scopeId}> Username <input${ssrRenderAttr("value", unref(newUser).username)} type="text" required data-v-84e00cae${_scopeId}></label>`);
            if (unref(newUser).authProvider === "google") {
              _push2(`<label data-v-84e00cae${_scopeId}> Google email <input${ssrRenderAttr("value", unref(newUser).googleEmail)} type="email" placeholder="admin@example.com" data-v-84e00cae${_scopeId}></label>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(newUser).authProvider === "password") {
              _push2(`<!--[--><label data-v-84e00cae${_scopeId}> Password <input${ssrRenderAttr("value", unref(newUser).password)} minlength="10" type="password" required data-v-84e00cae${_scopeId}></label><label data-v-84e00cae${_scopeId}> Confirm password <input${ssrRenderAttr("value", unref(newUser).confirmPassword)} minlength="10" type="password" required data-v-84e00cae${_scopeId}></label><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="studio-btn"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} type="submit" data-v-84e00cae${_scopeId}>New user</button></form>`);
          } else {
            return [
              createVNode("form", {
                class: "user-form",
                onSubmit: withModifiers(handleCreateUser, ["prevent"])
              }, [
                createVNode("label", null, [
                  createTextVNode(" Provider "),
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => unref(newUser).authProvider = $event
                  }, [
                    createVNode("option", { value: "password" }, "Password"),
                    createVNode("option", { value: "google" }, "Google")
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, unref(newUser).authProvider]
                  ])
                ]),
                createVNode("label", null, [
                  createTextVNode(" Name "),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(newUser).name = $event,
                    type: "text",
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(newUser).name]
                  ])
                ]),
                createVNode("label", null, [
                  createTextVNode(" Email "),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(newUser).email = $event,
                    type: "email",
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(newUser).email]
                  ])
                ]),
                createVNode("label", null, [
                  createTextVNode(" Username "),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(newUser).username = $event,
                    type: "text",
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(newUser).username]
                  ])
                ]),
                unref(newUser).authProvider === "google" ? (openBlock(), createBlock("label", { key: 0 }, [
                  createTextVNode(" Google email "),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(newUser).googleEmail = $event,
                    type: "email",
                    placeholder: "admin@example.com"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(newUser).googleEmail]
                  ])
                ])) : createCommentVNode("", true),
                unref(newUser).authProvider === "password" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode("label", null, [
                    createTextVNode(" Password "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(newUser).password = $event,
                      minlength: "10",
                      type: "password",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(newUser).password]
                    ])
                  ]),
                  createVNode("label", null, [
                    createTextVNode(" Confirm password "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(newUser).confirmPassword = $event,
                      minlength: "10",
                      type: "password",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(newUser).confirmPassword]
                    ])
                  ])
                ], 64)) : createCommentVNode("", true),
                createVNode("button", {
                  class: "studio-btn",
                  disabled: unref(isSaving),
                  type: "submit"
                }, "New user", 8, ["disabled"])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(editingUserId)) {
        _push(ssrRenderComponent(_component_AdminPanel, {
          title: "Edit user",
          eyebrow: "Profile"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<form class="user-form" data-v-84e00cae${_scopeId}><label data-v-84e00cae${_scopeId}> Provider <select data-v-84e00cae${_scopeId}><option value="password" data-v-84e00cae${ssrIncludeBooleanAttr(Array.isArray(unref(editForm).authProvider) ? ssrLooseContain(unref(editForm).authProvider, "password") : ssrLooseEqual(unref(editForm).authProvider, "password")) ? " selected" : ""}${_scopeId}>Password</option><option value="google" data-v-84e00cae${ssrIncludeBooleanAttr(Array.isArray(unref(editForm).authProvider) ? ssrLooseContain(unref(editForm).authProvider, "google") : ssrLooseEqual(unref(editForm).authProvider, "google")) ? " selected" : ""}${_scopeId}>Google</option></select></label><label data-v-84e00cae${_scopeId}> Name <input${ssrRenderAttr("value", unref(editForm).name)} type="text" required data-v-84e00cae${_scopeId}></label><label data-v-84e00cae${_scopeId}> Email <input${ssrRenderAttr("value", unref(editForm).email)} type="email" required data-v-84e00cae${_scopeId}></label><label data-v-84e00cae${_scopeId}> Username <input${ssrRenderAttr("value", unref(editForm).username)} type="text" required data-v-84e00cae${_scopeId}></label><label data-v-84e00cae${_scopeId}> Google email <input${ssrRenderAttr("value", unref(editForm).googleEmail)} type="email" data-v-84e00cae${_scopeId}></label><div class="actions" data-v-84e00cae${_scopeId}><button class="studio-btn"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} type="submit" data-v-84e00cae${_scopeId}>Save user</button><button class="ghost-btn" type="button" data-v-84e00cae${_scopeId}>Cancel</button></div></form>`);
            } else {
              return [
                createVNode("form", {
                  class: "user-form",
                  onSubmit: withModifiers(handleUpdateUser, ["prevent"])
                }, [
                  createVNode("label", null, [
                    createTextVNode(" Provider "),
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => unref(editForm).authProvider = $event
                    }, [
                      createVNode("option", { value: "password" }, "Password"),
                      createVNode("option", { value: "google" }, "Google")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, unref(editForm).authProvider]
                    ])
                  ]),
                  createVNode("label", null, [
                    createTextVNode(" Name "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(editForm).name = $event,
                      type: "text",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(editForm).name]
                    ])
                  ]),
                  createVNode("label", null, [
                    createTextVNode(" Email "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(editForm).email = $event,
                      type: "email",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(editForm).email]
                    ])
                  ]),
                  createVNode("label", null, [
                    createTextVNode(" Username "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(editForm).username = $event,
                      type: "text",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(editForm).username]
                    ])
                  ]),
                  createVNode("label", null, [
                    createTextVNode(" Google email "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(editForm).googleEmail = $event,
                      type: "email"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(editForm).googleEmail]
                    ])
                  ]),
                  createVNode("div", { class: "actions" }, [
                    createVNode("button", {
                      class: "studio-btn",
                      disabled: unref(isSaving),
                      type: "submit"
                    }, "Save user", 8, ["disabled"]),
                    createVNode("button", {
                      class: "ghost-btn",
                      type: "button",
                      onClick: cancelEdit
                    }, "Cancel")
                  ])
                ], 32)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(passwordUserId)) {
        _push(ssrRenderComponent(_component_AdminPanel, {
          title: "Change password",
          eyebrow: "Password user"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<form class="user-form" data-v-84e00cae${_scopeId}><label data-v-84e00cae${_scopeId}> New password <input${ssrRenderAttr("value", unref(passwordForm).password)} minlength="10" type="password" required data-v-84e00cae${_scopeId}></label><label data-v-84e00cae${_scopeId}> Confirm password <input${ssrRenderAttr("value", unref(passwordForm).confirmPassword)} minlength="10" type="password" required data-v-84e00cae${_scopeId}></label><div class="actions" data-v-84e00cae${_scopeId}><button class="studio-btn"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} type="submit" data-v-84e00cae${_scopeId}>Change password</button><button class="ghost-btn" type="button" data-v-84e00cae${_scopeId}>Cancel</button></div></form>`);
            } else {
              return [
                createVNode("form", {
                  class: "user-form",
                  onSubmit: withModifiers(handlePasswordChange, ["prevent"])
                }, [
                  createVNode("label", null, [
                    createTextVNode(" New password "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(passwordForm).password = $event,
                      minlength: "10",
                      type: "password",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(passwordForm).password]
                    ])
                  ]),
                  createVNode("label", null, [
                    createTextVNode(" Confirm password "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(passwordForm).confirmPassword = $event,
                      minlength: "10",
                      type: "password",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(passwordForm).confirmPassword]
                    ])
                  ]),
                  createVNode("div", { class: "actions" }, [
                    createVNode("button", {
                      class: "studio-btn",
                      disabled: unref(isSaving),
                      type: "submit"
                    }, "Change password", 8, ["disabled"]),
                    createVNode("button", {
                      class: "ghost-btn",
                      type: "button",
                      onClick: cancelPassword
                    }, "Cancel")
                  ])
                ], 32)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(statusMessage)) {
        _push(`<p class="notice success" data-v-84e00cae>${ssrInterpolate(unref(statusMessage))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(errorMessage)) {
        _push(`<p class="notice error" data-v-84e00cae>${ssrInterpolate(unref(errorMessage))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</aside></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const users = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-84e00cae"]]);

export { users as default };
//# sourceMappingURL=users-C_D3uvJv.mjs.map
