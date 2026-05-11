<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

type AnalyticsSummary = {
  overview: {
    totalViews: number
    totalReads: number
    readCompletions: number
    ctaClicks: number
    completionRate: number
  }
  content: Array<{
    title: string
    contentType: string
    slug: string
    route: string
    lab: string
    views: number
    readStarts: number
    readCompletes: number
    ctaClicks: number
    completionRate: number
    lastViewedAt: string
  }>
  labs: Array<{
    lab: string
    views: number
    reads: number
    completions: number
  }>
  types: Array<{
    contentType: string
    views: number
    reads: number
    completions: number
    ctaClicks: number
  }>
  recentEvents: Array<{
    eventId: string
    eventType: string
    contentType: string
    title: string
    route: string
    lab: string
    timestamp: string
  }>
}

const requestHeaders = import.meta.server ? useRequestHeaders(['cookie']) : undefined
const confirmation = ref('')
const statusMessage = ref('')
const isClearing = ref(false)

const { data: summary, pending, refresh } = await useAsyncData('admin-analytics-summary', () => $fetch<AnalyticsSummary>('/api/admin/analytics/summary', {
  headers: requestHeaders
}))

const overviewCards = computed(() => [
  { label: 'Total views', value: summary.value?.overview.totalViews ?? 0 },
  { label: 'Total reads', value: summary.value?.overview.totalReads ?? 0 },
  { label: 'Completion rate', value: `${summary.value?.overview.completionRate ?? 0}%` },
  { label: 'CTA clicks', value: summary.value?.overview.ctaClicks ?? 0 }
])

