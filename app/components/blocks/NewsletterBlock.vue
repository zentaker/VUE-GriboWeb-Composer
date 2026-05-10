<script setup lang="ts">
const submitted = ref(false)

const submitMock = () => {
  submitted.value = true
}
</script>

<template>
  <section id="newsletter" class="newsletter">
    <div class="newsletter-inner">
      <div>
        <h2>Follow the build.</h2>
        <p>Get progress notes, prototypes, essays and technical decisions from Gribo Digital.</p>
      </div>
      <form class="signup" @submit.prevent="submitMock">
        <input type="email" placeholder="you@email.com" aria-label="Email" disabled>
        <button type="submit">Subscribe</button>
        <span v-if="submitted" class="mock-message">Subscription flow is a visual mock for now.</span>
      </form>
    </div>
  </section>
</template>

<style scoped>
.newsletter {
  margin: 48px 0 0;
  padding: 0 0 56px;
}

.newsletter-inner {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 32px;
  align-items: end;
  padding: clamp(32px, 5vw, 68px);
  border-radius: 36px;
  background: linear-gradient(135deg, var(--rose), var(--lavender));
  color: #191714;
}

h2 {
  margin: 0;
  font-size: clamp(42px, 6vw, 92px);
  line-height: 0.9;
  letter-spacing: -0.08em;
}

p {
  max-width: 580px;
  margin: 20px 0 0;
  color: rgba(25, 23, 20, 0.72);
  font-size: 18px;
}

.signup {
  position: relative;
  display: flex;
  gap: 10px;
  padding: 8px;
  border: 1px solid rgba(25, 23, 20, 0.12);
  border-radius: 999px;
  background: rgba(255, 250, 244, 0.62);
}

input {
  min-width: 0;
  flex: 1;
  padding: 0 14px;
  border: 0;
  background: transparent;
  color: #191714;
  outline: 0;
}

input::placeholder {
  color: rgba(25, 23, 20, 0.52);
}

button {
  border: 0;
  border-radius: 999px;
  background: #191714;
  color: white;
  cursor: pointer;
  font-weight: 800;
  padding: 14px 20px;
}

.mock-message {
  position: absolute;
  left: 18px;
  top: calc(100% + 10px);
  color: rgba(25, 23, 20, 0.72);
  font-size: 0.82rem;
}

@media (max-width: 1100px) {
  .newsletter-inner {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .signup {
    align-items: stretch;
    border-radius: 24px;
    flex-direction: column;
  }

  input,
  button {
    min-height: 44px;
  }
}
</style>
