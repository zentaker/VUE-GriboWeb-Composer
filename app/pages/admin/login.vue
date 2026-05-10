<script setup lang="ts">
definePageMeta({
  layout: false
})

const route = useRoute()
const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const { data: session } = await useFetch('/api/auth/session')

const redirectPath = computed(() => {
  const value = route.query.redirect
  return typeof value === 'string' && value.startsWith('/admin') && value !== '/admin/login'
    ? value
    : '/admin'
})

if (session.value?.authenticated) {
  await navigateTo(redirectPath.value)
}

async function login() {
  errorMessage.value = ''
  isLoading.value = true

  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })

    await navigateTo(redirectPath.value)
  } catch (error: any) {
    errorMessage.value = error?.statusMessage || 'Unable to sign in.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="login-shell">
    <section class="login-card">
      <NuxtLink class="brand login-brand" to="/">
        <BrandMark />
        <span>Gribo<br><small>Studio</small></span>
      </NuxtLink>

      <div class="login-copy">
        <p class="eyebrow"><span class="pulse" />Admin safety gate</p>
        <h1>Sign in to Gribo Studio.</h1>
        <p>
          The public archive remains open. Editing surfaces and admin APIs require a valid session.
        </p>
      </div>

      <form class="login-form" @submit.prevent="login">
        <label>
          <span>Username</span>
          <input v-model="username" autocomplete="username" name="username" required type="text">
        </label>
        <label>
          <span>Password</span>
          <input v-model="password" autocomplete="current-password" name="password" required type="password">
        </label>

        <p v-if="session && !session.loginEnabled" class="login-error">
          {{ session.reason || 'Admin login is not configured.' }}
        </p>
        <p v-else-if="errorMessage" class="login-error">{{ errorMessage }}</p>

        <button class="studio-button primary" :disabled="isLoading || (session && !session.loginEnabled)" type="submit">
          {{ isLoading ? 'Signing in...' : 'Login' }}
        </button>
      </form>
    </section>
  </main>
</template>

<style scoped>
.login-shell {
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: clamp(22px, 4vw, 48px);
  background:
    radial-gradient(circle at 82% 12%, rgba(255, 121, 109, 0.14), transparent 28%),
    radial-gradient(circle at 18% 18%, rgba(119, 103, 201, 0.14), transparent 28%),
    var(--bg);
}

.login-card {
  display: grid;
  width: min(920px, 100%);
  grid-template-columns: 1fr minmax(280px, 390px);
  gap: clamp(24px, 4vw, 48px);
  padding: clamp(24px, 5vw, 56px);
  border: 1px solid var(--line);
  border-radius: 34px;
  background: linear-gradient(145deg, var(--paper), var(--paper-muted));
  box-shadow: var(--shadow);
}

.login-brand {
  align-self: start;
  font-weight: 900;
  letter-spacing: -0.055em;
}

.login-brand small {
  display: block;
  margin-top: -4px;
  color: var(--muted);
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.login-copy {
  grid-column: 1;
}

.login-copy h1 {
  max-width: 520px;
  margin: 18px 0;
  font-size: clamp(48px, 7vw, 82px);
  line-height: 0.9;
  letter-spacing: -0.08em;
}

.login-copy p:last-child {
  max-width: 520px;
  color: var(--muted);
  font-size: 18px;
  line-height: 1.5;
}

.login-form {
  display: grid;
  align-self: end;
  gap: 16px;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: var(--paper-soft);
}

.login-form label {
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.login-form input {
  min-height: 46px;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--paper);
  color: var(--ink);
  letter-spacing: 0;
  outline: none;
}

.login-form input:focus {
  border-color: color-mix(in srgb, var(--coral), var(--line) 35%);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--coral), transparent 86%);
}

.studio-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 18px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper-soft);
  color: var(--ink);
  cursor: pointer;
  font-weight: 780;
}

.studio-button.primary {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--bg);
}

.studio-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.login-error {
  margin: 0;
  padding: 12px 14px;
  border: 1px solid color-mix(in srgb, var(--coral), var(--line) 35%);
  border-radius: 16px;
  background: color-mix(in srgb, var(--coral), transparent 88%);
  color: var(--ink);
  font-size: 14px;
  line-height: 1.4;
}

@media (max-width: 760px) {
  .login-card {
    grid-template-columns: 1fr;
  }
}
</style>
