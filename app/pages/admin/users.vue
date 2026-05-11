<script setup lang="ts">
import type { AdminUserProvider, AdminUserRecord } from '~/composables/useAdminUsers'

definePageMeta({
  layout: 'admin'
})

const { listUsers, createUser, updateUser, setUserStatus, changePassword } = useAdminUsers()
const { data, pending, refresh } = await useAsyncData('admin-users-list', listUsers)
const users = computed(() => data.value?.users ?? [])

const statusMessage = ref('')
const errorMessage = ref('')
const isSaving = ref(false)
const editingUserId = ref('')
const passwordUserId = ref('')

const newUser = reactive({
  name: '',
  email: '',
  username: '',
  authProvider: 'password' as AdminUserProvider,
  googleEmail: '',
  password: '',
  confirmPassword: ''
})

const editForm = reactive({
  name: '',
  email: '',
  username: '',
  authProvider: 'password' as AdminUserProvider,
  googleEmail: ''
})

const passwordForm = reactive({
  password: '',
  confirmPassword: ''
})

function resetMessages() {
  statusMessage.value = ''
  errorMessage.value = ''
}

function providerLabel(provider: string) {
  return provider === 'google' ? 'Google' : 'Password'
}

function startEdit(user: AdminUserRecord) {
  editingUserId.value = user.id
  passwordUserId.value = ''
  editForm.name = user.name
  editForm.email = user.email
  editForm.username = user.username
  editForm.authProvider = user.authProvider
  editForm.googleEmail = user.googleEmail || ''
  resetMessages()
}

function cancelEdit() {
  editingUserId.value = ''
}

function startPassword(user: AdminUserRecord) {
  passwordUserId.value = user.id
  editingUserId.value = ''
  passwordForm.password = ''
  passwordForm.confirmPassword = ''
  resetMessages()
}

function cancelPassword() {
  passwordUserId.value = ''
}

async function handleCreateUser() {
  resetMessages()
  isSaving.value = true

  try {
    await createUser({ ...newUser })
    statusMessage.value = 'Admin user created.'
    newUser.name = ''
    newUser.email = ''
    newUser.username = ''
    newUser.googleEmail = ''
    newUser.password = ''
    newUser.confirmPassword = ''
    await refresh()
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || error?.message || 'User creation failed.'
  } finally {
    isSaving.value = false
  }
}

async function handleUpdateUser() {
  resetMessages()
  isSaving.value = true

  try {
    await updateUser({
      id: editingUserId.value,
      ...editForm
    })
    statusMessage.value = 'Admin user updated.'
    editingUserId.value = ''
    await refresh()
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || error?.message || 'User update failed.'
  } finally {
    isSaving.value = false
  }
}

async function handleStatus(user: AdminUserRecord) {
  resetMessages()
  isSaving.value = true

  try {
    await setUserStatus(user.id, user.status === 'active' ? 'disabled' : 'active')
    statusMessage.value = user.status === 'active' ? 'Admin user disabled.' : 'Admin user enabled.'
    await refresh()
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || error?.message || 'Status update failed.'
  } finally {
    isSaving.value = false
  }
}