function formatDate(value: string) {
  if (!value) return 'No views yet'
  return new Date(value).toLocaleString('en', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function exportAnalytics() {
  window.location.href = '/api/admin/analytics/export'
}

async function clearAnalytics() {
  statusMessage.value = ''

  if (confirmation.value !== 'CLEAR ANALYTICS') {
    statusMessage.value = 'Type CLEAR ANALYTICS to clear anonymous events.'
    return
  }

  isClearing.value = true

  try {
    await $fetch('/api/admin/analytics/clear', {
      method: 'POST',
      body: {
        confirmation: confirmation.value
      }
    })
    statusMessage.value = 'Analytics data cleared.'
    confirmation.value = ''
    await refresh()
  } catch (error: any) {
    statusMessage.value = error?.statusMessage || 'Analytics data could not be cleared.'
  } finally {
    isClearing.value = false
  }
}
</script>

<template>
  <div class="admin-page">
    <AdminHero
      eyebrow="Insights"
      title="Anonymous signals from the public archive."
      description="Stage 8 tracks page views, reading progress and CTA clicks without storing raw IP addresses or reader accounts."
    />

    <section class="privacy-note">
      <strong>Privacy note</strong>
      <p>Analytics are anonymous and do not require public user accounts. Stage 8 tracks page views, reading progress and CTA clicks without storing raw IP addresses.</p>
    </section>

    <section class="stat-grid" aria-label="Analytics overview">
      <article v-for="card in overviewCards" :key="card.label" class="stat-card">
        <span>{{ card.label }}</span>
        <strong>{{ card.value }}</strong>
      </article>
    </section>

    <div class="insights-actions">
      <button class="studio-btn" :disabled="pending" type="button" @click="refresh">Refresh metrics</button>
      <button class="studio-btn" type="button" @click="exportAnalytics">Export analytics JSON</button>
    </div>

    <section class="insights-grid">
      <AdminPanel title="Top content" eyebrow="By route">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Lab</th>
                <th>Views</th>
                <th>Reads</th>
                <th>Completion</th>
                <th>Last viewed</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in summary?.content ?? []" :key="item.route">
                <td>
                  <strong>{{ item.title }}</strong>
                  <small>{{ item.route }}</small>
                </td>
                <td>{{ item.contentType }}</td>
                <td>{{ item.lab || 'unassigned' }}</td>
                <td>{{ item.views }}</td>
                <td>{{ item.readStarts }}</td>
                <td>{{ item.completionRate }}%</td>
                <td>{{ formatDate(item.lastViewedAt) }}</td>
              </tr>
              <tr v-if="!(summary?.content.length)">
                <td colspan="7">No analytics events yet. Open a public page to record the first anonymous view.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </AdminPanel>

      <div class="side-stack">
        <AdminPanel title="Metrics by lab" eyebrow="Editorial line">
          <div class="mini-list">
            <div v-for="lab in summary?.labs ?? []" :key="lab.lab" class="mini-row">
              <strong>{{ lab.lab }}</strong>
              <span>{{ lab.views }} views · {{ lab.reads }} reads · {{ lab.completions }} complete</span>
            </div>
            <p v-if="!(summary?.labs.length)" class="muted">No lab metrics yet.</p>
          </div>
        </AdminPanel>

        <AdminPanel title="Metrics by type" eyebrow="Content model">
          <div class="mini-list">
            <div v-for="type in summary?.types ?? []" :key="type.contentType" class="mini-row">
              <strong>{{ type.contentType }}</strong>
              <span>{{ type.views }} views · {{ type.reads }} reads · {{ type.ctaClicks }} CTA</span>
            </div>
            <p v-if="!(summary?.types.length)" class="muted">No type metrics yet.</p>
          </div>
        </AdminPanel>
      </div>
    </section>

    <section class="insights-grid">
      <AdminPanel title="Recent anonymous events" eyebrow="Debug surface">
        <div class="event-list">
          <div v-for="event in summary?.recentEvents ?? []" :key="event.eventId" class="event-row">
            <span>{{ event.eventType }}</span>
            <strong>{{ event.title }}</strong>
            <small>{{ event.route }} · {{ formatDate(event.timestamp) }}</small>
          </div>
          <p v-if="!(summary?.recentEvents.length)" class="muted">No recent events yet.</p>
        </div>
      </AdminPanel>

      <AdminPanel title="Danger Zone" eyebrow="Data management">
        <p class="muted">Clear removes local anonymous analytics events. It does not touch editorial content, users, backups or Home Composer data.</p>
        <label class="danger-label">
          Confirmation
          <input v-model="confirmation" type="text" placeholder="CLEAR ANALYTICS">
        </label>
        <button class="danger-btn" :disabled="isClearing" type="button" @click="clearAnalytics">
          {{ isClearing ? 'Clearing...' : 'Clear analytics data' }}
        </button>
        <p v-if="statusMessage" class="status-message">{{ statusMessage }}</p>
      </AdminPanel>
    </section>
  </div>
</template>

<style scoped>
.admin-page,
.side-stack,
.mini-list,
.event-list {
  display: grid;
  gap: 18px;
}

.privacy-note,
.stat-card {
  border: 1px solid var(--line);
  border-radius: 24px;
  background: var(--paper-soft);
  box-shadow: var(--shadow);
}

.privacy-note {
  padding: 20px;
}

.privacy-note strong {
  display: block;
  letter-spacing: -0.035em;
}

.privacy-note p,
.muted,
.status-message {
  margin: 8px 0 0;
  color: var(--muted);
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.stat-card {
  min-height: 132px;
  padding: 22px;
}

.stat-card span {
  color: var(--muted);
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.stat-card strong {
  display: block;
  margin-top: 18px;
  font-size: clamp(34px, 5vw, 62px);
  line-height: 0.9;
  letter-spacing: -0.075em;
}

.insights-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.studio-btn,
.danger-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper);
  color: var(--ink);
  font-weight: 850;
  cursor: pointer;
}

.danger-btn {
  margin-top: 14px;
  border-color: color-mix(in srgb, var(--coral), transparent 40%);
  background: color-mix(in srgb, var(--coral), transparent 72%);
  color: var(--coral);
}

.studio-btn:disabled,
.danger-btn:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.insights-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 18px;
  align-items: start;
}

.table-wrap {
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;
}

th,
td {
  padding: 14px 12px;
  border-bottom: 1px solid var(--line);
  text-align: left;
}

th {
  color: var(--muted);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

td strong {
  display: block;
  letter-spacing: -0.03em;
}

td small,
.event-row small,
.mini-row span {
  display: block;
  margin-top: 4px;
  color: var(--muted);
  font-size: 12px;
}

.mini-row,
.event-row {
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper);
}

.event-row span {
  color: var(--coral);
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.danger-label {
  display: grid;
  gap: 8px;
  margin-top: 16px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

input {
  min-height: 44px;
  padding: 0 13px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper);
  color: var(--ink);
  font: inherit;
  letter-spacing: 0;
  text-transform: none;
}

@media (max-width: 1180px) {
  .stat-grid,
  .insights-grid {
    grid-template-columns: 1fr;
  }
}
</style>
