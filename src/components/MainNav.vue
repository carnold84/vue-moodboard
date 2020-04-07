<template>
  <nav class="wrapper">
    <div class="header">
      <router-link class="logo-link" to="/">
        <app-logo
          height="30px"
          style="align-self: center; margin: 0 10px 0 0;"
        ></app-logo>
        <h1 class="title">{{ title }}</h1>
      </router-link>
    </div>
    <ul>
      <li>
        <router-link class="nav-item btn" to="/">Home</router-link>
      </li>
      <li class="nav-item sub-nav">
        <div class="sub-nav-header">
          <h2 class="sub-nav-title nav-item">Projects</h2>
          <router-link class="add-btn" to="/projects/create">
            <a-add-icon></a-add-icon>
          </router-link>
        </div>
        <div v-if="!projects && showProjects" class="sub-nav-loading">
          <app-loading diameter="30px"></app-loading>
        </div>
        <div
          v-if="projects && showProjects && projects.length === 0"
          class="sub-nav-message"
        >
          No Projects
        </div>
        <ul v-if="projects && showProjects" class="sub-nav-content">
          <li v-for="project in projects" :key="project.id">
            <router-link
              class="sub-nav-item nav-item btn"
              :to="{ name: 'project', params: { id: project.id } }"
            >
              {{ project.name }}
            </router-link>
          </li>
        </ul>
      </li>
      <li>
        <router-link class="nav-item btn" to="/images">All Images</router-link>
      </li>
      <li>
        <router-link class="nav-item btn" to="/links">All Links</router-link>
      </li>
    </ul>
    <div class="user">
      <div class="user-info">
        <h4 class="user-name">{{ user.name }}</h4>
        <p class="user-email">{{ user.email }}</p>
      </div>
      <a-button @click="logout">
        <template v-slot:icon-left>
          <a-logout-icon />
        </template>
        <span>Logout</span>
      </a-button>
    </div>
  </nav>
</template>

<script>
import AAddIcon from '@/components/icons/AAddIcon';
import AButton from '@/components/AButton';
import ALogoutIcon from '@/components/icons/ALogoutIcon';
import AppLoading from '@/components/AppLoading';
import AppLogo from '@/components/AppLogo';

export default {
  name: 'main-nav',
  components: {
    AAddIcon,
    AButton,
    ALogoutIcon,
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
  background-color: #ffffff;
  border-right: 1px solid #eeeeee;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  width: 280px;
}

.header {
  border-bottom: 1px solid #eeeeee;
  padding: 25px 30px;
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

.user {
  border-top: 1px solid #eeeeee;
  bottom: 0;
  display: flex;
  padding: 20px 24px 20px 30px;
  position: fixed;
  width: calc(100% - 1px);
}

.user-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.user-name {
  font-size: 1.1em;
  font-weight: 600;
  margin: 0 0 5px;
}

.user-email {
  font-size: 1em;
}

.user-logout-btn {
  align-items: center;
  color: var(--text1);
  cursor: pointer;
  fill: var(--text1);
  font-size: 1em;
  background-color: transparent;
  border: none;
  display: flex;

  &:hover {
    color: var(--primary1);
    fill: var(--primary1);
  }
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
  padding: 16px 26px;
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

.sub-nav {
  align-items: flex-start;
  cursor: default;
  display: flex;
  flex-direction: column;
  padding: 0;

  .nav-item {
    border-bottom: none;
  }

  .sub-nav-header {
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
    padding: 0 20px;

    &:hover {
      fill: var(--primary1);
    }
  }

  .sub-nav-title {
    font-size: 1em;
    font-weight: 600;
    padding: 16px 30px;
  }

  .sub-nav-item {
    padding: 16px 46px;
  }

  .sub-nav-content {
    padding: 0 0 10px;
    width: 100%;
  }

  .sub-nav-message {
    color: var(--text1);
    display: flex;
    justify-content: center;
    padding: 16px 30px;
    width: 100%;
  }

  .sub-nav-loading {
    height: 30px;
    margin: 0 0 20px;
    position: relative;
    width: 100%;
  }
}
</style>