async function handlePasswordChange() {
  resetMessages()
  isSaving.value = true

  try {
    await changePassword(passwordUserId.value, passwordForm.password, passwordForm.confirmPassword)
    statusMessage.value = 'Password changed.'
    passwordUserId.value = ''
    passwordForm.password = ''
    passwordForm.confirmPassword = ''
    await refresh()
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || error?.message || 'Password change failed.'
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="admin-page">
    <AdminHero
      eyebrow="Admin Users"
      title="People allowed into Gribo Studio."
      description="Minimal Stage 5.1 surface for password and Google-based administrators. Disable users instead of deleting them."
    />

    <section class="users-layout">
      <AdminPanel title="Admin users" eyebrow="Access list">
        <template #action>
          <button class="ghost-btn" type="button" @click="refresh">Refresh</button>
        </template>

        <p v-if="pending" class="muted">Reading server/data/admin-users.json...</p>
        <div v-else class="users-list">
          <article v-if="!users.length" class="empty-state">
            <strong>No file-based admin users yet.</strong>
            <p>The current login can still use the environment bootstrap. Create the first admin user here before production.</p>
          </article>

          <article v-for="user in users" :key="user.id" class="user-card">
            <div class="user-main">
              <div>
                <strong>{{ user.name }}</strong>
                <span>{{ user.email }}</span>
                <small>@{{ user.username }} · {{ providerLabel(user.authProvider) }}</small>
              </div>
              <div class="user-badges">
                <span class="status-badge">{{ user.status }}</span>
                <span class="status-badge">{{ providerLabel(user.authProvider) }}</span>
              </div>
            </div>

            <dl class="user-meta">
              <div>
                <dt>Created</dt>
                <dd>{{ user.createdAt || 'not set' }}</dd>
              </div>
              <div>
                <dt>Updated</dt>
                <dd>{{ user.updatedAt || 'not set' }}</dd>
              </div>
              <div>
                <dt>Last login</dt>
                <dd>{{ user.lastLoginAt || 'never' }}</dd>
              </div>
              <div>
                <dt>Google email</dt>
                <dd>{{ user.googleEmail || 'not set' }}</dd>
              </div>
            </dl>

            <div class="actions">
              <button class="mini-link" type="button" @click="startEdit(user)">Edit</button>
              <button class="mini-link" type="button" @click="startPassword(user)">Change password</button>
              <button class="mini-link" type="button" @click="handleStatus(user)">
                {{ user.status === 'active' ? 'Disable' : 'Enable' }}
              </button>
            </div>
          </article>
        </div>
      </AdminPanel>

      <aside class="users-side">
        <AdminPanel title="New user" eyebrow="Create admin">
          <form class="user-form" @submit.prevent="handleCreateUser">
            <label>
              Provider
              <select v-model="newUser.authProvider">
                <option value="password">Password</option>
                <option value="google">Google</option>
              </select>
            </label>
            <label>
              Name
              <input v-model="newUser.name" type="text" required>
            </label>
            <label>
              Email
              <input v-model="newUser.email" type="email" required>
            </label>
            <label>
              Username
              <input v-model="newUser.username" type="text" required>
            </label>
            <label v-if="newUser.authProvider === 'google'">
              Google email
              <input v-model="newUser.googleEmail" type="email" placeholder="admin@example.com">
            </label>
            <template v-if="newUser.authProvider === 'password'">
              <label>
                Password
                <input v-model="newUser.password" minlength="10" type="password" required>
              </label>
              <label>
                Confirm password
                <input v-model="newUser.confirmPassword" minlength="10" type="password" required>
              </label>
            </template>
            <button class="studio-btn" :disabled="isSaving" type="submit">New user</button>
          </form>
        </AdminPanel>

        <AdminPanel v-if="editingUserId" title="Edit user" eyebrow="Profile">
          <form class="user-form" @submit.prevent="handleUpdateUser">
            <label>
              Provider
              <select v-model="editForm.authProvider">
                <option value="password">Password</option>
                <option value="google">Google</option>
              </select>
            </label>
            <label>
              Name
              <input v-model="editForm.name" type="text" required>
            </label>
            <label>
              Email
              <input v-model="editForm.email" type="email" required>
            </label>
            <label>
              Username
              <input v-model="editForm.username" type="text" required>
            </label>
            <label>
              Google email
              <input v-model="editForm.googleEmail" type="email">
            </label>
            <div class="actions">
              <button class="studio-btn" :disabled="isSaving" type="submit">Save user</button>
              <button class="ghost-btn" type="button" @click="cancelEdit">Cancel</button>
            </div>
          </form>
        </AdminPanel>

        <AdminPanel v-if="passwordUserId" title="Change password" eyebrow="Password user">
          <form class="user-form" @submit.prevent="handlePasswordChange">
            <label>
              New password
              <input v-model="passwordForm.password" minlength="10" type="password" required>
            </label>
            <label>
              Confirm password
              <input v-model="passwordForm.confirmPassword" minlength="10" type="password" required>
            </label>
            <div class="actions">
              <button class="studio-btn" :disabled="isSaving" type="submit">Change password</button>
              <button class="ghost-btn" type="button" @click="cancelPassword">Cancel</button>
            </div>
          </form>
        </AdminPanel>

        <p v-if="statusMessage" class="notice success">{{ statusMessage }}</p>
        <p v-if="errorMessage" class="notice error">{{ errorMessage }}</p>
      </aside>
    </section>
  </div>
</template>

<style scoped>
.admin-page {
  display: grid;
  gap: 24px;
}

.users-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 20px;
  align-items: start;
}

.users-side {
  display: grid;
  position: sticky;
  top: calc(var(--topbar) + 22px);
  gap: 20px;
}

.users-list,
.user-form,
.actions {
  display: grid;
  gap: 12px;
}

.user-card,
.empty-state {
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--paper);
}

.user-main {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: start;
}

.user-main strong,
.empty-state strong {
  display: block;
  color: var(--ink);
  letter-spacing: -0.025em;
}

.user-main span,
.user-main small,
.empty-state p {
  display: block;
  margin-top: 4px;
  color: var(--muted);
  font-size: 13px;
}

.user-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  gap: 8px;
}

.user-meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin: 14px 0;
}

.user-meta div {
  min-width: 0;
  padding: 10px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--paper-soft);
}

.user-meta dt {
  color: var(--muted);
  font-size: 10px;
  font-weight: 850;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.user-meta dd {
  margin: 5px 0 0;
  overflow-wrap: anywhere;
  color: var(--ink);
  font-size: 12px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
}

.studio-btn,
.ghost-btn,
.mini-link {
  display: inline-grid;
  min-height: 38px;
  place-items: center;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper);
  color: var(--ink);
  cursor: pointer;
  font-size: 13px;
  font-weight: 760;
}

.studio-btn {
  border-color: var(--coral);
  background: var(--coral);
  color: #191714;
}

.studio-btn:disabled {
  cursor: wait;
  opacity: 0.65;
}

label {
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

input,
select {
  width: 100%;
  min-height: 44px;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--paper);
  color: var(--ink);
  font: inherit;
  letter-spacing: 0;
  outline: none;
  text-transform: none;
}

.notice {
  margin: 0;
  padding: 12px 14px;
  border: 1px solid var(--line);
  border-radius: 16px;
  color: var(--ink);
  font-size: 14px;
}

.notice.success {
  background: color-mix(in srgb, var(--mint), transparent 84%);
}

.notice.error {
  background: color-mix(in srgb, var(--coral), transparent 86%);
}

@media (max-width: 1120px) {
  .users-layout,
  .user-meta {
    grid-template-columns: 1fr;
  }

  .users-side {
    position: static;
  }
}
</style>

