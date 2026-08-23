<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import api from "@/api";
import DOMPurify from "dompurify";
import router from "@/router";

const route = useRoute();
const artifact = ref(null);
const isLoading = ref(true);
const notFound = ref(false);
const imageBaseUrl = "http://localhost:4000/uploads/";

const isAdmin = ref(false);


onBeforeMount(async () => {
  try {
    let token = localStorage.getItem("token") || null;
    if (token) {
      isAdmin.value = true;
    }
    const res = await api.get(`/artifacts/${route.params.id}`);
    if (res.status === 200) {
      artifact.value = res.data.artifact;
    }
  } catch (error) {
    notFound.value = true;
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="viewer">
    <!-- ambient layered rings, decorative -->
    <div class="ring-field" aria-hidden="true">
      <span class="ring ring--a"></span>
      <span class="ring ring--b"></span>
      <span class="ring ring--c"></span>
    </div>

    <header class="top-bar">
      <div class="wordmark">
        <router-link v-if="isAdmin" to="/" class="back-btn text-decoration-none" >
          <span class="back-btn__arrow" aria-hidden="true">←</span>
          Back
        </router-link to="/">
        <span class="wordmark__mark">Q</span>
        <span class="wordmark__text">Qrator</span>
      </div>
      <router-link to="/about" class="about-link">About</router-link>
    </header>

    <main class="stage">
      <!-- Loading state -->
      <div v-if="isLoading" class="status-card" role="status">
        <div class="spinner" aria-hidden="true"></div>
        <p>Unearthing record…</p>
      </div>

      <!-- Not found state -->
      <div v-else-if="notFound" class="status-card status-card--empty">
        <p class="status-card__eyebrow">No Record Found</p>
        <h1 class="status-card__title">This layer is missing.</h1>
        <p class="status-card__body">
          The artifact linked to this code could not be located in the archive.
          It may have been removed, or the code may be damaged.
        </p>
      </div>

      <!-- Artifact card -->
      <article v-else class="card">
        <div class="card__media">
          <div class="media-rings" aria-hidden="true">
            <span class="media-ring media-ring--a"></span>
            <span class="media-ring media-ring--b"></span>
          </div>
          <img
            :src="imageBaseUrl + artifact.image"
            :alt="artifact.name"
            class="card__image"
          />
        </div>

        <div class="card__body">
          <p class="card__eyebrow">Preserved Artifact</p>
          <h1 class="card__title">{{ artifact.name }}</h1>

          <div
            class="card__description"
            v-html="DOMPurify.sanitize(artifact.description)"
          ></div>
        </div>
      </article>
    </main>

    <footer class="page-footer">
      <p>Catalogued and safeguarded by Qrator</p>
    </footer>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap");

.viewer {
  --skin-deep: #4a1e3d;
  --skin-mid: #7a2e52;
  --skin-gold: #c9a15c;
  --parchment: #fbf4e8;
  --surface: #ffffff;
  --ink: #2b211d;
  --ink-soft: #6b5c53;

  position: relative;
  min-height: 100vh;
  background: var(--parchment);
  color: var(--ink);
  font-family: "Inter", sans-serif;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

/* ===== Ambient background rings (signature motif) ===== */
.ring-field {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid transparent;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: 1px solid #e4d6c2;
  border-radius: 999px;
  padding: 0.45rem 0.95rem;
  font-family: "Inter", sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--skin-deep);
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;
}

.back-btn:hover {
  background: rgba(122, 46, 82, 0.06);
  border-color: var(--skin-mid);
}

.back-btn__arrow {
  transition: transform 0.15s ease;
}

.back-btn:hover .back-btn__arrow {
  transform: translateX(-2px);
}

.ring--a {
  width: 620px;
  height: 620px;
  top: -220px;
  left: -220px;
  border-color: rgba(122, 46, 82, 0.18);
}

.ring--b {
  width: 460px;
  height: 460px;
  top: -140px;
  left: -140px;
  border-color: rgba(201, 161, 92, 0.28);
}

.ring--c {
  width: 720px;
  height: 720px;
  bottom: -320px;
  right: -280px;
  border-color: rgba(74, 30, 61, 0.12);
}

/* ===== Header ===== */
.top-bar {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.75rem clamp(1.25rem, 5vw, 3rem) 0.5rem;
}

.wordmark {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.wordmark__mark {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--skin-deep);
  color: var(--parchment);
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 0.95rem;
}

.wordmark__text {
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--skin-deep);
  font-weight: 600;
}

.about-link {
  font-family: "Inter", sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--skin-mid);
  text-decoration: none;
  padding: 0.4rem 0.9rem;
  border: 1px solid #e4d6c2;
  border-radius: 999px;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;
}

.about-link:hover {
  border-color: var(--skin-mid);
  background: rgba(122, 46, 82, 0.06);
}

/* ===== Stage / layout ===== */
.stage {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem clamp(1.25rem, 5vw, 3rem) 3rem;
}

/* ===== Status states (loading / not found) ===== */
.status-card {
  text-align: center;
  max-width: 420px;
  color: var(--ink-soft);
}

.spinner {
  width: 34px;
  height: 34px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  border: 3px solid rgba(122, 46, 82, 0.18);
  border-top-color: var(--skin-mid);
  animation: spin 0.85s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation-duration: 2.4s;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.status-card--empty .status-card__eyebrow {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--skin-mid);
  margin-bottom: 0.6rem;
}

.status-card__title {
  font-family: "Fraunces", serif;
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  color: var(--skin-deep);
  margin: 0 0 0.75rem;
  font-weight: 500;
}

.status-card__body {
  font-size: 0.95rem;
  line-height: 1.6;
}

/* ===== Card ===== */
.card {
  position: relative;
  width: 100%;
  max-width: 900px;
  background: var(--surface);
  border-radius: 22px;
  box-shadow:
    0 1px 2px rgba(43, 33, 29, 0.04),
    0 24px 48px -20px rgba(74, 30, 61, 0.22);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
}

.card__media {
  position: relative;
  isolation: isolate;
  display: grid;
  place-items: center;
  padding: clamp(1.75rem, 5vw, 2.5rem);
  background: linear-gradient(160deg, #f4e6d8 0%, var(--parchment) 100%);
}

.media-rings {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 0;
}

.media-ring {
  position: absolute;
  border-radius: 50%;
}

.media-ring--a {
  width: 78%;
  aspect-ratio: 1;
  border: 2px solid var(--skin-gold);
  opacity: 0.5;
}

.media-ring--b {
  width: 60%;
  aspect-ratio: 1;
  border: 2px solid var(--skin-mid);
  opacity: 0.35;
}

.card__image {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
  border: 6px solid var(--surface);
  box-shadow: 0 12px 32px -12px rgba(74, 30, 61, 0.35);
}

.card__body {
  padding: clamp(1.75rem, 5vw, 2.75rem);
}

.card__eyebrow {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--skin-gold);
  margin: 0 0 0.6rem;
}

.card__title {
  font-family: "Fraunces", serif;
  font-weight: 500;
  font-size: clamp(1.9rem, 4.5vw, 2.6rem);
  line-height: 1.1;
  color: var(--skin-deep);
  margin: 0 0 1.1rem;
}

.card__description {
  font-size: 0.98rem;
  line-height: 1.75;
  color: var(--ink);
}

.card__description :deep(p) {
  margin: 0 0 0.9rem;
}

.card__description :deep(p:last-child) {
  margin-bottom: 0;
}

.card__footer {
  margin-top: 1.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid #ece2d3;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.accession {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.accession__label {
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.accession__value {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.9rem;
  color: var(--skin-mid);
  font-weight: 500;
}

.verified {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--ink-soft);
}

.verified__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #5c8a5c;
}

/* ===== Footer ===== */
.page-footer {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 1.5rem;
  font-size: 0.78rem;
  color: var(--ink-soft);
}

/* ===== Focus visibility ===== */
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--skin-mid);
  outline-offset: 3px;
}

/* ===== Desktop: side-by-side layout ===== */
@media (min-width: 768px) {
  .card {
    grid-template-columns: 0.85fr 1fr;
  }

  .card__media {
    padding: 3rem;
  }
}
</style>
