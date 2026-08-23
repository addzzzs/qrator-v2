<script setup>
import { useRouter } from "vue-router";
import members from "@/data/members.json";

const router = useRouter();

const goBack = () => {
  router.back();
};

const membersImageBase = "/members/";

const principles = [
  {
    label: "01",
    title: "Preserve every story",
    body: "Each artifact is documented with its name, description, image, and historical information, keeping important cultural knowledge organized and accessible.",
  },
  {
    label: "02",
    title: "Connect people with artifacts",
    body: "A QR code connects each physical artifact to its digital record, allowing visitors to instantly explore its history and significance using their mobile devices.",
  },
  {
    label: "03",
    title: "Make information easier to manage",
    body: "Digital records reduce reliance on scattered documents and printed materials, making artifact information easier to update, maintain, and access when needed.",
  },
];
</script>

<template>
  <div class="about">
    <div class="ring-field" aria-hidden="true">
      <span class="ring ring--a"></span>
      <span class="ring ring--b"></span>
      <span class="ring ring--c"></span>
    </div>

    <header class="top-bar">
      <button class="back-btn" @click="goBack()">
        <span class="back-btn__arrow" aria-hidden="true">←</span>
        Back
      </button>

      <div class="wordmark">
        <span class="wordmark__mark">Q</span>
        <span class="wordmark__text">Qrator</span>
      </div>
    </header>

    <main class="content">
      <!-- Hero -->
      <section class="hero">
        <p class="hero__eyebrow">About QRator</p>

        <h1 class="hero__title">
          Every artifact<br />
          <span class="hero__title-accent">
            has a story worth preserving.
          </span>
        </h1>

        <p class="hero__body">
          QRator is a digital information system designed to make museum
          artifacts easier to explore, understand, and manage. By connecting
          physical exhibits with digital records through QR codes, visitors can
          access important information about an artifact directly from their
          mobile devices.
        </p>

        <p class="hero__body">
          Beyond improving access to information, QRator helps organize artifact
          records, reduce dependence on printed materials, and support the
          preservation of cultural and historical knowledge for future
          generations.
        </p>
      </section>

      <!-- Principles -->
      <section class="layers">
        <div
          v-for="(step, i) in principles"
          :key="step.label"
          class="layer"
          :style="{ '--i': i }"
        >
          <span class="layer__label">{{ step.label }}</span>

          <div class="layer__content">
            <h2 class="layer__title">{{ step.title }}</h2>
            <p class="layer__body">{{ step.body }}</p>
          </div>
        </div>
      </section>

      <!-- Team -->
      <section class="team">
        <p class="team__eyebrow">The People Behind QRator</p>

        <h2 class="team__title">A system built with purpose and care.</h2>

        <div class="team-grid">
          <a
            v-for="member in members"
            :key="member.name"
            :href="member.portfolio"
            target="_blank"
            rel="noopener noreferrer"
            class="member-card"
          >
            <div class="member-card__photo">
              <img :src="membersImageBase + member.img" :alt="member.name" />
            </div>

            <h3 class="member-card__name">
              {{ member.name }}
            </h3>

            <p class="member-card__role">
              {{ member.role }}
            </p>
          </a>
        </div>
      </section>

      <!-- Purpose -->
      <section class="origin">
        <div class="origin__card">
          <p class="origin__eyebrow">Why QRator Exists</p>

          <h2 class="origin__title">
            Turning museum visits into meaningful discoveries.
          </h2>

          <p class="origin__body">
            Museums play an important role in preserving cultural heritage, but
            traditional displays can sometimes provide only limited information
            about the objects being presented. Printed labels may not provide
            enough historical context, while manually maintained records can
            make information harder to organize and update.
          </p>

          <p class="origin__body">
            QRator addresses these challenges by providing a digital bridge
            between visitors and museum collections. With a simple scan,
            visitors can access information about an artifact at their own pace,
            while museum staff gain a more organized way to manage artifact
            information and understand visitor interactions.
          </p>

          <p class="origin__body">
            The goal is simple: preserve important stories, make them easier to
            access, and help create a more informative and engaging museum
            experience.
          </p>
        </div>
      </section>
    </main>

    <footer class="page-footer">
      <p>Connecting people with artifacts, information, and heritage.</p>
    </footer>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap");

.about {
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

/* ===== Ambient rings ===== */

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

.ring--a {
  width: 620px;
  height: 620px;
  top: -220px;
  left: -220px;
  border-color: rgba(122, 46, 82, 0.16);
}

.ring--b {
  width: 460px;
  height: 460px;
  top: -140px;
  left: -140px;
  border-color: rgba(201, 161, 92, 0.26);
}

.ring--c {
  width: 780px;
  height: 780px;
  bottom: -360px;
  right: -300px;
  border-color: rgba(74, 30, 61, 0.1);
}

/* ===== Top bar ===== */

.top-bar {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem clamp(1.25rem, 5vw, 3rem) 0.5rem;
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

.wordmark {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.wordmark__mark {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--skin-deep);
  color: var(--parchment);
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 0.9rem;
}

.wordmark__text {
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--skin-deep);
  font-weight: 600;
}

/* ===== Content ===== */

.content {
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  padding: clamp(2rem, 6vw, 4rem) clamp(1.25rem, 5vw, 3rem) 2rem;
}

/* ===== Hero ===== */

.hero {
  margin-bottom: clamp(3rem, 8vw, 4.5rem);
}

.hero__eyebrow {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--skin-gold);
  margin: 0 0 0.9rem;
}

