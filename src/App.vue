<template>
  <header class="topbar">
    <a class="brand" href="#hero" aria-label="Селезнев Алексей">AS</a>
    <nav class="nav" aria-label="Разделы сайта">
      <a
        v-for="item in nav"
        :key="item.id"
        :href="`#${item.id}`"
        :class="{ active: activeSection === item.id }"
      >
        <span>{{ item.num }}</span>
        {{ item.label }}
      </a>
    </nav>
    <a class="topbar-legacy" href="./legacy/">старая версия</a>
    <button
      class="menu-button"
      type="button"
      :aria-expanded="menuOpen.toString()"
      aria-label="Открыть меню"
      @click="menuOpen = !menuOpen"
    >
      <span></span><span></span><span></span>
    </button>
    <a class="topbar-cta" href="mailto:a.seleznev@alumni.nsu.ru">
      связаться
      <svg viewBox="0 0 48 16" aria-hidden="true">
        <path d="M0 8h44M36 1l10 7-10 7" />
      </svg>
    </a>
  </header>

  <nav class="mobile-panel" :class="{ open: menuOpen }" aria-label="Мобильная навигация">
    <a v-for="item in nav" :key="item.id" :href="`#${item.id}`" @click="menuOpen = false">
      <span>{{ item.num }}</span
      >{{ item.label }}
    </a>
    <a href="./legacy/" @click="menuOpen = false">
      <span>old</span>
      старая версия
    </a>
  </nav>

  <main>
    <section id="hero" class="hero observe">
      <div class="hero-copy">
        <span class="cross" aria-hidden="true"></span>
        <p class="system-line">vue 3 / typescript / fin-tech</p>
        <h1>Селезнев<br />Алексей</h1>
        <p class="role">Middle Frontend Vue.js</p>
        <p class="intro">
          Middle Frontend Vue.js разработчик с 3 годами опыта в высоконагруженных
          банковских системах. Автоматизирую бизнес-процессы кредитования, прорабатываю
          требования с заказчиками и часто беру техническое лидерство внутри команды.
        </p>
      </div>

      <figure class="portrait-block">
        <img :src="portraitUrl" alt="Селезнев Алексей" />
        <figcaption>
          <span>profile source</span>
          current portfolio
        </figcaption>
      </figure>

      <aside class="hero-action">
        <h2>Frontend<br />Engineer</h2>
        <div class="hero-action__meta">
          <span>3 года опыта</span>
          <span>Vue 2 / Vue 3</span>
          <span>СОВКОМБАНК ТЕХНОЛОГИИ</span>
        </div>
        <a href="#contacts">написать <span aria-hidden="true">-></span></a>
      </aside>
    </section>

    <section class="stats-strip" aria-label="Ключевые факты">
      <article v-for="stat in stats" :key="stat.label">
        <b>{{ stat.value }}</b>
        <span>{{ stat.label }}</span>
      </article>
    </section>

    <section id="skills" class="section observe">
      <SectionHeading
        num="01"
        title="Матрица компетенций"
        text="Сильные стороны, которые видны в реальных банковских задачах."
      />
      <div class="matrix">
        <article v-for="skill in skills" :key="skill.title" class="matrix-card">
          <span>{{ skill.num }}</span>
          <h3>{{ skill.title }}</h3>
          <ul>
            <li v-for="point in skill.points" :key="point">{{ point }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section id="projects" class="section observe">
      <SectionHeading
        num="02"
        title="Кейсы"
        text="Рабочие проекты с акцентом на архитектуру, безопасность и бизнес-логику."
      />
      <div class="filter-row" aria-label="Фильтр кейсов">
        <button
          v-for="filter in filters"
          :key="filter.value"
          type="button"
          :class="{ active: activeFilter === filter.value }"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>
      <div class="case-grid">
        <article
          v-for="project in filteredProjects"
          :key="project.title"
          class="case-card"
        >
          <div class="case-card__label">{{ project.area }}</div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.summary }}</p>
          <div class="tags">
            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
          <ul>
            <li v-for="point in project.points" :key="point">{{ point }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section id="architecture" class="section observe">
      <SectionHeading
        num="03"
        title="Архитектура"
        text="Решения, которые уменьшают стоимость изменений и повышают устойчивость."
      />
      <div class="architecture">
        <article v-for="item in architecture" :key="item.title">
          <span>{{ item.num }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section id="leadership" class="section observe">
      <SectionHeading
        num="04"
        title="Лидерство"
        text="Не только код: коммуникация, согласование решений и командные процессы."
      />
      <div class="leadership-grid">
        <article v-for="item in leadership" :key="item.title">
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section id="experience" class="section observe">
      <SectionHeading
        num="05"
        title="Опыт"
        text="Коммерческая разработка, продуктовые задачи и frontend ownership."
      />
      <ol class="timeline">
        <li v-for="job in experience" :key="job.company">
          <time>{{ job.period }}</time>
          <div>
            <h3>{{ job.role }}</h3>
            <b>{{ job.company }}</b>
            <p>{{ job.text }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section id="education" class="section observe">
      <SectionHeading
        num="06"
        title="Образование"
        text="НГУ, ФИТ, информатика и вычислительная техника."
      />
      <div class="education-panel">
        <div>
          <h3>Новосибирский Государственный Университет</h3>
          <p>Бакалавр ФИТ, 2021-2025</p>
        </div>
        <ul>
          <li v-for="item in education" :key="item">{{ item }}</li>
        </ul>
      </div>
    </section>

    <section id="uni-projects" class="section observe">
      <SectionHeading
        num="07"
        title="Университетские проекты"
        text="Командные и коммерческие задачи из исходного портфолио: Vue, UX/UI, мобильные и web-интерфейсы."
      />
      <div class="case-grid uni-grid">
        <article v-for="project in uniProjects" :key="project.title" class="case-card">
          <div class="case-card__label">{{ project.period }}</div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.summary }}</p>
          <div class="tags">
            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
          <ul>
            <li v-for="point in project.points" :key="point">{{ point }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section id="contacts" class="contact-section observe">
      <div class="contact-copy">
        <h2>Контакты</h2>
        <p>Открыт к сложным frontend-задачам, архитектурным вызовам.</p>
        <a href="mailto:a.seleznev@alumni.nsu.ru"
          >написать <span aria-hidden="true">-></span></a
        >
      </div>
      <address>
        <a v-for="contact in contacts" :key="contact.label" :href="contact.href">
          <span>{{ contact.label }}</span>
          {{ contact.value }}
        </a>
      </address>
    </section>
  </main>

  <footer>
    <span>© 2026 Селезнев Алексей</span>
    <span>Frontend - Vue 3 Developer</span>
    <span>Персональный сайт</span>
  </footer>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import SectionHeading from "./components/SectionHeading.vue";
import portraitUrl from "./assets/alexey-seleznev-river.jpg";
import {
  architecture,
  contacts,
  education,
  experience,
  filters,
  leadership,
  nav,
  projects,
  skills,
  stats,
  uniProjects,
} from "./data/portfolio";

const menuOpen = ref(false);
const activeSection = ref("hero");
const activeFilter = ref("all");

const filteredProjects = computed(() => {
  if (activeFilter.value === "all") return projects;
  return projects.filter((project) => project.type === activeFilter.value);
});

onMounted(() => {
  const sections = document.querySelectorAll(".observe");
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target?.id) {
        activeSection.value = visible.target.id;
      }
    },
    { rootMargin: "-24% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] }
  );

  sections.forEach((section) => observer.observe(section));
});
</script>
