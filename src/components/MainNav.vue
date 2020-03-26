<template>
  <nav class="wrapper">
    <div class="header">
      <router-link class="logo-link" to="/">
        <app-logo height="30px" style="align-self: center; margin: 0 10px 0 0;"></app-logo>
        <h1 class="title">{{title}}</h1>
      </router-link>
    </div>
    <ul>
      <li>
        <router-link class="nav-item btn" to="/">Home</router-link>
      </li>
      <li class="nav-item accordion">
        <div class="accordion-header">
          <h2 class="accordion-title nav-item">Projects</h2>
          <router-link class="add-btn" to="/projects/create">
            <svg
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
            >
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </router-link>
        </div>
        <div v-if="!projects && showProjects" class="accordion-loading">
          <app-loading diameter="30px"></app-loading>
        </div>
        <div
          v-if="projects && showProjects && projects.length === 0"
          class="accordion-message"
        >
          No Projects
        </div>
        <ul v-if="projects && showProjects" class="accordion-content">
          <li
            v-for="project in projects"
            :key="project.id"
          >
            <router-link
              class="accordion-item nav-item btn"
              :to="{ name: 'project', params: { id: project.id }}"
            >
              {{project.name}}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
    <div class="user-info">
      <button class="nav-item btn" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
import AppLoading from '@/components/AppLoading';
import AppLogo from '@/components/AppLogo';

export default {
  name: 'main-nav',
  components: {
    AppLoading,
    AppLogo,
  },
  data() {
    return {
      showProjects: true,
    };
  },
  methods: {
    logout() {
      this.onLogout();
    },
    toggleProjects() {
      this.showProjects = !this.showProjects;
    },
  },
  props: {
    onLogout: {
      type: Function,
    },
    projects: {
      type: Array,
    },
    title: {
      default: 'Moodboard',
      type: String,
    },
    user: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  align-content: center;
  border-right: 1px solid #eeeeee;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  width: 280px;
}

.header {
  border-bottom: 1px solid #eeeeee;
  padding: 30px 40px;
}

.logo-link {
  align-items: center;
  display: flex;
  text-decoration: none;
}

.title {
  color: var(--text1);
  font-size: 1em;
  font-weight: 700;
}

.nav-item {
  align-items: center;
  background-color: #ffffff;
  border: none;
  border-bottom: 1px solid #eeeeee;
  color: var(--text1);
  font-family: var(--fontFamily--secondary);
  font-size: 1em;
  font-weight: 600;
  display: flex;
  padding: 16px 36px;
  width: 100%;

  &.btn {
    border-left: 4px solid transparent;
    color: var(--text1);
    cursor: pointer;
    text-decoration: none;

    &:hover {
      color: var(--primary1);
    }

    &.router-link-exact-active {
      border-left-color: var(--primary1);
      color: var(--primary1);
    }
  }
}

.accordion {
  align-items: flex-start;
  cursor: default;
  display: flex;
  flex-direction: column;
  padding: 0;

  .nav-item {
    border-bottom: none;
  }

  .accordion-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .add-btn {
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    fill: var(--text1);
    margin: 0 10px 0 0;
    padding: 0 10px;

    &:hover {
      fill: var(--primary1);
    }
  }

  .accordion-title {
    font-size: 1em;
    font-weight: 600;
    padding: 16px 40px;
  }

  .accordion-item {
    padding: 16px 46px;
  }

  .accordion-content {
    padding: 0 0 10px;
    width: 100%;
  }

  .accordion-message {
    color: var(--text1);
    display: flex;
    justify-content: center;
    padding: 16px 40px;
    width: 100%;
  }

  .accordion-loading {
    height: 30px;
    margin: 0 0 20px;
    position: relative;
    width: 100%;
  }
}
</style>