.hero__title {
  font-family: "Fraunces", serif;
  font-weight: 500;
  font-size: clamp(2.1rem, 6vw, 3.2rem);
  line-height: 1.12;
  color: var(--skin-deep);
  margin: 0 0 1.25rem;
}

.hero__title-accent {
  color: var(--skin-mid);
}

.hero__body {
  font-size: 1.02rem;
  line-height: 1.75;
  color: var(--ink);
  max-width: 62ch;
  margin: 0 0 1rem;
}

.hero__body:last-child {
  margin-bottom: 0;
}

/* ===== Principles ===== */

.layers {
  display: flex;
  flex-direction: column;
  margin-bottom: clamp(3rem, 7vw, 4.5rem);
}

.layer {
  position: relative;
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  gap: 1.25rem;
  padding: 1.5rem 0;
  border-top: 1px solid #ece2d3;
}

.layer:first-child {
  border-top: 1px solid #ece2d3;
}

.layer::before {
  content: "";
  position: absolute;
  left: calc(1.75rem - 1px);
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(122, 46, 82, calc(0.28 - var(--i) * 0.06));
}

.layer:last-child::before {
  bottom: 50%;
}

.layer__label {
  position: relative;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.85rem;
  color: var(--skin-gold);
  font-weight: 500;
  padding-top: 0.15rem;
}

.layer__title {
  font-family: "Fraunces", serif;
  font-weight: 500;
  font-size: 1.3rem;
  color: var(--skin-deep);
  margin: 0 0 0.5rem;
}

.layer__body {
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--ink-soft);
  max-width: 52ch;
  margin: 0;
}

/* ===== Team ===== */

.team {
  margin-bottom: clamp(3rem, 7vw, 4.5rem);
}

.team__eyebrow {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--skin-gold);
  margin: 0 0 0.5rem;
}

.team__title {
  font-family: "Fraunces", serif;
  font-weight: 500;
  font-size: clamp(1.5rem, 4vw, 1.9rem);
  line-height: 1.25;
  color: var(--skin-deep);
  margin: 0 0 1.5rem;
  max-width: 30ch;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.1rem;
}

.member-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  background: var(--surface);
  border-radius: 16px;
  padding: 1.6rem 1.2rem 1.4rem;
  box-shadow:
    0 1px 2px rgba(43, 33, 29, 0.04),
    0 16px 30px -20px rgba(74, 30, 61, 0.24);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.member-card:hover {
  transform: translateY(-3px);
  box-shadow:
    0 1px 2px rgba(43, 33, 29, 0.05),
    0 20px 36px -18px rgba(74, 30, 61, 0.3);
}

.member-card__photo {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--parchment);
  outline: 2px solid var(--skin-gold);
  outline-offset: 2px;
  margin-bottom: 0.9rem;
}

.member-card__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-card__name {
  font-family: "Fraunces", serif;
  font-weight: 500;
  font-size: 1rem;
  color: var(--skin-deep);
  margin: 0 0 0.3rem;
  line-height: 1.3;
}

.member-card__role {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--skin-mid);
  margin: 0;
}

/* ===== Purpose ===== */

.origin {
  margin-bottom: 1rem;
}

.origin__card {
  background: var(--surface);
  border-radius: 18px;
  padding: clamp(1.75rem, 5vw, 2.5rem);
  box-shadow:
    0 1px 2px rgba(43, 33, 29, 0.04),
    0 20px 40px -24px rgba(74, 30, 61, 0.2);
}

.origin__eyebrow {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--skin-mid);
  margin: 0 0 0.75rem;
}

.origin__title {
  font-family: "Fraunces", serif;
  font-weight: 500;
  font-size: clamp(1.5rem, 4vw, 2rem);
  line-height: 1.25;
  color: var(--skin-deep);
  margin: 0 0 1.25rem;
  max-width: 28ch;
}

.origin__body {
  font-size: 0.98rem;
  line-height: 1.75;
  color: var(--ink);
  margin: 0 0 1rem;
  max-width: 65ch;
}

.origin__body:last-child {
  margin-bottom: 0;
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

button:focus-visible {
  outline: 2px solid var(--skin-mid);
  outline-offset: 3px;
}

/* ===== Tablet / desktop refinements ===== */

@media (min-width: 640px) {
  .layer {
    grid-template-columns: 4rem 1fr;
  }

  .team-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 639px) {
  .team-grid {
    grid-template-columns: 1fr;
  }

  .hero__body {
    font-size: 0.96rem;
  }

  .origin__body {
    font-size: 0.92rem;
  }
}
</style>
